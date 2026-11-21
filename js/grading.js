// ==========================================================================
// 1. ข้อมูลคะแนนนักศึกษาทั้งหมด 65 คน (9 ครั้งเข้าเรียน + ยกคลาส 2, 6, 7 = 1.0)
// ==========================================================================
const DEFAULT_STUDENTS_DATA = [{"id": "6730611001", "name": "นาย คุณานนต์ แพใหญ่", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 40}, {"id": "6730611002", "name": "น.ส. สุชัญญา หลายกิจวุฒิพันธ์", "attendance": [1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 38}, {"id": "6730611004", "name": "น.ส. ชนาภา อุดมทรัพย์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611005", "name": "นาย จิรเมธ สุขลี่", "attendance": [1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 38}, {"id": "6730611006", "name": "นาย ธนกฤต จริยวัตกุล", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 40}, {"id": "6730611007", "name": "นาย ภูริณัฐ มะนะโส", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 38.5}, {"id": "6730611008", "name": "นาย ธนวัต เอกบุตร", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 37}, {"id": "6730611009", "name": "น.ส. เบญญภา ทองขาว", "attendance": [1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42.5}, {"id": "6730611010", "name": "น.ส. ณิชตา คำวาศรี", "attendance": [1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42.5}, {"id": "6730611011", "name": "น.ส. เสาวลักษณ์ วรพงศ์วัฒน์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42.5}, {"id": "6730611012", "name": "น.ส. ทักษิณารัตย์ พัฒสงค์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 45}, {"id": "6730611013", "name": "นาย โชติธนกฤต อารีมิตร", "attendance": [1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 41.5}, {"id": "6730611016", "name": "นาย ภูวเมศฐ์ พงศ์จารุวิชญ์", "attendance": [1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 45}, {"id": "6730611017", "name": "นาย กีรดิษ บุญสูง", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 41.5}, {"id": "6730611019", "name": "นาย ศุภกร ทวีรัตน์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 41.5}, {"id": "6730611020", "name": "น.ส. ณัฐณิชา ศรีธรรม", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 45}, {"id": "6730611021", "name": "นาย สงกรานต์ นนทามิตร", "attendance": [1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.5}, {"id": "6730611022", "name": "น.ส. สิรภัทร นวลแก้ว", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42.5}, {"id": "6730611023", "name": "นาย ธนกฤต ดวงแก้ว", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42.5}, {"id": "6730611024", "name": "นาย เจษฎา ถวิลถึง", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611027", "name": "นาย ธนกฤต คล้ายเเก้ว", "attendance": [1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 41.5}, {"id": "6730611028", "name": "นาย วาที คชลักษ์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 41.0}, {"id": "6730611029", "name": "นาย วิสุทธิ์ ณ พัทลุง", "attendance": [1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 40.5}, {"id": "6730611031", "name": "นาย ธนพัฒน์ แสนดี", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611032", "name": "นาย พิศุทธิ์ หิรัญจรัสพิวัฒน์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611033", "name": "นาย ธนพล ถาวรมาศ", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 45}, {"id": "6730611034", "name": "น.ส. ณัฐวดี โภคะศฤงคาร", "attendance": [1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [0.0, 0.0, 11.5, 0.0], "project": 34}, {"id": "6730611035", "name": "นาย กรกฤต นวลละออง", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.5}, {"id": "6730611036", "name": "นาย ธเนศ งามพสุธาดล", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 38}, {"id": "6730611037", "name": "นาย ภัทรพล แซ่หลี", "attendance": [1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [0.0, 0.0, 11.5, 11.5], "project": 0.0}, {"id": "6730611038", "name": "นาย นิธิทัต ตินตะชาติ", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 37}, {"id": "6730611039", "name": "นาย กนิษฐ หิรัญคุปต์", "attendance": [1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [0.0, 11.5, 11.5, 0.0], "project": 43.5}, {"id": "6730611043", "name": "นาย พลภัทร จันทรสุต", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 42}, {"id": "6730611044", "name": "นาย วงศกร ศิริคณินทร์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 45}, {"id": "6730611045", "name": "นาย กิตติพัชญ์ เอกพงศ์วิทย์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 38}, {"id": "6730611046", "name": "น.ส. หทัยรัตน์ กิ่งแก้ว", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.0}, {"id": "6730611047", "name": "นาย สิวารักษ์ เศษนาม", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42}, {"id": "6730611048", "name": "นาย ศุภกร แย้มวาจา", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [0.0, 0.0, 11.5, 0.0], "project": 41.0}, {"id": "6730611053", "name": "น.ส. นิจสิรี สุทธิเจริญ", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 41.5}, {"id": "6730611054", "name": "นาย อริยะ แพงพา", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611055", "name": "นาย รพีภัทร อุตโม", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 41.0}, {"id": "6730611056", "name": "นาย วศิน เลี่ยมแก้ว", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611057", "name": "น.ส. จักรีพร สุทธิชาติ", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42.5}, {"id": "6730611059", "name": "นาย พงศธร ฉิมล่องดำ", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.5}, {"id": "6730611060", "name": "น.ส. ธวัลรัตน์ คำแหง", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.0}, {"id": "6730611061", "name": "นาย ณัฐสิทธิ์ ทองจันทร์", "attendance": [1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 41.5}, {"id": "6730611062", "name": "นาย ณัฐพงศ์ ตันบำรุง", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [0.0, 11.5, 11.5, 0.0], "project": 45}, {"id": "6730611063", "name": "น.ส. เปมิกา สือสกุล", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611064", "name": "นาย ธนโชติ สุวรรณวงศ์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 40}, {"id": "6730611065", "name": "นาย ภควัฒน์ สะมาน", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 40.5}, {"id": "6730611066", "name": "น.ส. ซอนญ่า ภักดี", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 45}, {"id": "6730611068", "name": "นาย ฅมกริช พรมปาน", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 43}, {"id": "6730611069", "name": "นาย ไกรสิทธิ์ พัฒโนภาษ", "attendance": [1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.5}, {"id": "6730611070", "name": "นาย ขัตติยานนท์ คัยนันท์", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [0.0, 11.5, 11.5, 11.5], "project": 41.0}, {"id": "6730611072", "name": "นาย ธันยพงศ์ ถิ่นสืบ", "attendance": [1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [0.0, 0.0, 11.5, 0.0], "project": 34}, {"id": "6730611073", "name": "น.ส. ฐาปณีย์ รัตนจินดา", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 42.5}, {"id": "6730611074", "name": "นาย ยุทธภูมิ เพชรบริสุทธิ์", "attendance": [1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.5}, {"id": "6730611075", "name": "นาย ธนชาติ เอ่งฉ้วน", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 40.5}, {"id": "6730611076", "name": "นาย กันตภูมิ คงเจริญ", "attendance": [1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 44.5}, {"id": "6730611077", "name": "นาย วิชยุตม์ บุ้งทอง", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 45}, {"id": "6730611078", "name": "นาย ณัฐภัทร แย้มแก้ว", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 38.5}, {"id": "6730611080", "name": "นาย พุฒิพงศ์ เรืองอ่อน", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 0.0], "project": 45}, {"id": "6730611083", "name": "น.ส. สรณ์สิริ รักไทย", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "hw": [11.5, 11.5, 11.5, 11.5], "project": 41.5}, {"id": "6730611085", "name": "นาย กันตินันท์ เนาวบุตร", "attendance": [1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.5, 1.0], "hw": [11.5, 0.0, 11.5, 0.0], "project": 43.5}, {"id": "6730611086", "name": "นาย มูฮัมหมัดลุตฟี สีตีเล๊าะ", "attendance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0], "hw": [0.0, 11.5, 11.5, 0.0], "project": 45}];

// ==========================================================================
// 2. รายชื่อนักศึกษา รหัสนักศึกษา ชื่อ - นามสกุล และหัวข้อโปรเจกต์ (27 กลุ่ม / 64 คน)
//    - คอลัมน์ "ลำดับ" รันต่อเนื่อง 1, 2, 3, ... ลงมาเรื่อยๆ (เริ่มต้นที่กลุ่ม 1 เป็นลำดับที่ 1)
//    - คอลัมน์ "หัวข้อโปรเจกต์" แสดงหัวข้อเพียง 1 ครั้งต่อกลุ่ม
// ==========================================================================
const DEFAULT_PROJECT_ROWS = [{"groupNo": 1, "groupName": "กลุ่มที่ 1", "projectTitle": "วิดีโอแนะนำ ประเภทเครื่องบินในเกม war thunder ในสัญชาติเยอรมัน", "id": "6730611001", "name": "คุณานนต์ แพใหญ่", "criteria": [5, 9, 9, 5, 4, 4, 4]}, {"groupNo": 1, "groupName": "กลุ่มที่ 1", "projectTitle": "วิดีโอแนะนำ ประเภทเครื่องบินในเกม war thunder ในสัญชาติเยอรมัน", "id": "6730611006", "name": "ธนกฤต จริยวัตกุล", "criteria": [5, 9, 9, 5, 4, 4, 4]}, {"groupNo": 1, "groupName": "กลุ่มที่ 1", "projectTitle": "วิดีโอแนะนำ ประเภทเครื่องบินในเกม war thunder ในสัญชาติเยอรมัน", "id": "6730611064", "name": "ธนโชติ สุวรรณวงศ์", "criteria": [5, 9, 9, 5, 4, 4, 4]}, {"groupNo": 2, "groupName": "กลุ่มที่ 2", "projectTitle": "Calendar", "id": "6730611002", "name": "สุชัญญา หลายกิจวุฒิพันธ์", "criteria": [5, 9, 9, 4, 4, 4, 3]}, {"groupNo": 2, "groupName": "กลุ่มที่ 2", "projectTitle": "Calendar", "id": "6730611036", "name": "ธเนศ งามพสุธาดล", "criteria": [5, 9, 9, 4, 4, 4, 3]}, {"groupNo": 3, "groupName": "กลุ่มที่ 3", "projectTitle": "Website แนะนำgame engine สำหรับการสร้างเกมแนว survival horror", "id": "6730611004", "name": "ชนาภา อุดมทรัพย์", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 3, "groupName": "กลุ่มที่ 3", "projectTitle": "Website แนะนำgame engine สำหรับการสร้างเกมแนว survival horror", "id": "6730611031", "name": "ธนพัฒน์ แสนดี", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 3, "groupName": "กลุ่มที่ 3", "projectTitle": "Website แนะนำgame engine สำหรับการสร้างเกมแนว survival horror", "id": "6730611032", "name": "พิศุทธิ์ หิรัญจรัสพิวัฒน์", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 4, "groupName": "กลุ่มที่ 4", "projectTitle": "Application PetHelper ตอบโจทย์ไลฟ์สไตล์คนรักสัตว์", "id": "6730611005", "name": "จิรเมธ สุขลี่", "criteria": [5, 8, 8, 5, 4, 4, 4]}, {"groupNo": 4, "groupName": "กลุ่มที่ 4", "projectTitle": "Application PetHelper ตอบโจทย์ไลฟ์สไตล์คนรักสัตว์", "id": "6730611045", "name": "กิตติพัชญ์ เอกพงศ์วิทย์", "criteria": [5, 8, 8, 5, 4, 4, 4]}, {"groupNo": 5, "groupName": "กลุ่มที่ 5", "projectTitle": "Web App ผู้ช่วยหาช่าง เพื่อแก้ปัญหา ติดต่อช่างและหาช่างยากเมื่อต้องการ", "id": "6730611007", "name": "ภูริณัฐ มะนะโส", "criteria": [5, 8, 8, 4.5, 4, 5, 4]}, {"groupNo": 5, "groupName": "กลุ่มที่ 5", "projectTitle": "Web App ผู้ช่วยหาช่าง เพื่อแก้ปัญหา ติดต่อช่างและหาช่างยากเมื่อต้องการ", "id": "6730611078", "name": "ณัฐภัทร แย้มแก้ว", "criteria": [5, 8, 8, 4.5, 4, 5, 4]}, {"groupNo": 6, "groupName": "กลุ่มที่ 6", "projectTitle": "Website คลังและคู่มือจัดทีมและกลยุทธ์ Pokemon (การเล่นแบบเทิร์นเบส)", "id": "6730611008", "name": "ธนวัต เอกบุตร", "criteria": [5, 8, 8, 4, 4, 4, 4]}, {"groupNo": 6, "groupName": "กลุ่มที่ 6", "projectTitle": "Website คลังและคู่มือจัดทีมและกลยุทธ์ Pokemon (การเล่นแบบเทิร์นเบส)", "id": "6730611038", "name": "นิธิทัต ตินตะชาติ", "criteria": [5, 8, 8, 4, 4, 4, 4]}, {"groupNo": 7, "groupName": "กลุ่มที่ 7", "projectTitle": "Web App แนะนำนิยาย", "id": "6730611009", "name": "เบญญภา ทองขาว", "criteria": [5, 8.5, 9, 5, 5, 5, 5]}, {"groupNo": 7, "groupName": "กลุ่มที่ 7", "projectTitle": "Web App แนะนำนิยาย", "id": "6730611010", "name": "ณิชตา คำวาศรี", "criteria": [5, 8.5, 9, 5, 5, 5, 5]}, {"groupNo": 8, "groupName": "กลุ่มที่ 8", "projectTitle": "Event Generator", "id": "6730611011", "name": "เสาวลักษณ์ วรพงศ์วัฒน์", "criteria": [5, 8.5, 9, 5, 5, 5, 5]}, {"groupNo": 8, "groupName": "กลุ่มที่ 8", "projectTitle": "Event Generator", "id": "6730611023", "name": "ธนกฤต ดวงแก้ว", "criteria": [5, 8.5, 9, 5, 5, 5, 5]}, {"groupNo": 9, "groupName": "กลุ่มที่ 9", "projectTitle": "Web App ทำนายดวงด้วยไพ่ทาโร่", "id": "6730611012", "name": "ทักษิณารัตย์ พัฒสงค์", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 9, "groupName": "กลุ่มที่ 9", "projectTitle": "Web App ทำนายดวงด้วยไพ่ทาโร่", "id": "6730611016", "name": "ภูวเมศฐ์ พงศ์จารุวิชญ์", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 9, "groupName": "กลุ่มที่ 9", "projectTitle": "Web App ทำนายดวงด้วยไพ่ทาโร่", "id": "6730611066", "name": "ซอนญ่า ภักดี", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 10, "groupName": "กลุ่มที่ 10", "projectTitle": "Ai Teaser Video", "id": "6730611013", "name": "โชติธนกฤต อารีมิตร", "criteria": [5, 9, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 10, "groupName": "กลุ่มที่ 10", "projectTitle": "Ai Teaser Video", "id": "6730611053", "name": "นิจสิรี สุทธิเจริญ", "criteria": [5, 9, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 10, "groupName": "กลุ่มที่ 10", "projectTitle": "Ai Teaser Video", "id": "6730611083", "name": "สรณ์สิริ รักไทย", "criteria": [5, 9, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 11, "groupName": "กลุ่มที่ 11", "projectTitle": "Web เล่นเกมหมากฮอส", "id": "6730611017", "name": "กีรดิษ บุญสูง", "criteria": [5, 9, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 11, "groupName": "กลุ่มที่ 11", "projectTitle": "Web เล่นเกมหมากฮอส", "id": "6730611061", "name": "ณัฐสิทธิ์ ทองจันทร์", "criteria": [5, 9, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 12, "groupName": "กลุ่มที่ 12", "projectTitle": "Web แบบ local สำหรับการทำ Pomodoro เพื่อช่วยในการโฟกัสกับงาน", "id": "6730611019", "name": "ศุภกร ทวีรัตน์", "criteria": [5, 9, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 12, "groupName": "กลุ่มที่ 12", "projectTitle": "Web แบบ local สำหรับการทำ Pomodoro เพื่อช่วยในการโฟกัสกับงาน", "id": "6730611027", "name": "ธนกฤต คล้ายแก้ว", "criteria": [5, 9, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 13, "groupName": "กลุ่มที่ 13", "projectTitle": "แบรนด์ Black tea iced (ชาดำเย็น) กระป๋อง วิดีโอโฆษณาและโปสเตอร์", "id": "6730611020", "name": "ณัฐณิชา ศรีธรรม", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 13, "groupName": "กลุ่มที่ 13", "projectTitle": "แบรนด์ Black tea iced (ชาดำเย็น) กระป๋อง วิดีโอโฆษณาและโปสเตอร์", "id": "6730611033", "name": "ธนพล ถาวรมาศ", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 14, "groupName": "กลุ่มที่ 14", "projectTitle": "Web การแข่งขันทดสอบความรู้", "id": "6730611021", "name": "สงกรานต์ นนทามิตร", "criteria": [5, 9.5, 10, 5, 5, 5, 5]}, {"groupNo": 14, "groupName": "กลุ่มที่ 14", "projectTitle": "Web การแข่งขันทดสอบความรู้", "id": "6730611035", "name": "กรกฤต นวลละออง", "criteria": [5, 9.5, 10, 5, 5, 5, 5]}, {"groupNo": 14, "groupName": "กลุ่มที่ 14", "projectTitle": "Web การแข่งขันทดสอบความรู้", "id": "6730611059", "name": "พงศธร ฉิมล่องดำ", "criteria": [5, 9.5, 10, 5, 5, 5, 5]}, {"groupNo": 15, "groupName": "กลุ่มที่ 15", "projectTitle": "Photoboothสำหรับการถ่ายรูป", "id": "6730611022", "name": "สิรภัทร นวลแก้ว", "criteria": [5, 9, 10, 4.5, 4.5, 4.5, 5]}, {"groupNo": 15, "groupName": "กลุ่มที่ 15", "projectTitle": "Photoboothสำหรับการถ่ายรูป", "id": "6730611057", "name": "จักรีพร สุทธิชาติ", "criteria": [5, 9, 10, 4.5, 4.5, 4.5, 5]}, {"groupNo": 15, "groupName": "กลุ่มที่ 15", "projectTitle": "Photoboothสำหรับการถ่ายรูป", "id": "6730611073", "name": "ฐาปณีย์ รัตนจินดา", "criteria": [5, 9, 10, 4.5, 4.5, 4.5, 5]}, {"groupNo": 16, "groupName": "กลุ่มที่ 16", "projectTitle": "โปรแกรม FrameStory เรื่องราวของเฟรม", "id": "6730611028", "name": "วาที คชลักษ์", "criteria": [5, 9, 9, 4.5, 4.5, 4, 5]}, {"groupNo": 16, "groupName": "กลุ่มที่ 16", "projectTitle": "โปรแกรม FrameStory เรื่องราวของเฟรม", "id": "6730611048", "name": "ศุภกร แย้มวาจา", "criteria": [5, 9, 9, 4.5, 4.5, 4, 5]}, {"groupNo": 17, "groupName": "กลุ่มที่ 17", "projectTitle": "Web App จำลองการออกแบบห้อง", "id": "6730611029", "name": "วิสุทธิ์ ณ พัทลุง", "criteria": [5, 8.5, 9, 4.5, 4.5, 4, 5]}, {"groupNo": 17, "groupName": "กลุ่มที่ 17", "projectTitle": "Web App จำลองการออกแบบห้อง", "id": "6730611065", "name": "ภควัฒน์ สะมาน", "criteria": [5, 8.5, 9, 4.5, 4.5, 4, 5]}, {"groupNo": 17, "groupName": "กลุ่มที่ 17", "projectTitle": "Web App จำลองการออกแบบห้อง", "id": "6730611075", "name": "ธนชาติ เอ่งฉ้วน", "criteria": [5, 8.5, 9, 4.5, 4.5, 4, 5]}, {"groupNo": 18, "groupName": "กลุ่มที่ 18", "projectTitle": "AI Mood Playlist", "id": "6730611034", "name": "ณัฐวดี โภคะศฤงคาร", "criteria": [5, 7, 7, 4, 4, 4, 3]}, {"groupNo": 18, "groupName": "กลุ่มที่ 18", "projectTitle": "AI Mood Playlist", "id": "6730611072", "name": "ธันยพงศ์ ถิ่นสืบ", "criteria": [5, 7, 7, 4, 4, 4, 3]}, {"groupNo": 19, "groupName": "กลุ่มที่ 19", "projectTitle": "Web App แนะนำอุปกรณ์แบดมินตันให้เหมาะกับสไตล์การเล่น", "id": "6730611039", "name": "กนิษฐ หิรัญคุปต์", "criteria": [5, 9, 9.5, 5, 5, 5, 5]}, {"groupNo": 19, "groupName": "กลุ่มที่ 19", "projectTitle": "Web App แนะนำอุปกรณ์แบดมินตันให้เหมาะกับสไตล์การเล่น", "id": "6730611085", "name": "กันตินันท์ เนาวบุตร", "criteria": [5, 9, 9.5, 5, 5, 5, 5]}, {"groupNo": 20, "groupName": "กลุ่มที่ 20", "projectTitle": "Brand เสื้อผ้า", "id": "6730611043", "name": "พลภัทร จันทรสุต", "criteria": [5, 8, 9, 5, 5, 5, 5]}, {"groupNo": 20, "groupName": "กลุ่มที่ 20", "projectTitle": "Brand เสื้อผ้า", "id": "6730611047", "name": "สิวารักษ์ เศษนาม", "criteria": [5, 8, 9, 5, 5, 5, 5]}, {"groupNo": 21, "groupName": "กลุ่มที่ 21", "projectTitle": "Phuket traffic light", "id": "6730611044", "name": "วงศกร ศิริคณินทร์", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 21, "groupName": "กลุ่มที่ 21", "projectTitle": "Phuket traffic light", "id": "6730611062", "name": "ณัฐพงศ์ ตันบำรุง", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 21, "groupName": "กลุ่มที่ 21", "projectTitle": "Phuket traffic light", "id": "6730611077", "name": "วิชยุตม์ บุ้งทอง", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 22, "groupName": "กลุ่มที่ 22", "projectTitle": "Web จำลองทางเลือกชีวิต", "id": "6730611046", "name": "หทัยรัตน์ กิ่งแก้ว", "criteria": [5, 10, 10, 4.5, 4.5, 5, 5]}, {"groupNo": 22, "groupName": "กลุ่มที่ 22", "projectTitle": "Web จำลองทางเลือกชีวิต", "id": "6730611060", "name": "ธวัลรัตน์ คำแหง", "criteria": [5, 10, 10, 4.5, 4.5, 5, 5]}, {"groupNo": 23, "groupName": "กลุ่มที่ 23", "projectTitle": "Discord bot ใช้สำหรับถามข้อมูลเกมสำหรับ เกม monsters hunter wilds คล้ายๆ wiki แต่อยู่ใน discord", "id": "6730611054", "name": "อริยะ แพงพา", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 23, "groupName": "กลุ่มที่ 23", "projectTitle": "Discord bot ใช้สำหรับถามข้อมูลเกมสำหรับ เกม monsters hunter wilds คล้ายๆ wiki แต่อยู่ใน discord", "id": "6730611056", "name": "วศิน เลี่ยมแก้ว", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 23, "groupName": "กลุ่มที่ 23", "projectTitle": "Discord bot ใช้สำหรับถามข้อมูลเกมสำหรับ เกม monsters hunter wilds คล้ายๆ wiki แต่อยู่ใน discord", "id": "6730611068", "name": "คมกริช พรมปาน", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 24, "groupName": "กลุ่มที่ 24", "projectTitle": "Keymage-GAME", "id": "6730611055", "name": "รพีภัทร อุตโม", "criteria": [5, 8.5, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 24, "groupName": "กลุ่มที่ 24", "projectTitle": "Keymage-GAME", "id": "6730611070", "name": "ขัตติยานนท์ คัยนันท์", "criteria": [5, 8.5, 9, 4.5, 4.5, 4.5, 5]}, {"groupNo": 25, "groupName": "กลุ่มที่ 25", "projectTitle": "Web App จัดระเบียบชีวิต", "id": "6730611063", "name": "เปมิกา สือสกุล", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 25, "groupName": "กลุ่มที่ 25", "projectTitle": "Web App จัดระเบียบชีวิต", "id": "6730611024", "name": "เจษฎา ถวิลถึง", "criteria": [5, 9, 9, 5, 5, 5, 5]}, {"groupNo": 26, "groupName": "กลุ่มที่ 26", "projectTitle": "Web App แนะนำอุปกรณ์กีฬา", "id": "6730611069", "name": "ไกรสิทธิ์ พัฒโนภาษ", "criteria": [5, 9.5, 10, 5, 5, 5, 5]}, {"groupNo": 26, "groupName": "กลุ่มที่ 26", "projectTitle": "Web App แนะนำอุปกรณ์กีฬา", "id": "6730611074", "name": "ยุทธภูมิ เพชรบริสุทธิ์", "criteria": [5, 9.5, 10, 5, 5, 5, 5]}, {"groupNo": 26, "groupName": "กลุ่มที่ 26", "projectTitle": "Web App แนะนำอุปกรณ์กีฬา", "id": "6730611076", "name": "กันตภูมิ คงเจริญ", "criteria": [5, 9.5, 10, 5, 5, 5, 5]}, {"groupNo": 27, "groupName": "กลุ่มที่ 27", "projectTitle": "คลิป Ai แนวตั้ง", "id": "6730611080", "name": "พุฒิพงศ์ เรืองอ่อน", "criteria": [5, 10, 10, 5, 5, 5, 5]}, {"groupNo": 27, "groupName": "กลุ่มที่ 27", "projectTitle": "คลิป Ai แนวตั้ง", "id": "6730611086", "name": "มูฮัมหมัดลุตฟี สีตีเล๊าะ", "criteria": [5, 10, 10, 5, 5, 5, 5]}];

const SESSION_DATES_SLASH = [
  "16/09/2026",
  "23/09/2026",
  "30/09/2026",
  "07/10/2026",
  "14/10/2026",
  "21/10/2026",
  "28/10/2026",
  "04/11/2026",
  "11/11/2026"
];

const RUBRIC_MAX = [5, 10, 10, 5, 5, 5, 5];
const CANCELLED_INDICES = [1, 5, 6]; // ครั้งที่ 2 (23/09/2026), ครั้งที่ 6 (21/10/2026), ครั้งที่ 7 (28/10/2026)
const STORAGE_KEY_STUDENTS = "grading_969_042g4_students_kanit_v5";
const STORAGE_KEY_PROJECTS = "grading_969_042g4_projects_kanit_v5";

let studentsData = [];
let projectRowsData = [];

// ==========================================================================
// 3. ระบบบันทึกเรียลไทม์ผ่าน localStorage
// ==========================================================================
function loadRealtimeState(defaultReason = "โหลดข้อมูลเรียลไทม์") {
  try {
    const savedStd = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (savedStd) {
      const parsed = JSON.parse(savedStd);
      if (Array.isArray(parsed) && parsed.length > 0) {
        studentsData = parsed;
      } else {
        studentsData = JSON.parse(JSON.stringify(DEFAULT_STUDENTS_DATA));
      }
    } else {
      studentsData = JSON.parse(JSON.stringify(DEFAULT_STUDENTS_DATA));
    }
  } catch (e) {
    studentsData = JSON.parse(JSON.stringify(DEFAULT_STUDENTS_DATA));
  }

  try {
    const savedProj = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (savedProj) {
      const parsedProj = JSON.parse(savedProj);
      if (Array.isArray(parsedProj) && parsedProj.length > 0) {
        projectRowsData = parsedProj;
      } else {
        projectRowsData = JSON.parse(JSON.stringify(DEFAULT_PROJECT_ROWS));
      }
    } else {
      projectRowsData = JSON.parse(JSON.stringify(DEFAULT_PROJECT_ROWS));
    }
  } catch (e) {
    projectRowsData = JSON.parse(JSON.stringify(DEFAULT_PROJECT_ROWS));
  }

  enforceCancelledClassRules();
  saveRealtimeState(defaultReason);
}

function enforceCancelledClassRules() {
  studentsData.forEach(std => {
    if (!Array.isArray(std.attendance)) std.attendance = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    std.attendance = std.attendance.slice(0, 9);
    while (std.attendance.length < 9) std.attendance.push(0);
    CANCELLED_INDICES.forEach(idx => {
      std.attendance[idx] = 1.0;
    });
  });
}

function saveRealtimeState(reasonText = "บันทึกอัตโนมัติ") {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(studentsData));
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projectRowsData));
    const badge = document.getElementById("realtimeSaveBadge");
    if (badge) {
      const nowTime = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      badge.textContent = `บันทึกเรียลไทม์แล้ว (${nowTime}) • ${reasonText}`;
    }
  } catch (err) {
    console.error("Realtime save error:", err);
  }
}

function resetAllRealtimeData() {
  if (!confirm("ต้องการรีเซตข้อมูลคะแนนทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?")) return;
  localStorage.removeItem(STORAGE_KEY_STUDENTS);
  localStorage.removeItem(STORAGE_KEY_PROJECTS);
  loadRealtimeState("รีเซตค่าเริ่มต้น");
  renderTable();
  renderProjectRowsTable();
}

// ==========================================================================
// 4. สลับแท็บ
// ==========================================================================
function switchTab(tabName) {
  const mainBtn = document.getElementById("tabBtnMain");
  const groupBtn = document.getElementById("tabBtnGroup");
  const mainView = document.getElementById("viewMainTab");
  const groupView = document.getElementById("viewGroupTab");

  if (tabName === "group") {
    mainBtn.classList.remove("active");
    groupBtn.classList.add("active");
    mainView.classList.remove("active");
    groupView.classList.add("active");
    renderProjectRowsTable();
  } else {
    groupBtn.classList.remove("active");
    mainBtn.classList.add("active");
    groupView.classList.remove("active");
    mainView.classList.add("active");
    renderTable();
  }
}

// ==========================================================================
// 5. คำนวณเกรดและคะแนน
// ==========================================================================
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

function calcAttendance25(attArr) {
  const sum9 = (attArr || []).slice(0, 9).reduce((a, b) => a + (parseFloat(b) || 0), 0);
  return (sum9 / 9.0) * 25.0;
}

function calcHomework30(hwArr) {
  const sumHw = (hwArr || []).slice(0, 4).reduce((a, b) => a + (parseFloat(b) || 0), 0);
  return (sumHw / 46.0) * 30.0;
}

function getRowProjectTotal(rowObj) {
  if (!rowObj || !Array.isArray(rowObj.criteria)) return 0;
  return rowObj.criteria.slice(0, 7).reduce((a, b) => a + (parseFloat(b) || 0), 0);
}

// ==========================================================================
// 6. เรนเดอร์ตารางหน้าแรก (ตรึงรหัสนักศึกษา และ ชื่อ - นามสกุล + เข้าเรียน 9 ครั้ง)
// ==========================================================================
function renderTable() {
  const tbody = document.getElementById("gradingBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  studentsData.forEach((std, sIndex) => {
    const tr = document.createElement("tr");
    let html = `
      <td class="sticky-col sticky-id">${std.id}</td>
      <td class="sticky-col sticky-name">${std.name}</td>
    `;

    for (let i = 0; i < 9; i++) {
      const val = std.attendance[i] ?? 0;
      const isCancelled = CANCELLED_INDICES.includes(i);
      const dateStr = SESSION_DATES_SLASH[i];
      if (isCancelled) {
        html += `<td class="cancelled-cell" title="${dateStr} (ยกคลาส คิด 1.0 ทุกคน)"><input type="number" class="score-in score-cancelled" value="1" step="0.5" min="0" max="1" disabled></td>`;
      } else {
        html += `<td title="${dateStr}"><input type="number" class="score-in" value="${val}" step="0.5" min="0" max="1" onchange="updateStudentAtt(${sIndex}, ${i}, this.value)"></td>`;
      }
    }
    const att25 = calcAttendance25(std.attendance);
    html += `<td class="col-summary">${att25.toFixed(2)}</td>`;

    for (let i = 0; i < 4; i++) {
      const val = std.hw[i] ?? 0;
      html += `<td><input type="number" class="score-in" value="${val}" step="0.5" min="0" max="11.5" onchange="updateStudentHw(${sIndex}, ${i}, this.value)"></td>`;
    }
    const hw30 = calcHomework30(std.hw);
    html += `<td class="col-summary">${hw30.toFixed(2)}</td>`;

    const projVal = parseFloat(std.project) || 0;
    html += `<td><input type="number" class="score-in" style="width:65px; font-weight:700;" value="${projVal}" step="0.25" min="0" max="45" onchange="updateStudentProj(${sIndex}, this.value)"></td>`;

    const totalScore = att25 + hw30 + projVal;
    const gradeInfo = getGrade(totalScore);

    html += `
      <td class="col-total">${totalScore.toFixed(2)}</td>
      <td class="col-grade ${gradeInfo.class}">${gradeInfo.text}</td>
    `;

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
}

function updateStudentAtt(sIndex, idx, val) {
  if (CANCELLED_INDICES.includes(idx)) {
    studentsData[sIndex].attendance[idx] = 1.0;
    renderTable();
    return;
  }
  let num = parseFloat(val);
  if (isNaN(num) || num < 0) num = 0;
  studentsData[sIndex].attendance[idx] = num;
  saveRealtimeState("แก้ไขคะแนนเข้าเรียน");
  renderTable();
}

function updateStudentHw(sIndex, idx, val) {
  let num = parseFloat(val);
  if (isNaN(num) || num < 0) num = 0;
  studentsData[sIndex].hw[idx] = num;
  saveRealtimeState("แก้ไขคะแนนการบ้าน");
  renderTable();
}

function updateStudentProj(sIndex, val) {
  let num = parseFloat(val);
  if (isNaN(num) || num < 0) num = 0;
  if (num > 45) num = 45;
  studentsData[sIndex].project = num;
  saveRealtimeState("แก้ไขคะแนนโปรเจกต์");
  renderTable();
}

// ==========================================================================
// 7. เรนเดอร์ตารางหน้าโปรเจกต์:
//    - คอลัมน์แรก "ลำดับ" รันต่อเนื่อง 1, 2, 3, ... ลงมาเรื่อยๆ (เริ่มต้นที่กลุ่ม 1 เป็นลำดับที่ 1)
//    - คอลัมน์ "รหัสนักศึกษา" และ "ชื่อ - นามสกุล" เรียงลงมา
//    - คอลัมน์ "หัวข้อโปรเจกต์" แสดงหัวข้อเพียง 1 ครั้งต่อกลุ่ม
//    - ล็อคช่อง ลำดับ, รหัสนักศึกษา, ชื่อ - นามสกุล และ หัวข้อโปรเจกต์
// ==========================================================================
function renderProjectRowsTable() {
  const tbody = document.getElementById("groupScoreBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const seenGroups = new Set();
  const groupTitlesMap = {};
  projectRowsData.forEach(r => {
    const gKey = String(r.groupNo);
    if (r.projectTitle && !groupTitlesMap[gKey]) {
      groupTitlesMap[gKey] = r.projectTitle;
    }
  });

  projectRowsData.forEach((rowObj, rIndex) => {
    const tr = document.createElement("tr");
    const seqNo = rIndex + 1;
    const gKey = String(rowObj.groupNo);
    const isFirstInGroup = !seenGroups.has(gKey);
    seenGroups.add(gKey);

    const seqDisplay = `<span class="group-num-pill">${seqNo}</span>`;
    const titleText = groupTitlesMap[gKey] || "-";
    const topicDisplay = isFirstInGroup
      ? `<span class="locked-topic-text" title="${escapeHtml(titleText)}">${escapeHtml(titleText)}</span>`
      : `<span class="merged-placeholder">-</span>`;

    let criteriaCells = "";
    for (let c = 0; c < 7; c++) {
      const maxPt = RUBRIC_MAX[c];
      const val = rowObj.criteria[c] ?? 0;
      criteriaCells += `
        <td>
          <input type="number" class="score-in" value="${val}" step="0.5" min="0" max="${maxPt}"
            onchange="updateRowCriterion(${rIndex}, ${c}, this.value)">
        </td>
      `;
    }

    const rowTotal = getRowProjectTotal(rowObj);

    tr.innerHTML = `
      <td class="locked-cell seq-col">${seqDisplay}</td>
      <td class="locked-cell id-col">${escapeHtml(rowObj.id)}</td>
      <td class="locked-cell name-col">${escapeHtml(rowObj.name)}</td>
      <td class="locked-cell topic-col">${topicDisplay}</td>
      ${criteriaCells}
      <td class="col-total">${rowTotal.toFixed(2)}</td>
      <td>
        <button type="button" class="btn-mini" onclick="removeProjectRow(${rIndex})">ลบ</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function updateRowCriterion(rIndex, cIndex, val) {
  let num = parseFloat(val);
  if (isNaN(num) || num < 0) num = 0;
  const maxPt = RUBRIC_MAX[cIndex];
  if (num > maxPt) num = maxPt;

  projectRowsData[rIndex].criteria[cIndex] = num;
  saveRealtimeState("แก้ไขคะแนนโปรเจกต์ 7 เกณฑ์");
  renderProjectRowsTable();
}

function addProjectMemberRow() {
  const sid = prompt("กรอกรหัสนักศึกษา (10 หลัก):");
  if (!sid) return;
  const cleanId = sid.trim();
  const found = studentsData.find(s => s.id === cleanId);
  const sname = found ? found.name : (prompt("กรอกชื่อ - นามสกุลนักศึกษา:") || "").trim();
  if (!sname) return;
  const grpNo = (prompt("กรอกกลุ่ม (เช่น 1):", "1") || "1").trim();

  const existingWithGroup = projectRowsData.find(r => String(r.groupNo) === grpNo && r.projectTitle);
  const projTitle = existingWithGroup ? existingWithGroup.projectTitle : (prompt("กรอกหัวข้อโปรเจกต์ของกลุ่ม (ถ้ามี):") || "").trim();

  projectRowsData.push({
    groupNo: grpNo,
    groupName: `กลุ่มที่ ${grpNo}`,
    projectTitle: projTitle,
    id: cleanId,
    name: sname,
    criteria: [0, 0, 0, 0, 0, 0, 0]
  });
  saveRealtimeState("เพิ่มรายชื่อนักศึกษาหน้าโปรเจกต์");
  renderProjectRowsTable();
}

function removeProjectRow(rIndex) {
  const target = projectRowsData[rIndex];
  if (!target) return;
  if (!confirm(`ยืนยันการลบ ${target.name} (${target.id}) ออกจากหน้าโปรเจกต์?`)) return;
  projectRowsData.splice(rIndex, 1);
  saveRealtimeState("ลบรายชื่อหน้าโปรเจกต์");
  renderProjectRowsTable();
}

// ==========================================================================
// 8. ดึงคะแนนรวมโปรเจกต์จากรหัสนักศึกษา มากรอกในหน้าแรก
// ==========================================================================
function syncProjectScoresByStudentId() {
  const studentScoreMap = {};

  projectRowsData.forEach(rowObj => {
    const sid = String(rowObj.id || "").trim();
    if (sid) {
      studentScoreMap[sid] = getRowProjectTotal(rowObj);
    }
  });

  let matchedCount = 0;
  studentsData.forEach(std => {
    const key = String(std.id || "").trim();
    if (Object.prototype.hasOwnProperty.call(studentScoreMap, key)) {
      std.project = studentScoreMap[key];
      matchedCount++;
    }
  });

  saveRealtimeState("ดึงคะแนนโปรเจกต์ตามรหัสนักศึกษา");
  renderTable();
  alert(`ดึงคะแนนโปรเจกต์ตามรหัสนักศึกษาสำเร็จ! อัปเดตคะแนนให้นักศึกษา ${matchedCount} คน`);
}

function syncAndGoMain() {
  syncProjectScoresByStudentId();
  switchTab("main");
}

// ==========================================================================
// 9. ส่งออกไฟล์ CSV ให้ครบทั้งหน้าคะแนนรวมและหน้าคะแนนโปรเจกต์
// ==========================================================================
function exportToCSV() {
  let csv = "\uFEFF=== หน้าคะแนนรวม (65 คน) ===\n";
  csv += "รหัสนักศึกษา,ชื่อ-นามสกุล,16/09/2026,23/09/2026 (ยกคลาส),30/09/2026,07/10/2026,14/10/2026,21/10/2026 (ยกคลาส),28/10/2026 (ยกคลาส),04/11/2026,11/11/2026,รวมเข้าเรียน (25%),การบ้าน1,การบ้าน2,การบ้าน3,การบ้าน4,รวมการบ้าน (30%),คะแนนโปรเจกต์ (45),คะแนนรวม,เกรด\n";

  studentsData.forEach(std => {
    const att = std.attendance;
    const hw = std.hw;
    const att25 = calcAttendance25(att);
    const hw30 = calcHomework30(hw);
    const proj = parseFloat(std.project) || 0;
    const total = att25 + hw30 + proj;
    const gradeInfo = getGrade(total);

    csv += `="${std.id}","${std.name}",${att.join(",")},${att25.toFixed(2)},${hw.join(",")},${hw30.toFixed(2)},${proj.toFixed(2)},${total.toFixed(2)},"${gradeInfo.text}"\n`;
  });

  csv += "\n=== หน้าคะแนนโปรเจกต์ ===\n";
  csv += "ลำดับ,รหัสนักศึกษา,ชื่อ-นามสกุล,หัวข้อโปรเจกต์,1. ที่มาและแนวคิด (/5),2. การใช้ AI (/10),3. ผลงานที่ทำได้จริง (/10),4. การออกแบบและ UX (/5),5. เอกสารประกอบ (/5),6. การใช้ AI อย่างรับผิดชอบ (/5),7. การนำเสนอและสาธิต (/5),รวมคะแนนโปรเจกต์ (45)\n";

  const seenGroups = new Set();
  projectRowsData.forEach((rowObj, idx) => {
    const gKey = String(rowObj.groupNo);
    const isFirst = !seenGroups.has(gKey);
    seenGroups.add(gKey);
    const c = rowObj.criteria || [0, 0, 0, 0, 0, 0, 0];
    const pTotal = getRowProjectTotal(rowObj);
    const titleVal = isFirst ? (rowObj.projectTitle || "") : "";
    csv += `${idx + 1},="${rowObj.id}","${rowObj.name}","${titleVal}",${c.join(",")},${pTotal.toFixed(2)}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Grading_969-042G4_All_Scores.csv`;
  link.click();
}

document.addEventListener("DOMContentLoaded", () => {
  loadRealtimeState("พร้อมใช้งาน");
  renderTable();
  renderProjectRowsTable();
});
