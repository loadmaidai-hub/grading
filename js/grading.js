// ==========================================================================
// ระบบประมวลผลเกรด 969-042G4
//  - ข้อมูลนักศึกษาเก็บเป็นไฟล์เข้ารหัส data/grades.enc.js (AES-256-GCM) ถอดรหัสในเบราว์เซอร์เท่านั้น
//  - โครงสร้างกุญแจ: ข้อมูลถูกเข้ารหัสด้วย "กุญแจข้อมูล" (สุ่ม 1 ดอก)
//      กุญแจข้อมูลถูกห่อไว้ 2 ชั้น: (1) ด้วยรหัสผ่าน  (2) ด้วยรหัสกู้คืน
//      → ลืมรหัสผ่านแล้วใช้รหัสกู้คืนเปิด แล้วตั้งรหัสผ่านใหม่ได้ โดยข้อมูลไม่ต้องหาย
//  - ทุกครั้งที่แก้คะแนน จะเข้ารหัสแล้วบันทึกใน localStorage ของเบราว์เซอร์นี้
// ==========================================================================

// ---------- ตั้งค่าสัดส่วนคะแนน (แก้ตัวเลขตรงนี้ที่เดียว) ----------
//   rawPerItem = คะแนนดิบเต็มต่อ 1 ครั้ง (ตามที่กรอกในช่อง)
//   weight     = สัดส่วนที่นับเข้าคะแนนรวม 100
const CONFIG = {
  att:  { items: 9, rawPerItem: 1,    weight: 25 },  // เข้าเรียน/ควิซ 25% (เรียนวันสุดท้าย 11/11 = 9 ครั้ง)
  hw:   { items: 4, rawPerItem: 11.5, weight: 30 },  // การบ้าน/เวิร์กชอป 30%
  proj: { rawMax: 45,                 weight: 45 }   // Final Project 45%
};
const ATT_RAW_MAX = CONFIG.att.items * CONFIG.att.rawPerItem; // 9
const HW_RAW_MAX  = CONFIG.hw.items  * CONFIG.hw.rawPerItem;  // 46

const STORAGE_KEY = "grading-969-042G4-v2";
const LEGACY_STORAGE_KEYS = ["grading-969-042G4-v1"];   // เวอร์ชันเก่ามากที่มีคะแนนจาก Excel: ลบทิ้ง
const IDLE_LOCK_MS = 15 * 60 * 1000;   // ล็อกอัตโนมัติเมื่อไม่ได้ใช้งาน 15 นาที
const PBKDF2_ITER = 600000;
const MIN_PW_LEN = 12;
const RC_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";   // ตัดตัวที่สับสนง่าย (i l o 0 1)

let studentsData = [];   // มีค่าเฉพาะตอนปลดล็อก
let session = null;      // { rawDek, dek, iter, pw, rc } เก็บในหน่วยความจำเท่านั้น
let idleTimer = null;
let saveQueue = Promise.resolve();

const $ = id => document.getElementById(id);

// ---------- เกรด / คำนวณคะแนน ----------
function getGrade(score) {
  if (score >= 85) return { text: "A",  class: "grade-A" };
  if (score >= 80) return { text: "B+", class: "grade-Bplus" };
  if (score >= 75) return { text: "B",  class: "grade-B" };
  if (score >= 70) return { text: "C+", class: "grade-Cplus" };
  if (score >= 65) return { text: "C",  class: "grade-C" };
  if (score >= 60) return { text: "D+", class: "grade-Dplus" };
  if (score >= 55) return { text: "D",  class: "grade-D" };
  return { text: "E", class: "grade-E" };
}

const sumArr = arr => arr.reduce((a, b) => a + (Number(b) || 0), 0);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function calcScores(std) {
  const att  = sumArr(std.attendance.slice(0, CONFIG.att.items)) / ATT_RAW_MAX * CONFIG.att.weight;
  const hw   = sumArr(std.hw) / HW_RAW_MAX * CONFIG.hw.weight;
  const proj = (Number(std.project) || 0) / CONFIG.proj.rawMax * CONFIG.proj.weight;
  const total = att + hw + proj;
  // ช่องว่าง (null) = ยังไม่ได้กรอก ต่างจาก 0 = ได้ 0 คะแนน
  const entered = [...std.attendance.slice(0, CONFIG.att.items), ...std.hw, std.project].some(v => v !== null && v !== undefined);
  // ปัดทศนิยม 6 ตำแหน่ง กันเศษของคอมพิวเตอร์ (เช่น 84.9999999) ตอนตัดเกรด
  const gradeInfo = entered ? getGrade(Math.round(total * 1e6) / 1e6) : { text: "-", class: "" };
  return { att, hw, proj, total, gradeInfo, entered };
}

