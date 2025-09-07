import React, { useState } from 'react';
import { Filter, Plus, User } from 'lucide-react';
import './UserList.css';

interface Employee {
  id: number;
  name: string;
  phoneNo: string;
  date: string;
  role: string;
  status: 'Active' | 'InActive' | 'Half Day' | 'On Leave';
}

const UserList: React.FC = () => {
  const [employees] = useState<Employee[]>([
    { id: 1, name: 'Lorem Ipsum', phoneNo: '09203XXXXX', date: '6 Sept 2025', role: 'Lorem Ipsum', status: 'Active' },
    { id: 2, name: 'Lorem Ipsum', phoneNo: '09203XXXXX', date: '6 Sept 2025', role: 'Lorem Ipsum', status: 'Active' },
    { id: 3, name: 'Lorem Ipsum', phoneNo: '09203XXXXX', date: '6 Sept 2025', role: 'Lorem Ipsum', status: 'InActive' },
    { id: 4, name: 'Lorem Ipsum', phoneNo: '09203XXXXX', date: '6 Sept 2025', role: 'Lorem Ipsum', status: 'Active' },
    { id: 5, name: 'Lorem Ipsum', phoneNo: '09203XXXXX', date: '6 Sept 2025', role: 'Lorem Ipsum', status: 'InActive' },
  ]);

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: 'asc' | 'desc' } | null>(null);

  const statusFilters = ['Active', 'InActive', 'Half Day', 'On Leave'];
  const employeesPerPage = 5;

  // Filter employees based on search and status
  React.useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.phoneNo.includes(searchTerm) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter && statusFilter !== '') {
      filtered = filtered.filter(emp => emp.status === statusFilter);
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, employees]);

  // Sort functionality
  const handleSort = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredEmployees(sortedEmployees);
  };

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + employeesPerPage);

  const handleFilterClick = (filter: string) => {
    if (filter === 'Active') setStatusFilter('Active');
    else if (filter === 'InActive') setStatusFilter('InActive');
    else if (filter === 'Half Day') setStatusFilter('Half Day');
    else if (filter === 'On Leave') setStatusFilter('On Leave');
    setShowFiltersDropdown(false);
  };

  const clearFilters = () => {
    setStatusFilter('');
    setSearchTerm('');
    setShowFiltersDropdown(false);
  };

  return (
    <div className="user-list-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              HEY John!<br />
              HERE'S WHAT'S HAPPENING
              TODAY.
            </h1>
            <button className="view-report-btn">VIEW REPORT</button>
          </div>
          <div className="hero-image">
            <img src="/Greetings.svg" alt="Person working" className="hero-illustration" />
          </div>
        </div>
      </section>

      {/* Employee List Section */}
      <section className="employee-section">
        <div className="employee-container">
          <div className="section-header">
            <h2 className="section-title">Employee's List</h2>
          </div>

          <div className="controls-container">
            <div className="left-controls">
              <div className="filters-container">
                <button 
                  className="filters-btn"
                  onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
                >
                  <Filter className="filter-icon" />
                  Filters
                </button>
                
                {showFiltersDropdown && (
                  <div className="filters-dropdown">
                    <div className="dropdown-header">Status</div>
                    <div className="filter-options">
                      <button 
                        className={`filter-option ${statusFilter === '' ? 'active' : ''}`}
                        onClick={clearFilters}
                      >
                        All
                      </button>
                      {statusFilters.map((filter) => (
                        <button
                          key={filter}
                          className={`filter-option ${statusFilter === filter ? 'active' : ''}`}
                          onClick={() => handleFilterClick(filter)}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="add-staff-btn">
                <Plus className="plus-icon" />
                Add Staff
              </button>
            </div>

            {/* <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}
          </div>

          {/* Employee Table */}
          <div className="table-container">
            <table className="employee-table">
              {/* <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th 
                    className="table-header sortable"
                    onClick={() => handleSort('phoneNo')}
                  >
                    Phone No. <ChevronDown className="sort-icon" />
                  </th>
                  <th 
                    className="table-header sortable"
                    onClick={() => handleSort('date')}
                  >
                    Date <ChevronDown className="sort-icon" />
                  </th>
                  <th 
                    className="table-header sortable"
                    onClick={() => handleSort('role')}
                  >
                    Role <ChevronDown className="sort-icon" />
                  </th>
                  <th 
                    className="table-header sortable"
                    onClick={() => handleSort('status')}
                  >
                    Status <ChevronDown className="sort-icon" />
                  </th>
                </tr>
              </thead> */}
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="table-row">
                    <td className="table-cell">{employee.name}</td>
                    <td className="table-cell">{employee.phoneNo}</td>
                    <td className="table-cell">{employee.date}</td>
                    <td className="table-cell">{employee.role}</td>
                    <td className="table-cell">
                      <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserList;