import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { User, Menu, X, ChevronDown, Settings, LogOut, FileText, Bed, PlusSquare } from 'lucide-react';
import './Header.css';
import { Link } from 'react-router-dom';

interface DropdownItem {
  label: string;
  path: string;
  description?: string;
}

interface NavItem {
  label: string;
  path?: string;
  dropdown?: DropdownItem[];
}

interface ProfileMenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  description?: string;
}

const navigationItems: NavItem[] = [
  { label: 'Home', path: '/home' },
  {
    label: 'Rooms',
    dropdown: [
      { label: 'All Rooms', path: '/rooms', description: 'Browse all rooms' },
      { label: 'Add Room', path: '/addroom', description: 'Add a new room' },
    ],
  },
  {
    label: 'Reservations',
    dropdown: [
      { label: 'View Reservations', path: '/reservations', description: 'Manage bookings and reservations' },
      { label: 'Create Reservation', path: '/reservations/create', description: 'Create a new reservation' },
    ],
  },
  { label: 'Invoices', path: '/invoice' },
  {
    label: 'Management',
    dropdown: [
      { label: 'Dashboard', path: '/dashboard', description: 'Hotel analytics & reports' },
      { label: 'Employees', path: '/employees', description: 'Manage employees & staff' },
    ],
  },
];

const profileMenuItems: ProfileMenuItem[] = [
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings className="w-4 h-4" />,
    description: 'Hotel settings and preferences',
  },
  {
    label: 'Sign Out',
    path: '/logout',
    icon: <LogOut className="w-4 h-4" />,
    description: 'Sign out of your account',
  },
];

export const Header: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll detection for header hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 50) return;
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
        setIsMobileMenuOpen(false);
        setIsProfileMenuOpen(false);
        setActiveDropdown(null);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown-container')) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    navigateTo(path);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsProfileMenuOpen(false);
  };

  const handleMobileDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className={`header-container ${isHeaderVisible ? 'header-visible' : 'header-hidden'}`}>
      <div className="header-content-full">
        <div className="header-mobile-wrapper">
          <Link className="logo-container" to="/home">
            <img src="/logo2.svg" alt="Quorium Consulting" className="logo" />
          </Link>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="right-section flex items-center space-x-6">
          <div className="desktop-nav">
            <nav className="nav-menu">
              {navigationItems.map((item) => (
                <div key={item.label} className="nav-item-container group">
                  <button
                    className="nav-item"
                    onClick={() => item.path && handleNavigation(item.path)}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                  </button>

                  {item.dropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-content">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.path}
                            onClick={() => handleNavigation(dropdownItem.path)}
                            className="dropdown-item"
                          >
                            <div>
                              <div className="dropdown-item-label">{dropdownItem.label}</div>
                              {dropdownItem.description && (
                                <div className="dropdown-item-description">
                                  {dropdownItem.description}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* User Avatar with Profile Dropdown */}
          <div className="user-avatar-desktop">
            <div className="profile-dropdown-container">
              <button className="avatar-container" onClick={toggleProfileMenu}>
                <User className="w-5 h-5 text-white" />
              </button>
              {isProfileMenuOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-dropdown-content">
                    {profileMenuItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className="profile-dropdown-item"
                      >
                        <div className="profile-item-icon">{item.icon}</div>
                        <div className="profile-item-content">
                          <div className="profile-item-label">{item.label}</div>
                          {item.description && (
                            <div className="profile-item-description">{item.description}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              {navigationItems.map((item) => (
                <div key={item.label} className="mobile-nav-item">
                  <button
                    onClick={() =>
                      item.dropdown ? handleMobileDropdownToggle(item.label) : item.path && handleNavigation(item.path)
                    }
                    className="mobile-nav-button"
                  >
                    <span>{item.label}</span>
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="mobile-dropdown">
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.path}
                          onClick={() => handleNavigation(dropdownItem.path)}
                          className="mobile-dropdown-item"
                        >
                          <div>
                            <div className="mobile-dropdown-label">{dropdownItem.label}</div>
                            {dropdownItem.description && (
                              <div className="mobile-dropdown-description">{dropdownItem.description}</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Mobile Profile Section */}
              <div className="mobile-user-section">
                <div className="mobile-settings-title">
                  <User className="w-4 h-4" />
                  <span>Profile & Settings</span>
                </div>
                <div className="mobile-profile-menu">
                  {profileMenuItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className="mobile-profile-item"
                    >
                      <div className="mobile-profile-icon">{item.icon}</div>
                      <div className="mobile-profile-content">
                        <div className="mobile-profile-label">{item.label}</div>
                        {item.description && (
                          <div className="mobile-profile-description">{item.description}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
