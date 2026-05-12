

// ══════════════════════════════════════════════════════
// SUPABASE CONFIGURATION v2.0
// ══════════════════════════════════════════════════════

const SUPABASE_URL = "https://oyxgwfuodnqmtnleaqss.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95eGd3ZnVvZG5xbXRubGVhcXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MTA0NjgsImV4cCI6MjA4NzA4NjQ2OH0.uw-TxhCGp71eiNT4S7uxFT0CyYOoZWHkPeaKxgOBlnI";

// Check if Supabase SDK loaded — if not, app still works, just no score saving
let supabaseClient = null;
if (typeof window.supabase === 'undefined') {
  console.warn("Supabase SDK not loaded — scores won't be saved.");
} else {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("Supabase initialized:", SUPABASE_URL);
}

// ══════════════════════════════════════════════════════
// CHIP STACK DATA (Raise Size & Pot Size in BB)
// ══════════════════════════════════════════════════════

const CHIP_DATA = {
  // RFI
  'UTG_RFI_rfi': { raise: 2.5, pot: 1.5 },
  'HJ_RFI_rfi':  { raise: 2.5, pot: 1.5 },
  'CO_RFI_rfi':  { raise: 2.5, pot: 1.5 },
  'BTN_RFI_rfi': { raise: 2.5, pot: 1.5 },
  'SB_RFI_rfi':  { raise: 3,   pot: 1.5 },
  // vs Open (3-bet scenarios)
  'HJ_UTG_vsopen-3bet': { raise: 8,   pot: 4 },
  'CO_UTG_vsopen-3bet': { raise: 8,   pot: 4 },
  'CO_HJ_vsopen-3bet':  { raise: 8,   pot: 4 },
  'BTN_UTG_vsopen-3bet':{ raise: 8,   pot: 4 },
  'BTN_HJ_vsopen-3bet': { raise: 8,   pot: 4 },
  'BTN_CO_vsopen-3bet': { raise: 8,   pot: 4 },
  'SB_UTG_vsopen-3bet': { raise: 10,  pot: 4 },
  'SB_HJ_vsopen-3bet':  { raise: 10,  pot: 4 },
  'SB_CO_vsopen-3bet':  { raise: 10,  pot: 4 },
  'SB_BTN_vsopen-3bet': { raise: 10,  pot: 4 },
  'BB_UTG_vsopen-3bet': { raise: 10,  pot: 4 },
  'BB_HJ_vsopen-3bet':  { raise: 10,  pot: 4 },
  'BB_CO_vsopen-3bet':  { raise: 10,  pot: 4 },
  'BB_BTN_vsopen-3bet': { raise: 10,  pot: 4 },
  'BB_SB_vsopen-3bet':  { raise: 9.5, pot: 4 },
  // 3-bet Defense (4-bet scenarios)
  'UTG_HJ_defense': { raise: 20,   pot: 12   },
  'UTG_CO_defense': { raise: 20,   pot: 12   },
  'UTG_BTN_defense':{ raise: 20,   pot: 12   },
  'UTG_SB_defense': { raise: 22.5, pot: 13.5 },
  'UTG_BB_defense': { raise: 22.5, pot: 13.5 },
  'HJ_CO_defense':  { raise: 20,   pot: 12   },
  'HJ_BTN_defense': { raise: 20,   pot: 12   },
  'HJ_SB_defense':  { raise: 22.5, pot: 13.5 },
  'HJ_BB_defense':  { raise: 22.5, pot: 13.5 },
  'CO_BTN_defense': { raise: 20,   pot: 12   },
  'CO_SB_defense':  { raise: 22.5, pot: 13.5 },
  'CO_BB_defense':  { raise: 22.5, pot: 13.5 },
  'BTN_SB_defense': { raise: 22.5, pot: 13.5 },
  'BTN_BB_defense': { raise: 22.5, pot: 13.5 },
  'SB_BB_defense':  { raise: 24,   pot: 12.5 },
  // vs Open 4-bet (5-bet scenarios)
  'HJ_UTG_vsopen4bet': { raise: 100, pot: 29.5 },
  'CO_UTG_vsopen4bet': { raise: 100, pot: 29.5 },
  'CO_HJ_vsopen4bet':  { raise: 100, pot: 29.5 },
  'BTN_UTG_vsopen4bet':{ raise: 100, pot: 29.5 },
  'BTN_HJ_vsopen4bet': { raise: 100, pot: 29.5 },
  'BTN_CO_vsopen4bet': { raise: 100, pot: 29.5 },
  'SB_UTG_vsopen4bet': { raise: 100, pot: 33.5 },
  'SB_HJ_vsopen4bet':  { raise: 100, pot: 33.5 },
  'SB_CO_vsopen4bet':  { raise: 100, pot: 33.5 },
  'SB_BTN_vsopen4bet': { raise: 100, pot: 33.5 },
  'BB_UTG_vsopen4bet': { raise: 100, pot: 33.5 },
  'BB_HJ_vsopen4bet':  { raise: 100, pot: 33.5 },
  'BB_CO_vsopen4bet':  { raise: 100, pot: 33.5 },
  'BB_BTN_vsopen4bet': { raise: 100, pot: 33.5 },
  'BB_SB_vsopen4bet':  { raise: 100, pot: 33.5 },
  // 5-bet Shove Defense
  'UTG_HJ_fivebet': { pot: 121.5 },
  'UTG_CO_fivebet': { pot: 121.5 },
  'UTG_BTN_fivebet':{ pot: 121.5 },
  'UTG_SB_fivebet': { pot: 123.5 },
  'UTG_BB_fivebet': { pot: 123.5 },
  'HJ_CO_fivebet':  { pot: 121.5 },
  'HJ_BTN_fivebet': { pot: 121.5 },
  'HJ_SB_fivebet':  { pot: 123.5 },
  'HJ_BB_fivebet':  { pot: 123.5 },
  'CO_BTN_fivebet': { pot: 121.5 },
  'CO_SB_fivebet':  { pot: 123.5 },
  'CO_BB_fivebet':  { pot: 123.5 },
  'BTN_SB_fivebet': { pot: 123.5 },
  'BTN_BB_fivebet': { pot: 123.5 },
  'SB_BB_fivebet':  { pot: 124   }
};

function renderChipStacks(quizName) {
  const container = document.getElementById('chip-stacks-container');
  const data = CHIP_DATA[quizName];
  if (!data) { container.style.display = 'none'; return; }
  container.style.display = 'flex';
  container.innerHTML = '';
  if (data.raise !== undefined) container.appendChild(createChipStack(data.raise, 'raise', 'Raise'));
  container.appendChild(createChipStack(data.pot, 'pot', 'Pot'));
}

function createChipStack(amount, type, label) {
  const stack = document.createElement('div');
  stack.className = 'chip-stack';
  const amountEl = document.createElement('div');
  amountEl.className = `chip-stack-amount ${type}`;
  amountEl.textContent = `${amount}BB`;
  stack.appendChild(amountEl);
  const visual = document.createElement('div');
  visual.className = 'chip-visual';
  let chipCount;
  if (amount <= 10)       chipCount = Math.ceil(amount / 2);
  else if (amount <= 30)  chipCount = 5 + Math.ceil((amount - 10) / 5);
  else                    chipCount = 9 + Math.ceil((amount - 30) / 20);
  chipCount = Math.min(chipCount, 15);
  for (let i = 0; i < chipCount; i++) {
    const chip = document.createElement('div');
    chip.className = `chip ${type}`;
    visual.appendChild(chip);
  }
  stack.appendChild(visual);
  const labelEl = document.createElement('div');
  labelEl.className = 'chip-stack-label';
  labelEl.textContent = label;
  stack.appendChild(labelEl);
  return stack;
}

// ══════════════════════════════════════════════════════
// AUTH FUNCTIONS
// ══════════════════════════════════════════════════════

async function signUp() {
  console.log("Sign up button clicked");
  
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  
  console.log("Email:", email);
  console.log("Password length:", password.length);
  
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }
  
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  
  try {
    console.log("Attempting signup...");
  if (!supabaseClient) { alert("Score saving unavailable — Supabase not loaded."); return; }
    const { data, error } = await supabaseClient.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    
    console.log("Signup response:", data, error);
    
    if (error) {
      console.error("Signup error:", error);
      alert("Error: " + error.message);
    } else {
      console.log("Signup successful:", data);
      alert("Success! Check your email to confirm signup (check spam folder too)");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Unexpected error: " + err.message);
  }
}

async function login() {
  console.log("Login button clicked");
  
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  
  console.log("Email:", email);
  
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }
  
  try {
    console.log("Attempting login...");
  if (!supabaseClient) { alert("Score saving unavailable — Supabase not loaded."); return; }
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    
    console.log("Login response:", data, error);
    
    if (error) {
      console.error("Login error:", error);
      alert("Error: " + error.message);
    } else {
      console.log("Login successful:", data);
      updateAuthUI();
      alert("Logged in successfully!");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Unexpected error: " + err.message);
  }
}

async function logout() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  updateAuthUI();
  document.getElementById("statsDisplay").innerHTML = "";
}

async function updateAuthUI() {
  if (!supabaseClient) return;
  const { data: { user } } = await supabaseClient.auth.getUser();
  
  if (user) {
    document.getElementById("authForm").style.display = "none";
    document.getElementById("userInfo").style.display = "block";
    document.getElementById("userEmail").textContent = user.email;
  } else {
    document.getElementById("authForm").style.display = "block";
    document.getElementById("userInfo").style.display = "none";
  }
}

// Check auth on page load
updateAuthUI();

// Handle auth callback from email confirmation
if (supabaseClient) supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
  
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session.user.email);
    updateAuthUI();
    
    // Clear the hash from URL for cleaner look
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    updateAuthUI();
  }
});

// ══════════════════════════════════════════════════════
// QUIZ TRACKING FUNCTIONS
// ══════════════════════════════════════════════════════

async function saveQuizResult(quizName, score) {
  if (!supabaseClient) return;
  const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
  
  console.log("User check:", user ? user.email : "Not logged in", userError);
  
  if (!user) {
    console.error("❌ SAVE FAILED: Not logged in");
    alert("You must be logged in to save scores!");
    return;
  }
  
  console.log("User ID:", user.id);
  console.log("Attempting to insert into quiz_attempts table...");
  
  const { data, error } = await supabaseClient
    .from("quiz_attempts")
    .insert([{
      user_id: user.id,
      quiz_name: quizName,
      score: score
    }])
    .select();
  
  if (error) {
    console.error("❌ SAVE FAILED:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
  } else {
    console.log("✅ SAVE SUCCESS!", data);
    // Refresh stats on whichever screens are relevant
    await showStatsForQuiz(quizName);
  }
}

async function fetchStats(quizName) {
  if (!supabaseClient) return [];
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return [];
  
  const { data, error } = await supabaseClient
    .from("quiz_attempts")
    .select("score, created_at")
    .eq("user_id", user.id)
    .eq("quiz_name", quizName)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching stats:", error);
    return [];
  }
  
  return data || [];
}

function calculateStats(attempts) {
  if (!attempts || attempts.length === 0) {
    return { average: 0, personalBest: 0, total: 0 };
  }
  
  const scores = attempts.map(a => a.score);
  const personalBest = Math.max(...scores);
  const average = (scores.reduce((sum, s) => sum + s, 0) / scores.length).toFixed(1);
  
  return { average, personalBest, total: scores.length };
}

async function showStatsForQuiz(quizName) {
  const attempts = await fetchStats(quizName);
  const stats = calculateStats(attempts);
  
  document.getElementById("statsDisplay").innerHTML = `
    <div style="margin-top:0.5rem;">
      <div style="font-weight:600; margin-bottom:0.3rem; color:var(--gold); font-size:0.65rem;">${quizName}</div>
      <div>Attempts: ${stats.total}</div>
      <div>Average: ${stats.average}%</div>
      <div>Best: ${stats.personalBest}%</div>
    </div>
  `;
}

// Load stats for a specific quiz (not position aggregate)
async function loadQuizButtonStats(quizName, elementId) {
  if (!supabaseClient) return;
  const { data: { user } } = await supabaseClient.auth.getUser();
  
  // Default values
  let bestScore = 0;
  let avgScore = 0;
  
  if (user) {
    const attempts = await fetchStats(quizName);
    console.log(`  Found ${attempts.length} attempts for ${quizName}`);
    
    if (attempts && attempts.length > 0) {
      const stats = calculateStats(attempts);
      bestScore = stats.personalBest;
      avgScore = parseInt(stats.average);
      console.log(`  Stats: Best=${bestScore}%, Avg=${avgScore}%`);
    }
  }
  
  // Update the element
  const el = document.getElementById(elementId);
  if (el) {
    el.innerHTML = `
      <div>Best: <span class="stat-best">${bestScore}%</span></div>
      <div>Avg: <span class="stat-avg">${avgScore}%</span></div>
    `;
  } else {
    console.warn(`  Element ${elementId} not found!`);
  }
}

// Load overall stats for a specific hero position + quiz category
// If bestElementId === avgElementId, writes compact Best/Avg into a single element
async function loadOverallPositionStats(heroPos, category, bestElementId, avgElementId) {
  if (!supabaseClient) return;
  const { data: { user } } = await supabaseClient.auth.getUser();
  
  let bestScore = 0;
  let avgScore = 0;
  
  if (user) {
    const { data, error } = await supabaseClient
      .from("quiz_attempts")
      .select("score, quiz_name")
      .eq("user_id", user.id);
    
    if (!error && data && data.length > 0) {
      const filteredData = data.filter(a => {
        const name = a.quiz_name || '';
        return name.startsWith(heroPos + '_') && name.endsWith('_' + category);
      });
      
      if (filteredData.length > 0) {
        const scores = filteredData.map(a => a.score);
        bestScore = Math.max(...scores);
        avgScore = Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length);
      }
    }
  }
  
  if (bestElementId === avgElementId) {
    // Single element mode: write compact html (used for position buttons)
    const el = document.getElementById(bestElementId);
    if (el) {
      el.innerHTML = `<div>Best: <span class="stat-best">${bestScore}%</span></div><div>Avg: <span class="stat-avg">${avgScore}%</span></div>`;
    }
  } else {
    document.getElementById(bestElementId).textContent = `${bestScore}%`;
    document.getElementById(avgElementId).textContent = `${avgScore}%`;
  }
}

// Load overall stats for entire quiz category (all positions combined)
async function loadOverallCategoryStats(category, bestElementId, avgElementId) {
  if (!supabaseClient) return;
  const { data: { user } } = await supabaseClient.auth.getUser();
  
  let bestScore = 0;
  let avgScore = 0;
  
  if (user) {
    const { data, error } = await supabaseClient
      .from("quiz_attempts")
      .select("score, quiz_name")
      .eq("user_id", user.id);
    
    if (!error && data && data.length > 0) {
      // Filter by category
      let filteredData = [];
      
      if (category === 'rfi') {
        // Only RFI quizzes: "UTG_RFI", "HJ_RFI", etc
        filteredData = data.filter(a => {
          const name = a.quiz_name || '';
          return name.endsWith('_rfi') || name.match(/^[A-Z]+_RFI$/i);
        });
      } else if (category === 'rfi-defense') {
        // All defense quizzes: "UTG_HJ_defense", "CO_BTN_defense"
        filteredData = data.filter(a => {
          const name = a.quiz_name || '';
          return name.includes('_defense');
        });
      } else if (category === 'rfi-5bet') {
        // All 5bet quizzes
        filteredData = data.filter(a => {
          const name = a.quiz_name || '';
          return name.includes('_fivebet');
        });
      } else if (category === 'vsopen-3bet') {
        filteredData = data.filter(a => {
          const name = a.quiz_name || '';
          return name.includes('_vsopen-3bet');
        });
      } else if (category === 'vsopen-4bet') {
        filteredData = data.filter(a => {
          const name = a.quiz_name || '';
          return name.includes('_vsopen4bet') || name.includes('_vsopen-4bet');
        });
      }
      
      if (filteredData.length > 0) {
        const scores = filteredData.map(a => a.score);
        bestScore = Math.max(...scores);
        avgScore = Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length);
      }
    }
  }
  
  document.getElementById(bestElementId).textContent = `${bestScore}%`;
  document.getElementById(avgElementId).textContent = `${avgScore}%`;
}

// Load all RFI position stats
async function loadRFIStats() {
  console.log("Loading RFI stats...");
  
  // Overall RFI category stats
  await loadOverallCategoryStats('rfi', 'rfi-overall-best', 'rfi-overall-avg');
  
  // Individual position RFI quiz stats — names are like "UTG_RFI_rfi"
  const positions = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
  for (const pos of positions) {
    await loadQuizButtonStats(`${pos}_RFI_rfi`, `stats-${pos}-rfi`);
  }
}

// Load all vs Open position stats  
async function loadVsOpenStats() {
  console.log("Loading vs Open stats...");
  
  // Overall vs Open category stats (3-bet step) across ALL positions
  await loadOverallCategoryStats('vsopen-3bet', 'vsopen-overall-best', 'vsopen-overall-avg');
  
  // For each position button, show the best/avg across ALL that position's matchups
  const positions = ['HJ', 'CO', 'BTN', 'SB', 'BB'];
  for (const pos of positions) {
    await loadOverallPositionStats(pos, 'vsopen-3bet', `stats-${pos}-vsopen`, `stats-${pos}-vsopen`);
  }
}

// Load opponent screen stats (RFI defense quizzes)
async function loadOpponentScreenStats() {
  console.log("Loading opponent screen stats...");
  
  const heroPos = document.getElementById('opp-hero-label').textContent;
  
  // Overall defense stats for this SPECIFIC hero position
  await loadOverallPositionStats(heroPos, 'defense', 'opponent-overall-best', 'opponent-overall-avg');
  
  // Individual matchup stats
  const opponents = OPPONENTS[heroPos] || [];
  for (const opp of opponents) {
    const quizName = `${heroPos}_${opp}_defense`;
    await loadQuizButtonStats(quizName, `stats-${heroPos}-${opp}-defense`);
  }
}

// Load opener screen stats (vs Open quizzes)
async function loadOpenerScreenStats() {
  console.log("Loading opener screen stats...");
  
  const heroPos = document.getElementById('opener-hero-label').textContent;
  
  // Overall vs open stats for this SPECIFIC hero position
  await loadOverallPositionStats(heroPos, 'vsopen-3bet', 'opener-overall-best', 'opener-overall-avg');
  
  // Individual matchup stats  
  const openers = {
    HJ: ['UTG'],
    CO: ['UTG','HJ'],
    BTN: ['UTG','HJ','CO'],
    SB: ['UTG','HJ','CO','BTN'],
    BB: ['UTG','HJ','CO','BTN','SB']
  };
  
  const matchups = openers[heroPos] || [];
  for (const opener of matchups) {
    const quizName = `${heroPos}_${opener}_vsopen-3bet`;
    await loadQuizButtonStats(quizName, `stats-${heroPos}-${opener}-vsopen`);
  }
}

// Load multi-way position stats
async function loadMWStats() {
  if (!supabaseClient) return;
  const positions = ['CO','BTN','SB','BB'];
  for (const pos of positions) {
    await loadOverallPositionStats(pos, 'multiway', `stats-${pos}-mw`, `stats-${pos}-mw`);
  }
}

// ══════════════════════════════════════════════════════
// MAIN QUIZ CODE STARTS HERE
// ══════════════════════════════════════════════════════

const RANKS = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const ALL_HANDS = [];
for (let i=0;i<13;i++) for (let j=0;j<13;j++) {
  if (i===j) ALL_HANDS.push(RANKS[i]+RANKS[j]);
  else if (i<j) ALL_HANDS.push(RANKS[i]+RANKS[j]+'s');
  else ALL_HANDS.push(RANKS[j]+RANKS[i]+'o');
}

// ═══════════════════════════════════════
//  RANGES
// ═══════════════════════════════════════
const RFI = {
  UTG: new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K6s','K7s','K8s','K9s','KTs','KJs','KQs','QTs','QJs','ATo','AJo','AQo','AKo','KJo','KQo','JTs','T9s','65s']),
  HJ:  new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q9s','QTs','QJs','A9o','ATo','AJo','AQo','AKo','KTo','KJo','KQo','QTo','QJo','J9s','JTs','T8s','T9s','65s']),
  CO:  new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q6s','Q7s','Q8s','Q9s','QTs','QJs','A8o','A9o','ATo','AJo','AQo','AKo','KTo','KJo','KQo','QTo','QJo','JTo','J8s','J9s','JTs','T8s','T9s','98s','87s','76s','65s','54s','A5o']),
  BTN: new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q2s','Q3s','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo','K7o','K8o','K9o','KTo','KJo','KQo','Q9o','QTo','QJo','J9o','JTo','T9o','J4s','J5s','J6s','J7s','J8s','J9s','JTs','T6s','T7s','T8s','T9s','96s','97s','98s','86s','87s','75s','76s','65s','54s']),
  SB:  new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q2s','Q3s','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo','K7o','K8o','K9o','KTo','KJo','KQo','Q9o','QTo','QJo','J9o','JTo','T9o','J4s','J5s','J6s','J7s','J8s','J9s','JTs','T6s','T7s','T8s','T9s','96s','97s','98s','85s','86s','87s','75s','76s','64s','65s','53s','54s']),
  BB:  new Set([]) // BB has no RFI (always faces a raise or posts)
};

