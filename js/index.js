const URL='http://127.0.0.1:8080/'
// 页面加载时检查 localStorage 是否有 token
window.onload = function() {
    // 检查 localStorage 中是否存在 token
    const token = localStorage.getItem('token');
    if (token) {
        // 如果有 token，则显示留言板
        document.getElementById('message-board').style.display = 'block';
    } else {
        // 如果没有 token，则隐藏留言板
        document.getElementById('message-board').style.display = 'none';
    }
};
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认行为 (例如表单提交)
        
        const token = localStorage.getItem('token'); // 获取 token
        
        if (token) {
            const commentData = document.querySelector("#text-area").value; // 获取留言内容

            // 发起 POST 请求
            fetch(URL + 'api/comment/comments', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`, // 在请求头中携带 token
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_content: commentData }) // 发送评论数据
            })
            .then(response => response.json()) // 解析 JSON 响应
            .then(data => {
                console.log(data);
                if(data.code === 200) { // 检查返回的状态码
                    alert("留言成功");
                    window.location.reload(); // 留言成功后刷新页面
                } else {
                    alert("留言失败: " + data.detail); // 显示错误信息
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("留言失败: " + error.message); // 显示请求错误
            });
        } else {
            alert("请先登录"); // 如果没有 token，提示用户登录
        }
    });
});



// 使用 fetch 请求获取图片数据
fetch(URL+'api/home/images', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => response.json())  // 解析响应为 JSON
    .then(data => {
        if (data.code === 200) {
            // 获取轮播图和主图的 URL
            const slideshowImages = data.data.slideshow_url;
            const mainImages = data.data.main_images_url;

            // 显示轮播图
            const slideshowContainer = document.createElement('div');
            slideshowContainer.className = 'slideshow-container';
            slideshowImages.forEach(item => {
                const img = document.createElement('img');
                img.src = URL+item.image_url; // 获取图片的 URL
                console.log(URL+item.image_url);
                img.alt = `Slideshow Image ${item.id}`;
                slideshowContainer.appendChild(img);
            });

            // 显示主图
            const mainImagesContainer = document.createElement('div');
            mainImagesContainer.className = 'main-images-container';
            mainImages.forEach(item => {
                const img = document.createElement('img');
                img.src = URL+item.image_url; // 获取图片的 URL
                console.log(URL+item.image_url);

                img.alt = `Main Image ${item.id}`;
                mainImagesContainer.appendChild(img);
            });

            // 将图片容器添加到页面中
            document.querySelector("body > div.imgs > marquee").appendChild(slideshowContainer);
            document.querySelector("body > div.main").appendChild(mainImagesContainer);
        } else {
            console.error('获取图片失败，错误代码:', data.code);
        }
    })
    .catch(error => {
        console.error('请求失败:', error);
    });







// 使用 fetch 请求获取文章数据
fetch(URL+'api/home/texts', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => response.json())  // 解析响应为 JSON
    .then(data => {
        if (data.code === 200) {
            // 获取文章内容
            const introText = data.data.Intro;
            const newsText = data.data.News;

            // 创建并添加 Intro 内容
            const introContainer = document.createElement('div');
            introContainer.className = 'intro-container';
            const introHeading = document.createElement('h2');
            introHeading.textContent = '介绍';
            const introParagraph = document.createElement('p');
            introParagraph.textContent = introText;
            introContainer.appendChild(introHeading);
            introContainer.appendChild(introParagraph);
            const newsHeading = document.createElement('h2');
            newsHeading.textContent = '新闻';
            const newsParagraph = document.createElement('p');
            newsParagraph.textContent = newsText;
            introContainer.appendChild(newsHeading);
            introContainer.appendChild(newsParagraph);


            // 将文章内容添加到页面中
            document.querySelector("body > div.main").appendChild(introContainer);
        } else {
            console.error('获取文章失败，错误代码:', data.code);
        }
    })
    .catch(error => {
        console.error('请求失败:', error);
    });



// 使用 fetch 请求获取评论数据
fetch(URL+'api/comment/comments', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => response.json())  // 解析响应为 JSON
    .then(data => {
        if (data.code === 200) {
            const comments = data.data;
            const commentContainer = document.createElement('div');
            commentContainer.className = 'comments-container';
            for(const key in comments){
                if (comments.hasOwnProperty(key)) {
                    const comment=comments[key]
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment-item';

                    const comment_username = document.createElement('h3');
                    comment_username.textContent = comment.comment_username+':';
                    comment_username.className = 'comment-username';

                    const comment_role = document.createElement('h4');
                    comment_role.textContent = comment.comment_role;
                    comment_role.className = 'comment-role';

                    const comment_id = document.createElement('h5');
                    comment_id.textContent = 'ID:'+comment.id;
                    comment_id.className = 'comment-id';

                    const comment_data = document.createElement('p');
                    comment_data.textContent = comment.comment_data;
                    comment_data.className = 'comment-data';

                    commentDiv.appendChild(comment_role);
                    commentDiv.appendChild(comment_id);
                    commentDiv.appendChild(comment_username);
                    commentDiv.appendChild(comment_data);
                    commentContainer.appendChild(commentDiv);
                }
            }
            document.querySelector("body > div.main").appendChild(commentContainer);
        }
    })
    .catch(error => {
        console.error('请求失败:', error);
    });


