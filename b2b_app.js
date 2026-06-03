/* ==========================================================================
   🚀 Nucistion B2B Dashboard Application Logic
   ========================================================================== */

// ===== 👥 MOCK PATIENTS & MEMBERS DATABASE =====
const mockPatients = [
  {
    id: "P001",
    name: "คุณป้าสมใจ รักสุขภาพ",
    avatar: "👩‍🦳",
    gender: "หญิง",
    risk: "red",
    program: "Diabetes", // Diabetes, Hypertension, Obesity, Gym-Bulk, Gym-Cut, Gym-Recomp
    enrolledDate: "2026-03-12",
    height: 158,
    weight: 82.0,
    bodyFat: 32.0,
    bodyCompGoal: "recomp",
    lastActive: "วันนี้",
    aiSummary: [
      "ค่าน้ำตาลสะสม <strong>HbA1c เฉลี่ย 7.4%</strong> มีแนวโน้มลดลงจากสัปดาห์แรก (8.2%) แต่ยังสูงกว่าเกณฑ์ควบคุม 7.0% เล็กน้อย",
      "มีประวัติทาน <strong>น้ำตาลเฉลี่ย 38 กรัมต่อวัน</strong> (เกินเป้าหมายความดันและเบาหวานที่จำกัดไว้ 25 กรัม) จากผลตรวจพบชาไทยในมื้อบ่ายบ่อยครั้ง",
      "แนะนำให้เน้นการปรับพฤติกรรม <strong>Swap สลัดถั่วทดแทนโจ๊กซองมื้อดึก</strong> เพื่อหลีกเลี่ยงสภาวะ Insulin Spike ตอนนอน"
    ],
    labHistory: [
      { date: "2026-03-15", hba1c: 8.2, bp: "148/92", cholesterol: 240, weight: 85.0, waist: 98 },
      { date: "2026-04-18", hba1c: 7.8, bp: "142/88", cholesterol: 228, weight: 83.5, waist: 96 },
      { date: "2026-05-20", hba1c: 7.4, bp: "138/85", cholesterol: 215, weight: 82.0, waist: 94 }
    ],
    weeklyIntake: {
      sodium: 1950,
      sugar: 38,
      calories: 1420
    },
    appointments: [
      { day: 2, time: "09:00", type: "Follow-up", compliance: "logged" }, // 2 = Tue, 3 = Wed...
      { day: 5, time: "14:30", type: "Nutrition Counseling", compliance: "partial" }
    ]
  },
  {
    id: "P002",
    name: "นายอนุชา เพิ่มกล้าม",
    avatar: "💪",
    gender: "ชาย",
    risk: "green",
    program: "Gym-Bulk",
    enrolledDate: "2026-01-15",
    height: 178,
    weight: 73.0,
    bodyFat: 15.0,
    bodyCompGoal: "bulk",
    lastActive: "เมื่อวาน",
    aiSummary: [
      "สัดส่วนมวลกายไร้ไขมัน <strong>Lean Mass อยู่ที่ 62.1 kg</strong> พัฒนาเพิ่มขึ้นอย่างมีนัยสำคัญจากแรกเข้า (60.2 kg)",
      "เป้าหมายโปรตีนเฉลี่ยต่อวันทำได้ดีมาก <strong>ได้รับ 112 กรัมต่อวัน</strong> (อยู่ในสัดส่วน 1.6 - 2.2g/kg LBM) เสริมสร้างมวลกล้ามเนื้อได้ดี",
      "มีประวัติยกเวทหนักสม่ำเสมอ แนะนำให้เฝ้าระวัง <strong>Kidney Load จากโปรตีนสูง</strong> โดยดื่มน้ำสะอาดชดเชยอย่างน้อยวันละ 3.0 ลิตร"
    ],
    labHistory: [
      { date: "2026-01-18", hba1c: 5.2, bp: "120/78", cholesterol: 180, weight: 71.0, waist: 73 },
      { date: "2026-03-20", hba1c: 5.3, bp: "122/80", cholesterol: 185, weight: 72.0, waist: 73 },
      { date: "2026-05-28", hba1c: 5.1, bp: "118/75", cholesterol: 175, weight: 73.0, waist: 74 }
    ],
    weeklyIntake: {
      sodium: 2350,
      sugar: 22,
      calories: 2750
    },
    appointments: [
      { day: 1, time: "17:00", type: "Personal Training", compliance: "logged" },
      { day: 3, time: "18:00", type: "Body Comp Check", compliance: "logged" },
      { day: 5, time: "17:00", type: "Personal Training", compliance: "logged" }
    ]
  },
  {
    id: "P003",
    name: "น้องแก้ว ลีนฟิต",
    avatar: "🏃",
    gender: "หญิง",
    risk: "yellow",
    program: "Obesity",
    enrolledDate: "2026-04-05",
    height: 162,
    weight: 65.0,
    bodyFat: 26.0,
    bodyCompGoal: "cut",
    lastActive: "วันนี้",
    aiSummary: [
      "อัตราไขมันสะสมลดลงจาก 30% เหลือ <strong>26% Body Fat</strong> โดยรักษามวลกล้ามเนื้อไว้ได้ดีเยี่ยม",
      "ปริมาณการจำกัดแคลอรีสะสมอยู่ในเกณฑ์ปกติ แต่ <strong>พลังงานลดลงเฉลี่ย 850 kcal/วัน</strong> เฝ้าระวังภาวะ Metabolic Slowdown",
      "แนะนำให้แทรกวัน <strong>Refeed คาร์โบไฮเดรตเชิงซ้อน 1 วันต่อสัปดาห์</strong> เพื่อกระตุ้นระดับฮอร์โมนเผาผลาญ Leptin"
    ],
    labHistory: [
      { date: "2026-04-10", hba1c: 5.8, bp: "132/84", cholesterol: 210, weight: 68.0, waist: 98 },
      { date: "2026-05-12", hba1c: 5.6, bp: "128/82", cholesterol: 198, weight: 66.2, waist: 95 },
      { date: "2026-05-31", hba1c: 5.4, bp: "124/80", cholesterol: 190, weight: 65.0, waist: 92 }
    ],
    weeklyIntake: {
      sodium: 1650,
      sugar: 18,
      calories: 1250
    },
    appointments: [
      { day: 3, time: "10:30", type: "Weight Consultation", compliance: "logged" },
      { day: 6, time: "09:00", type: "Cardio Check", compliance: "missing" }
    ]
  },
  {
    id: "P004",
    name: "ลุงสมยศ ใจเย็น",
    avatar: "👨‍🦳",
    gender: "ชาย",
    risk: "red",
    program: "Hypertension",
    enrolledDate: "2026-02-20",
    height: 165,
    weight: 78.0,
    bodyFat: 28.0,
    bodyCompGoal: "none",
    lastActive: "3 วันก่อน",
    aiSummary: [
      "ค่าความดันโลหิต SYS เฉลี่ยลดลงจาก 155 เหลือ <strong>141 mmHg</strong> แสดงผลลัพธ์การคุมโซเดียมที่ดี",
      "ปริมาณโซเดียมสะสมสัปดาห์นี้เฉลี่ย <strong>2,450 mgต่อวัน</strong> สูงกว่าเป้าหมาย DASH Diet (2,000 mg) เล็กน้อย",
      "พบพฤติกรรมชอบทาน <strong>น้ำซุปแกงไตปลา/แกงส้ม</strong> แนะนำให้เลี่ยงการซดน้ำซุปเพื่อตัดโซเดียมออกถึง 800 mg ต่อมื้อ"
    ],
    labHistory: [
      { date: "2026-02-22", hba1c: 6.2, bp: "155/95", cholesterol: 235, weight: 80.0, waist: 92 },
      { date: "2026-04-05", hba1c: 6.0, bp: "148/90", cholesterol: 220, weight: 79.1, waist: 91 },
      { date: "2026-05-15", hba1c: 5.9, bp: "141/86", cholesterol: 212, weight: 78.0, waist: 89 }
    ],
    weeklyIntake: {
      sodium: 2450,
      sugar: 28,
      calories: 1550
    },
    appointments: [
      { day: 2, time: "11:00", type: "BP Check", compliance: "partial" }
    ]
  },
  {
    id: "P005",
    name: "คุณวิภา คุมหวาน",
    avatar: "👩",
    gender: "หญิง",
    risk: "yellow",
    program: "Diabetes",
    enrolledDate: "2026-05-02",
    height: 155,
    weight: 59.0,
    bodyFat: 29.0,
    bodyCompGoal: "recomp",
    lastActive: "วันนี้",
    aiSummary: [
      "ค่าน้ำตาลสะสม <strong>HbA1c เฉลี่ย 6.8%</strong> ถือว่าสามารถควบคุมอยู่ในเกณฑ์ค่อนข้างดี (เกณฑ์ควบคุมเบาหวาน < 7.0%)",
      "สัดส่วนน้ำตาลสัปดาห์นี้ <strong>ลดลง 25%</strong> โดยทานเฉลี่ยวันละ 24 กรัม ปลอดภัยตามเกณฑ์สูงสุดของเบาหวาน",
      "พบประวัติการเลือกทานอาหารว่างประเภทเบอร์รี่สดทดแทนขนมถ้วย แนะนำให้ทำพฤติกรรมเชิงบวกนี้อย่างต่อเนื่อง"
    ],
    labHistory: [
      { date: "2026-05-04", hba1c: 7.2, bp: "135/85", cholesterol: 198, weight: 60.5, waist: 82 },
      { date: "2026-05-29", hba1c: 6.8, bp: "130/80", cholesterol: 185, weight: 59.0, waist: 80 }
    ],
    weeklyIntake: {
      sodium: 1450,
      sugar: 24,
      calories: 1380
    },
    appointments: [
      { day: 4, time: "13:30", type: "Diabetes Follow-up", compliance: "logged" }
    ]
  }
];