// 3-bet ranges: positions that only 3bet (no call) use empty call set
// Positions that have both use separate 4bet/call sets
const DEFENSE = {
  // HJ facing opens (only 3bet range, no calling range specified)
  'HJ_UTG': { '4bet': new Set(['AA','KK','QQ','JJ','TT','99','ATs','AJs','AQs','AKs','KTs','KJs','KQs','AQo','AKo','65s','A4s','A5s']), 'call': new Set([]) },
  // CO facing opens
  'CO_UTG': { '4bet': new Set(['AA','KK','QQ','JJ','TT','99','88','ATs','AJs','AQs','AKs','KTs','KJs','KQs','AQo','AKo','65s','A4s','A5s']), 'call': new Set([]) },
  'CO_HJ': { '4bet': new Set(['AA','KK','QQ','JJ','TT','99','88','ATs','AJs','AQs','AKs','KTs','KJs','KQs','AQo','AKo','KQo','QJs','65s','A3s','A4s','A5s']), 'call': new Set([]) },
  // BTN facing opens
  'BTN_UTG': { '4bet': new Set(['AA','KK','QQ','AKs','AKo','KQo','QJs','JTs','T9s','K9s','KTs','A8s','A3s','A4s','A5s','65s']), 'call': new Set(['JJ','TT','99','88','77','AQs','AJs','ATs','A9s','QTs','AQo']) },
  'BTN_HJ': { '4bet': new Set(['AA','KK','QQ','AKs','AKo','KQo','QJs','JTs','T9s','K9s','KTs','A3s','A4s','A5s','A6s','A7s','A8s','65s','76s','AJo']), 'call': new Set(['JJ','TT','99','88','77','66','AQs','AJs','ATs','A9s','QTs','AQo']) },
  'BTN_CO': { '4bet': new Set(['AA','KK','QQ','AKs','AKo','KQo','QJs','J9s','JTs','T9s','K8s','K9s','A2s','A3s','A5s','A6s','A7s','65s','76s','AJo','ATo','Q9s']), 'call': new Set(['JJ','TT','99','88','77','66','55','AQs','AJs','ATs','A9s','A8s','QTs','AQo','A4s']) },
  // SB facing opens (only 3bet range)
  'SB_UTG': { '4bet': new Set(['AA','KK','QQ','JJ','TT','ATs','AJs','AQs','AKs','KTs','KJs','KQs','QJs','AKo','A5s','65s']), 'call': new Set([]) },
  'SB_HJ': { '4bet': new Set(['AA','KK','QQ','JJ','TT','99','ATs','AJs','AQs','AKs','KTs','KJs','KQs','QJs','AKo','JTs','A4s','A5s','65s']), 'call': new Set([]) },
  'SB_CO': { '4bet': new Set(['AA','KK','QQ','JJ','TT','99','88','ATs','AJs','AQs','AKs','KTs','KJs','KQs','QTs','QJs','AQo','AKo','JTs','A4s','A5s','65s']), 'call': new Set([]) },
  'SB_BTN': { '4bet': new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K9s','KTs','KJs','KQs','QTs','QJs','AJo','AQo','AKo','JTs','A4s','A5s','65s','KQo','T9s']), 'call': new Set([]) },
  // BB facing opens
  'BB_UTG': { '4bet': new Set(['AA','KK','QQ','QJs','K7s','A5s','A4s','A3s','65s','AKs','AKo']), 'call': new Set(['JJ','TT','99','88','77','66','55','44','33','22','AQs','AJs','ATs','A9s','A8s','A7s','A6s','KQs','KJs','KTs','K9s','K8s','QTs','Q9s','JTs','J9s','T9s','T8s','98s','97s','87s','86s','76s','75s','64s','54s','53s','AJo','AQo','KQo','A2s']) },
  'BB_HJ': { '4bet': new Set(['AA','KK','QQ','QTs','QJs','KJs','KQs','JTs','T9s','K7s','A5s','A4s','A3s','65s','AKs','AKo']), 'call': new Set(['JJ','TT','99','88','77','66','55','44','33','22','AQs','AJs','ATs','A9s','A8s','A7s','A6s','KTs','K9s','K8s','Q9s','J9s','J8s','T8s','T7s','98s','97s','87s','86s','76s','75s','64s','54s','53s','ATo','AJo','AQo','KJo','KQo','K5s','K6s','43s','QJo','A2s']) },
  'BB_CO': { '4bet': new Set(['AA','KK','QQ','JJ','AQs','Q9s','QTs','QJs','KTs','KJs','KQs','J9s','JTs','T9s','K7s','A5s','A4s','A3s','65s','AKs','AKo','76s']), 'call': new Set(['TT','99','88','77','66','55','44','33','22','AJs','ATs','A9s','A8s','A7s','A6s','K9s','K8s','JTs','J9s','J8s','T8s','T7s','98s','97s','96s','87s','86s','85s','75s','64s','54s','53s','ATo','AJo','AQo','KTo','KJo','KQo','K2s','K3s','K4s','K5s','K6s','QTo','QJo','JTo','Q8s','Q6s','Q7s','A2s']) },
  'BB_BTN': { '4bet': new Set(['AA','KK','QQ','JJ','TT','KQs','QJs','J8s','J9s','JTs','T7s','T8s','T9s','A5s','65s','AKs','AQo','AKo','76s','54s','98s','A5o']), 'call': new Set(['99','88','77','66','55','44','33','22','AQs','AJs','ATs','A9s','A8s','A7s','A6s','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s','J7s','J6s','J5s','J4s','T6s','97s','96s','87s','86s','85s','75s','74s','64s','63s','53s','43s','A6o','A7o','A8o','A9o','ATo','AJo','K9o','KTo','KJo','KQo','QTo','QJo','JTo','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s','Q3s','Q2s','A2s','A3s','A4s','T9o']) },
  'BB_SB': { '4bet': new Set(['AA','KK','QQ','JJ','TT','AQs','KQs','J8s','J9s','JTs','T9s','A5s','65s','AKs','AQo','AKo','76s','54s','98s','A3o','A4o','A5o','A6o','K8o','K9o','J9o','T8o','J5s','J4s','J3s','J2s','T5s','T4s']), 'call': new Set(['99','88','77','66','55','44','33','22','AJs','ATs','A9s','A8s','A7s','A6s','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s','J9s','J8s','J7s','J6s','T8s','T7s','T6s','97s','96s','95s','87s','86s','85s','75s','74s','64s','63s','53s','52s','43s','AJo','ATo','A9o','A8o','A7o','A6o','KQo','KJo','KTo','K9o','QJo','QTo','Q9o','JTo','QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s','Q3s','Q2s','A4s','A3s','A2s','T9o','98o']) },
  // UTG 3bet defense (hero is UTG, facing 3bet)
  'UTG_HJ': { '4bet': new Set(['AA','KK','AKs','AKo','AJs','KQs','A5s']), 'call': new Set(['QQ','JJ','99','88','77','66','AQs','JTs','65s']) },
  'UTG_CO': { '4bet': new Set(['AA','KK','AKs','AKo','AJs','KQs','A5s']), 'call': new Set(['QQ','JJ','99','88','77','66','AQs','JTs','65s','KJs','ATs']) },
  'UTG_BTN': { '4bet': new Set(['AA','KK','AKs','AKo','AJs','A5s']), 'call': new Set(['QQ','JJ','TT','99','88','77','66','55','AQs','JTs','65s','KJs','KQs','ATs','QJs']) },
  'UTG_SB': { '4bet': new Set(['AA','KK','AKo','A4s']), 'call': new Set(['QQ','JJ','TT','99','88','77','66','AQs','JTs','65s','KJs','KQs','ATs','QJs','AKs','AJs','A5s']) },
  'UTG_BB': { '4bet': new Set(['AA','KK','AKo','A4s']), 'call': new Set(['QQ','JJ','TT','99','88','77','66','AQs','JTs','65s','KJs','KQs','ATs','QJs','AKs','AJs','A5s','A9s']) },
  // HJ 3bet defense
  'HJ_CO': { '4bet': new Set(['AA','KK','QQ','KJs','KQs','AKs','AKo','AJs','A5s']), 'call': new Set(['AQs','ATs','JTs','JJ','TT','99','88','55','65s']) },
  'HJ_BTN': { '4bet': new Set(['AA','KK','QQ','KJs','KTs','AKs','AKo','A5s']), 'call': new Set(['AQs','AJs','ATs','A9s','JTs','JJ','TT','99','88','77','66','55','65s','KQs','T9s']) },
  'HJ_SB': { '4bet': new Set(['AA','KK','KJs','KTs','A4s']), 'call': new Set(['AQs','AJs','ATs','JTs','QQ','JJ','TT','99','88','77','55','65s','KQs','T9s','AKs','AKo','A5s']) },
  'HJ_BB': { '4bet': new Set(['AA','KK','KTs','A3s']), 'call': new Set(['AQs','AJs','ATs','A9s','JTs','QQ','JJ','TT','99','88','77','66','55','65s','KQs','T9s','AKs','AKo','A5s','A4s','QTs','KTs']) },
  // CO 3bet defense
  'CO_BTN': { '4bet': new Set(['AA','KK','QQ','AKs','AQo','AKo','KTs','KJs','ATs','JTs','A4s']), 'call': new Set(['JJ','TT','99','88','77','66','55','44','AJs','AQs','A9s','A5s','KQs','T9s','65s','QJs','QTs']) },
  'CO_SB': { '4bet': new Set(['AA','KK','AKo','K9s','A4s']), 'call': new Set(['JJ','TT','99','88','77','55','ATs','AJs','AQs','AKs','A5s','KTs','KJs','KQs','T9s','65s','QTs','QJs','J9s','JTs','AQo']) },
  'CO_BB': { '4bet': new Set(['AA','KK','AKo','K9s','A7s','A2s']), 'call': new Set(['JJ','TT','99','88','77','66','55','A8s','A9s','ATs','AJs','AQs','AKs','A5s','A4s','A3s','KTs','KJs','KQs','T9s','65s','QTs','QJs','JTs','AQo','76s']) },
  // BTN 3bet defense
  'BTN_SB': { '4bet': new Set(['AA','KK','QQ','AJs','A7s','A3s','K9s','AKo','AJo']), 'call': new Set(['JJ','TT','99','88','77','66','55','44','A8s','A9s','ATs','AJs','AQs','AKs','A4s','A5s','KTs','KJs','KQs','QTs','QJs','J9s','JTs','T8s','T9s','98s','87s','76s','65s','54s','KQo','AQo']) },
  'BTN_BB': { '4bet': new Set(['AA','KK','QQ','AJs','A2s','K7s','K6s','AKo','AJo']), 'call': new Set(['JJ','TT','99','88','77','66','55','44','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K8s','K9s','KTs','KJs','KQs','Q9s','QTs','QJs','J8s','J9s','JTs','T8s','T9s','98s','87s','76s','65s','54s','KQo','AQo']) },
  // SB 3bet defense
  'SB_BB': { '4bet': new Set(['AA','KK','QQ','JJ','AKo','AQo','AJo','ATo','AKs','A6s','A3s','A2s','K5s']), 'call': new Set(['TT','99','88','77','66','55','44','AQs','AJs','ATs','A9s','A8s','A7s','A5s','A4s','K8s','K9s','KTs','KJs','KQs','Q9s','QTs','QJs','J8s','J9s','JTs','T8s','T9s','76s','65s','54s']) },
};

// 5-bet shove defense: hero 4-bet, villain shoves — what do we call with?
const FIVEBET_CALL = {
  'UTG_HJ': new Set(['AA','KK','AKs']),
  'UTG_CO': new Set(['AA','KK','AKs']),
  'UTG_BTN': new Set(['AA','KK','AKs']),
  'UTG_SB': new Set(['AA','KK']),
  'UTG_BB': new Set(['AA','KK']),
  'HJ_CO': new Set(['AA','KK','AKs','AKo']),
  'HJ_BTN': new Set(['AA','KK','AKs','AKo']),
  'HJ_SB': new Set(['AA','KK']),
  'HJ_BB': new Set(['AA','KK']),
  'CO_BTN': new Set(['AA','KK','QQ','AKs','AKo']),
  'CO_SB': new Set(['AA','KK','AKo']),
  'CO_BB': new Set(['AA','KK','AKo']),
  'BTN_SB': new Set(['AA','KK','QQ','AKo']),
  'BTN_BB': new Set(['AA','KK','QQ','AKo']),
  'SB_BB': new Set(['AA','KK','QQ','JJ','AKo','AKs']),
};

// vs Open 5-bet shove ranges: hero 3-bets, villain 4-bets, hero shoves
const VSOPEN_5BET_SHOVE = {
  'HJ_UTG': new Set(['KK','AKo']),
  'CO_UTG': new Set(['KK','AKo']),
  'CO_HJ':  new Set(['KK','AKo']),
  'BTN_UTG': new Set(['KK','AKo']),
  'BTN_HJ': new Set(['KK','AKo']),
  'BTN_CO': new Set(['KK','AKo']),
  'SB_UTG': new Set(['AA','KK','AKo']),
  'SB_HJ':  new Set(['AA','KK','AKo']),
  'SB_CO':  new Set(['AA','KK','AKo','A5s']),
  'SB_BTN': new Set(['AA','KK','QQ','AKo','AKs','A5s']),
  'BB_UTG': new Set(['AA','A5s']),
  'BB_HJ':  new Set(['AA','KK','AKo']),
  'BB_CO':  new Set(['AA','KK','AKo','JJ']),
  'BB_BTN': new Set(['KK','QQ','JJ','AKo','A5s']),
  'BB_SB':  new Set(['KK','QQ','JJ','AKo','A5s','KQs']),
};

// vs Open 5-bet call ranges: hero 3-bets, villain 4-bets, hero calls
const VSOPEN_5BET_CALL = {
  'HJ_UTG': new Set(['AA','ATs','AJs','AQs','AKs','QQ','JJ','99','65s']),
  'CO_UTG': new Set(['AA','ATs','AJs','AQs','AKs','QQ','JJ','99','65s','KQs']),
  'CO_HJ':  new Set(['AA','ATs','AJs','AQs','AKs','QQ','JJ','99','65s','KQs','A5s']),
  'BTN_UTG': new Set(['AA','AKs','QQ','T9s','65s','A5s']),
  'BTN_HJ': new Set(['AA','AKs','QQ','T9s','65s','A5s','76s']),
  'BTN_CO': new Set(['AA','AKs','QQ','T9s','65s','A5s','76s','J9s']),
  'SB_UTG': new Set(['AKs','AJs','QQ','65s']),
  'SB_HJ':  new Set(['AJs','AQs','AKs','QQ','JJ','99','65s']),
  'SB_CO':  new Set(['AJs','AQs','AKs','QQ','JJ','99','88','65s','JTs']),
  'SB_BTN': new Set(['ATs','AJs','AQs','AKs','JJ','TT','99','88','65s','JTs','66','T9s','QTs','KQs','AQo']),
  'BB_UTG': new Set(['AKs','KK','QQ','65s']),
  'BB_HJ':  new Set(['AKs','QQ','65s','T9s']),
  'BB_CO':  new Set(['AKs','QQ','65s','T9s','JTs','AQs']),
  'BB_BTN': new Set(['AKs','65s','T9s','JTs','76s','TT','AQo','KQs','AQs','AA']),
  'BB_SB':  new Set(['AA','AKs','AQs','65s','T9s','JTs','76s','TT','AQo','KQs','98s','54s']),
};

// ═══════════════════════════════════════
//  MULTI-WAY RANGES
//  Key format: "HERO_POS1+POS2"  (sorted for consistency)
//  Each entry has: squeeze (raise), call
// ═══════════════════════════════════════
const MW_SQUEEZE = {
  // BB squeeze/call ranges
  'BB_UTG+BTN': new Set(['QQ','KK','AA','AJs','AQs','AKs','KJs','QJs','A5s','65s','AQo','AKo','KQo']),
  'BB_HJ+BTN':  new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','KTs','QTs','A5s','65s','AQo','AKo','KQo','JTs']),
  'BB_CO+BTN':  new Set(['TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','KTs','QTs','65s','AJo','AQo','AKo','KQo','J9s','JTs','T9s']),
  // SB squeeze/call ranges
  'SB_UTG+BTN': new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','KJs','QJs','AQo','AKo','KQo','65s','A5s']),
  'SB_HJ+BTN':  new Set(['TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','KTs','QJs','AQo','AKo','KQo','65s','A5s','JTs']),
  'SB_CO+BTN':  new Set(['99','TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','KTs','QTs','AJo','AQo','AKo','KQo','A5s','JTs']),
  // CO squeeze range (raise+raise 4-bet)
  'CO_UTG+HJ':  new Set(['JJ','QQ','KK','AA','AQs','AKs','A5s','AKo']),
  // BTN squeeze ranges (raise+raise 4-bet)
  'BTN_UTG+HJ': new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','AKo']),
  'BTN_UTG+CO': new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','KQs','AKo']),
  'BTN_HJ+CO':  new Set(['TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','KQs','AKo']),
  // SB 4-bet ranges (raise+raise)
  'SB_UTG+HJ':  new Set(['QQ','KK','AA','AQs','AKs','A5s','AKo']),
  'SB_UTG+CO':  new Set(['JJ','QQ','KK','AA','AQs','AKs','AKo']),
  'SB_UTG+BTN': new Set(['QQ','KK','AA','AQs','AKs','AKo']),
  'SB_HJ+CO':   new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','KQs','AKo']),
  'SB_HJ+BTN':  new Set(['QQ','KK','AA','AJs','AQs','AKs','KQs','A5s','AKo']),
  'SB_CO+BTN':  new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','KJs','AQo','AKo']),
  // BB 4-bet ranges (raise+raise)
  'BB_UTG+HJ':  new Set(['JJ','QQ','KK','AA','AQs','AKs','AKo']),
  'BB_UTG+CO':  new Set(['JJ','QQ','KK','AA','AQs','AKs','AKo']),
  'BB_UTG+BTN': new Set(['JJ','QQ','KK','AA','AQs','AKs','AKo']),
  'BB_UTG+SB':  new Set(['QQ','KK','AA','AQs','AKs','AKo']),
  'BB_HJ+CO':   new Set(['TT','JJ','QQ','KK','AA','AJs','AQs','AKs','KQs','AKo']),
  'BB_HJ+BTN':  new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','KQs','AKo']),
  'BB_HJ+SB':   new Set(['QQ','KK','AA','AQs','AKs','A5s','KQs','AKo']),
  'BB_CO+BTN':  new Set(['TT','JJ','QQ','KK','AA','AJs','AQs','AKs','KJs','AQo','AKo']),
  'BB_CO+SB':   new Set(['JJ','QQ','KK','AA','AJs','AQs','AKs','KJs','AKo']),
  'BB_BTN+SB':  new Set(['TT','JJ','QQ','KK','AA','ATs','AJs','AQs','AKs','KJs','AQo','AKo']),
};

const MW_CALL = {
  'BB_UTG+BTN': new Set(['22','33','44','55','66','77','88','99','TT','JJ','A2s','A3s','A4s','A6s','A7s','A8s','A9s','ATs','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','Q3s','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','J7s','J8s','J9s','JTs','T7s','T8s','T9s','96s','97s','98s','85s','86s','87s','74s','75s','76s','63s','64s','52s','53s','54s','42s','32s','ATo','AJo','KTo','KJo','QTo','QJo','JTo','T9o','65o','54o']),
  'BB_HJ+BTN':  new Set(['22','33','44','55','66','77','88','99','TT','A2s','A3s','A4s','A6s','A7s','A8s','A9s','ATs','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','Q2s','Q3s','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','J7s','J8s','J9s','T7s','T8s','T9s','96s','97s','98s','85s','86s','87s','74s','75s','76s','63s','64s','52s','53s','54s','42s','32s','ATo','AJo','KTo','KJo','QTo','QJo','JTo','T9o','65o','54o']),
  'BB_CO+BTN':  new Set(['22','33','44','55','66','77','88','99','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','Q5s','Q6s','Q7s','Q8s','Q9s','J7s','J8s','T7s','T8s','96s','97s','98s','85s','86s','87s','74s','75s','76s','63s','64s','52s','53s','54s','42s','ATo','KTo','KJo','QTo','QJo','JTo','T9o']),
  'SB_UTG+BTN': new Set(['22','33','44','55','66','77','88','99','TT','ATs','A3s','A4s','KTs','QTs','JTs','T9s','54s']),
  'SB_HJ+BTN':  new Set(['22','33','44','55','66','77','88','99','A8s','A9s','A3s','A4s','T9s','54s','QTs']),
  'SB_CO+BTN':  new Set(['22','33','44','55','66','77','88','A8s','A9s','A4s','T9s','65s','J9s']),
  // CO/BTN/SB raise+raise scenarios have no calling range (pure 4-bet-or-fold)
  'CO_UTG+HJ':  new Set([]),
  'BTN_UTG+HJ': new Set([]),
  'BTN_UTG+CO': new Set([]),
  'BTN_HJ+CO':  new Set([]),
  'SB_UTG+HJ':  new Set([]),
  'SB_UTG+CO':  new Set([]),
  'SB_UTG+BTN': new Set([]),
  'SB_HJ+CO':   new Set([]),
  'SB_HJ+BTN':  new Set([]),
  'SB_CO+BTN':  new Set([]),
  'BB_UTG+HJ':  new Set([]),
  'BB_UTG+CO':  new Set([]),
  'BB_UTG+BTN': new Set([]),
  'BB_UTG+SB':  new Set([]),
  'BB_HJ+CO':   new Set([]),
  'BB_HJ+BTN':  new Set([]),
  'BB_HJ+SB':   new Set([]),
  'BB_CO+BTN':  new Set([]),
  'BB_CO+SB':   new Set([]),
  'BB_BTN+SB':  new Set([]),
};

// Multi-way scenario descriptions
const MW_SCENARIOS = {
  BB: [
    { key: 'BB_UTG+BTN', label: 'UTG + BTN', desc: 'UTG opens, BTN calls', type: 'squeeze' },
    { key: 'BB_HJ+BTN',  label: 'HJ + BTN',  desc: 'HJ opens, BTN calls',  type: 'squeeze' },
    { key: 'BB_CO+BTN',  label: 'CO + BTN',  desc: 'CO opens, BTN calls',  type: 'squeeze' },
    { key: 'BB_UTG+HJ',  label: 'UTG + HJ',  desc: 'UTG + HJ both raise',  type: 'rr4bet' },
    { key: 'BB_UTG+CO',  label: 'UTG + CO',  desc: 'UTG + CO both raise',  type: 'rr4bet' },
    { key: 'BB_UTG+BTN', label: 'UTG + BTN', desc: 'UTG + BTN both raise', type: 'rr4bet' },
    { key: 'BB_UTG+SB',  label: 'UTG + SB',  desc: 'UTG + SB both raise',  type: 'rr4bet' },
    { key: 'BB_HJ+CO',   label: 'HJ + CO',   desc: 'HJ + CO both raise',   type: 'rr4bet' },
    { key: 'BB_HJ+BTN',  label: 'HJ + BTN',  desc: 'HJ + BTN both raise',  type: 'rr4bet' },
    { key: 'BB_HJ+SB',   label: 'HJ + SB',   desc: 'HJ + SB both raise',   type: 'rr4bet' },
    { key: 'BB_CO+BTN',  label: 'CO + BTN',  desc: 'CO + BTN both raise',  type: 'rr4bet' },
    { key: 'BB_CO+SB',   label: 'CO + SB',   desc: 'CO + SB both raise',   type: 'rr4bet' },
    { key: 'BB_BTN+SB',  label: 'BTN + SB',  desc: 'BTN + SB both raise',  type: 'rr4bet' },
  ],
  SB: [
    { key: 'SB_UTG+BTN', label: 'UTG + BTN', desc: 'UTG opens, BTN calls', type: 'squeeze' },
    { key: 'SB_HJ+BTN',  label: 'HJ + BTN',  desc: 'HJ opens, BTN calls',  type: 'squeeze' },
    { key: 'SB_CO+BTN',  label: 'CO + BTN',  desc: 'CO opens, BTN calls',  type: 'squeeze' },
    { key: 'SB_UTG+HJ',  label: 'UTG + HJ',  desc: 'UTG + HJ both raise',  type: 'rr4bet' },
    { key: 'SB_UTG+CO',  label: 'UTG + CO',  desc: 'UTG + CO both raise',  type: 'rr4bet' },
    { key: 'SB_UTG+BTN', label: 'UTG + BTN', desc: 'UTG + BTN both raise', type: 'rr4bet' },
    { key: 'SB_HJ+CO',   label: 'HJ + CO',   desc: 'HJ + CO both raise',   type: 'rr4bet' },
    { key: 'SB_HJ+BTN',  label: 'HJ + BTN',  desc: 'HJ + BTN both raise',  type: 'rr4bet' },
    { key: 'SB_CO+BTN',  label: 'CO + BTN',  desc: 'CO + BTN both raise',  type: 'rr4bet' },
  ],
  CO: [
    { key: 'CO_UTG+HJ',  label: 'UTG + HJ',  desc: 'UTG + HJ both raise',  type: 'rr4bet' },
  ],
  BTN: [
    { key: 'BTN_UTG+HJ', label: 'UTG + HJ',  desc: 'UTG + HJ both raise',  type: 'rr4bet' },
    { key: 'BTN_UTG+CO', label: 'UTG + CO',  desc: 'UTG + CO both raise',  type: 'rr4bet' },
    { key: 'BTN_HJ+CO',  label: 'HJ + CO',   desc: 'HJ + CO both raise',   type: 'rr4bet' },
  ],
};

// Positions that OPEN and can face a 3bet: only these have defense scenarios
const OPPONENTS = {
  UTG: ['HJ','CO','BTN','SB','BB'],
  HJ:  ['CO','BTN','SB','BB'],
  CO:  ['BTN','SB','BB'],
  BTN: ['SB','BB'],
  SB:  ['BB'],
  BB:  [] // BB never RFI in 6max
};

// ═══════════════════════════════════════
//  STATE
// ═══════════════════════════════════════
let heroPos = null, oppPos = null, scenarioKey = null;
let quizPath = null;  // 'rfi' | 'vsopen' | 'multiway'
let quizPhase = 'rfi'; // 'rfi' | 'defense' | 'fivebet' | 'vsopen-3bet' | 'vsopen-4bet' | 'multiway'
let currentMode = '4bet';
let selRfi = new Set(), sel4bet = new Set(), selCall = new Set(), selFiveBet = new Set();
let sel3bet = new Set(), selVs4bet = new Set(), sel5betShove = new Set(); // for vs Open path
let selMW = new Set(), selMWCall = new Set(); // for multi-way path
let stepChecked = false;
let mwScenario = null; // current MW scenario object

// ═══════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════
function showScreen(id) { 
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); 
  document.getElementById(id).classList.add('active'); 
  window.scrollTo(0,0); 
  
  // Load stats when showing position picker screens
  if (id === 'screen-rfi-position') {
    loadRFIStats();
  } else if (id === 'screen-vsopen-position') {
    loadVsOpenStats();
  } else if (id === 'screen-opponent') {
    loadOpponentScreenStats();
  } else if (id === 'screen-opener') {
    loadOpenerScreenStats();
  } else if (id === 'screen-multiway-position') {
    loadMWStats();
  }
}

