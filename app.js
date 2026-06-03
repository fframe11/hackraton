// ==========================================
// 🌟 NUCISTION GLOBAL STATE
// ==========================================
const state = {
  // Current Navigation State
  onboardingActive: true,
  currentStep: 1,
  currentTab: 'tab-home',
  
  // Sandbox Simulator States
  isOffline: false,
  isDayOne: false,
  simulateScanError: false,
  isMophOptedIn: true,
  waistBefore: 98,
  waistAfter: 94,
  isCalendarSynced: true,
  
  // User Profile Data (Default: Somjai Diabetes Preset)
  user: {
    name: "สมใจ",
    age: 58,
    gender: "หญิง",
    weight: 82,
    height: 158,
    bmi: 32.8,
    calorieGoal: 1600,
    sugarGoal: 25,     // NCD Diabetes Limit
    carbGoal: 130,     // NCD Diabetes Limit
    sodiumGoal: 2000,
    proteinGoal: 70,
    fatGoal: 50,
    bodyFat: 32,
    bodyCompGoal: 'recomp',
    activityToday: 'rest',
    preActivityTime: '17:00'
  },

  // Goal Presets selection on Step 3
  selectedPresets: ['ncd-diabetes'], // Initial diabetic selected

  // Logged meals today
  loggedMeals: [
    {
      id: 1,
      period: "morning",
      name: "ข้าวต้มปลาทองเก๊า + ไข่ต้ม",
      calories: 280,
      sugar: 4,
      carb: 35,
      sodium: 450,
      protein: 16,
      fat: 6
    }
  ],

  // Gamification & Virtual Pet
  points: 420,
  streak: 7,
  pet: {
    name: "น้องเต้าหู้",
    level: 3,
    exp: 340,
    maxExp: 500,
    mood: "เหนื่อยเล็กน้อย", // normal/happy/tired
    equippedHat: "cowboy_hat" // cowboy_hat / crown / none
  },

  // Active simulated custom elements
  scannedFoodTemp: null,
  activeTrendPeriod: 30,
  activeTrendType: 'sodium',
  activeRestaurantFilter: 'match',
  labHistory: [
    { date: "03 มิ.ย. 2569", hba1c: "7.2%", bp: "132/84", chol: "215 mg/dL" },
    { date: "15 พ.ค. 2569", hba1c: "7.5%", bp: "138/88", chol: "228 mg/dL" }
  ],
  unlockedBadges: ['นักบันทึกมือทอง', 'ผู้พิชิตโซเดียม']
};

// ==========================================
// 📊 FOOD DATABASE FOR SIMULATIONS & SEARCH
// ==========================================
const FOOD_DATABASE = [
  { name: "แกงจืดเต้าหู้หมูสับ (ถ้วยเล็ก)", calories: 120, sugar: 2, sodium: 450, protein: 12, fat: 4, carb: 8 },
  { name: "ข้าวมันไก่ผสมจานกลาง", calories: 680, sugar: 4, sodium: 980, protein: 24, fat: 25, carb: 80 },
  { name: "ก๋วยเตี๋ยวเรือน้ำตกหมู", calories: 380, sugar: 6, sodium: 1100, protein: 14, fat: 12, carb: 48 },
  { name: "ต้มยำกุ้งน้ำใส", calories: 150, sugar: 1, sodium: 960, protein: 18, fat: 3, carb: 10 },
  { name: "ข้าวผัดปูจานกลาง", calories: 590, sugar: 3, sodium: 880, protein: 20, fat: 18, carb: 75 },
  { name: "ผัดไทยกุ้งสด", calories: 650, sugar: 16, sodium: 1150, protein: 18, fat: 20, carb: 90 },
  { name: "ชานมไข่มุกหวานปกติ", calories: 360, sugar: 38, sodium: 120, protein: 2, fat: 8, carb: 68 },
  { name: "ส้มตำไทยจานปกติ", calories: 180, sugar: 14, sodium: 1280, protein: 6, fat: 2, carb: 35 },
  { name: "ปลานึ่งขิงซีอิ๊ว", calories: 190, sugar: 2, sodium: 420, protein: 28, fat: 5, carb: 6 },
  { name: "ผัดยอดฟักแม้วน้ำมันหอย", calories: 110, sugar: 1, sodium: 310, protein: 4, fat: 6, carb: 8 }
];

// Restaurant Mock Databases
const RESTAURANT_DATA = {
  somjai: [
    {
      name: "ร้านข้าวต้มกุ๊ย โชคเจริญ",
      match: "89%",
      distance: "ห่างออกไป 250 ม.",
      price: "฿",
      menus: [
        { name: "🐟 ปลานึ่งขิง (Na 420mg)", score: 95 },
        { name: "🥦 ผัดยอดฟักแม้ว (Na 310mg)", score: 90 },
        { name: "🥘 ต้มจืดมะระหมูสับ (Na 460mg)", score: 85 }
      ]
    },
    {
      name: "ตามสั่งเจ๊วรรณปากซอย",
      match: "82%",
      distance: "ห่างออกไป 80 ม.",
      price: "฿",
      menus: [
        { name: "🥘 กะเพราไก่สับไม่ใส่ซอส", score: 92 },
        { name: "🥬 ผัดผักกาดขาวเต้าหู้", score: 88 },
        { name: "🥚 ไข่ต้มทรงเครื่อง", score: 85 }
      ]
    },
    {
      name: "ก๋วยเตี๋ยวเรืออยุธยาเลิศรส",
      match: "48%",
      distance: "ห่างออกไป 400 ม.",
      price: "฿",
      menus: [
        { name: "🍜 บะหมี่หมูแห้ง (Na 1,280mg)", score: 55 },
        { name: "🍜 เส้นเล็กน้ำตก (Na 1,450mg)", score: 45 }
      ]
    }
  ],
  anucha: [
    {
      name: "สเต็กเฮ้าส์ พาวเวอร์กรด",
      match: "94%",
      distance: "ห่างออกไป 300 ม.",
      price: "฿฿",
      menus: [
        { name: "🥩 อกไก่ย่างจัมโบ้ (โปรตีน 48g)", score: 98 },
        { name: "🥩 สเต็กปลาแซลมอนย่าง (โปรตีน 35g)", score: 95 },
        { name: "🥔 มันบดไร้เนย", score: 88 }
      ]
    },
    {
      name: "อาหารคลีนคุณหนูเพื่อสุขภาพ",
      match: "91%",
      distance: "ห่างออกไป 150 ม.",
      price: "฿฿",
      menus: [
        { name: "🍱 ข้าวอกไก่ผัดบล็อคโคลี่", score: 94 },
        { name: "🍱 ข้าวปลาเผากับน้ำพริกหนุ่ม", score: 92 }
      ]
    }
  ],
  keaw: [
    {
      name: "สลัดบาร์ เฮลตี้การ์เดน",
      match: "95%",
      distance: "ห่างออกไป 180 ม.",
      price: "฿฿",
      menus: [
        { name: "🥗 สลัดอกไก่น้ำสลัดงาญี่ปุ่น (220 kcal)", score: 98 },
        { name: "🥗 ทูน่าสลัดแรป (290 kcal)", score: 92 },
        { name: "🥤 สมูทตี้เคลผลไม้รวม (90 kcal)", score: 88 }
      ]
    },
    {
      name: "ร้านแกงใต้ ป้าแมว",
      match: "74%",
      distance: "ห่างออกไป 210 ม.",
      price: "฿",
      menus: [
        { name: "🥘 แกงจืดหน่อไม้ต้มกระดูก", score: 85 },
        { name: "🥘 คั่วกลิ้งอกไก่สับพริกสด", score: 70 }
      ]
    }
  ]
};

// ==========================================
// 🚀 INITS & LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Sync system time mockup
  updateClock();
  setInterval(updateClock, 30000);

  // Initialize dynamic details
  calculateBMI();
  renderStreakCalendar();
  
  // Initialize and sync new Activity-Aware Nutrition Layer components
  syncBodyCompUI();
  if (state.isCalendarSynced) {
    toggleCalendarSync(true);
  } else {
    selectActivityLog(state.user.activityToday, true);
  }
  
  // Set default form values inside input elements
  document.getElementById('input-name').value = state.user.name;
  document.getElementById('input-age').value = state.user.age;
  document.getElementById('input-weight').value = state.user.weight;
  document.getElementById('input-height').value = state.user.height;

  // Set default search value and run impact analysis in Decision tab on load
  const decSearch = document.getElementById('decision-search-input');
  if (decSearch) {
    decSearch.value = 'ชานมไข่มุกหวานปกติ';
    runDecisionImpactAnalysis();
  }
});

function updateClock() {
  const now = new Date();
  const timeStr = now.toTimeString().substring(0, 5);
  document.getElementById('status-time').textContent = timeStr;
}

// ==========================================
// 👣 ONBOARDING SYSTEM FLOW (STEPS 1-6)
// ==========================================
function nextOnboardingStep(step) {
  // Hide all steps
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`onb-${i}`).classList.remove('active');
  }
  
  // Activate step
  document.getElementById(`onb-${step}`).classList.add('active');
  state.currentStep = step;

  // On Step 3, populate and sync onboarding body comp elements
  if (step === 3) {
    const onbHeightLbl = document.getElementById('onb-navy-height-lbl');
    if (onbHeightLbl) {
      onbHeightLbl.textContent = `${state.user.height} ซม.`;
    }
    switchOnbBfMethod(currentOnbBfMethod);
    calculateOnbBodyComp();
  }

  // On Step 5 (previously 4), we recalculate targets based on active preset settings
  if (step === 5) {
    calculateNutrientTargets();
    renderTargetsPreview();
  }
}

function bypassOnboarding() {
  state.onboardingActive = false;
  
  // Hide onboarding screens
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`onb-${i}`).classList.remove('active');
  }
  
  // Reveal bottom nav
  document.getElementById('app-bottom-nav').style.display = 'flex';
  
  // Redirect to home dashboard
  switchTab('tab-home');
}

function resetAppDemo() {
  state.onboardingActive = true;
  state.currentStep = 1;
  state.currentTab = 'tab-home';
  state.points = 420;
  state.streak = 7;
  state.loggedMeals = [
    { id: 1, period: "morning", name: "ข้าวต้มปลาทองเก๊า + ไข่ต้ม", calories: 280, sugar: 4, carb: 35, sodium: 450, protein: 16, fat: 6 }
  ];
  
  // Reload Somjai default state
  applyPresetPersona('somjai');
  
  // Hide bottom nav
  document.getElementById('app-bottom-nav').style.display = 'none';
  
  // Reset screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById('onb-1').classList.add('active');
  
  showToast("🔄 รีเซ็ตการสาธิตแล้ว! เริ่มต้นที่หน้าต้อนรับ (Step 1)");
}

function startApp() {
  // Transfer form values to state
  state.user.name = document.getElementById('input-name').value || "ผู้ใช้งาน";
  state.user.age = parseInt(document.getElementById('input-age').value) || 30;
  
  bypassOnboarding();
  
  // Welcome animation + toast details
  triggerConfettiCelebrate();
  showToast(`🟢 สมัครเสร็จสิ้น! ยินดีต้อนรับ คุณ${state.user.name} เข้าสู่ Nucistion!`);
}

// ==========================================
// 🧮 STEP 2: BMI & TARGET CALCULATIONS
// ==========================================
function setGender(g) {
  state.user.gender = g;
  document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
  if (g === 'ชาย') document.getElementById('g-male').classList.add('active');
  if (g === 'หญิง') document.getElementById('g-female').classList.add('active');
  if (g === 'ไม่ระบุ') document.getElementById('g-none').classList.add('active');
}

function calculateBMI() {
  const w = parseFloat(document.getElementById('input-weight').value) || 0;
  const h = parseFloat(document.getElementById('input-height').value) || 0;
  
  if (w <= 0 || h <= 0) return;
  
  const heightM = h / 100;
  const bmi = (w / (heightM * heightM)).toFixed(1);
  state.user.weight = w;
  state.user.height = h;
  state.user.bmi = parseFloat(bmi);

  // Update DOM widgets
  const bmiValEl = document.getElementById('bmi-val');
  const bmiBadgeEl = document.getElementById('bmi-badge');
  const caloriesEl = document.getElementById('recommended-calories');
  
  bmiValEl.textContent = bmi;
  
  // Calculate recommended daily calorie estimate
  let recCal = 2000;
  if (state.user.gender === 'หญิง') recCal = 1800;
  
  if (bmi < 18.5) {
    bmiBadgeEl.textContent = "น้ำหนักน้อย";
    bmiBadgeEl.className = "bmi-badge green";
    recCal += 200;
  } else if (bmi < 23) {
    bmiBadgeEl.textContent = "ปกติ (สุขภาพดี)";
    bmiBadgeEl.className = "bmi-badge green";
  } else if (bmi < 25) {
    bmiBadgeEl.textContent = "น้ำหนักเกิน";
    bmiBadgeEl.className = "bmi-badge amber";
    recCal -= 150;
  } else {
    bmiBadgeEl.textContent = "โรคอ้วน";
    bmiBadgeEl.className = "bmi-badge red";
    recCal -= 300;
  }
  
  state.user.calorieGoal = recCal;
  caloriesEl.textContent = `${recCal.toLocaleString()} kcal`;
}

function calculateBodyComp() {
  const fatInput = document.getElementById('input-body-fat');
  if (!fatInput) return;
  
  let fatPct = parseFloat(fatInput.value);
  if (isNaN(fatPct) || fatPct < 0 || fatPct > 100) return;
  
  state.user.bodyFat = fatPct;

  let currentWeight = state.user.weight;
  let beforeWeight = currentWeight + 3.0; // Assume 3kg loss for demo trend
  if (state.user.name === 'อนุชา') beforeWeight = 76.0;
  if (state.user.name === 'น้องแก้ว') beforeWeight = 68.0;

  // Body Fat % Before vs After
  let fatPctBefore = fatPct + 4.0; // e.g. 36% -> 32%
  if (state.user.name === 'อนุชา') fatPctBefore = fatPct + 2.0; // 17% -> 15%
  
  // Calculate Lean Mass and Fat Mass
  const leanMassBefore = (beforeWeight * (1 - fatPctBefore / 100)).toFixed(1);
  const fatMassBefore = (beforeWeight * (fatPctBefore / 100)).toFixed(1);
  
  const leanMassAfter = (currentWeight * (1 - fatPct / 100)).toFixed(1);
  const fatMassAfter = (currentWeight * (fatPct / 100)).toFixed(1);

  // Update UI Elements
  const leanBeforeEl = document.getElementById('lean-mass-before');
  const leanAfterEl = document.getElementById('lean-mass-after');
  const leanDiffEl = document.getElementById('lean-mass-diff');
  
  const fatBeforeEl = document.getElementById('fat-mass-before');
  const fatAfterEl = document.getElementById('fat-mass-after');
  const fatDiffEl = document.getElementById('fat-mass-diff');

  if (leanBeforeEl) leanBeforeEl.textContent = `${leanMassBefore} kg`;
  if (leanAfterEl) leanAfterEl.textContent = `${leanMassAfter} kg`;
  
  const leanDiff = (parseFloat(leanMassAfter) - parseFloat(leanMassBefore)).toFixed(1);
  if (leanDiffEl) {
    if (leanDiff >= 0) {
      leanDiffEl.className = "ba-change-tag up";
      leanDiffEl.textContent = `↑ เพิ่มขึ้น ${leanDiff} kg`;
    } else {
      leanDiffEl.className = "ba-change-tag down";
      leanDiffEl.textContent = `↓ ลดลง ${Math.abs(leanDiff)} kg`;
    }
  }

  if (fatBeforeEl) fatBeforeEl.textContent = `${fatMassBefore} kg`;
  if (fatAfterEl) fatAfterEl.textContent = `${fatMassAfter} kg`;
  
  const fatDiff = (parseFloat(fatMassAfter) - parseFloat(fatMassBefore)).toFixed(1);
  if (fatDiffEl) {
    if (fatDiff >= 0) {
      fatDiffEl.className = "ba-change-tag up";
      fatDiffEl.textContent = `↑ เพิ่มขึ้น ${fatDiff} kg`;
    } else {
      fatDiffEl.className = "ba-change-tag down";
      fatDiffEl.textContent = `↓ ลดลง ${Math.abs(fatDiff)} kg`;
    }
  }

  // Calculate target protein range based on Lean Mass (1.6 - 2.2g / kg)
  const minProtein = Math.round(parseFloat(leanMassAfter) * 1.6);
  const maxProtein = Math.round(parseFloat(leanMassAfter) * 2.2);
  const proteinTargetEl = document.getElementById('lean-protein-target');
  if (proteinTargetEl) {
    proteinTargetEl.textContent = `${minProtein} - ${maxProtein} g/วัน`;
  }
}

function estimateBodyFat() {
  let estimatedFat = 28;
  if (state.user.name === 'สมใจ') estimatedFat = 32;
  else if (state.user.name === 'อนุชา') estimatedFat = 15;
  else if (state.user.name === 'น้องแก้ว') estimatedFat = 26;
  
  const fatInput = document.getElementById('input-body-fat');
  if (fatInput) {
    fatInput.value = estimatedFat;
    calculateBodyComp();
    showToast(`🧮 ประมาณการ Body Fat: ${estimatedFat}% จากรอบเอวและเพศเรียบร้อย!`);
  }
}

function changeBodyCompGoal() {
  const goalEl = document.getElementById('body-comp-goal');
  if (!goalEl) return;
  
  const goal = goalEl.value;
  state.user.bodyCompGoal = goal;
  
  const descEl = document.getElementById('lean-macro-ratio-desc');
  if (descEl) {
    if (goal === 'bulk') {
      descEl.textContent = "Bulk Ratio (คาร์บสูง / ไขมันปานกลาง / โปรตีนคงที่)";
      descEl.style.color = "var(--primary-dark)";
    } else if (goal === 'cut') {
      descEl.textContent = "Cut Ratio (คาร์บต่ำ / ไขมันต่ำ / โปรตีนสูงพิเศษเพื่อรักษากล้าม)";
      descEl.style.color = "var(--danger)";
    } else if (goal === 'gain') {
      descEl.textContent = "Weight Gain Ratio (คาร์บสูงพิเศษ / ไขมันปานกลางสูง / โปรตีนคงที่เพื่อเพิ่มน้ำหนัก)";
      descEl.style.color = "var(--primary)";
    } else if (goal === 'none') {
      descEl.textContent = "Maintenance Ratio (รักษาน้ำหนักตัวปกติ สารอาหารสมดุลทั่วไป)";
      descEl.style.color = "var(--text-secondary)";
    } else {
      descEl.textContent = "Recomp Balance (แป้งปานกลาง / ไขมันปานกลาง)";
      descEl.style.color = "var(--text-secondary)";
    }
  }
}

// Current active body fat estimation method tab state
let currentBfMethod = 'manual'; 

function switchBfMethod(method) {
  currentBfMethod = method;

  const methods = ['manual', 'visual', 'navy'];
  methods.forEach(m => {
    const btn = document.getElementById(`bf-method-btn-${m}`);
    const panel = document.getElementById(`bf-panel-${m}`);
    if (btn) {
      if (m === method) {
        btn.style.background = 'var(--surface)';
        btn.style.color = 'var(--primary-dark)';
        btn.style.fontWeight = '700';
        btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-muted)';
        btn.style.fontWeight = '600';
        btn.style.boxShadow = 'none';
      }
    }
    if (panel) {
      panel.style.display = (m === method) ? 'block' : 'none';
    }
  });

  if (method === 'visual') {
    populateVisualBfOptions();
  }
}