// ---------- เข้ารหัส / ถอดรหัส (Web Crypto) ----------
const enc = new TextEncoder();
const dec = new TextDecoder();

function toB64(buf) {
  const b = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s);
}
const fromB64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

async function deriveKek(secret, salt, iter) {
  const base = await crypto.subtle.importKey("raw", enc.encode(secret), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
  );
}

// ห่อ/แกะกุญแจข้อมูลด้วยรหัส (รหัสผ่าน หรือ รหัสกู้คืน)
async function wrapDek(rawDek, secret, iter) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const kek = await deriveKek(secret, salt, iter);
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, kek, rawDek);
  return { salt: toB64(salt), iv: toB64(iv), ct: toB64(ct) };
}

async function unwrapDek(wrap, secret, iter, cache, kind) {
  const id = kind + ":" + wrap.salt + ":" + iter;
  if (!cache[id]) cache[id] = await deriveKek(secret, fromB64(wrap.salt), iter);
  const raw = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(wrap.iv) }, cache[id], fromB64(wrap.ct));
  return new Uint8Array(raw);
}

const importDek = raw => crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);

async function encryptPayload(payload, sess) {
  const iv = crypto.getRandomValues(new Uint8Array(12));   // ใหม่ทุกครั้งที่บันทึก
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, sess.dek, enc.encode(JSON.stringify(payload)));
  return { v: 2, iter: sess.iter, pw: sess.pw, rc: sess.rc, iv: toB64(iv), data: toB64(ct) };
}

// kind = "pw" (รหัสผ่าน) หรือ "rc" (รหัสกู้คืน)  คืน null ถ้ารหัสผิด/ไฟล์เสีย
async function tryDecrypt(blob, secret, kind, cache) {
  try {
    if (blob.v === 1) {          // ไฟล์รุ่นเก่า (ไม่มีรหัสกู้คืน): ข้อมูลเข้ารหัสด้วยรหัสผ่านโดยตรง
      if (kind !== "pw") return null;
      const id = "legacy:" + blob.salt + ":" + blob.iter;
      if (!cache[id]) cache[id] = await deriveKek(secret, fromB64(blob.salt), blob.iter);
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(blob.iv) }, cache[id], fromB64(blob.data));
      return { payload: JSON.parse(dec.decode(pt)), legacy: true };
    }
    const wrap = blob[kind];
    if (!wrap) return null;
    const rawDek = await unwrapDek(wrap, secret, blob.iter, cache, kind);
    const dek = await importDek(rawDek);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(blob.iv) }, dek, fromB64(blob.data));
    return { payload: JSON.parse(dec.decode(pt)), session: { rawDek, dek, iter: blob.iter, pw: blob.pw, rc: blob.rc } };
  } catch (e) {
    return null;
  }
}

// ---------- รหัสกู้คืน ----------
function generateRecoveryCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  let s = "";
  for (const b of bytes) s += RC_ALPHABET[b % RC_ALPHABET.length];
  return s.match(/.{4}/g).join("-");
}
const normalizeCode = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

// ข้อมูลรุ่นเก่า (v1) ที่เปิดได้แล้ว → อัปเกรดเป็นรุ่นที่มีรหัสกู้คืน
async function upgradeLegacy(password) {
  const rawDek = crypto.getRandomValues(new Uint8Array(32));
  const code = generateRecoveryCode();
  session = {
    rawDek, dek: await importDek(rawDek), iter: PBKDF2_ITER,
    pw: await wrapDek(rawDek, password, PBKDF2_ITER),
    rc: await wrapDek(rawDek, normalizeCode(code), PBKDF2_ITER)
  };
  return code;
}

async function regenerateRecoveryCore() {
  const code = generateRecoveryCode();
  session.rc = await wrapDek(session.rawDek, normalizeCode(code), session.iter);
  await queueSave();
  return code;
}