// RFI path
function selectHero(pos) { quizPath = 'rfi'; heroPos = pos; startRfiQuiz(pos); }
function goBackToRfiPosition() { showScreen('screen-rfi-position'); }

// vs Open path
function selectVsOpenHero(pos) { quizPath = 'vsopen'; heroPos = pos; buildOpenerRow(pos); showScreen('screen-opener'); }
function goBackToVsOpenPosition() { showScreen('screen-vsopen-position'); }

// Multi-way path
function selectMWHero(pos) {
  heroPos = pos;
  quizPath = 'multiway';
  document.getElementById('mw-hero-label').textContent = pos;
  if (pos === 'SB' || pos === 'BB') {
    document.getElementById('mw-type-hero-label').textContent = pos;
    showScreen('screen-multiway-type');
  } else {
    buildMWMatchupRow(pos, null);
    showScreen('screen-multiway-matchup');
  }
}

function selectMWType(type) {
  buildMWMatchupRow(heroPos, type);
  showScreen('screen-multiway-matchup');
}

function mwMatchupBack() {
  if (heroPos === 'SB' || heroPos === 'BB') {
    showScreen('screen-multiway-type');
  } else {
    showScreen('screen-multiway-position');
  }
}

function buildMWMatchupRow(pos, filterType) {
  const row = document.getElementById('mw-matchup-row');
  row.innerHTML = '';
  const scenarios = (MW_SCENARIOS[pos] || []).filter(sc => filterType === null || sc.type === filterType);
  scenarios.forEach(sc => {
    const btn = document.createElement('button');
    btn.className = 'opp-btn';
    const statsId = `stats-mw-${sc.key}`;
    btn.innerHTML = `
      <div class="opp-btn-pos" style="font-size:1.4rem">${sc.label}</div>
      <div class="opp-btn-name">${sc.desc}</div>
      <div class="opp-btn-stats" id="${statsId}"></div>
    `;
    btn.onclick = () => startMWQuiz(sc);
    row.appendChild(btn);
  });
}

function quizGoBack() {
  clearExtraButtons();
  if (quizPath === 'rfi') {
    if (quizPhase === 'rfi') showScreen('screen-rfi-position');
    else { buildOpponentRow(heroPos); showScreen('screen-opponent'); }
  } else if (quizPath === 'vsopen') {
    buildOpenerRow(heroPos); showScreen('screen-opener');
  } else if (quizPath === 'multiway') {
    buildMWMatchupRow(heroPos); showScreen('screen-multiway-matchup');
  }
}
function fullName(p) { return {UTG:'Under the Gun',HJ:'Hijack',CO:'Cutoff',BTN:'Button',SB:'Small Blind',BB:'Big Blind'}[p]||p; }

function buildOpponentRow(pos) {
  const row = document.getElementById('opponent-row');
  row.innerHTML = '';
  document.getElementById('opp-hero-label').textContent = pos;
  (OPPONENTS[pos]||[]).forEach(opp => {
    const btn = document.createElement('button');
    btn.className = 'opp-btn';
    const statsId = `stats-${pos}-${opp}-defense`;
    btn.innerHTML = `
      <div class="opp-btn-pos">${opp}</div>
      <div class="opp-btn-name">${fullName(opp)}</div>
      <div class="opp-btn-stats" id="${statsId}"></div>
    `;
    btn.onclick = () => startDefenseScenario(pos, opp);
    row.appendChild(btn);
  });
}

function buildOpenerRow(pos) {
  const row = document.getElementById('opener-row');
  row.innerHTML = '';
  document.getElementById('opener-hero-label').textContent = pos;
  // vs Open: HJ faces UTG, CO faces UTG/HJ, BTN faces UTG/HJ/CO, SB faces UTG/HJ/CO/BTN, BB faces all
  const openers = {
    HJ: ['UTG'],
    CO: ['UTG','HJ'],
    BTN: ['UTG','HJ','CO'],
    SB: ['UTG','HJ','CO','BTN'],
    BB: ['UTG','HJ','CO','BTN','SB']
  };
  (openers[pos]||[]).forEach(opener => {
    const btn = document.createElement('button');
    btn.className = 'opp-btn';
    const statsId = `stats-${pos}-${opener}-vsopen`;
    btn.innerHTML = `
      <div class="opp-btn-pos">${opener}</div>
      <div class="opp-btn-name">${fullName(opener)}</div>
      <div class="opp-btn-stats" id="${statsId}"></div>
    `;
    btn.onclick = () => startVsOpenScenario(pos, opener);
    row.appendChild(btn);
  });
}

// ═══════════════════════════════════════
//  PHASE: RFI
// ═══════════════════════════════════════
function startRfiQuiz(pos) {
  heroPos = pos; quizPhase = 'rfi'; selRfi.clear(); stepChecked = false; currentMode = '4bet';
  document.getElementById('quiz-scenario-title').textContent = `${pos} RFI`;
  document.getElementById('step-number-label').textContent = 'RFI Quiz';
  document.getElementById('step-title-main').textContent = `${pos} — Raise First In`;
  document.getElementById('step-instruction-text').textContent = 'Select every hand you would open-raise when folded to.';
  document.getElementById('mode-toggle-wrap').style.display = 'none';
  document.getElementById('legend-raise-label').textContent = 'Open Raise';
  document.getElementById('legend-call-item').style.display = 'none';
  document.getElementById('legend-faded-label').textContent = 'Fold';
  document.getElementById('legend-normal').style.display = 'flex';
  document.getElementById('legend-result').style.display = 'none';
  document.getElementById('legend-fivebet').style.display = 'none';
  document.getElementById('badge1').className = 'step-badge active';
  document.getElementById('badge2').className = 'step-badge';
  document.getElementById('check-btn').textContent = 'Check Answer';
  document.getElementById('check-btn').disabled = false;
  document.getElementById('check-btn').onclick = checkStep;
  document.getElementById('reset-btn').style.display = 'inline-block';
  document.getElementById('score-chip').style.display = 'none';
  document.getElementById('result-panel').classList.remove('show');
  clearExtraButtons();
  buildGrid();
  hideInlineStepStats();
  updateMainActionButtons();
  renderChipStacks(`${pos}_RFI_rfi`);
  showScreen('screen-quiz');
}

// ═══════════════════════════════════════
//  PHASE: vs OPEN (3-bet vs open, then vs 4-bet)
// ═══════════════════════════════════════
function startVsOpenScenario(hero, opener) {
  heroPos = hero; oppPos = opener; scenarioKey = hero+'_'+opener;
  quizPhase = 'vsopen-3bet'; currentMode = '4bet'; // '4bet' mode = 3-bet, 'call' mode = call
  sel3bet.clear(); selCall.clear(); stepChecked = false;
  
  document.getElementById('quiz-scenario-title').textContent = `${hero} vs ${opener} Open`;
  buildGrid(); applyVsOpen3betUI();
  renderChipStacks(`${hero}_${opener}_vsopen-3bet`);
  showScreen('screen-quiz');
}

function applyVsOpen3betUI() {
  const def = DEFENSE[scenarioKey];
  const hasCallRange = def && def['call'].size > 0;
  
  document.querySelectorAll('.hcell').forEach(c => {
    c.className = 'hcell';
    // All hands are selectable for vs open (no RFI constraint)
    if (sel3bet.has(c.dataset.hand)) c.classList.add('sel-4bet');
    else if (selCall.has(c.dataset.hand)) c.classList.add('sel-call');
  });

  document.getElementById('step-number-label').textContent = 'Step 1 of 2';
  document.getElementById('step-title-main').textContent = `${heroPos} Faces an Open from ${oppPos}`;
  document.getElementById('step-instruction-text').textContent = 'Select your 3-bet hands, then switch to Call mode for your calling hands.';

  document.getElementById('mode-toggle-wrap').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('btn-mode-4bet').textContent = '3-Bet';
  document.getElementById('btn-mode-call').textContent = 'Call';
  
  document.getElementById('legend-raise-label').textContent = '3-Bet';
  document.getElementById('legend-call-item').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('legend-faded-label').textContent = 'Fold';
  document.getElementById('legend-result-raise').textContent = 'Correct 3-Bet';
  document.getElementById('legend-result-call-item').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('legend-result-wrong-action-item').style.display = hasCallRange ? 'flex' : 'none';
  if (hasCallRange) {
    document.querySelector('#legend-result-wrong-action-item span').textContent = 'Called (should 3-bet)';
  }
  document.getElementById('legend-result-wrong-4bet-item').style.display = hasCallRange ? 'flex' : 'none';
  if (hasCallRange) {
    document.querySelector('#legend-result-wrong-4bet-item span').textContent = '3-bet (should call)';
  }
  document.getElementById('legend-result-missed-4bet').style.display = 'flex';
  document.querySelector('#legend-result-missed-4bet span').textContent = 'Missed 3-Bet';
  document.getElementById('legend-result-missed-call').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('legend-result-missed-single').style.display = 'none';
  document.getElementById('legend-result-faded').textContent = 'Fold';
  document.getElementById('legend-normal').style.display = 'flex';
  document.getElementById('legend-result').style.display = 'none';
  document.getElementById('legend-fivebet').style.display = 'none';

  document.getElementById('badge1').className = 'step-badge active';
  document.getElementById('badge2').className = 'step-badge';

  document.getElementById('check-btn').textContent = 'Check Answer';
  document.getElementById('check-btn').disabled = false;
  document.getElementById('check-btn').onclick = checkStep;
  document.getElementById('reset-btn').style.display = 'inline-block';
  document.getElementById('score-chip').style.display = 'none';
  document.getElementById('result-panel').classList.remove('show');
  setModeUI(currentMode);
  hideInlineStepStats();
  updateMainActionButtons();
}

// ═══════════════════════════════════════
//  PHASE: 3-BET DEFENSE
// ═══════════════════════════════════════
function startDefenseScenario(hero, opp) {
  heroPos = hero; oppPos = opp; scenarioKey = hero+'_'+opp;
  quizPhase = 'defense'; currentMode = '4bet';
  sel4bet.clear(); selCall.clear(); stepChecked = false;
  document.getElementById('quiz-scenario-title').textContent = `${hero} vs ${opp} 3-Bet`;
  clearExtraButtons(); buildGrid(); applyDefenseUI();
  renderChipStacks(`${hero}_${opp}_defense`);
  showScreen('screen-quiz');
}

function applyDefenseUI() {
  const rfiSet = RFI[heroPos];
  const def = DEFENSE[scenarioKey];
  const hasCallRange = def && def['call'].size > 0;
  document.querySelectorAll('.hcell').forEach(c => {
    const h = c.dataset.hand; c.className = 'hcell';
    if (rfiSet && !rfiSet.has(h)) c.classList.add('out-of-range');
    if (sel4bet.has(h)) c.classList.add('sel-4bet');
    else if (selCall.has(h)) c.classList.add('sel-call');
  });
  document.getElementById('step-number-label').textContent = 'Step 1 of 2';
  document.getElementById('step-title-main').textContent = `${heroPos} Faces a 3-Bet from ${oppPos}`;
  const instrParts = ['Select your 4-bet hands.'];
  if (hasCallRange) instrParts.push('Then switch to Call mode for calling hands.');
  instrParts.push('Faded hands are outside your RFI range.');
  document.getElementById('step-instruction-text').textContent = instrParts.join(' ');
  document.getElementById('mode-toggle-wrap').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('btn-mode-4bet').textContent = '4-Bet';
  document.getElementById('btn-mode-call').textContent = 'Call';
  
  document.getElementById('legend-raise-label').textContent = '4-Bet';
  document.getElementById('legend-call-item').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('legend-faded-label').textContent = 'Not in RFI';
  document.getElementById('legend-result-raise').textContent = 'Correct 4-Bet';
  document.getElementById('legend-result-call-item').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('legend-result-wrong-action-item').style.display = hasCallRange ? 'flex' : 'none';
  if (hasCallRange) {
    document.querySelector('#legend-result-wrong-action-item span').textContent = 'Called (should 4-bet)';
  }
  document.getElementById('legend-result-wrong-4bet-item').style.display = hasCallRange ? 'flex' : 'none';
  if (hasCallRange) {
    document.querySelector('#legend-result-wrong-4bet-item span').textContent = '4-bet (should call)';
  }
  document.getElementById('legend-result-missed-4bet').style.display = 'flex';
  document.querySelector('#legend-result-missed-4bet span').textContent = 'Missed 4-Bet';
  document.getElementById('legend-result-missed-call').style.display = hasCallRange ? 'flex' : 'none';
  document.getElementById('legend-result-missed-single').style.display = 'none';
  document.getElementById('legend-result-faded').textContent = 'Not in RFI';
  document.getElementById('legend-normal').style.display = 'flex';
  document.getElementById('legend-result').style.display = 'none';
  document.getElementById('legend-fivebet').style.display = 'none';
  document.getElementById('badge1').className = 'step-badge active';
  document.getElementById('badge2').className = 'step-badge';
  document.getElementById('check-btn').textContent = 'Check Answer';
  document.getElementById('check-btn').disabled = false;
  document.getElementById('check-btn').onclick = checkStep;
  document.getElementById('reset-btn').style.display = 'inline-block';
  document.getElementById('score-chip').style.display = 'none';
  document.getElementById('result-panel').classList.remove('show');
  setModeUI(currentMode);
  hideInlineStepStats();
  updateMainActionButtons();
}

// ═══════════════════════════════════════
//  PHASE: 5-BET SHOVE
// ═══════════════════════════════════════
function applyFiveBetUI() {
  quizPhase = 'fivebet'; selFiveBet.clear(); stepChecked = false;
  const correct4bet = DEFENSE[scenarioKey]['4bet'];
  document.querySelectorAll('.hcell').forEach(c => {
    c.className = 'hcell';
    if (!correct4bet.has(c.dataset.hand)) c.classList.add('out-of-range');
  });
  document.getElementById('step-number-label').textContent = 'Step 2 of 2';
  document.getElementById('step-title-main').textContent = `${oppPos} 5-Bet Shoves — Call or Fold?`;
  document.getElementById('step-instruction-text').textContent = `You 4-bet, ${oppPos} shoves all-in. Only your 4-bet hands are active. Select every hand you call with.`;
  document.getElementById('mode-toggle-wrap').style.display = 'none';
  document.getElementById('legend-normal').style.display = 'none';
  document.getElementById('legend-result').style.display = 'none';
  document.getElementById('legend-fivebet').style.display = 'flex';
  document.getElementById('badge1').className = 'step-badge done';
  document.getElementById('badge2').className = 'step-badge active';
  document.getElementById('check-btn').textContent = 'Check Answer';
  document.getElementById('check-btn').disabled = false;
  document.getElementById('check-btn').onclick = checkStep;
  document.getElementById('reset-btn').style.display = 'inline-block';
  document.getElementById('score-chip').style.display = 'none';
  document.getElementById('result-panel').classList.remove('show');
  renderChipStacks(`${heroPos}_${oppPos}_fivebet`);
  showInlineStepStats(`${heroPos}_${oppPos}_fivebet`);
  updateMainActionButtons();
}

