document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    const URL='http://127.0.0.1:8080/'

    fetch(URL+'api/usermanage/users', { 
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.code === 200) { 
            window.location.href = 'login.html';
        } else {
            if(data.detail) {
                alert("注册请求失败：" + data.detail);
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("注册请求失败：" + error);
    });
});