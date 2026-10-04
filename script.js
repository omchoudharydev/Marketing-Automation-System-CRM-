/**
 * Marketing Automation System CRM (Task ID: WD-CRM-005)[cite: 1]
 * Core Logic, State Management & Event Controllers
 * No Database Required - Uses In-Memory Arrays & LocalStorage Persistence[cite: 3, 7, 8]
 */

// Initial Seed Data (Campaigns)[cite: 8]
const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: "Summer Sale 2026",
    type: "Email Campaign",
    status: "in-progress",
    audience: "All Subscribers",
    sent_date: "2026-06-20",
    open_rate: 45.2,
    click_rate: 12.8,
    created_at: "2026-06-15"
  },
  {
    id: 2,
    name: "Product Launch: New AI Engine",
    type: "Promotional Blast",
    status: "scheduled",
    audience: "Engaged Subscribers",
    sent_date: "2026-07-05",
    open_rate: 0,
    click_rate: 0,
    created_at: "2026-06-18"
  },
  {
    id: 3,
    name: "Weekly Automation Digest #42",
    type: "Newsletter Digest",
    status: "completed",
    audience: "All Subscribers",
    sent_date: "2026-06-10",
    open_rate: 51.4,
    click_rate: 16.2,
    created_at: "2026-06-08"
  },
  {
    id: 4,
    name: "Abandoned Cart Retargeting Flow",
    type: "Lifecycle Sequence",
    status: "in-progress",
    audience: "VIP Customers",
    sent_date: "2026-06-22",
    open_rate: 58.7,
    click_rate: 22.4,
    created_at: "2026-06-01"
  },
  {
    id: 5,
    name: "Customer Reactivation Promo",
    type: "Email Campaign",
    status: "draft",
    audience: "Newsletter Leads",
    sent_date: "2026-07-15",
    open_rate: 0,
    click_rate: 0,
    created_at: "2026-06-21"
  }
];

// Initial Seed Data (Subscribers)[cite: 8]
const INITIAL_SUBSCRIBERS = [
  { id: 1, name: "John Smith", email: "john@email.com", segment: "Engaged Subscribers", status: "active", subscribed_date: "2026-01-15" },
  { id: 2, name: "Sarah Johnson", email: "sarah@email.com", segment: "VIP Customers", status: "active", subscribed_date: "2026-02-20" },
  { id: 3, name: "Michael Chang", email: "m.chang@techgroup.io", segment: "Trial Users", status: "active", subscribed_date: "2026-03-12" },
  { id: 4, name: "Emily Davis", email: "emily.davis@designhub.co", segment: "Newsletter Leads", status: "active", subscribed_date: "2026-04-05" },
  { id: 5, name: "Carlos Mendoza", email: "carlos@mendozamedia.com", segment: "VIP Customers", status: "unsubscribed", subscribed_date: "2026-05-18" }
];

// Initial Templates[cite: 2, 8]
const INITIAL_TEMPLATES = [
  {
    id: 1,
    name: "Welcome Onboarding Sequence",
    subject: "Welcome aboard! Let's automate your pipeline",
    preview_text: "Everything you need to configure your first CRM campaign in under 10 minutes.",
    content: "Hi {{Subscriber.Name}},\n\nWelcome to our platform! We are thrilled to have you here. Your journey to doubling engagement begins now.\n\nBest regards,\nThe Automation Team"
  },
  {
    id: 2,
    name: "Flash Sale & Limited Discount",
    subject: "⚡ Exclusive 48-Hour Summer Promo Inside",
    preview_text: "Unlock 30% savings across all professional business tiers.",
    content: "Hi {{Subscriber.Name}},\n\nOur exclusive Summer 2026 flash pricing is live for the next 48 hours only. Use promo code GROW30 at checkout to unlock direct VIP savings.\n\nShop the promotion now!"
  },
  {
    id: 3,
    name: "Abandoned Cart Reminder",
    subject: "Did you forget something in your cart?",
    preview_text: "Your items are reserved and waiting for checkout.",
    content: "Hi {{Subscriber.Name}},\n\nWe noticed you left items in your shopping bag. Complete your order before inventory sells out!"
  }
];