function populateVisualBfOptions() {
  const container = document.getElementById('visual-options-container');
  if (!container) return;

  const gender = state.user.gender; // "ชาย" หรือ "หญิง"
  const isFemale = (gender === 'หญิง');

  // Define 5 levels based on gender fat % references
  const levels = [
    {
      level: 1,
      title: "ระดับ 1 — ผอมแห้ง / เห็น Six-Pack ชัดเจน",
      maleFat: 10,
      femaleFat: 17,
      desc: isFemale ? "เห็นลายกล้ามท้องส่วนบนชัดเจน ไขมันสะสมหน้าท้องต่ำมาก" : "กล้ามหน้าท้องสะกดตาชัดเจน สะท้อนความฟิตสไตล์นักกีฬา"
    },
    {
      level: 2,
      title: "ระดับ 2 — หุ่นฟิตแอนด์เฟิร์ม / เห็นกล้ามท้องบางส่วน",
      maleFat: 15,
      femaleFat: 22,
      desc: isFemale ? "หุ่นฟิตกระชับสัดส่วนสวยงาม หน้าท้องลีนเห็นขอบกล้ามอ่อนๆ" : "เห็นมิติกล้ามท้องด้านข้างและกล้ามเนื้อส่วนอื่นชัดเจนสมบูรณ์"
    },
    {
      level: 3,
      title: "ระดับ 3 — รูปร่างสมส่วน / หน้าท้องราบเรียบ",
      maleFat: 20,
      femaleFat: 27,
      desc: isFemale ? "หน้าท้องราบเรียบ ไม่มีไขมันส่วนเกินพอกสะสมตามเอวชัดเจน" : "หน้าท้องเรียบตึงพอดี ไม่มีห่วงยางรอบเอว สัดส่วนปกติทั่วไป"
    },
    {
      level: 4,
      title: "ระดับ 4 — มีไขมันสะสมบางส่วน / นุ่มนิ่มเล็กน้อย",
      maleFat: 25,
      femaleFat: 32,
      desc: isFemale ? "หน้าท้องมีชั้นไขมันนุ่มนิ่มเล็กน้อยเวลาลุกนั่ง สัดส่วนเริ่มมีแกนสลาย" : "หุ่นนุ่มนิ่ม มีพุงส่วนล่างบางส่วนเวลานั่งพักผ่อนทั่วไป"
    },
    {
      level: 5,
      title: "ระดับ 5 — เจ้าเนื้อ / มีไขมันส่วนเกินชัดเจน",
      maleFat: 30,
      femaleFat: 37,
      desc: isFemale ? "ไขมันสะสมตามรอบเอว สะโพก และต้นขาชัดเจน หุ่นค่อนข้างท้วม" : "รอบเอวหนา มีหน้าท้องและห่วงยางชัดเจน น้ำหนักเกิน BMI เกณฑ์ปกติ"
    }
  ];

  const currentVal = parseFloat(state.user.bodyFat) || 0;

  container.innerHTML = "";

  levels.forEach(lv => {
    const fatVal = isFemale ? lv.femaleFat : lv.maleFat;
    const isActive = Math.abs(currentVal - fatVal) <= 2; // match closest fat level

    const card = document.createElement('div');
    card.style.background = isActive ? 'rgba(29, 158, 117, 0.08)' : 'var(--bg)';
    card.style.border = isActive ? '1.5px solid var(--primary)' : '1px solid var(--border)';
    card.style.borderRadius = '8px';
    card.style.padding = '8px 10px';
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.2s';
    card.style.marginBottom = '4px';
    
    card.onclick = () => {
      // Set value in state & manual input field
      state.user.bodyFat = fatVal;
      const fatInput = document.getElementById('input-body-fat');
      if (fatInput) fatInput.value = fatVal;
      
      calculateBodyComp();
      
      // Highlight selection immediately by re-rendering visual list
      populateVisualBfOptions();
      
      showToast(`👤 เลือกรูปร่างระดับ ${lv.level}: กำหนด Body Fat % เป็น ${fatVal}% สำเร็จ!`);
    };

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
        <span style="font-size: 0.68rem; font-weight: 700; color: ${isActive ? 'var(--primary-dark)' : 'var(--text-primary)'};">${lv.title}</span>
        <span style="font-size: 0.72rem; font-weight: 800; color: var(--primary-dark);">${fatVal}%</span>
      </div>
      <div style="font-size: 0.58rem; color: var(--text-secondary); line-height: 1.3; text-align: left;">${lv.desc}</div>
    `;

    container.appendChild(card);
  });
}

function calculateNavyBf() {
  const neckInput = document.getElementById('navy-neck');
  const waistInput = document.getElementById('navy-waist');
  const hipInput = document.getElementById('navy-hip');
  
  if (!neckInput || !waistInput) return;

  const neckCm = parseFloat(neckInput.value) || 0;
  const waistCm = parseFloat(waistInput.value) || 0;
  const heightCm = state.user.height;
  const gender = state.user.gender;

  if (neckCm <= 0 || waistCm <= 0) {
    showToast("⚠️ กรุณากรอกขนาดสัดส่วนรอบคอและรอบเอวให้ถูกต้องค่ะ");
    return;
  }

  let bfPct = 0;

  if (gender === 'ชาย') {
    if (waistCm <= neckCm) {
      showToast("⚠️ รอบเอวต้องมากกว่ารอบคอค่ะ");
      return;
    }
    const waistInches = waistCm / 2.54;
    const neckInches = neckCm / 2.54;
    const heightInches = heightCm / 2.54;
    bfPct = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
  } else {
    // หญิง
    const hipCm = parseFloat(hipInput.value) || 0;
    if (hipCm <= 0) {
      showToast("⚠️ กรุณากรอกขนาดรอบสะโพกให้ถูกต้องด้วยค่ะ");
      return;
    }
    if ((waistCm + hipCm) <= neckCm) {
      showToast("⚠️ สัดส่วนรอบเอวรวมกับรอบสะโพกต้องมากกว่ารอบคอค่ะ");
      return;
    }
    const waistInches = waistCm / 2.54;
    const hipInches = hipCm / 2.54;
    const neckInches = neckCm / 2.54;
    const heightInches = heightCm / 2.54;
    bfPct = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
  }

  // Round to 1 decimal place
  bfPct = Math.round(bfPct * 10) / 10;
  
  if (isNaN(bfPct) || bfPct < 2 || bfPct > 60) {
    showToast("⚠️ ผลลัพธ์สูตรไม่สมเหตุสมผล กรุณาเช็คตัวเลขสัดส่วนของคุณอีกครั้งค่ะ");
    return;
  }

  // Update DOMs
  state.user.bodyFat = bfPct;
  const fatInput = document.getElementById('input-body-fat');
  if (fatInput) fatInput.value = bfPct;

  calculateBodyComp();
  
  // Show results
  showToast(`📐 สูตร Navy วิเคราะห์สำเร็จ! Body Fat = ${bfPct}% (รอบเอว/คอ/สูง)`);
  triggerConfettiCelebrate();
}

function syncBodyCompUI() {
  const fatInput = document.getElementById('input-body-fat');
  if (fatInput) {
    fatInput.value = state.user.bodyFat;
  }
  const goalEl = document.getElementById('body-comp-goal');
  if (goalEl) {
    goalEl.value = state.user.bodyCompGoal;
  }
  
  // Sync Onboarding step inputs
  const onbFatInput = document.getElementById('onb-input-body-fat');
  if (onbFatInput) {
    onbFatInput.value = state.user.bodyFat;
  }
  const onbGoalEl = document.getElementById('onb-body-comp-goal');
  if (onbGoalEl) {
    onbGoalEl.value = state.user.bodyCompGoal;
  }

  // Update Navy input defaults and show/hide hip input based on gender
  const isFemale = (state.user.gender === 'หญิง');
  const hipContainer = document.getElementById('navy-hip-container');
  if (hipContainer) {
    hipContainer.style.display = isFemale ? 'block' : 'none';
  }
  const onbHipContainer = document.getElementById('onb-navy-hip-container');
  if (onbHipContainer) {
    onbHipContainer.style.display = isFemale ? 'block' : 'none';
  }
  
  // Update height label matching the current persona
  const heightLbl = document.getElementById('navy-height-lbl');
  if (heightLbl) {
    heightLbl.textContent = `${state.user.height} ซม.`;
  }
  const onbHeightLbl = document.getElementById('onb-navy-height-lbl');
  if (onbHeightLbl) {
    onbHeightLbl.textContent = `${state.user.height} ซม.`;
  }
  
  // Default measurement values matching persona attributes
  const neckInput = document.getElementById('navy-neck');
  const waistInput = document.getElementById('navy-waist');
  const hipInput = document.getElementById('navy-hip');
  
  const onbNeck = document.getElementById('onb-navy-neck');
  const onbWaist = document.getElementById('onb-navy-waist');
  const onbHip = document.getElementById('onb-navy-hip');
  
  if (neckInput && waistInput && hipInput) {
    let neckVal = 38, waistVal = 94, hipVal = 98;
    if (state.user.name === 'สมใจ') {
      neckVal = 34; waistVal = 94; hipVal = 108;
    } else if (state.user.name === 'อนุชา') {
      neckVal = 38; waistVal = 74; hipVal = 90;
    } else if (state.user.name === 'น้องแก้ว') {
      neckVal = 33; waistVal = 94; hipVal = 104;
    } else {
      neckVal = isFemale ? 34 : 38;
      waistVal = state.user.weight + 12;
      hipVal = 98;
    }
    
    neckInput.value = neckVal;
    waistInput.value = waistVal;
    hipInput.value = hipVal;
    
    if (onbNeck) onbNeck.value = neckVal;
    if (onbWaist) onbWaist.value = waistVal;
    if (onbHip) onbHip.value = hipVal;
  }

  // Restore current BF Method selector active visual tab
  switchBfMethod(currentBfMethod);
  switchOnbBfMethod(currentOnbBfMethod);

  calculateBodyComp();
  calculateOnbBodyComp();
  changeBodyCompGoal();
}

// Onboarding Step 3 (New) body composition calculations and method switching
let currentOnbBfMethod = 'manual';

function switchOnbBfMethod(method) {
  currentOnbBfMethod = method;

  const methods = ['manual', 'visual', 'navy'];
  methods.forEach(m => {
    const btn = document.getElementById(`onb-bf-method-btn-${m}`);
    const panel = document.getElementById(`onb-bf-panel-${m}`);
    if (btn) {
      if (m === method) {
        btn.style.background = 'var(--surface)';
        btn.style.color = 'var(--primary-dark)';
        btn.style.fontWeight = '700';
        btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-muted)';
        btn.style.fontWeight = '600';
        btn.style.boxShadow = 'none';
      }
    }
    if (panel) {
      panel.style.display = (m === method) ? 'block' : 'none';
    }
  });

  if (method === 'visual') {
    populateOnbVisualBfOptions();
  }
}

function syncOnbGoalToMain(goal) {
  state.user.bodyCompGoal = goal;
  const goalEl = document.getElementById('body-comp-goal');
  if (goalEl) goalEl.value = goal;
  
  // Update description card
  changeBodyCompGoal();
}

function calculateOnbBodyComp() {
  const fatInput = document.getElementById('onb-input-body-fat');
  if (!fatInput) return;
  
  let fatPct = parseFloat(fatInput.value);
  if (isNaN(fatPct) || fatPct < 0 || fatPct > 100) return;
  
  state.user.bodyFat = fatPct;
  
  // Keep main panel input in sync
  const mainFatInput = document.getElementById('input-body-fat');
  if (mainFatInput) mainFatInput.value = fatPct;
  
  // Calculate mass for onboarding screen
  const w = parseFloat(document.getElementById('input-weight').value) || state.user.weight || 70;
  const lean = (w * (1 - fatPct / 100)).toFixed(1);
  const fat = (w * (fatPct / 100)).toFixed(1);
  
  const leanEl = document.getElementById('onb-lean-mass');
  const fatEl = document.getElementById('onb-fat-mass');
  if (leanEl) leanEl.textContent = `${lean} kg`;
  if (fatEl) fatEl.textContent = `${fat} kg`;
  
  // Update main outcome cards
  calculateBodyComp();
}

function estimateOnbBodyFat() {
  let estimatedFat = 28;
  if (state.user.name === 'สมใจ') estimatedFat = 32;
  else if (state.user.name === 'อนุชา') estimatedFat = 15;
  else if (state.user.name === 'น้องแก้ว') estimatedFat = 26;
  
  const fatInput = document.getElementById('onb-input-body-fat');
  if (fatInput) {
    fatInput.value = estimatedFat;
    calculateOnbBodyComp();
  }
}

function populateOnbVisualBfOptions() {
  const container = document.getElementById('onb-visual-options-container');
  if (!container) return;

  const gender = state.user.gender;
  const isFemale = (gender === 'หญิง');

  const levels = [
    {
      level: 1,
      title: "ระดับ 1 — ผอมแห้ง / เห็น Six-Pack ชัดเจน",
      maleFat: 10,
      femaleFat: 17,
      desc: isFemale ? "เห็นลายกล้ามท้องส่วนบนชัดเจน ไขมันสะสมหน้าท้องต่ำมาก" : "กล้ามหน้าท้องสะกดตาชัดเจน สะท้อนความฟิตสไตล์นักกีฬา"
    },
    {
      level: 2,
      title: "ระดับ 2 — หุ่นฟิตแอนด์เฟิร์ม / เห็นกล้ามท้องบางส่วน",
      maleFat: 15,
      femaleFat: 22,
      desc: isFemale ? "หุ่นฟิตกระชับสัดส่วนสวยงาม หน้าท้องลีนเห็นขอบกล้ามอ่อนๆ" : "เห็นมิติกล้ามท้องด้านข้างและกล้ามเนื้อส่วนอื่นชัดเจนสมบูรณ์"
    },
    {
      level: 3,
      title: "ระดับ 3 — รูปร่างสมส่วน / หน้าท้องราบเรียบ",
      maleFat: 20,
      femaleFat: 27,
      desc: isFemale ? "หน้าท้องราบเรียบ ไม่มีไขมันส่วนเกินพอกสะสมตามเอวชัดเจน" : "หน้าท้องเรียบตึงพอดี ไม่มีห่วงยางรอบเอว สัดส่วนปกติทั่วไป"
    },
    {
      level: 4,
      title: "ระดับ 4 — มีไขมันสะสมบางส่วน / นุ่มนิ่มเล็กน้อย",
      maleFat: 25,
      femaleFat: 32,
      desc: isFemale ? "มีเนื้อนุ่มนิ่มบริเวณรอบเอวและสะโพก แต่โดยรวมยังสมส่วนดี" : "หน้าท้องเริ่มโค้งมน มีไขมันพอกหน้าท้องเล็กน้อยพอกระชับ"
    },
    {
      level: 5,
      title: "ระดับ 5 — เจ้าเนื้อ / น้ำหนักเกินเกณฑ์",
      maleFat: 32,
      femaleFat: 38,
      desc: isFemale ? "มีไขมันสะสมตามสัดส่วนค่อนข้างหนา หน้าท้องกลมกลึงเด่นชัด" : "มีพุงกลมเด่นชัดสะสมหนาแน่นตามหน้าท้องและรอบเอวสูง"
    }
  ];

  container.innerHTML = "";
  levels.forEach(lvl => {
    const fatVal = isFemale ? lvl.femaleFat : lvl.maleFat;
    const item = document.createElement('div');
    item.style.padding = '6px 8px';
    item.style.background = 'var(--bg)';
    item.style.border = '1px solid var(--border)';
    item.style.borderRadius = '6px';
    item.style.cursor = 'pointer';
    item.style.fontSize = '0.65rem';
    item.style.transition = 'all 0.2s';
    item.style.marginBottom = '4px';
    
    // Highlight if active matching bodyfat
    const isActive = (state.user.bodyFat === fatVal);
    if (isActive) {
      item.style.borderColor = 'var(--primary)';
      item.style.background = 'var(--primary-light)';
    }

    item.onmouseover = () => {
      if (!isActive) item.style.borderColor = 'var(--primary)';
    };
    item.onmouseout = () => {
      if (!isActive) item.style.borderColor = 'var(--border)';
    };

    item.onclick = () => {
      const onbFatInput = document.getElementById('onb-input-body-fat');
      if (onbFatInput) {
        onbFatInput.value = fatVal;
        calculateOnbBodyComp();
      }
      // Re-populate container to sync visual highlights
      populateOnbVisualBfOptions();
      showToast(`👤 เลือกรูปร่างระดับ ${lvl.level} (%ไขมันสะสมประมาณ ${fatVal}%) สำเร็จ!`);
    };

    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--text-primary);">
        <span>${lvl.title}</span>
        <span style="color:var(--primary-dark);">${fatVal}% Fat</span>
      </div>
      <div style="font-size:0.58rem; color:var(--text-secondary); margin-top:2px;">${lvl.desc}</div>
    `;
    container.appendChild(item);
  });
}

function calculateOnbNavyBf() {
  const neckInput = document.getElementById('onb-navy-neck');
  const waistInput = document.getElementById('onb-navy-waist');
  const hipInput = document.getElementById('onb-navy-hip');
  
  if (!neckInput || !waistInput || !hipInput) return;
  
  const neck = parseFloat(neckInput.value);
  const waist = parseFloat(waistInput.value);
  const hip = parseFloat(hipInput.value);
  const height = state.user.height || 160;
  const isFemale = (state.user.gender === 'หญิง');

  if (isNaN(neck) || isNaN(waist) || (isFemale && isNaN(hip)) || neck <= 0 || waist <= 0 || (isFemale && hip <= 0)) {
    showToast("⚠️ กรุณาระบุข้อมูลรอบวัดต่างๆ ให้ครบถ้วนและมากกว่า 0 ค่ะ");
    return;
  }

  let bfPct = 20.0;
  if (isFemale) {
    // US Navy female formula (metric)
    const logArg = waist + hip - neck;
    if (logArg > 0) {
      bfPct = 163.205 * Math.log10(logArg) - 97.684 * Math.log10(height) - 78.387;
    }
  } else {
    // US Navy male formula (metric)
    const logArg = waist - neck;
    if (logArg > 0) {
      bfPct = 86.010 * Math.log10(logArg) - 70.041 * Math.log10(height) + 36.76;
    }
  }
  
  bfPct = Math.round(bfPct * 10) / 10;
  if (bfPct < 2) bfPct = 2;
  if (bfPct > 60) bfPct = 60;

  const onbFatInput = document.getElementById('onb-input-body-fat');
  if (onbFatInput) {
    onbFatInput.value = bfPct;
    calculateOnbBodyComp();
  }
  
  // Sync measurements with main navy inputs too
  const mainNeck = document.getElementById('navy-neck');
  const mainWaist = document.getElementById('navy-waist');
  const mainHip = document.getElementById('navy-hip');
  if (mainNeck) mainNeck.value = neck;
  if (mainWaist) mainWaist.value = waist;
  if (mainHip) mainHip.value = hip;

  showToast(`📐 สูตร Navy วิเคราะห์สำเร็จ! Body Fat = ${bfPct}%`);
  triggerConfettiCelebrate();
}

