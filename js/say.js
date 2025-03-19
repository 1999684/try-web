document.addEventListener('DOMContentLoaded', function () {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteList = document.getElementById('quote-list');
    
    // 备用名言数据（当JSON文件获取失败时使用）
    const fallbackQuotes = [
        { content: "生活不是等待风暴过去，而是学会在雨中跳舞。", author: "佚名" },
        { content: "人生就像骑自行车，要保持平衡就得不断前进。", author: "爱因斯坦" },
        { content: "成功不是最终的，失败也不是致命的，重要的是继续前进的勇气。", author: "丘吉尔" },
        { content: "知识就是力量。", author: "培根" },
        { content: "千里之行，始于足下。", author: "老子" },
        { content: "不要轻易放弃，学习成长的路上，我们长路漫漫，只因学无止境。", author: "佚名" },
        { content: "世上没有绝望的处境，只有对处境绝望的人。", author: "米歇潘" },
        { content: "人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来！", author: "奥斯特洛夫斯基" },
        { content: "天才就是百分之一的灵感加上百分之九十九的汗水。", author: "爱迪生" },
        { content: "书籍是人类进步的阶梯。", author: "高尔基" }
    ];

    // 从JSON文件获取名言
    function fetchQuotesFromJSON() {
        console.log('开始尝试获取JSON文件...');
        
        // GitHub Pages 上的相对路径
        const jsonPath = '/try-web/data/quotes.json';
        
        return fetch(jsonPath)
            .then(response => {
                console.log('获取响应:', response.status, response.statusText);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('获取JSON文件失败:', error);
                // 确保返回一个有效的对象
                return { quotes: [] };
            });
    }

    // 显示今日名言
    function displayTodayQuote(quote) {
        if (quote) {
            quoteText.textContent = quote.content;
            quoteAuthor.textContent = `—— ${quote.author}`;
        } else {
            // 如果没有获取到名言，使用备用名言
            const fallbackQuote = getRandomFallbackQuote();
            quoteText.textContent = fallbackQuote.content;
            quoteAuthor.textContent = `—— ${fallbackQuote.author}`;
        }
    }

    // 显示最近30天的名言
    function displayRecentQuotes(quotes) {
        quoteList.innerHTML = '';
        if (quotes && quotes.length > 0) {
            // 获取当前日期
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 设置为当天的开始时间
            
            // 过滤出当前日期及之前的名言
            const validQuotes = quotes.filter(quote => {
                const quoteDate = new Date(quote.date);
                return quoteDate <= today;
            });
            
            if (validQuotes.length > 0) {
                validQuotes.forEach(quote => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="quote-date">${quote.date}</span>
                        <span class="quote-content">${quote.content}</span>
                        <span class="quote-author">—— ${quote.author}</span>
                    `;
                    quoteList.appendChild(li);
                });
            } else {
                // 如果没有有效的名言，显示提示信息
                const li = document.createElement('li');
                li.textContent = '暂无历史名言数据';
                quoteList.appendChild(li);
            }
        } else {
            // 如果没有获取到名言列表，显示提示信息
            const li = document.createElement('li');
            li.textContent = '暂无历史名言数据';
            quoteList.appendChild(li);
        }
    }

    // 获取随机备用名言
    function getRandomFallbackQuote() {
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        return {
            content: fallbackQuotes[randomIndex].content,
            author: fallbackQuotes[randomIndex].author,
            date: new Date().toISOString().split('T')[0]
        };
    }

    // 初始化
    async function initialize() {
        try {
            console.log('开始获取名言数据...');
            // 获取JSON文件中的名言
            const data = await fetchQuotesFromJSON();
            console.log('获取到的数据:', data);
            
            if (data.quotes && data.quotes.length > 0) {
                // 获取当前日期
                const today = new Date();
                today.setHours(0, 0, 0, 0); // 设置为当天的开始时间
                
                // 过滤出当前日期及之前的名言
                const validQuotes = data.quotes.filter(quote => {
                    const quoteDate = new Date(quote.date);
                    return quoteDate <= today;
                });
                
                if (validQuotes.length > 0) {
                    // 显示今日名言（第一条有效名言）
                    displayTodayQuote(validQuotes[0]);
                    
                    // 显示最近30天的名言
                    displayRecentQuotes(data.quotes);
                    console.log('名言数据显示成功');
                } else {
                    console.warn('未找到当前日期及之前的名言数据，使用备用名言');
                    // 如果没有有效名言，使用备用名言
                    const fallbackQuote = getRandomFallbackQuote();
                    displayTodayQuote(fallbackQuote);
                    displayRecentQuotes([fallbackQuote]);
                }
            } else {
                console.warn('未获取到名言数据，使用备用名言');
                // 如果没有获取到名言，使用备用名言
                const fallbackQuote = getRandomFallbackQuote();
                displayTodayQuote(fallbackQuote);
                displayRecentQuotes([fallbackQuote]);
            }
        } catch (error) {
            console.error('初始化名言时出错:', error);
            // 出错时使用备用名言
            const fallbackQuote = getRandomFallbackQuote();
            displayTodayQuote(fallbackQuote);
            displayRecentQuotes([fallbackQuote]);
        }
    }

    // 添加主题切换功能
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('dark-theme');
            
            // 保存主题偏好到localStorage
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
        
        // 检查用户之前的主题偏好
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // 启动应用
    initialize();
});