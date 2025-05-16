import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmailId(response.data.emailId);
                })
                .catch((error) => console.log(error));
        }
    }, [id]);

    const validate = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!emailId.trim()) newErrors.emailId = 'Email ID is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const employee = { firstName, lastName, emailId };

        if (id) {
            EmployeeService.updateEmployee(id, employee)
                .then(() => history.push('/employees'))
                .catch((error) => console.log(error));
        } else {
            EmployeeService.createEmployee(employee)
                .then(() => history.push('/employees'))
                .catch((error) => console.log(error));
        }
    };

    const modalTitle = id ? 'Update Employee' : 'Add New Employee';

    return (
        <div className="modal-overlay">
            <div className="modal-content p-5 shadow-lg bg-white rounded">
                <h2>{modalTitle}</h2>
                <form noValidate>
                    <div className="form-group mb-3">
                        <label className="form-label fw-semibold">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label fw-semibold">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                            placeholder="Enter email address"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                    </div>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success px-4" onClick={saveOrUpdateEmployee}>
                            Submit
                        </button>
                        <Link to="/employees" className="btn btn-outline-secondary px-4">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;