// Workflows[cite: 2, 8]
const INITIAL_WORKFLOWS = [
  {
    id: 1,
    name: "Customer Onboarding Dripline",
    trigger: "New Contact Subscribed",
    status: "Active",
    steps: ["Send Welcome Email", "Wait 2 Days", "Send Feature Discovery", "Wait 3 Days", "Trigger Sales Call Checkpoint"]
  },
  {
    id: 2,
    name: "Abandoned Checkout Recovery",
    trigger: "Cart Inactive > 2 Hours",
    status: "Active",
    steps: ["Dispatch 10% Discount Code", "Wait 24 Hours", "Notify VIP Account Exec"]
  }
];

// Global State
let state = {
  campaigns: JSON.parse(localStorage.getItem("mas_campaigns")) || INITIAL_CAMPAIGNS,
  subscribers: JSON.parse(localStorage.getItem("mas_subscribers")) || INITIAL_SUBSCRIBERS,
  templates: INITIAL_TEMPLATES,
  workflows: INITIAL_WORKFLOWS,
  user: JSON.parse(localStorage.getItem("mas_user")) || {
    name: "Alex Turner",
    role: "Lead Marketer",
    email: "alex@dataalcott.com"
  },
  theme: localStorage.getItem("mas_theme") || "light"
};

// Chart.js references
let performanceChartRef = null;
let growthChartRef = null;
let hourlyHeatChartRef = null;
let deviceChartRef = null;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupNavigation();
  setupSidebarToggle();
  renderAllData();
  initDashboardCharts();
  initAnalyticsCharts();
  calculateSimulatedROI();
  document.getElementById("reportGenDate").textContent = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
});

/* ==========================================================================
   THEME TOGGLE & PERSISTENCE[cite: 4]
   ========================================================================== */
function initTheme() {
  document.body.setAttribute("data-theme", state.theme);
  updateThemeIcon();
  document.getElementById("themeToggleBtn").addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", state.theme);
    localStorage.setItem("mas_theme", state.theme);
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const icon = document.getElementById("themeIcon");
  if (state.theme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-regular fa-moon";
  }
}

/* ==========================================================================
   NAVIGATION ROUTER
   ========================================================================== */
function setupNavigation() {
  const navButtons = document.querySelectorAll(".sidebar-menu .nav-item");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Update sidebar active states
  document.querySelectorAll(".sidebar-menu .nav-item").forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
  });

  // Switch tab pane
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });
  const activePane = document.getElementById(tabId);
  if (activePane) activePane.classList.add("active");

  // Update Breadcrumb & Heading
  const titles = {
    "dashboard": "Dashboard Overview",
    "campaigns": "Campaign Management",
    "templates": "Email Template Studio",
    "subscribers": "Audience Directory",
    "analytics": "Campaign Analytics & ROI",
    "workflows": "Automation Sequences",
    "landing-pages": "Landing Page Builder",
    "reports": "Performance Reports"
  };
  document.getElementById("pageHeading").textContent = titles[tabId] || "Dashboard";
  document.getElementById("currentBreadcrumb").textContent = titles[tabId] || "Dashboard";

  // Close mobile sidebar if open
  document.getElementById("sidebar").classList.remove("mobile-open");
}

function setupSidebarToggle() {
  const toggleBtn = document.getElementById("menuToggleBtn");
  const sidebar = document.getElementById("sidebar");
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-open");
  });
}

/* ==========================================================================
   DATA RENDERING & STATE SAVE[cite: 7, 8]
   ========================================================================== */
function saveStateToStorage() {
  localStorage.setItem("mas_campaigns", JSON.stringify(state.campaigns));
  localStorage.setItem("mas_subscribers", JSON.stringify(state.subscribers));
  localStorage.setItem("mas_user", JSON.stringify(state.user));
}