// Subtract time helper function
function subtractTime(timeString, minutesToSubtract) {
  if (!timeString) return "00:00";
  const parts = timeString.split(':');
  const hrs = parseInt(parts[0], 10) || 0;
  const mins = parseInt(parts[1], 10) || 0;
  let totalMins = hrs * 60 + mins;
  totalMins -= minutesToSubtract;
  if (totalMins < 0) {
    totalMins += 24 * 60; // wraparound midnight
  }
  const h = Math.floor(totalMins / 60).toString().padStart(2, '0');
  const m = (totalMins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

// Activity Log & Macro Adjustment Logic
function selectActivityLog(activity, fromCalendar = false) {
  state.user.activityToday = activity;
  
  if (!fromCalendar && state.isCalendarSynced) {
    showToast("💡 คุณได้เลือกกิจกรรมเองชั่วคราว (เขียนทับเวลาซิงก์จากปฏิทิน)");
  }
  
  // Highlight active chip
  const actButtons = ['rest', 'weight', 'cardio', 'exam', 'meeting', 'swim'];
  actButtons.forEach(act => {
    const btn = document.getElementById(`act-btn-${act}`);
    if (btn) {
      if (act === activity) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });

  // Calculate base macronutrients based on active persona
  let baseCal = 1600;
  let baseCarb = 130;
  let baseProtein = 70;
  let baseFat = 50;

  if (state.user.name === 'อนุชา') {
    baseCal = 2600;
    baseCarb = 320;
    baseProtein = 140;
    baseFat = 75;
  } else if (state.user.name === 'น้องแก้ว') {
    baseCal = 1400;
    baseCarb = 150;
    baseProtein = 95;
    baseFat = 40;
  } else {
    // Somjai
    baseCal = 1600;
    baseCarb = 130;
    baseProtein = 70;
    baseFat = 50;
  }

  let modCal = baseCal;
  let modCarb = baseCarb;
  let modProtein = baseProtein;
  let modFat = baseFat;
  let adjustmentText = "";

  if (activity === 'weight') {
    modCal += 300;
    modCarb += 45;
    modProtein += 20;
    adjustmentText = `💡 <strong>วันยกเวทหนัก:</strong> ระบบเพิ่มพลังงานเป้าหมายวันนี้ +300 kcal เพิ่มสัดส่วนคาร์โบไฮเดรต Pre-workout +45g และเติมโปรตีนซ่อมแซมกล้ามเนื้อหลังออกกำลังกาย Post-workout +20g ค่ะ`;
  } else if (activity === 'cardio') {
    modCal += 200;
    modCarb += 40;
    modProtein += 5;
    adjustmentText = `💡 <strong>วันวิ่ง/Cardio:</strong> ระบบเพิ่มพลังงานเป้าหมายวันนี้ +200 kcal เน้นสัดส่วนคาร์โบไฮเดรต +40g เพื่อสำรองพลังงานไกลโคเจนในกล้ามเนื้อให้เคลื่อนไหวได้นานขึ้นค่ะ`;
  } else if (activity === 'swim') {
    modCal += 250;
    modCarb += 35;
    modProtein += 10;
    adjustmentText = `💡 <strong>วันว่ายน้ำ:</strong> ระบบเพิ่มพลังงานเป้าหมายวันนี้ +250 kcal (คาร์บ +35g และโปรตีน +10g) ป้องกันสภาวะกล้ามเนื้อสลายจากการฝึกซ้อมทางน้ำเป็นเวลานานค่ะ`;
  } else if (activity === 'exam') {
    adjustmentText = `💡 <strong>วันสอบคัดเลือก:</strong> พลังงานเท่าเดิม เน้นคาร์โบไฮเดรตเชิงซ้อนชนิดปล่อยพลังงานช้า (Slow-release Carb) เลซิตินบำรุงระบบประสาท และดื่มน้ำสะอาดเพื่อโฟกัสสูงสุดค่ะ`;
  } else if (activity === 'meeting') {
    adjustmentText = `💡 <strong>วันประชุมหนัก:</strong> พลังงานเท่าเดิม เน้นอาหารที่มีดัชนีน้ำตาลต่ำ (Low-GI) ป้องกันน้ำตาลในเลือดแกว่ง (Sugar Crash) ช่วยให้สมองกระฉับกระเฉงสม่ำเสมอตลอดวันค่ะ`;
  } else {
    // rest
    modCal -= 100;
    modCarb -= 15;
    adjustmentText = `💡 <strong>วันพักฟื้นฟูร่างกาย:</strong> ระบบปรับลดแคลอรี่เป้าหมายลงเล็กน้อย -100 kcal เพื่อป้องกันการสะสมของไขมันส่วนเกิน แต่คงสัดส่วนโปรตีนเพื่อซ่อมแซมเส้นใยกล้ามเนื้อค่ะ`;
  }

  // Update target state
  state.user.calorieGoal = modCal;
  state.user.carbGoal = modCarb;
  state.user.proteinGoal = modProtein;
  state.user.fatGoal = modFat;

  // Refresh dashboard metrics displays if elements are loaded
  const homeRem = document.getElementById('home-rem-calories');
  if (homeRem) {
    let eatenCal = 0, eatenCarb = 0, eatenProtein = 0;
    state.loggedMeals.forEach(m => {
      eatenCal += m.calories;
      eatenCarb += m.carb;
      eatenProtein += m.protein;
    });
    
    const rem = modCal - eatenCal;
    homeRem.textContent = rem > 0 ? rem : 0;
    
    const maxCalEl = document.getElementById('lbl-cal-max');
    if (maxCalEl) maxCalEl.textContent = modCal;
    const maxCarbEl = document.getElementById('lbl-carb-max');
    if (maxCarbEl) maxCarbEl.textContent = modCarb;
    const maxProtEl = document.getElementById('lbl-protein-max');
    if (maxProtEl) maxProtEl.textContent = modProtein;
    
    // Update SVG rings
    updateSVGRingOffset('ring-cals', eatenCal / modCal, 534);
    updateSVGRingOffset('ring-protein', eatenProtein / modProtein, 465);
  }

  // Update adjustment status text
  const adjustEl = document.getElementById('activity-macro-adjustment');
  if (adjustEl) {
    adjustEl.innerHTML = adjustmentText;
  }

  // Sync timing planner time slot value with state value
  const timeInput = document.getElementById('activity-time-input');
  if (timeInput && timeInput.value !== state.user.preActivityTime) {
    timeInput.value = state.user.preActivityTime;
  }

  // Update pre-activity timeline
  updatePreActivityMealTiming();
}

function updatePreActivityMealTiming() {
  const timeInput = document.getElementById('activity-time-input');
  if (!timeInput) return;

  const targetTime = timeInput.value;
  state.user.preActivityTime = targetTime;

  const container = document.getElementById('pre-activity-timeline-container');
  if (!container) return;

  const activity = state.user.activityToday || 'rest';

  // Calculate backward times (150 mins, 45 mins, 15 mins)
  const timeMain = subtractTime(targetTime, 150);
  const timeSnack = subtractTime(targetTime, 45);
  const timeQuick = subtractTime(targetTime, 15);

  let mainFood = "";
  let snackFood = "";
  let quickFood = "";

  if (activity === 'weight') {
    mainFood = "🍚 <strong>มื้อหลักคาร์บเชิงซ้อน + โปรตีน:</strong> ข้าวกล้องอกไก่ย่าง หรือแซนวิชทูน่าโฮลวีตคู่บล็อคโคลี่ (เติมพลังไกลโคเจนสะสม)";
    snackFood = "🍌 <strong>มื้อว่างเติมพลังงานย่อยง่าย:</strong> กล้วยหอม 1 ลูก หรือขนมปังแผ่นป้ายแยมสตรอเบอร์รี่ (เพิ่มระดับกลูโคสในเลือดสม่ำเสมอ)";
    quickFood = "🍯 <strong>ทางเลือกช็อตพลังงานด่วน:</strong> น้ำผึ้ง 1 ช้อนชา หรือเจล Glucose (ชาร์จแรงปั๊มกล้าม ป้องกันแรงตกเซ็ตท้าย)";
  } else if (activity === 'cardio' || activity === 'swim') {
    mainFood = "🥣 <strong>มื้อหลักย่อยง่าย สารอาหารสะอาด:</strong> ข้าวต้มปลา หรือเส้นหมี่อกไก่ฉีกน้ำใสไร้น้ำมัน (ป้องกันสภาวะจุกเสียดแน่นท้องขณะวิ่ง)";
    snackFood = "🌴 <strong>พลังงานดูดซึมไว:</strong> อินทผลัม 2 เม็ด หรือแซนวิชขนมปังขาวป้ายน้ำผึ้ง (พร้อมดึงพลังงานไปใช้ระหว่างลุย)";
    quickFood = "💧 <strong>แร่ธาตุไฮเดรชั่นชดเชย:</strong> น้ำเปล่า 1 แก้วใหญ่ผสมเกลือแร่หรือเกลือชมพูปลายช้อน (ป้องกันการเป็นตะคริวเฉียบพลัน)";
  } else if (activity === 'exam' || activity === 'meeting') {
    mainFood = "🐟 <strong>มื้อหลักบำรุงสมอง & โฟกัส:</strong> ข้าวกล้องแซลมอนย่างเกลือ หรือเต้าหู้ทรงเครื่อง (เพิ่มกรดไขมันดีโอเมก้า 3 บำรุงเนื้อสมอง)";
    snackFood = "🥜 <strong>ถั่วเมล็ดเดี่ยว & ลดเครียด:</strong> ถั่วอัลมอนด์/วอลนัท 1 กำมือเล็ก คู่กับดาร์กช็อกโกแลต 70% 1 ชิ้นเล็ก (เพิ่มการไหลเวียนเลือดเลี้ยงสมอง)";
    quickFood = "🍋 <strong>เครื่องดื่มกระตุ้นระบบตื่นตัว:</strong> น้ำอุ่นผสมน้ำมะนาวหรือชาเขียวร้อนไม่ใส่น้ำตาล 1 แก้ว (ปรับสมดุลสมอง ล้างความเหนื่อยล้า)";
  } else {
    // rest/recovery
    mainFood = "🥗 <strong>มื้อหลักเน้นผักและโปรตีนลีน:</strong> สลัดอกไก่โยเกิร์ตเดรสซิ่ง หรือแกงจืดเต้าหู้ผักรวมไข่ตุ๋น (เพื่อเสริมสารฟื้นฟูกล้ามเนื้อ)";
    snackFood = "🍒 <strong>สารต้านอนุมูลอิสระธรรมชาติ:</strong> สตรอเบอร์รี่/เบอร์รี่รวม 1 ถ้วยเล็ก หรือโยเกิร์ตธรรมชาติไม่ใส่น้ำตาล (ช่วยลดการอักเสบในเซลล์กล้ามเนื้อ)";
    quickFood = "🍵 <strong>Relaxation ผ่อนประสาทส่วนกลาง:</strong> ชาคาโมมายล์อุ่นๆ 1 แก้ว หรือนมจืดไขมันต่ำ (กระตุ้นคลื่นสมองผ่อนคลายและหลับลึก)";
  }

  container.innerHTML = `
    <div style="display: flex; gap: 10px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; width: 48px; flex-shrink: 0;">
        <span style="font-size: 0.65rem; font-weight: 700; color: var(--primary-dark); background: var(--primary-light); padding: 2px 4px; border-radius: 10px; border: 1.5px solid var(--border); text-align: center; width: 100%;">${timeMain} น.</span>
        <div style="width: 2px; height: 35px; border-left: 2px dotted var(--border); margin-top: 4px;"></div>
      </div>
      <div style="flex: 1; padding: 2px 0 10px 0;">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-primary);">ก่อนกิจกรรม 2.5 ชม. (มื้อหลัก)</div>
        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 2px;">${mainFood}</div>
      </div>
    </div>

    <div style="display: flex; gap: 10px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; width: 48px; flex-shrink: 0;">
        <span style="font-size: 0.65rem; font-weight: 700; color: var(--primary-dark); background: var(--primary-light); padding: 2px 4px; border-radius: 10px; border: 1.5px solid var(--border); text-align: center; width: 100%;">${timeSnack} น.</span>
        <div style="width: 2px; height: 35px; border-left: 2px dotted var(--border); margin-top: 4px;"></div>
      </div>
      <div style="flex: 1; padding: 2px 0 10px 0;">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-primary);">ก่อนกิจกรรม 45 นาที (มื้อว่างเบาๆ)</div>
        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 2px;">${snackFood}</div>
      </div>
    </div>

    <div style="display: flex; gap: 10px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; width: 48px; flex-shrink: 0;">
        <span style="font-size: 0.65rem; font-weight: 700; color: var(--primary-dark); background: var(--primary-light); padding: 2px 4px; border-radius: 10px; border: 1.5px solid var(--border); text-align: center; width: 100%;">${timeQuick} น.</span>
        <div style="width: 2px; height: 8px; margin-top: 4px;"></div>
      </div>
      <div style="flex: 1; padding: 2px 0 2px 0;">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-primary);">ก่อนกิจกรรม 15 นาที (กระตุ้นพลังงาน)</div>
        <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 2px;">${quickFood}</div>
      </div>
    </div>

    <div style="display: flex; gap: 10px; align-items: center; background: var(--bg); border: 1.5px dashed var(--primary); padding: 8px 12px; border-radius: var(--radius-sm); margin-top: 6px;">
      <span style="font-size: 1.1rem; line-height: 1;">⏱️</span>
      <div style="font-size: 0.68rem; color: var(--text-primary); font-weight: 700; line-height: 1.35;">
        เวลากิจกรรมเป้าหมาย: <span style="color: var(--primary-dark); font-size: 0.75rem; font-weight: 800;">${targetTime} น.</span>
      </div>
    </div>
  `;
}

function triggerSimulatedPreActivityNotification() {
  let msg = "อีก 30 นาทีถึงเวลากิจกรรมของคุณแล้ว อย่าลืมทานอาหารว่างเพื่อเพิ่มพลังงานนะคะ";
  const name = state.user.name;
  if (name === 'สมใจ') {
    msg = "อีก 30 นาทีถึงเวลาออกกำลังกายเบาๆ ของคุณป้าแล้ว ทานโยเกิร์ตธรรมชาติและตระกูลเบอร์รี่เตรียมไว้ได้เลยค่ะ 🥣";
  } else if (name === 'อนุชา') {
    msg = "อีก 30 นาทีถึงเวลากิจกรรมยกเวทเพิ่มกล้ามแล้ว ทานกล้วยหอม 1 ลูกคู่ขนมปังแยมสตรอเบอร์รี่ได้เลยครับ 🍌";
  } else if (name === 'น้องแก้ว') {
    msg = "อีก 30 นาทีถึงเวลาวิ่งคาร์ดิโอเบิร์นไขมันแล้ว ทานอินทผลัม 2 เม็ดเตรียมตัวเพิ่มพลังงานได้เลยค่ะ 🏃‍♀️";
  }
  
  simulateFloatingNotification(7, msg);
}

function toggleCalendarSync(checked) {
  state.isCalendarSynced = checked;
  
  // Sync checkbox UI if accessed elsewhere
  const checkbox = document.getElementById('link-calendar');
  if (checkbox) checkbox.checked = checked;

  // Toggle badge in decision tab
  const badge = document.getElementById('calendar-sync-status-badge');
  if (badge) {
    if (checked) {
      badge.style.display = 'inline-block';
      badge.style.background = 'var(--primary-light)';
      badge.style.borderColor = 'var(--primary)';
      badge.style.color = 'var(--primary-dark)';
      badge.textContent = '📅 ซิงก์ปฏิทินแล้ว';
    } else {
      badge.style.display = 'inline-block';
      badge.style.background = '#F3F4F6';
      badge.style.borderColor = '#D1D5DB';
      badge.style.color = '#6B7280';
      badge.textContent = '🔒 ปิดการซิงก์';
    }
  }

  if (checked) {
    // Automatically reset activity & target time based on preset schedules
    let syncAct = 'rest';
    let syncTime = '17:00';
    
    if (state.user.name === 'อนุชา') {
      syncAct = 'weight';
      syncTime = '18:00';
    } else if (state.user.name === 'น้องแก้ว') {
      syncAct = 'cardio';
      syncTime = '07:00';
    } else {
      // Somjai
      syncAct = 'rest';
      syncTime = '17:00';
    }
    
    state.user.preActivityTime = syncTime;
    
    // Set time input value
    const timeInput = document.getElementById('activity-time-input');
    if (timeInput) timeInput.value = syncTime;
    
    // Trigger select activity log
    selectActivityLog(syncAct, true);
    showToast(`📅 ซิงก์ข้อมูลเวลากิจกรรมจากปฏิทินแล้ว (${syncAct === 'weight' ? 'ยกเวท' : syncAct === 'cardio' ? 'วิ่ง' : 'พักฟื้น'} เวลา ${syncTime} น.)`);
  } else {
    showToast("🔒 ปิดการเชื่อมต่อปฏิทิน คุณสามารถระบุเวลากิจกรรมเองได้โดยอิสระค่ะ");
  }
}

function toggleMealReminder(meal, enabled) {
  const input = document.getElementById(`alert-${meal}`);
  const label = document.getElementById(`lbl-${meal}`);
  if (input) {
    input.disabled = !enabled;
    input.style.opacity = enabled ? '1' : '0.4';
  }
  if (label) {
    label.style.opacity = enabled ? '1' : '0.4';
  }
  
  let mealTh = "มื้อเช้า";
  if (meal === 'lunch') mealTh = "มื้อเที่ยง";
  if (meal === 'dinner') mealTh = "มื้อเย็น";
  
  if (enabled) {
    showToast(`🔔 เปิดการแจ้งเตือนบันทึก ${mealTh} แล้วค่ะ`);
  } else {
    showToast(`🔕 ปิดการแจ้งเตือนบันทึก ${mealTh} เรียบร้อยค่ะ`);
  }
}

function formatTimeInput(inputElement) {
  let val = inputElement.value.replace(/[^0-9:]/g, ''); // keep only numbers and colons
  if (val.length === 2 && !val.includes(':')) {
    val = val + ':';
  } else if (val.length === 4 && !val.includes(':')) {
    val = val.substring(0, 2) + ':' + val.substring(2);
  }
  inputElement.value = val;
}

function validateAndCleanTimeInput(inputElement) {
  let val = inputElement.value.trim();
  // Remove non-digit and non-colon characters
  val = val.replace(/[^0-9:]/g, '');
  
  if (!val) {
    inputElement.value = "00:00";
    return;
  }
  
  // If there's no colon, try to parse based on length
  if (!val.includes(':')) {
    if (val.length === 1) {
      val = "0" + val + ":00";
    } else if (val.length === 2) {
      val = val + ":00";
    } else if (val.length === 3) {
      val = "0" + val.substring(0, 1) + ":" + val.substring(1);
    } else if (val.length >= 4) {
      val = val.substring(0, 2) + ":" + val.substring(2, 4);
    }
  }
  
  // Split into hours and minutes
  const parts = val.split(':');
  let hrs = parseInt(parts[0], 10) || 0;
  let mins = parseInt(parts[1], 10) || 0;
  
  if (hrs < 0) hrs = 0;
  if (hrs > 23) hrs = 23;
  if (mins < 0) mins = 0;
  if (mins > 59) mins = 59;
  
  const formatted = hrs.toString().padStart(2, '0') + ':' + mins.toString().padStart(2, '0');
  inputElement.value = formatted;
  
  // If it's the activity-time-input, make sure to call updatePreActivityMealTiming()
  if (inputElement.id === 'activity-time-input') {
    updatePreActivityMealTiming();
  }
}

function updateLifestyleNCDRiskAlerts() {
  const container = document.getElementById('lifestyle-risk-alerts-container');
  if (!container) return;

  container.innerHTML = "";
  const name = state.user.name;
  let alertHTML = "";

  if (name === 'อนุชา') {
    alertHTML = `
      <div style="background: rgba(239, 68, 68, 0.05); border: 1.5px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 10px; display: flex; gap: 8px; margin-bottom: 6px;">
        <span style="font-size: 1.1rem; flex-shrink: 0; line-height: 1;">🔴</span>
        <div>
          <strong style="color: #9F1239; font-size: 0.72rem; display: block; margin-bottom: 2px;">เสี่ยงภาระไตทำงานหนักเกิน (Kidney Load Risk)</strong>
          <span style="color: var(--text-secondary); font-size: 0.65rem; display: block; line-height: 1.4;">วิเคราะห์จากการเลือกรับประทานโปรตีนสูงมากติดต่อกันเฉลี่ยสะสม 90 วัน (เพื่อเสริมสร้างกล้ามเนื้อ) ส่งผลให้ตัวกรองหน่วยไตขับยูเรียเข้มข้นขึ้น แนะนำควรเพิ่มปริมาณการดื่มน้ำสะอาดชดเชยเป็นวันละ 3.0 ลิตรเพื่อระบายของเสีย และควรเช็คค่าไต eGFR/Creatinine เพิ่มเติมในการตรวจร่างกายปีนี้ค่ะ</span>
        </div>
      </div>
      <div style="background: rgba(16, 185, 129, 0.05); border: 1.5px solid rgba(16, 185, 129, 0.15); border-radius: 8px; padding: 8px; display: flex; gap: 8px; align-items: center;">
        <span style="font-size: 1rem; flex-shrink: 0;">✅</span>
        <span style="color: var(--primary-dark); font-size: 0.65rem; font-weight: 600;">แนวโน้มความดันโลหิตและระดับไขมันสะสมในหลอดเลือดเป็นสภาวะบวกดีเยี่ยม</span>
      </div>
    `;
  } else if (name === 'น้องแก้ว') {
    alertHTML = `
      <div style="background: rgba(245, 158, 11, 0.05); border: 1.5px solid rgba(245, 158, 11, 0.2); border-radius: 8px; padding: 10px; display: flex; gap: 8px; margin-bottom: 6px;">
        <span style="font-size: 1.1rem; flex-shrink: 0; line-height: 1;">⚠️</span>
        <div>
          <strong style="color: #B45309; font-size: 0.72rem; display: block; margin-bottom: 2px;">ความเสี่ยงระบบเผาผลาญลดต่ำชั่วคราว (Metabolic Slowdown Risk)</strong>
          <span style="color: var(--text-secondary); font-size: 0.65rem; display: block; line-height: 1.4;">ตรวจพบแนวโน้มการทำ Calorie Deficit ต่ำกว่าระดับ BMR เกิน 1,000 kcal ต่อเนื่องกันเกิน 14 วัน ร่างกายอาจสลับเข้าสู่สภาวะสงวนพลังงาน แนะนำให้มีวันจัดมื้อเพิ่มพลังงาน (Refeed Day คาร์บสะอาดเท่า TDEE) 1 วันต่อสัปดาห์ เพื่อปรับระดับฮอร์โมนเลปตินและคงสมรรถภาพเตาเผาผลาญค่ะ</span>
        </div>
      </div>
      <div style="background: rgba(245, 158, 11, 0.05); border: 1.5px solid rgba(245, 158, 11, 0.2); border-radius: 8px; padding: 10px; display: flex; gap: 8px;">
        <span style="font-size: 1.1rem; flex-shrink: 0; line-height: 1;">⚠️</span>
        <div>
          <strong style="color: #B45309; font-size: 0.72rem; display: block; margin-bottom: 2px;">ภาวะล้าสะสมจากการคาร์ดิโอคู่คุมอาหารหนัก (Orthostatic Hypotension)</strong>
          <span style="color: var(--text-secondary); font-size: 0.65rem; display: block; line-height: 1.4;">สัดส่วนแร่ธาตุและปริมาตรกระแสเลือดอาจเจือจาง เสี่ยงต่ออาการหน้ามืดวิงเวียนขณะเปลี่ยนท่ากะทันหัน แนะนำดื่มน้ำเกลือแร่อิเล็กโทรไลต์ชดเชยหลังวิ่ง และห้ามคุมเกลือโซเดียมจนต่ำเกินไปในช่วงฝึกซ้อมเข้มข้นค่ะ</span>
        </div>
      </div>
    `;
  } else {
    // Somjai / general
    alertHTML = `
      <div style="background: rgba(245, 158, 11, 0.05); border: 1.5px solid rgba(245, 158, 11, 0.2); border-radius: 8px; padding: 10px; display: flex; gap: 8px; margin-bottom: 6px;">
        <span style="font-size: 1.1rem; flex-shrink: 0; line-height: 1;">⚠️</span>
        <div>
          <strong style="color: #B45309; font-size: 0.72rem; display: block; margin-bottom: 2px;">ความเสี่ยงสมองอ่อนล้าตอนบ่าย (Low Energy & Brain Fog Risk)</strong>
          <span style="color: var(--text-secondary); font-size: 0.65rem; display: block; line-height: 1.4;">วิเคราะห์จากการลดสารอาหารกลุ่มคาร์โบไฮเดรตต่อเนื่องเข้มงวดเพื่อควบคุมระดับน้ำตาล อาจมีสัญญาณระดับน้ำตาลแกว่งตกชั่วคราวส่งผลให้สมองไม่สดชื่น อ่อนเพลียช่วงบ่าย แนะนำเพิ่มคาร์โบไฮเดรตเชิงซ้อนปล่อยช้า เช่น ข้าวซ้อมมือต้ม หรือธัญพืชไม่ขัดสี ในมื้อกลางวันเล็กน้อยค่ะ</span>
        </div>
      </div>
      <div style="background: rgba(239, 68, 68, 0.05); border: 1.5px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 10px; display: flex; gap: 8px;">
        <span style="font-size: 1.1rem; flex-shrink: 0; line-height: 1;">🔴</span>
        <div>
          <strong style="color: #9F1239; font-size: 0.72rem; display: block; margin-bottom: 2px;">ความผันผวนของระบบประสาทอัตโนมัติจากจิตใจกดดันคุมน้ำหนักเกินไป</strong>
          <span style="color: var(--text-secondary); font-size: 0.65rem; display: block; line-height: 1.4;">พบสัญญาณความเครียดสะสมจากการตรวจวัดเช้าวันนี้ แนะนำปรับทัศนคติ ผ่อนปรนเป้าหมายลงบางวัน และนอนหลับพักผ่อนให้มีคุณภาพ 7-8 ชม. ค่ะ</span>
        </div>
      </div>
    `;
  }

  container.innerHTML = alertHTML;
}

// Preset toggle logic for onboarding step 3
function togglePreset(presetId) {
  // General presets (Single Select)
  const isGeneral = ['weight-loss', 'muscle', 'healthy', 'energy', 'mindful'].includes(presetId);
  
  if (isGeneral) {
    // Clear all general presets
    ['weight-loss', 'muscle', 'healthy', 'energy', 'mindful'].forEach(p => {
      document.getElementById(`card-${p}`).classList.remove('active');
      const idx = state.selectedPresets.indexOf(p);
      if (idx > -1) state.selectedPresets.splice(idx, 1);
    });
    
    // Add current
    document.getElementById(`card-${presetId}`).classList.add('active');
    state.selectedPresets.push(presetId);
  } else {
    // NCD presets (Multi Select)
    const cardEl = document.getElementById(`card-${presetId}`);
    if (cardEl.classList.contains('active')) {
      cardEl.classList.remove('active');
      const idx = state.selectedPresets.indexOf(presetId);
      if (idx > -1) state.selectedPresets.splice(idx, 1);
    } else {
      cardEl.classList.add('active');
      state.selectedPresets.push(presetId);
    }
  }
}

// Calculate nutrient targets based on active presets
function calculateNutrientTargets() {
  // Base Defaults
  let cal = state.user.calorieGoal;
  let sugar = 50;
  let sodium = 2000;
  let carb = Math.round((cal * 0.5) / 4);
  let protein = Math.round((state.user.weight * 0.9));
  let fat = Math.round((cal * 0.25) / 9);

  // Apply modifiers according to selected presets
  if (state.selectedPresets.includes('weight-loss')) {
    cal -= 200;
    fat = Math.round((cal * 0.22) / 9);
    protein = Math.round(state.user.weight * 1.1);
  }
  if (state.selectedPresets.includes('muscle')) {
    cal += 300;
    protein = Math.round(state.user.weight * 1.6);
    carb = Math.round((cal * 0.55) / 4);
  }
  if (state.selectedPresets.includes('mindful')) {
    // Standard healthy targets
    sugar = 40;
  }
  
  // NCD Overrides
  if (state.selectedPresets.includes('ncd-diabetes')) {
    sugar = 25; // WHO sugar limit recommendation for diabetes
    carb = 130; // strict diabetic carb target
    cal = 1600;
  }
  if (state.selectedPresets.includes('ncd-bp')) {
    sodium = 1500; // DASH diet sodium recommendation
    cal = Math.min(cal, 1800);
  }
  if (state.selectedPresets.includes('ncd-cholesterol')) {
    fat = Math.round((cal * 0.2) / 9); // low fat
  }
  if (state.selectedPresets.includes('ncd-obesity')) {
    cal = 1400; // strict deficit
    protein = Math.round(state.user.weight * 1.2);
  }
  if (state.selectedPresets.includes('ncd-multi')) {
    // combine limits
    sugar = 25;
    sodium = 1500;
    cal = 1500;
  }

  // Update State Target objects
  state.user.calorieGoal = cal;
  state.user.sugarGoal = sugar;
  state.user.sodiumGoal = sodium;
  state.user.carbGoal = carb;
  state.user.proteinGoal = protein;
  state.user.fatGoal = fat;
}

// Render targets onto preview cards
function renderTargetsPreview() {
  document.getElementById('prev-val-calories').textContent = `${state.user.calorieGoal.toLocaleString()} kcal`;
  document.getElementById('prev-val-sugar').textContent = `< ${state.user.sugarGoal} g`;
  document.getElementById('prev-val-carb').textContent = `< ${state.user.carbGoal} g`;
  document.getElementById('prev-val-sodium').textContent = `< ${state.user.sodiumGoal.toLocaleString()} mg`;
  document.getElementById('prev-val-protein').textContent = `> ${state.user.proteinGoal} g`;
  document.getElementById('prev-val-fat').textContent = `< ${state.user.fatGoal} g`;

  // Highlight tags for critical NCD limits
  const sugarLimitEl = document.getElementById('prev-lbl-sugar');
  if (state.selectedPresets.includes('ncd-diabetes')) {
    sugarLimitEl.style.display = 'block';
    sugarLimitEl.textContent = 'NCD Limit • เบาหวาน';
  } else {
    sugarLimitEl.style.display = 'none';
  }
}

// ==========================================
// 📱 MAIN TABS MANAGEMENT (NAV BAR)
// ==========================================
function switchTab(tabId) {
  // Update state
  state.currentTab = tabId;
  
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));
  
  // Update bottom navigation bar items active states
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Handle Day 1 Empty States
  if (state.isDayOne) {
    const homeNormal = document.getElementById('home-normal-view');
    const homeEmpty = document.getElementById('home-empty-view');
    const insightsNormal = document.getElementById('insights-normal-view');
    const insightsEmpty = document.getElementById('insights-empty-view');
    
    if (homeNormal) homeNormal.style.display = 'none';
    if (homeEmpty) homeEmpty.style.display = 'block';
    if (insightsNormal) insightsNormal.style.display = 'none';
    if (insightsEmpty) insightsEmpty.style.display = 'block';

    if (tabId === 'tab-home') {
      document.getElementById('main-tab-home').classList.add('active');
      document.getElementById('nav-home').classList.add('active');
      document.getElementById('home-user-name').textContent = `คุณ${state.user.name} 👋`;
      document.getElementById('home-streak-val').textContent = '0';
      document.getElementById('pet-widget-mood').textContent = '🥚';
      document.getElementById('pet-widget-name').textContent = 'ไข่เต้าหู้ (รอฟัก)';
      document.getElementById('pet-widget-lvl').textContent = 'Lv. 1';
      document.getElementById('pet-widget-status').textContent = 'รอบันทึกมื้ออาหารแรกเพื่อเริ่มความผูกพันและช่วยฟักไข่สัตว์เลี้ยงของคุณค่ะ!';
      
      // Update Day 1 empty state text dynamically based on the current persona
      const emptyEmoji = document.getElementById('home-empty-emoji');
      const emptyTitle = document.getElementById('home-empty-title');
      const emptyDesc = document.getElementById('home-empty-desc');
      const emptyBtn = document.getElementById('home-empty-btn');
      
      if (emptyEmoji && emptyTitle && emptyDesc && emptyBtn) {
        if (state.user.name === 'สมใจ') {
          emptyEmoji.textContent = '🥗✨';
          emptyTitle.textContent = 'ยินดีต้อนรับสู่วันแรกของคุณป้า!';
          emptyDesc.textContent = 'คุณป้ายังไม่ได้บันทึกอาหารใดๆ ในวันนี้เลยค่ะ เริ่มต้นสแกนอาหารมื้อแรกของคุณป้าเพื่อเริ่มสตรีคและพัฒนาสัตว์เลี้ยงกันนะคะ';
          emptyBtn.textContent = '📸 สแกนอาหารมื้อแรก';
        } else if (state.user.name === 'อนุชา') {
          emptyEmoji.textContent = '🏋️‍♂️🔥';
          emptyTitle.textContent = 'ยินดีต้อนรับสู่วันแรกของการสร้างกล้าม!';
          emptyDesc.textContent = 'คุณอนุชายังไม่ได้บันทึกอาหารคาร์บและโปรตีนเลยครับ! บันทึกอาหารมื้อแรกเพื่อวิเคราะห์สัดส่วนสารอาหารเป้าหมายของกล้ามเนื้อกันเลย!';
          emptyBtn.textContent = '📸 บันทึกมื้ออาหารวันนี้';
        } else {
          emptyEmoji.textContent = '🏠🥗';
          emptyTitle.textContent = 'ยินดีต้อนรับสู่วันแรกของคุณ!';
          emptyDesc.textContent = 'ยินดีต้อนรับสู่ Nucistion! วันนี้ยังไม่มีการบันทึกอาหาร เริ่มสร้างพฤติกรรมโภชนาการที่ดีด้วยการถ่ายรูปหรือพิมพ์ค้นหาอาหารที่คุณทานเพื่อปลดล็อคบทวิเคราะห์ในแดชบอร์ดกันค่ะ';
          emptyBtn.textContent = '📸 บันทึกอาหารมื้อแรก';
        }
      }
    } else if (tabId === 'tab-scan') {
      document.getElementById('main-tab-scan').classList.add('active');
      document.getElementById('nav-scan').classList.add('active');
      resetScanTab();
    } else if (tabId === 'tab-decision') {
      document.getElementById('main-tab-decision').classList.add('active');
      document.getElementById('nav-decision').classList.add('active');
      runDecisionImpactAnalysis();
      selectActivityLog(state.user.activityToday);
    } else if (tabId === 'tab-insights') {
      document.getElementById('main-tab-insights').classList.add('active');
      document.getElementById('nav-insights').classList.add('active');
      syncBodyCompUI();
    } else if (tabId === 'tab-profile') {
      document.getElementById('main-tab-profile').classList.add('active');
      document.getElementById('nav-profile').classList.add('active');
      renderProfileTabDayOne();
    }
    return;
  } else {
    const homeNormal = document.getElementById('home-normal-view');
    const homeEmpty = document.getElementById('home-empty-view');
    const insightsNormal = document.getElementById('insights-normal-view');
    const insightsEmpty = document.getElementById('insights-empty-view');
    
    if (homeNormal) homeNormal.style.display = 'block';
    if (homeEmpty) homeEmpty.style.display = 'none';
    if (insightsNormal) insightsNormal.style.display = 'block';
    if (insightsEmpty) insightsEmpty.style.display = 'none';
  }

  // Map tabs to active selectors
  if (tabId === 'tab-home') {
    document.getElementById('main-tab-home').classList.add('active');
    document.getElementById('nav-home').classList.add('active');
    renderHomeDashboard();
  } else if (tabId === 'tab-scan') {
    document.getElementById('main-tab-scan').classList.add('active');
    document.getElementById('nav-scan').classList.add('active');
    resetScanTab();
  } else if (tabId === 'tab-decision') {
    document.getElementById('main-tab-decision').classList.add('active');
    document.getElementById('nav-decision').classList.add('active');
    runDecisionImpactAnalysis();
    selectActivityLog(state.user.activityToday);
  } else if (tabId === 'tab-insights') {
    document.getElementById('main-tab-insights').classList.add('active');
    document.getElementById('nav-insights').classList.add('active');
    renderInsightsTab();
    syncBodyCompUI();
  } else if (tabId === 'tab-profile') {
    document.getElementById('main-tab-profile').classList.add('active');
    document.getElementById('nav-profile').classList.add('active');
    renderProfileTab();
  }
}

// ==========================================
// 🏠 TAB 1: HOME DASHBOARD CONTROLLER
// ==========================================
function renderHomeDashboard() {
  document.getElementById('home-user-name').textContent = `คุณ${state.user.name} 👋`;
  document.getElementById('home-streak-val').textContent = state.streak;

  // Google Fit / Apple Health sync widget display
  const healthWidget = document.getElementById('health-sync-widget');
  const isHealthChecked = document.getElementById('link-health') ? document.getElementById('link-health').checked : true;
  if (isHealthChecked) {
    if (healthWidget) {
      healthWidget.style.display = 'flex';
      const stepsEl = document.getElementById('health-steps');
      const burnEl = document.getElementById('health-burn');
      
      if (state.selectedPresets.includes('muscle')) {
        stepsEl.textContent = "🚶 12,850 ก้าว";
        burnEl.textContent = "🔥 520 kcal";
      } else if (state.selectedPresets.includes('weight-loss') || state.selectedPresets.includes('ncd-obesity')) {
        stepsEl.textContent = "🚶 9,420 ก้าว";
        burnEl.textContent = "🔥 380 kcal";
      } else {
        stepsEl.textContent = "🚶 4,280 ก้าว";
        burnEl.textContent = "🔥 150 kcal";
      }
    }
  } else {
    if (healthWidget) healthWidget.style.display = 'none';
  }
  
  // Calculate totals eaten today
  let eatenCal = 0, eatenSugar = 0, eatenSodium = 0, eatenCarb = 0, eatenProtein = 0, eatenFat = 0;
  
  state.loggedMeals.forEach(meal => {
    eatenCal += meal.calories;
    eatenSugar += meal.sugar;
    eatenSodium += meal.sodium;
    eatenCarb += meal.carb;
    eatenProtein += meal.protein;
    eatenFat += meal.fat;
  });

  const remCal = state.user.calorieGoal - eatenCal;
  document.getElementById('home-rem-calories').textContent = remCal > 0 ? remCal : 0;

  // Set values onto inner detail cards
  document.getElementById('lbl-cal-curr').textContent = eatenCal;
  document.getElementById('lbl-cal-max').textContent = state.user.calorieGoal;
  
  document.getElementById('lbl-sugar-curr').textContent = eatenSugar;
  document.getElementById('lbl-sugar-max').textContent = state.user.sugarGoal;
  
  document.getElementById('lbl-sodium-curr').textContent = eatenSodium.toLocaleString();
  document.getElementById('lbl-sodium-max').textContent = state.user.sodiumGoal.toLocaleString();

  document.getElementById('lbl-carb-curr').textContent = eatenCarb;
  document.getElementById('lbl-carb-max').textContent = state.user.carbGoal;

  document.getElementById('lbl-protein-curr').textContent = eatenProtein;
  document.getElementById('lbl-protein-max').textContent = state.user.proteinGoal;

  document.getElementById('lbl-fat-curr').textContent = eatenFat;
  document.getElementById('lbl-fat-max').textContent = state.user.fatGoal;

  // Update concentric SVG paths
  // Calorie ring (r=85, circ=534)
  updateSVGRingOffset('ring-cals', eatenCal / state.user.calorieGoal, 534);
  // Protein ring (r=74, circ=465)
  updateSVGRingOffset('ring-protein', eatenProtein / state.user.proteinGoal, 465);
  // Carb ring (r=63, circ=396)
  updateSVGRingOffset('ring-carb', eatenCarb / state.user.carbGoal, 396);
  // Fat ring (r=52, circ=327)
  updateSVGRingOffset('ring-fat', eatenFat / state.user.fatGoal, 327);
  // Sodium ring (r=41, circ=258)
  updateSVGRingOffset('ring-sodium', eatenSodium / state.user.sodiumGoal, 258);
  // Sugar ring (r=30, circ=188)
  updateSVGRingOffset('ring-sugar', eatenSugar / state.user.sugarGoal, 188);

  // Bold/Highlight critical rings depending on NCD criteria
  document.querySelectorAll('.svg-ring-fill').forEach(el => el.classList.remove('bolded'));
  document.querySelectorAll('.home-nutrient-micro').forEach(el => el.classList.remove('critical-highlight'));
  
  if (state.selectedPresets.includes('ncd-diabetes')) {
    document.getElementById('ring-sugar').classList.add('bolded');
    document.getElementById('card-micro-sugar').classList.add('critical-highlight');
  }
  if (state.selectedPresets.includes('ncd-bp')) {
    document.getElementById('ring-sodium').classList.add('bolded');
    document.getElementById('card-micro-sodium').classList.add('critical-highlight');
  }

  // Calculate Meal Quality score dynamically (0-100)
  // Penalize sugar/sodium overflow
  let score = 95;
  const sugarRatio = eatenSugar / state.user.sugarGoal;
  const sodiumRatio = eatenSodium / state.user.sodiumGoal;
  
  if (sugarRatio > 1.0) score -= (sugarRatio - 1.0) * 40;
  else if (sugarRatio > 0.8) score -= 15;
  
  if (sodiumRatio > 1.0) score -= (sodiumRatio - 1.0) * 35;
  else if (sodiumRatio > 0.8) score -= 10;

  score = Math.max(15, Math.min(100, Math.round(score)));

  // Render score details
  const scoreCircle = document.getElementById('score-circle');
  const scoreText = document.getElementById('score-badge-text');
  const scoreTip = document.getElementById('score-tip-text');
  
  scoreCircle.textContent = score;
  scoreCircle.className = 'score-circle';
  scoreText.className = 'score-badge-text';
  
  if (score >= 80) {
    scoreCircle.classList.add('green');
    scoreText.classList.add('green');
    scoreText.textContent = "ยอดเยี่ยม!";
    scoreTip.textContent = "โภชนาการของคุณวันนี้ยอดเยี่ยมมาก รักษาสุขภาพอย่างต่อเนื่องนะคะ! 💚";
  } else if (score >= 50) {
    scoreCircle.classList.add('amber');
    scoreText.classList.add('amber');
    scoreText.textContent = "พอใช้";
    // Adjust recommendation text dynamically
    if (state.selectedPresets.includes('ncd-diabetes') && sugarRatio > 0.8) {
      scoreTip.textContent = "น้ำตาลสะสมใกล้เกณฑ์จำกัดแล้ว มื้อถัดไปแนะนำเลี่ยงของหวาน/ผลไม้หวานจัดนะคะ";
    } else if (state.selectedPresets.includes('ncd-bp') && sodiumRatio > 0.8) {
      scoreTip.textContent = "โซเดียมค่อนข้างสูงจากกะเพราเที่ยง เย็นนี้เน้นผักผลไม้โพแทสเซียมสูงขับเกลือนะคะ";
    } else {
      scoreTip.textContent = "วันนี้ทานเกลือและแป้งปานกลาง ลองเพิ่มโปรตีนและผักในมื้อเย็นสักนิดค่ะ";
    }
  } else {
    scoreCircle.classList.add('red');
    scoreText.classList.add('red');
    scoreText.textContent = "ลองปรับนะ";
    scoreTip.textContent = "วันนี้เป้าหมายโภชนาการทะลุเกณฑ์เล็กน้อย ไม่เป็นไรนะคะ มื้อถัดไปเริ่มกันใหม่แบบเบาบางลงค่ะ";
  }

  // Sync to Detail Modal
  document.getElementById('modal-score-circle').textContent = score;
  document.getElementById('modal-score-circle').className = `score-circle ${score >= 80 ? 'green' : score >= 50 ? 'amber' : 'red'}`;
  document.getElementById('modal-score-badge').textContent = scoreText.textContent;
  document.getElementById('modal-score-badge').className = `score-badge-text ${score >= 80 ? 'green' : score >= 50 ? 'amber' : 'red'}`;
  
  const fiberVal = 30;
  const proteinVal = 25;
  let sugarPen = Math.round(Math.max(0, (sugarRatio > 1.0 ? 30 : sugarRatio > 0.8 ? 15 : 0)));
  let sodiumPen = Math.round(Math.max(0, (sodiumRatio > 1.0 ? 25 : sodiumRatio > 0.8 ? 12 : 0)));
  
  document.getElementById('mq-breakdown-fiber').textContent = `+${fiberVal} แต้ม (ดีเยี่ยม)`;
  document.getElementById('mq-breakdown-protein').textContent = `+${proteinVal} แต้ม (ดีเยี่ยม)`;
  
  const sLabel = document.getElementById('mq-breakdown-sugar');
  sLabel.textContent = sugarPen > 0 ? `-${sugarPen} แต้ม (สูงเกินเกณฑ์)` : `+25 แต้ม (ดีเยี่ยม)`;
  sLabel.style.color = sugarPen > 0 ? 'var(--warning)' : 'var(--primary-dark)';
  
  const naLabel = document.getElementById('mq-breakdown-sodium');
  naLabel.textContent = sodiumPen > 0 ? `-${sodiumPen} แต้ม (สูงเกินเกณฑ์)` : `+20 แต้ม (ดีเยี่ยม)`;
  naLabel.style.color = sodiumPen > 0 ? 'var(--danger)' : 'var(--primary-dark)';
  
  document.getElementById('mq-tip').textContent = scoreTip.textContent;

  // Also sync Goal Impact and NCD Risk Analysis
  updateGoalImpactAndRiskAnalysis();

  // Update Today's log items details list
  // Clear rows defaults
  document.getElementById('row-desc-morning').textContent = "ไม่มีข้อมูลอาหาร";
  document.getElementById('row-desc-morning').className = "meal-row-desc empty";
  document.getElementById('row-cal-morning').textContent = "—";
  
  document.getElementById('row-desc-lunch').textContent = "ไม่มีข้อมูลอาหาร";
  document.getElementById('row-desc-lunch').className = "meal-row-desc empty";
  document.getElementById('row-cal-lunch').textContent = "—";
  
  document.getElementById('row-desc-dinner').textContent = "ไม่มีข้อมูลอาหาร";
  document.getElementById('row-desc-dinner').className = "meal-row-desc empty";
  document.getElementById('row-desc-dinner').nextElementSibling?.style.setProperty('display', 'block');
  
  // Repopulate
  state.loggedMeals.forEach(meal => {
    if (meal.period === 'morning') {
      document.getElementById('row-desc-morning').textContent = meal.name;
      document.getElementById('row-desc-morning').className = "meal-row-desc";
      document.getElementById('row-cal-morning').textContent = `${meal.calories} kcal`;
    }
    if (meal.period === 'lunch') {
      document.getElementById('row-desc-lunch').textContent = meal.name;
      document.getElementById('row-desc-lunch').className = "meal-row-desc";
      document.getElementById('row-cal-lunch').textContent = `${meal.calories} kcal`;
    }
    if (meal.period === 'dinner') {
      document.getElementById('row-desc-dinner').textContent = meal.name;
      document.getElementById('row-desc-dinner').className = "meal-row-desc";
      document.getElementById('row-desc-dinner').nextElementSibling?.style.setProperty('display', 'none');
    }
  });

  // Set Decision Intelligence banner coach tip
  const decisionCoach = document.getElementById('home-decision-coach-text');
  if (state.selectedPresets.includes('ncd-diabetes')) {
    decisionCoach.textContent = `น้ำตาลสะสมเหลืออีกแค่ ${Math.max(0, state.user.sugarGoal - eatenSugar)} กรัม จะครบโควตา แนะนำมื้อถัดไปเลือก ข้าวกล้อง ปลานึ่งขิง ค่ะ`;
  } else if (state.selectedPresets.includes('ncd-bp')) {
    decisionCoach.textContent = `โซเดียมวันนี้เหลือ ${Math.max(0, state.user.sodiumGoal - eatenSodium)} มิลลิกรัม มื้อต่อไปแนะนำหลีกเลี่ยงซอสปรุงรส แกงเผ็ดแกงกะทินะคะ`;
  } else {
    decisionCoach.textContent = `มื้อเย็นแนะนำเพิ่มผักบล็อคโคลี่และอกไก่ เพื่อรับโปรตีนเสริมสร้างกล้ามเนื้อให้พอเป้าหมายค่ะ`;
  }

  // Update Pet Mood and Text
  updateHomePetState(sugarRatio, sodiumRatio);
}

function updateSVGRingOffset(ringId, ratio, circumference) {
  const element = document.getElementById(ringId);
  if (!element) return;
  const pct = Math.max(0, Math.min(1.0, ratio));
  const offset = circumference - (pct * circumference);
  element.style.strokeDashoffset = offset;
}

function updateHomePetState(sugarRatio, sodiumRatio) {
  const petMoodEl = document.getElementById('pet-widget-mood');
  const petStatusEl = document.getElementById('pet-widget-status');
  
  if (sugarRatio > 1.1 || sodiumRatio > 1.1) {
    state.pet.mood = "เหนื่อยเล็กน้อย";
    petMoodEl.textContent = "😿";
    petStatusEl.textContent = `วันนี้น้ำตาลหรือเกลือค่อนข้างสูง ${state.pet.name} แอบเพลียเล็กน้อย พรุ่งนี้พาไปดีท็อกซ์ด้วยการกินสลัดกันเถอะ`;
  } else if (state.loggedMeals.length >= 2) {
    state.pet.mood = "ร่าเริงแจ่มใส";
    petMoodEl.textContent = "😸";
    petStatusEl.textContent = `วันนี้บันทึกครบถ้วนดีจัง! ${state.pet.name} รู้สึกแข็งแรงพร้อมเพิ่มสถิติสตรีคความดีแล้วค่ะ`;
  } else {
    state.pet.mood = "มีความสุขดี";
    petMoodEl.textContent = "🐱";
    petStatusEl.textContent = `สวัสดีค่ะคุณเจ้าของ ${state.pet.name} นั่งรอตรวจวิเคราะห์มื้อกลางวันอยู่นะคะ`;
  }
  
  // Sync Profile tab pet display
  document.getElementById('sim-lbl-pet').textContent = `${state.pet.name} (Lv. ${state.pet.level})`;
}

// ==========================================
// 📷 TAB 2: FOOD SCAN LOGIC & SUB-TABS
// ==========================================
function resetScanTab() {
  switchScanSubtab('photo');
  document.getElementById('barcode-result-card').style.display = 'none';
  document.getElementById('ai-result-content').style.display = 'none';
  document.getElementById('camera-viewfinder').style.display = 'flex';
}

function switchScanSubtab(sub) {
  document.querySelectorAll('.scan-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.scan-tab-pane').forEach(pane => pane.classList.remove('active'));
  
  if (sub === 'photo') {
    document.getElementById('scan-subtab-photo').classList.add('active');
    document.getElementById('pane-photo').classList.add('active');
    document.getElementById('camera-viewfinder').style.display = 'flex';
  } else if (sub === 'barcode') {
    document.getElementById('scan-subtab-barcode').classList.add('active');
    document.getElementById('pane-barcode').classList.add('active');
    document.getElementById('camera-viewfinder').style.display = 'none';
  } else if (sub === 'search') {
    document.getElementById('scan-subtab-search').classList.add('active');
    document.getElementById('pane-search').classList.add('active');
    document.getElementById('camera-viewfinder').style.display = 'none';
    filterFoodSearch(); // load initial list
  }
}

// Mock AI Camera analysis progress bar simulation
function simulateAICapture() {
  document.getElementById('ai-loading').style.display = 'block';
  document.getElementById('ai-result-content').style.display = 'none';
  document.getElementById('ai-scan-error-view').style.display = 'none';
  
  const fill = document.getElementById('ai-progress-fill');
  let pct = 0;
  
  const interval = setInterval(() => {
    pct += 20;
    fill.style.width = `${pct}%`;
    
    if (pct >= 100) {
      clearInterval(interval);
      document.getElementById('ai-loading').style.display = 'none';
      
      if (state.simulateScanError) {
        document.getElementById('ai-scan-error-view').style.display = 'block';
        showToast("⚠️ ไม่พบจานอาหารนี้ในระบบ AI - เข้าสู่แบบบริจาค Wiki");
      } else {
        document.getElementById('ai-result-content').style.display = 'block';
        
        // Load Default Scanned Food
        loadScannedFoodDetails({
          name: "ผัดกะเพราหมูสับราดข้าวไข่ดาว",
          calories: 580,
          sugar: 8,
          sodium: 1240,
          protein: 24,
          fat: 20,
          carb: 70,
          thumb: "🥘"
        });
      }
    }
  }, 250);
}

function loadScannedFoodDetails(foodObj) {
  state.scannedFoodTemp = { ...foodObj };
  
  document.getElementById('analysis-name').textContent = foodObj.name;
  document.getElementById('analysis-thumb').textContent = foodObj.thumb;
  
  // Set portion size to medium
  selectPortion('md', 1.0);
  
  // Trigger warning displays
  const sodiumWarnEl = document.getElementById('scan-warn-banner');
  if (foodObj.sodium > 800 && state.selectedPresets.includes('ncd-bp')) {
    sodiumWarnEl.style.display = 'block';
    sodiumWarnEl.querySelector('.warning-swap-title').textContent = `⚠️ เมนูนี้จะทำให้โซเดียมเกินเป้าหมายความดันสูง 35%`;
  } else if (foodObj.sugar > 7 && state.selectedPresets.includes('ncd-diabetes')) {
    sodiumWarnEl.style.display = 'block';
    sodiumWarnEl.querySelector('.warning-swap-title').textContent = `⚠️ เมนูนี้มีน้ำตาลสูงเกินเป้าหมายควบคุมเบาหวาน`;
  } else {
    sodiumWarnEl.style.display = 'none';
  }

  // Gym workout timing suggestions
  const workoutTimingEl = document.getElementById('scan-workout-timing');
  const workoutTextEl = document.getElementById('scan-workout-timing-text');
  if (state.selectedPresets.includes('muscle')) {
    workoutTimingEl.style.display = 'block';
    if (foodObj.protein > 20 || foodObj.calories > 450) {
      workoutTextEl.textContent = "Post-Workout Timing: เมนูโปรตีนสูงและแคลอรีหนักนี้ แนะนำทานภายใน 45 นาทีหลังซ้อมเสร็จ เพื่อกระตุ้นการซ่อมแซมใยกล้ามเนื้อสะสมทันที 🏋️";
    } else {
      workoutTextEl.textContent = "Pre-Workout Timing: เมนูคาร์บย่อยง่ายเป็นพลังงานนี้ แนะนำทานก่อนซ้อม 1.5 ชม. เพื่อรักษาระดับไกลโคเจนให้ฟิตเต็มร้อย ⚡";
    }
  } else {
    workoutTimingEl.style.display = 'none';
  }
}

function selectAlternativeFood(foodName, emoji) {
  let matched = FOOD_DATABASE.find(f => f.name.includes(foodName));
  if (!matched) {
    matched = { name: foodName, calories: 450, sugar: 4, sodium: 890, protein: 22, fat: 12, carb: 65, thumb: emoji };
  } else {
    matched.thumb = emoji;
  }
  loadScannedFoodDetails(matched);
}

function selectPortion(portionId, scale) {
  document.querySelectorAll('.portion-card').forEach(c => c.classList.remove('active'));
  document.getElementById(`portion-${portionId}`).classList.add('active');
  
  if (!state.scannedFoodTemp) return;
  
  // Scale nutrition based on size
  const curFood = state.scannedFoodTemp;
  const scaledCal = Math.round(curFood.calories * scale);
  const scaledSugar = Math.round(curFood.sugar * scale);
  const scaledSodium = Math.round(curFood.sodium * scale);
  
  document.getElementById('impact-val-cal').textContent = `${scaledCal} kcal`;
  document.getElementById('impact-val-sugar').textContent = `${scaledSugar} g`;
  document.getElementById('impact-val-sodium').textContent = `${scaledSodium.toLocaleString()} mg`;

  // Update progress bar fills
  document.getElementById('impact-bar-cal').style.width = `${Math.min(100, (scaledCal / state.user.calorieGoal) * 100)}%`;
  document.getElementById('impact-bar-sugar').style.width = `${Math.min(100, (scaledSugar / state.user.sugarGoal) * 100)}%`;
  document.getElementById('impact-bar-sodium').style.width = `${Math.min(100, (scaledSodium / state.user.sodiumGoal) * 100)}%`;
}

function changeIngredientCount(type, val) {
  const countEl = document.getElementById(`count-${type}`);
  let count = parseInt(countEl.textContent) + val;
  count = Math.max(0, count);
  countEl.textContent = count;
  
  // Dynamic modify target slightly to show working simulator
  if (state.scannedFoodTemp) {
    if (type === 'egg' && val > 0) {
      state.scannedFoodTemp.calories += 75;
      state.scannedFoodTemp.protein += 6;
      state.scannedFoodTemp.fat += 5;
    } else if (type === 'egg' && val < 0) {
      state.scannedFoodTemp.calories -= 75;
      state.scannedFoodTemp.protein -= 6;
      state.scannedFoodTemp.fat -= 5;
    }
    // reload impacts
    selectPortion('md', 1.0);
  }
}

// Swap original meal to suggested healthy meal
function applySwapFood(newName, descBenefit) {
  if (state.scannedFoodTemp) {
    state.scannedFoodTemp.name = newName;
    state.scannedFoodTemp.calories = Math.round(state.scannedFoodTemp.calories * 0.7);
    state.scannedFoodTemp.sodium = Math.round(state.scannedFoodTemp.sodium * 0.5); // reduced 50%
    state.scannedFoodTemp.sugar = Math.max(1, state.scannedFoodTemp.sugar - 3);
    
    // Refresh DOM results details
    loadScannedFoodDetails(state.scannedFoodTemp);
    
    // Add point rewards for choosing healthier choice swaps
    state.points += 20;
    showToast(`🥗 Smart Swap! คุณเลือกตัวเลือกที่ดีขึ้น รับ +20 แต้ม!`);
    
    // Trigger confetti
    triggerConfettiCelebrate();
  }
}

// Save analyzed camera meal
function saveLoggedMeal() {
  if (!state.scannedFoodTemp) return;
  
  // Log it as DINNER meal
  const dinnerMeal = {
    id: Date.now(),
    period: "dinner",
    name: state.scannedFoodTemp.name,
    calories: Math.round(state.scannedFoodTemp.calories),
    sugar: Math.round(state.scannedFoodTemp.sugar),
    sodium: Math.round(state.scannedFoodTemp.sodium),
    protein: Math.round(state.scannedFoodTemp.protein),
    fat: Math.round(state.scannedFoodTemp.fat),
    carb: Math.round(state.scannedFoodTemp.carb)
  };
  
  state.loggedMeals.push(dinnerMeal);
  
  // Add Points
  state.points += 30; // 30 points for logging meal
  
  showToast(`✅ บันทึกมื้อเย็นเรียบร้อย! รับ +30 แต้มสะสม`);
  triggerConfettiCelebrate();
  
  // Unlock dynamic milestones if swapper
  if (state.loggedMeals.length >= 2) {
    document.getElementById('achievement-swapper').classList.remove('locked');
    document.getElementById('achievement-swapper').classList.add('unlocked');
  }

  // Redirect to home
  switchTab('tab-home');
}

// Barcode scanner simulator
function simulateBarcodeScan() {
  const resultCard = document.getElementById('barcode-result-card');
  const errorCard = document.getElementById('barcode-error-view');
  
  if (state.simulateScanError) {
    resultCard.style.display = 'none';
    errorCard.style.display = 'block';
    showToast("⚠️ ไม่พบข้อมูลบาร์โค้ด - เพิ่มข้อมูลลง Wiki เพื่อรับแต้ม!");
  } else {
    resultCard.style.display = 'block';
    errorCard.style.display = 'none';
    showToast("📦 สแกนบาร์โค้ดนมถั่วเหลืองสำเร็จ!");
  }
}

function saveBarcodeMeal() {
  const qty = parseFloat(document.getElementById('barcode-servings').value) || 1;
  const barcodeMeal = {
    id: Date.now(),
    period: "dinner",
    name: document.getElementById('barcode-title').textContent,
    calories: Math.round(110 * qty),
    sugar: Math.round(3 * qty),
    sodium: Math.round(65 * qty),
    protein: Math.round(8 * qty),
    fat: Math.round(4.5 * qty),
    carb: Math.round(12 * qty)
  };
  
  state.loggedMeals.push(barcodeMeal);
  state.points += 30;
  
  showToast(`✅ บันทึกผลิตภัณฑ์กล่องสำเร็จ! รับ +30 แต้ม`);
  switchTab('tab-home');
}

// Manual search listing
function filterFoodSearch() {
  const q = document.getElementById('search-food-input').value.toLowerCase();
  const listEl = document.getElementById('search-results-list');
  listEl.innerHTML = '';
  
  const filtered = FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(q));
  
  filtered.forEach(food => {
    const row = document.createElement('div');
    row.className = 'search-result-row';
    row.onclick = () => {
      selectSearchFood(food.name, food.calories, food.sugar, food.sodium, food.protein, food.fat, food.carb);
    };
    row.innerHTML = `
      <span class="search-result-name">${food.name}</span>
      <span class="search-result-cals">${food.calories} kcal</span>
    `;
    listEl.appendChild(row);
  });
}

