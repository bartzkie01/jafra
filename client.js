document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageElement = document.getElementById('message');
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
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
            messageElement.innerText = errorMessage;
            return;
        }

        // If login is successful, redirect to the appropriate page based on the response
        const redirectUrl = await response.text();
        window.location.href = redirectUrl;
    } catch (error) {
        // Handle network errors or other unexpected errors
        console.error('Error:', error);
        messageElement.innerText = 'An error occurred. Please try again later.';
    }
});