function renderAllData() {
  renderDashboardStats();
  renderCampaignsTable();
  renderTemplates();
  renderSubscribers();
  renderWorkflows();
  renderReports();
  renderUserProfile();
}

/* 1. Dashboard View */
function renderDashboardStats() {
  const total = state.campaigns.length;
  const activeSubCount = state.subscribers.filter(s => s.status === 'active').length;
  
  const launched = state.campaigns.filter(c => c.open_rate > 0);
  const avgOpen = launched.length > 0 
    ? (launched.reduce((acc, c) => acc + c.open_rate, 0) / launched.length).toFixed(1)
    : 0;
  const avgClick = launched.length > 0
    ? (launched.reduce((acc, c) => acc + c.click_rate, 0) / launched.length).toFixed(1)
    : 0;

  document.getElementById("statTotalCampaigns").textContent = total;
  document.getElementById("statActiveSubscribers").textContent = (activeSubCount * 6500).toLocaleString();
  document.getElementById("statAvgOpenRate").textContent = avgOpen + "%";
  document.getElementById("statAvgClickRate").textContent = avgClick + "%";

  // Dashboard preview table
  const tbody = document.getElementById("dashboardCampaignsTableBody");
  tbody.innerHTML = "";
  state.campaigns.slice(0, 4).forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${c.name}</strong><br><small class="text-muted">${c.type}</small></td>
        <td>${c.audience}</td>
        <td>${c.sent_date}</td>
        <td><span class="badge badge-${c.status}">${c.status}</span></td>
        <td>Open: <strong>${c.open_rate}%</strong> | Click: <strong>${c.click_rate}%</strong></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="editCampaign(${c.id})"><i class="fa-solid fa-pen"></i></button>
        </td>
      </tr>
    `;
  });
}

/* 2. Campaigns View & CRUD[cite: 2, 4, 7] */
function renderCampaignsTable(filterList = null) {
  const items = filterList || state.campaigns;
  const tbody = document.getElementById("campaignsTableBody");
  tbody.innerHTML = "";

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center p-4 text-muted">No campaigns found matching criteria.</td></tr>`;
    return;
  }

  items.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td>
          <strong>${c.name}</strong>
          <div class="text-muted" style="font-size:0.75rem">${c.type}</div>
        </td>
        <td><span class="badge badge-${c.status}">${c.status}</span></td>
        <td>${c.audience}</td>
        <td>${c.sent_date}</td>
        <td><strong>${c.open_rate > 0 ? c.open_rate + '%' : '-'}</strong></td>
        <td><strong>${c.click_rate > 0 ? c.click_rate + '%' : '-'}</strong></td>
        <td class="text-right">
          <button class="btn btn-secondary btn-sm" title="Edit Campaign" onclick="editCampaign(${c.id})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-secondary btn-sm" title="Duplicate" onclick="duplicateCampaign(${c.id})">
            <i class="fa-solid fa-copy"></i>
          </button>
          <button class="btn btn-secondary btn-sm text-primary" title="Delete" onclick="deleteCampaign(${c.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function handleCampaignFilter() {
  const query = document.getElementById("campaignSearchInput").value.toLowerCase();
  const status = document.getElementById("campaignStatusFilter").value;

  const filtered = state.campaigns.filter(c => {
    const matchesName = c.name.toLowerCase().includes(query);
    const matchesStatus = status === "all" || c.status === status;
    return matchesName && matchesStatus;
  });

  renderCampaignsTable(filtered);
}

function openCampaignModal(isEdit = false) {
  document.getElementById("campaignModalTitle").textContent = isEdit ? "Edit Marketing Campaign" : "Create Marketing Campaign";
  document.getElementById("campaignModal").classList.add("active");
  if (!isEdit) {
    document.getElementById("campaignForm").reset();
    document.getElementById("campaignFormId").value = "";
    document.getElementById("campaignSentDate").value = new Date().toISOString().split("T")[0];
  }
}

function closeCampaignModal() {
  document.getElementById("campaignModal").classList.remove("active");
}

