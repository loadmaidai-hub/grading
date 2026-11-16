// ข้อมูลดึงจากไฟล์ Excel
const studentsData = [
  {"id": "6730611001", "name": "นาย คุณานนต์ แพใหญ่", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0], "hw": [0, 11.5, 11.5, 11.5], "project": 45.0},
  {"id": "6730611002", "name": "น.ส. สุชัญญา หลายกิจวุฒิพันธ์", "attendance": [1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.5, 1.0, 0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 45.0},
  {"id": "6730611004", "name": "น.ส. ชนาภา อุดมทรัพย์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 45.0},
  {"id": "6730611005", "name": "นาย จิรเมธ สุขลี่", "attendance": [1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 35.0},
  {"id": "6730611006", "name": "นาย ธนกฤต จริยวัตกุล", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0], "hw": [0, 11.5, 11.5, 11.5], "project": 45.0}
  // (ข้อมูลอื่น ๆ สามารถเพิ่มเข้าไปใน Array นี้ได้ต่อเนื่องตามรูปแบบเดิม)
];

function getGrade(score) {
  if (score >= 85) return { text: "A", class: "grade-A" };
  if (score >= 80) return { text: "B+", class: "grade-Bplus" };
  if (score >= 75) return { text: "B", class: "grade-B" };
  if (score >= 70) return { text: "C+", class: "grade-Cplus" };
  if (score >= 65) return { text: "C", class: "grade-C" };
  if (score >= 60) return { text: "D+", class: "grade-Dplus" };
  if (score >= 55) return { text: "D", class: "grade-D" };
  return { text: "E", class: "grade-E" };
}

function renderTable() {
  const tbody = document.getElementById("gradingBody");
  tbody.innerHTML = "";

  studentsData.forEach((std, sIndex) => {
    let tr = document.createElement("tr");

    let html = `
      <td>${std.id}</td>
      <td>${std.name}</td>
    `;

    // 10 ช่องเช็คอิน
    let sumAtt = 0;
    for (let i = 0; i < 10; i++) {
      let val = std.attendance[i] || 0;
      sumAtt += val;
      html += `<td><input type="number" class="score-in" value="${val}" step="0.5" min="0" onchange="updateScore(${sIndex}, 'att', ${i}, this.value)"></td>`;
    }
    html += `<td class="col-summary">${sumAtt.toFixed(1)}</td>`;

    // 4 ช่องการบ้าน
    let sumHw = 0;
    for (let i = 0; i < 4; i++) {
      let val = std.hw[i] || 0;
      sumHw += val;
      html += `<td><input type="number" class="score-in" value="${val}" step="0.5" min="0" onchange="updateScore(${sIndex}, 'hw', ${i}, this.value)"></td>`;
    }
    html += `<td class="col-summary">${sumHw.toFixed(1)}</td>`;

    // คะแนนโปรเจกต์
    html += `<td><input type="number" class="score-in" style="width:60px; font-weight:800;" value="${std.project}" step="0.5" min="0" onchange="updateScore(${sIndex}, 'proj', 0, this.value)"></td>`;

    // สรุปเกรด
    let totalScore = sumAtt + sumHw + std.project;
    let gradeInfo = getGrade(totalScore);

    html += `
      <td class="col-total">${totalScore.toFixed(1)}</td>
      <td class="col-grade ${gradeInfo.class}">${gradeInfo.text}</td>
    `;

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
}

function updateScore(studentIndex, type, subIndex, value) {
  let numVal = parseFloat(value) || 0;
  if (numVal < 0) numVal = 0;

  if (type === 'att') {
    studentsData[studentIndex].attendance[subIndex] = numVal;
  } else if (type === 'hw') {
    studentsData[studentIndex].hw[subIndex] = numVal;
  } else if (type === 'proj') {
    studentsData[studentIndex].project = numVal;
  }
  
  renderTable(); 
}

function exportToCSV() {
  let csv = "\uFEFFรหัสนักศึกษา,ชื่อ-นามสกุล,เข้าเรียน1,เข้าเรียน2,เข้าเรียน3,เข้าเรียน4,เข้าเรียน5,เข้าเรียน6,เข้าเรียน7,เข้าเรียน8,เข้าเรียน9,เข้าเรียน10,รวมเข้าเรียน,การบ้าน1,การบ้าน2,การบ้าน3,การบ้าน4,รวมการบ้าน,โปรเจกต์,คะแนนรวม,เกรด\n";

  studentsData.forEach(std => {
    let att = std.attendance;
    let hw = std.hw;
    let sumAtt = att.reduce((a, b) => a + b, 0);
    let sumHw = hw.reduce((a, b) => a + b, 0);
    let total = sumAtt + sumHw + std.project;
    let gradeInfo = getGrade(total);

    csv += `="${std.id}","${std.name}",${att.join(",")},${sumAtt},${hw.join(",")},${sumHw},${std.project},${total},"${gradeInfo.text}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Grading_969-042G4_LINE_Seed.csv`;
  link.click();
}

document.addEventListener("DOMContentLoaded", renderTable);