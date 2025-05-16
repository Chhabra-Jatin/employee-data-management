import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faTrash,
    faSearch,
    faArrowDownAZ,
    faArrowUpZA,
    faSort
} from '@fortawesome/free-solid-svg-icons';



const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            })
            .catch((error) => console.log(error));
    };

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId)
            .then(() => getAllEmployees())
            .catch((error) => console.log(error));
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        filterAndSortEmployees(employees, value, sortConfig);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        const newConfig = { key, direction };
        setSortConfig(newConfig);
        filterAndSortEmployees(employees, searchTerm, newConfig);
    };

    const filterAndSortEmployees = (baseList, keyword, sortCfg) => {
        let filtered = [...baseList];

        // Filter
        if (keyword) {
            filtered = filtered.filter(emp =>
                emp.firstName.toLowerCase().includes(keyword) ||
                emp.lastName.toLowerCase().includes(keyword) ||
                emp.emailId.toLowerCase().includes(keyword)
            );
        }

        // Sort
        if (sortCfg.key) {
            filtered.sort((a, b) => {
                const valA = a[sortCfg.key].toLowerCase();
                const valB = b[sortCfg.key].toLowerCase();

                if (valA < valB) return sortCfg.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortCfg.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredEmployees(filtered);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? (
                <FontAwesomeIcon icon={faArrowDownAZ} className="ms-1 text-white" />
            ) : (
                <FontAwesomeIcon icon={faArrowUpZA} className="ms-1 text-white" />
            );
        }
        // Default neutral icon
        return <FontAwesomeIcon icon={faSort} className="ms-1 text-white" />;
    };

    return (
        <div className="container mt-5">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-gradient fw-bold">Employee Directory</h2>
                <Link to="/add-employee" className="btn btn-success fw-semibold shadow-sm">
                    + Add Employee
                </Link>
            </div>

            <div className="input-group mb-4 shadow-sm">
                <span className="input-group-text bg-white">
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="table-responsive rounded shadow-sm">
                <table className="table table-bordered align-middle">
                    <thead className="table-dark text-center">
                        <tr>
                            <th className="fw-semibold">ID</th>
                            <th className="fw-semibold" onClick={() => handleSort('firstName')} style={{ cursor: 'pointer' }}>
                                First Name {getSortIcon('firstName')}
                            </th>
                            <th className="fw-semibold" onClick={() => handleSort('lastName')} style={{ cursor: 'pointer' }}>
                                Last Name {getSortIcon('lastName')}
                            </th>
                            <th className="fw-semibold">Email</th>
                            <th className="fw-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-muted">
                                    No matching employees found.
                                </td>
                            </tr>
                        ) : (
                            filteredEmployees.map((employee, index) => (
                                <tr key={employee.id}>
                                    {/* <td className="text-center fw-bold">{employee.id}</td> */}
                                    <td className="text-center fw-bold">{index + 1}</td>
                                    <td className="fw-semibold">{employee.firstName}</td>
                                    <td className="fw-semibold">{employee.lastName}</td>
                                    <td className="fw-semibold">{employee.emailId}</td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <Link
                                                to={`/edit-employee/${employee.id}`}
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} /> Update
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteEmployee(employee.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