function handleCampaignSubmit(e) {
  e.preventDefault();
  const idVal = document.getElementById("campaignFormId").value;
  const name = document.getElementById("campaignName").value;
  const type = document.getElementById("campaignType").value;
  const audience = document.getElementById("campaignAudience").value;
  const status = document.getElementById("campaignStatus").value;
  const sent_date = document.getElementById("campaignSentDate").value;

  if (idVal) {
    // Edit existing
    const existing = state.campaigns.find(c => c.id == idVal);
    if (existing) {
      existing.name = name;
      existing.type = type;
      existing.audience = audience;
      existing.status = status;
      existing.sent_date = sent_date;
      showToast("Campaign updated successfully!");
    }
  } else {
    // Create new
    const newCampaign = {
      id: Date.now(),
      name,
      type,
      audience,
      status,
      sent_date,
      open_rate: status === "completed" ? Math.floor(Math.random() * 30 + 30) : 0,
      click_rate: status === "completed" ? Math.floor(Math.random() * 12 + 8) : 0,
      created_at: new Date().toISOString().split("T")[0]
    };
    state.campaigns.unshift(newCampaign);
    showToast("New campaign launched & saved!");
  }

  saveStateToStorage();
  closeCampaignModal();
  renderAllData();
}

function editCampaign(id) {
  const c = state.campaigns.find(item => item.id === id);
  if (!c) return;
  document.getElementById("campaignFormId").value = c.id;
  document.getElementById("campaignName").value = c.name;
  document.getElementById("campaignType").value = c.type;
  document.getElementById("campaignAudience").value = c.audience;
  document.getElementById("campaignStatus").value = c.status;
  document.getElementById("campaignSentDate").value = c.sent_date;
  openCampaignModal(true);
}

function duplicateCampaign(id) {
  const c = state.campaigns.find(item => item.id === id);
  if (!c) return;
  const clone = {
    ...c,
    id: Date.now(),
    name: `${c.name} (Copy)`,
    status: 'draft',
    created_at: new Date().toISOString().split("T")[0]
  };
  state.campaigns.unshift(clone);
  saveStateToStorage();
  renderAllData();
  showToast("Campaign duplicated as draft!");
}

function deleteCampaign(id) {
  if (confirm("Are you sure you want to remove this campaign?")) {
    state.campaigns = state.campaigns.filter(c => c.id !== id);
    saveStateToStorage();
    renderAllData();
    showToast("Campaign removed.");
  }
}

/* 3. Email Templates View[cite: 2, 8] */
function renderTemplates() {
  const grid = document.getElementById("templatesGrid");
  grid.innerHTML = "";
  state.templates.forEach(t => {
    grid.innerHTML += `
      <div class="template-card">
        <div class="template-card-header">
          <h4>${t.name}</h4>
          <p class="template-subject-preview"><i class="fa-regular fa-envelope"></i> ${t.subject}</p>
        </div>
        <div class="template-body-snippet">
          ${t.content.replace(/\n/g, '<br>')}
        </div>
        <div class="template-card-footer">
          <button class="btn btn-secondary btn-sm" onclick="previewTemplate(${t.id})">
            <i class="fa-solid fa-eye"></i> Live Preview
          </button>
          <button class="btn btn-primary btn-sm" onclick="sendSimulatedTestEmail()">
            <i class="fa-solid fa-paper-plane"></i> Send Test
          </button>
        </div>
      </div>
    `;
  });
}

function previewTemplate(id) {
  const t = state.templates.find(item => item.id === id);
  if (!t) return;
  document.getElementById("previewModalTitle").textContent = t.name;
  document.getElementById("previewModalSubject").textContent = "Subject: " + t.subject;
  document.getElementById("previewRenderBody").innerHTML = `
    <div style="border-bottom:2px solid #DC2626; padding-bottom:1rem; margin-bottom:1.5rem;">
      <h2 style="color:#DC2626; margin:0;">Data Alcott Pulse</h2>
      <span style="font-size:0.75rem; color:#64748B;">Automated Customer Dispatch</span>
    </div>
    <div style="font-size:0.95rem; line-height:1.7; color:#334155;">
      ${t.content.replace(/{{Subscriber.Name}}/g, "<strong>Valued Customer</strong>").replace(/\n/g, '<br>')}
    </div>
    <div style="margin-top:2rem; padding-top:1rem; border-top:1px solid #E2E8F0; font-size:0.72rem; color:#94A3B8;">
      You received this message because you are subscribed to updates. Unsubscribe anytime.
    </div>
  `;
  document.getElementById("previewModal").classList.add("active");
}