function setQuickSearchValue(val) {
  document.getElementById('search-food-input').value = val;
  filterFoodSearch();
}

function selectSearchFood(name, cal, sugar, sodium, protein, fat, carb) {
  // Load search food into photo analysis preview container to reuse UI layout
  switchScanSubtab('photo');
  document.getElementById('camera-viewfinder').style.display = 'none';
  
  loadScannedFoodDetails({
    name, calories: cal, sugar, sodium, protein, fat, carb, thumb: "🍽️"
  });
}

// ==========================================
// 🧭 TAB 3: DECISION INTELLIGENCE
// ==========================================
function runDecisionImpactAnalysis() {
  const q = document.getElementById('decision-search-input').value.trim();
  const displayEl = document.getElementById('decision-impact-display');
  
  if (!q) {
    displayEl.innerHTML = `
      <div class="impact-summary-card" style="text-align: center; color: var(--text-secondary); padding: 20px;">
        <span>💡 พิมพ์เมนูอาหารที่คุณอยากกินในช่องค้นหาด้านบน เพื่อวิเคราะห์ผลกระทบก่อนตัดสินใจสั่งซื้อทันที</span>
      </div>
    `;
    return;
  }

  // Find matches or build a dynamic matching object
  let matched = FOOD_DATABASE.find(f => f.name.toLowerCase().includes(q.toLowerCase()));
  if (!matched) {
    // Generate mock defaults dynamically so it always works
    matched = { name: q, calories: 480, sugar: 18, sodium: 1100, protein: 14, fat: 12, carb: 65, thumb: "🍲" };
  }

  // Determine remaining totals
  let eatenCal = 0, eatenSugar = 0, eatenSodium = 0;
  state.loggedMeals.forEach(m => {
    eatenCal += m.calories;
    eatenSugar += m.sugar;
    eatenSodium += m.sodium;
  });

  const remCal = Math.max(0, state.user.calorieGoal - eatenCal);
  const remSugar = Math.max(0, state.user.sugarGoal - eatenSugar);
  const remSodium = Math.max(0, state.user.sodiumGoal - eatenSodium);

  // Math percentages
  const calPct = Math.round((matched.calories / remCal) * 100);
  const sugarPct = Math.round((matched.sugar / remSugar) * 100);
  const sodiumPct = Math.round((matched.sodium / remSodium) * 100);

  // Verdict decisions
  let verdict = "เหมาะกับเป้าหมาย";
  let verdictClass = "fit";
  if (sugarPct > 100 || sodiumPct > 100) {
    verdict = "เกินเป้าหมายหลัก";
    verdictClass = "over";
  } else if (sugarPct > 70 || sodiumPct > 70) {
    verdict = "ควรระวังเป็นพิเศษ";
    verdictClass = "caution";
  }

  // Render smart swaps suggestions
  let swapHTML = '';
  if (matched.name.includes("ชานม") || matched.sugar > 15) {
    swapHTML = `
      <div class="smart-swap-card">
        <div class="swap-arrows">🔄</div>
        <div style="flex: 1;">
          <div class="swap-original">${matched.name}</div>
          <div class="swap-suggested">${matched.name} (หวานน้อย 25%)</div>
          <div class="swap-impact-benefit">✨ ลดการหลั่งอินซูลินสะสมลงได้ 65% ห่างไกลเบาหวาน</div>
        </div>
      </div>
    `;
  } else if (matched.name.includes("ข้าวมันไก่") || matched.calories > 550) {
    swapHTML = `
      <div class="smart-swap-card">
        <div class="swap-arrows">🔄</div>
        <div style="flex: 1;">
          <div class="swap-original">${matched.name}</div>
          <div class="swap-suggested">${matched.name} (ไม่เอาหนังไก่สับ)</div>
          <div class="swap-impact-benefit">✨ ลดไขมันอิ่มตัวสะสมลงได้ 50% และประหยัดแคลอรี 180 kcal</div>
        </div>
      </div>
    `;
  } else {
    swapHTML = `
      <div class="smart-swap-card">
        <div class="swap-arrows">🔄</div>
        <div style="flex: 1;">
          <div class="swap-original">${matched.name}</div>
          <div class="swap-suggested">${matched.name} (ลดโซเดียมไม่ใส่เค็มน้ำจิ้ม)</div>
          <div class="swap-impact-benefit">✨ ถนอมไตและควบคุมแรงดันโลหิตดีขึ้น 30%</div>
        </div>
      </div>
    `;
  }

  displayEl.innerHTML = `
    <div class="impact-summary-card">
      <div class="impact-summary-title">
        <span class="impact-summary-name">${matched.name}</span>
        <span class="verdict-badge ${verdictClass}">${verdict}</span>
      </div>
      
      <div class="impact-row" style="margin-top: 10px;">
        <span class="impact-label">พลังงาน</span>
        <div class="impact-bar-outer">
          <div class="impact-bar-inner ${calPct > 100 ? 'red' : 'green'}" style="width: ${Math.min(100, calPct)}%"></div>
        </div>
        <span class="impact-value-tag">${calPct}% ของที่เหลือ</span>
      </div>

      <div class="impact-row">
        <span class="impact-label">น้ำตาล</span>
        <div class="impact-bar-outer">
          <div class="impact-bar-inner ${sugarPct > 100 ? 'red' : 'green'}" style="width: ${Math.min(100, sugarPct)}%"></div>
        </div>
        <span class="impact-value-tag">${sugarPct}% ของที่เหลือ</span>
      </div>

      <div class="impact-row">
        <span class="impact-label">โซเดียม</span>
        <div class="impact-bar-outer">
          <div class="impact-bar-inner ${sodiumPct > 100 ? 'red' : 'green'}" style="width: ${Math.min(100, sodiumPct)}%"></div>
        </div>
        <span class="impact-value-tag">${sodiumPct}% ของที่เหลือ</span>
      </div>
    </div>
    
    ${swapHTML}
  `;
}