// ---------- ปลดล็อก: เลือกข้อมูลที่ใหม่กว่าระหว่างไฟล์ต้นฉบับกับที่บันทึกในเครื่อง ----------
async function unlock(secret, kind) {
  const shipped = (typeof window !== "undefined" && window.ENCRYPTED_DATA) || null;
  let localBlob = null, localBroken = false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) localBlob = JSON.parse(raw);
  } catch (e) { localBroken = true; }

  const cache = {};
  const l = localBlob ? await tryDecrypt(localBlob, secret, kind, cache) : null;
  const s = shipped ? await tryDecrypt(shipped, secret, kind, cache) : null;

  // เครื่องนี้มีข้อมูลที่แก้ไว้ แต่เปิดไม่ได้ด้วยรหัสนี้ ในขณะที่รหัสนี้เปิดไฟล์ต้นฉบับได้
  // → ห้ามเขียนทับข้อมูลที่แก้ไว้แบบเงียบๆ
  if ((localBlob || localBroken) && !l && s) return { status: "local-mismatch" };

  const pick = (l && s) ? (l.payload.savedAt >= s.payload.savedAt ? l : s) : (l || s);
  if (!pick) return { status: "wrong" };
  return { status: "ok", pick };
}

// ---------- บันทึก ----------
function setStatus(text, cls) {
  const el = $("saveStatus");
  if (!el) return;
  el.textContent = text;
  el.className = "save-status " + (cls || "");
}

async function saveNow() {
  if (!session) return;
  const blob = await encryptPayload({ savedAt: Date.now(), students: studentsData }, session);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blob));
    setStatus("✅ บันทึกในเครื่องนี้แล้ว " + new Date().toLocaleTimeString("th-TH"), "ok");
  } catch (e) {
    setStatus("⚠️ บันทึกในเบราว์เซอร์ไม่ได้ (โหมดส่วนตัว?) กรุณากด ‘ดาวน์โหลดไฟล์สำรอง’", "err");
  }
}
const queueSave = () => (saveQueue = saveQueue.then(saveNow));

async function changePasswordCore(newPw) {
  session.pw = await wrapDek(session.rawDek, newPw, session.iter);   // เปลี่ยนแค่ตัวห่อกุญแจ ข้อมูลไม่ต้องเข้ารหัสใหม่
  await queueSave();
}