// ===== ⚙️ GLOBAL PORTAL STATES =====
let activeB2BMode = 'ncd'; // ncd (Clinical Program) or fitness (Gym Program)
let activeB2BTab = 'patients'; // patients, calendar, analytics, research
let selectedPatientId = null;
let currentBfMethod = 'manual';

// ===== 🚀 INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Set default selected patient
  if (mockPatients.length > 0) {
    selectedPatientId = mockPatients[0].id;
  }
  
  // Render views
  switchB2BMode(activeB2BMode);
  switchB2BTab(activeB2BTab);
  renderRegistry();
  loadPatientDetails();
  renderCalendarGrid();
  renderThailandMap();
  renderTriggerFoods();
  renderInterventionsTable();
  renderPolicyAlerts();
});

// ===== 📱 MODE SWITCHER (NCD CLINIC VS FITNESS GYM) =====
function switchB2BMode(mode) {
  activeB2BMode = mode;
  
  // Update toggle buttons active class
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`mode-btn-${mode}`).classList.add('active');
  
  // Update UI Elements depending on mode
  const headerTitle = document.getElementById('header-status-title');
  const avatar = document.getElementById('portal-avatar');
  const userName = document.getElementById('portal-user-name');
  const userRole = document.getElementById('portal-user-role');
  
  const clinicFields = document.querySelectorAll('.clinic-only-field');
  const clinicOptions = document.querySelectorAll('.clinic-only-opt');
  const fitnessOptions = document.querySelectorAll('.fitness-only-opt');
  
  if (mode === 'ncd') {
    if (headerTitle) headerTitle.textContent = "ระบบพอร์ทัลคลินิกโรคเรื้อรัง (NCD Program)";
    if (avatar) avatar.textContent = "⚕️";
    if (userName) userName.textContent = "นพ. สมชาย รักดี";
    if (userRole) userRole.textContent = "แพทย์เฉพาะทาง NCDs";
    
    // Show clinical fields in form
    clinicFields.forEach(f => f.style.display = 'block');
    
    // Toggle filter options
    clinicOptions.forEach(opt => opt.style.display = 'block');
    fitnessOptions.forEach(opt => opt.style.display = 'none');
    document.getElementById('filter-type-opt-all').textContent = "ทุกประเภทโรค NCDs";
  } else {
    if (headerTitle) headerTitle.textContent = "ระบบจัดการโภชนาการสมาชิก (Fitness Trainer Portal)";
    if (avatar) avatar.textContent = "🏋️‍♂️";
    if (userName) userName.textContent = "โค้ชพีท ฟิตกล้าม";
    if (userRole) userRole.textContent = "หัวหน้าผู้ฝึกสอนโภชนาการกีฬา";
    
    // Hide clinical fields in form
    clinicFields.forEach(f => f.style.display = 'none');
    
    // Toggle filter options
    clinicOptions.forEach(opt => opt.style.display = 'none');
    fitnessOptions.forEach(opt => opt.style.display = 'block');
    document.getElementById('filter-type-opt-all').textContent = "ทุกเป้าหมายฟิตเนส";
  }
  
  // Refresh Registry list & selected profile representation
  applyRegistryFilters();
  loadPatientDetails();
}

// ===== 🧭 TAB NAVIGATION =====
function switchB2BTab(tabId) {
  activeB2BTab = tabId;
  
  // Remove active nav styles
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`nav-btn-${tabId}`).classList.add('active');
  
  // Hide all panel sections
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.getElementById(`panel-${tabId}`).classList.add('active');
  
  // Special renders on load
  if (tabId === 'calendar') {
    renderCalendarGrid();
  } else if (tabId === 'analytics') {
    renderThailandMap();
  }
}

