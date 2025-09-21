import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { PageLoader, SearchLoader } from '../../components/Loader/Loader';
import './UserListPage.css';
import { Link } from 'react-router-dom';

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
    { id: 1, name: 'John Smith', phoneNo: '9876543210', date: '6 Sept 2025', role: 'Front Desk', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', phoneNo: '9123456780', date: '6 Sept 2025', role: 'Housekeeping', status: 'Active' },
    { id: 3, name: 'Michael Brown', phoneNo: '9988776655', date: '6 Sept 2025', role: 'Manager', status: 'InActive' },
    { id: 4, name: 'Emily Davis', phoneNo: '9876501234', date: '6 Sept 2025', role: 'Concierge', status: 'Active' },
    { id: 5, name: 'David Wilson', phoneNo: '9012345678', date: '6 Sept 2025', role: 'Housekeeping', status: 'InActive' },
    { id: 6, name: 'Lisa Anderson', phoneNo: '9876123456', date: '6 Sept 2025', role: 'Reception', status: 'InActive' },
    { id: 7, name: 'Robert Taylor', phoneNo: '9988112233', date: '6 Sept 2025', role: 'Chef', status: 'InActive' },
    { id: 8, name: 'Maria Garcia', phoneNo: '9876998877', date: '6 Sept 2025', role: 'Bartender', status: 'InActive' },
    { id: 9, name: 'James Martinez', phoneNo: '9123459876', date: '6 Sept 2025', role: 'Security', status: 'InActive' },
    { id: 10, name: 'Sophia Lee', phoneNo: '9876541230', date: '6 Sept 2025', role: 'Housekeeping', status: 'InActive' },
  ]);

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: 'asc' | 'desc' } | null>(null);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const statusFilters = ['Active', 'InActive', 'Half Day', 'On Leave'];
  const employeesPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        filtered = filtered.filter(emp =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.phoneNo.includes(searchTerm) ||
          emp.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (statusFilter) {
          filtered = filtered.filter(emp => emp.status === statusFilter);
        }
        setFilteredEmployees(filtered);
        setCurrentPage(1);
        setSearchLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      if (statusFilter) {
        filtered = filtered.filter(emp => emp.status === statusFilter);
      }
      setFilteredEmployees(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, statusFilter, employees]);

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

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + employeesPerPage);

  const handleFilterClick = (filter: string) => {
    setStatusFilter(filter);
    setShowFiltersDropdown(false);
  };

  const clearFilters = () => {
    setStatusFilter('');
    setSearchTerm('');
    setShowFiltersDropdown(false);
  };

  if (loading) {
    return (
      <PageLoader text='Loading Users...' />
    );
  }

  return (
    <div className="user-list-page mt-5">

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

              <Link to="/signup" className="add-staff-btn">
                <Plus className="plus-icon" />
                Add Staff
              </Link>
            </div>

            {/* Search bar with loader */}
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchLoading && <SearchLoader />} {/* Search loader */}
            </div>
          </div>

          {/* Employee Table */}
          <div className="table-container">
            <table className="employee-table">
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="table-row">
                    <td className="table-cell">{employee.name}</td>
                    <td className="table-cell">{employee.phoneNo}</td>
                    <td className="table-cell">{employee.date}</td>
                    <td className="table-cell">{employee.role}</td>
                    <td className="table-cell">
                      {/* <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                        {employee.status}
                      </span> */}
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