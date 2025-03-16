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
            title: "玛莉的炼金工房 ～萨尔布鲁克的炼金术士～",
            images: {
                bottom: "../resources/a1/2.jpg",
                middle: "../resources/a1/1.png",
                top: "../resources/a1/3.png"
            },
            link: "http://www.gust.co.jp/products/A3/history/marie.html"
        },
        a2: {
            title: "艾莉的炼金工房 ～萨尔布鲁克的炼金术士2～",
            images: {
                bottom: "../resources/a2/2.jpg",
                middle: "../resources/a2/1.png",
                top: "../resources/a2/3.png"
            },
            link: "http://www.gust.co.jp/products/A3/history/elie.html"
        },
        a3: {
            title: "莉莉的炼金工房 ～萨尔布鲁克的炼金术士3～",
            images: {
                bottom: "../resources/a3/2.jpg",
                middle: "../resources/a3/1.png",
                top: "../resources/a3/3.png"
            },
            link: "http://www.gust.co.jp/products/A3/newgame/top.html"
        },
        a4: {
            title: "a2-a10",
            images: {
                bottom: "../resources/a4/2.jpg",
                middle: "../resources/a4/1.png",
                top: "../resources/a4/3.png"
            },
            link: "http://www.gust.co.jp/products/a4/index.html"
        },
        a11: {
            title: "萝乐娜的炼金工房 ～亚兰德之炼金术士～",
            images: {
                bottom: "../resources/a11/2.jpg",
                middle: "../resources/a11/1.png",
                top: "../resources/a11/3.png"
            },
            link: "https://www.gamecity.ne.jp/atelier/arlanddx/index.html"
        },
        a12: {
            title: "托托莉的炼金工房 ～亚兰德之炼金术士2～",
            images: {
                bottom: "../resources/a12/2.jpg",
                middle: "../resources/a12/1.png",
                top: "../resources/a12/3.png"
            },
            link: "https://www.gamecity.ne.jp/atelier/arlanddx/index.html"
        },
        a13: {
            title: "梅露露的炼金工房 ～亚兰德之炼金术士3～",
            images: {
                bottom: "../resources/a13/2.jpg",
                middle: "../resources/a13/1.png",
                top: "../resources/a13/3.png"
            },
            link: "https://www.gamecity.ne.jp/atelier/arlanddx/index.html"
        },
        a14: {
            title: "爱夏的炼金工房 ～黄昏大地之炼金术士～",
            images: {
                bottom: "../resources/a14/2.jpg",
                middle: "../resources/a14/1.png",
                top: "../resources/a14/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/duskdx/"
        },
        a15: {
            title: "爱丝卡&罗吉的炼金工房 ～黄昏天空之炼金术士～",
            images: {
                bottom: "../resources/a15/2.jpg",
                middle: "../resources/a15/1.png",
                top: "../resources/a15/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/duskdx/"
        },
        a16: {
            title: "夏莉的炼金工房 ～黄昏海洋之炼金术士～",
            images: {
                bottom: "../resources/a16/2.jpg",
                middle: "../resources/a16/1.png",
                top: "../resources/a16/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/duskdx/"
        },
        a17: {
            title: "苏菲的炼金工房 ～不可思议书的炼金术士～",
            images: {
                bottom: "../resources/a17/2.jpg",
                middle: "../resources/a17/1.png",
                top: "../resources/a17/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/mysteriousdx/"
        },
        a18: {
            title: "菲利丝的炼金工房 ～不可思议旅的炼金术士～",
            images: {
                bottom: "../resources/a18/2.jpg",
                middle: "../resources/a18/1.png",
                top: "../resources/a18/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/mysteriousdx/"
        },
        a19: {
            title: "莉迪&苏瑞的炼金工房 ～不可思议绘画的炼金术士～",
            images: {
                bottom: "../resources/a19/2.jpg",
                middle: "../resources/a19/1.png",
                top: "../resources/a19/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/mysteriousdx/"
        },
        a20: {
            title: "露露亚的炼金工房 ～亚兰德之炼金术士4～",
            images: {
                bottom: "../resources/a20/2.jpg",
                middle: "../resources/a20/1.png",
                top: "../resources/a20/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/lulua/"
        },
        a21: {
            title: "莱莎的炼金工房～常暗女王与秘密藏身处～",
            images: {
                bottom: "../resources/a21/2.jpg",
                middle: "../resources/a21/1.png",
                top: "../resources/a21/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/ryza/"
        },
        a22: {
            title: "莱莎的炼金工房2 ～失落传说与秘密妖精～",
            images: {
                bottom: "../resources/a22/2.jpg",
                middle: "../resources/a22/1.png",
                top: "../resources/a22/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/ryza2/"
        },
        a23: {
            title: "苏菲的炼金工房2 ～不可思议梦的炼金术士～",
            images: {
                bottom: "../resources/a23/2.jpg",
                middle: "../resources/a23/1.png",
                top: "../resources/a23/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/sophie2/"
        },
        a24: {
            title: "莱莎的炼金工房3 ～终结之炼金术士与秘密钥匙～",
            images: {
                bottom: "../resources/a24/2.jpg",
                middle: "../resources/a24/1.png",
                top: "../resources/a24/3.png"
            },
            link: "https://www.gamecity.com.tw/atelier/ryza3/"
        },
        a25: {
            title: "蕾斯莱莉娅娜的炼金工房 ～忘却的炼金术与极夜的解放者～",
            images: {
                bottom: "../resources/a25/2.jpg",
                middle: "../resources/a25/1.png",
                top: "../resources/a25/3.png"
            },
            link: "https://resleriana.atelier.games/sch/"
        },
        a25ii: {
            title: "蕾斯莱莉娅娜的炼金工房～千之国与万物的管理者～",
            images: {
                bottom: "../resources/a25ii/2.jpg",
                middle: "../resources/a25/1.png",
                top: "../resources/a25ii/3.png"
            },
            link: "https://resleriana.atelier.games/sch/"
        },
        a25rw: {
            title: "红色的炼金术士和白色的守护者 ～蕾斯莱莉娅娜的炼金工房～",
            images: {
                bottom: "../resources/a25rw/2.jpg",
                middle: "../resources/a25rw/1.png",
                top: "../resources/a25rw/3.png"
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