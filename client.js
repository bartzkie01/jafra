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

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error);
    }

    const redirectUrl = responseData.redirect;
    window.location.href = redirectUrl;
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('message').innerText = error.message || 'An error occurred. Please try again later.';
  }
});
