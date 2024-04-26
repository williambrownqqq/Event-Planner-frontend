// import React, { useState, useEffect } from 'react';
// import '../../styles/FacilityForm.css';
// import adminService from '../../services/admin.service';

// function AdminPanel() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []); // Fetch data when the component mounts

//   const fetchUsers = () => {
//     adminService.getAllUsers()
//       .then(response => {
//         console.log(response.data);
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Users</h2>
//       <table id="users" className="table table-striped">
//         <thead>
//           <tr>
//             <th style={{ width: '150px' }}>Username</th>
//             <th style={{ width: '200px' }}>Email</th>
//             <th>Roles</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>
//                 {/* <a href={`/users/${user.id}`}>{user.username}</a> */}
//                 {user.username}
//               </td>
//               <td>{user.email}</td>
//               <td>{user.roles.map(role => role.name).join(', ')}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import '../../styles/FacilityForm.css';
import adminService from '../../services/admin.service';
import '../../styles/AdminPanel.css'; // Import the new CSS file
function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch data when the component mounts

  const fetchUsers = () => {
    adminService.getAllUsers()
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const promoteUser = (userId) => {
    // console.log(userId)
    adminService.promoteUser(userId)
      .then(response => {
        console.log(response.data);
        fetchUsers(); // Refresh the users list after promoting
      })
      .catch(error => {
        console.error('Error promoting user:', error);
      });
  };

  const demoteUser = (userId) => {
    adminService.demoteUser(userId)
      .then(response => {
        console.log(response.data);
        fetchUsers(); // Refresh the users list after demoting
      })
      .catch(error => {
        console.error('Error demoting user:', error);
      });
  };

  return (
    <div className='container'>
    <div className="admin-panel-container">
    <div className="admin-panel">
      <h2>Users</h2>
      <table id="users" className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                {user.username}
                {/* <a href={`/users/${user.id}`}>{user.username}</a> */}
              </td>
              <td>{user.email}</td>
              <td>{user.roles.map(role => role.name).join(', ')}</td>
              <td>
                <button onClick={() => promoteUser(user.id)}>Promote</button>
                <button onClick={() => demoteUser(user.id)}>Demote</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}

export default AdminPanel;