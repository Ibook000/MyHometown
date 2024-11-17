document.addEventListener('DOMContentLoaded', () => {
    closeModal()
});

function searchScenery() {
    const searchInput = document.getElementById("search-input").value.trim();
    const sceneryItems = document.querySelectorAll(".scenery-item");
    let found = false;

    sceneryItems.forEach(item => {
        const name = item.querySelector(".scenery-name").textContent.trim();
        if (name.includes(searchInput)) {
            // 找到匹配项，高亮显示
            found = true;
            // 触发放大图片功能
            const img = item.querySelector("img");
            openModal(img.src, name);
        }
    });

    if (!found) {
        alert("未找到匹配的风景名胜！");
    }
}

// 放大图片功能
function openModal(src, caption) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const captionText = document.getElementById("caption");
    modal.style.display = "flex"; // Flexbox 显示
    modalImage.src = src;
    captionText.textContent = caption;
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}
