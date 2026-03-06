import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import api from "../api/axios";
import logger from "../utils/logger";
import "./Patients.css";

const emptyPatientForm = {
  patient_id: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  emergency_contact: "",
  emergency_phone: "",
  medical_notes: "",
  clinic_id: "",
};

const normalizePatientForForm = (patient) => ({
  patient_id: patient?.patient_id ?? "",
  first_name: patient?.first_name ?? "",
  last_name: patient?.last_name ?? "",
  date_of_birth: patient?.date_of_birth ? String(patient.date_of_birth).slice(0, 10) : "",
  gender: patient?.gender ?? "",
  phone: patient?.phone ?? "",
  email: patient?.email ?? "",
  address: patient?.address ?? "",
  emergency_contact: patient?.emergency_contact ?? "",
  emergency_phone: patient?.emergency_phone ?? "",
  medical_notes: patient?.medical_notes ?? "",
  clinic_id: patient?.clinic_id ?? "",
});

const optionalStringToNullable = (value) => {
  const normalized = String(value ?? "").trim();
  return normalized === "" ? null : normalized;
};

const buildPatientPayload = (formData) => ({
  patient_id: formData.patient_id.trim(),
  first_name: formData.first_name.trim(),
  last_name: formData.last_name.trim(),
  date_of_birth: formData.date_of_birth || null,
  gender: optionalStringToNullable(formData.gender),
  phone: optionalStringToNullable(formData.phone),
  email: optionalStringToNullable(formData.email),
  address: optionalStringToNullable(formData.address),
  emergency_contact: optionalStringToNullable(formData.emergency_contact),
  emergency_phone: optionalStringToNullable(formData.emergency_phone),
  medical_notes: optionalStringToNullable(formData.medical_notes),
  clinic_id:
    String(formData.clinic_id ?? "").trim() === ""
      ? null
      : Number(formData.clinic_id),
});