async function downloadBackup() {
  await saveQueue;
  const blob = await encryptPayload({ savedAt: Date.now(), students: studentsData }, session);
  const text = "// ข้อมูลเข้ารหัส: นำไฟล์นี้ไปแทนที่ data/grades.enc.js เพื่อใช้ข้อมูลล่าสุดบนเครื่องอื่น/เว็บออนไลน์\n" +
               "window.ENCRYPTED_DATA = " + JSON.stringify(blob) + ";\n";
  download(new Blob([text], { type: "text/javascript;charset=utf-8" }), "grades.enc.js");
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- ตาราง ----------
function inputCell(type, idx, value, max, extraStyle = "") {
  return `<td><input type="number" class="score-in" data-type="${type}" data-idx="${idx}" value="${value}" step="0.5" min="0" max="${max}" style="${extraStyle}"></td>`;
}

function renderTable() {
  let rows = "";
  studentsData.forEach((std, sIndex) => {
    let html = `<td>${esc(std.id)}</td><td>${esc(std.name)}</td>`;
    for (let i = 0; i < CONFIG.att.items; i++) html += inputCell("att", i, std.attendance[i] ?? "", CONFIG.att.rawPerItem);
    html += `<td class="col-summary sum-att"></td>`;
    for (let i = 0; i < CONFIG.hw.items; i++) html += inputCell("hw", i, std.hw[i] ?? "", CONFIG.hw.rawPerItem);
    html += `<td class="col-summary sum-hw"></td>`;
    html += inputCell("proj", 0, std.project ?? "", CONFIG.proj.rawMax, "width:70px; font-weight:800;");
    html += `<td class="col-total"></td><td class="col-grade"></td>`;
    rows += `<tr data-row="${sIndex}">${html}</tr>`;
  });
  const tbody = $("gradingBody");
  tbody.innerHTML = rows;
  tbody.querySelectorAll("tr").forEach(updateRow);
}

// อัปเดตเฉพาะเลขสรุปของแถวนั้น ไม่วาดตารางใหม่ (เคอร์เซอร์ไม่หลุด กด Tab ต่อได้)
function updateRow(tr) {
  const r = calcScores(studentsData[Number(tr.dataset.row)]);
  const show = n => r.entered ? n.toFixed(2) : "-";
  tr.querySelector(".sum-att").textContent = show(r.att);
  tr.querySelector(".sum-hw").textContent = show(r.hw);
  tr.querySelector(".col-total").textContent = show(r.total);
  const g = tr.querySelector(".col-grade");
  g.textContent = r.gradeInfo.text;
  g.className = "col-grade " + r.gradeInfo.class;
}

function updateScore(studentIndex, type, subIndex, value, maxVal) {
  let v = parseFloat(value);
  if (isNaN(v)) v = null;                 // ลบช่องให้ว่าง = ยังไม่ได้กรอก
  else if (v < 0) v = 0;
  else if (v > maxVal) v = maxVal;        // ไม่ให้เกินคะแนนเต็มของช่องนั้น
  const s = studentsData[studentIndex];
  if (type === "att") s.attendance[subIndex] = v;
  else if (type === "hw") s.hw[subIndex] = v;
  else if (type === "proj") s.project = v;
  return v;
}

function exportToCSV() {
  const q = s => `"${String(s).replace(/"/g, '""')}"`;
  let csv = "\uFEFFรหัสนักศึกษา,ชื่อ-นามสกุล,";
  for (let i = 1; i <= CONFIG.att.items; i++) csv += `เข้าเรียน${i},`;
  csv += `รวมเข้าเรียน(เต็ม ${CONFIG.att.weight}),`;
  for (let i = 1; i <= CONFIG.hw.items; i++) csv += `การบ้าน${i},`;
  csv += `รวมการบ้าน(เต็ม ${CONFIG.hw.weight}),Final Project(เต็ม ${CONFIG.proj.weight}),คะแนนรวม(เต็ม 100),เกรด\n`;
  studentsData.forEach(std => {
    const r = calcScores(std);
    const f = n => r.entered ? n.toFixed(2) : "";
    csv += `="${std.id}",${q(std.name)},${std.attendance.slice(0, CONFIG.att.items).join(",")},${f(r.att)},` +
           `${std.hw.join(",")},${f(r.hw)},${f(r.proj)},${f(r.total)},${q(r.gradeInfo.text)}\n`;
  });
  download(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "Grading_969-042G4_Summary.csv");
}

// ---------- หน้าจอ: ล็อก / ปลดล็อก / ลืมรหัส ----------
function closeRcModal() { $("rcCode").textContent = ""; $("rcModal").hidden = true; }

function lock() {
  session = null;
  studentsData = [];
  $("gradingBody").innerHTML = "";
  $("app").hidden = true;
  $("pwModal").hidden = true;
  $("forgotModal").hidden = true;
  closeRcModal();
  $("lockScreen").hidden = false;
  $("pwInput").value = "";
  $("lockMsg").textContent = "";
  clearTimeout(idleTimer);
  setTimeout(() => $("pwInput").focus(), 0);
}

function resetIdleTimer() {
  if (!session) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(lock, IDLE_LOCK_MS);
}

function enterApp(students) {
  studentsData = students;
  renderTable();
  $("lockScreen").hidden = true;
  $("forgotModal").hidden = true;
  $("app").hidden = false;
  $("pwInput").value = "";
  setStatus("", "");
  resetIdleTimer();
}

function showRecoveryCode(code, title) {
  $("rcTitle").textContent = title;
  $("rcCode").textContent = code;
  $("rcModal").hidden = false;
}

async function handleUnlock() {
  const btn = $("unlockBtn"), msg = $("lockMsg");
  const pw = $("pwInput").value;
  if (!pw) { msg.textContent = "กรุณาใส่รหัสผ่าน"; return; }
  btn.disabled = true; btn.textContent = "กำลังตรวจสอบ...";
  msg.textContent = ""; $("resetLocalBtn").hidden = true;
  try {
    const res = await unlock(pw, "pw");
    if (res.status === "ok") {
      if (res.pick.legacy) {
        const code = await upgradeLegacy(pw);
        enterApp(res.pick.payload.students);
        await queueSave();
        showRecoveryCode(code, "🛟 อัปเกรดแล้ว: นี่คือรหัสกู้คืนของคุณ");
      } else {
        session = res.pick.session;
        enterApp(res.pick.payload.students);
      }
    } else if (res.status === "local-mismatch") {
      msg.textContent = "เครื่องนี้มีข้อมูลที่แก้ไขไว้ด้วยรหัสอื่น (น่าจะเป็นรหัสที่เปลี่ยนล่าสุด) กรุณาใส่รหัสล่าสุด หรือใช้ ‘ลืมรหัสผ่าน?’";
      $("resetLocalBtn").hidden = false;
    } else {
      msg.textContent = "รหัสผ่านไม่ถูกต้อง";
    }
  } finally {
    btn.disabled = false; btn.textContent = "ปลดล็อก";
  }
}

// ลืมรหัสผ่าน: ใช้รหัสกู้คืน + ตั้งรหัสผ่านใหม่
async function handleForgot() {
  const msg = $("fgMsg"), btn = $("fgSaveBtn");
  const code = normalizeCode($("fgCode").value);
  const p1 = $("fgPw1").value, p2 = $("fgPw2").value;
  msg.textContent = ""; $("fgResetBtn").hidden = true;
  if (code.length !== 24) { msg.textContent = "รหัสกู้คืนต้องมี 24 ตัวอักษร (ไม่ต้องใส่ขีดก็ได้)"; return; }
  if (p1.length < MIN_PW_LEN) { msg.textContent = `รหัสผ่านใหม่ต้องยาวอย่างน้อย ${MIN_PW_LEN} ตัวอักษร`; return; }
  if (p1 !== p2) { msg.textContent = "รหัสผ่านใหม่สองช่องไม่ตรงกัน"; return; }
  btn.disabled = true; btn.textContent = "กำลังตรวจสอบ...";
  try {
    const res = await unlock(code, "rc");
    if (res.status === "ok") {
      session = res.pick.session;
      session.pw = await wrapDek(session.rawDek, p1, session.iter);
      enterApp(res.pick.payload.students);
      $("fgCode").value = ""; $("fgPw1").value = ""; $("fgPw2").value = "";
      await queueSave();
      setStatus("✅ ตั้งรหัสผ่านใหม่แล้ว และบันทึกแล้ว", "ok");
    } else if (res.status === "local-mismatch") {
      msg.textContent = "รหัสกู้คืนนี้ไม่ตรงกับข้อมูลที่บันทึกไว้ในเครื่องนี้ (อาจมีการสร้างรหัสกู้คืนชุดใหม่) ลองรหัสกู้คืนชุดล่าสุด";
      $("fgResetBtn").hidden = false;
    } else {
      msg.textContent = "รหัสกู้คืนไม่ถูกต้อง";
    }
  } finally {
    btn.disabled = false; btn.textContent = "ตั้งรหัสผ่านใหม่";
  }
}

async function handleChangePassword() {
  const p1 = $("newPw1").value, p2 = $("newPw2").value, msg = $("pwMsg");
  if (p1.length < MIN_PW_LEN) { msg.textContent = `รหัสผ่านต้องยาวอย่างน้อย ${MIN_PW_LEN} ตัวอักษร`; return; }
  if (p1 !== p2) { msg.textContent = "รหัสผ่านสองช่องไม่ตรงกัน"; return; }
  const btn = $("pwSaveBtn");
  btn.disabled = true; btn.textContent = "กำลังเปลี่ยน...";
  try {
    await changePasswordCore(p1);
    $("pwModal").hidden = true;
    $("newPw1").value = ""; $("newPw2").value = ""; msg.textContent = "";
    alert("เปลี่ยนรหัสผ่านแล้ว (ใช้กับข้อมูลในเครื่องนี้)\n\nถ้าต้องการใช้รหัสใหม่บนเครื่องอื่นหรือบนเว็บออนไลน์ ให้กด ‘ดาวน์โหลดไฟล์สำรอง’ แล้วนำ grades.enc.js ไปแทนที่ไฟล์ใน data/");
  } finally {
    btn.disabled = false; btn.textContent = "เปลี่ยนรหัส";
  }
}

async function handleRegenerateRecovery() {
  if (!confirm("สร้างรหัสกู้คืนชุดใหม่? รหัสกู้คืนชุดเดิมจะใช้ไม่ได้กับข้อมูลในเครื่องนี้อีก\n(ต้องดาวน์โหลดไฟล์สำรองไปแทนที่ใน data/ ด้วย รหัสชุดใหม่จึงใช้ได้บนเว็บออนไลน์)")) return;
  const code = await regenerateRecoveryCore();
  showRecoveryCode(code, "🛟 รหัสกู้คืนชุดใหม่ของคุณ");
}

function resetLocalData() {
  if (confirm("ล้างข้อมูลที่แก้ไขและบันทึกไว้ในเครื่องนี้ทั้งหมด แล้วกลับไปใช้ไฟล์ต้นฉบับ?\n(ถ้ายังไม่ได้ดาวน์โหลดไฟล์สำรอง ข้อมูลที่แก้ไว้จะหาย)")) {
    localStorage.removeItem(STORAGE_KEY);
    $("lockMsg").textContent = "ล้างแล้ว กรุณาใส่รหัสของไฟล์ต้นฉบับอีกครั้ง";
    $("resetLocalBtn").hidden = true;
    $("fgMsg").textContent = "ล้างแล้ว กรุณาใช้รหัสกู้คืนของไฟล์ต้นฉบับอีกครั้ง";
    $("fgResetBtn").hidden = true;
  }
}

function init() {
  if (!window.crypto || !crypto.subtle) {
    $("lockMsg").textContent = "เบราว์เซอร์นี้ไม่รองรับการเข้ารหัส (ต้องเปิดผ่าน https:// หรือเปิดไฟล์ในเครื่อง)";
    $("unlockBtn").disabled = true;
    return;
  }
  try { LEGACY_STORAGE_KEYS.forEach(k => localStorage.removeItem(k)); } catch (e) {}
  if (!window.ENCRYPTED_DATA && !localStorage.getItem(STORAGE_KEY)) {
    $("lockMsg").textContent = "ไม่พบไฟล์ข้อมูล data/grades.enc.js";
  }

  $("unlockBtn").addEventListener("click", handleUnlock);
  $("pwInput").addEventListener("keydown", e => { if (e.key === "Enter") handleUnlock(); });
  $("resetLocalBtn").addEventListener("click", resetLocalData);
  $("fgResetBtn").addEventListener("click", resetLocalData);

  $("forgotBtn").addEventListener("click", () => { $("fgMsg").textContent = ""; $("fgResetBtn").hidden = true; $("forgotModal").hidden = false; $("fgCode").focus(); });
  $("fgCancelBtn").addEventListener("click", () => { $("forgotModal").hidden = true; $("fgCode").value = ""; $("fgPw1").value = ""; $("fgPw2").value = ""; });
  $("fgSaveBtn").addEventListener("click", handleForgot);

  $("csvBtn").addEventListener("click", exportToCSV);
  $("backupBtn").addEventListener("click", downloadBackup);
  $("lockBtn").addEventListener("click", lock);
  $("rcBtn").addEventListener("click", handleRegenerateRecovery);
  $("changePwBtn").addEventListener("click", () => { $("pwMsg").textContent = ""; $("pwModal").hidden = false; $("newPw1").focus(); });
  $("pwCancelBtn").addEventListener("click", () => { $("pwModal").hidden = true; $("newPw1").value = ""; $("newPw2").value = ""; });
  $("pwSaveBtn").addEventListener("click", handleChangePassword);

  $("rcCopyBtn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText($("rcCode").textContent); $("rcCopyBtn").textContent = "คัดลอกแล้ว ✓"; }
    catch (e) { $("rcCopyBtn").textContent = "คัดลอกไม่ได้ ให้จดเอง"; }
  });
  $("rcDoneBtn").addEventListener("click", () => { closeRcModal(); $("rcCopyBtn").textContent = "คัดลอก"; });

  $("gradingBody").addEventListener("change", e => {
    const input = e.target.closest("input.score-in");
    if (!input) return;
    const tr = input.closest("tr");
    input.value = updateScore(Number(tr.dataset.row), input.dataset.type, Number(input.dataset.idx), input.value, parseFloat(input.max)) ?? "";
    updateRow(tr);
    queueSave();
  });

  ["click", "keydown", "mousemove", "touchstart"].forEach(ev => document.addEventListener(ev, resetIdleTimer, { passive: true }));
}

document.addEventListener("DOMContentLoaded", init);
