document.addEventListener('DOMContentLoaded', function () {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteList = document.getElementById('quote-list');
    
    // 备用名言数据（当API请求失败时使用）
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

    // 从GitHub自动更新的JSON文件获取名言
    function fetchQuotesFromJSON() {
        return fetch('./data/quotes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching quotes JSON:', error);
                // 如果无法获取JSON文件，返回空数组
                return { quotes: [] };
            });
    }

    // 显示今日名言
    function displayTodayQuote(quote) {
        quoteText.textContent = quote.content;
        quoteAuthor.textContent = `—— ${quote.author}`;
    }

    // 显示最近30天的名言
    function displayRecentQuotes(quotes) {
        quoteList.innerHTML = '';
        quotes.forEach(quote => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="quote-date">${quote.date}</span>
                <span class="quote-content">${quote.content}</span>
                <span class="quote-author">—— ${quote.author}</span>
            `;
            quoteList.appendChild(li);
        });
    }

    // 使用备用名言
    function useRandomFallbackQuote() {
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
            // 获取JSON文件中的名言
            const data = await fetchQuotesFromJSON();
            
            if (data.quotes && data.quotes.length > 0) {
                // 显示今日名言（第一条）
                displayTodayQuote(data.quotes[0]);
                
                // 显示最近30天的名言
                displayRecentQuotes(data.quotes);
            } else {
                // 如果没有获取到名言，使用备用名言
                const fallbackQuote = useRandomFallbackQuote();
                displayTodayQuote(fallbackQuote);
                displayRecentQuotes([fallbackQuote]);
            }
        } catch (error) {
            console.error('Error initializing quotes:', error);
            // 出错时使用备用名言
            const fallbackQuote = useRandomFallbackQuote();
            displayTodayQuote(fallbackQuote);
            displayRecentQuotes([fallbackQuote]);
        }
    }

    // 启动应用
    initialize();
});