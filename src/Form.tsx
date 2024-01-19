import React from 'react';

interface FormProps {
  onSubmit: (data: Props) => void;
}

enum JobTitles {
  Accountant = 'accountant',
  SoftwareDeveloper = 'software developer',
  SoftwareTester = 'software tester',
  Manager = 'manager',
  None = '',
}

export interface Props {
  companyName: string;
  companyEmail: string;
  companyEmployees: number;
  companyDescription: string;
  employeeName: string;
  employeeEmail: string;
  employeeJobTitle: JobTitles;
  employeeAge: number;
  employeeCV: File | null;
}

function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

const formStyle = {
  fontFamily: 'Arial, sans-serif',
  maxWidth: '400px',
  margin: 'auto',
};

const labelStyle = {
  display: 'block',
  margin: '10px 0',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#FEEFCF',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export function ExampleForm({ onSubmit }: FormProps) {
  const [formData, setFormData] = React.useState<Props>({
    companyName: '',
    companyEmail: '',
    companyEmployees: 0,
    companyDescription: '',
    employeeName: '',
    employeeEmail: '',
    employeeJobTitle: JobTitles.None,
    employeeAge: 0,
    employeeCV: null,
  });

  const [isFormValid, setIsFormValid] = React.useState<boolean>(true);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateForm();
  }

  function validateForm() {
    const isCompanyEmailValid = isEmailValid(formData.companyEmail);
    const isEmployeeEmailValid = isEmailValid(formData.employeeEmail);

    const areRequiredFieldsSet =
      formData.companyName.trim() !== '' &&
      formData.companyEmail.trim() !== '' &&
      formData.employeeName.trim() !== '' &&
      formData.employeeEmail.trim() !== '' &&
      formData.employeeJobTitle !== JobTitles.None &&
      formData.employeeAge > 0;

    setIsFormValid(isCompanyEmailValid && isEmployeeEmailValid && areRequiredFieldsSet);
  }

  function handleEmployeeCVChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    setFormData({ ...formData, employeeCV: files?.[0] || null });
    validateForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Company Fields */}
      <label style={labelStyle}>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          style={inputStyle}
          required={true}
        />
      </label>
      <label style={labelStyle}>
        Company Email:
        <input
          type="text"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleInputChange}
          style={inputStyle}
          required={true}
        />
      </label>
      <label style={labelStyle}>
        Company Employees:
        <input
          type="number"
          name="companyEmployees"
          value={formData.companyEmployees}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Company Description:
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </label>

      {/* Employee Fields */}
      {Array.from({ length: formData.companyEmployees }).map((_, index) => (
        <div key={index}>
          <label style={labelStyle}>
            Employee Name:
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              style={inputStyle}
              required={true}
            />
          </label>
          <label style={labelStyle}>
            Employee Email:
            <input
              type="text"
              name="employeeEmail"
              value={formData.employeeEmail}
              onChange={handleInputChange}
              style={inputStyle}
              required={true}
            />
          </label>
          <label style={labelStyle}>
            Employee Job Title:
            <select
              name="employeeJobTitle"
              value={formData.employeeJobTitle}
              onChange={handleInputChange}
              style={inputStyle}
              required={true}
            >
              {Object.values(JobTitles).map((jobTitle) => (
                <option key={jobTitle} value={jobTitle}>
                  {jobTitle}
                </option>
              ))}
            </select>
          </label>
          <label style={labelStyle}>
            Employee Age:
            <input
              type="number"
              name="employeeAge"
              value={formData.employeeAge}
              onChange={handleInputChange}
              style={inputStyle}
              required={true}
            />
          </label>
          <label style={labelStyle}>
            Employee CV:
            <input
              type="file"
              name={`employees[${index}].employeeCV`}
              onChange={handleEmployeeCVChange}
              style={inputStyle}
              required={true}
            />
          </label>
        </div>
      ))}

      {/* Submit Button */}
      <button type="submit" disabled={!isFormValid} style={buttonStyle}>
        Submit
      </button>
    </form>
  );
}
