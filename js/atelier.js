document.addEventListener('DOMContentLoaded', function () {
    const imageStack = document.querySelector('.image-stack');
    const bottomLayer = document.querySelector('.bottom-layer');
    const middleLayer = document.querySelector('.middle-layer');
    const topLayer = document.querySelector('.top-layer');
    const titleElement = document.getElementById('title');
    const gameLink = document.getElementById('game-link');
    const switchButtons = document.querySelectorAll('.switch-btn');

    // 游戏数据
    const gameData = {
        a1re: {
            title: "玛莉的炼金工房 Remake ～萨尔布鲁克的炼金术士～",
            images: {
                bottom: "../resources/a1re/2.jpg",
                middle: "../resources/a1re/1.png",
                top: "../resources/a1re/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/marie-re/"
        },
        a1: {
            title: "玛莉的炼金工房 ～萨尔布鲁克的炼金术士～ ",
            images: {
                bottom: "../resources/a1/2.jpg",
                middle: "../resources/a1/1.png",
                top: "../resources/a1/3.png"
            },
            link: ""
        },
        a25rw: {
            title: "红色的炼金术士和白色的守护者 ～蕾斯莱莉娅娜的炼金工房～",
            images: {
                bottom: "../resources/a25w/2.jpg",
                middle: "../resources/a25w/1.png",
                top: "../resources/a25w/3.png"
            },
            link: "https://atelier.games/resleriana_rw/tch/"
        },
        a26: {
            title: "优米雅的炼金工房 ～追忆之炼金术士与幻创之地～",
            images: {
                bottom: "../resources/a26/2.jpg",
                middle: "../resources/a26/1.png",
                top: "../resources/a26/3.png"
            },
            link: "https://atelier.games/yumia/tch/"
        },
    };

    // 切换游戏
    function switchGame(gameId) {
        const game = gameData[gameId];
        if (!game) return;

        // 更新标题和链接
        titleElement.textContent = game.title;
        gameLink.href = game.link;

        // 更新图片
        bottomLayer.src = game.images.bottom;
        middleLayer.src = game.images.middle;
        topLayer.src = game.images.top;

        // 更新按钮状态
        switchButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.game === gameId);
        });
    }

    // 添加按钮点击事件
    switchButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            switchGame(this.dataset.game);
        });
    });

    // 设置移动范围（像素）
    const moveRange = 30;

    imageStack.addEventListener('mousemove', function (e) {
        // 计算鼠标在容器中的相对位置 (0-1)
        const rect = imageStack.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;

        // 计算移动距离
        const moveX = (0.5 - x) * moveRange * 2;

        // 应用不同程度的移动效果
        bottomLayer.style.transform = `translateX(${moveX * 1.5}px)`;
        middleLayer.style.transform = `translateX(${moveX}px)`;
        // 顶层图片保持不动
    });

    // 鼠标离开时重置位置
    imageStack.addEventListener('mouseleave', function () {
        bottomLayer.style.transform = 'translateX(0)';
        middleLayer.style.transform = 'translateX(0)';
    });
});