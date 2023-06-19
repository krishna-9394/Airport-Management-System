async function login() {
    // Get the values of the username and password fields
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const url = "http://localhost:3000/login";
    const data = { username: username, password: password };

    // Make a POST API call to the login endpoint with the username and password as data
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      alert('Received response:', data);
    })
    .catch(error => {
      alert('Error:', error);
    });
}
