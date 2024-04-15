document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            // Handle error response from the server
            const errorMessage = await response.text();
            document.getElementById('message').innerText = errorMessage;
            return;
        }

        // If login is successful, redirect to the appropriate page based on the response
        const redirectUrl = await response.text();
        window.location.href = redirectUrl;
    } catch (error) {
        // Handle network errors or other unexpected errors
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    }

    // Function to add user
function addUser() {
    const userType = document.getElementById('userType').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example: Adding user to Admin Users database
    if (userType === 'Employee') {
        // Add user to Jafra Admin database logic here
    } else if (userType === 'Admin') {
        // Send POST request to add user to admin_users.db
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

});