// ===== 👥 REGISTRY LIST RENDERING =====
function renderRegistry(filteredList = mockPatients) {
  const container = document.getElementById('registry-items-list');
  const countBadge = document.getElementById('patient-count-badge');
  if (!container) return;
  
  container.innerHTML = "";
  countBadge.textContent = `${filteredList.length} คน`;
  
  if (filteredList.length === 0) {
    container.innerHTML = `<div class="center-empty-state" style="padding:40px 10px; height:auto;">
      <span style="font-size:1.5rem;">🔍</span>
      <p style="font-size:0.65rem; margin-top:4px;">ไม่พบบัญชีรายชื่อที่ตรงกับเงื่อนไขตัวกรอง</p>
    </div>`;
    return;
  }
  
  filteredList.forEach(p => {
    const isSelected = (p.id === selectedPatientId);
    
    const card = document.createElement('div');
    card.className = `registry-item ${isSelected ? 'active' : ''}`;
    card.onclick = () => selectPatient(p.id);
    
    const riskBadge = p.risk === 'red' ? 'เสี่ยงสูง 🔴' : p.risk === 'yellow' ? 'เสี่ยงปานกลาง 🟡' : 'เสี่ยงต่ำ 🟢';
    const subLabel = activeB2BMode === 'ncd' ? `NCD: ${p.program}` : `Goal: ${p.program.replace('Gym-', '')}`;
    
    card.innerHTML = `
      <div class="ri-left">
        <div class="ri-avatar">${p.avatar}</div>
        <div class="ri-meta">
          <span class="ri-name">${p.name}</span>
          <span class="ri-subtext">${subLabel}</span>
        </div>
      </div>
      <div class="ri-right">
        <span class="badge ${p.risk === 'red' ? 'badge-risk-red' : p.risk === 'yellow' ? 'badge-risk-yellow' : 'badge-risk-green'}">${riskBadge}</span>
        <span class="ri-date">${p.lastActive}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function selectPatient(patientId) {
  selectedPatientId = patientId;
  // Update visual registry list active highlights
  document.querySelectorAll('.registry-item').forEach(item => item.classList.remove('active'));
  renderRegistry(getFilteredPatients());
  loadPatientDetails();
}

// ===== 🔍 FILTERS & SEARCH ALGORITHMS =====
function getFilteredPatients() {
  const query = document.getElementById('global-search').value.toLowerCase().trim();
  const riskFilter = document.getElementById('filter-risk').value;
  const typeFilter = document.getElementById('filter-type').value;
  
  return mockPatients.filter(p => {
    // Mode compatibility filter
    if (activeB2BMode === 'ncd' && p.program.startsWith('Gym-')) return false;
    if (activeB2BMode === 'fitness' && !p.program.startsWith('Gym-') && p.program !== 'Obesity') return false;
    
    // Search query match name/id
    const matchesSearch = p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query);
    
    // Risk level match
    const matchesRisk = (riskFilter === 'all') || (p.risk === riskFilter);
    
    // Program NCD type match
    const matchesType = (typeFilter === 'all') || (p.program === typeFilter) || (typeFilter === 'Obesity' && p.program === 'Obesity');
    
    return matchesSearch && matchesRisk && matchesType;
  });
}

function applyRegistryFilters() {
  const filtered = getFilteredPatients();
  
  // If current selection is not in filtered list, auto-select first from filtered list
  if (filtered.length > 0 && !filtered.some(p => p.id === selectedPatientId)) {
    selectedPatientId = filtered[0].id;
  } else if (filtered.length === 0) {
    selectedPatientId = null;
  }
  
  renderRegistry(filtered);
}

function handleGlobalSearch() {
  applyRegistryFilters();
}

// ===== 📄 PATIENT DETAILS LOADER & KPI GENERATORS =====
function loadPatientDetails() {
  const detailsArea = document.getElementById('patient-active-details');
  const emptyArea = document.getElementById('no-patient-selected-view');
  
  if (!selectedPatientId) {
    if (detailsArea) detailsArea.style.display = 'none';
    if (emptyArea) emptyArea.style.display = 'flex';
    return;
  }
  
  if (detailsArea) detailsArea.style.display = 'block';
  if (emptyArea) emptyArea.style.display = 'none';
  
  const patient = mockPatients.find(p => p.id === selectedPatientId);
  if (!patient) return;
  
  // Header details
  document.getElementById('det-name').textContent = patient.name;
  document.getElementById('det-avatar').textContent = patient.avatar;
  document.getElementById('det-enroll-date').textContent = `ลงทะเบียน: ${patient.enrolledDate}`;
  
  const riskBadge = document.getElementById('det-risk-badge');
  if (riskBadge) {
    riskBadge.textContent = patient.risk === 'red' ? 'เสี่ยงสูง 🔴' : patient.risk === 'yellow' ? 'เสี่ยงปานกลาง 🟡' : 'เสี่ยงต่ำ 🟢';
    riskBadge.className = `badge ${patient.risk === 'red' ? 'badge-risk-red' : patient.risk === 'yellow' ? 'badge-risk-yellow' : 'badge-risk-green'}`;
  }
  
  const progBadge = document.getElementById('det-program-badge');
  if (progBadge) {
    if (activeB2BMode === 'ncd') {
      progBadge.textContent = `โปรแกรมโรค: ${patient.program === 'Diabetes' ? 'เบาหวาน Type 2' : patient.program === 'Hypertension' ? 'ความดันโลหิตสูง' : 'ควบคุมโรคอ้วน NCD'}`;
      progBadge.className = "badge badge-ncd-tag";
    } else {
      progBadge.textContent = `เป้าหมายยิม: ${patient.program.replace('Gym-', '')}`;
      progBadge.className = "badge badge-risk-green";
    }
  }

  // AI Summary Card (B.1)
  const aiBulletsList = document.getElementById('det-ai-bullets');
  const aiTitle = document.getElementById('ai-card-title');
  if (aiBulletsList) {
    aiBulletsList.innerHTML = "";
    if (activeB2BMode === 'ncd') {
      if (aiTitle) aiTitle.textContent = "บทวิเคราะห์สุขภาพและโภชนาการจำเพาะโรค (AI Clinical Report)";
      patient.aiSummary.forEach(bullet => {
        const item = document.createElement('div');
        item.className = "ai-bullet";
        item.innerHTML = bullet;
        aiBulletsList.appendChild(item);
      });
    } else {
      if (aiTitle) aiTitle.textContent = "บทวิเคราะห์การสลายไขมันและเวทเทรนนิ่ง (AI Coach Review)";
      // Generate fitness bullets dynamically
      const lbm = (patient.weight * (1 - patient.bodyFat/100)).toFixed(1);
      const fatM = (patient.weight * (patient.bodyFat/100)).toFixed(1);
      
      const bullets = [
        `มวลกายไร้ไขมัน <strong>Lean Body Mass = ${lbm} kg</strong> สัดส่วนเป้าหมายโภชนาการโปรตีนคือ <strong>${Math.round(lbm*1.6)} - ${Math.round(lbm*2.2)} g/วัน</strong>`,
        `มวลไขมันส่วนเกินสะสม <strong>Fat Mass = ${fatM} kg</strong> มีสัดส่วนไขมันสะสมในโครงสร้างร่างกายคิดเป็น <strong>${patient.bodyFat}%</strong>`,
        `แผนโปรแกรมปัจจุบัน: <strong>เป้าหมาย ${patient.bodyCompGoal.toUpperCase()}</strong> สัดส่วนพลังงานรับสัปดาห์นี้เฉลี่ย <strong>${patient.weeklyIntake.calories} kcal/วัน</strong>`
      ];
      bullets.forEach(bullet => {
        const item = document.createElement('div');
        item.className = "ai-bullet";
        item.style.borderColor = "var(--primary)";
        item.innerHTML = bullet;
        aiBulletsList.appendChild(item);
      });
    }
  }

  // Dynamic KPI Card (B.1 side card)
  const kpiCard = document.getElementById('dynamic-kpi-card');
  if (kpiCard) {
    kpiCard.innerHTML = "";
    if (activeB2BMode === 'ncd') {
      const lastLab = patient.labHistory[patient.labHistory.length - 1];
      let val = "—";
      let lbl = "ตัวชี้วัดเป้าหมายหลัก";
      let status = "ไม่มีข้อมูลแล็บล่าสุด";
      let statusClass = "green-txt";
      
      if (patient.program === 'Diabetes') {
        val = `${lastLab.hba1c}%`;
        lbl = "ระดับน้ำตาลในเลือดสะสม (HbA1c)";
        const diff = (lastLab.hba1c - 7.0).toFixed(1);
        if (lastLab.hba1c > 7.0) {
          status = `⚠️ สูงกว่าค่าควบคุมแพทย์ +${diff}%`;
          statusClass = "red-txt";
        } else {
          status = "✓ คุมน้ำตาลสะสมอยู่ในเกณฑ์ปกติ";
          statusClass = "green-txt";
        }
      } else if (patient.program === 'Hypertension') {
        val = lastLab.bp;
        lbl = "ระดับความดันโลหิต (SYS/DIA)";
        const sys = parseInt(lastLab.bp.split('/')[0]) || 120;
        if (sys > 140) {
          status = "⚠️ ตรวจพบภาวะความดันโลหิตสูงช่วงบีบตัว";
          statusClass = "red-txt";
        } else {
          status = "✓ ความดันอยู่ในเกณฑ์น่าพึงพอใจ";
          statusClass = "green-txt";
        }
      } else {
        val = `${lastLab.weight} kg`;
        lbl = "น้ำหนักตัวปัจจุบัน";
        status = `Waist: ${lastLab.waist} ซม.`;
      }
      
      kpiCard.innerHTML = `
        <div class="card-title-row">
          <span class="card-icon">🧬</span>
          <h3 class="card-title">${lbl}</h3>
        </div>
        <div style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 8px 0 2px;">${val}</div>
        <span class="badge ${statusClass === 'red-txt' ? 'badge-risk-red' : 'badge-risk-green'}" style="font-size:0.62rem; padding: 2px 8px;">${status}</span>
      `;
    } else {
      // Fitness Protein target calculation
      const lbm = (patient.weight * (1 - patient.bodyFat/100)).toFixed(1);
      const minP = Math.round(lbm * 1.6);
      const maxP = Math.round(lbm * 2.2);
      kpiCard.innerHTML = `
        <div class="card-title-row">
          <span class="card-icon">🥩</span>
          <h3 class="card-title">เป้าหมายช่วงโปรตีน (Sport Macro Target)</h3>
        </div>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary-dark); margin: 8px 0 2px;">${minP} - ${maxP} g/วัน</div>
        <span class="badge badge-sub" style="font-size:0.6rem; padding: 2px 8px;">คำนวณจาก Lean Weight (${lbm} kg)</span>
      `;
    }
  }

  // Headers for table NCD vs Gym
  const labTableHeaders = document.getElementById('lab-table-headers');
  if (labTableHeaders) {
    if (activeB2BMode === 'ncd') {
      labTableHeaders.innerHTML = `
        <th>วันที่วัด</th>
        <th>HbA1c (%)</th>
        <th>ความดัน SYS/DIA (mmHg)</th>
        <th>ไขมัน (mg/dL)</th>
        <th>น้ำหนักตัว (kg)</th>
        <th>รอบเอว (ซม.)</th>
      `;
    } else {
      labTableHeaders.innerHTML = `
        <th>วันที่วัดสัดส่วน</th>
        <th>เปอร์เซ็นต์ไขมัน (% Body Fat)</th>
        <th>น้ำหนักตัว (kg)</th>
        <th>รอบคอ (ซม.)</th>
        <th>รอบเอว (ซม.)</th>
        <th>รอบสะโพก (ซม.)</th>
      `;
    }
  }

  // Populate Lab history table rows (B.3)
  const tbody = document.getElementById('lab-history-table-body');
  if (tbody) {
    tbody.innerHTML = "";
    patient.labHistory.forEach(log => {
      const tr = document.createElement('tr');
      if (activeB2BMode === 'ncd') {
        tr.innerHTML = `
          <td><strong>${log.date}</strong></td>
          <td style="font-weight:700;">${log.hba1c || '—'}%</td>
          <td>${log.bp || '—'}</td>
          <td>${log.cholesterol || '—'}</td>
          <td>${log.weight || '—'} kg</td>
          <td>${log.waist || '—'} cm</td>
        `;
      } else {
        // Mock neck / hip based on historical weights
        const isFemale = (patient.gender === 'หญิง');
        const neck = isFemale ? 33 : 37;
        const hip = isFemale ? 104 : 90;
        const bf = (patient.id === 'P002') ? 15.0 : 26.0;
        
        tr.innerHTML = `
          <td><strong>${log.date}</strong></td>
          <td style="font-weight:700; color:var(--primary-dark);">${bf}%</td>
          <td>${log.weight} kg</td>
          <td>${neck} cm</td>
          <td>${log.waist} cm</td>
          <td>${isFemale ? hip + ' cm' : '—'}</td>
        `;
      }
      tbody.appendChild(tr);
    });
  }

  // Render Charts
  renderCorrelationChart(patient);
  renderSafetyTrendsChart(patient);
}

// ===== 📈 DUAL-AXIS CORRELATION SVG CHART (B.2) =====
function renderCorrelationChart(patient) {
  const container = document.getElementById('correlation-svg-container');
  const title = document.getElementById('corr-chart-title');
  if (!container) return;
  
  if (activeB2BMode === 'ncd') {
    if (patient.program === 'Diabetes') {
      if (title) title.textContent = "สถิติย้อนหลัง: พฤติกรรมทานน้ำตาลสะสมรายสัปดาห์ vs ค่าน้ำตาลสะสม HbA1c";
    } else if (patient.program === 'Hypertension') {
      if (title) title.textContent = "สถิติย้อนหลัง: ปริมาณโซเดียมสะสมรายสัปดาห์ vs ค่าความดัน SYS (mmHg)";
    } else {
      if (title) title.textContent = "สถิติย้อนหลัง: ปริมาณแคลอรีสะสมรายวัน vs ค่าน้ำหนักตัวเปรียบเทียบ";
    }
  } else {
    if (title) title.textContent = "สถิติย้อนหลัง: สัดส่วนการทานโปรตีนสะสม vs มวลกล้ามเนื้อไร้ไขมัน (Lean LBM)";
  }

  // Render dual-axis chart in SVG format
  // Left Axis: Daily food values (e.g. sugar grams, sodium milligrams) - rendered as bars
  // Right Axis: Lab test value line (e.g. HbA1c %, BP, weight) - rendered as line
  const width = 400;
  const height = 120;
  
  // Dummy values based on 3 historical lab points
  const points = [
    { label: "สัปดาห์ 1", barVal: patient.weeklyIntake.sugar * 1.3, lineVal: patient.labHistory[0] },
    { label: "สัปดาห์ 6", barVal: patient.weeklyIntake.sugar * 1.1, lineVal: patient.labHistory[1] },
    { label: "สัปดาห์ 12", barVal: patient.weeklyIntake.sugar * 1.0, lineVal: patient.labHistory[2] }
  ];

  if (activeB2BMode === 'fitness') {
    // Fitness data: Protein vs Lean Mass
    points[0].barVal = patient.id === 'P002' ? 100 : 78;
    points[0].lineVal = { yValue: 60.2 };
    
    points[1].barVal = patient.id === 'P002' ? 108 : 82;
    points[1].lineVal = { yValue: 61.4 };
    
    points[2].barVal = patient.id === 'P002' ? 112 : 84;
    points[2].lineVal = { yValue: 62.1 };
  } else if (patient.program === 'Hypertension') {
    points[0].barVal = patient.weeklyIntake.sodium * 1.25;
    points[0].lineVal = { yValue: parseInt(patient.labHistory[0].bp.split('/')[0]) };
    
    points[1].barVal = patient.weeklyIntake.sodium * 1.10;
    points[1].lineVal = { yValue: parseInt(patient.labHistory[1].bp.split('/')[0]) };
    
    points[2].barVal = patient.weeklyIntake.sodium * 1.0;
    points[2].lineVal = { yValue: parseInt(patient.labHistory[2].bp.split('/')[0]) };
  } else if (patient.program === 'Obesity') {
    points[0].barVal = patient.weeklyIntake.calories * 1.25;
    points[0].lineVal = { yValue: patient.labHistory[0].weight };
    
    points[1].barVal = patient.weeklyIntake.calories * 1.10;
    points[1].lineVal = { yValue: patient.labHistory[1].weight };
    
    points[2].barVal = patient.weeklyIntake.calories * 1.0;
    points[2].lineVal = { yValue: patient.labHistory[2].weight };
  } else {
    // Diabetes
    points[0].barVal = patient.weeklyIntake.sugar * 1.35;
    points[0].lineVal = { yValue: patient.labHistory[0].hba1c };
    
    points[1].barVal = patient.weeklyIntake.sugar * 1.15;
    points[1].lineVal = { yValue: patient.labHistory[1].hba1c };
    
    points[2].barVal = patient.weeklyIntake.sugar * 1.0;
    points[2].lineVal = { yValue: patient.labHistory[2].hba1c };
  }

  // Draw SVG
  let svgContent = `<svg viewBox="0 0 ${width} ${height}">`;
  
  // Horizontal grid lines
  svgContent += `
    <line x1="30" y1="20" x2="370" y2="20" class="chart-grid-line" />
    <line x1="30" y1="50" x2="370" y2="50" class="chart-grid-line" />
    <line x1="30" y1="80" x2="370" y2="80" class="chart-grid-line" />
    <line x1="30" y1="100" x2="370" y2="100" class="chart-axis-line" />
  `;

  // Draw Bars (Left Axis value)
  const barWidth = 24;
  const xPositions = [90, 200, 310];
  
  // Find max bar height for scaling
  const maxBarVal = Math.max(...points.map(p => p.barVal)) * 1.2;
  
  // Find line values min/max for scaling
  const lineValues = points.map(p => p.lineVal.yValue || p.lineVal.hba1c || p.lineVal.weight || 0);
  const maxLineVal = Math.max(...lineValues) * 1.1;
  const minLineVal = Math.min(...lineValues) * 0.9;
  
  points.forEach((p, idx) => {
    const x = xPositions[idx];
    // Scale bar
    const barHeight = (p.barVal / maxBarVal) * 80;
    const yBar = 100 - barHeight;
    
    // Scale line point
    const currentVal = p.lineVal.yValue || p.lineVal.hba1c || p.lineVal.weight || 0;
    const lineY = 100 - ((currentVal - minLineVal) / (maxLineVal - minLineVal || 1)) * 70 - 10;
    p.lineY = lineY; // Save for drawing line
    
    const barLabel = activeB2BMode === 'fitness' ? `${p.barVal}g` : patient.program === 'Hypertension' ? `${Math.round(p.barVal)}mg` : `${Math.round(p.barVal)}g`;
    
    svgContent += `
      <!-- Bar -->
      <rect x="${x - barWidth/2}" y="${yBar}" width="${barWidth}" height="${barHeight}" fill="#1d9e75" rx="3" opacity="0.85" />
      <text x="${x}" y="${yBar - 4}" text-anchor="middle" font-size="7" font-weight="700" fill="#0f6e56">${barLabel}</text>
      
      <!-- X Label -->
      <text x="${x}" y="112" text-anchor="middle" font-size="8" font-weight="600" fill="#475569">${p.label}</text>
    `;
  });

  // Draw Line and Dot markers (Right Axis value)
  let linePath = `M ${xPositions[0]} ${points[0].lineY} L ${xPositions[1]} ${points[1].lineY} L ${xPositions[2]} ${points[2].lineY}`;
  svgContent += `<path d="${linePath}" class="chart-line-value danger" />`;
  
  points.forEach((p, idx) => {
    const currentVal = p.lineVal.yValue || p.lineVal.hba1c || p.lineVal.weight || 0;
    const valText = activeB2BMode === 'fitness' ? `${currentVal} kg` : patient.program === 'Hypertension' ? `${currentVal} mmHg` : patient.program === 'Obesity' ? `${currentVal} kg` : `${currentVal}%`;
    
    svgContent += `
      <circle cx="${xPositions[idx]}" cy="${p.lineY}" r="4" class="chart-dot-marker danger" />
      <text x="${xPositions[idx]}" y="${p.lineY - 6}" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ef4444">${valText}</text>
    `;
  });
  
  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}

// ===== 🎯 INDIVIDUAL WEEKLY NUTRITION TRENDS CHART (B.4) =====
function renderSafetyTrendsChart(patient) {
  const container = document.getElementById('safety-trends-svg-container');
  if (!container) return;
  
  // Render weekly Sodium, Sugar, Calories compared to limits
  // We can render 3 groups of horizontal comparative progress bars
  const width = 400;
  const height = 120;
  
  const targetLimits = {
    sodium: { val: patient.weeklyIntake.sodium, limit: 2000, label: "โซเดียม (Sodium)", unit: "mg" },
    sugar: { val: patient.weeklyIntake.sugar, limit: 25, label: "น้ำตาล (Sugar)", unit: "g" },
    calories: { val: patient.weeklyIntake.calories, limit: activeB2BMode === 'fitness' ? 2600 : 1500, label: "พลังงาน (Calories)", unit: "kcal" }
  };
  
  if (activeB2BMode === 'fitness') {
    // Fitness Gym version: shows Protein, Carbs, Fats vs targets
    const lbm = (patient.weight * (1 - patient.bodyFat/100)).toFixed(1);
    targetLimits.sodium = { val: patient.id === 'P002' ? 112 : 84, limit: Math.round(lbm * 1.8), label: "โปรตีน (Protein Target)", unit: "g" };
    targetLimits.sugar = { val: 240, limit: 300, label: "คาร์บ (Carbs Target)", unit: "g" };
    targetLimits.calories.limit = patient.id === 'P002' ? 2800 : 1400;
  }
  
  let svgContent = `<svg viewBox="0 0 ${width} ${height}">`;
  
  const yPositions = [25, 65, 105];
  const keys = ['sodium', 'sugar', 'calories'];
  
  keys.forEach((key, idx) => {
    const item = targetLimits[key];
    const y = yPositions[idx];
    
    // Scale widths
    const maxLimitVal = Math.max(item.val, item.limit) * 1.25;
    const progressWidth = (item.val / maxLimitVal) * 200;
    const limitX = 120 + (item.limit / maxLimitVal) * 200;
    
    const isExceeded = (item.val > item.limit);
    const barColor = isExceeded ? '#ef4444' : '#10b981';
    
    svgContent += `
      <!-- Label -->
      <text x="10" y="${y - 4}" font-size="8.5" font-weight="700" fill="#374151">${item.label}</text>
      
      <!-- Current Intake text -->
      <text x="10" y="${y + 8}" font-size="8.5" font-weight="800" fill="${barColor}">${item.val} ${item.unit}</text>
      
      <!-- Bar Background -->
      <rect x="120" y="${y - 8}" width="200" height="12" fill="#e2e8f0" rx="3" />
      
      <!-- Bar Fill -->
      <rect x="120" y="${y - 8}" width="${progressWidth}" height="12" fill="${barColor}" rx="3" opacity="0.85" />
      
      <!-- Limit Line -->
      <line x1="${limitX}" y1="${y - 12}" x2="${limitX}" y2="${y + 8}" stroke="#475569" stroke-width="1.5" stroke-dasharray="2, 2" />
      
      <!-- Limit tag -->
      <text x="${limitX}" y="${y - 14}" text-anchor="middle" font-size="6.5" font-weight="700" fill="#475569">Target: ${item.limit}</text>
    `;
  });
  
  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}

// ===== 🧬 ADD NEW LAB LOG MEASUREMENT (B.3) =====
function toggleLabFormPopup(show) {
  const modal = document.getElementById('lab-form-modal-overlay');
  if (!modal) return;
  
  if (show) {
    modal.classList.add('active');
    
    // Autofill current date and current patient weight/waist
    const patient = mockPatients.find(p => p.id === selectedPatientId);
    if (patient) {
      document.getElementById('lab-input-date').value = new Date().toISOString().substring(0, 10);
      document.getElementById('lab-input-weight').value = patient.weight;
      
      const lastLab = patient.labHistory[patient.labHistory.length - 1];
      document.getElementById('lab-input-waist').value = lastLab ? lastLab.waist : "";
      document.getElementById('lab-input-hba1c').value = lastLab ? lastLab.hba1c : "";
      document.getElementById('lab-input-bp').value = lastLab ? lastLab.bp : "";
      document.getElementById('lab-input-chol').value = lastLab ? lastLab.cholesterol : "";
    }
  } else {
    modal.classList.remove('active');
  }
}

function saveNewLabMeasurement() {
  const patient = mockPatients.find(p => p.id === selectedPatientId);
  if (!patient) return;
  
  const date = document.getElementById('lab-input-date').value;
  const weight = parseFloat(document.getElementById('lab-input-weight').value) || patient.weight;
  const waist = parseInt(document.getElementById('lab-input-waist').value) || 90;
  
  let newLog = { date, weight, waist };
  
  if (activeB2BMode === 'ncd') {
    const hba1c = parseFloat(document.getElementById('lab-input-hba1c').value) || 6.5;
    const bp = document.getElementById('lab-input-bp').value || "120/80";
    const cholesterol = parseInt(document.getElementById('lab-input-chol').value) || 200;
    
    newLog.hba1c = hba1c;
    newLog.bp = bp;
    newLog.cholesterol = cholesterol;
  } else {
    // Fitness calculations
    // Keep it compatible
    newLog.hba1c = 5.2;
    newLog.bp = "120/80";
    newLog.cholesterol = 180;
  }
  
  // Push to patient database
  patient.labHistory.push(newLog);
  patient.weight = weight;
  
  // Sync details view
  toggleLabFormPopup(false);
  loadPatientDetails();
  showToast(`💾 บันทึกผลตรวจสุขภาพใหม่สำเร็จ! ประวัติประมวลผลได้รับการอัปเดตเรียบร้อยครับ`);
  triggerConfettiCelebrate();
}

// ===== 📅 WEEKLY APPOINTMENT CALENDAR VIEW (A.4) =====
function renderCalendarGrid() {
  const cellsContainer = document.getElementById('calendar-days-cells');
  const shortlistContainer = document.getElementById('today-appointments-shortlist');
  if (!cellsContainer || !shortlistContainer) return;
  
  cellsContainer.innerHTML = "";
  shortlistContainer.innerHTML = "";
  
  const daysTh = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];
  const apptDatabase = [];
  
  // Gather appointments from database
  mockPatients.forEach(p => {
    // Check mode compatibility
    if (activeB2BMode === 'ncd' && p.program.startsWith('Gym-')) return;
    if (activeB2BMode === 'fitness' && !p.program.startsWith('Gym-') && p.program !== 'Obesity') return;
    
    p.appointments.forEach(appt => {
      apptDatabase.push({
        patientId: p.id,
        name: p.name,
        avatar: p.avatar,
        program: p.program,
        day: appt.day, // 1 = Mon, 7 = Sun
        time: appt.time,
        type: appt.type,
        compliance: appt.compliance // logged, partial, missing
      });
    });
  });
  
  // Sort appointments by time
  apptDatabase.sort((a, b) => a.time.localeCompare(b.time));
  
  // Draw 7 cells for weekly calendar
  for (let d = 1; d <= 7; d++) {
    const cell = document.createElement('div');
    // Today is Wed (day 3) in mock calendar
    const isToday = (d === 3);
    cell.className = `cal-cell ${isToday ? 'today-cell' : ''}`;
    
    const dayLabelStr = isToday ? `${daysTh[d-1]} (วันนี้)` : daysTh[d-1];
    cell.innerHTML = `<span class="cal-date-label">${dayLabelStr}</span>`;
    
    const apptsDiv = document.createElement('div');
    apptsDiv.className = "cal-appts-container";
    
    // Find appts on this day
    const dayAppts = apptDatabase.filter(a => a.day === d);
    dayAppts.forEach(appt => {
      // Draw calendar badge
      const badge = document.createElement('div');
      badge.className = "cal-appt-badge";
      badge.style.borderLeftColor = appt.compliance === 'logged' ? 'var(--success)' : appt.compliance === 'partial' ? 'var(--warning)' : 'var(--danger)';
      badge.onclick = () => {
        switchB2BTab('patients');
        selectPatient(appt.patientId);
      };
      
      badge.innerHTML = `
        <span class="cab-time">${appt.time} น.</span>
        <span class="cab-name">${appt.name}</span>
      `;
      apptsDiv.appendChild(badge);
      
      // Draw sidebar shortlisted today items
      if (isToday) {
        const shortCard = document.createElement('div');
        shortCard.className = "appt-card";
        shortCard.style.borderLeftColor = appt.compliance === 'logged' ? 'var(--success)' : appt.compliance === 'partial' ? 'var(--warning)' : 'var(--danger)';
        shortCard.onclick = () => {
          switchB2BTab('patients');
          selectPatient(appt.patientId);
        };
        
        let complianceMsg = "🟢 จดบันทึกอาหารครบถ้วน (Logged)";
        if (appt.compliance === 'partial') complianceMsg = "🟡 บันทึกอาหารเป็นบางมื้อ (Partial)";
        if (appt.compliance === 'missing') complianceMsg = "🔴 ขาดการบันทึกอาหาร (Missing)";
        
        shortCard.innerHTML = `
          <div class="appt-time">${appt.time} น. • ${appt.type}</div>
          <div class="appt-name">${appt.avatar} ${appt.name}</div>
          <span class="compliance-pill ${appt.compliance}">${complianceMsg}</span>
        `;
        shortlistContainer.appendChild(shortCard);
      }
    });
    
    cell.appendChild(apptsDiv);
    cellsContainer.appendChild(cell);
  }
  
  if (shortlistContainer.innerHTML === "") {
    shortlistContainer.innerHTML = `<div class="center-empty-state" style="padding:40px 10px; height:auto;">
      <span style="font-size:1.5rem;">📅</span>
      <p style="font-size:0.65rem; margin-top:4px;">ไม่มีนัดหมายผู้เข้าพบในวันนี้ค่ะ</p>
    </div>`;
  }
}

// ===== 🗺️ POPULATION GEOGRAPHIC HEATMAP SVG (C.2) =====
function renderThailandMap() {
  const container = document.getElementById('thailand-svg-map-container');
  if (!container) return;
  
  // Render a responsive HTML SVG map representing 5 key Thailand regions with color coded heatmap density
  // Bangkok (Zone 10), Central (Zone 20), North (Zone 50), Northeast (Zone 30), South (Zone 80)
  const mapData = [
    { zone: "10", name: "กรุงเทพฯ และปริมณฑล (Bangkok Hub)", fill: "rgba(239, 68, 68, 0.85)", sodium: 2850, sugar: 48, cals: 1850, risk: "🔴 เสี่ยงสูงมาก (High Sodium Density)" },
    { zone: "20", name: "ภาคกลาง (Central Plain)", fill: "rgba(245, 158, 11, 0.85)", sodium: 2150, sugar: 32, cals: 1620, risk: "🟡 เสี่ยงปานกลาง (Medium density)" },
    { zone: "30", name: "ภาคตะวันออกเฉียงเหนือ (Isan Region)", fill: "rgba(239, 68, 68, 0.7)", sodium: 2650, sugar: 28, cals: 1550, risk: "🔴 เสี่ยงสูง (High Sodium - Salt preserved meals)" },
    { zone: "50", name: "ภาคเหนือ (Lanna Valley)", fill: "rgba(245, 158, 11, 0.7)", sodium: 1950, sugar: 24, cals: 1420, risk: "🟡 เสี่ยงปานกลาง (Moderate)" },
    { zone: "80", name: "ภาคใต้ (Southern Coast)", fill: "rgba(16, 185, 129, 0.85)", sodium: 1420, sugar: 18, cals: 1380, risk: "🟢 ความเสี่ยงต่ำ (Safe Threshold)" }
  ];
  
  let svgContent = `<svg viewBox="0 0 160 260" style="width:100%; height:100%;">`;
  
  // Custom abstract paths resembling geography of Thailand map
  // North Region (Zone 50)
  svgContent += `<path d="M 40,10 L 100,10 L 110,40 L 70,80 L 30,50 Z" class="thailand-map-region" fill="${mapData[3].fill}" onmouseover="hoverMapRegion(3)" />`;
  // Northeast Region (Zone 30)
  svgContent += `<path d="M 100,10 L 150,30 L 155,90 L 115,100 L 70,80 L 110,40 Z" class="thailand-map-region" fill="${mapData[2].fill}" onmouseover="hoverMapRegion(2)" />`;
  // Central Region (Zone 20)
  svgContent += `<path d="M 30,50 L 70,80 L 115,100 L 95,130 L 75,135 L 50,110 Z" class="thailand-map-region" fill="${mapData[1].fill}" onmouseover="hoverMapRegion(1)" />`;
  // Bangkok Region (Zone 10)
  svgContent += `<circle cx="82" cy="132" r="10" class="thailand-map-region" fill="${mapData[0].fill}" stroke="#ffffff" stroke-width="2" onmouseover="hoverMapRegion(0)" />`;
  // Southern Peninsular Region (Zone 80)
  svgContent += `<path d="M 50,110 L 75,135 L 70,180 L 90,220 L 75,255 L 45,210 L 52,160 Z" class="thailand-map-region" fill="${mapData[4].fill}" onmouseover="hoverMapRegion(4)" />`;
  
  svgContent += `</svg>`;
  container.innerHTML = svgContent;
  
  // Set default hover status
  hoverMapRegion(0);
}

function hoverMapRegion(index) {
  const mapData = [
    { zone: "10", name: "กรุงเทพฯ และปริมณฑล (Bangkok Hub)", fill: "rgba(239, 68, 68, 0.85)", sodium: 2850, sugar: 48, cals: 1850, risk: "🔴 เสี่ยงสูงมาก (High Sodium Density)" },
    { zone: "20", name: "ภาคกลาง (Central Plain)", fill: "rgba(245, 158, 11, 0.85)", sodium: 2150, sugar: 32, cals: 1620, risk: "🟡 เสี่ยงปานกลาง (Medium density)" },
    { zone: "30", name: "ภาคตะวันออกเฉียงเหนือ (Isan Region)", fill: "rgba(239, 68, 68, 0.7)", sodium: 2650, sugar: 28, cals: 1550, risk: "🔴 เสี่ยงสูง (High Sodium)" },
    { zone: "50", name: "ภาคเหนือ (Lanna Valley)", fill: "rgba(245, 158, 11, 0.7)", sodium: 1950, sugar: 24, cals: 1420, risk: "🟡 เสี่ยงปานกลาง (Moderate)" },
    { zone: "80", name: "ภาคใต้ (Southern Coast)", fill: "rgba(16, 185, 129, 0.85)", sodium: 1420, sugar: 18, cals: 1380, risk: "🟢 ความเสี่ยงต่ำ (Safe)" }
  ];
  
  const region = mapData[index];
  const card = document.getElementById('map-hover-region-card');
  if (card) {
    card.innerHTML = `
      <span class="r-title" style="color:var(--primary-dark); font-weight:800; font-size:0.68rem;">📍 ${region.name}</span>
      <div class="r-metrics" style="margin-top:4px; font-size:0.62rem;">
        <div>โซเดียมสะสมเฉลี่ย: <span class="bold">${region.sodium.toLocaleString()} mg</span></div>
        <div>น้ำตาลสะสมเฉลี่ย: <span class="bold">${region.sugar} g</span></div>
        <div>แคลอรีเผาผลาญเฉลี่ย: <span class="bold">${region.cals} kcal</span></div>
        <div style="margin-top:2px;"><span class="badge ${region.sodium > 2000 ? 'badge-risk-red' : 'badge-risk-green'}">${region.risk}</span></div>
      </div>
    `;
  }
}

// ===== 📊 COHORT TRIGGER FOODS & INTERVENTIONS (C.3, C.5) =====
function renderTriggerFoods() {
  const container = document.getElementById('trigger-foods-bars');
  if (!container) return;
  
  // Simulated foods listing
  const foods = [
    { name: "บะหมี่กึ่งสำเร็จรูป (โซเดียม)", count: 48, pct: 100, color: "red" },
    { name: "ชานมไข่มุก/กาแฟหวาน (น้ำตาล)", count: 35, pct: 73, color: "red" },
    { name: "ส้มตำปูปลาร้า (โซเดียม)", count: 28, pct: 58, color: "orange" },
    { name: "โจ๊กซอง/อาหารกึ่งสำเร็จ", count: 22, pct: 45, color: "orange" },
    { name: "ขนมปังขาวป้ายแยม/เนย", count: 18, pct: 37, color: "orange" }
  ];
  
  container.innerHTML = "";
  foods.forEach(f => {
    const row = document.createElement('div');
    row.className = "tf-item";
    
    row.innerHTML = `
      <span class="tf-name">${f.name}</span>
      <div class="tf-bar-bg">
        <div class="tf-bar-fill ${f.color}" style="width: ${f.pct}%;"></div>
      </div>
      <span class="tf-count">${f.count} มื้อ</span>
    `;
    container.appendChild(row);
  });
}

function renderInterventionsTable() {
  const tbody = document.getElementById('intervention-table-body');
  if (!tbody) return;
  
  const interventions = [
    { desc: "แนะนำให้เลี่ยงซดน้ำแกงไตปลา/น้ำแกงส้ม", users: "42 คน", rate: "84%", marker: "ความดัน SYS ลดลงเฉลี่ย 8 mmHg", effectiveness: "🟢 ดีเยี่ยม (High)" },
    { desc: "แนะนำดื่มน้ำชาคาโมมายล์อุ่นผ่อนคลายทดแทนโจ๊กมื้อดึก", users: "36 คน", rate: "76%", marker: "แคลอรีสะสมลดลง 340 kcal/วัน", effectiveness: "🟢 ดีเยี่ยม (High)" },
    { desc: "สลับเป็นสั่งชาไข่มุกหวาน 25% ปรับพฤติกรรมลดความหวาน", users: "54 คน", rate: "62%", marker: "ค่าน้ำตาลสะสม HbA1c ลดลง 0.8%", effectiveness: "🟡 ปานกลาง (Medium)" },
    { desc: "ออกกำลังกายแล้วทานกล้วยหอม/ขนมปังแผ่นป้ายน้ำผึ้ง", users: "28 คน", rate: "90%", marker: "มวลกล้ามเนื้อพัฒนาเพิ่มขึ้น 1.3 kg", effectiveness: "🟢 ดีเยี่ยม (High)" },
    { desc: "ทานสลัดอกไก่โยเกิร์ตเดรสซิ่งเพื่อฟื้นฟูหลังพักฟื้น", users: "15 คน", rate: "50%", marker: "ค่าความอักเสบกล้ามเนื้อลดลง", effectiveness: "🟡 ปานกลาง (Medium)" }
  ];
  
  tbody.innerHTML = "";
  interventions.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.desc}</strong></td>
      <td>${item.users}</td>
      <td style="font-weight:700; color:var(--primary-dark);">${item.rate}</td>
      <td>${item.marker}</td>
      <td><span class="badge ${item.effectiveness.includes('ดีเยี่ยม') ? 'badge-risk-green' : 'badge-risk-yellow'}">${item.effectiveness}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ===== 🔬 RESEARCH ALERTS & EXPORTS PANEL (D.2, D.3) =====
function renderPolicyAlerts() {
  const container = document.getElementById('policy-alerts-container');
  if (!container) return;
  
  const alerts = [
    { icon: "🚨", title: "พื้นที่ภาคเหนือและกรุงเทพฯ เกินเกณฑ์โซเดียมสูงสุด 45%", desc: "จากรายงานชุดข้อมูลผู้ป่วยโรคความดัน 540 คน พบการทานโซเดียมเฉลี่ย 2,850mg ต่อวัน สูงกว่าเป้าหมาย WHO 2,000mg ถึง 42.5% ขอเสนอแนะให้ดำเนินนโยบายภาษีเค็มและให้ข้อมูลความรู้ทางอาหาร", isWarning: false },
    { icon: "⚠️", title: "ภาวะโรคอ้วนระดับวัยรุ่นเพศหญิงเพิ่มขึ้นในเขตภาคกลาง", desc: "สถิติ aggregate จาก B2C ยินยอมพบค่าเฉลี่ยสัดส่วน Body Fat % ในวัยรุ่น 15-22 ปีเฉลี่ยอยู่ที่ 31% สูงกว่ามาตรฐานสุขภาพเพศหญิงทั่วไป (22-27%) คาดเกิดจากพฤติกรรมติดชานมและขนมหวานสะสมมื้อบ่าย", isWarning: true }
  ];
  
  container.innerHTML = "";
  alerts.forEach(a => {
    const card = document.createElement('div');
    card.className = `policy-alert-card ${a.isWarning ? 'warning-style' : ''}`;
    
    card.innerHTML = `
      <span class="pac-icon">${a.icon}</span>
      <div class="pac-details">
        <span class="pac-title">${a.title}</span>
        <span class="pac-desc">${a.desc}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function simulateResearchExport(fileType) {
  const ncd = document.getElementById('export-ncd-filter').value;
  const region = document.getElementById('export-region-filter').value;
  
  showToast(`📥 กำลังจัดทำแพ็กเกจชุดข้อมูลวิจัยกึ่งนิรนาม (${ncd} · ${region})...`);
  
  setTimeout(() => {
    showToast(`✓ สำเร็จ! ดาวน์โหลดชุดข้อมูลนิรนาม 'Nucistion-ResearchDataset-${ncd}-${region}.${fileType.toLowerCase()}' ลงเครื่องแล้วค่ะ`);
    triggerConfettiCelebrate();
  }, 1200);
}

// ===== 📄 PDF PRINT PREVIEW EXPORTER (B.5) =====
function togglePdfModal(show) {
  const modal = document.getElementById('pdf-modal-overlay');
  if (!modal) return;
  
  if (show) {
    modal.classList.add('active');
    updatePdfReportData();
  } else {
    modal.classList.remove('active');
  }
}

function updatePdfReportData() {
  const patient = mockPatients.find(p => p.id === selectedPatientId);
  if (!patient) return;
  
  const days = document.getElementById('pdf-report-days').value;
  document.getElementById('pdf-report-period-lbl').textContent = `รายงานประวัติย้อนหลัง ${days} วัน`;
  
  // Demographics
  document.getElementById('pdf-p-name').textContent = patient.name;
  document.getElementById('pdf-p-risk').textContent = patient.risk === 'red' ? 'เสี่ยงสูง (High Risk)' : patient.risk === 'yellow' ? 'เสี่ยงปานกลาง' : 'เสี่ยงต่ำ/ควบคุมได้';
  document.getElementById('pdf-p-prog').textContent = patient.program;
  document.getElementById('pdf-p-weight').textContent = `${patient.weight} kg`;
  
  const lastLab = patient.labHistory[patient.labHistory.length - 1];
  document.getElementById('pdf-p-waist').textContent = lastLab ? `${lastLab.waist} cm` : '—';
  document.getElementById('pdf-p-height').textContent = `${patient.height} ซม.`;
  
  // AI summary
  const aiList = document.getElementById('pdf-ai-bullets-list');
  if (aiList) {
    aiList.innerHTML = "";
    patient.aiSummary.forEach(bullet => {
      const item = document.createElement('div');
      item.className = "pdf-ai-bullet";
      item.innerHTML = `• ${bullet}`;
      aiList.appendChild(item);
    });
  }
  
  // Nutrition averages
  document.getElementById('pdf-nut-sodium').textContent = `${patient.weeklyIntake.sodium} mg`;
  document.getElementById('pdf-nut-sugar').textContent = `${patient.weeklyIntake.sugar} g`;
  document.getElementById('pdf-nut-calories').textContent = `${patient.weeklyIntake.calories} kcal`;
  
  // Evaluators
  const evSodium = document.getElementById('pdf-eval-sodium');
  const evSugar = document.getElementById('pdf-eval-sugar');
  
  if (evSodium) {
    if (patient.weeklyIntake.sodium > 2000) {
      evSodium.textContent = "⚠️ เกินเป้าหมายสูงสุดความดัน (+12%)";
      evSodium.className = "red-txt";
    } else {
      evSodium.textContent = "✓ ปลอดภัยตามเกณฑ์ WHO";
      evSodium.className = "green-txt";
    }
  }
  
  if (evSugar) {
    if (patient.weeklyIntake.sugar > 25) {
      const pctOver = Math.round(((patient.weeklyIntake.sugar - 25) / 25) * 100);
      evSugar.textContent = `⚠️ เกินเป้าหมายจำกัด NCDs (+${pctOver}%)`;
      evSugar.className = "red-txt";
    } else {
      evSugar.textContent = "✓ คุมน้ำตาลสะสมอยู่ในเกณฑ์ปกติ";
      evSugar.className = "green-txt";
    }
  }

  // Lab Table rows
  const pdfTbody = document.getElementById('pdf-lab-table-body');
  if (pdfTbody) {
    pdfTbody.innerHTML = "";
    patient.labHistory.forEach(log => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${log.date}</td>
        <td>${log.hba1c}%</td>
        <td>${log.bp}</td>
        <td>${log.cholesterol}</td>
        <td>${log.weight} kg</td>
      `;
      pdfTbody.appendChild(tr);
    });
  }
}

function openPrintPdfModal() {
  togglePdfModal(true);
}

function triggerBrowserPrint() {
  window.print();
}

// ===== 🔔 UI TOAST & CONFETTI CELEBRATIONS =====
function showToast(message) {
  // Create an alert element dynamically
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = '#0f172a';
  toast.style.color = '#f8fafc';
  toast.style.padding = '10px 16px';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '0.72rem';
  toast.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.3)';
  toast.style.zIndex = '1000';
  toast.style.fontFamily = 'var(--font)';
  toast.style.animation = 'toastEnter 0.3s ease-out';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';
  
  toast.innerHTML = `<span>🔔</span> <span>${message}</span>`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toastLeave 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// CSS animations appended dynamically for toast
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes toastEnter {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes toastLeave {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

function triggerConfettiCelebrate() {
  // Confetti mock logs
  console.log("🎉 CONFETTI CELEBRATION TRIGGERED!");
}

// Bind methods globally
window.switchB2BMode = switchB2BMode;
window.switchB2BTab = switchB2BTab;
window.selectPatient = selectPatient;
window.applyRegistryFilters = applyRegistryFilters;
window.handleGlobalSearch = handleGlobalSearch;
window.toggleLabFormPopup = toggleLabFormPopup;
window.saveNewLabMeasurement = saveNewLabMeasurement;
window.hoverMapRegion = hoverMapRegion;
window.simulateResearchExport = simulateResearchExport;
window.togglePdfModal = togglePdfModal;
window.openPrintPdfModal = openPrintPdfModal;
window.triggerBrowserPrint = triggerBrowserPrint;
window.updatePdfReportData = updatePdfReportData;
