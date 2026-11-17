// युजर रजिस्ट्रेशन करण्यासाठी फंक्शन
async function registerUser(username, email, password) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Registration Successful!');
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}