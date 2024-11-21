const URL = 'http://127.0.0.1:8080/';

// 使用 fetch 请求获取数据
fetch(URL + 'api/homeIntro/cityIntro', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => response.json())  // 解析响应为 JSON
    .then(data => {
        if (data.code === 200) {
            const cityIntro = data.data;  // 获取返回的 cityIntro 数据
            const introContainer = document.createElement('div');
            introContainer.className = 'intro-container';

            // 创建并填充各个段落内容
            const createIntroSection = (title, content) => {
                const section = document.createElement('div');
                section.className = 'intro-section';
                
                const heading = document.createElement('h3');
                heading.textContent = title;
                section.appendChild(heading);

                const paragraph = document.createElement('p');
                paragraph.textContent = content;
                section.appendChild(paragraph);

                return section;
            };

            // 添加各个介绍部分
            introContainer.appendChild(createIntroSection('地名起源', cityIntro.name_origin));
            introContainer.appendChild(createIntroSection('代表树种', cityIntro.tree));
            introContainer.appendChild(createIntroSection('代表花卉', cityIntro.flower));
            introContainer.appendChild(createIntroSection('自然资源', cityIntro.natural_resource));
            introContainer.appendChild(createIntroSection('地理环境', cityIntro.geographical_environment));
            introContainer.appendChild(createIntroSection('历史演变', cityIntro.historical_evolution));
            introContainer.appendChild(createIntroSection('人口与民族', cityIntro.population_ethnicity));

            // 将 introContainer 添加到页面中
            document.querySelector("body > div.main").appendChild(introContainer);
        } else {
            console.error('获取数据失败，错误代码:', data.code);
        }
    })
    .catch(error => {
        console.error('请求失败:', error);
    });