// ═══════════════════════════════════════
//  GRID
// ═══════════════════════════════════════
//  PHASE: MULTI-WAY
// ═══════════════════════════════════════
function startMWQuiz(sc) {
  mwScenario = sc;
  quizPath = 'multiway';
  quizPhase = 'multiway';
  scenarioKey = sc.key;
  selMW.clear(); selMWCall.clear(); stepChecked = false; currentMode = '4bet';

  const hasCall = MW_CALL[sc.key] && MW_CALL[sc.key].size > 0;
  const typeLabel = sc.type === 'squeeze' ? 'Squeeze' : '4-Bet';
  const modeLabel = sc.type === 'squeeze' ? '3-Bet / Squeeze' : '4-Bet';

  document.getElementById('quiz-scenario-title').textContent = `${heroPos} vs ${sc.label} — ${typeLabel}`;
  document.getElementById('step-number-label').textContent = 'Multi-Way Quiz';
  document.getElementById('step-title-main').textContent = `${heroPos} — ${sc.desc}`;
  document.getElementById('step-instruction-text').textContent =
    hasCall
      ? `Select your ${modeLabel} hands. Switch to Call mode for calling hands.`
      : `Select every hand you would ${modeLabel.toLowerCase()}.`;

  document.getElementById('mode-toggle-wrap').style.display = hasCall ? 'flex' : 'none';
  document.getElementById('btn-mode-4bet').textContent = modeLabel;
  document.getElementById('btn-mode-call').textContent = 'Call';

  document.getElementById('legend-raise-label').textContent = modeLabel;
  document.getElementById('legend-call-item').style.display = hasCall ? 'flex' : 'none';
  document.getElementById('legend-faded-label').textContent = 'Fold';
  document.getElementById('legend-result-raise').textContent = `Correct ${modeLabel}`;
  document.getElementById('legend-result-call-item').style.display = hasCall ? 'flex' : 'none';
  document.getElementById('legend-result-wrong-action-item').style.display = hasCall ? 'flex' : 'none';
  if (hasCall) document.querySelector('#legend-result-wrong-action-item span').textContent = `Called (should ${modeLabel.toLowerCase()})`;
  document.getElementById('legend-result-wrong-4bet-item').style.display = hasCall ? 'flex' : 'none';
  if (hasCall) document.querySelector('#legend-result-wrong-4bet-item span').textContent = `${modeLabel} (should call)`;
  document.getElementById('legend-result-missed-4bet').style.display = 'flex';
  document.querySelector('#legend-result-missed-4bet span').textContent = `Missed ${modeLabel}`;
  document.getElementById('legend-result-missed-call').style.display = hasCall ? 'flex' : 'none';
  document.getElementById('legend-result-missed-single').style.display = 'none';
  document.getElementById('legend-result-faded').textContent = 'Fold';
  document.getElementById('legend-normal').style.display = 'flex';
  document.getElementById('legend-result').style.display = 'none';
  document.getElementById('legend-fivebet').style.display = 'none';

  document.getElementById('badge1').className = 'step-badge active';
  document.getElementById('badge2').className = 'step-badge';
  document.getElementById('check-btn').textContent = 'Check Answer';
  document.getElementById('check-btn').disabled = false;
  document.getElementById('check-btn').onclick = checkStep;
  document.getElementById('reset-btn').style.display = 'inline-block';
  document.getElementById('score-chip').style.display = 'none';
  document.getElementById('result-panel').classList.remove('show');
  document.getElementById('chip-stacks-container').style.display = 'none';
  clearExtraButtons();
  buildGrid();
  applyMWCellUI();
  setModeUI(currentMode);
  hideInlineStepStats();
  updateMainActionButtons();
  showScreen('screen-quiz');
}

function applyMWCellUI() {
  document.querySelectorAll('.hcell').forEach(c => {
    c.className = 'hcell';
    if (selMW.has(c.dataset.hand)) c.classList.add('sel-4bet');
    else if (selMWCall.has(c.dataset.hand)) c.classList.add('sel-call');
  });
}

function checkMW() {
  stepChecked = true;
  const correctSqueeze = MW_SQUEEZE[mwScenario.key] || new Set();
  const correctCall    = MW_CALL[mwScenario.key]    || new Set();
  let nC=0, nI=0, nW=0, nM=0;

  document.querySelectorAll('.hcell').forEach(cell => {
    const h = cell.dataset.hand;
    const uS = selMW.has(h), uC = selMWCall.has(h);
    const iS = correctSqueeze.has(h), iC = correctCall.has(h);
    cell.className = 'hcell';
    if      (uS && iS)   { cell.classList.add('result-correct-4bet'); nC++; }
    else if (uC && iC)   { cell.classList.add('result-correct-call'); nC++; }
    else if (uS && iC)   { cell.classList.add('result-wrong-4bet');   nW++; }
    else if (uC && iS)   { cell.classList.add('result-wrong-call');   nW++; }
    else if (uS || uC)   { cell.classList.add('result-incorrect');    nI++; }
    else if (iS)         { cell.classList.add('result-missed-4bet');  nM++; }
    else if (iC)         { cell.classList.add('result-missed-call');  nM++; }
  });

  const pct = Math.round(nC / (nC+nI+nW+nM||1) * 100);
  document.getElementById('badge1').className = 'step-badge done';
  showChip(pct);
  document.getElementById('legend-normal').style.display = 'none';
  document.getElementById('legend-result').style.display = 'flex';
  showResult(nC, nI+nW, nM, pct, correctSqueeze.size + correctCall.size, true, 'multiway');

  document.getElementById('check-btn').textContent = 'Play Again';
  document.getElementById('check-btn').onclick = () => { clearExtraButtons(); document.getElementById('check-btn').onclick = checkStep; startMWQuiz(mwScenario); };
  document.getElementById('reset-btn').style.display = 'none';
  addExtraBtn('New Matchup', () => { clearExtraButtons(); buildMWMatchupRow(heroPos); showScreen('screen-multiway-matchup'); });
}

// ═══════════════════════════════════════
// ═══════════════════════════════════════
//  DRAG-TO-PAINT
// ═══════════════════════════════════════
let isDragging = false;
let dragAction = null;   // 'add' | 'remove'
let lastDraggedHand = null;

function buildGrid() {
  const grid = document.getElementById('rangeGrid'); grid.innerHTML = '';
  ALL_HANDS.forEach(h => {
    const c = document.createElement('div');
    c.className = 'hcell'; c.textContent = h; c.dataset.hand = h;

    // Mouse events
    c.addEventListener('mousedown', e => { e.preventDefault(); startDrag(h, c); });
    c.addEventListener('mouseenter', () => { if (isDragging) continueDrag(h, c); });

    // Touch events
    c.addEventListener('touchstart', e => { e.preventDefault(); const t = e.touches[0]; startDrag(h, c); }, {passive:false});

    grid.appendChild(c);
  });

  // Touch move handled on grid container (cells can't receive touchenter)
  grid.addEventListener('touchmove', e => {
    e.preventDefault();
    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (el && el.classList.contains('hcell') && el.dataset.hand !== lastDraggedHand) {
      continueDrag(el.dataset.hand, el);
    }
  }, {passive:false});
}

// End drag on mouseup anywhere
document.addEventListener('mouseup', () => { isDragging = false; dragAction = null; lastDraggedHand = null; });
document.addEventListener('touchend', () => { isDragging = false; dragAction = null; lastDraggedHand = null; });

function startDrag(hand, cell) {
  if (stepChecked) return;
  isDragging = true;
  lastDraggedHand = hand;
  // Determine action based on current state of first cell touched
  dragAction = isSelected(hand) ? 'remove' : 'add';
  applyDrag(hand, cell);
}

function continueDrag(hand, cell) {
  if (!isDragging || stepChecked) return;
  if (hand === lastDraggedHand) return;
  lastDraggedHand = hand;
  applyDrag(hand, cell);
}

function isSelected(hand) {
  if (quizPhase === 'rfi') return selRfi.has(hand);
  if (quizPhase === 'defense') return sel4bet.has(hand) || selCall.has(hand);
  if (quizPhase === 'vsopen-3bet') return sel3bet.has(hand) || selCall.has(hand);
  if (quizPhase === 'vsopen-4bet') return sel5betShove.has(hand) || selVs4bet.has(hand);
  if (quizPhase === 'fivebet') return selFiveBet.has(hand);
  if (quizPhase === 'multiway') return selMW.has(hand) || selMWCall.has(hand);
  return false;
}

function applyDrag(hand, cell) {
  if (quizPhase === 'rfi') {
    if (dragAction === 'add') { selRfi.add(hand); cell.classList.add('sel-4bet'); }
    else { selRfi.delete(hand); cell.classList.remove('sel-4bet'); }

  } else if (quizPhase === 'defense') {
    const rfiSet = RFI[heroPos];
    if (rfiSet && !rfiSet.has(hand)) return;
    if (dragAction === 'add') {
      if (currentMode === '4bet') { sel4bet.add(hand); selCall.delete(hand); }
      else { selCall.add(hand); sel4bet.delete(hand); }
    } else {
      sel4bet.delete(hand); selCall.delete(hand);
    }
    refreshDefenseCell(hand, cell);
    return; // refreshDefenseCell handles class update

  } else if (quizPhase === 'vsopen-3bet') {
    if (dragAction === 'add') {
      if (currentMode === '4bet') { sel3bet.add(hand); selCall.delete(hand); }
      else { selCall.add(hand); sel3bet.delete(hand); }
    } else {
      sel3bet.delete(hand); selCall.delete(hand);
    }
    refreshVsOpenCell(hand, cell);
    return;

  } else if (quizPhase === 'vsopen-4bet') {
    const def = DEFENSE[scenarioKey];
    const correct3bet = def['4bet'];
    if (!correct3bet.has(hand)) return;
    if (dragAction === 'add') {
      if (currentMode === '4bet') { sel5betShove.add(hand); selVs4bet.delete(hand); }
      else { selVs4bet.add(hand); sel5betShove.delete(hand); }
    } else {
      sel5betShove.delete(hand); selVs4bet.delete(hand);
    }
    refreshVsOpen4betCell(hand, cell);
    return;

  } else if (quizPhase === 'fivebet') {
    const correct4bet = DEFENSE[scenarioKey]['4bet'];
    if (!correct4bet.has(hand)) return;
    if (dragAction === 'add') { selFiveBet.add(hand); cell.classList.add('five-bet-selected'); }
    else { selFiveBet.delete(hand); cell.classList.remove('five-bet-selected'); }

  } else if (quizPhase === 'multiway') {
    if (dragAction === 'add') {
      if (currentMode === '4bet') { selMW.add(hand); selMWCall.delete(hand); }
      else { selMWCall.add(hand); selMW.delete(hand); }
    } else {
      selMW.delete(hand); selMWCall.delete(hand);
    }
    // refresh cell
    cell.className = 'hcell';
    if (selMW.has(hand)) cell.classList.add('sel-4bet');
    else if (selMWCall.has(hand)) cell.classList.add('sel-call');
  }
}

function refreshDefenseCell(hand, cell) {
  const rfiSet = RFI[heroPos];
  cell.className = 'hcell';
  if (rfiSet && !rfiSet.has(hand)) cell.classList.add('out-of-range');
  if (sel4bet.has(hand)) cell.classList.add('sel-4bet');
  else if (selCall.has(hand)) cell.classList.add('sel-call');
}

function refreshVsOpenCell(hand, cell) {
  cell.className = 'hcell';
  if (sel3bet.has(hand)) cell.classList.add('sel-4bet'); // reuse same styling
  else if (selCall.has(hand)) cell.classList.add('sel-call');
}

function refreshVsOpen4betCell(hand, cell) {
  const def = DEFENSE[scenarioKey];
  const correct3bet = def['4bet'];
  cell.className = 'hcell';
  if (!correct3bet.has(hand)) cell.classList.add('out-of-range');
  if (sel5betShove.has(hand)) cell.classList.add('sel-4bet');
  else if (selVs4bet.has(hand)) cell.classList.add('sel-call');
}

// ═══════════════════════════════════════
//  MODE TOGGLE
// ═══════════════════════════════════════
function setMode(m) { currentMode = m; setModeUI(m); }
function setModeUI(m) {
  document.getElementById('btn-mode-4bet').className = 'mode-btn'+(m==='4bet'?' active-fourbet':'');
  document.getElementById('btn-mode-call').className = 'mode-btn'+(m==='call'?' active-call':'');
}

// ═══════════════════════════════════════
//  CHECK
// ═══════════════════════════════════════
function checkStep() {
  if (quizPhase==='rfi') checkRfi();
  else if (quizPhase==='defense') checkDefense();
  else if (quizPhase==='vsopen-3bet') checkVsOpen3bet();
  else if (quizPhase==='vsopen-4bet') checkVsOpen4bet();
  else if (quizPhase==='fivebet') checkFiveBet();
  else if (quizPhase==='multiway') checkMW();
}

function checkRfi() {
  stepChecked = true;
  const correct = RFI[heroPos];
  let cC=0, cI=0, cM=0;
  document.querySelectorAll('.hcell').forEach(c => {
    const h = c.dataset.hand; const sel = selRfi.has(h); const ok = correct.has(h);
    c.className = 'hcell';
    if (sel && ok)  { c.classList.add('result-correct-4bet'); cC++; }
    else if (sel)   { c.classList.add('result-incorrect');    cI++; }
    else if (ok)    { c.classList.add('result-missed');       cM++; }
  });
  const pct = Math.round(cC / (cC+cI+cM||1) * 100);
  document.getElementById('badge1').className = 'step-badge done';
  showChip(pct);
  document.getElementById('legend-result-raise').textContent = 'Correct Open';
  document.getElementById('legend-result-call-item').style.display = 'none';
  document.getElementById('legend-result-wrong-action-item').style.display = 'none';
  document.getElementById('legend-result-wrong-4bet-item').style.display = 'none';
  document.getElementById('legend-result-missed-4bet').style.display = 'none';
  document.getElementById('legend-result-missed-call').style.display = 'none';
  document.getElementById('legend-result-missed-single').style.display = 'flex';
  document.getElementById('legend-result-wrong-4bet-item').style.display = 'none';
  document.getElementById('legend-result-faded').textContent = 'Fold';
  document.getElementById('legend-normal').style.display = 'none';
  document.getElementById('legend-result').style.display = 'flex';
  showResult(cC, cI, cM, pct, correct.size, true, 'rfi');
  document.getElementById('check-btn').textContent = 'Practice vs 3-Bet →';
  document.getElementById('check-btn').onclick = () => { buildOpponentRow(heroPos); showScreen('screen-opponent'); document.getElementById('check-btn').onclick = checkStep; };
  document.getElementById('reset-btn').style.display = 'none';
  updateMainActionButtons();
  addExtraBtn('Try Again', () => startRfiQuiz(heroPos));
}

function checkDefense() {
  stepChecked = true;
  const def = DEFENSE[scenarioKey];
  const c4 = def['4bet'], cC = def['call'];
  const rfiSet = RFI[heroPos];
  let nC=0, nI=0, nW=0, nM=0;
  document.querySelectorAll('.hcell').forEach(cell => {
    const h = cell.dataset.hand;
    if (rfiSet && !rfiSet.has(h)) { cell.className = 'hcell out-of-range'; return; }
    const u4 = sel4bet.has(h), uC = selCall.has(h);
    const is4 = c4.has(h), isC = cC.has(h);
    cell.className = 'hcell';
    if (u4 && is4)            { cell.classList.add('result-correct-4bet');  nC++; }
    else if (uC && isC)       { cell.classList.add('result-correct-call');  nC++; }
    else if (u4 && isC)       { cell.classList.add('result-wrong-4bet');    nW++; } // 4-bet a call hand
    else if (uC && is4)       { cell.classList.add('result-wrong-call');    nW++; } // called a 4-bet hand
    else if (u4||uC)          { cell.classList.add('result-incorrect');     nI++; } // shouldn't play at all
    else if (is4)             { cell.classList.add('result-missed-4bet');   nM++; }
    else if (isC)             { cell.classList.add('result-missed-call');   nM++; }
  });
  const totalPlayed = nC + nI + nW + nM;
  const pct = Math.round(nC / (totalPlayed||1) * 100);
  document.getElementById('badge1').className = 'step-badge done';
  document.getElementById('badge2').className = 'step-badge active';
  showChip(pct);
  document.getElementById('legend-normal').style.display = 'none';
  document.getElementById('legend-result').style.display = 'flex';
  showResult(nC, nI+nW, nM, pct, c4.size+cC.size, false, 'defense');
  // Save defense step 1 score
  saveQuizResult(`${heroPos}_${oppPos}_defense`, pct);

  // Only offer 5-bet step if this matchup exists in FIVEBET_CALL
  if (FIVEBET_CALL[scenarioKey]) {
    document.getElementById('check-btn').textContent = 'Continue to 5-Bet →';
    document.getElementById('check-btn').onclick = () => { clearExtraButtons(); document.getElementById('check-btn').onclick = checkStep; applyFiveBetUI(); };
  } else {
    document.getElementById('check-btn').textContent = 'Play Again';
    document.getElementById('check-btn').onclick = () => { clearExtraButtons(); startDefenseScenario(heroPos, oppPos); };
    document.getElementById('badge2').className = 'step-badge';
  }
  document.getElementById('reset-btn').style.display = 'none';
  addExtraBtn('Try Again', () => { clearExtraButtons(); startDefenseScenario(heroPos, oppPos); });
}

// ── vs OPEN 3-BET CHECK ──
function checkVsOpen3bet() {
  stepChecked = true;
  const def = DEFENSE[scenarioKey];
  const correct3bet = def['4bet']; // reuse the '4bet' key for 3-bet ranges vs open
  const correctCall = def['call'];
  const rfiSet = RFI[heroPos];
  let nC=0, nI=0, nW=0, nM=0;

  document.querySelectorAll('.hcell').forEach(cell => {
    const h = cell.dataset.hand;
    const u3 = sel3bet.has(h), uC = selCall.has(h);
    const is3 = correct3bet.has(h), isC = correctCall.has(h);
    cell.className = 'hcell';

    if (u3 && is3)            { cell.classList.add('result-correct-4bet');  nC++; }
    else if (uC && isC)       { cell.classList.add('result-correct-call');  nC++; }
    else if (u3 && isC)       { cell.classList.add('result-wrong-4bet');    nW++; }
    else if (uC && is3)       { cell.classList.add('result-wrong-call');    nW++; }
    else if (u3||uC)          { cell.classList.add('result-incorrect');     nI++; }
    else if (is3)             { cell.classList.add('result-missed-4bet');   nM++; }
    else if (isC)             { cell.classList.add('result-missed-call');   nM++; }
  });

  const totalPlayed = nC + nI + nW + nM;
  const pct = Math.round(nC / (totalPlayed||1) * 100);

  document.getElementById('badge1').className = 'step-badge done';
  document.getElementById('badge2').className = 'step-badge active';
  showChip(pct);

  document.getElementById('legend-normal').style.display = 'none';
  document.getElementById('legend-result').style.display = 'flex';

  showResult(nC, nI+nW, nM, pct, correct3bet.size+correctCall.size, false, 'vsopen');
  // Save vsopen 3bet step 1 score
  saveQuizResult(`${heroPos}_${oppPos}_vsopen-3bet`, pct);

  document.getElementById('check-btn').textContent = 'Continue to vs 3-Bet →';
  document.getElementById('check-btn').onclick = () => { clearExtraButtons(); document.getElementById('check-btn').onclick = checkStep; applyVsOpen4betUI(); };
  document.getElementById('reset-btn').style.display = 'none';
  addExtraBtn('Try Again', () => { clearExtraButtons(); startVsOpenScenario(heroPos, oppPos); });
}

// ── vs OPEN 4-BET UI ──
function applyVsOpen4betUI() {
  quizPhase = 'vsopen-4bet'; selVs4bet.clear(); sel5betShove.clear(); stepChecked = false; currentMode = '4bet';
  const def = DEFENSE[scenarioKey];
  const correct3bet = def['4bet']; // correct 3-bet range

  document.querySelectorAll('.hcell').forEach(c => {
    c.className = 'hcell';
    if (!correct3bet.has(c.dataset.hand)) c.classList.add('out-of-range');
    if (sel5betShove.has(c.dataset.hand)) c.classList.add('sel-4bet');
    else if (selVs4bet.has(c.dataset.hand)) c.classList.add('sel-call');
  });

  document.getElementById('step-number-label').textContent = 'Step 2 of 2';
  document.getElementById('step-title-main').textContent = `${oppPos} 4-Bets — 5-Bet Shove or Call?`;
  document.getElementById('step-instruction-text').textContent = `You 3-bet, ${oppPos} 4-bets. Select your 5-bet shove hands, then switch to Call mode for calling hands.`;
  
  document.getElementById('mode-toggle-wrap').style.display = 'flex';
  document.getElementById('btn-mode-4bet').textContent = '5-Bet Shove';
  document.getElementById('btn-mode-call').textContent = 'Call';
  
  document.getElementById('legend-raise-label').textContent = '5-Bet Shove';
  document.getElementById('legend-call-item').style.display = 'flex';
  document.getElementById('legend-faded-label').textContent = 'Not in 3-Bet';
  document.getElementById('legend-result-raise').textContent = 'Correct 5-Bet';
  document.getElementById('legend-result-call-item').style.display = 'flex';
  document.getElementById('legend-result-wrong-action-item').style.display = 'flex';
  document.getElementById('legend-result-wrong-4bet-item').style.display = 'flex';
  document.getElementById('legend-result-missed-4bet').style.display = 'flex';
  document.getElementById('legend-result-missed-call').style.display = 'flex';
  document.getElementById('legend-result-missed-single').style.display = 'none';
  document.getElementById('legend-result-faded').textContent = 'Not in 3-Bet';
  document.getElementById('legend-normal').style.display = 'flex';
  document.getElementById('legend-result').style.display = 'none';
  document.getElementById('legend-fivebet').style.display = 'none';
  
  document.getElementById('badge1').className = 'step-badge done';
  document.getElementById('badge2').className = 'step-badge active';
  document.getElementById('check-btn').textContent = 'Check Answer';
  document.getElementById('check-btn').disabled = false;
  document.getElementById('check-btn').onclick = checkStep;
  document.getElementById('reset-btn').style.display = 'inline-block';
  document.getElementById('score-chip').style.display = 'none';
  document.getElementById('result-panel').classList.remove('show');
  setModeUI(currentMode);
  showInlineStepStats(`${heroPos}_${oppPos}_vsopen-4bet`);
}

