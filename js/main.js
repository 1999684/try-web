// 主页脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('娱乐小站已加载');
    
    // 可以在这里添加主页的交互效果
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // 鼠标悬停效果可以在这里添加
        });
    });
});