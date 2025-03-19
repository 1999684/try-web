const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// 名言API地址
const API_URL = 'https://v1.hitokoto.cn/?c=k&encode=json';

// 备用名言数据
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

// 获取随机备用名言
function getRandomFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return {
        content: fallbackQuotes[randomIndex].content,
        author: fallbackQuotes[randomIndex].author
    };
}

// 从API获取名言
async function fetchQuoteFromAPI() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return {
            content: data.hitokoto,
            author: data.from_who || data.from || '佚名'
        };
    } catch (error) {
        console.error('Error fetching quote from API:', error);
        // 使用备用名言
        return getRandomFallbackQuote();
    }
}

// 生成指定日期的名言
async function generateQuoteForDate(date) {
    const quote = await fetchQuoteFromAPI();
    return {
        date: date,
        content: quote.content,
        author: quote.author
    };
}

// 更新名言文件，预先生成未来几天的名言
async function updateQuotesFile(daysToPregenerate = 7) {
    // 获取今天的日期
    const today = new Date();
    
    // 读取现有的名言文件
    const quotesFilePath = path.join(process.cwd(), 'data', 'quotes.json');
    let quotesData;
    
    try {
        const fileContent = fs.readFileSync(quotesFilePath, 'utf8');
        quotesData = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading quotes file:', error);
        quotesData = { quotes: [] };
    }
    
    // 获取已有名言的日期集合，用于检查哪些日期已经有名言
    const existingDates = new Set(quotesData.quotes.map(q => q.date));
    
    // 需要生成的日期列表
    const datesToGenerate = [];
    
    // 检查今天和未来几天是否已有名言，如果没有则添加到待生成列表
    for (let i = 0; i < daysToPregenerate; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        
        if (!existingDates.has(dateString)) {
            datesToGenerate.push(dateString);
        }
    }
    
    // 如果没有需要生成的日期，直接返回
    if (datesToGenerate.length === 0) {
        console.log('All dates already have quotes.');
        return;
    }
    
    console.log(`Generating quotes for ${datesToGenerate.length} dates...`);
    
    // 为每个日期生成名言
    for (const dateString of datesToGenerate) {
        const newQuote = await generateQuoteForDate(dateString);
        
        // 按日期顺序插入到适当位置
        const insertIndex = quotesData.quotes.findIndex(q => q.date < dateString);
        if (insertIndex === -1) {
            // 如果没有更早的日期，添加到末尾
            quotesData.quotes.push(newQuote);
        } else {
            // 否则插入到适当位置
            quotesData.quotes.splice(insertIndex, 0, newQuote);
        }
        
        console.log(`Generated quote for ${dateString}`);
    }
    
    // 按日期降序排序（最新的在前面）
    quotesData.quotes.sort((a, b) => b.date.localeCompare(a.date));
    
    // 只保留最近30天的记录
    if (quotesData.quotes.length > 30) {
        quotesData.quotes = quotesData.quotes.slice(0, 30);
    }
    
    // 保存更新后的文件
    fs.writeFileSync(quotesFilePath, JSON.stringify(quotesData, null, 2), 'utf8');
    console.log('Quotes file updated successfully.');
}

// 执行更新，预先生成7天的名言
updateQuotesFile(7).catch(error => {
    console.error('Error updating quotes file:', error);
    process.exit(1);
});