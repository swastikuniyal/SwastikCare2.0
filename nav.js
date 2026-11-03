/**
 * SwastikCare - Global Navigation & Demo Persona Switcher (English Version)
 * Fully responsive navigation, mobile drawer, role switcher, and footer.
 */

(function () {
    function initNav() {
        const session = window.SwastikData ? window.SwastikData.getSession() : { role: "patient", displayName: "Patient" };

        // 1. Top Demo Persona Switcher Bar
        const topBar = document.createElement("div");
        topBar.className = "demo-role-bar";
        topBar.innerHTML = `
            <div class="role-chips">
                <span style="color:#94a3b8; font-weight:700; margin-right:4px;"><i class="fa fa-sliders-h"></i> Switch Demo Profile:</span>
                
                <!-- Patient Accounts -->
                <button class="role-chip ${session.role === 'patient' && session.userId === 'pat-1' ? 'active' : ''}" onclick="window.SwastikData.switchPersona('patient', 'pat-1')" title="Patient: Rohan Mehta (Post-Op ACL Rehab)">
                    <i class="fa fa-user"></i> Rohan (Patient)
                </button>
                <button class="role-chip ${session.role === 'patient' && session.userId === 'pat-2' ? 'active' : ''}" onclick="window.SwastikData.switchPersona('patient', 'pat-2')" title="Patient: Priya Sharma (Diabetes Care)">
                    <i class="fa fa-user"></i> Priya (Patient)
                </button>
                <button class="role-chip ${session.role === 'patient' && session.userId === 'pat-3' ? 'active' : ''}" onclick="window.SwastikData.switchPersona('patient', 'pat-3')" title="Patient: Rahul Verma (Cardiology Checkup)">
                    <i class="fa fa-user"></i> Rahul (Patient)
                </button>
                <button class="role-chip ${session.role === 'patient' && session.userId === 'pat-4' ? 'active' : ''}" onclick="window.SwastikData.switchPersona('patient', 'pat-4')" title="Patient: Ananya Singh (Migraine Care)">
                    <i class="fa fa-user"></i> Ananya (Patient)
                </button>
                <button class="role-chip ${session.role === 'patient' && session.userId === 'pat-5' ? 'active' : ''}" onclick="window.SwastikData.switchPersona('patient', 'pat-5')" title="Patient: Amit Kumar (Asthma & Pulmonology)">
                    <i class="fa fa-user"></i> Amit (Patient)
                </button>

                <span style="color:#64748b; margin: 0 4px;">|</span>

                <!-- Hospital Staff Accounts -->
                <button class="role-chip ${session.role === 'hospital' && (session.hospitalId === 'hosp-1' || session.hospitalCode === 'aiims') ? 'active' : ''}" onclick="window.SwastikData.switchPersona('hospital', 'hosp-1')" title="Hospital Staff: AIIMS New Delhi">
                    <i class="fa fa-hospital"></i> AIIMS Staff
                </button>
                <button class="role-chip ${session.role === 'hospital' && (session.hospitalId === 'hosp-2' || session.hospitalCode === 'apollo') ? 'active' : ''}" onclick="window.SwastikData.switchPersona('hospital', 'hosp-2')" title="Hospital Staff: Apollo">
                    <i class="fa fa-hospital"></i> Apollo Staff
                </button>
                <button class="role-chip ${session.role === 'hospital' && (session.hospitalId === 'hosp-3' || session.hospitalCode === 'max') ? 'active' : ''}" onclick="window.SwastikData.switchPersona('hospital', 'hosp-3')" title="Hospital Staff: Max Saket">
                    <i class="fa fa-hospital"></i> Max Staff
                </button>
                <button class="role-chip ${session.role === 'hospital' && (session.hospitalId === 'hosp-4' || session.hospitalCode === 'fortis') ? 'active' : ''}" onclick="window.SwastikData.switchPersona('hospital', 'hosp-4')" title="Hospital Staff: Fortis">
                    <i class="fa fa-hospital"></i> Fortis Staff
                </button>
                <button class="role-chip ${session.role === 'hospital' && (session.hospitalId === 'hosp-5' || session.hospitalCode === 'medanta') ? 'active' : ''}" onclick="window.SwastikData.switchPersona('hospital', 'hosp-5')" title="Hospital Staff: Medanta">
                    <i class="fa fa-hospital"></i> Medanta Staff
                </button>

                <span style="color:#64748b; margin: 0 4px;">|</span>

                <!-- Super Pro Admins: Manish Pandey & Swastik Uniyal -->
                <button class="role-chip ${session.role === 'admin' && (session.userId === 'admin-manish' || !session.userId) ? 'active' : ''}" onclick="window.SwastikData.switchPersona('admin', 'admin-manish')" title="Co-Founder & Super Pro Admin: Manish Pandey" style="${session.role === 'admin' && (session.userId === 'admin-manish' || !session.userId) ? 'background:linear-gradient(135deg, #f59e0b, #d97706); border-color:#f59e0b; color:white; font-weight:800;' : 'border-color:#f59e0b; color:#fde68a;'}">
                    <i class="fa fa-crown" style="color:${session.role === 'admin' && (session.userId === 'admin-manish' || !session.userId) ? '#fff' : '#f59e0b'};"></i> Manish Pandey (Admin)
                </button>
                <button class="role-chip ${session.role === 'admin' && session.userId === 'admin-swastik' ? 'active' : ''}" onclick="window.SwastikData.switchPersona('admin', 'admin-swastik')" title="Co-Founder & Super Pro Admin: Swastik Uniyal" style="${session.role === 'admin' && session.userId === 'admin-swastik' ? 'background:linear-gradient(135deg, #f59e0b, #d97706); border-color:#f59e0b; color:white; font-weight:800;' : 'border-color:#f59e0b; color:#fde68a;'}">
                    <i class="fa fa-crown" style="color:${session.role === 'admin' && session.userId === 'admin-swastik' ? '#fff' : '#f59e0b'};"></i> Swastik Uniyal (Admin)
                </button>
            </div>
            <div>
                <a href="Emergency.html" class="emergency-link">
                    <i class="fa fa-ambulance"></i> 24/7 Emergency Helpline: <strong>108</strong> / 102
                </a>
            </div>
        `;

        // 2. Main Navigation Header
        const nav = document.createElement("nav");
        nav.className = "main-navbar";
        
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        nav.innerHTML = `
            <div class="nav-container">
                <div style="display:flex; align-items:center; gap:12px;">
                    <button class="mobile-nav-toggle" id="mobileNavToggleBtn" aria-label="Toggle navigation">
                        <i class="fa fa-bars"></i>
                    </button>
                    <a href="index.html" class="brand-logo">
                        <div class="brand-icon">
                            <i class="fa fa-heartbeat"></i>
                        </div>
                        <div class="brand-name">
                            Swastik<span>Care</span>
                        </div>
                    </a>
                </div>

                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link-btn ${currentPage === 'index.html' ? 'active' : ''}"><i class="fa fa-home"></i> Home</a></li>
                    <li><a href="Appointment-Booking.html" class="nav-link-btn ${currentPage === 'Appointment-Booking.html' ? 'active' : ''}"><i class="fa fa-calendar-check"></i> Book Doctor</a></li>
                    <li><a href="Health-Records.html" class="nav-link-btn ${currentPage === 'Health-Records.html' ? 'active' : ''}"><i class="fa fa-folder-open"></i> Lab Reports</a></li>
                    <li><a href="Vitals-Summary.html" class="nav-link-btn ${currentPage === 'Vitals-Summary.html' ? 'active' : ''}"><i class="fa fa-chart-line"></i> Vitals</a></li>
                    <li><a href="Talk-To-Doctor.html" class="nav-link-btn ${currentPage === 'Talk-To-Doctor.html' ? 'active' : ''}"><i class="fa fa-user-md"></i> Consult Doctor</a></li>
                    <li><a href="Hospital-Dashboard.html" class="nav-link-btn ${currentPage === 'Hospital-Dashboard.html' ? 'active' : ''}"><i class="fa fa-hospital"></i> Hospital Portal</a></li>
                    <li><a href="Admin-Dashboard.html" class="nav-link-btn ${currentPage === 'Admin-Dashboard.html' ? 'active' : ''}"><i class="fa fa-shield-alt"></i> Admin Panel</a></li>
                </ul>

                <div class="nav-actions">
                    <a href="Emergency.html" class="btn-sos">
                        <i class="fa fa-ambulance"></i> Emergency 108
                    </a>

                    <div class="user-badge-menu" onclick="location.href='${session.role === 'admin' ? 'Admin-Dashboard.html' : session.role === 'hospital' ? 'Hospital-Dashboard.html' : 'Profile-Settings.html'}'" title="View Profile" style="${session.role === 'admin' ? 'border-color:#f59e0b; background:#fffbeb;' : ''}">
                        <div class="user-avatar-mini" style="${session.role === 'admin' ? 'background:linear-gradient(135deg,#f59e0b,#d97706); color:white;' : ''}">
                            ${session.role === 'admin' ? '<i class="fa fa-crown"></i>' : session.role === 'hospital' ? '<i class="fa fa-hospital"></i>' : '<i class="fa fa-user"></i>'}
                        </div>
                        <div style="font-size: 13px; font-weight:700; line-height:1.2;">
                            <div>${session.displayName || 'Manish Pandey (Super Pro Admin)'}</div>
                            <small style="color:${session.role === 'admin' ? '#b45309' : 'var(--text-muted)'}; font-size:10px; text-transform:uppercase; font-weight:800;">${session.role === 'admin' ? 'Super Pro Admin' : session.role === 'hospital' ? 'Hospital Staff' : 'Patient'}</small>
                        </div>
                    </div>

                    <a href="Login.html" class="btn-secondary btn-sm" title="Login or Switch Profile">
                        <i class="fa fa-sign-in-alt"></i> Login
                    </a>
                </div>
            </div>

            <!-- Mobile Navigation Drawer -->
            <div class="mobile-nav-drawer" id="mobileNavDrawer">
                <div class="mobile-nav-content">
                    <div class="mobile-drawer-header">
                        <div class="brand-logo" style="font-size:18px;">
                            <div class="brand-icon" style="width:32px; height:32px; font-size:16px;"><i class="fa fa-heartbeat"></i></div>
                            <div>Swastik<span style="color:var(--primary-teal);">Care</span></div>
                        </div>
                        <button id="mobileDrawerCloseBtn" style="background:none; border:none; font-size:20px; color:var(--text-secondary); cursor:pointer;">&times;</button>
                    </div>
                    <a href="index.html" class="nav-link-btn ${currentPage === 'index.html' ? 'active' : ''}"><i class="fa fa-home"></i> Home</a>
                    <a href="Appointment-Booking.html" class="nav-link-btn ${currentPage === 'Appointment-Booking.html' ? 'active' : ''}"><i class="fa fa-calendar-check"></i> Book Doctor</a>
                    <a href="Health-Records.html" class="nav-link-btn ${currentPage === 'Health-Records.html' ? 'active' : ''}"><i class="fa fa-folder-open"></i> Lab Reports</a>
                    <a href="Vitals-Summary.html" class="nav-link-btn ${currentPage === 'Vitals-Summary.html' ? 'active' : ''}"><i class="fa fa-chart-line"></i> Vitals Summary</a>
                    <a href="Talk-To-Doctor.html" class="nav-link-btn ${currentPage === 'Talk-To-Doctor.html' ? 'active' : ''}"><i class="fa fa-user-md"></i> Consult Doctor</a>
                    <a href="Hospital-Dashboard.html" class="nav-link-btn ${currentPage === 'Hospital-Dashboard.html' ? 'active' : ''}"><i class="fa fa-hospital"></i> Hospital Portal</a>
                    <a href="Admin-Dashboard.html" class="nav-link-btn ${currentPage === 'Admin-Dashboard.html' ? 'active' : ''}"><i class="fa fa-shield-alt"></i> Admin Panel</a>
                    <a href="My-Journey.html" class="nav-link-btn ${currentPage === 'My-Journey.html' ? 'active' : ''}"><i class="fa fa-walking"></i> MoveOn Recovery</a>
                    <a href="Invoice-Gen.html" class="nav-link-btn ${currentPage === 'Invoice-Gen.html' ? 'active' : ''}"><i class="fa fa-receipt"></i> Billing & Invoices</a>
                    <a href="Support.html" class="nav-link-btn ${currentPage === 'Support.html' ? 'active' : ''}"><i class="fa fa-headset"></i> Support & Helpdesk</a>
                    <a href="Emergency.html" class="btn-sos" style="margin-top:12px; justify-content:center;"><i class="fa fa-ambulance"></i> Emergency SOS 108</a>
                </div>
            </div>
        `;

        document.body.prepend(nav);
        document.body.prepend(topBar);

        // Mobile drawer event handlers
        const toggleBtn = document.getElementById("mobileNavToggleBtn");
        const drawer = document.getElementById("mobileNavDrawer");
        const closeBtn = document.getElementById("mobileDrawerCloseBtn");

        if (toggleBtn && drawer) {
            toggleBtn.addEventListener("click", () => {
                drawer.classList.toggle("open");
            });
        }
        if (closeBtn && drawer) {
            closeBtn.addEventListener("click", () => {
                drawer.classList.remove("open");
            });
        }
        if (drawer) {
            drawer.addEventListener("click", (e) => {
                if (e.target === drawer) {
                    drawer.classList.remove("open");
                }
            });
        }

        // 3. Global Footer (English)
        if (!document.querySelector(".main-footer")) {
            const footer = document.createElement("footer");
            footer.className = "main-footer";
            footer.innerHTML = `
                <div class="footer-container">
                    <div class="footer-col">
                        <div class="brand-logo" style="color: white; margin-bottom: 15px;">
                            <div class="brand-icon"><i class="fa fa-heartbeat"></i></div>
                            <div>Swastik<span style="color:var(--primary-teal);">Care</span></div>
                        </div>
                        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 20px;">
                            Your Health, Our Responsibility! SwastikCare is India's premier integrated digital health ecosystem, seamlessly connecting patients with 25 leading specialists across India's top 5 super-specialty hospitals (AIIMS, Apollo, Max, Fortis & Medanta).
                        </p>
                        <div style="display:flex; gap:10px; font-size: 12px; color: #cbd5e1; flex-wrap:wrap;">
                            <span class="badge badge-teal"><i class="fa fa-check-circle"></i> ABHA (ABDM) Certified</span>
                            <span class="badge badge-blue"><i class="fa fa-lock"></i> 100% Encrypted Data</span>
                            <span class="badge badge-green"><i class="fa fa-shield-alt"></i> NABH Partner Network</span>
                        </div>
                    </div>
                    <div class="footer-col">
                        <h4>Patient Services</h4>
                        <ul class="footer-links">
                            <li><a href="index.html">Home Page</a></li>
                            <li><a href="Appointment-Booking.html">Book Doctor Appointment</a></li>
                            <li><a href="Health-Records.html">Digital Health Locker</a></li>
                            <li><a href="Vitals-Summary.html">Live Vitals & Biometrics</a></li>
                            <li><a href="My-Journey.html">MoveOn Recovery Roadmap</a></li>
                            <li><a href="About-DCL.html">About SwastikCare</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Medical Network</h4>
                        <ul class="footer-links">
                            <li><a href="Hospital-Dashboard.html">Hospital Partner Portal</a></li>
                            <li><a href="Admin-Dashboard.html">Super Admin Console</a></li>
                            <li><a href="Talk-To-Doctor.html">Telehealth & Consultation</a></li>
                            <li><a href="Emergency.html">24/7 Ambulance SOS 108</a></li>
                            <li><a href="Invoice-Gen.html">Hospital Bills & Receipts</a></li>
                            <li><a href="Notifications.html">Clinical Alerts</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Emergency Helpline</h4>
                        <ul class="footer-links">
                            <li><strong style="color:white;">National Ambulance:</strong> 108 / 102</li>
                            <li><strong style="color:white;">AIIMS Trauma Helpline:</strong> +91 11 2658 8500</li>
                            <li><strong style="color:white;">Apollo Emergency:</strong> 1066</li>
                            <li><strong style="color:white;">Fortis Critical Helpline:</strong> +91 124 492 1021</li>
                            <li><a href="Support.html" style="color:var(--primary-teal); font-weight:700;"><i class="fa fa-headset"></i> 24/7 Patient Support Center</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div>© 2026 SwastikCare National Health Platform. All Rights Reserved.</div>
                    <div>Dedicated to seamlessly uniting Patients, Doctors, and Super-Specialty Hospitals.</div>
                </div>
            `;
            document.body.appendChild(footer);
        }
    }

    // Toast Notifications in English
    window.showToast = function (message, type = "info") {
        let container = document.querySelector(".toast-container");
        if (!container) {
            container = document.createElement("div");
            container.className = "toast-container";
            document.body.appendChild(container);
        }
        const toast = document.createElement("div");
        toast.className = "toast";
        let icon = "info-circle";
        if (type === "success") icon = "check-circle";
        if (type === "warning") icon = "exclamation-triangle";
        if (type === "error") icon = "times-circle";

        toast.innerHTML = `<i class="fa fa-${icon}" style="color: ${type === 'success' ? '#34d399' : type === 'error' ? '#f87171' : '#60a5fa'}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(100%)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNav);
    } else {
        initNav();
    }
})();