function checkFiveBet() {
  stepChecked = true;
  const correct = FIVEBET_CALL[scenarioKey];
  const correct4bet = DEFENSE[scenarioKey]['4bet'];
  let nC=0, nI=0, nM=0;
  document.querySelectorAll('.hcell').forEach(cell => {
    const h = cell.dataset.hand;
    if (!correct4bet.has(h)) { cell.className = 'hcell out-of-range'; return; }
    cell.className = 'hcell';
    if (correct.has(h)) {
      if (selFiveBet.has(h)) { cell.classList.add('result-correct-4bet'); nC++; }
      else { cell.classList.add('result-missed'); nM++; }
    } else {
      if (selFiveBet.has(h)) { cell.classList.add('result-incorrect'); nI++; }
    }
  });
  const pct = Math.round(nC / (nC+nI+nM||1) * 100);
  document.getElementById('badge2').className = 'step-badge done';
  showChip(pct);
  document.getElementById('legend-fivebet').style.display = 'flex';
  showResult(nC, nI, nM, pct, correct.size, true, 'fivebet');
  document.getElementById('check-btn').textContent = 'Play Again';
  document.getElementById('check-btn').onclick = () => { clearExtraButtons(); document.getElementById('check-btn').onclick = checkStep; startDefenseScenario(heroPos, oppPos); };
  document.getElementById('reset-btn').style.display = 'none';
  addExtraBtn('New Matchup', () => { clearExtraButtons(); buildOpponentRow(heroPos); showScreen('screen-opponent'); });
}

// ── vs OPEN 4-BET CHECK ──
function checkVsOpen4bet() {
  stepChecked = true;
  const def = DEFENSE[scenarioKey];
  const correct3bet = def['4bet'];
  
  // Use proper data structures for vs Open 5-bet ranges
  const correct5betShove = VSOPEN_5BET_SHOVE[scenarioKey] || new Set();
  const correctCall = VSOPEN_5BET_CALL[scenarioKey] || new Set();
  
  let nC=0, nI=0, nW=0, nM=0;

  document.querySelectorAll('.hcell').forEach(cell => {
    const h = cell.dataset.hand;
    if (!correct3bet.has(h)) { cell.className = 'hcell out-of-range'; return; }
    
    const uShove = sel5betShove.has(h), uCall = selVs4bet.has(h);
    const isShove = correct5betShove.has(h), isCall = correctCall.has(h);
    
    cell.className = 'hcell';
    
    if (uShove && isShove)       { cell.classList.add('result-correct-4bet');  nC++; } // correct 5-bet shove (green)
    else if (uCall && isCall)    { cell.classList.add('result-correct-call');  nC++; } // correct call (teal)
    else if (uShove && isCall)   { cell.classList.add('result-wrong-4bet');    nW++; } // shoved when should call (pink)
    else if (uCall && isShove)   { cell.classList.add('result-wrong-call');    nW++; } // called when should shove (purple)
    else if (uShove || uCall)    { cell.classList.add('result-incorrect');     nI++; } // wrong hand entirely (red)
    else if (isShove)            { cell.classList.add('result-missed-4bet');   nM++; } // missed shove (green tint)
    else if (isCall)             { cell.classList.add('result-missed-call');   nM++; } // missed call (teal tint)
  });

  const totalPlayed = nC + nI + nW + nM;
  const pct = Math.round(nC / (totalPlayed||1) * 100);
  
  document.getElementById('badge2').className = 'step-badge done';
  showChip(pct);
  
  document.getElementById('legend-normal').style.display = 'none';
  document.getElementById('legend-result').style.display = 'flex';

  showResult(nC, nI+nW, nM, pct, correct5betShove.size + correctCall.size, true, 'vsopen4bet');

  document.getElementById('check-btn').textContent = 'Play Again';
  document.getElementById('check-btn').onclick = () => { clearExtraButtons(); document.getElementById('check-btn').onclick = checkStep; startVsOpenScenario(heroPos, oppPos); };
  document.getElementById('reset-btn').style.display = 'none';
  addExtraBtn('New Matchup', () => { clearExtraButtons(); buildOpenerRow(heroPos); showScreen('screen-opener'); });
}

// ═══════════════════════════════════════
//  RESULT PANEL
// ═══════════════════════════════════════
function showChip(pct) {
  const chip = document.getElementById('score-chip');
  chip.textContent = `${pct}% Accurate`; chip.style.display = 'inline-block';
}

function showResult(correct, incorrect, missed, pct, total, isFinal, phase) {
  let msg = pct===100 ? '🏆 Perfect — flawless execution.' : pct>=80 ? '✓ Solid. Fine-tune the edge cases.' : pct>=60 ? 'Good foundation. Review the highlighted hands.' : 'Keep drilling — study the ranges carefully.';
  if (phase==='rfi') msg += ' <br><span style="opacity:0.6">Ready to practice facing a 3-bet?</span>';
  if (isFinal) msg += ' <br><span style="opacity:0.6">Use "Play Again" to repeat or "New Matchup" to switch.</span>';
  document.getElementById('result-stats').innerHTML = `
    <div class="stat"><div class="stat-val gold">${pct}%</div><div class="stat-label">Accuracy</div></div>
    <div class="stat"><div class="stat-val green">${correct}</div><div class="stat-label">Correct</div></div>
    <div class="stat"><div class="stat-val red">${incorrect}</div><div class="stat-label">Incorrect</div></div>
    <div class="stat"><div class="stat-val orange">${missed}</div><div class="stat-label">Missed (of ${total})</div></div>`;
  document.getElementById('result-message').innerHTML = msg;
  document.getElementById('result-panel').classList.add('show');
  
  // Save quiz result to Supabase (if user is logged in)
  if (isFinal) {
    let quizName;
    if (phase === 'rfi') {
      quizName = `${heroPos}_RFI_rfi`;
    } else if (phase === 'defense') {
      quizName = `${heroPos}_${oppPos}_defense`;
    } else if (phase === 'fivebet') {
      quizName = `${heroPos}_${oppPos}_fivebet`;
    } else if (phase === 'vsopen') {
      quizName = `${heroPos}_${oppPos}_vsopen-3bet`;
    } else if (phase === 'vsopen4bet') {
      quizName = `${heroPos}_${oppPos}_vsopen-4bet`;
    } else if (phase === 'multiway') {
      quizName = `${heroPos}_${mwScenario ? mwScenario.key : 'mw'}_multiway`;
    } else {
      quizName = `${heroPos}_${oppPos || 'RFI'}_${phase}`;
    }
    console.log("Saving quiz result:", quizName, pct);
    saveQuizResult(quizName, pct);
  }
}

// ═══════════════════════════════════════
//  RESET / HELPERS
// ═══════════════════════════════════════
function resetStep() {
  clearExtraButtons();
  if (quizPhase==='rfi') startRfiQuiz(heroPos);
  else if (quizPhase==='defense') { sel4bet.clear(); selCall.clear(); stepChecked=false; buildGrid(); applyDefenseUI(); }
  else if (quizPhase==='vsopen-3bet') { sel3bet.clear(); selCall.clear(); stepChecked=false; buildGrid(); applyVsOpen3betUI(); }
  else if (quizPhase==='vsopen-4bet') { sel5betShove.clear(); selVs4bet.clear(); stepChecked=false; applyVsOpen4betUI(); }
  else if (quizPhase==='fivebet') { selFiveBet.clear(); stepChecked=false; applyFiveBetUI(); }
  else if (quizPhase==='multiway') { selMW.clear(); selMWCall.clear(); stepChecked=false; buildGrid(); applyMWCellUI(); }
}

function clearExtraButtons() { document.getElementById('action-bar-extra').innerHTML = ''; }

function updateMainActionButtons() {
  const skipBtn = document.getElementById('skip-btn');
  if (!skipBtn) return;
  skipBtn.style.display = quizPath === 'rfi' && quizPhase === 'rfi' ? 'inline-block' : 'none';
}

function skipRfiQuiz() {
  if (quizPath !== 'rfi' || quizPhase !== 'rfi' || !heroPos) return;
  clearExtraButtons();
  buildOpponentRow(heroPos);
  showScreen('screen-opponent');
}

async function showInlineStepStats(quizName) {
  const statsEl = document.getElementById('step-inline-stats');
  statsEl.style.display = 'flex';
  document.getElementById('step-inline-best').textContent = '—';
  document.getElementById('step-inline-avg').textContent = '—';
  
  if (!supabaseClient) return;
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;
  
  const attempts = await fetchStats(quizName);
  if (attempts && attempts.length > 0) {
    const stats = calculateStats(attempts);
    document.getElementById('step-inline-best').textContent = `${stats.personalBest}%`;
    document.getElementById('step-inline-avg').textContent = `${stats.average}%`;
  }
}

function hideInlineStepStats() {
  document.getElementById('step-inline-stats').style.display = 'none';
}

function addExtraBtn(label, fn) {
  const btn = document.createElement('button');
  btn.className = 'action-btn ghost'; btn.textContent = label; btn.onclick = fn;
  document.getElementById('action-bar-extra').appendChild(btn);
}
// ═══════════════════════════════════════════════════════════════
//  HAND TRAINER
// ═══════════════════════════════════════════════════════════════

const HT_RFI = {
  UTG: new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K6s','K7s','K8s','K9s','KTs','KJs','KQs','QTs','QJs','ATo','AJo','AQo','AKo','KJo','KQo','JTs','T9s','65s']),
  HJ:  new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q9s','QTs','QJs','A9o','ATo','AJo','AQo','AKo','KTo','KJo','KQo','QTo','QJo','J9s','JTs','T8s','T9s','65s']),
  CO:  new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q6s','Q7s','Q8s','Q9s','QTs','QJs','A8o','A9o','ATo','AJo','AQo','AKo','KTo','KJo','KQo','QTo','QJo','JTo','J8s','J9s','JTs','T8s','T9s','98s','87s','76s','65s','54s','A5o']),
  BTN: new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q2s','Q3s','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo','K7o','K8o','K9o','KTo','KJo','KQo','Q9o','QTo','QJo','J9o','JTo','T9o','J4s','J5s','J6s','J7s','J8s','J9s','JTs','T6s','T7s','T8s','T9s','96s','97s','98s','86s','87s','75s','76s','65s','54s']),
  SB:  new Set(['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22','A2s','A3s','A4s','A5s','A6s','A7s','A8s','A9s','ATs','AJs','AQs','AKs','K2s','K3s','K4s','K5s','K6s','K7s','K8s','K9s','KTs','KJs','KQs','Q2s','Q3s','Q4s','Q5s','Q6s','Q7s','Q8s','Q9s','QTs','QJs','A2o','A3o','A4o','A5o','A6o','A7o','A8o','A9o','ATo','AJo','AQo','AKo','K7o','K8o','K9o','KTo','KJo','KQo','Q9o','QTo','QJo','J9o','JTo','T9o','J4s','J5s','J6s','J7s','J8s','J9s','JTs','T6s','T7s','T8s','T9s','96s','97s','98s','85s','86s','87s','75s','76s','64s','65s','53s','54s']),
};
const HT_DEF = DEFENSE; // reuse range quiz DEFENSE object
const HT_FBC = FIVEBET_CALL;
const HT_V5S = VSOPEN_5BET_SHOVE;
const HT_V5C = VSOPEN_5BET_CALL;

const HT_RANKS = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
const HT_SUITS = ['c','d','h','s'];
const HT_SUIT_BG = { c:'clubbg.png', d:'diamondbg.png', h:'heartbg.png', s:'spadebg.png' };
const HT_RANK_DISP = {'2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','T':'10','J':'J','Q':'Q','K':'K','A':'A'};

function htHandKey(c1,c2) {
  const rv=c=>HT_RANKS.indexOf(c.rank);
  const [hi,lo]=rv(c1)>=rv(c2)?[c1,c2]:[c2,c1];
  if(hi.rank===lo.rank) return hi.rank+lo.rank;
  return hi.rank+lo.rank+(hi.suit===lo.suit?'s':'o');
}

const HT_SEAT_POS = { UTG:{x:6,y:50}, HJ:{x:30,y:18}, CO:{x:70,y:18}, BTN:{x:94,y:50}, SB:{x:76,y:82}, BB:{x:24,y:82} };
const HT_CARD_DIR = { UTG:'ht-cards-left', HJ:'ht-cards-above', CO:'ht-cards-above', BTN:'ht-cards-right', SB:'ht-cards-below', BB:'ht-cards-below' };
const HT_CHIP_OFF = { UTG:{x:18,y:50}, HJ:{x:38,y:32}, CO:{x:62,y:32}, BTN:{x:82,y:50}, SB:{x:65,y:68}, BB:{x:35,y:68} };

const HT_RFI_OPEN   = { UTG:2.5, HJ:2.5, CO:2.5, BTN:2.5, SB:3 };
const HT_VO_3BET    = {'HJ_UTG':8,'CO_UTG':8,'CO_HJ':8,'BTN_UTG':8,'BTN_HJ':8,'BTN_CO':8,'SB_UTG':10,'SB_HJ':10,'SB_CO':10,'SB_BTN':10,'BB_UTG':10,'BB_HJ':10,'BB_CO':10,'BB_BTN':10,'BB_SB':9.5};
const HT_VO_POT     = {'HJ_UTG':4,'CO_UTG':4,'CO_HJ':4,'BTN_UTG':4,'BTN_HJ':4,'BTN_CO':4,'SB_UTG':4,'SB_HJ':4,'SB_CO':4,'SB_BTN':4,'BB_UTG':4,'BB_HJ':4,'BB_CO':4,'BB_BTN':4,'BB_SB':4};
// HT_RD_3BET_SIZE: the opponent's 3-bet size when hero opened (key = opp_hero, values 8-10bb)
const HT_RD_3BET_SIZE = {'HJ_UTG':8,'CO_UTG':8,'CO_HJ':8,'BTN_UTG':8,'BTN_HJ':8,'BTN_CO':8,'SB_UTG':10,'SB_HJ':10,'SB_CO':10,'SB_BTN':10,'BB_UTG':10,'BB_HJ':10,'BB_CO':10,'BB_BTN':10,'BB_SB':9.5};
const HT_VO_4BET    = {'HJ_UTG':22,'CO_UTG':22,'CO_HJ':22,'BTN_UTG':22,'BTN_HJ':22,'BTN_CO':22,'SB_UTG':22,'SB_HJ':22,'SB_CO':22,'SB_BTN':22,'BB_UTG':22,'BB_HJ':22,'BB_CO':22,'BB_BTN':22,'BB_SB':22};
// HT_RD_3BET: hero's 4-bet size when facing a 3-bet after opening (key = hero_opp, values 20-24bb)
const HT_RD_3BET    = {'UTG_HJ':20,'UTG_CO':20,'UTG_BTN':20,'UTG_SB':22.5,'UTG_BB':22.5,'HJ_CO':20,'HJ_BTN':20,'HJ_SB':22.5,'HJ_BB':22.5,'CO_BTN':20,'CO_SB':22.5,'CO_BB':22.5,'BTN_SB':22.5,'BTN_BB':22.5,'SB_BB':24};
const HT_RD_POT     = {'UTG_HJ':12,'UTG_CO':12,'UTG_BTN':12,'UTG_SB':13.5,'UTG_BB':13.5,'HJ_CO':12,'HJ_BTN':12,'HJ_SB':13.5,'HJ_BB':13.5,'CO_BTN':12,'CO_SB':13.5,'CO_BB':13.5,'BTN_SB':13.5,'BTN_BB':13.5,'SB_BB':12.5};
const HT_VO4_POT    = {'HJ_UTG':29.5,'CO_UTG':29.5,'CO_HJ':29.5,'BTN_UTG':29.5,'BTN_HJ':29.5,'BTN_CO':29.5,'SB_UTG':33.5,'SB_HJ':33.5,'SB_CO':33.5,'SB_BTN':33.5,'BB_UTG':33.5,'BB_HJ':33.5,'BB_CO':33.5,'BB_BTN':33.5,'BB_SB':33.5};
const HT_RD5_POT    = {'UTG_HJ':121.5,'UTG_CO':121.5,'UTG_BTN':121.5,'UTG_SB':123.5,'UTG_BB':123.5,'HJ_CO':121.5,'HJ_BTN':121.5,'HJ_SB':123.5,'HJ_BB':123.5,'CO_BTN':121.5,'CO_SB':123.5,'CO_BB':123.5,'BTN_SB':123.5,'BTN_BB':123.5,'SB_BB':124};

function htParseMWKey(key) {
  const [hero, matchup] = key.split('_');
  const [opener, second] = matchup.split('+');
  return { hero, opener, second };
}

function htGet3BetSize(raiser, opener) {
  return HT_VO_3BET[`${raiser}_${opener}`] || HT_RD_3BET_SIZE[`${raiser}_${opener}`] || 8;
}

function htGetMWActionLabel(sc) {
  const { opener, second } = htParseMWKey(sc.key);
  const openSize = HT_RFI_OPEN[opener] || 2.5;
  if (sc.mwType === 'squeeze') return `${opener} raised to ${openSize}, ${second} called`;
  return `${opener} raised to ${openSize}, ${second} re-raised to ${htGet3BetSize(second, opener)}`;
}

function htGetDisplayedBets(sc) {
  const bets = { SB: 0.5, BB: 1 };
  if (sc.type === 'vsopen') {
    bets[sc.opener] = HT_RFI_OPEN[sc.opener] || 2.5;
  } else if (sc.type === 'rfi_defense') {
    bets[sc.hero] = HT_RFI_OPEN[sc.hero] || 2.5;
    bets[sc.opp3bet] = htGet3BetSize(sc.opp3bet, sc.hero);
  } else if (sc.type === 'vsopen_4bet') {
    const key = `${sc.hero}_${sc.opener}`;
    bets[sc.hero] = HT_VO_3BET[key] || 8;
    bets[sc.opener] = HT_VO_4BET[key] || 22;
  } else if (sc.type === 'rfi_5bet') {
    const key = `${sc.hero}_${sc.opp3bet}`;
    bets[sc.hero] = HT_RD_3BET[key] || 22;
    bets[sc.opp3bet] = 100;
  } else if (sc.type === 'multiway') {
    const { opener, second } = htParseMWKey(sc.key);
    const openSize = HT_RFI_OPEN[opener] || 2.5;
    bets[opener] = openSize;
    bets[second] = sc.mwType === 'squeeze' ? openSize : htGet3BetSize(second, opener);
  }
  return bets;
}

const HT_ALL_COMBOS = (()=>{
  const d=[];
  for(const r of HT_RANKS) for(const s of HT_SUITS) d.push({rank:r,suit:s});
  const c=[];
  for(let i=0;i<d.length;i++) for(let j=i+1;j<d.length;j++) c.push([d[i],d[j]]);
  return c;
})();

function htBuildScenarios() {
  const s=[];
  const voMap={HJ:['UTG'],CO:['UTG','HJ'],BTN:['UTG','HJ','CO'],SB:['UTG','HJ','CO','BTN'],BB:['UTG','HJ','CO','BTN','SB']};
  const rdMap={UTG:['HJ','CO','BTN','SB','BB'],HJ:['CO','BTN','SB','BB'],CO:['BTN','SB','BB'],BTN:['SB','BB'],SB:['BB']};
  for(const pos of ['UTG','HJ','CO','BTN','SB'])
    s.push({type:'rfi',hero:pos,label:`${pos} RFI`,actionLabel:'Folded to you'});
  for(const [hero,ops] of Object.entries(voMap))
    for(const opener of ops){
      if(!HT_DEF[`${hero}_${opener}`]) continue;
      s.push({type:'vsopen',hero,opener,label:`${hero} vs ${opener} Open`,actionLabel:`${opener} raised to ${HT_RFI_OPEN[opener]}`});
    }
  for(const [hero,ops] of Object.entries(rdMap))
    for(const opp of ops){
      const key=`${hero}_${opp}`; if(!HT_DEF[key]) continue;
      s.push({type:'rfi_defense',hero,opp3bet:opp,label:`${hero} vs ${opp} 3-Bet`,actionLabel:`You raised ${HT_RFI_OPEN[hero]}, ${opp} 3-bet to ${HT_RD_3BET_SIZE[`${opp}_${hero}`]||8}`});
    }
  for(const [hero,ops] of Object.entries(voMap))
    for(const opener of ops){
      const key=`${hero}_${opener}`;
      if(!HT_V5S[key]&&!HT_V5C[key]) continue;
      s.push({type:'vsopen_4bet',hero,opener,label:`${hero} vs ${opener} 4-Bet`,actionLabel:`You 3-bet to ${HT_VO_3BET[key]||8}, ${opener} 4-bet to ${HT_VO_4BET[key]||22}`});
    }
  for(const [hero,ops] of Object.entries(rdMap))
    for(const opp of ops){
      const key=`${hero}_${opp}`; if(!HT_FBC[key]) continue;
      s.push({type:'rfi_5bet',hero,opp3bet:opp,label:`${hero} vs ${opp} All-In`,actionLabel:`You 4-bet to ${HT_RD_3BET[key]}, ${opp} shoved`});
    }
  for(const [hero,scenarios] of Object.entries(MW_SCENARIOS))
    for(const sc of scenarios)
      s.push({
        type:'multiway',
        hero,
        key:sc.key,
        mwType:sc.type,
        label:`${hero} vs ${sc.label} Multi-Way`,
        actionLabel:htGetMWActionLabel({ key: sc.key, mwType: sc.type })
      });
  return s;
}
const HT_SCENARIOS = htBuildScenarios();

