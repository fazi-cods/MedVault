// =============================================
// Doctor Dashboard Logic
// =============================================

requireAuth(['Doctor']);

// --- State ---
let myAppointments = [];
let myPatients = [];
let allPatientsData = [];
let myPrescriptions = [];
let doctorId = null;

// --- Init ---
document.addEventListener('authReady', async (e) => {
    const user = e.detail;
    doctorId = user.uid;

    document.getElementById('doc-name').textContent = user.name || 'Doctor';
    document.getElementById('doc-avatar').textContent =
        (user.name || 'D').charAt(0).toUpperCase();

    await Promise.all([
        loadMyAppointments(),
        loadAllPatients(),
        loadMyPrescriptions()
    ]);

    updateDocStats();
    renderTodayAppointments();
    renderAppointmentsList(myAppointments);
    renderMyPatients(allPatientsData);
    populatePatientDropdown();
    renderRecentPrescriptions();
});


// =============================================
// Navigation
// =============================================
function switchPage(page, el) {

    // ✅ FIXED LINE
    document.querySelectorAll('.page-section')
        .forEach(p => p.style.display = 'none');

    const target = document.getElementById('page-' + page);

    if (target) {
        target.style.display = 'block';
        target.classList.add('fade-in');
    }

    document.querySelectorAll('.nav-item')
        .forEach(n => n.classList.remove('active'));

    if (el) el.classList.add('active');

    const titles = {
        dashboard: 'Dashboard',
        appointments: 'My Appointments',
        patients: 'My Patients',
        prescriptions: 'Prescriptions'
    };

    document.getElementById('page-title').textContent =
        titles[page] || page;

    document.getElementById('sidebar')
        .classList.remove('open');
}

function toggleSidebar() {
    document.getElementById('sidebar')
        .classList.toggle('open');
}