


let defaultDatabase = [
    { id: "P-3211", name: "Tamim Iqbal", age: 34, gender: "Male", department: "Cardiology", status: "Admitted" },
    { id: "P-5842", name: "Sara Islam", age: 26, gender: "Female", department: "ICU", status: "Admitted" }
];

let patients = JSON.parse(localStorage.getItem('cs_portal_patients')) || defaultDatabase;
const totalBedsLimit = 30;


const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('login-form');
const selfEnrollForm = document.getElementById('self-enroll-form');
const portalSection = document.getElementById('portal-section');
const adminDisplayName = document.getElementById('admin-display-name');


const patientCrudForm = document.getElementById('patient-crud-form');
const editPatientIdInput = document.getElementById('edit-patient-id');
const patientNameInput = document.getElementById('patient-name');
const patientAgeInput = document.getElementById('patient-age');
const patientGenderInput = document.getElementById('patient-gender');
const patientDeptInput = document.getElementById('patient-dept');
const formTitle = document.getElementById('form-title');
const formSubmitBtn = document.getElementById('form-submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

const registryTableBody = document.getElementById('registry-table-body');
const searchInput = document.getElementById('patient-search');
const recordCountEl = document.getElementById('record-count');

// Stats Counters
const statTotalPatients = document.getElementById('stat-total-patients');
const statAvailableBeds = document.getElementById('stat-available-beds');


function savePatients() {
    localStorage.setItem('cs_portal_patients', JSON.stringify(patients));
}


loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const usernameVal = document.getElementById('username').value.trim();
    
    if (usernameVal !== "") {
        adminDisplayName.textContent = usernameVal;
        authSection.classList.add('hidden');
        portalSection.classList.remove('hidden');
        renderTable();
    }
});


selfEnrollForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (patients.length >= totalBedsLimit) {
        alert("Enrollment Limit Exceeded: No beds available inside the facility!");
        return;
    }

    const name = document.getElementById('enroll-name').value.trim();
    const age = parseInt(document.getElementById('enroll-age').value);
    const gender = document.getElementById('enroll-gender').value;
    const department = document.getElementById('enroll-dept').value;

   
    const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInpatient = { id: newId, name, age, gender, department, status: "Admitted" };

    
    patients.push(newInpatient);
    savePatients();

    
    alert(`Registration Successful!\nWelcome, ${name}.\nYour Patient ID is: ${newId}.\nPlease proceed to the counter.`);
    
    selfEnrollForm.reset();
    renderTable(); 
});


function logout() {
    authSection.classList.remove('hidden');
    portalSection.classList.add('hidden');
    loginForm.reset();
}


function renderTable(searchTerm = "") {
    if (!registryTableBody) return;
    registryTableBody.innerHTML = '';
    
    const filtered = patients.filter(p => {
        const term = searchTerm.toLowerCase();
        return (
            p.id.toLowerCase().includes(term) ||
            p.name.toLowerCase().includes(term) ||
            p.department.toLowerCase().includes(term)
        );
    });

    filtered.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.id}</strong></td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.gender}</td>
            <td>${p.department}</td>
            <td><span class="status-badge">${p.status}</span></td>
            <td>
                <div class="action-btns-wrapper">
                    <button class="action-btn edit-btn" onclick="startEdit('${p.id}')" title="Edit Info">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="dischargePatient('${p.id}')" title="Discharge Patient">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        registryTableBody.appendChild(tr);
    });

   
    statTotalPatients.textContent = patients.length;
    statAvailableBeds.textContent = totalBedsLimit - patients.length;
    recordCountEl.textContent = `Records: ${filtered.length}`;
}


patientCrudForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = patientNameInput.value.trim();
    const age = parseInt(patientAgeInput.value);
    const gender = patientGenderInput.value;
    const department = patientDeptInput.value;
    const targetId = editPatientIdInput.value;

    if (targetId === "") {
        if (patients.length >= totalBedsLimit) {
            alert("No available clinical beds!");
            return;
        }
        const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
        patients.push({ id: newId, name, age, gender, department, status: "Admitted" });
        alert(`Success: Patient ${name} admitted (ID: ${newId}).`);
    } else {
        const index = patients.findIndex(p => p.id === targetId);
        if (index !== -1) {
            patients[index].name = name;
            patients[index].age = age;
            patients[index].gender = gender;
            patients[index].department = department;
            alert(`Updated Patient ID: ${targetId}`);
        }
        resetFormState();
    }

    savePatients();
    renderTable();
    patientCrudForm.reset();
});


window.startEdit = function(id) {
    const patient = patients.find(p => p.id === id);
    if (patient) {
        editPatientIdInput.value = patient.id;
        patientNameInput.value = patient.name;
        patientAgeInput.value = patient.age;
        patientGenderInput.value = patient.gender;
        patientDeptInput.value = patient.department;

        formTitle.innerHTML = `<i class="fa-solid fa-user-pen"></i> Update Patient ${patient.id}`;
        formSubmitBtn.textContent = "Save Changes";
        cancelEditBtn.classList.remove('hidden');
    }
};


window.resetFormState = function() {
    editPatientIdInput.value = "";
    patientCrudForm.reset();
    formTitle.innerHTML = `<i class="fa-solid fa-user-plus"></i> Admin Admission`;
    formSubmitBtn.textContent = "Admit Patient";
    cancelEditBtn.classList.add('hidden');
};


window.dischargePatient = function(id) {
    if (confirm(`Are you sure you want to discharge Patient ${id}?`)) {
        patients = patients.filter(p => p.id !== id);
        savePatients();
        renderTable();
        
        if (editPatientIdInput.value === id) {
            resetFormState();
        }
    }
};
ট
searchInput.addEventListener('input', function(e) {
    renderTable(e.target.value);
});