function setDecisionSearchValue(foodName) {
  const input = document.getElementById('decision-search-input');
  if (input) {
    input.value = foodName;
    runDecisionImpactAnalysis();
  }
}

// Nearby Restaurant Filter Toggles
function filterRestaurants(type) {
  state.activeRestaurantFilter = type;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  
  if (type === 'match') document.getElementById('fc-match').classList.add('active');
  if (type === 'dist') document.getElementById('fc-dist').classList.add('active');
  if (type === 'cheap') document.getElementById('fc-cheap').classList.add('active');

  const container = document.getElementById('restaurant-list-container');
  container.innerHTML = '';
  
  // Load persona-specific restaurant items list
  let currentPersona = 'somjai';
  if (state.user.calorieGoal > 2200) currentPersona = 'anucha';
  else if (state.user.calorieGoal < 1500) currentPersona = 'keaw';

  let list = RESTAURANT_DATA[currentPersona] || RESTAURANT_DATA.somjai;

  // sort lists matching selection criteria
  if (type === 'dist') {
    // mock shorter distance first
    list = [...list].reverse();
  }
  
  list.forEach(rest => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.onclick = () => openRestaurantMenu(rest.name, rest.match);
    
    let chips = '';
    rest.menus.forEach(menu => {
      chips += `<span class="menu-chip-mini">${menu.name}</span> `;
    });
    
    let algorithmFeedback = '';
    if (state.selectedPresets.includes('ncd-bp') || state.selectedPresets.includes('ncd-diabetes')) {
      algorithmFeedback = `<div style="font-size: 0.62rem; color: var(--primary-dark); font-weight: 700; margin-top: 4px;">🥗 NCD Goal Filter: ร้านนี้มีเมนู Low-Sodium 8 เมนู และน้ำตาลต่ำ 4 เมนู</div>`;
    } else if (state.selectedPresets.includes('muscle')) {
      algorithmFeedback = `<div style="font-size: 0.62rem; color: #0369A1; font-weight: 700; margin-top: 4px;">🥩 Muscle Gain Filter: ร้านนี้มีเมนู High-Protein (>30g) 5 เมนู</div>`;
    } else if (state.selectedPresets.includes('ncd-obesity')) {
      algorithmFeedback = `<div style="font-size: 0.62rem; color: #BE185D; font-weight: 700; margin-top: 4px;">🥗 Calorie Deficit Filter: ร้านนี้มีเมนูคาร์บต่ำใยอาหารสูง 6 เมนู</div>`;
    } else {
      algorithmFeedback = `<div style="font-size: 0.62rem; color: var(--text-secondary); margin-top: 4px;">🥗 ร้านอาหารทั่วไปแนะนำเพื่อสุขภาพคัดกรองแล้ว</div>`;
    }

    card.innerHTML = `
      <div class="restaurant-top">
        <span class="restaurant-name">${rest.name}</span>
        <span class="compatibility-score">เข้ากับเป้าหมายคุณ ${rest.match}</span>
      </div>
      <div style="font-size:0.65rem; color:var(--text-secondary); margin-top:2px;">📍 ${rest.distance}</div>
      <div class="restaurant-menus-preview">
        ${chips}
      </div>
      ${algorithmFeedback}
    `;
    container.appendChild(card);
  });
}

