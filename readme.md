# Marketing Automation System (CRM)

> **Task ID:** WD-CRM-005[cite: 1]  
> **Domain:** CRM - Marketing Automation[cite: 1, 12]  
> **Company:** Data Alcott Systems ([www.dataalcott.com](https://www.dataalcott.com))[cite: 1, 12]  
> **Internship:** Free Web Development Internship Online[cite: 1, 12]  
> **Task Submission Link:** [https://www.freeinternships.in/blog/](https://www.freeinternships.in/blog/)[cite: 13]

---

## 📌 Project Overview

The **Marketing Automation System** is a comprehensive, client-side web application designed to help businesses automate multi-channel campaigns, manage audience segmentation, build responsive email templates, track engagement metrics, and project marketing ROI[cite: 2]. 

This project was developed as part of the **Data Alcott Systems Free Web Development Internship Online Task**[cite: 1]. It operates without an external database, utilizing in-memory JavaScript structures and `localStorage` persistence[cite: 3, 7, 8].

---

## 🚀 Live Demo & Repository Links

* **Live Website URL:** [https://your-username.github.io/marketing-automation-system-crm/](https://your-username.github.io/marketing-automation-system-crm/) *(Deployed on GitHub Pages / Netlify / Vercel)*[cite: 5, 12]
* **GitHub Repository:** [https://github.com/your-username/marketing-automation-system-crm](https://github.com/your-username/marketing-automation-system-crm)[cite: 4, 11]
* **YouTube Demonstration Video:** [https://youtube.com/watch?v=your-demo-video-id](https://youtube.com/watch?v=your-demo-video-id) *(Public/Unlisted)*[cite: 5, 12]
* **Task Submission Blog Link:** [https://www.freeinternships.in/blog/](https://www.freeinternships.in/blog/)[cite: 13]

---

## 🎨 UI & UX Design Specifications

* **Primary Color Palette:**
  * Primary Accent: **Red (`#DC2626`)**[cite: 3]
  * Secondary / Background: **White (`#FFFFFF`)** and **Light Gray (`#FDF8F8`)**[cite: 3]
  * Surface Neutral: **Dark Slate (`#1E293B`)**
* **Typography:** Modern, clean, sans-serif typography (`Plus Jakarta Sans`)[cite: 3]
* **Design Vibe:** Professional, marketing-focused, data-driven, clean layout[cite: 3]
* **Responsive Layout:** Adaptive design supporting desktop monitors, tablets, and smartphones via custom CSS media queries and a collapsible navigation sidebar[cite: 3, 5, 6].

---

## 🛠️ Implemented Modules & Features

### Core Modules[cite: 2, 4]
1. **Dashboard:**
   * High-level KPI metric cards: Total Campaigns, Active Subscribers, Open Rate, and Click Rate[cite: 2, 4].
   * Visual performance graphs (Engagement trends & audience growth dynamics)[cite: 2, 4].
   * Real-time preview of active campaigns[cite: 2].
2. **Campaign Management (Full CRUD):**
   * Create, edit, duplicate, and delete campaigns[cite: 2, 4].
   * Status indicators: `Draft`, `Scheduled`, `In Progress`, `Completed`, `Cancelled`[cite: 3, 4].
   * Real-time search by campaign title and filtering by status[cite: 4, 6].
3. **Email Template Management:**
   * Production-ready template library with cards[cite: 2, 4].
   * Template preview modal with Desktop vs. Mobile device toggles[cite: 4].
   * Simulated test email dispatch function[cite: 4, 9].
4. **Subscriber Directory & Segmentation:**
   * Contact list management with segment classifications (`VIP Customers`, `Engaged Subscribers`, `Newsletter Leads`, `Trial Users`)[cite: 2, 4].
   * Add and remove contacts dynamically[cite: 2].
   * Real-time search filter[cite: 4].
5. **Campaign Analytics & ROI Calculator:**
   * Tracking open rates, click-through rates, delivery rates, and bounce rates[cite: 2, 4].
   * 24-hour engagement distribution chart and subscriber device breakdown[cite: 2, 4].
   * Dynamic revenue simulator calculating conversions and gross revenue based on volume and order values[cite: 2].
6. **Automation Workflows:**
   * Visual multi-step drip journeys (e.g., Welcome Sequences, Abandoned Cart Recoveries)[cite: 2, 4].
   * Trigger conditions and multi-node sequential flow rendering[cite: 2, 8].
7. **Landing Page Designer:**
   * WYSIWYG live editor for headlines, subheadings, and CTA buttons[cite: 2, 4].
   * Live interactive browser canvas mockup[cite: 2, 4].
8. **Reports & Exports:**
   * Performance audit table with campaign efficiency scores[cite: 2].
   * CSV export functionality[cite: 4].
   * Print-ready PDF report generation (`window.print()`)[cite: 4].
9. **Simulated User Management / Authentication:**
   * Profile manager displaying role, organization email, and editable profile states[cite: 2, 4, 8].

### Bonus Features[cite: 4]
* [x] **Data Visualizations:** Interactive analytics powered by Chart.js (Line, Bar, Doughnut charts)[cite: 4].
* [x] **Simulated A/B Split Testing:** Compare subject line variations (Variant A vs. Variant B) with predicted conversion rates[cite: 4].
* [x] **Dark Mode Toggle:** Seamless toggle between light mode and dark theme with stored user preferences[cite: 4].
* [x] **Data Persistence:** Integrated `localStorage` engine allowing data modifications to persist across page reloads[cite: 8].

---

## 💻 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)[cite: 3]
* **Data Layer:** Pure JavaScript arrays, objects, and LocalStorage (No backend/database required)[cite: 3, 7, 8]
* **Libraries & Assets:**
  * [Font Awesome 6](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css) (Icons)[cite: 3, 6]
  * [Chart.js](https://cdn.jsdelivr.net/npm/chart.js) (Data visualization)[cite: 4]
  * [Google Fonts](https://fonts.google.com/) (Plus Jakarta Sans)[cite: 3]

---

## 📁 Repository Structure

```text
├── index.html        # Semantic HTML5 layout and modal overlays
├── style.css         # Custom CSS3 styling, responsive grid/flexbox, dark theme
├── script.js         # State management, Chart.js integrations, CRUD operations
└── README.md         # Project documentation and submission links