function htEligible(sc) {
  if(sc.type==='rfi'||sc.type==='vsopen'||sc.type==='multiway') return HT_ALL_COMBOS;
  const key=sc.type==='rfi_defense'||sc.type==='rfi_5bet'?`${sc.hero}_${sc.opp3bet}`:`${sc.hero}_${sc.opener}`;
  const e=sc.type==='rfi_defense'?HT_RFI[sc.hero]:HT_DEF[key]?.['4bet']||new Set();
  return HT_ALL_COMBOS.filter(([c1,c2])=>e.has(htHandKey(c1,c2)));
}

const HT_ACTION_ORDER = ['UTG','HJ','CO','BTN','SB','BB'];
const HT_INTRO_START_DELAY_MS = 500;
const HT_INTRO_STEP_MS = 600;
const HT_INTRO_GAP_MS = 60;

let htSc=null, htC1=null, htC2=null, htHK=null, htCorrect=[], htAnswered=false;
let htStats={correct:0,wrong:0};
let htVisualState=null, htIntroToken=0, htIntroRunning=false;

function htWait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function htGetActionSequence(sc) {
  const actions=[];
  const heroIdx=HT_ACTION_ORDER.indexOf(sc.hero);
  const push=(pos, action, amount)=>actions.push({ pos, action, amount });
  if(sc.type==='rfi'){
    HT_ACTION_ORDER.slice(0, heroIdx).forEach(pos=>push(pos, 'fold'));
  } else if(sc.type==='vsopen'){
    HT_ACTION_ORDER.slice(0, heroIdx).forEach(pos=>{
      if(pos===sc.opener) push(pos, 'raise', HT_RFI_OPEN[sc.opener]||2.5);
      else push(pos, 'fold');
    });
  } else if(sc.type==='rfi_defense'){
    const openAmount=HT_RFI_OPEN[sc.hero]||2.5;
    const threeAmount=htGet3BetSize(sc.opp3bet, sc.hero);
    HT_ACTION_ORDER.forEach(pos=>{
      if(pos===sc.hero) push(pos, 'raise', openAmount);
      else if(pos===sc.opp3bet) push(pos, 'raise', threeAmount);
      else push(pos, 'fold');
    });
  } else if(sc.type==='vsopen_4bet'){
    const key=`${sc.hero}_${sc.opener}`;
    HT_ACTION_ORDER.forEach(pos=>{
      if(pos===sc.opener) push(pos, 'raise', HT_RFI_OPEN[sc.opener]||2.5);
      else if(pos===sc.hero) push(pos, 'raise', HT_VO_3BET[key]||8);
      else push(pos, 'fold');
    });
    push(sc.opener, 'raise', HT_VO_4BET[key]||22);
  } else if(sc.type==='rfi_5bet'){
    const key=`${sc.hero}_${sc.opp3bet}`;
    HT_ACTION_ORDER.forEach(pos=>{
      if(pos===sc.hero) push(pos, 'raise', HT_RFI_OPEN[sc.hero]||2.5);
      else if(pos===sc.opp3bet) push(pos, 'raise', htGet3BetSize(sc.opp3bet, sc.hero));
      else push(pos, 'fold');
    });
    push(sc.hero, 'raise', HT_RD_3BET[key]||22);
    push(sc.opp3bet, 'shove', 100);
  } else if(sc.type==='multiway'){
    const { opener, second } = htParseMWKey(sc.key);
    const openAmount=HT_RFI_OPEN[opener]||2.5;
    const secondAmount=sc.mwType==='squeeze' ? openAmount : htGet3BetSize(second, opener);
    const secondAction=sc.mwType==='squeeze' ? 'call' : 'raise';
    HT_ACTION_ORDER.slice(0, heroIdx).forEach(pos=>{
      if(pos===opener) push(pos, 'raise', openAmount);
      else if(pos===second) push(pos, secondAction, secondAmount);
      else push(pos, 'fold');
    });
  }
  return actions;
}

function htGetInitialVisualState() {
  return { bets: { SB:0.5, BB:1 }, folded: new Set() };
}

function htGetFinalVisualState(sc) {
  const state=htGetInitialVisualState();
  htGetActionSequence(sc).forEach(action=>{
    if(action.action==='fold') state.folded.add(action.pos);
    else state.bets[action.pos]=action.amount;
  });
  return state;
}

function htSyncPotFromDisplayedChips() {
  const pot=[...document.querySelectorAll('#ht-chips-layer .ht-chip-val')]
    .reduce((sum, chip)=>sum + (parseFloat(chip.textContent) || 0), 0);
  document.getElementById('ht-pot-amount').textContent=String(pot);
}

function htSetActionBarVisible(isVisible) {
  document.getElementById('ht-action-bar').classList.toggle('ht-hidden', !isVisible);
}

function htFindSeat(pos) {
  return document.querySelector(`#ht-seats-layer .ht-seat[data-pos="${pos}"]`);
}

function htFindChip(pos) {
  return document.querySelector(`#ht-chips-layer .ht-bet-chip[data-pos="${pos}"]`);
}

function htSetDisplayedBet(pos, amount) {
  const cL=document.getElementById('ht-chips-layer');
  let chip=htFindChip(pos);
  if(amount===undefined){
    if(chip) chip.remove();
    htSyncPotFromDisplayedChips();
    return;
  }
  if(!chip){
    chip=document.createElement('div');
    chip.className='ht-bet-chip';
    chip.dataset.pos=pos;
    chip.style.left=HT_CHIP_OFF[pos].x+'%';
    chip.style.top=HT_CHIP_OFF[pos].y+'%';
    const img=document.createElement('img');img.src='chip.png';chip.appendChild(img);
    const val=document.createElement('div');val.className='ht-chip-val';chip.appendChild(val);
    cL.appendChild(chip);
  }
  chip.querySelector('.ht-chip-val').textContent=amount;
  htSyncPotFromDisplayedChips();
}

async function htAnimateBetAction(action, token) {
  const wrap=document.getElementById('ht-table-wrap');
  const flying=document.createElement('div');
  flying.className='ht-flying-chip';
  flying.style.left=HT_SEAT_POS[action.pos].x+'%';
  flying.style.top=HT_SEAT_POS[action.pos].y+'%';
  const img=document.createElement('img');img.src='chip.png';flying.appendChild(img);
  const val=document.createElement('div');val.className='ht-chip-val';val.textContent=action.amount;flying.appendChild(val);
  wrap.appendChild(flying);
  void flying.offsetWidth;
  flying.style.opacity='1';
  flying.style.left=HT_CHIP_OFF[action.pos].x+'%';
  flying.style.top=HT_CHIP_OFF[action.pos].y+'%';
  flying.style.transform='translate(-50%,-50%) scale(1)';
  await htWait(HT_INTRO_STEP_MS);
  if(token!==htIntroToken) { flying.remove(); return; }
  htVisualState.bets[action.pos]=action.amount;
  htSetDisplayedBet(action.pos, action.amount);
  flying.style.opacity='0';
  await htWait(80);
  flying.remove();
}

async function htAnimateFoldAction(action, token) {
  const seat=htFindSeat(action.pos);
  if(!seat) return;
  htVisualState.folded.add(action.pos);
  seat.classList.add('ht-folded');
  await htWait(HT_INTRO_STEP_MS);
  if(token!==htIntroToken) return;
}

async function htPlayIntro(sc, token) {
  const actions=htGetActionSequence(sc);
  htIntroRunning=true;
  await htWait(HT_INTRO_START_DELAY_MS);
  if(token!==htIntroToken) return;
  for(const action of actions){
    if(token!==htIntroToken) return;
    if(action.action==='fold') await htAnimateFoldAction(action, token);
    else await htAnimateBetAction(action, token);
    if(token!==htIntroToken) return;
    await htWait(HT_INTRO_GAP_MS);
  }
  if(token!==htIntroToken) return;
  htIntroRunning=false;
  htSetActionBarVisible(true);
}

function startHandTrainer() { showScreen('screen-trainer'); htNextHand(); }

function htNextHand() {
  htIntroToken++;
  const token=htIntroToken;
  htAnswered=false;
  htIntroRunning=false;
  htVisualState=htGetInitialVisualState();
  document.querySelectorAll('.ht-flying-chip').forEach(el=>el.remove());
  document.getElementById('ht-result-overlay').classList.remove('show');
  htSetActionBarVisible(false);
  htSc=HT_SCENARIOS[Math.floor(Math.random()*HT_SCENARIOS.length)];
  const el=htEligible(htSc);
  [htC1,htC2]=el[Math.floor(Math.random()*el.length)];
  htHK=htHandKey(htC1,htC2);
  htCorrect=htGetCorrect(htSc,htHK);
  document.getElementById('ht-ib-scenario').textContent=htSc.label;
  document.getElementById('ht-ib-action').textContent=htSc.actionLabel;
  htRenderTable(); htRenderButtons(); htUpdateStats();
  void htPlayIntro(htSc, token);
}

function htGetCorrect(s,hk) {
  if(s.type==='rfi') return HT_RFI[s.hero].has(hk)?['raise']:['fold'];
  if(s.type==='vsopen'){const def=HT_DEF[`${s.hero}_${s.opener}`];if(!def)return['fold'];if(def['4bet'].has(hk))return['raise'];if(def['call'].has(hk))return['call'];return['fold'];}
  if(s.type==='rfi_defense'){const def=HT_DEF[`${s.hero}_${s.opp3bet}`];if(!def)return['fold'];if(def['4bet'].has(hk))return['raise'];if(def['call'].has(hk))return['call'];return['fold'];}
  if(s.type==='vsopen_4bet'){const key=`${s.hero}_${s.opener}`;if((HT_V5S[key]||new Set()).has(hk))return['shove'];if((HT_V5C[key]||new Set()).has(hk))return['call'];return['fold'];}
  if(s.type==='rfi_5bet') return(HT_FBC[`${s.hero}_${s.opp3bet}`]||new Set()).has(hk)?['call']:['fold'];
  if(s.type==='multiway'){if((MW_SQUEEZE[s.key]||new Set()).has(hk))return['raise'];if((MW_CALL[s.key]||new Set()).has(hk))return['call'];return['fold'];}
  return['fold'];
}

function htRenderButtons() {
  const{type}=htSc;
  const fold=document.getElementById('ht-btn-fold'),call=document.getElementById('ht-btn-call'),
        raise=document.getElementById('ht-btn-raise'),allin=document.getElementById('ht-btn-allin');
  fold.classList.remove('hidden');call.classList.remove('hidden');raise.classList.remove('hidden');allin.classList.add('hidden');
  raise.textContent='RAISE';
  if(type==='rfi'){call.classList.add('hidden');}
  else if(type==='vsopen'){if(!(HT_DEF[`${htSc.hero}_${htSc.opener}`]?.['call'].size>0))call.classList.add('hidden');}
  else if(type==='rfi_defense'){if(!(HT_DEF[`${htSc.hero}_${htSc.opp3bet}`]?.['call'].size>0))call.classList.add('hidden');}
  else if(type==='vsopen_4bet'){raise.classList.add('hidden');allin.classList.remove('hidden');}
  else if(type==='rfi_5bet'){raise.classList.add('hidden');}
  else if(type==='multiway'){if(!((MW_CALL[htSc.key]||new Set()).size>0))call.classList.add('hidden');}
}

function htRenderTable() {
  const sL=document.getElementById('ht-seats-layer'),cL=document.getElementById('ht-chips-layer'),com=document.getElementById('ht-community');
  const visualState=htVisualState||htGetFinalVisualState(htSc);
  const { type, hero } = htSc;
  const displayedBets=visualState.bets;
  sL.innerHTML='';cL.innerHTML='';com.innerHTML='';
  for(let i=0;i<5;i++) com.appendChild(htMakeBack());
  HT_ACTION_ORDER.forEach(pos=>{
    const isHero=pos===htSc.hero;
    // ── Determine SB and BB folded state per scenario ──
    let sbFolded=false, bbFolded=false;
    if(type==='multiway'){
      const { opener, second } = htParseMWKey(htSc.key);
      const involved=new Set([hero, opener, second]);
      sbFolded=!involved.has('SB');
      bbFolded=!involved.has('BB');
      if(hero==='SB'&&!involved.has('BB')) bbFolded=false;
    } else if(type==='rfi'){
      // SB/BB posted but haven't acted yet — neither is folded.
      sbFolded=false; bbFolded=false;
    } else if(type==='vsopen'||type==='vsopen_4bet'){
      // SB folds only when hero=BB (open → SB folds → BB decides).
      // BB is always active (they're the hero or opener).
      sbFolded=(hero==='BB'); bbFolded=false;
    } else if(type==='rfi_defense'||type==='rfi_5bet'){
      const opp3=htSc.opp3bet;
      if(opp3==='SB'){
        // SB 3-bet — active. BB folded to hero's original open.
        sbFolded=false; bbFolded=true;
      } else if(opp3==='BB'){
        // BB 3-bet — active. SB folded, unless hero=SB (then SB is hero, not folded).
        sbFolded=(hero!=='SB'); bbFolded=false;
      } else {
        // 3-bettor is HJ/CO/BTN — both SB and BB folded to hero's open.
        sbFolded=true; bbFolded=true;
      }
    }

    // ── Determine overall folded state for this position ──
    const folded=visualState.folded.has(pos);

    const seat=document.createElement('div');
    seat.className='ht-seat'+(folded?' ht-folded':'');
    seat.dataset.pos=pos;
    seat.style.left=HT_SEAT_POS[pos].x+'%';seat.style.top=HT_SEAT_POS[pos].y+'%';

    const cw=document.createElement('div');
    cw.className='ht-seat-cards '+(isHero?'ht-hero-cards ':'')+HT_CARD_DIR[pos];
    if(isHero){cw.appendChild(htMakeCard(htC1));cw.appendChild(htMakeCard(htC2));}
    else{cw.appendChild(htMakeBack());cw.appendChild(htMakeBack());}  // always render, folded seats just fade via CSS
    seat.appendChild(cw);

    const pw=document.createElement('div');pw.className='ht-pos-chip'+(isHero?' ht-hero':'');
    const pi=document.createElement('img');pi.src='positionlabel2.png';pw.appendChild(pi);
    const pl=document.createElement('div');pl.className='ht-pos-chip-label';pl.textContent=pos;pw.appendChild(pl);
    seat.appendChild(pw);
    sL.appendChild(seat);

    const cp=HT_CHIP_OFF[pos];
    let bet=displayedBets[pos];
    // SB posts 0.5, BB posts 1 — always show blind chips unless that position
    // is the active bettor in this hand (their action chip replaces the blind).
    const activeBettors=new Set([hero]);
    if(type==='vsopen'||type==='vsopen_4bet') activeBettors.add(htSc.opener);
    if(type==='rfi_defense'||type==='rfi_5bet') activeBettors.add(htSc.opp3bet);
    if(pos==='SB'&&!activeBettors.has('SB')) bet=0.5;
    if(pos==='BB'&&!activeBettors.has('BB')) bet=1;
    // Action chips (override blind if this position is an active bettor)
    if(type==='rfi'){
      // No action chips — just blinds above
    } else if(type==='vsopen'){
      if(pos===htSc.opener) bet=HT_RFI_OPEN[htSc.opener]||2.5;
    } else if(type==='rfi_defense'){
      const oppKey=`${htSc.opp3bet}_${hero}`;
      if(pos===hero) bet=HT_RFI_OPEN[hero]||2.5;
      if(pos===htSc.opp3bet) bet=HT_RD_3BET_SIZE[oppKey]||8;
    } else if(type==='vsopen_4bet'){
      const key=`${hero}_${htSc.opener}`;
      if(pos===hero) bet=HT_VO_3BET[key]||8;
      if(pos===htSc.opener) bet=HT_VO_4BET[key]||22;
    } else if(type==='rfi_5bet'){
      const key=`${hero}_${htSc.opp3bet}`;
      if(pos===hero) bet=HT_RD_3BET[key]||22;
      if(pos===htSc.opp3bet) bet=100;
    }

    bet=displayedBets[pos];
    if(bet!==undefined){
      const bc=document.createElement('div');bc.className='ht-bet-chip';
      bc.dataset.pos=pos;
      bc.style.left=cp.x+'%';bc.style.top=cp.y+'%';
      const bi=document.createElement('img');bi.src='chip.png';bc.appendChild(bi);
      const bv=document.createElement('div');bv.className='ht-chip-val';bv.textContent=bet;bc.appendChild(bv);
      cL.appendChild(bc);
    }
  });
  htSyncPotFromDisplayedChips();
}

function htMakeCard(card) {
  const el=document.createElement('div');el.className='ht-card';
  const bg=document.createElement('img');bg.className='ht-card-bg';bg.src=HT_SUIT_BG[card.suit];el.appendChild(bg);
  const face=document.createElement('div');face.className='ht-card-face';
  const rk=document.createElement('div');rk.className='ht-card-rank';rk.textContent=HT_RANK_DISP[card.rank];
  face.appendChild(rk);el.appendChild(face);return el;
}
function htMakeBack() {
  const el=document.createElement('div');el.className='ht-card';
  const bg=document.createElement('img');bg.className='ht-card-bg';bg.src='card4.png';el.appendChild(bg);return el;
}
function htMakeSmall(card) {
  const el=htMakeCard(card);el.style.width='38px';el.style.height='54px';
  el.querySelector('.ht-card-rank').style.fontSize='1.3rem';return el;
}

function htAction(action) {
  if(htAnswered||htIntroRunning) return;htAnswered=true;
  const ok=htCorrect.includes(action);
  if(ok)htStats.correct++;else htStats.wrong++;
  htUpdateStats();htAddInfo(action,ok);htShowResult(action,ok);
}

function htShowResult(action,ok) {
  document.getElementById('ht-result-icon').textContent=ok?'✓':'✗';
  const v=document.getElementById('ht-result-verdict');
  v.textContent=ok?'CORRECT':'INCORRECT';v.className='ht-result-verdict '+(ok?'correct':'wrong');
  const al=document.getElementById('ht-result-action');
  al.textContent={fold:'You folded',call:'You called',raise:'You raised',shove:'You went all-in'}[action]||`You ${action}`;
  al.className='ht-result-action '+action;
  const hd=document.getElementById('ht-result-hand');hd.innerHTML='';
  hd.appendChild(htMakeSmall(htC1));hd.appendChild(htMakeSmall(htC2));
  let detail='';
  const s=htSc;
  if(s.type==='rfi') detail=htCorrect[0]==='raise'?`${htHK} is in the ${s.hero} RFI range.`:`${htHK} is not in the ${s.hero} RFI range — fold.`;
  else if(s.type==='vsopen'){const k=`${s.hero}_${s.opener}`;detail=HT_DEF[k]?.['4bet'].has(htHK)?`${htHK} is a 3-bet vs ${s.opener}'s open.`:HT_DEF[k]?.['call'].has(htHK)?`${htHK} calls ${s.opener}'s open.`:`${htHK} folds vs ${s.opener}'s open.`;}
  else if(s.type==='rfi_defense'){const k=`${s.hero}_${s.opp3bet}`;detail=HT_DEF[k]?.['4bet'].has(htHK)?`${htHK} 4-bets vs ${s.opp3bet}'s 3-bet.`:HT_DEF[k]?.['call'].has(htHK)?`${htHK} calls the ${s.opp3bet} 3-bet.`:`${htHK} folds vs ${s.opp3bet}'s 3-bet.`;}
  else if(s.type==='vsopen_4bet'){const k=`${s.hero}_${s.opener}`;detail=HT_V5S[k]?.has(htHK)?`${htHK} 5-bet shoves vs ${s.opener}'s 4-bet.`:HT_V5C[k]?.has(htHK)?`${htHK} calls ${s.opener}'s 4-bet.`:`${htHK} folds vs ${s.opener}'s 4-bet.`;}
  else if(s.type==='rfi_5bet'){const k=`${s.hero}_${s.opp3bet}`;detail=HT_FBC[k]?.has(htHK)?`${htHK} calls the all-in shove.`:`${htHK} folds vs the all-in shove.`;}
  else if(s.type==='multiway'){const { opener, second } = htParseMWKey(s.key);detail=MW_SQUEEZE[s.key]?.has(htHK)?(s.mwType==='squeeze'?`${htHK} is a squeeze vs ${opener}'s open and ${second}'s call.`:`${htHK} is a 4-bet after ${opener} opened and ${second} re-raised.`):MW_CALL[s.key]?.has(htHK)?`${htHK} calls in the ${opener} + ${second} multi-way spot.`:`${htHK} folds in the ${opener} + ${second} multi-way spot.`;}
  document.getElementById('ht-result-detail').textContent=detail;
  const cv={fold:'fold',call:'call',raise:'raise',shove:'all-in'}[htCorrect[0]]||htCorrect[0];
  document.getElementById('ht-result-correct').innerHTML=ok?'':`Correct action: <strong>${cv}</strong>`;
  document.getElementById('ht-result-overlay').classList.add('show');
}

function htUpdateStats() {
  document.getElementById('ht-stat-correct').textContent=htStats.correct;
  document.getElementById('ht-stat-wrong').textContent=htStats.wrong;
  const t=htStats.correct+htStats.wrong;
  document.getElementById('ht-stat-pct').textContent=t>0?Math.round(htStats.correct/t*100)+'%':'—';
}
function htAddInfo(action,ok) {
  const bar=document.getElementById('ht-info-bar');
  const seg=document.createElement('div');
  const cls={fold:'ht-fold',call:'ht-call',raise:'ht-raise',shove:'ht-raise'}[action];
  seg.className=`ht-info-seg ${cls}`;
  seg.innerHTML=`<span class="value">${htSc.hero} ${htHK} ${ok?'✓':'✗'} ${action.toUpperCase()}</span>`;
  bar.appendChild(seg);
  setTimeout(()=>{bar.scrollLeft=bar.scrollWidth;},50);
}

