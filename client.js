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
});
