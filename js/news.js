const URL = 'http://127.0.0.1:8080/'; 

fetch(URL + 'api/new/news', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    if (data.code === 200) {
        const news = data.data;
        // 创建容器
        const newsContainer = document.createElement('div');
        newsContainer.className = 'news-container';

        // 遍历每个景点并创建图片、名称和介绍
        for (const key in news) {
            if (news.hasOwnProperty(key)) {
                const newsItem = news[key];
                const newDiv = document.createElement('div');
                newDiv.className = 'new';

                // 创建图片元素
                const img = document.createElement('img');
                img.src = URL + newsItem.image_url[0]; // 获取图片的 URL
                img.alt = newsItem.new_title; // 图片的alt属性为景点名称
                newDiv.appendChild(img);

                // 创建名称元素
                const name = document.createElement('h3');
                name.textContent = newsItem.new_title;
                newDiv.appendChild(name);

                // 创建介绍元素
                const intro = document.createElement('p');
                intro.textContent = newsItem.new_intro;
                newDiv.appendChild(intro);

                // 将景点信息添加到容器中
                newsContainer.appendChild(newDiv);
            }
        }

        // 将容器添加到页面中
        document.querySelector("body > div.main").appendChild(newsContainer);
    } else {
        console.error('获取景点数据失败，错误代码:', data.code);
    }
})
.catch(error => {
    console.error('请求失败:', error);
});