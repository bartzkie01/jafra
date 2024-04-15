// Function to format date and time
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    document.getElementById('dateTime').textContent = `${formatDate(now)} - ${formatTime(now)}`;
}
updateDateTime(); // Update immediately
setInterval(updateDateTime, 1000); // Update every second

// Greet the user
const username = ""; // Insert the username here
document.getElementById('greeting').textContent = `Hello, ${username}!`;

// Function to add a user to Jafra Admin database
function addJafraAdmin() {
    // Add user logic here
}

// Function to delete a user from Jafra Admin database
function deleteJafraAdmin() {
    // Delete user logic here
}

// Function to add a user to Admin Users database
function addAdminUser() {
    // Add user logic here
}

// Function to delete a user from Admin Users database
function deleteAdminUser() {
    // Delete user logic here
}

// Function to toggle notifications
function toggleNotifications() {
    // Toggle notifications logic here
}

// Function to fetch data from Jafra Admin database and populate the table
function populateJafraAdminTable() {
    const jafraAdminTable = document.getElementById('jafraAdminTable');
    // Fetch data from jafra_admin.db and populate the table
    fetch('/jafra_admin_data')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                `;
                jafraAdminTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching Jafra Admin data:', error));
}

// Function to fetch data from Admin Users database and populate the table
function populateAdminUsersTable() {
    const adminUsersTable = document.getElementById('adminUsersTable');
    // Fetch data from admin_users.db and populate the table
    fetch('/admin_users_data')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                `;
                adminUsersTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching Admin Users data:', error));
}

// Call functions to populate tables when the page loads
window.addEventListener('DOMContentLoaded', () => {
    populateJafraAdminTable();
    populateAdminUsersTable();
});

// Function to open add user modal
function openAddUserModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'block';
}

// Function to close add user modal
function closeAddUserModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'none';
}

// Function to open delete user modal
function openDeleteUserModal() {
    const modal = document.getElementById('deleteUserModal');
    modal.style.display = 'block';
}

// Function to close delete user modal
function closeDeleteUserModal() {
    const modal = document.getElementById('deleteUserModal');
    modal.style.display = 'none';
}

// Function to add user
function addUser() {
    // Add user logic here
    const userType = document.getElementById('userType').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example: Adding user to Jafra Admin database
    if (userType === 'Employee') {
        fetch('/add_employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                location.reload(); // Refresh the page to update the table
            } else {
                throw new Error('Failed to add user');
            }
        })
        .catch(error => console.error('Error adding user:', error));
    } else if (userType === 'Admin') {
        fetch('/add_admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                location.reload(); // Refresh the page to update the table
            } else {
                throw new Error('Failed to add user');
            }
        })
        .catch(error => console.error('Error adding user:', error));
    }

    // Close the modal after adding the user
    closeAddUserModal();
}

// Function to delete user
function deleteUser() {
    // Delete user logic here
}

// Function to handle logout
function logout() {
    // Perform logout logic here
    // Redirect to login page or perform other logout actions
    window.location.href = '/index.html';
}
