document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const URL = 'http://127.0.0.1:8080/api/usermanage/token'; // 移除了错误的转义字符和单引号

    fetch(URL, { 
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded' // 与curl命令保持一致
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}` // 使用URL编码
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.access_token) { // 根据实际返回的数据结构来检查
            localStorage.setItem('token', data.access_token); // 存储token

            if (username == 'testUser123'){
                alert("管理员登录成功");
                window.location.href = 'admin.html'; // 假设登录成功后跳转到login.html
            } else{
                alert("登录成功");
                window.location.href = 'index.html';
            }

        } else {
            if(data.detail) {
                alert("登录失败:" + data.detail);
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("登录失败:" + error);
    });
});