let pftCurrentSolution = null;
let pftCurrentScenario = null;
let pftCardCode1 = '', pftCardCode2 = '';
let pftAnswered = false;
let pftHandLoading = false;
let pftIntroToken = 0;
let pftIntroRunning = false;
let pftVisualState = null;
let pftStats = { correct: 0, wrong: 0 };
let pftLastFetchMeta = null;
const PFT_POS_LABELS = { utg:'UTG', hj:'HJ', co:'CO', btn:'BTN', sb:'SB', bb:'BB' };
const PFT_POT_LABELS = { srp:'Single Raised Pot', '3bp':'3-Bet Pot', '4bp':'4-Bet Pot' };

function pftNormalizeAction(action) {
  const normalized = String(action || '').trim().toLowerCase();
  if (!normalized) return 'fold';
  if (normalized === 'check') return 'check';
  if (normalized === 'bet_33' || normalized === 'bet33' || normalized === 'bet 33%' || normalized === 'bet 33') return 'bet_33';
  if (normalized === 'bet_75' || normalized === 'bet75' || normalized === 'bet 75%' || normalized === 'bet 75') return 'bet_75';
  if (normalized === 'bet_125' || normalized === 'bet125' || normalized === 'bet 125%' || normalized === 'bet 125') return 'bet_125';
  if (normalized === 'raise_100' || normalized === 'raise100' || normalized.includes('raise')) return 'raise_100';
  if (normalized === 'jam' || normalized === 'allin' || normalized === 'all-in') return 'allin';
  if (normalized.includes('call')) return 'call';
  if (normalized.includes('fold')) return 'fold';
  return normalized;
}

function pftActionLabel(action) {
  return {
    check: 'Check',
    fold: 'Fold',
    call: 'Call',
    bet_33: 'Bet 33%',
    bet_75: 'Bet 75%',
    bet_125: 'Bet 125%',
    raise_100: 'Raise',
    allin: 'All-In'
  }[pftNormalizeAction(action)] || String(action || '').toUpperCase();
}

const PFT_ANALYSIS_ACTION_STYLE = {
  check: { label: 'Check', color: '#2db82d', border: '#1a7a1a' },
  bet_33: { label: 'Bet 33%', color: '#d4a800', border: '#8a6e00' },
  bet_75: { label: 'Bet 75%', color: '#e07820', border: '#9a4f14' },
  bet_125: { label: 'Bet 125%', color: '#d42020', border: '#8a0000' },
  fold: { label: 'Fold', color: '#3a5ca8', border: '#1a3a7a' },
  call: { label: 'Call', color: '#3a5ca8', border: '#1a3a7a' },
  raise_100: { label: 'Raise', color: '#b03060', border: '#7a1a40' },
  allin: { label: 'All In', color: '#8800cc', border: '#550088' }
};

function pftAnalysisStyle(action) {
  return PFT_ANALYSIS_ACTION_STYLE[pftNormalizeAction(action)] || PFT_ANALYSIS_ACTION_STYLE.fold;
}

function pftActionClass(action) {
  const normalized = pftNormalizeAction(action);
  if (normalized === 'fold') return 'fold';
  if (normalized === 'call' || normalized === 'check') return 'call';
  return 'raise';
}

function pftButtonClass(action) {
  const normalized = pftNormalizeAction(action);
  if (normalized === 'fold') return 'ht-btn-fold';
  if (normalized === 'call' || normalized === 'check') return 'ht-btn-call';
  return 'ht-btn-raise';
}

function pftFormatFreq(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0%';
  const pct = num <= 1 ? num * 100 : num;
  return `${Math.round(pct)}%`;
}

function pftFormatEv(ev) {
  const num = Number(ev);
  if (!Number.isFinite(num)) return 'EV unavailable';
  const rounded = Math.round(num * 100) / 100;
  return `EV ${rounded > 0 ? '+' : ''}${rounded.toFixed(2)}`;
}

function pftFormatActionEv(ev) {
  const num = Number(ev);
  if (!Number.isFinite(num)) return '0.00bb';
  return `${num.toFixed(2)}bb`;
}

function pftFormatAnalysisEv(ev) {
  if (ev === null || ev === undefined || ev === 'null') return '-';
  const num = Number(ev);
  if (!Number.isFinite(num)) return '-';
  return num.toFixed(2);
}

function pftFrequencyPercentValue(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  const pct = num <= 1 ? num * 100 : num;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

function pftFormatBetAmountBb(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num)) return '';
  return `${(Math.round(num * 10) / 10).toFixed(1)}bb`;
}

function pftFormatChipAmount(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num)) return '';
  return `${(Math.round(num * 10) / 10).toFixed(1).replace(/\.0$/, '')}`;
}

function pftGetPreflopBets(sc = pftCurrentScenario) {
  if (!sc) return {};
  const initialState = pftGetInitialVisualState();
  const bets = { ...(initialState && initialState.bets ? initialState.bets : {}) };
  pftGetActionSequence(sc).forEach(action => {
    const amount = Number(action.amount);
    if (Number.isFinite(amount)) bets[action.pos] = amount;
  });
  return bets;
}

function pftGetPostflopPotSize(sc = pftCurrentScenario) {
  const bets = pftGetPreflopBets(sc);
  const total = Object.values(bets).reduce((sum, amount) => sum + amount, 0);
  return Number.isFinite(total) && total > 0 ? total : 0;
}

function pftDeriveVillainBetSize(row) {
  const sizes = [
    { size: 0.33, freq: Number(row && row.bet_33_freq) },
    { size: 0.75, freq: Number(row && row.bet_75_freq) },
    { size: 1.25, freq: Number(row && row.bet_125_freq) }
  ];
  const validSizes = sizes.map(item => ({
    size: item.size,
    freq: Number.isFinite(item.freq) ? item.freq : -Infinity
  }));
  const best = validSizes.reduce((a, b) => (b.freq > a.freq ? b : a));
  return best.size;
}

function pftSanitizeVillainBetSize(villain_bet_size, row = pftCurrentSolution) {
  const betSize = (villain_bet_size === null || villain_bet_size === 'null' || villain_bet_size === undefined)
    ? pftDeriveVillainBetSize(row)
    : Number(villain_bet_size);
  return betSize === null || !Number.isFinite(betSize) ? null : betSize;
}

function pftGetVillainBetAmount() {
  const betSize = pftSanitizeVillainBetSize(pftCurrentSolution && pftCurrentSolution.villain_bet_size, pftCurrentSolution);
  if (betSize === null || betSize <= 0) return null;
  return pftGetFacingBetPotSize() * betSize;
}

function pftGetVillainPreflopBetAmount() {
  if (!pftCurrentScenario) return 0;
  const bets = pftCurrentScenario.decisionType === 'hero_facing_bet' ? pftGetFacingBetPreflopBets() : pftGetPreflopBets();
  const amount = Number(bets[pftCurrentScenario.villain]);
  return Number.isFinite(amount) ? amount : 0;
}

function pftGetCurrentSpotName() {
  return String(pftCurrentSolution && pftCurrentSolution.spot_name || '');
}

function pftGetSpotPreflopRoles(spotName = pftGetCurrentSpotName()) {
  const parts = String(spotName || '').toLowerCase().split('-').filter(Boolean);
  const positions = pftExtractPositions(spotName);
  const openIndex = parts.findIndex(part => part === 'open' || part === 'opened');
  const openerKey = openIndex > 0 ? parts[openIndex - 1] : '';
  const opener = PFT_POS_LABELS[openerKey] || positions[0] || '';
  const opponent = positions.find(pos => pos !== opener) || positions[1] || '';
  return { opener, opponent };
}

function pftGetFacingBetPreflopBets() {
  const spotName = pftGetCurrentSpotName();
  const kind = pftDetectScenarioKind(spotName);
  const { opener, opponent } = pftGetSpotPreflopRoles(spotName);
  const initialState = pftGetInitialVisualState();
  const bets = { ...(initialState && initialState.bets ? initialState.bets : {}) };
  const openAmount = HT_RFI_OPEN[opener] || 2.5;

  if (opener) bets[opener] = openAmount;
  if (kind === 'srp') {
    if (opponent) bets[opponent] = openAmount;
  } else if (kind === '3bet') {
    const threeBetAmount = opponent && opener ? htGet3BetSize(opponent, opener) : 8;
    if (opener) bets[opener] = threeBetAmount;
    if (opponent) bets[opponent] = threeBetAmount;
  } else {
    return pftGetPreflopBets();
  }

  return bets;
}

function pftGetFacingBetPotSize() {
  const bets = pftGetFacingBetPreflopBets();
  const total = Object.values(bets).reduce((sum, amount) => sum + (Number(amount) || 0), 0);
  return Number.isFinite(total) && total > 0 ? total : pftGetPostflopPotSize();
}

function pftDescribeVillainBetSize(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  const num = Number(value);
  return Number.isFinite(num) ? `valid number ${num}` : `invalid ${typeof value} value ${value}`;
}

function pftLogRawFacingBetRow(row) {
  if (!row || pftGetSpotDecisionType(row.spot_name) !== 'hero_facing_bet') return;
  console.log('raw hand_solutions row before processing:', row);
  console.log('spot_name from hand_solutions:', row.spot_name);
  console.log('villain_bet_size raw value:', row.villain_bet_size);
  console.log('villain_bet_size typeof:', typeof row.villain_bet_size);
  console.log('villain_bet_size diagnosis:', pftDescribeVillainBetSize(row.villain_bet_size));
  if (row.villain_bet_size === null) {
    console.log(`villain_bet_size is null in database for spot ${row.spot_name}`);
  } else if (String(row.villain_bet_size).toLowerCase() === 'null') {
    console.log(`villain_bet_size is the string "null" in database for spot ${row.spot_name}`);
  }
}

function pftLogFacingBetPotDiagnostics(row) {
  if (!row || !pftCurrentScenario || pftCurrentScenario.decisionType !== 'hero_facing_bet') return;
  const roles = pftGetSpotPreflopRoles(row.spot_name);
  const kind = pftDetectScenarioKind(row.spot_name);
  const bets = pftGetFacingBetPreflopBets();
  const pot = pftGetFacingBetPotSize();
  const villainBet = pftGetVillainBetAmount();
  console.log('hero_facing_bet pot derivation:', {
    spot_name: row.spot_name,
    pot_type: kind,
    parsed_roles: roles,
    preflop_contributions: bets,
    calculated_pot_bb: pot,
    villain_bet_size: row.villain_bet_size,
    villain_bet_bb: villainBet
  });
}

function pftFormatVillainBetPercent() {
  const betSize = pftSanitizeVillainBetSize(pftCurrentSolution && pftCurrentSolution.villain_bet_size, pftCurrentSolution);
  if (betSize === null || betSize <= 0) return '';
  return `${Math.round(betSize * 100)}%`;
}

function pftGetActionDisplayLabel(action) {
  const normalized = pftNormalizeAction(action);
  const pot = pftGetPostflopPotSize();
  if (normalized === 'bet_33') return `Bet ${pftFormatBetAmountBb(pot * 0.33)}`;
  if (normalized === 'bet_75') return `Bet ${pftFormatBetAmountBb(pot * 0.75)}`;
  if (normalized === 'bet_125') return `Bet ${pftFormatBetAmountBb(pot * 1.25)}`;
  if (normalized === 'call' && pftCurrentScenario && pftCurrentScenario.decisionType === 'hero_facing_bet') {
    const villainBet = pftGetVillainBetAmount();
    return `Call ${pftFormatBetAmountBb(villainBet)}`;
  }
  if (normalized === 'raise_100') {
    const villainBet = pftGetVillainBetAmount();
    const pot = pftGetFacingBetPotSize();
    return `Bet ${pftFormatBetAmountBb(villainBet + pot)}`;
  }
  return pftActionLabel(normalized);
}

function pftChunkHand(hand) {
  return String(hand || '').match(/.{1,2}/g) || [];
}

function pftParseHand(hand) {
  const parts = pftChunkHand(hand);
  if (parts.length !== 2 || parts.some(part => part.length !== 2)) return null;
  const [r1, s1] = parts[0].split('');
  const [r2, s2] = parts[1].split('');
  return [
    { rank: r1.toUpperCase(), suit: s1.toLowerCase() },
    { rank: r2.toUpperCase(), suit: s2.toLowerCase() }
  ];
}

function pftParseBoard(board) {
  const parts = pftChunkHand(board);
  if (parts.length !== 3 || parts.some(part => part.length !== 2)) return null;
  return parts.map(part => ({
    rank: part[0].toUpperCase(),
    suit: part[1].toLowerCase()
  }));
}

function pftExactCardTokens(text) {
  return [...String(text || '').matchAll(/([2-9TJQKA][cdhs])/ig)].map(match => match[1]);
}

function pftBuildCardsFromRanks(rankString) {
  const suits = ['s','h','d','c','s'];
  return rankString.split('').map((rank, index) => ({
    rank: rank.toUpperCase(),
    suit: suits[index % suits.length]
  }));
}

function pftExtractBoardCards(spotName) {
  const exact = pftExactCardTokens(spotName)
    .slice(0, 5)
    .map(token => ({ rank: token[0].toUpperCase(), suit: token[1].toLowerCase() }));
  if (exact.length >= 3) return exact;

  const boardMatch = String(spotName || '').match(/\b(?:flop|turn|river|board)[^2-9TJQKA]*([2-9TJQKA]{3,5})\b/i);
  if (boardMatch) return pftBuildCardsFromRanks(boardMatch[1]).slice(0, 5);

  const rankRun = [...String(spotName || '').matchAll(/\b([2-9TJQKA]{3,5})\b/ig)]
    .map(match => match[1])
    .find(token => token.length >= 3);
  if (rankRun) return pftBuildCardsFromRanks(rankRun).slice(0, 5);

  return [];
}

function pftExtractPositions(spotName) {
  const seen = new Set();
  const positions = [];
  for (const match of String(spotName || '').matchAll(/\b(UTG|HJ|CO|BTN|SB|BB)\b/ig)) {
    const pos = match[1].toUpperCase();
    if (!seen.has(pos)) {
      seen.add(pos);
      positions.push(pos);
    }
  }
  return positions;
}

function pftDetectScenarioKind(spotName) {
  const text = String(spotName || '').toLowerCase();
  if (/(4bet|4-bet|4bp)/.test(text)) return '4bet';
  if (/(3bet|3-bet|3bp)/.test(text)) return '3bet';
  return 'srp';
}

function pftGetSpotDecisionType(spotName) {
  const text = String(spotName || '').trim().toLowerCase();
  if (text.endsWith('hero_facing_bet')) return 'hero_facing_bet';
  if (text.endsWith('hero_betting')) return 'hero_betting';
  return 'hero_facing_bet';
}

function pftParseScenarioText(spotName) {
  const parts = String(spotName || '').toLowerCase().split('-').filter(Boolean);
  const heroKey = parts[0] || 'btn';
  const vsIndex = parts.indexOf('vs');
  const villainKey = vsIndex >= 0 ? parts[vsIndex + 1] : 'bb';
  const potKey = parts.find(part => PFT_POT_LABELS[part]) || 'srp';
  const decisionType = pftGetSpotDecisionType(spotName);
  const heroPos = PFT_POS_LABELS[heroKey] || heroKey.toUpperCase();
  const villainPos = PFT_POS_LABELS[villainKey] || villainKey.toUpperCase();
  const potLabel = PFT_POT_LABELS[potKey] || potKey.toUpperCase();
  const decisionLabel = decisionType === 'hero_betting' ? 'You are betting' : 'You are facing a bet';
  return {
    heroPos,
    villainPos,
    potKey,
    decisionType,
    displayText: `${heroPos} vs ${villainPos} - ${potLabel} - ${decisionLabel}`
  };
}

function pftBuildScenario(row) {
  const parsed = pftParseScenarioText(row.spot_name);
  const positions = pftExtractPositions(row.spot_name);
  const hero = parsed.heroPos || positions[0] || 'BTN';
  const villain = parsed.villainPos || positions.find(pos => pos !== hero) || (hero === 'BTN' ? 'BB' : 'BTN');
  const ordered = [hero, villain].sort((a, b) => HT_ACTION_ORDER.indexOf(a) - HT_ACTION_ORDER.indexOf(b));
  const opener = ordered[0];
  const caller = ordered[1];
  const kind = pftDetectScenarioKind(row.spot_name);
  const board = Array.isArray(row.board) ? row.board : pftExtractBoardCards(row.spot_name);
  const threebettor = kind === '3bet' || kind === '4bet' ? caller : null;
  const fourbettor = kind === '4bet' ? opener : null;
  return {
    hero,
    villain,
    opener,
    caller,
    threebettor,
    fourbettor,
    kind,
    board,
    decisionType: parsed.decisionType,
    displayText: parsed.displayText,
    streetLabel: parsed.decisionType === 'hero_betting' ? 'Decision: betting' : 'Decision: facing bet'
  };
}

function pftShowDebugError(message) {
  const el = document.getElementById('pft-debug');
  if (!el) return;
  if (!message) {
    el.style.display = 'none';
    el.textContent = '';
    return;
  }
  el.style.display = 'block';
  el.textContent = message;
}

async function pftFetchRandomSolution() {
  if (!supabaseClient) throw new Error('Supabase client not initialised');
  pftLastFetchMeta = null;

  const { count, error: countError } = await supabaseClient
    .from('hand_solutions')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Supabase error:', countError);
    throw new Error(`Supabase error: ${countError.message || JSON.stringify(countError)}${countError.details ? ` | ${countError.details}` : ''}${countError.code ? ` | code ${countError.code}` : ''}`);
  }

  if (!count || count < 1) {
    throw new Error('Supabase error: hand_solutions returned a count of 0');
  }

  const randomOffset = Math.floor(Math.random() * count);
  pftLastFetchMeta = { count, randomOffset };
  const { data, error } = await supabaseClient
    .from('hand_solutions')
    .select('*')
    .range(randomOffset, randomOffset);

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Supabase error: ${error.message || JSON.stringify(error)}${error.details ? ` | ${error.details}` : ''}${error.code ? ` | code ${error.code}` : ''}`);
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row) {
    throw new Error(`Supabase error: no row returned at offset ${randomOffset}`);
  }

  return row;
}

async function pftFetchBoardForSpot(spotName) {
  if (!supabaseClient) throw new Error('Supabase client not initialised');
  console.log('querying spot_boards for:', spotName);
  const { data, error } = await supabaseClient
    .from('spot_boards')
    .select('board')
    .eq('spot_name', spotName)
    .limit(1);

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Supabase error: ${error.message || JSON.stringify(error)}${error.details ? ` | ${error.details}` : ''}${error.code ? ` | code ${error.code}` : ''}`);
  }

  if (!Array.isArray(data) || data.length < 1 || !data[0] || !data[0].board) {
    throw new Error(`Supabase error: no board found for spot ${spotName}`);
  }

  return data[0].board;
}

function pftSetStatus(message, tone='ready') {
  const el = document.getElementById('pft-status');
  if (!el) return;
  el.textContent = '';
  el.className = `pft-status ${tone}`.trim();
}

function pftUpdateStats() {
  document.getElementById('pft-stat-correct').textContent = pftStats.correct;
  document.getElementById('pft-stat-wrong').textContent = pftStats.wrong;
  const total = pftStats.correct + pftStats.wrong;
  document.getElementById('pft-stat-pct').textContent = total > 0 ? `${Math.round((pftStats.correct / total) * 100)}%` : '--';
}

function pftGetActionConfig() {
  const betting = pftCurrentScenario && pftCurrentScenario.decisionType === 'hero_betting';
  return betting
    ? [
        { key: 'check', label: 'Check', freqKey: 'check_freq', evKey: 'check_ev' },
        { key: 'bet_33', label: pftGetActionDisplayLabel('bet_33'), freqKey: 'bet_33_freq', evKey: 'bet_33_ev' },
        { key: 'bet_75', label: pftGetActionDisplayLabel('bet_75'), freqKey: 'bet_75_freq', evKey: 'bet_75_ev' },
        { key: 'bet_125', label: pftGetActionDisplayLabel('bet_125'), freqKey: 'bet_125_freq', evKey: 'bet_125_ev' }
      ]
    : [
        { key: 'fold', label: 'Fold', freqKey: 'fold_freq', evKey: 'fold_ev' },
        { key: 'call', label: pftGetActionDisplayLabel('call'), freqKey: 'call_freq', evKey: 'call_ev' },
        { key: 'raise_100', label: pftGetActionDisplayLabel('raise_100'), freqKey: 'raise_100_freq', evKey: 'raise_100_ev' }
      ];
}

function pftGetFrequencyConfig() {
  const config = [...pftGetActionConfig()];
  const allinFreq = Number(pftCurrentSolution && pftCurrentSolution.allin_freq);
  if (pftCurrentScenario && pftCurrentScenario.decisionType === 'hero_facing_bet' && Number.isFinite(allinFreq) && allinFreq > 0) {
    config.push({ key: 'allin', label: 'All In', freqKey: 'allin_freq', evKey: 'allin_ev' });
  }
  return config;
}

function pftGetBestActionForCurrentSpot(config = pftGetFrequencyConfig()) {
  const allowed = new Set(config.map(item => item.key));
  const bestAction = pftNormalizeAction(pftCurrentSolution && pftCurrentSolution.best_action);
  if (allowed.has(bestAction)) return bestAction;
  return config.reduce((best, item) => {
    const freq = Number(pftCurrentSolution && pftCurrentSolution[item.freqKey]);
    const bestFreq = Number(pftCurrentSolution && pftCurrentSolution[best.freqKey]);
    return (Number.isFinite(freq) ? freq : -Infinity) > (Number.isFinite(bestFreq) ? bestFreq : -Infinity) ? item : best;
  }, config[0]).key;
}