// Modal menus dialog opens
function openRestaurantMenu(restName, matchScore) {
  const modal = document.getElementById('modal-restaurant-menu');
  modal.style.display = 'flex';
  
  document.getElementById('rest-menu-title').textContent = `${restName} (ตรงเป้าหมาย ${matchScore})`;
  
  // load mock menu items
  const menuList = document.getElementById('rest-menu-items-list');
  menuList.innerHTML = '';
  
  const items = [
    { name: "ปลานึ่งเกี้ยมบ๊วยทรงเครื่อง", cal: 180, rating: "✅ ยอดเยี่ยม (Na 410mg)" },
    { name: "ต้มจืดวุ้นเส้นเต้าหู้หมูสับ", cal: 140, rating: "✅ ยอดเยี่ยม (Na 450mg)" },
    { name: "ข้าวผัดพริกแกงหมูกรอบ", cal: 680, rating: "❌ โซเดียมและไขมันสูงเกินเกณฑ์" }
  ];
  
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'search-result-row';
    row.onclick = () => {
      closeRestaurantMenuModal();
      selectSearchFood(item.name, item.cal, 3, 420, 15, 6, 25);
    };
    row.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        <span class="search-result-name">${item.name}</span>
        <span style="font-size:0.62rem; color:var(--primary-dark); font-weight:700;">${item.rating}</span>
      </div>
      <span class="search-result-cals">${item.cal} kcal</span>
    `;
    menuList.appendChild(row);
  });
}

function closeRestaurantMenuModal() {
  document.getElementById('modal-restaurant-menu').style.display = 'none';
}

// ==========================================
// 📊 TAB 4: INSIGHTS & OUTCOMES
// ==========================================
function renderInsightsTab() {
  // Toggle clinical tracking visibility depending on whether NCD selected
  const ncdSect = document.getElementById('clinical-ncd-section');
  const hasNCD = state.selectedPresets.some(p => p.startsWith('ncd-'));
  if (ncdSect) ncdSect.style.display = hasNCD ? 'block' : 'none';

  // Toggle waist input container: show only if Obesity or Weight loss preset is active
  const waistSect = document.getElementById('waist-input-container');
  const waistCard = document.getElementById('ba-card-waist');
  const hasObesity = state.selectedPresets.includes('ncd-obesity') || state.selectedPresets.includes('weight-loss');
  if (waistSect) waistSect.style.display = hasObesity ? 'block' : 'none';
  if (waistCard) waistCard.style.display = hasObesity ? 'block' : 'none';

  // Update dynamic reduction stats
  const sugarValEl = document.getElementById('reduc-val-sugar');
  const sodiumValEl = document.getElementById('reduc-val-sodium');
  const insightsWeeklyHighlight = document.getElementById('insights-weekly-highlight');
  
  if (state.selectedPresets.includes('ncd-diabetes')) {
    if (sugarValEl) sugarValEl.textContent = '42% ↓';
    if (sodiumValEl) sodiumValEl.textContent = '36% ↓';
    if (insightsWeeklyHighlight) insightsWeeklyHighlight.textContent = 'คุณควบคุมปริมาณน้ำตาลและโซเดียมสะสมได้สมบูรณ์แบบ 6 จาก 7 วัน 🎉';
  } else if (state.selectedPresets.includes('muscle')) {
    if (sugarValEl) sugarValEl.textContent = '24% ↓';
    if (sodiumValEl) sodiumValEl.textContent = '15% ↓';
    if (insightsWeeklyHighlight) insightsWeeklyHighlight.textContent = 'คุณได้รับโปรตีนสะสมเกินเป้าหมายเพื่อสร้างใยกล้ามเนื้อสะสมครบ 7 วันเต็ม 🏋️';
  } else {
    if (sugarValEl) sugarValEl.textContent = '38% ↓';
    if (sodiumValEl) sodiumValEl.textContent = '30% ↓';
    if (insightsWeeklyHighlight) insightsWeeklyHighlight.textContent = 'คุณประหยัดแคลอรีสะสมและขนาดรอบเอวลดลงในเกณฑ์บวก 5 จาก 7 วัน 🎉';
  }

  // Load trends graph defaults
  renderTrendChartBars();

  // Populate Goal Impact and NCD Risk Analysis
  updateGoalImpactAndRiskAnalysis();
}

function changeTrendPeriod(days) {
  state.activeTrendPeriod = days;
  document.querySelectorAll('.trend-period-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tb-${days}`).classList.add('active');
  renderTrendChartBars();
}

function changeTrendType(type) {
  state.activeTrendType = type;
  renderTrendChartBars();
}

function renderTrendChartBars() {
  const container = document.getElementById('trend-bars-container');
  const titleEl = document.getElementById('trend-chart-title');
  
  let label = "ระดับโซเดียมสะสม";
  let unit = "mg";
  let limit = 1500;
  let barData = [1650, 1520, 1430, 1380];
  let labels = ["สัปดาห์ 1", "สัปดาห์ 2", "สัปดาห์ 3", "สัปดาห์ 4"];
  
  if (state.activeTrendType === 'sugar') {
    label = "ระดับน้ำตาลสะสม";
    unit = "g";
    limit = state.user.sugarGoal;
    barData = [48, 42, 36, 24];
  } else if (state.activeTrendType === 'cals') {
    label = "สมดุลแคลอรี่เฉลี่ยต่อสัปดาห์";
    unit = "kcal";
    limit = state.user.calorieGoal;
    barData = [1850, 1720, 1610, 1580];
  }

  titleEl.textContent = `${label} (${unit}) ย้อนหลัง ${state.activeTrendPeriod} วัน`;
  
  // Rebuild HTML bars
  container.innerHTML = `
    <div class="chart-dotted-limit-line" style="bottom: 70%"></div>
    <span class="chart-limit-lbl" style="bottom: 70%">Limit: ${limit}${unit}</span>
  `;

  barData.forEach((val, index) => {
    const pctHeight = Math.round((val / (limit * 1.5)) * 100);
    const heightPx = Math.max(10, Math.min(100, pctHeight));
    
    let colorClass = "";
    if (val > limit) colorClass = "danger";
    else if (val > limit * 0.8) colorClass = "warning";

    const col = document.createElement('div');
    col.className = "chart-col-bar";
    col.innerHTML = `
      <span class="chart-col-val">${val.toLocaleString()}</span>
      <div class="chart-col-fill ${colorClass}" style="height: ${heightPx}px;"></div>
      <span class="chart-col-lbl">${labels[index]}</span>
    `;
    container.appendChild(col);
  });
}

