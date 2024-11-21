document.addEventListener('DOMContentLoaded', () => {
    closeModal(); // 确保页面加载时模态框是关闭的
});

function searchScenery() {
    const searchInput = document.getElementById("search-input").value.trim();
    const sceneryItems = document.querySelectorAll(".food");
    console.log(searchInput);
    console.log(sceneryItems);
    let found = false;

    sceneryItems.forEach(item => {
        const name = item.querySelector("h3").textContent.trim();
        if (name.includes(searchInput)) {
            // 找到匹配项，高亮显示
            found = true;
            // 触发放大图片功能
            const img = item.querySelector("img");
            openModal(img.src, name, item.querySelector("p").textContent);
            item.style.display = 'block'; // 显示匹配的景点
        } else {
            item.style.display = 'none'; // 隐藏不匹配的景点
        }
    });

    if (!found) {
        alert("未找到匹配的风景名胜！");
    }
}

// 放大图片功能
function openModal(src, caption, intro) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const captionText = document.getElementById("caption");
    const introText = document.getElementById("intro");
    modal.style.display = "flex"; // Flexbox 显示
    modalImage.src = src;
    captionText.textContent = caption;
    introText.textContent = intro;
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

const URL = 'http://127.0.0.1:8080/'; // 基础URL

// 使用 fetch 请求获取景点数据
fetch(URL + 'api/food/foods', { // 注意这里的API路径
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => response.json())  // 解析响应为 JSON
.then(data => {
    if (data.code === 200) {
        // 获取所有景点数据
        const foods = data.data;

        // 创建容器
        const foodContainer = document.createElement('div');
        foodContainer.className = 'foods-container';

        // 遍历每个景点并创建图片、名称和介绍
        for (const key in foods) {
            if (foods.hasOwnProperty(key)) {
                const food = foods[key];
                const foodDiv = document.createElement('div');
                foodDiv.className = 'food';

                // 创建图片元素
                const img = document.createElement('img');
                img.src = URL + food.image_url; // 获取图片的 URL
                img.alt = food.food_name; // 图片的alt属性为景点名称
                img.onclick = () => openModal(img.src, food.food_name, food.food_intro); // 点击图片时触发放大
                foodDiv.appendChild(img);

                // 创建名称元素
                const name = document.createElement('h3');
                name.textContent = food.food_name;
                foodDiv.appendChild(name);

                // 创建介绍元素
                const intro = document.createElement('p');
                intro.textContent = food.food_intro;
                foodDiv.appendChild(intro);

                // 将景点信息添加到容器中
                foodContainer.appendChild(foodDiv);
            }
        }

        // 将容器添加到页面中
        document.querySelector("body > div.main").appendChild(foodContainer);
    } else {
        console.error('获取景点数据失败，错误代码:', data.code);
    }
})
.catch(error => {
    console.error('请求失败:', error);
});