function pftSetActionLegend(config) {
  const legend = document.getElementById('pft-ib-actions');
  if (!legend || !Array.isArray(config)) return;
  legend.textContent = config.map(item => item.label).join(' / ');
}

function pftSetChoiceNote() {
  const note = document.querySelector('#screen-postflop-trainer .pft-choice-note');
  if (!note) return;
  if (pftCurrentScenario && pftCurrentScenario.decisionType === 'hero_facing_bet') {
    const pct = pftFormatVillainBetPercent();
    note.textContent = pct ? `Villain bets ${pct} pot` : 'Villain bets';
  } else {
    note.textContent = 'Choose the best GTO action';
  }
}

function pftRenderActionButtons() {
  const config = pftGetActionConfig();
  const bar = document.getElementById('pft-action-bar');
  pftSetActionLegend(config);
  pftSetChoiceNote();
  if (!bar) return;
  bar.innerHTML = '';
  config.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = `ht-action-btn ${pftButtonClass(item.key)}`;
    btn.id = `pft-btn-${index}`;
    btn.textContent = item.label;
    btn.dataset.action = item.key;
    btn.onclick = () => pftAction(item.key);
    bar.appendChild(btn);
  });
}

function pftParseCardCode(code) {
  const value = String(code || '').trim();
  if (value.length !== 2) return null;
  return { rank: value[0].toUpperCase(), suit: value[1].toLowerCase() };
}

function pftMakeCardNode(code, small = false) {
  const parsed = pftParseCardCode(code);
  if (!parsed) return htMakeBack();
  const fallback = small ? htMakeSmall(parsed) : htMakeCard(parsed);
  const el = document.createElement('div');
  el.className = fallback.className;
  if (small) {
    el.style.width = '38px';
    el.style.height = '54px';
  }
  const img = document.createElement('img');
  img.src = `${code}.png`;
  img.alt = code;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.onerror = () => el.replaceWith(fallback);
  el.appendChild(img);
  return el;
}

function pftSetActionBarVisible(isVisible) {
  document.getElementById('pft-action-bar').classList.toggle('ht-hidden', !isVisible);
}

function pftSyncPotFromDisplayedChips() {
  const pot = [...document.querySelectorAll('#pft-chips-layer .ht-chip-val')]
    .reduce((sum, chip) => sum + (parseFloat(chip.textContent) || 0), 0);
  document.getElementById('pft-pot-amount').textContent = pftFormatChipAmount(pot);
}

function pftFindSeat(pos) {
  return document.querySelector(`#pft-seats-layer .ht-seat[data-pos="${pos}"]`);
}

function pftFindChip(pos) {
  return document.querySelector(`#pft-chips-layer .ht-bet-chip[data-pos="${pos}"]`);
}

function pftEnsureBetChip(pos) {
  const chipsLayer = document.getElementById('pft-chips-layer');
  let chip = pftFindChip(pos);
  if (chip || !chipsLayer) return chip;
  chip = document.createElement('div');
  chip.className = 'ht-bet-chip';
  chip.dataset.pos = pos;
  chip.style.left = (HT_CHIP_OFF[pos] ? HT_CHIP_OFF[pos].x : 50) + '%';
  chip.style.top = (HT_CHIP_OFF[pos] ? HT_CHIP_OFF[pos].y : 50) + '%';
  const img = document.createElement('img');
  img.src = 'chip.png';
  chip.appendChild(img);
  const val = document.createElement('div');
  val.className = 'ht-chip-val';
  chip.appendChild(val);
  chipsLayer.appendChild(chip);
  return chip;
}

function pftSetDisplayedBet(pos, amount) {
  let chip = pftFindChip(pos);
  if (amount === undefined) {
    if (chip) chip.remove();
    pftSyncPotFromDisplayedChips();
    return;
  }
  chip = pftEnsureBetChip(pos);
  if (!chip) return;
  chip.querySelector('.ht-chip-val').textContent = pftFormatChipAmount(amount);
  pftSyncPotFromDisplayedChips();
}

function pftDisplayVillainBetSize() {
  if (!pftCurrentScenario || pftCurrentScenario.decisionType !== 'hero_facing_bet') return;
  const villainBet = pftGetVillainBetAmount();
  const chip = pftEnsureBetChip(pftCurrentScenario.villain);
  if (!chip) return;
  const value = chip.querySelector('.ht-chip-val');
  if (value) value.textContent = pftFormatChipAmount(villainBet + pftGetVillainPreflopBetAmount());
}

function pftGetInitialVisualState() {
  return { bets: { SB: 0.5, BB: 1 }, folded: new Set() };
}

function pftGetActionSequence(sc) {
  const actions = [];
  const openAmount = HT_RFI_OPEN[sc.opener] || 2.5;
  const threeBetAmount = sc.threebettor ? (htGet3BetSize(sc.threebettor, sc.opener) || 8) : null;
  const push = (pos, action, amount) => actions.push({ pos, action, amount });
  const openerIdx = HT_ACTION_ORDER.indexOf(sc.opener);
  const callerIdx = HT_ACTION_ORDER.indexOf(sc.caller);

  if (sc.kind === 'srp') {
    for (let i = 0; i < callerIdx; i++) {
      const pos = HT_ACTION_ORDER[i];
      if (pos === sc.opener) push(pos, 'raise', openAmount);
      else push(pos, 'fold');
    }
    if (sc.caller !== sc.opener) push(sc.caller, 'call', openAmount);
    for (let i = callerIdx + 1; i < HT_ACTION_ORDER.length; i++) {
      push(HT_ACTION_ORDER[i], 'fold');
    }
    return actions;
  }

  for (let i = 0; i < HT_ACTION_ORDER.length; i++) {
    const pos = HT_ACTION_ORDER[i];
    if (i < openerIdx) push(pos, 'fold');
    else if (pos === sc.opener) push(pos, 'raise', openAmount);
    else if (pos === sc.threebettor) push(pos, 'raise', threeBetAmount);
    else if (i < HT_ACTION_ORDER.indexOf(sc.threebettor)) push(pos, 'fold');
    else if (i > HT_ACTION_ORDER.indexOf(sc.threebettor)) push(pos, 'fold');
  }

  if (sc.kind === '3bet') {
    push(sc.opener, 'call', threeBetAmount);
  } else if (sc.kind === '4bet') {
    const fourBetAmount = HT_VO_4BET[`${sc.threebettor}_${sc.opener}`] || HT_VO_4BET[`${sc.opener}_${sc.threebettor}`] || 22;
    push(sc.opener, 'raise', fourBetAmount);
    push(sc.threebettor, 'call', fourBetAmount);
  }

  return actions;
}

function pftRenderBoard(cards, hidden = false) {
  const community = document.getElementById('pft-community');
  community.innerHTML = '';
  community.className = `ht-community${hidden ? ' pft-board-hidden' : ''}`;
  cards.forEach(card => {
    const code = `${card.rank}${card.suit}`;
    community.appendChild(pftMakeCardNode(code));
  });
}

function pftRenderTable() {
  const seatsLayer = document.getElementById('pft-seats-layer');
  const chipsLayer = document.getElementById('pft-chips-layer');
  const visualState = pftVisualState || pftGetInitialVisualState();
  seatsLayer.innerHTML = '';
  chipsLayer.innerHTML = '';
  pftRenderBoard(pftCurrentScenario.board, true);

  HT_ACTION_ORDER.forEach(pos => {
    const seat = document.createElement('div');
    seat.className = 'ht-seat' + (visualState.folded.has(pos) ? ' ht-folded' : '');
    seat.dataset.pos = pos;
    seat.style.left = HT_SEAT_POS[pos].x + '%';
    seat.style.top = HT_SEAT_POS[pos].y + '%';

    const cardsWrap = document.createElement('div');
    cardsWrap.className = 'ht-seat-cards ' + (pos === pftCurrentScenario.hero ? 'ht-hero-cards ' : '') + HT_CARD_DIR[pos];
    if (pos === pftCurrentScenario.hero) {
      cardsWrap.appendChild(pftMakeCardNode(pftCardCode1));
      cardsWrap.appendChild(pftMakeCardNode(pftCardCode2));
    } else {
      cardsWrap.appendChild(htMakeBack());
      cardsWrap.appendChild(htMakeBack());
    }
    seat.appendChild(cardsWrap);

    const chip = document.createElement('div');
    chip.className = 'ht-pos-chip' + (pos === pftCurrentScenario.hero ? ' ht-hero' : '');
    const chipImg = document.createElement('img');
    chipImg.src = pos === pftCurrentScenario.hero ? 'inpositionlabel2.png' : 'positionlabel2.png';
    chip.appendChild(chipImg);
    const label = document.createElement('div');
    label.className = 'ht-pos-chip-label';
    label.textContent = pos;
    chip.appendChild(label);
    seat.appendChild(chip);
    seatsLayer.appendChild(seat);

    if (visualState.bets[pos] !== undefined) pftSetDisplayedBet(pos, visualState.bets[pos]);
  });

  pftSyncPotFromDisplayedChips();
}

async function pftAnimateBetAction(action, token) {
  const wrap = document.getElementById('pft-table-wrap');
  const flying = document.createElement('div');
  flying.className = 'ht-flying-chip';
  flying.dataset.pos = action.pos;
  flying.style.left = HT_SEAT_POS[action.pos].x + '%';
  flying.style.top = HT_SEAT_POS[action.pos].y + '%';
  const img = document.createElement('img');
  img.src = 'chip.png';
  flying.appendChild(img);
  const val = document.createElement('div');
  val.className = 'ht-chip-val';
  val.textContent = pftFormatChipAmount(action.amount);
  flying.appendChild(val);
  wrap.appendChild(flying);
  void flying.offsetWidth;
  flying.style.opacity = '1';
  flying.style.left = HT_CHIP_OFF[action.pos].x + '%';
  flying.style.top = HT_CHIP_OFF[action.pos].y + '%';
  flying.style.transform = 'translate(-50%,-50%) scale(1)';
  await htWait(HT_INTRO_STEP_MS);
  if (token !== pftIntroToken) { flying.remove(); return; }
  pftVisualState.bets[action.pos] = action.amount;
  pftSetDisplayedBet(action.pos, action.amount);
  flying.style.opacity = '0';
  await htWait(80);
  flying.remove();
}

async function pftAnimateFoldAction(action, token) {
  const seat = pftFindSeat(action.pos);
  if (!seat) return;
  pftVisualState.folded.add(action.pos);
  seat.classList.add('ht-folded');
  await htWait(HT_INTRO_STEP_MS);
  if (token !== pftIntroToken) return;
}

async function pftRevealBoard(token) {
  const community = document.getElementById('pft-community');
  community.className = 'ht-community pft-board-deal';
  await htWait(520);
  if (token !== pftIntroToken) return;
  community.className = 'ht-community';
  document.getElementById('pft-ib-stage').textContent = pftCurrentScenario.streetLabel.toUpperCase();
  pftSetStatus(pftCurrentScenario.displayText, 'revealed');
}

async function pftPlayIntro(token) {
  const actions = pftGetActionSequence(pftCurrentScenario);
  pftIntroRunning = true;
  await htWait(HT_INTRO_START_DELAY_MS);
  if (token !== pftIntroToken) return;
  for (const action of actions) {
    if (token !== pftIntroToken) return;
    if (action.action === 'fold') await pftAnimateFoldAction(action, token);
    else await pftAnimateBetAction(action, token);
    if (token !== pftIntroToken) return;
    await htWait(HT_INTRO_GAP_MS);
  }
  if (token !== pftIntroToken) return;
  pftRenderBoard(pftCurrentScenario.board, false);
  await pftRevealBoard(token);
  if (token !== pftIntroToken) return;
  pftDisplayVillainBetSize();
  pftIntroRunning = false;
  pftSetActionBarVisible(true);
}

function pftAddInfo(action, ok) {
  const bar = document.getElementById('pft-info-bar');
  const seg = document.createElement('div');
  const normalized = pftNormalizeAction(action);
  const labelByKey = Object.fromEntries(pftGetActionConfig().map(item => [item.key, item.label]));
  const cls = { fold: 'ht-fold', call: 'ht-call', raise: 'ht-raise' }[pftActionClass(normalized)] || 'ht-raise';
  seg.className = `ht-info-seg ${cls}`;
  seg.innerHTML = `<span class="value">${pftCurrentSolution.hand} ${ok ? 'OK' : 'X'} ${(labelByKey[normalized] || pftActionLabel(normalized)).toUpperCase()}</span>`;
  bar.appendChild(seg);
  setTimeout(() => { bar.scrollLeft = bar.scrollWidth; }, 50);
}

function pftShowResult(action, ok) {
  const actionConfig = pftGetActionConfig();
  const frequencyConfig = pftGetFrequencyConfig();
  const bestAction = pftGetBestActionForCurrentSpot(frequencyConfig);
  const labelByKey = Object.fromEntries(frequencyConfig.map(item => [item.key, item.label]));
  document.getElementById('pft-result-icon').textContent = ok ? 'OK' : 'NO';
  const verdict = document.getElementById('pft-result-verdict');
  verdict.textContent = ok ? 'CORRECT' : 'INCORRECT';
  verdict.className = `ht-result-verdict ${ok ? 'correct' : 'wrong'}`;

  const actionEl = document.getElementById('pft-result-action');
  actionEl.textContent = `You chose ${labelByKey[action] || pftActionLabel(action)}`;
  actionEl.className = `ht-result-action ${pftActionClass(action)}`;

  const handEl = document.getElementById('pft-result-hand');
  handEl.innerHTML = '';
  handEl.appendChild(pftMakeCardNode(pftCardCode1));
  handEl.appendChild(pftMakeCardNode(pftCardCode2));

  document.getElementById('pft-result-detail').textContent = `${pftCurrentScenario.displayText} - ${pftFormatEv(pftCurrentSolution.ev)}`;
  document.getElementById('pft-result-correct').innerHTML = ok
    ? `<strong>Correct.</strong> ${labelByKey[bestAction] || pftActionLabel(bestAction)} was best.`
    : `<strong>Incorrect.</strong> Best action: <strong>${labelByKey[bestAction] || pftActionLabel(bestAction)}</strong>`;

  const frequencies = frequencyConfig.map(item => ({
    key: item.key,
    label: pftAnalysisStyle(item.key).label,
    value: pftCurrentSolution[item.freqKey],
    ev: pftCurrentSolution[item.evKey]
  }));
  if (pftCurrentScenario && pftCurrentScenario.decisionType === 'hero_facing_bet') {
    console.log('postflop result raw Supabase row:', pftCurrentSolution);
    console.log('postflop result spot_type:', pftCurrentScenario.decisionType);
    console.log('fold_freq:', pftCurrentSolution && pftCurrentSolution.fold_freq, 'call_freq:', pftCurrentSolution && pftCurrentSolution.call_freq, 'raise_100_freq:', pftCurrentSolution && pftCurrentSolution.raise_100_freq);
    console.log('fold_ev:', pftCurrentSolution && pftCurrentSolution.fold_ev, 'call_ev:', pftCurrentSolution && pftCurrentSolution.call_ev, 'raise_100_ev:', pftCurrentSolution && pftCurrentSolution.raise_100_ev);
    console.log('hero_facing_bet raw best_action:', pftCurrentSolution && pftCurrentSolution.best_action);
    console.log('ENTERING HERO_FACING_BET STATS BRANCH');
    console.log('action objects:', JSON.stringify(frequencies));
  } else {
    console.log('postflop result raw Supabase row:', pftCurrentSolution);
    console.log('postflop result spot_type:', pftCurrentScenario && pftCurrentScenario.decisionType);
    console.log('check_freq:', pftCurrentSolution && pftCurrentSolution.check_freq, 'bet_33_freq:', pftCurrentSolution && pftCurrentSolution.bet_33_freq, 'bet_75_freq:', pftCurrentSolution && pftCurrentSolution.bet_75_freq, 'bet_125_freq:', pftCurrentSolution && pftCurrentSolution.bet_125_freq);
    console.log('check_ev:', pftCurrentSolution && pftCurrentSolution.check_ev, 'bet_33_ev:', pftCurrentSolution && pftCurrentSolution.bet_33_ev, 'bet_75_ev:', pftCurrentSolution && pftCurrentSolution.bet_75_ev, 'bet_125_ev:', pftCurrentSolution && pftCurrentSolution.bet_125_ev);
    console.log('hero_betting raw best_action:', pftCurrentSolution && pftCurrentSolution.best_action);
    console.log('ENTERING HERO_BETTING STATS BRANCH');
    console.log('action objects:', JSON.stringify(frequencies));
  }
  const list = document.getElementById('pft-result-frequencies');
  list.innerHTML = '';
  frequencies.forEach(freq => {
    const normalized = pftNormalizeAction(freq.key);
    const style = pftAnalysisStyle(normalized);
    const isBest = normalized === bestAction;
    const isChosen = normalized === pftNormalizeAction(action);
    const isWrongChoice = isChosen && !ok;
    const optionBg = isWrongChoice ? '#c07070' : (isBest ? style.color : '#444455');
    const optionBorder = isWrongChoice ? '#8a3030' : (isBest ? style.border : '#333344');
    const frequencyColor = isBest ? style.color : '#555566';
    const pct = pftFrequencyPercentValue(freq.value);
    const row = document.createElement('div');
    row.className = `pft-analysis-row${isBest ? ' best' : ''}${isChosen ? ' chosen' : ''}`;
    row.style.setProperty('--pft-option-bg', optionBg);
    row.style.setProperty('--pft-option-border', optionBorder);
    row.style.setProperty('--pft-action-color', style.color);
    row.style.setProperty('--pft-action-border', style.border);
    row.style.setProperty('--pft-frequency-color', frequencyColor);
    row.style.setProperty('--pft-frequency-width', `${pct}%`);
    row.innerHTML = `
      <div class="pft-option-cell">${freq.label}</div>
      <div class="pft-frequency-cell">
        <div class="pft-frequency-fill"></div>
        <span class="pft-frequency-percent">${pct}%</span>
      </div>
      <div class="pft-ev-cell${isBest ? ' best' : ''}${isWrongChoice ? ' wrong' : ''}">${pftFormatAnalysisEv(freq.ev)}</div>
    `;
    list.appendChild(row);
  });

  document.getElementById('pft-result-meta').innerHTML = `<strong>${ok ? 'Correct.' : 'Incorrect.'}</strong> Green highlight marks the solver's best action.`;
  document.getElementById('pft-result-overlay').classList.add('show');
}

async function startPostflopTrainer() {
  pftStats = { correct: 0, wrong: 0 };
  pftUpdateStats();
  pftIntroToken++;
  showScreen('screen-postflop-trainer');
  pftShowDebugError('');
  await pftNextHand();
}

async function pftNextHand() {
  pftIntroToken++;
  const token = pftIntroToken;
  let solution = null;
  pftAnswered = false;
  pftHandLoading = true;
  pftIntroRunning = false;
  document.getElementById('pft-result-overlay').classList.remove('show');
  document.getElementById('pft-ib-stage').textContent = 'BUILDING PREFLOP';
  pftSetStatus('Loading random hand...', 'ready');
  pftShowDebugError('');
  pftSetActionBarVisible(false);

  try {
    solution = await pftFetchRandomSolution();
    pftLogRawFacingBetRow(solution);
    console.log('spot_name from hand_solutions:', solution.spot_name);
    const boardCode = await pftFetchBoardForSpot(solution.spot_name);

    const cards = pftParseHand(solution.hand);
    if (!cards) throw new Error(`Invalid hand value: ${solution.hand}`);
    const boardCards = pftParseBoard(boardCode);
    if (!boardCards) throw new Error(`Invalid board value: ${boardCode}`);

    pftCurrentSolution = solution;
    pftCurrentScenario = pftBuildScenario({ ...solution, board: boardCards });
    if (pftCurrentScenario.decisionType === 'hero_facing_bet') {
      console.log('villain_bet_size from hand_solutions:', solution.villain_bet_size);
      pftLogFacingBetPotDiagnostics(solution);
    }
    [pftCardCode1, pftCardCode2] = pftChunkHand(solution.hand);
    pftVisualState = pftGetInitialVisualState();
    pftRenderActionButtons();
    pftRenderTable();
    pftSetStatus(pftCurrentScenario.displayText, 'ready');
    pftHandLoading = false;
    void pftPlayIntro(token);
  } catch (error) {
    console.error('Failed to load postflop hand:', error);
    pftCurrentSolution = null;
    pftCurrentScenario = null;
    pftHandLoading = false;
    pftSetStatus('Unable to load a postflop hand', 'error');
    const details = error && error.message ? error.message : String(error);
    const meta = pftLastFetchMeta
      ? `count=${pftLastFetchMeta.count}, offset=${pftLastFetchMeta.randomOffset}`
      : 'count/offset unavailable';
    const spotMeta = solution && solution.spot_name ? `spot_name=${solution.spot_name}` : '';
    pftShowDebugError(`${details}\n${meta}${spotMeta ? `\n${spotMeta}` : ''}`);
    document.getElementById('pft-ib-stage').textContent = 'ERROR';
  }
}

function pftAction(action) {
  if (pftAnswered || pftHandLoading || pftIntroRunning || !pftCurrentSolution) return;
  pftAnswered = true;
  const normalized = pftNormalizeAction(action);
  const ok = normalized === pftGetBestActionForCurrentSpot();
  if (ok) pftStats.correct++;
  else pftStats.wrong++;
  pftUpdateStats();
  pftAddInfo(normalized, ok);
  pftShowResult(normalized, ok);
}

