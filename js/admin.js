const URL ='http://127.0.0.1:8080'
// 选择所有导航栏中的链接
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // 防止默认的跳转行为

        // 获取目标内容区域的ID
        const targetId = this.getAttribute('href').substring(1); // 去掉 # 号
        const targetElement = document.getElementById(targetId);

        // 滚动到目标元素
        targetElement.scrollIntoView({
            behavior: 'smooth', // 平滑滚动
            block: 'start'      // 使目标元素显示在页面顶部
        });
    });
});
// 首页图片上传功能
document.getElementById('imageUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 获取选中的图片类型
    const imageType = document.getElementById('imageType').value;

    // 获取选择的图片文件
    const files = document.getElementById('fileInput').files;
    if (files.length !== 3) {
        alert('请上传 3 张图片！');
        return;
    }

    // 获取本地存储中的 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    // 创建 FormData 对象，准备上传文件
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    // 发送上传请求
    fetch(URL + `/api/home/images?q=${imageType}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('图片上传成功！');
        } else {
            alert('图片上传失败！'+data.detail);
        }
    })
    .catch(error => {
        console.error('上传错误:', error);
        alert('上传失败！');
    });
});

// 文本上传功能
document.getElementById('textUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 获取输入的介绍和新闻内容
    const introText = document.getElementById('intro').value;
    const newsText = document.getElementById('news').value;

    // 获取本地存储中的 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    // 构建请求数据
    const requestData = {
        Intro: introText,
        News: newsText
    };

    // 发送上传请求
    fetch(URL + '/api/home/texts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('上传成功！');
        } else {
            alert('上传失败！' + data.detail); 
        }
    })
    .catch(error => {
        console.error('上传错误:', error);
        alert('上传失败！');
    });
});
// 介绍文本上传功能
document.getElementById('introUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 获取输入的介绍和新闻内容
    const flower = document.getElementById('flower').value;
    const tree = document.getElementById('tree').value;
    const name_origin =document.getElementById('name_origin').value;
    const natural_resource =document.getElementById('natural_resource').value;
    const geographical_environment=document.getElementById('geographical_environment').value;
    const historical_evolution=document.getElementById('historical_evolution').value;
    const population_ethnicity=document.getElementById('population_ethnicity').value;
    const administrative_division=document.getElementById('administrative_division').value;

    // 获取本地存储中的 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    // 构建请求数据
    const requestData = {
        flower: flower,
        tree: tree,
        name_origin: name_origin,
        natural_resource: natural_resource,
        geographical_environment: geographical_environment,
        historical_evolution: historical_evolution,
        population_ethnicity: population_ethnicity,
        administrative_division: administrative_division
    };
    console.log(requestData)
    // 发送上传请求
    fetch(URL + '/api/homeIntro/cityIntro', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('上传成功！');
        } else {
            alert('上传失败！' + data.detail); 
        }
    })
    .catch(error => {
        console.error('上传错误:', error);
        alert('上传失败！');
    });
});

// 风景图片上传功能
document.getElementById('sceneryUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const sceneryName = document.getElementById('sceneryName').value;
    const sceneryIntro = document.getElementById('sceneryIntro').value;
    const sceneryImage = document.getElementById('sceneryImage').files[0];

    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const formData = new FormData();
    formData.append('name', sceneryName);
    formData.append('intro', sceneryIntro);
    formData.append('file', sceneryImage);

    // 发送上传请求
    fetch(URL + `/api/scenery/sceneries`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('上传成功！');
        } else {
            alert('上传失败！'+data.detail);
        }
    })
    .catch(error => {
        console.error('上传错误:', error);
        alert('上传失败！');
    });
});
//风景图片删除
document.getElementById('sceneryDeleteForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    const sceneryName = document.getElementById('SceneryNameDelete').value;

    if (!sceneryName) {
        alert('请输入风景名称！');
        return;
    }

    // 获取 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const requestData = {
        name: sceneryName
    };

    // 发送删除请求
    fetch(URL+'/api/scenery/sceneries', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('删除成功！');
        } else {
            alert('删除失败！' + data.detail);
        }
    })
    .catch(error => {
        console.error('删除错误:', error);
        alert('删除失败！');
    });
});
//美食上传功能
document.getElementById('foodUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const food_name = document.getElementById('foodName').value;
    const food_intro  = document.getElementById('foodIntro').value;
    const file = document.getElementById('fooodImage').files[0];
    const rank = 0

    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const formData = new FormData();
    formData.append('food_name', food_name);
    formData.append('food_intro', food_intro);
    formData.append('rank', rank);
    formData.append('file', file);

    // 发送上传请求
    fetch(URL + `/api/food/foods`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('上传成功！');
        } else {
            alert('上传失败！'+data.detail);
        }
    })
    .catch(error => {
        console.error('上传错误:', error);
        alert('上传失败！');
    });
});

//美食删除
document.getElementById('foodDeleteForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    const foodName = document.getElementById('foodNameDelete').value;

    if (!foodName) {
        alert('请输入美食名称！');
        return;
    }

    // 获取 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const requestData = {
        food_name: foodName
    };

    // 发送删除请求
    fetch(URL+'/api/food/foods', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('删除成功！');
        } else {
            alert('删除失败！' + data.detail);
        }
    })
    .catch(error => {
        console.error('删除错误:', error);
        alert('删除失败！');
    });
});

//新闻上传功能
document.getElementById('foodUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const food_name = document.getElementById('newTitle').value;
    const food_intro  = document.getElementById('newIntro').value;
    const file = document.getElementById('newImage').files[0];
    const rank = 0

    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const formData = new FormData();
    formData.append('food_name', food_name);
    formData.append('food_intro', food_intro);
    formData.append('rank', rank);
    formData.append('file', file);

    // 发送上传请求
    fetch(URL + `/api/food/foods`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('上传成功！');
        } else {
            alert('上传失败！'+data.detail);
        }
    })
    .catch(error => {
        console.error('上传错误:', error);
        alert('上传失败！');
    });
});

//美食删除
document.getElementById('newsDeleteForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    const newTitle = document.getElementById('newTitleDelete').value;

    if (!foodName) {
        alert('请输入新闻名称！');
        return;
    }

    // 获取 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const requestData = {
        title: newTitle
    };

    // 发送删除请求
    fetch(URL+'/api/new/news', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('删除成功！');
        } else {
            alert('删除失败！' + data.detail);
        }
    })
    .catch(error => {
        console.error('删除错误:', error);
        alert('删除失败！');
    });
});
//留言上传
document.getElementById('commentUplodForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    const comment_content = document.getElementById('comment_content').value;

    if (!comment_content) {
        alert('请输入留言名称！');
        return;
    }

    // 获取 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const requestData = {
        comment_content: comment_content
    };

    // 发送删除请求
    fetch(URL+'/api/comment/comments', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('上传成功！');
        } else {
            alert('上传失败！' + data.detail);
        }
    })
    .catch(error => {
        console.error('上传错误:', error);
        alert('上传失败！');
    });
});
//留言删除
document.getElementById('commentDeleteForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    const commentId = document.getElementById('commentId').value;

    if (!commentId) {
        alert('请输入留言id！');
        return;
    }

    // 获取 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const requestData = {
        id: commentId
    };

    // 发送删除请求
    fetch(URL+'/api/comment/comments', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('删除成功！');
        } else {
            alert('删除失败！' + data.detail);
        }
    })
    .catch(error => {
        console.error('删除错误:', error);
        alert('删除失败！');
    });
});

//用户上传
document.getElementById('usermanageDeleteForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交

    const usermanageDeletName = document.getElementById('usermanageDeletName').value;

    if (!usermanageDeletName) {
        alert('请输入用户名称！');
        return;
    }

    // 获取 token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('未找到登录 token，请先登录！');
        return;
    }

    const requestData = {
        username: usermanageDeletName
    };

    // 发送删除请求
    fetch(URL+'/api/usermanage/users', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('删除成功！');
            window.location.reload();
        } else {
            alert('删除失败！' + data.detail);
        }
    })
    .catch(error => {
        console.error('删除错误:', error);
        alert('删除失败！');
    });
});
//获取用户
fetch(URL+'/api/usermanage/users', {
    
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())  // 解析响应为 JSON
    .then(data => {
        if (data.code === 200) {
            const users = data.data;
            const usersContainer = document.createElement('form');
            usersContainer.className = 'users-container';
            for(const key in users){
                if (users.hasOwnProperty(key)) {
                    const user = users[key]
                    const userDiv = document.createElement('div');
                    userDiv.className = 'user-item';

                    const username = document.createElement('h4');
                    username.textContent = "username:"+user.username;
                    username.className = 'user-username';

                    const role = document.createElement('h4');
                    role.textContent = "role:"+user.role;
                    role.className = 'user-role';

                    const id = document.createElement('h4');
                    id.textContent = 'ID:'+user.id;
                    id.className = 'user-id';

                    const email = document.createElement('h4');
                    email.textContent = user.email;
                    email.className = 'user-email';

                    userDiv.appendChild(role);
                    userDiv.appendChild(id);
                    userDiv.appendChild(username);
                    userDiv.appendChild(email);
                    usersContainer.appendChild(userDiv);
                }
            }
            document.getElementById("user-container").appendChild(usersContainer);
        }
    })
    .catch(error => {
        console.error('请求失败:', error);
    });
