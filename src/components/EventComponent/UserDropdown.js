import React, { useState, useRef, useEffect } from 'react';
import '../../styles/UserDropdown.css';

const UserDropdown = ({ users, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleCheckboxChange = (userId, isChecked) => {
    let newSelectedUsers;
    if (isChecked) {
      newSelectedUsers = [...selectedUsers, userId];
    } else {
      newSelectedUsers = selectedUsers.filter((id) => id !== userId);
    }
    setSelectedUsers(newSelectedUsers);
    onSelectionChange(newSelectedUsers);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown}>Select Users</button>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        {users.map((user) => (
          <label key={user.id}>
            <input
              type="checkbox"
              value={user.id}
              checked={selectedUsers.includes(user.id)}
              onChange={(e) => handleCheckboxChange(user.id, e.target.checked)}
            />
            {user.username}
          </label>
        ))}
      </div>
      <div className="selected-items">
        {selectedUsers.map((userId) => (
          <div key={userId}>{users.find((user) => user.id === userId).username}</div>
        ))}
      </div>
    </div>
  );
};

export default UserDropdown;