function setPreviewDevice(device) {
  const frame = document.getElementById("previewRenderBody");
  if (device === 'mobile') {
    frame.style.maxWidth = '375px';
  } else {
    frame.style.maxWidth = '600px';
  }
}

function closePreviewModal() {
  document.getElementById("previewModal").classList.remove("active");
}

function openCreateTemplateModal() {
  const name = prompt("Enter a Template Name:", "Product Announcement 2026");
  if (!name) return;
  const subject = prompt("Enter Email Subject Line:", "Important updates on your subscription");
  const newTmpl = {
    id: Date.now(),
    name,
    subject: subject || "No Subject",
    preview_text: "Fresh email template dispatch",
    content: "Hi {{Subscriber.Name}},\n\nThank you for choosing our automated workflow solutions. Check out the latest updates!"
  };
  state.templates.unshift(newTmpl);
  renderTemplates();
  showToast("New Template added to library!");
}

/* 4. Subscribers View[cite: 2, 8] */
function renderSubscribers() {
  const search = (document.getElementById("subscriberSearchInput")?.value || "").toLowerCase();
  const segment = document.getElementById("subscriberSegmentFilter")?.value || "all";
  const tbody = document.getElementById("subscribersTableBody");
  tbody.innerHTML = "";

  const list = state.subscribers.filter(s => {
    const matchText = s.name.toLowerCase().includes(search) || s.email.toLowerCase().includes(search);
    const matchSegment = segment === "all" || s.segment === segment;
    return matchText && matchSegment;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center p-4 text-muted">No contacts found.</td></tr>`;
    return;
  }

  list.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td>
          <strong>${s.name}</strong>
          <div class="text-muted" style="font-size:0.75rem">${s.email}</div>
        </td>
        <td><span class="badge badge-light">${s.segment}</span></td>
        <td>${s.subscribed_date}</td>
        <td><span class="badge ${s.status === 'active' ? 'badge-completed' : 'badge-draft'}">${s.status}</span></td>
        <td class="text-right">
          <button class="btn btn-secondary btn-sm text-primary" onclick="deleteSubscriber(${s.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function openSubscriberModal() {
  document.getElementById("subscriberForm").reset();
  document.getElementById("subscriberModal").classList.add("active");
}

function closeSubscriberModal() {
  document.getElementById("subscriberModal").classList.remove("active");
}

function handleSubscriberSubmit(e) {
  e.preventDefault();
  const newSub = {
    id: Date.now(),
    name: document.getElementById("subscriberName").value,
    email: document.getElementById("subscriberEmail").value,
    segment: document.getElementById("subscriberSegment").value,
    status: document.getElementById("subscriberStatus").value,
    subscribed_date: new Date().toISOString().split("T")[0]
  };
  state.subscribers.unshift(newSub);
  saveStateToStorage();
  closeSubscriberModal();
  renderAllData();
  showToast("Contact enrolled successfully!");
}

function deleteSubscriber(id) {
  if (confirm("Remove contact from CRM database?")) {
    state.subscribers = state.subscribers.filter(s => s.id !== id);
    saveStateToStorage();
    renderAllData();
    showToast("Contact removed.");
  }
}

function exportSubscribersCSV() {
  let csvContent = "data:text/csv;charset=utf-8,ID,Name,Email,Segment,Status,SubscribedDate\n";
  state.subscribers.forEach(s => {
    csvContent += `${s.id},"${s.name}","${s.email}","${s.segment}",${s.status},${s.subscribed_date}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `subscribers_export_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("CSV exported successfully!");
}

/* 5. Workflows View[cite: 2, 8] */
function renderWorkflows() {
  const container = document.getElementById("workflowsContainer");
  container.innerHTML = "";
  state.workflows.forEach(w => {
    const stepsHtml = w.steps.map((st, i) => `
      <div class="workflow-node">
        <span class="workflow-node-type">Step 0${i+1}</span>
        <span class="workflow-node-title">${st}</span>
      </div>
      ${i < w.steps.length - 1 ? '<i class="fa-solid fa-arrow-right workflow-arrow"></i>' : ''}
    `).join("");

    container.innerHTML += `
      <div class="workflow-card">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h4>${w.name}</h4>
            <span class="text-muted" style="font-size:0.8rem">Trigger Condition: <strong>${w.trigger}</strong></span>
          </div>
          <span class="badge badge-completed">${w.status}</span>
        </div>
        <div class="workflow-flow">
          ${stepsHtml}
        </div>
      </div>
    `;
  });
}

function openNewWorkflowPrompt() {
  const name = prompt("Workflow sequence name:", "VIP Anniversary Drip");
  if (!name) return;
  const trigger = prompt("Trigger condition:", "Customer account anniversary reached");
  state.workflows.push({
    id: Date.now(),
    name,
    trigger: trigger || "Manual Trigger",
    status: "Active",
    steps: ["Send Personalized Gift Voucher", "Wait 48h", "Verify Voucher Claim"]
  });
  renderWorkflows();
  showToast("New automation sequence active!");
}

/* 6. Landing Page Builder & Interactive Preview[cite: 2, 4] */
function updateLandingPageLivePreview() {
  const title = document.getElementById("lpInputTitle").value;
  const subtitle = document.getElementById("lpInputSubtitle").value;
  const cta = document.getElementById("lpInputCta").value;

  document.getElementById("lpDisplayTitle").textContent = title;
  document.getElementById("lpDisplaySubtitle").textContent = subtitle;
  document.getElementById("lpDisplayBtn").textContent = cta;
  showToast("Landing Page preview refreshed!");
}

function changeLpColor(hex) {
  document.getElementById("lpDisplayBtn").style.backgroundColor = hex;
  showToast(`Preview accent updated to ${hex}`);
}

/* 7. Reports View[cite: 2, 4] */
function renderReports() {
  const tbody = document.getElementById("reportsTableBody");
  tbody.innerHTML = "";
  state.campaigns.forEach(c => {
    const score = c.open_rate > 0 ? (c.open_rate * 1.5 + c.click_rate * 2.5).toFixed(0) : "N/A";
    tbody.innerHTML += `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>${c.type}</td>
        <td>${c.audience}</td>
        <td><span class="badge badge-${c.status}">${c.status}</span></td>
        <td>${c.open_rate}%</td>
        <td>${c.click_rate}%</td>
        <td><strong>${score}</strong></td>
      </tr>
    `;
  });
}

/* 8. Interactive ROI Calculator[cite: 2] */
function calculateSimulatedROI() {
  const recipients = parseFloat(document.getElementById("calcRecipients").value) || 0;
  const clickRate = parseFloat(document.getElementById("calcClickRate").value) || 0;
  const convRate = parseFloat(document.getElementById("calcConvRate").value) || 0;
  const aov = parseFloat(document.getElementById("calcAOV").value) || 0;

  const clicks = recipients * (clickRate / 100);
  const conversions = Math.round(clicks * (convRate / 100));
  const grossRev = conversions * aov;

  document.getElementById("calcResultOrders").textContent = `${conversions} orders`;
  document.getElementById("calcResultRevenue").textContent = `$${grossRev.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

/* 9. A/B Testing Modal & Dispatch[cite: 4] */
function openABModal() {
  document.getElementById("abModal").classList.add("active");
}

function closeABModal() {
  document.getElementById("abModal").classList.remove("active");
}

function applyABWinner() {
  closeABModal();
  showToast("Variant B selected and applied to upcoming campaign!");
}

/* 10. User Profile / Simulated Auth[cite: 2, 8] */
function openAuthModal() {
  document.getElementById("authModal").classList.add("active");
  document.getElementById("userDisplayNameInput").value = state.user.name;
  document.getElementById("userRoleInput").value = state.user.role;
  document.getElementById("userEmailInput").value = state.user.email;
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active");
}

function saveUserProfile() {
  state.user.name = document.getElementById("userDisplayNameInput").value;
  state.user.role = document.getElementById("userRoleInput").value;
  state.user.email = document.getElementById("userEmailInput").value;
  saveStateToStorage();
  renderUserProfile();
  closeAuthModal();
  showToast("Profile settings updated!");
}

function resetToDemoDefaults() {
  state.campaigns = INITIAL_CAMPAIGNS;
  state.subscribers = INITIAL_SUBSCRIBERS;
  state.templates = INITIAL_TEMPLATES;
  state.workflows = INITIAL_WORKFLOWS;
  state.user = { name: "Alex Turner", role: "Lead Marketer", email: "alex@dataalcott.com" };
  saveStateToStorage();
  renderAllData();
  closeAuthModal();
  showToast("Restored factory demo state.");
}

function renderUserProfile() {
  document.getElementById("navUserName").textContent = state.user.name;
  document.getElementById("navUserRole").textContent = state.user.role;
  const initials = state.user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  document.getElementById("navUserAvatar").textContent = initials;
  document.getElementById("modalUserAvatar").textContent = initials;
}

/* ==========================================================================
   CHARTS VISUALIZATION (Chart.js)[cite: 4]
   ========================================================================== */
function initDashboardCharts() {
  const ctxPerf = document.getElementById("performanceChart")?.getContext("2d");
  if (ctxPerf) {
    performanceChartRef = new Chart(ctxPerf, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Open Rate %",
            data: [38, 42, 40, 47, 44, 49, 53],
            borderColor: "#DC2626",
            backgroundColor: "rgba(220, 38, 38, 0.08)",
            fill: true,
            tension: 0.35,
            borderWidth: 2
          },
          {
            label: "Click Rate %",
            data: [10, 12, 11, 15, 14, 17, 19],
            borderColor: "#1E293B",
            backgroundColor: "transparent",
            tension: 0.35,
            borderWidth: 2,
            borderDash: [4, 4]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  const ctxGrowth = document.getElementById("growthChart")?.getContext("2d");
  if (ctxGrowth) {
    growthChartRef = new Chart(ctxGrowth, {
      type: "bar",
      data: {
        labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
          label: "New Subscribers",
          data: [1200, 1900, 2400, 3100, 4200, 4800],
          backgroundColor: "#DC2626",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

function initAnalyticsCharts() {
  const ctxHeat = document.getElementById("hourlyHeatChart")?.getContext("2d");
  if (ctxHeat) {
    hourlyHeatChartRef = new Chart(ctxHeat, {
      type: "bar",
      data: {
        labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
        datasets: [{
          label: "Opens by Hour",
          data: [2400, 9200, 6800, 8400, 5900, 3100],
          backgroundColor: "#DC2626",
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }

  const ctxDevice = document.getElementById("deviceChart")?.getContext("2d");
  if (ctxDevice) {
    deviceChartRef = new Chart(ctxDevice, {
      type: "doughnut",
      data: {
        labels: ["Mobile (iOS/Android)", "Desktop Client", "Webmail Browser"],
        datasets: [{
          data: [58, 28, 14],
          backgroundColor: ["#DC2626", "#1E293B", "#94A3B8"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } }
      }
    });
  }
}

/* ==========================================================================
   TOAST HELPER & SIMULATED DISPATCH[cite: 9]
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-primary"></i> <span>${message}</span>`;
  toast.classList.add("active");
  setTimeout(() => {
    toast.classList.remove("active");
  }, 3200);
}

function sendSimulatedTestEmail() {
  showToast(`Simulated dispatch delivered to ${state.user.email}!`);
  closePreviewModal();
}