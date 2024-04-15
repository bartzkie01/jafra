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
            const errorData = await response.json();
            document.getElementById('message').innerText = errorData.error;
            return;
        }

        // If login is successful, redirect to the appropriate page based on the response
        const responseData = await response.json();
        const redirectUrl = responseData.redirect;
        window.location.href = redirectUrl;
    } catch (error) {
        // Handle network errors or other unexpected errors
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    }
});