function saveLabRecord() {
  const hba1c = document.getElementById('lab-hba1c').value;
  const bp = document.getElementById('lab-bp').value;
  const chol = document.getElementById('lab-chol').value;
  
  if (!hba1c || !bp || !chol) {
    showToast("⚠️ กรุณากรอกผลแล็บให้ครบทุกช่องค่ะ");
    return;
  }

  const record = {
    date: "03 มิ.ย. 2569", // simulate current date
    hba1c: `${hba1c}%`,
    bp: `${bp} mmHg`,
    chol: `${chol} mg/dL`
  };
  
  state.labHistory.unshift(record);
  
  // Re-render table list
  const tbody = document.getElementById('lab-history-tbody');
  tbody.innerHTML = '';
  
  state.labHistory.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.hba1c}</td>
      <td>${item.bp}</td>
      <td>${item.chol}</td>
    `;
    tbody.appendChild(row);
  });
  
  showToast("🩺 บันทึกผลตรวจร่างกายทางคลินิกสำเร็จ!");
  triggerConfettiCelebrate();
}

function acknowledgeTrigger(btn) {
  const card = btn.closest('.pattern-card');
  card.style.opacity = 0.5;
  btn.textContent = "รับรู้แล้ว ✓";
  btn.disabled = true;
  showToast("💚 ปรับจูนระบบนิสัยส่วนตัวเรียบร้อย");
}

function showTriggerAIdialog(suggestion) {
  showToast(`💡 คำแนะนำจากโค้ช AI: "${suggestion}" ลองทำมื้อเย็นนี้นะคะ!`);
}

// ==========================================
// 👤 TAB 5: PROFILE & GAMIFICATION
// ==========================================
function renderProfileTab() {
  document.getElementById('profile-user-name').textContent = `คุณ${state.user.name} วงศ์สุข`;
  document.getElementById('profile-meals-logged-count').textContent = `${state.loggedMeals.length + 35} มื้อ`;
  
  // Set badge tags
  const profileNcdTag = document.getElementById('profile-ncd-tag');
  if (state.selectedPresets.includes('ncd-diabetes')) {
    profileNcdTag.style.display = 'inline-block';
    profileNcdTag.textContent = 'NCD Program • เบาหวาน';
  } else if (state.selectedPresets.includes('ncd-bp')) {
    profileNcdTag.style.display = 'inline-block';
    profileNcdTag.textContent = 'NCD Program • ความดัน';
  } else {
    profileNcdTag.style.display = 'inline-block';
    profileNcdTag.textContent = 'ผู้ใช้งานทั่วไป';
  }

  // Render Streak grid map
  renderStreakCalendar();

  // Render Pet Shop Equipped items
  updatePetEquipment();
}

function renderStreakCalendar() {
  const grid = document.getElementById('streak-contrib-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  // Build 42 grid cells (simulating contribution patterns)
  for (let i = 0; i < 42; i++) {
    const cell = document.createElement('span');
    cell.className = 'cal-cell';
    
    // Distribute random contribution colors
    const rand = Math.random();
    if (rand > 0.8) cell.classList.add('dark-green');
    else if (rand > 0.5) cell.classList.add('green');
    else if (rand > 0.25) cell.classList.add('light-green');
    
    grid.appendChild(cell);
  }
}

// Pet Interaction details
function triggerPetReaction() {
  const emojis = ["😸", "😺", "😻", "😽"];
  const rand = emojis[Math.floor(Math.random() * emojis.length)];
  
  const petEl = document.getElementById('pet-large-emoji');
  petEl.textContent = rand;
  
  // animation bounce scale
  petEl.style.transform = 'scale(1.3)';
  setTimeout(() => {
    petEl.style.transform = 'scale(1)';
  }, 300);

  state.points += 5;
  document.getElementById('points-val').textContent = state.points;
  document.getElementById('sim-lbl-points').textContent = state.points;
  
  showToast(`🐱 ${state.pet.name} แฮปปี้ที่คุณมาลูบหัว! ได้รับ +5 แต้มโบนัส`);
}

function updatePetEquipment() {
  const hatEl = document.getElementById('pet-equipped-hat');
  if (state.pet.equippedHat === 'cowboy_hat') {
    hatEl.textContent = "🤠";
    hatEl.style.display = 'block';
  } else if (state.pet.equippedHat === 'crown') {
    hatEl.textContent = "👑";
    hatEl.style.display = 'block';
  } else if (state.pet.equippedHat === 'magician_hat') {
    hatEl.textContent = "🎩";
    hatEl.style.display = 'block';
  } else if (state.pet.equippedHat === 'ribbon') {
    hatEl.textContent = "🎀";
    hatEl.style.display = 'block';
  } else {
    hatEl.style.display = 'none';
  }
}

// Points rewards Shop
function openShopModal() {
  document.getElementById('modal-shop').style.display = 'flex';
}

function closeShopModal() {
  document.getElementById('modal-shop').style.display = 'none';
}

function openMealQualityModal() {
  document.getElementById('modal-meal-quality').style.display = 'flex';
}

function closeMealQualityModal() {
  document.getElementById('modal-meal-quality').style.display = 'none';
}

function buyShopItem(itemId, price, emoji) {
  if (state.points < price) {
    showToast("⚠️ แต้มสะสมไม่เพียงพอสำหรับการแลกไอเทมนี้ค่ะ");
    return;
  }

  state.points -= price;
  state.pet.equippedHat = itemId;
  
  // Update state values in DOM
  document.getElementById('points-val').textContent = state.points;
  document.getElementById('sim-lbl-points').textContent = state.points;
  
  updatePetEquipment();
  closeShopModal();
  
  showToast(`🎁 แลกซื้อสำเร็จ! สวมใส่ ${emoji} ให้น้องแล้วค่ะ`);
  triggerConfettiCelebrate();
}

// Achievement unlocked notifications
function showAchievementTip(title, desc) {
  const modal = document.getElementById('modal-achievement-tip');
  modal.style.display = 'flex';
  document.getElementById('ach-tip-title').textContent = title;
  document.getElementById('ach-tip-desc').textContent = desc;

  let emoji = "🏆";
  if (title.includes("โซเดียม")) emoji = "🧂";
  if (title.includes("Swapper")) emoji = "🔄";
  document.getElementById('ach-tip-icon').textContent = emoji;
}

function closeAchievementTipModal() {
  document.getElementById('modal-achievement-tip').style.display = 'none';
}

// Doctor PDF Summary reports simulated download
function simulateDoctorPDFExport() {
  showToast("📄 กำลังดึงข้อมูลและประมวลผลรายงานสำหรับคุณหมอ (PDF)...");
  setTimeout(() => {
    showToast("📥 ดาวน์โหลดรายงาน 'Nucistion-ClinicalReport-Somjai.pdf' เรียบร้อย!");
  }, 2000);
}

// LINE achievements share cards
function shareSuccessLINE() {
  showToast("💬 กำลังสร้างภาพความสำเร็จ... ส่งต่อไปยังแอป LINE ของคุณป้าสมใจ เรียบร้อย!");
}

function contributeCommunityWiki() {
  state.points += 15;
  document.getElementById('points-val').textContent = state.points;
  document.getElementById('sim-lbl-points').textContent = state.points;
  showToast("🤝 ขอบคุณสำหรับการส่งข้อมูล! ชุมชนเข้มแข็งขึ้น ได้รับ +15 แต้ม");
}

// ==========================================
// ⚙️ SANDBOX DEVELOPER COMMANDS CONTROLLERS
// ==========================================
function applyPresetPersona(personaId) {
  // Clear Active goals
  state.selectedPresets = [];
  
  if (personaId === 'somjai') {
    state.user = {
      name: "สมใจ",
      age: 58,
      gender: "หญิง",
      weight: 82,
      height: 158,
      bmi: 32.8,
      calorieGoal: 1600,
      sugarGoal: 25,
      carbGoal: 130,
      sodiumGoal: 1800,
      proteinGoal: 70,
      fatGoal: 50,
      bodyFat: 32,
      bodyCompGoal: 'recomp',
      activityToday: 'rest',
      preActivityTime: '17:00'
    };
    state.selectedPresets = ['ncd-diabetes', 'ncd-bp'];
    state.pet.name = "น้องเต้าหู้";
    state.pet.level = 3;
    state.pet.exp = 340;
    
    // Initial logged items
    state.loggedMeals = [
      { id: 1, period: "morning", name: "ข้าวต้มปลาทองเก๊า + ไข่ต้ม", calories: 280, sugar: 4, carb: 35, sodium: 450, protein: 16, fat: 6 }
    ];
    
    document.getElementById('sim-lbl-user').textContent = "คุณป้าสมใจ (โรคเบาหวาน + ความดัน)";
  } 
  else if (personaId === 'anucha') {
    state.user = {
      name: "อนุชา",
      age: 29,
      gender: "ชาย",
      weight: 74,
      height: 178,
      bmi: 23.3,
      calorieGoal: 2600,
      sugarGoal: 45,
      carbGoal: 320,
      sodiumGoal: 2000,
      proteinGoal: 140,
      fatGoal: 75,
      bodyFat: 15,
      bodyCompGoal: 'bulk',
      activityToday: 'weight',
      preActivityTime: '18:00'
    };
    state.selectedPresets = ['muscle'];
    state.pet.name = "ก๊อตซิลล่า";
    state.pet.level = 5;
    state.pet.exp = 120;
    
    state.loggedMeals = [
      { id: 1, period: "morning", name: "ไข่ดาว 4 ฟอง + ขนมปังโฮลวีต", calories: 520, sugar: 2, carb: 45, sodium: 380, protein: 32, fat: 18 }
    ];
    
    document.getElementById('sim-lbl-user').textContent = "นายอนุชา (ฟิตเนสเพิ่มกล้าม)";
  } 
  else if (personaId === 'keaw') {
    state.user = {
      name: "น้องแก้ว",
      age: 24,
      gender: "หญิง",
      weight: 68,
      height: 162,
      bmi: 25.9,
      calorieGoal: 1400,
      sugarGoal: 30,
      carbGoal: 150,
      sodiumGoal: 1500,
      proteinGoal: 95,
      fatGoal: 40,
      bodyFat: 26,
      bodyCompGoal: 'cut',
      activityToday: 'cardio',
      preActivityTime: '07:00'
    };
    state.selectedPresets = ['weight-loss', 'ncd-obesity'];
    state.pet.name = "น้องโมจิ";
    state.pet.level = 2;
    state.pet.exp = 180;
    
    state.loggedMeals = [
      { id: 1, period: "morning", name: "กรีกโยเกิร์ตผสมสตรอเบอร์รี่สด", calories: 180, sugar: 6, carb: 14, sodium: 80, protein: 18, fat: 2 }
    ];
    
    document.getElementById('sim-lbl-user').textContent = "น้องแก้ว (ลดน้ำหนักเข้มข้น)";
  }

  // Update DOMs
  document.getElementById('points-val').textContent = state.points;
  document.getElementById('sim-lbl-points').textContent = state.points;
  document.getElementById('sim-lbl-pet').textContent = `${state.pet.name} (Lv. ${state.pet.level})`;
  document.getElementById('pet-display-name').textContent = state.pet.name;
  document.getElementById('pet-display-level').textContent = `เลเวล ${state.pet.level} · สุขภาพแข็งแรงดี 💚`;
  document.getElementById('pet-widget-name').textContent = state.pet.name;
  document.getElementById('pet-widget-lvl').textContent = `Lv. ${state.pet.level}`;
  
  // Calculate target previews
  calculateNutrientTargets();
  renderTargetsPreview();
  
  // Sync the new Activity-Aware Nutrition Layer components
  syncBodyCompUI();
  if (state.isCalendarSynced) {
    toggleCalendarSync(true);
  } else {
    selectActivityLog(state.user.activityToday, true);
  }
  
  // Reload current screen components
  if (!state.onboardingActive) {
    switchTab(state.currentTab);
  } else {
    // If onboarding, reload step 2 values
    document.getElementById('input-name').value = state.user.name;
    document.getElementById('input-age').value = state.user.age;
    document.getElementById('input-weight').value = state.user.weight;
    document.getElementById('input-height').value = state.user.height;
    calculateBMI();
  }

  showToast(`👤 สลับ Persona เป็น "${state.user.name}" สำเร็จ!`);
}

function addMockPoints(pts) {
  state.points += pts;
  document.getElementById('points-val').textContent = state.points;
  document.getElementById('sim-lbl-points').textContent = state.points;
  showToast(`🪙 จำลองบวกเพิ่มแต้ม +${pts} แต้มสำเร็จ!`);
  triggerConfettiCelebrate();
}

function addMockPetExp(exp) {
  state.pet.exp += exp;
  if (state.pet.exp >= state.pet.maxExp) {
    state.pet.exp -= state.pet.maxExp;
    state.pet.level += 1;
    showToast(`🎉 ยินดีด้วย! ${state.pet.name} เลเวลอัพขึ้นเป็นเลเวล ${state.pet.level}!`);
    triggerConfettiCelebrate();
  }
  
  // Update exp bar progress
  const expPct = Math.round((state.pet.exp / state.pet.maxExp) * 100);
  document.getElementById('pet-exp-bar').style.width = `${expPct}%`;
  document.getElementById('pet-exp-nums').textContent = `${state.pet.exp} / ${state.pet.maxExp}`;
  document.getElementById('pet-display-level').textContent = `เลเวล ${state.pet.level} · สุขภาพแข็งแรงดี 💚`;
  document.getElementById('pet-widget-lvl').textContent = `Lv. ${state.pet.level}`;
  
  showToast(`🍖 เพิ่มค่าประสบการณ์สัตว์เลี้ยง +${exp} EXP`);
}

// Simulate floating push alerts banner overlays (Types 1-6)
function simulateFloatingNotification(type) {
  const banner = document.getElementById('notif-banner');
  const icon = document.getElementById('notif-icon');
  const title = document.getElementById('notif-title');
  const text = document.getElementById('notif-text');
  
  // Reset active classes
  banner.classList.remove('show');
  
  setTimeout(() => {
    if (type === 1) {
      icon.textContent = "🍽️";
      title.textContent = "แจ้งเตือนมื้ออาหาร (Meal reminder)";
      text.textContent = "ถึงเวลามื้อเที่ยงแล้ว อย่าลืมสแกนบันทึกอาหารของคุณป้าเพื่อรักษาสถิตินะคะ";
    } else if (type === 2) {
      icon.textContent = "🥦";
      title.textContent = "เป้าหมายเป็นบวก (Positive feedback)";
      text.textContent = "มื้อเช้าคุณป้ากินโปรตีนได้ยอดเยี่ยมมาก! มื้อเที่ยงนี้ลองสั่งผักเพิ่มอีกนิดนะคะ";
    } else if (type === 3) {
      icon.textContent = "💚";
      title.textContent = "กำลังใจรายวัน (Emotional Reset)";
      text.textContent = "วันนี้เป้าหมายโซเดียมอาจจะตึงไปนิด ไม่เป็นไรนะคะ พรุ่งนี้เช้าเริ่มต้นกันใหม่ค่ะ";
    } else if (type === 4) {
      icon.textContent = "🔥";
      title.textContent = "สตรีคสำเร็จสัญจร (Milestone)";
      text.textContent = "คุณป้าบันทึกสตรีคครบ 7 วันแล้ว! น้องเต้าหู้แฮปปี้และเลเวลอัพขึ้นด้วยนะ";
    } else if (type === 5) {
      icon.textContent = "📋";
      title.textContent = "นัดหมายแพทย์ (Doctor Appointment)";
      text.textContent = "มีนัดพบคุณหมอนภาในอีก 2 วันถัดไปค่ะ กดเพื่อสรุปรายงานอาหาร 30 วันส่งออก";
    } else if (type === 6) {
      icon.textContent = "🧋";
      title.textContent = "ตรวจพบแนวโน้ม (Trigger Detection)";
      text.textContent = "สังเกตไหมคะว่าวันศุกร์บ่ายมักอยากของหวานชานมไข่มุก? รับน้ำขิงหวานน้อยแทนดีไหมเอ่ย";
    }
    
    banner.classList.add('show');
  }, 100);
}

function dismissNotifBanner() {
  document.getElementById('notif-banner').classList.remove('show');
}

// Toast utility alerts
function showToast(msg) {
  // Remove existing toasts
  const old = document.querySelector('.toast-notification');
  if (old) old.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification show';
  toast.innerHTML = msg;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Confetti Particle bursts celebrate animation mockup
function triggerConfettiCelebrate() {
  const container = document.getElementById('confetti-canvas-container');
  container.style.display = 'block';
  container.innerHTML = '';
  
  const colors = ['#1D9E75', '#3B82F6', '#FBBF24', '#EF4444', '#EC4899'];
  
  for (let i = 0; i < 40; i++) {
    const item = document.createElement('div');
    item.style.position = 'absolute';
    item.style.width = `${Math.random() * 8 + 4}px`;
    item.style.height = `${Math.random() * 12 + 6}px`;
    item.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `-20px`;
    item.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Animation falling logic
    item.style.transition = 'all 1.5s cubic-bezier(0.1, 0.8, 0.3, 1)';
    container.appendChild(item);
    
    // Trigger paint
    setTimeout(() => {
      item.style.top = `${Math.random() * 80 + 20}%`;
      item.style.left = `${parseFloat(item.style.left) + (Math.random() * 30 - 15)}%`;
      item.style.opacity = 0;
    }, 50);
  }
  
  setTimeout(() => {
    container.style.display = 'none';
  }, 1600);
}

// ==========================================
// 🧠 GOAL IMPACT ENGINE & NCD RISK ANALYSIS
// ==========================================
function updateGoalImpactAndRiskAnalysis() {
  const giTitle = document.getElementById('gi-title');
  const giBar1 = document.getElementById('gi-bar-sugar');
  const giBar2 = document.getElementById('gi-bar-sodium');
  const giVal1 = document.getElementById('gi-val-sugar');
  const giVal2 = document.getElementById('gi-val-sodium');
  const giLabel1 = document.getElementById('gi-label-1');
  const giLabel2 = document.getElementById('gi-label-2');
  const giDesc = document.getElementById('gi-desc');

  const riskLevelDiabetes = document.getElementById('ncd-risk-level-diabetes');
  const riskBarDiabetes = document.getElementById('ncd-risk-bar-diabetes');
  const riskLevelBp = document.getElementById('ncd-risk-level-bp');
  const riskBarBp = document.getElementById('ncd-risk-bar-bp');
  const riskLevelChol = document.getElementById('ncd-risk-level-chol');
  const riskBarChol = document.getElementById('ncd-risk-bar-chol');
  const riskGuidance = document.getElementById('ncd-risk-guidance');

  if (!giTitle) return; // guard if DOM not ready

  // Calculate totals eaten today
  let eatenCal = 0, eatenSugar = 0, eatenSodium = 0, eatenProtein = 0, eatenFat = 0;
  state.loggedMeals.forEach(m => {
    eatenCal += m.calories;
    eatenSugar += m.sugar;
    eatenSodium += m.sodium;
    eatenProtein += m.protein;
    eatenFat += m.fat;
  });

  const isDiabetic = state.selectedPresets.includes('ncd-diabetes') || state.selectedPresets.includes('ncd-bp') || state.selectedPresets.includes('ncd-multi');

  if (isDiabetic) {
    // SOMJAI Persona (Diabetes + Hypertension)
    giTitle.textContent = "เป้าหมาย: ควบคุมน้ำตาลสะสม (HbA1c) & ความดันโลหิต";
    giLabel1.textContent = "คุมน้ำตาล";
    giLabel2.textContent = "คุมโซเดียม";

    // Sugar impact
    const sugarPct = Math.round((eatenSugar / state.user.sugarGoal) * 100);
    giBar1.style.width = `${Math.min(100, sugarPct)}%`;
    giVal1.textContent = `${sugarPct}%`;
    giBar1.className = `impact-bar-inner ${sugarPct > 100 ? 'red' : sugarPct > 80 ? 'amber' : 'green'}`;

    // Sodium impact
    const sodiumPct = Math.round((eatenSodium / state.user.sodiumGoal) * 100);
    giBar2.style.width = `${Math.min(100, sodiumPct)}%`;
    giVal2.textContent = `${sodiumPct}%`;
    giBar2.className = `impact-bar-inner ${sodiumPct > 100 ? 'red' : sodiumPct > 80 ? 'amber' : 'green'}`;

    if (sugarPct > 100 || sodiumPct > 100) {
      giDesc.textContent = "*การบริโภควันนี้ส่งผลลบต่อหลอดเลือดและระดับน้ำตาลสะสม แนะนำงดของเค็มและแป้ง/น้ำหวานทันทีเพื่อช่วยเจือจางและพักอวัยวะภายใน";
    } else {
      giDesc.textContent = "*การควบคุมอยู่ในเกณฑ์ปกติช่วยประคองระดับน้ำตาลสะสม HbA1c ระยะยาวลง 0.2% และช่วยถนอมอัตราตึงตัวหลอดเลือดแดงได้ดีขึ้น";
    }

    // Risk levels
    const sugarRisk = sugarPct > 100 ? 85 : sugarPct > 80 ? 60 : 35;
    riskBarDiabetes.style.width = `${sugarRisk}%`;
    riskBarDiabetes.className = `impact-bar-inner ${sugarRisk > 80 ? 'red' : sugarRisk > 50 ? 'amber' : 'green'}`;
    riskLevelDiabetes.textContent = sugarRisk > 80 ? "สูงมาก 🔴" : sugarRisk > 50 ? "ปานกลาง ⚠️" : "ต่ำ ✅";

    const sodiumRisk = sodiumPct > 100 ? 90 : sodiumPct > 80 ? 65 : 25;
    riskBarBp.style.width = `${sodiumRisk}%`;
    riskBarBp.className = `impact-bar-inner ${sodiumRisk > 80 ? 'red' : sodiumRisk > 50 ? 'amber' : 'green'}`;
    riskLevelBp.textContent = sodiumRisk > 80 ? "สูงมาก 🔴" : sodiumRisk > 50 ? "ปานกลาง ⚠️" : "ต่ำ ✅";

    riskBarChol.style.width = `30%`;
    riskBarChol.className = `impact-bar-inner green`;
    riskLevelChol.textContent = "ต่ำ ✅";

    riskGuidance.textContent = "🩺 คำแนะนำแพทย์: วันนี้การสลับเลือกอาหารกะเพราไม่ใส่ซอสช่วยถนอมประสิทธิภาพการกรองของไตและช่วยดึงความเสี่ยงความดันโลหิตให้อยู่ในเกณฑ์ดีเยี่ยมค่ะ";
  } 
  else if (state.selectedPresets.includes('muscle')) {
    // ANUCHA Persona (Muscle)
    giTitle.textContent = "เป้าหมาย: สังเคราะห์โปรตีนและเพิ่มมวลกล้ามเนื้อ (Hypertrophy)";
    giLabel1.textContent = "โปรตีนสะสม";
    giLabel2.textContent = "แคลอรี่เป้าหมาย";

    const protPct = Math.round((eatenProtein / state.user.proteinGoal) * 100);
    giBar1.style.width = `${Math.min(100, protPct)}%`;
    giVal1.textContent = `${protPct}%`;
    giBar1.className = `impact-bar-inner ${protPct >= 90 ? 'green' : 'amber'}`;

    const calPct = Math.round((eatenCal / state.user.calorieGoal) * 100);
    giBar2.style.width = `${Math.min(100, calPct)}%`;
    giVal2.textContent = `${calPct}%`;
    giBar2.className = `impact-bar-inner ${calPct > 100 ? 'red' : 'green'}`;

    giDesc.textContent = `*ระดับโปรตีนในขณะนี้สนับสนุนการสร้างเส้นใยกล้ามเนื้อ (MPS) ไปแล้ว ${protPct}% และช่วยให้สมดุลพลังงานอยู่ในช่วงสร้างกล้ามเนื้อ (Bulking)`;

    // Risk levels
    riskBarDiabetes.style.width = `15%`;
    riskBarDiabetes.className = `impact-bar-inner green`;
    riskLevelDiabetes.textContent = "ต่ำ ✅";

    riskBarBp.style.width = `20%`;
    riskBarBp.className = `impact-bar-inner green`;
    riskLevelBp.textContent = "ต่ำ ✅";

    riskBarChol.style.width = `25%`;
    riskBarChol.className = `impact-bar-inner green`;
    riskLevelChol.textContent = "ต่ำ ✅";

    riskGuidance.textContent = "🏋️ โค้ชฟิตเนส: ร่างกายมีสัดส่วนแร่ธาตุและโปรตีนสมบูรณ์มากในการซ่อมแซมกล้ามเนื้อ ความเสี่ยงทางคาร์ดิโอโลยีต่ำ เพิ่มใยอาหารเพื่อลดปริมาณการดูดซึมไขมันส่วนเกิน";
  } 
  else {
    // KEAW Persona (Weight Loss / Obesity)
    giTitle.textContent = "เป้าหมาย: เผาผลาญไขมันสะสม (Calorie Deficit)";
    giLabel1.textContent = "คุมแคลอรี่";
    giLabel2.textContent = "คุมไขมันสะสม";

    const calPct = Math.round((eatenCal / state.user.calorieGoal) * 100);
    giBar1.style.width = `${Math.min(100, calPct)}%`;
    giVal1.textContent = `${calPct}%`;
    giBar1.className = `impact-bar-inner ${calPct > 100 ? 'red' : calPct > 80 ? 'amber' : 'green'}`;

    const fatPct = Math.round((eatenFat / state.user.fatGoal) * 100);
    giBar2.style.width = `${Math.min(100, fatPct)}%`;
    giVal2.textContent = `${fatPct}%`;
    giBar2.className = `impact-bar-inner ${fatPct > 100 ? 'red' : fatPct > 80 ? 'amber' : 'green'}`;

    const deficit = state.user.calorieGoal - eatenCal;
    giDesc.textContent = `*วันนี้สร้างระยะห่างพลังงานติดลบได้ ${deficit > 0 ? deficit : 0} kcal ซึ่งจะช่วยดึงไขมันส่วนเกินตามรอบพุงออกมาใช้ในกระบวนการเบิร์นเวลานอน`;

    // Risk levels
    const weightRisk = calPct > 100 ? 75 : 45;
    riskBarDiabetes.style.width = `${weightRisk}%`;
    riskBarDiabetes.className = `impact-bar-inner ${weightRisk > 50 ? 'amber' : 'green'}`;
    riskLevelDiabetes.textContent = weightRisk > 50 ? "ปานกลาง ⚠️" : "ต่ำ ✅";

    riskBarBp.style.width = `30%`;
    riskBarBp.className = `impact-bar-inner green`;
    riskLevelBp.textContent = "ต่ำ ✅";

    const fatRisk = fatPct > 100 ? 70 : 40;
    riskBarChol.style.width = `${fatRisk}%`;
    riskBarChol.className = `impact-bar-inner ${fatRisk > 50 ? 'amber' : 'green'}`;
    riskLevelChol.textContent = fatRisk > 50 ? "ปานกลาง ⚠️" : "ต่ำ ✅";

    riskGuidance.textContent = "🏃 นักโภชนาการ: พฤติกรรมการคุมพลังงานและแคลอรี่ช่วยกระตุ้นการเผาผลาญไขมันในตับได้ดีเยี่ยม ควรเพิ่มผักใบเขียวสม่ำเสมอเพื่อช่วยย่อยและถนอมผนังลำไส้";
  }
}

// ==========================================
// 🔗 SANDBOX & FULL SCREEN OVERLAYS HELPER FUNCTIONS
// ==========================================
function toggleOfflineMode() {
  state.isOffline = !state.isOffline;
  const banner = document.getElementById('app-offline-banner');
  const btn = document.getElementById('sim-btn-offline');
  if (state.isOffline) {
    if (banner) banner.style.display = 'block';
    if (btn) {
      btn.style.background = '#FEE2E2';
      btn.style.borderColor = '#EF4444';
      btn.style.color = '#9F1239';
      btn.textContent = '📴 สลับเป็นโหมดออนไลน์ (โหมดออฟไลน์: ON)';
    }
    showToast("📴 คุณเข้าสู่โหมดออฟไลน์แล้ว (ข้อมูลรายการและบาร์โค้ดจะใช้ฐานข้อมูลในเครื่อง)");
  } else {
    if (banner) banner.style.display = 'none';
    if (btn) {
      btn.style.background = '#FFFBEB';
      btn.style.borderColor = '#FBBF24';
      btn.style.color = '#B45309';
      btn.textContent = '📴 สลับเป็นโหมดออฟไลน์ (Toggle Offline Mode)';
    }
    showToast("📶 คุณกลับมาออนไลน์แล้ว (ระบบกำลังซิงก์ข้อมูลคลาวด์...)");
  }
}

function toggleEmptyState() {
  state.isDayOne = !state.isDayOne;
  const btn = document.getElementById('sim-btn-dayone');
  if (state.isDayOne) {
    if (btn) {
      btn.style.background = '#C7D2FE';
      btn.style.borderColor = '#4338CA';
      btn.style.color = '#1E1B4B';
      btn.textContent = '🌱 สลับเป็นมีข้อมูลปกติ (โหมดวันแรก: ON)';
    }
    showToast("🌱 เข้าสู่โหมดผู้ใช้ใหม่วันแรก (ไม่มีประวัติโภชนาการ)");
  } else {
    if (btn) {
      btn.style.background = '#EEF2FF';
      btn.style.borderColor = '#C7D2FE';
      btn.style.color = '#4338CA';
      btn.textContent = '🌱 สลับเป็นวันแรกไม่มีข้อมูล (Toggle Day 1 State)';
    }
    showToast("🌱 กลับเข้าสู่โหมดมีประวัติข้อมูลการบันทึกปกติ");
  }
  
  // Re-switch to update displays immediately
  switchTab(state.currentTab);
}

function toggleScanErrorSimulation() {
  state.simulateScanError = !state.simulateScanError;
  const btn = document.getElementById('sim-btn-scanerror');
  if (state.simulateScanError) {
    if (btn) {
      btn.style.background = '#FBCFE8';
      btn.style.borderColor = '#BE185D';
      btn.style.color = '#831843';
      btn.textContent = '⚠️ สลับปิดการจำลองสแกนพลาด (สแกนพลาด: ON)';
    }
    showToast("⚠️ เปิดระบบจำลองสแกนล้มเหลว (ตรวจจับไม่พบ/บาร์โค้ดไม่พบ)");
  } else {
    if (btn) {
      btn.style.background = '#FDF2F8';
      btn.style.borderColor = '#FBCFE8';
      btn.style.color = '#BE185D';
      btn.textContent = '⚠️ สลับจำลองระบบสแกนล้มเหลว (Toggle Scan Error)';
    }
    showToast("⚠️ ปิดการจำลองการสแกนล้มเหลว ตรวจจับได้ปกติ");
  }
}

function submitCrowdsourcedWiki() {
  const foodName = document.getElementById('wiki-food-name').value.trim() || "อาหารประชามติ";
  const cal = parseInt(document.getElementById('wiki-food-cal').value) || 240;
  const sugar = parseInt(document.getElementById('wiki-food-sugar').value) || 3;
  const sodium = parseInt(document.getElementById('wiki-food-sodium').value) || 580;
  
  state.points += 15;
  document.getElementById('points-val').textContent = state.points;
  document.getElementById('sim-lbl-points').textContent = state.points;
  
  // Add as logged dinner
  const wikiMeal = {
    id: Date.now(),
    period: "dinner",
    name: `${foodName} (Wiki Contrib)`,
    calories: cal,
    sugar: sugar,
    sodium: sodium,
    protein: 14,
    fat: 6,
    carb: 32
  };
  state.loggedMeals.push(wikiMeal);
  
  // Hide panels and reset sandbox fail simulator
  document.getElementById('ai-scan-error-view').style.display = 'none';
  state.simulateScanError = false;
  const errBtn = document.getElementById('sim-btn-scanerror');
  if (errBtn) {
    errBtn.style.background = '#FDF2F8';
    errBtn.style.borderColor = '#FBCFE8';
    errBtn.style.color = '#BE185D';
    errBtn.textContent = '⚠️ สลับจำลองระบบสแกนล้มเหลว (Toggle Scan Error)';
  }
  
  showToast("🤝 ข้อมูลวิกิของคุณถูกบันทึกแล้ว! ได้รับโบนัสคุณธรรม +15 แต้มสะสม");
  triggerConfettiCelebrate();
  switchTab('tab-home');
}

function submitBarcodeWiki() {
  const prodName = document.getElementById('wiki-barcode-name').value.trim() || "โยเกิร์ตสุขภาพใหม่";
  const cal = parseInt(document.getElementById('wiki-barcode-cal').value) || 90;
  const sugar = parseInt(document.getElementById('wiki-barcode-sugar').value) || 2;
  const sodium = parseInt(document.getElementById('wiki-barcode-sodium').value) || 40;
  
  state.points += 15;
  document.getElementById('points-val').textContent = state.points;
  document.getElementById('sim-lbl-points').textContent = state.points;
  
  const wikiMeal = {
    id: Date.now(),
    period: "dinner",
    name: `${prodName} (Wiki Barcode)`,
    calories: cal,
    sugar: sugar,
    sodium: sodium,
    protein: 8,
    fat: 2,
    carb: 10
  };
  state.loggedMeals.push(wikiMeal);
  
  document.getElementById('barcode-error-view').style.display = 'none';
  state.simulateScanError = false;
  const errBtn = document.getElementById('sim-btn-scanerror');
  if (errBtn) {
    errBtn.style.background = '#FDF2F8';
    errBtn.style.borderColor = '#FBCFE8';
    errBtn.style.color = '#BE185D';
    errBtn.textContent = '⚠️ สลับจำลองระบบสแกนล้มเหลว (Toggle Scan Error)';
  }
  
  showToast("📦 บันทึกข้อมูลบาร์โค้ดใหม่ขึ้นทำเนียบเรียบร้อย! ได้รับ +15 แต้มสะสม");
  triggerConfettiCelebrate();
  switchTab('tab-home');
}

function saveWaistMeasurement() {
  const inputEl = document.getElementById('input-waist-today');
  if (!inputEl) return;
  const waist = parseFloat(inputEl.value) || 0;
  if (waist <= 0) {
    showToast("⚠️ กรุณากรอกขนาดรอบเอวในเกณฑ์ที่ถูกต้อง");
    return;
  }
  
  state.waistAfter = waist;
  const valEl = document.getElementById('insights-waist-after-val');
  if (valEl) valEl.textContent = `${waist} cm`;
  
  const diff = state.waistBefore - waist;
  const tag = document.getElementById('insights-waist-diff-tag');
  if (tag) {
    if (diff > 0) {
      tag.textContent = `↓ ลดลง ${diff} cm`;
      tag.className = 'ba-change-tag down';
    } else if (diff < 0) {
      tag.textContent = `↑ เพิ่มขึ้น ${Math.abs(diff)} cm`;
      tag.className = 'ba-change-tag up';
    } else {
      tag.textContent = `คงที่ (0 cm)`;
      tag.className = 'ba-change-tag';
    }
  }
  
  showToast(`⚖️ อัปเดตรอบเอว: ${waist} cm เรียบร้อยแล้วค่ะ!`);
  triggerConfettiCelebrate();
}

function renderProfileTabDayOne() {
  document.getElementById('profile-user-name').textContent = `คุณ${state.user.name} วงศ์สุข`;
  document.getElementById('profile-meals-logged-count').textContent = `0 มื้อ`;
  
  const profileNcdTag = document.getElementById('profile-ncd-tag');
  if (profileNcdTag) {
    if (state.selectedPresets.includes('ncd-diabetes')) {
      profileNcdTag.style.display = 'inline-block';
      profileNcdTag.textContent = 'NCD Program • เบาหวาน';
    } else {
      profileNcdTag.style.display = 'inline-block';
      profileNcdTag.textContent = 'ผู้ใช้งานทั่วไป';
    }
  }

  // Egg state for pet inside profile
  const hatEl = document.getElementById('pet-equipped-hat');
  if (hatEl) hatEl.style.display = 'none';
  document.getElementById('pet-large-emoji').textContent = '🥚';
  document.getElementById('pet-display-name').textContent = 'ไข่เต้าหู้ (รอฟัก)';
  document.getElementById('pet-display-level').textContent = 'เลเวล 1 · สัตว์เลี้ยงสุขภาพ 🥚';
  document.getElementById('pet-exp-nums').textContent = '0 / 100';
  document.getElementById('pet-exp-bar').style.width = '0%';
  
  // Clear contribution streak grid
  const grid = document.getElementById('streak-contrib-grid');
  if (grid) {
    grid.innerHTML = '';
    for (let i = 0; i < 42; i++) {
      const cell = document.createElement('span');
      cell.className = 'cal-cell';
      grid.appendChild(cell);
    }
  }

  // Force lock badges
  document.querySelectorAll('.achievements-grid .badge-card').forEach(card => {
    card.className = 'badge-card locked';
    const status = card.querySelector('.badge-status');
    if (status) status.textContent = '0 / 14 วัน';
  });
  
  // Update public health badge in profile to locked style
  const phIcon = document.getElementById('profile-ph-badge-icon');
  const phName = document.getElementById('profile-ph-badge-name');
  const phStatus = document.getElementById('profile-ph-badge-status');
  if (phIcon) phIcon.textContent = '🔒';
  if (phName) phName.textContent = 'ผู้พิทักษ์สาธารณสุข (ยังไม่ปลดล็อค)';
  if (phStatus) phStatus.textContent = 'สถานะ: ขาดประวัติวิจัยนิรนามวันแรก';
}

// Fullpage screens open/close controllers
function openWeeklyInsightsScreen() {
  const scr = document.getElementById('screen-weekly-insights');
  if (scr) {
    scr.style.display = 'flex';
    
    // Toggle workout Timing suggestions if gym persona
    const workoutSect = document.getElementById('workout-timing-suggestion-section');
    if (workoutSect) {
      workoutSect.style.display = state.selectedPresets.includes('muscle') ? 'block' : 'none';
    }
    
    // Render dynamic text on Weekly Insights page
    const highlight = document.getElementById('full-weekly-highlight');
    if (highlight) {
      if (state.selectedPresets.includes('ncd-diabetes')) {
        highlight.textContent = 'คุณคุณสมใจจำกัดโซเดียมและน้ำตาลอยู่ในเกณฑ์ 6 จาก 7 วัน ประสิทธิภาพสูงมากค่ะ! 🎉';
      } else if (state.selectedPresets.includes('muscle')) {
        highlight.textContent = 'เป้าหมายโปรตีนเฉลี่ยต่อวันเกิน 120g สังเคราะห์มวลกล้ามเนื้อสมบูรณ์ครบ 7 วัน 🏋️';
      } else {
        highlight.textContent = 'ควบคุมระยะห่างแคลอรีติดลบสะสมเฉลี่ยได้ดีในเกณฑ์บวก 5 จาก 7 วัน 🎉';
      }
    }
    
    const weeklySugar = document.getElementById('weekly-reduc-sugar');
    const weeklySodium = document.getElementById('weekly-reduc-sodium');
    if (weeklySugar && weeklySodium) {
      if (state.selectedPresets.includes('ncd-diabetes')) {
        weeklySugar.textContent = '42% ↓';
        weeklySodium.textContent = '36% ↓';
      } else if (state.selectedPresets.includes('muscle')) {
        weeklySugar.textContent = '24% ↓';
        weeklySodium.textContent = '15% ↓';
      } else {
        weeklySugar.textContent = '38% ↓';
        weeklySodium.textContent = '30% ↓';
      }
    }
  }
}
function closeWeeklyInsightsScreen() {
  const scr = document.getElementById('screen-weekly-insights');
  if (scr) scr.style.display = 'none';
}

function openGoalImpactScreen() {
  const scr = document.getElementById('screen-goal-impact');
  if (scr) {
    scr.style.display = 'flex';
    
    // Update labels and bars dynamically matching updateGoalImpactAndRiskAnalysis logic
    const title = document.getElementById('gi-full-title');
    const lbl1 = document.getElementById('gi-full-label-1');
    const lbl2 = document.getElementById('gi-full-label-2');
    const bar1 = document.getElementById('gi-full-bar-sugar');
    const bar2 = document.getElementById('gi-full-bar-sodium');
    const val1 = document.getElementById('gi-full-val-sugar');
    const val2 = document.getElementById('gi-full-val-sodium');
    const desc = document.getElementById('gi-full-desc');
    
    let eatenCal = 0, eatenSugar = 0, eatenSodium = 0, eatenProtein = 0;
    state.loggedMeals.forEach(m => {
      eatenCal += m.calories;
      eatenSugar += m.sugar;
      eatenSodium += m.sodium;
      eatenProtein += m.protein;
    });

    if (state.selectedPresets.includes('muscle')) {
      title.textContent = "เป้าหมาย: สังเคราะห์โปรตีนและเพิ่มมวลกล้ามเนื้อ (Hypertrophy)";
      lbl1.textContent = "โปรตีนสะสม";
      lbl2.textContent = "แคลอรี่เป้าหมาย";
      
      const protPct = Math.round((eatenProtein / state.user.proteinGoal) * 100);
      bar1.style.width = `${Math.min(100, protPct)}%`;
      val1.textContent = `${protPct}%`;
      bar1.className = `impact-bar-inner ${protPct >= 90 ? 'green' : 'amber'}`;

      const calPct = Math.round((eatenCal / state.user.calorieGoal) * 100);
      bar2.style.width = `${Math.min(100, calPct)}%`;
      val2.textContent = `${calPct}%`;
      bar2.className = `impact-bar-inner ${calPct > 100 ? 'red' : 'green'}`;
      
      desc.textContent = `*สัดส่วนโปรตีนเฉลี่ยหนุนการเติบโตของกล้ามเนื้อแล้ว ${protPct}% ปลอดภัยต่อการออกกำลังกาย`;
    } else {
      title.textContent = "เป้าหมาย: ควบคุมน้ำตาลสะสม (HbA1c) & ความดันโลหิต";
      lbl1.textContent = "คุมน้ำตาล";
      lbl2.textContent = "คุมโซเดียม";
      
      const sugarPct = Math.round((eatenSugar / state.user.sugarGoal) * 100);
      bar1.style.width = `${Math.min(100, sugarPct)}%`;
      val1.textContent = `${sugarPct}%`;
      bar1.className = `impact-bar-inner ${sugarPct > 100 ? 'red' : sugarPct > 80 ? 'amber' : 'green'}`;

      const sodiumPct = Math.round((eatenSodium / state.user.sodiumGoal) * 100);
      bar2.style.width = `${Math.min(100, sodiumPct)}%`;
      val2.textContent = `${sodiumPct}%`;
      bar2.className = `impact-bar-inner ${sodiumPct > 100 ? 'red' : sodiumPct > 80 ? 'amber' : 'green'}`;
      
      desc.textContent = `*การสลับเลือกอาหารช่วยถนอมประสิทธิภาพการทำงานของตับอ่อนและหน่วยไตได้ดีในระยะยาว`;
    }
  }
}
function closeGoalImpactScreen() {
  const scr = document.getElementById('screen-goal-impact');
  if (scr) scr.style.display = 'none';
}

function openNCDRiskTrendScreen() {
  const scr = document.getElementById('screen-ncd-risk-trend');
  if (scr) {
    scr.style.display = 'flex';
    
    // Sync current values dynamically
    const bpBar = document.getElementById('trend-bar-risk-bp');
    const bpLbl = document.getElementById('trend-lbl-risk-bp');
    const diabBar = document.getElementById('trend-bar-risk-diabetes');
    const diabLbl = document.getElementById('trend-lbl-risk-diabetes');
    const cholBar = document.getElementById('trend-bar-risk-chol');
    const cholLbl = document.getElementById('trend-lbl-risk-chol');
    const guidance = document.getElementById('trend-risk-guidance-text');
    
    let eatenSugar = 0, eatenSodium = 0;
    state.loggedMeals.forEach(m => {
      eatenSugar += m.sugar;
      eatenSodium += m.sodium;
    });
    
    const sugarPct = (eatenSugar / state.user.sugarGoal) * 100;
    const sodiumPct = (eatenSodium / state.user.sodiumGoal) * 100;
    
    if (state.selectedPresets.includes('muscle')) {
      bpBar.style.width = '20%'; bpBar.className = 'impact-bar-inner green'; bpLbl.textContent = 'ต่ำ ✅';
      diabBar.style.width = '15%'; diabBar.className = 'impact-bar-inner green'; diabLbl.textContent = 'ต่ำ ✅';
      cholBar.style.width = '25%'; cholBar.className = 'impact-bar-inner green'; cholLbl.textContent = 'ต่ำ ✅';
      guidance.textContent = '*พยากรณ์ความเสี่ยงโรคหลอดเลือดหัวใจและเบาหวานต่ำมาก ร่างกายมีสัดส่วนแร่ธาตุและโปรตีนสมบูรณ์แบบในการฟิตแอนด์เฟิร์มค่ะ';
    } else {
      const sugarRisk = sugarPct > 100 ? 85 : sugarPct > 80 ? 60 : 35;
      diabBar.style.width = `${sugarRisk}%`;
      diabBar.className = `impact-bar-inner ${sugarRisk > 80 ? 'red' : sugarRisk > 50 ? 'amber' : 'green'}`;
      diabLbl.textContent = sugarRisk > 80 ? "สูง 🔴" : sugarRisk > 50 ? "ปานกลาง ⚠️" : "ต่ำ ✅";

      const sodiumRisk = sodiumPct > 100 ? 90 : sodiumPct > 80 ? 65 : 25;
      bpBar.style.width = `${sodiumRisk}%`;
      bpBar.className = `impact-bar-inner ${sodiumRisk > 80 ? 'red' : sodiumRisk > 50 ? 'amber' : 'green'}`;
      bpLbl.textContent = sodiumRisk > 80 ? "สูง 🔴" : sodiumRisk > 50 ? "ปานกลาง ⚠️" : "ต่ำ ✅";
      
      cholBar.style.width = '30%'; cholBar.className = 'impact-bar-inner green'; cholLbl.textContent = 'ต่ำ ✅';
      guidance.textContent = '*ระบบคาดการณ์ว่าหากคุมโซเดียมและระดับน้ำตาลสะสมอย่างถูกวิธีอย่างต่อเนื่อง ค่า HbA1c ของคุณป้าจะค่อยๆ ลดกลับสู่ระดับปลอดภัยภายใน 12 สัปดาห์ค่ะ';
    }
    
    // Update Lifestyle Risk alerts dynamically
    updateLifestyleNCDRiskAlerts();
  }
}
function closeNCDRiskTrendScreen() {
  const scr = document.getElementById('screen-ncd-risk-trend');
  if (scr) scr.style.display = 'none';
}

function openPublicHealthOptinScreen() {
  const scr = document.getElementById('screen-public-health-optin');
  if (scr) {
    scr.style.display = 'flex';
    
    // Sync current values inside opt-in screen
    const checkbox = document.getElementById('optin-moph-check');
    if (checkbox) checkbox.checked = state.isMophOptedIn;
    
    const countMeals = document.getElementById('ph-contrib-meals-count');
    const bonusPts = document.getElementById('ph-contrib-points-bonus');
    const mealsNum = state.loggedMeals.length + 35;
    
    if (countMeals) countMeals.textContent = `${mealsNum} มื้อ`;
    if (bonusPts) bonusPts.textContent = state.isMophOptedIn ? `+${mealsNum * 15} แต้ม` : `+0 แต้ม (ปิดรับแต้ม)`;
  }
}
function closePublicHealthOptinScreen() {
  const scr = document.getElementById('screen-public-health-optin');
  if (scr) scr.style.display = 'none';
}

function toggleMophOptinState(checked) {
  state.isMophOptedIn = checked;
  
  const phIcon = document.getElementById('profile-ph-badge-icon');
  const phName = document.getElementById('profile-ph-badge-name');
  const phStatus = document.getElementById('profile-ph-badge-status');
  const phTitle = document.getElementById('ph-badge-status-title');
  const phOptinPoints = document.getElementById('ph-optin-points-lbl');
  
  const mealsNum = state.loggedMeals.length + 35;
  
  if (checked) {
    if (phIcon) phIcon.textContent = '🛡️';
    if (phName) phName.textContent = 'ผู้พิทักษ์สาธารณสุข (MOPH Contributor)';
    if (phStatus) phStatus.textContent = `สถานะ: ช่วยเหลือแล้ว ${mealsNum} มื้อ · รับเพิ่ม +15 แต้ม/มื้อ`;
    if (phTitle) phTitle.textContent = 'เหรียญเกียรติยศ: ผู้สนับสนุนสาธารณสุข';
    if (phOptinPoints) phOptinPoints.textContent = 'สถานะ: ยินยอมแบ่งปันนิรนาม';
    showToast("🛡️ เปิดการยินยอมข้อมูลนิรนามวิจัย สธ. แล้ว ขอบคุณสำหรับความร่วมมือเพื่อชาติค่ะ!");
  } else {
    if (phIcon) phIcon.textContent = '🔒';
    if (phName) phName.textContent = 'ผู้สนับสนุนข้อมูล (ปิดการแชร์)';
    if (phStatus) phStatus.textContent = 'สถานะ: ปิดการแบ่งปันชั่วคราว';
    if (phTitle) phTitle.textContent = 'เหรียญเกียรติยศ: ปิดการแชร์ชั่วคราว';
    if (phOptinPoints) phOptinPoints.textContent = 'สถานะ: ปิดการบริจาคข้อมูล';
    showToast("🔒 ยกเลิกการแชร์ข้อมูลสาธารณสุขแล้ว ข้อมูลจะถูกบันทึกในเครื่องส่วนตัวเท่านั้นค่ะ");
  }
  
  // Update numbers on opt-in panel if open
  const bonusPts = document.getElementById('ph-contrib-points-bonus');
  if (bonusPts) bonusPts.textContent = checked ? `+${mealsNum * 15} แต้ม` : `+0 แต้ม (ปิดรับแต้ม)`;
}

// Fallback alias for notification trigger in index.html
window.triggerPresetNotification = simulateFloatingNotification;

// Make state accessible globally for testing and analytics
window.state = state;

// Advanced Sandbox Simulations
function simulateNavyCircumferenceDemo() {
  // Go to Insights tab
  switchTab('tab-insights');
  // Switch to navy tab
  switchBfMethod('navy');
  
  // Input values depending on active persona
  const neckInput = document.getElementById('navy-neck');
  const waistInput = document.getElementById('navy-waist');
  const hipInput = document.getElementById('navy-hip');
  
  if (neckInput && waistInput) {
    if (state.user.gender === 'หญิง') {
      neckInput.value = 33;
      waistInput.value = 88;
      if (hipInput) hipInput.value = 102;
    } else {
      neckInput.value = 37;
      waistInput.value = 82;
    }
    showToast("📏 จำลองระบุข้อมูลสัดส่วนรอบคอ/รอบเอว สำเร็จ! กำลังประมวลผลสูตร Navy...");
    setTimeout(() => {
      calculateNavyBf();
    }, 800);
  }
}

function simulateHatchPetEgg() {
  if (state.isDayOne) {
    showToast("⚠️ ไม่สามารถอัปเลเวลได้เนื่องจากอยู่ในโหมด Day 1 (วันแรก สัตว์เลี้ยงเป็นไข่ค่ะ)");
    return;
  }
  
  state.points += 200;
  
  // Highlight pet widget elements
  const petMood = document.getElementById('pet-widget-mood');
  const petName = document.getElementById('pet-widget-name');
  const petLvl = document.getElementById('pet-widget-lvl');
  const petStatus = document.getElementById('pet-widget-status');
  
  if (petMood && petName && petLvl && petStatus) {
    petMood.textContent = '🦖';
    petName.textContent = 'ไดโนเต้าหู้ (วัยเตาะแตะ)';
    petLvl.textContent = 'Lv. 2';
    petStatus.textContent = 'ยินดีด้วย! สัตว์เลี้ยงของคุณฟักเป็นร่างเตาะแตะแล้ว จากการสะสมโภชนาการที่ดีอย่างต่อเนื่อง!';
    
    // Confetti celebration
    triggerConfettiCelebrate();
    showToast("🎉 ยินดีด้วย! สัตว์เลี้ยงวิวัฒนาการเป็นร่าง 2 ไดโนเต้าหู้ 🦖!");
  }
}

// Bind to window for HTML access
window.simulateNavyCircumferenceDemo = simulateNavyCircumferenceDemo;
window.simulateHatchPetEgg = simulateHatchPetEgg;