const PatientFormFields = ({ formData, onChange, idPrefix }) => (
  <>
    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-patient-id`}>Patient ID *</label>
      <input
        id={`${idPrefix}-patient-id`}
        className="patient-field-input"
        name="patient_id"
        value={formData.patient_id}
        onChange={onChange}
        placeholder="MRN-1001"
        required
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-first-name`}>First Name *</label>
      <input
        id={`${idPrefix}-first-name`}
        className="patient-field-input"
        name="first_name"
        value={formData.first_name}
        onChange={onChange}
        placeholder="First name"
        required
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-last-name`}>Last Name *</label>
      <input
        id={`${idPrefix}-last-name`}
        className="patient-field-input"
        name="last_name"
        value={formData.last_name}
        onChange={onChange}
        placeholder="Last name"
        required
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-dob`}>Date of Birth</label>
      <input
        id={`${idPrefix}-dob`}
        className="patient-field-input"
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={onChange}
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-gender`}>Gender</label>
      <select
        id={`${idPrefix}-gender`}
        className="patient-field-input"
        name="gender"
        value={formData.gender}
        onChange={onChange}
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefer_not_to_say">Prefer not to say</option>
      </select>
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-phone`}>Phone</label>
      <input
        id={`${idPrefix}-phone`}
        className="patient-field-input"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="+1 555-0102"
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-email`}>Email</label>
      <input
        id={`${idPrefix}-email`}
        className="patient-field-input"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="name@example.com"
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-clinic-id`}>Clinic ID</label>
      <input
        id={`${idPrefix}-clinic-id`}
        className="patient-field-input"
        type="number"
        name="clinic_id"
        value={formData.clinic_id}
        onChange={onChange}
        placeholder="1"
        min="1"
      />
    </div>

    <div className="patient-field-group patient-field-span-2">
      <label htmlFor={`${idPrefix}-address`}>Address</label>
      <input
        id={`${idPrefix}-address`}
        className="patient-field-input"
        name="address"
        value={formData.address}
        onChange={onChange}
        placeholder="Street, city, state, ZIP"
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-emergency-contact`}>Emergency Contact</label>
      <input
        id={`${idPrefix}-emergency-contact`}
        className="patient-field-input"
        name="emergency_contact"
        value={formData.emergency_contact}
        onChange={onChange}
        placeholder="Contact name"
      />
    </div>

    <div className="patient-field-group">
      <label htmlFor={`${idPrefix}-emergency-phone`}>Emergency Phone</label>
      <input
        id={`${idPrefix}-emergency-phone`}
        className="patient-field-input"
        name="emergency_phone"
        value={formData.emergency_phone}
        onChange={onChange}
        placeholder="+1 555-0134"
      />
    </div>

    <div className="patient-field-group patient-field-span-2">
      <label htmlFor={`${idPrefix}-notes`}>Medical Notes</label>
      <textarea
        id={`${idPrefix}-notes`}
        className="patient-field-input patient-field-textarea"
        name="medical_notes"
        value={formData.medical_notes}
        onChange={onChange}
        placeholder="Recent notes, allergies, history..."
      />
    </div>
  </>
);

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingCreate, setIsSavingCreate] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [createFormData, setCreateFormData] = useState(emptyPatientForm);
  const [editFormData, setEditFormData] = useState(emptyPatientForm);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [banner, setBanner] = useState({ type: "", message: "" });

  const loadPatients = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/patients/");
      const loadedPatients = Array.isArray(response.data) ? response.data : [];
      setPatients(loadedPatients);
      logger.userAction("Patients List Loaded", { count: loadedPatients.length });
    } catch (error) {
      logger.error("Failed to load patients", {}, error);
      setBanner({
        type: "error",
        message: "Unable to load patients. Please refresh and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const onCreateInputChange = (event) => {
    const { name, value } = event.target;
    setCreateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePatient = async (event) => {
    event.preventDefault();
    const payload = buildPatientPayload(createFormData);

    if (!payload.patient_id || !payload.first_name || !payload.last_name) {
      setBanner({
        type: "error",
        message: "Patient ID, first name, and last name are required to enroll a patient.",
      });
      return;
    }

    setIsSavingCreate(true);
    try {
      await api.post("/patients/", payload);
      logger.userAction("Patient Enrolled", { patientId: payload.patient_id });
      setBanner({ type: "success", message: "Patient enrolled successfully." });
      setCreateFormData(emptyPatientForm);
      await loadPatients();
    } catch (error) {
      logger.error("Failed to enroll patient", { patientId: payload.patient_id }, error);
      setBanner({
        type: "error",
        message: "Unable to enroll patient. Please verify the details and try again.",
      });
    } finally {
      setIsSavingCreate(false);
    }
  };

  const handleSelectPatientForEdit = (event) => {
    const nextId = event.target.value;
    setSelectedPatientId(nextId);

    const selected = patients.find((patient) => String(patient.id) === nextId);
    if (selected) {
      setEditFormData(normalizePatientForForm(selected));
    } else {
      setEditFormData(emptyPatientForm);
    }
  };

  const handleUpdatePatient = async (event) => {
    event.preventDefault();
    if (!selectedPatientId) {
      setBanner({ type: "error", message: "Select a patient before saving edits." });
      return;
    }

    const payload = buildPatientPayload(editFormData);
    if (!payload.patient_id || !payload.first_name || !payload.last_name) {
      setBanner({
        type: "error",
        message: "Patient ID, first name, and last name are required to save edits.",
      });
      return;
    }

    setIsSavingEdit(true);
    try {
      await api.put(`/patients/${selectedPatientId}`, payload);
      logger.userAction("Patient Updated", {
        patientRecordId: selectedPatientId,
        patientId: payload.patient_id,
      });
      setBanner({ type: "success", message: "Patient details updated successfully." });
      await loadPatients();
    } catch (error) {
      logger.error("Failed to update patient", { patientRecordId: selectedPatientId }, error);
      setBanner({
        type: "error",
        message: "Unable to update patient. Please review the fields and try again.",
      });
    } finally {
      setIsSavingEdit(false);
    }
  };

  const selectedPatientName = useMemo(() => {
    const selected = patients.find((patient) => String(patient.id) === selectedPatientId);
    if (!selected) {
      return "";
    }
    return `${selected.first_name} ${selected.last_name}`.trim();
  }, [patients, selectedPatientId]);

  const handleQuickEdit = (patient) => {
    setSelectedPatientId(String(patient.id));
    setEditFormData(normalizePatientForForm(patient));
    setBanner({ type: "", message: "" });
  };

  return (
    <div className="patients-layout">
      <Sidebar />

      <main className="patients-main">
        <header className="patients-header">
          <h1>Patient Management</h1>
          <p>Aligned enrollment and edit forms with consistent, professional field sizing.</p>
        </header>

        {banner.message && (
          <div className={`patients-banner patients-banner-${banner.type}`}>
            {banner.message}
          </div>
        )}

        <section className="patient-forms-grid">
          <article className="patient-form-card">
            <h2>Enroll New Patient</h2>
            <form onSubmit={handleCreatePatient}>
              <div className="patient-form-grid">
                <PatientFormFields
                  formData={createFormData}
                  onChange={onCreateInputChange}
                  idPrefix="create"
                />
              </div>
              <div className="patient-form-actions">
                <button className="patient-primary-btn" type="submit" disabled={isSavingCreate}>
                  {isSavingCreate ? "Enrolling..." : "Enroll Patient"}
                </button>
              </div>
            </form>
          </article>

          <article className="patient-form-card">
            <h2>Edit Patient</h2>
            <form onSubmit={handleUpdatePatient}>
              <div className="patient-form-grid">
                <div className="patient-field-group patient-field-span-2">
                  <label htmlFor="edit-select-patient">Select Patient *</label>
                  <select
                    id="edit-select-patient"
                    className="patient-field-input"
                    value={selectedPatientId}
                    onChange={handleSelectPatientForEdit}
                    required
                  >
                    <option value="">Choose a patient to edit</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={String(patient.id)}>
                        {patient.patient_id} — {patient.first_name} {patient.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <PatientFormFields
                  formData={editFormData}
                  onChange={onEditInputChange}
                  idPrefix="edit"
                />
              </div>

              <div className="patient-form-actions">
                <button className="patient-primary-btn" type="submit" disabled={isSavingEdit}>
                  {isSavingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

            <p className="patient-edit-hint">
              {selectedPatientName ? `Editing: ${selectedPatientName}` : "No patient selected"}
            </p>
          </article>
        </section>

        <section className="patients-table-card">
          <div className="patients-table-header">
            <h2>Current Patients</h2>
            <span>{isLoading ? "Loading..." : `${patients.length} total`}</span>
          </div>

          <div className="patients-table-wrap">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Clinic ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.patient_id}</td>
                      <td>
                        {patient.first_name} {patient.last_name}
                      </td>
                      <td>{patient.phone || "-"}</td>
                      <td>{patient.email || "-"}</td>
                      <td>{patient.clinic_id ?? "-"}</td>
                      <td>
                        <button
                          type="button"
                          className="patients-action-btn"
                          onClick={() => handleQuickEdit(patient)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}

                {!isLoading && patients.length === 0 && (
                  <tr>
                    <td colSpan="6" className="patients-empty-row">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Patients;
