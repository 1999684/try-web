document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const passwordEl = document.getElementById('password');
    const lengthEl = document.getElementById('length');
    const lengthValueEl = document.getElementById('length-value');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const copyNotification = document.getElementById('copy-notification');
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthText = document.querySelector('.strength-text');

    // 更新密码长度显示
    lengthEl.addEventListener('input', function() {
        lengthValueEl.textContent = lengthEl.value;
        if (passwordEl.value) {
            updatePasswordStrength(passwordEl.value);
        }
    });

    // 生成密码
    generateBtn.addEventListener('click', generatePassword);

    // 复制密码
    copyBtn.addEventListener('click', copyPassword);

    // 字符集
    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    };

    // 初始生成一个密码
    generatePassword();

    // 生成密码函数
    function generatePassword() {
        const length = +lengthEl.value;
        const hasUpper = uppercaseEl.checked;
        const hasLower = lowercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;

        // 确保至少选择了一种字符类型
        if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
            alert('请至少选择一种字符类型！');
            lowercaseEl.checked = true;
            return;
        }

        passwordEl.value = generatePasswordLogic(
            length,
            hasLower,
            hasUpper,
            hasNumber,
            hasSymbol
        );

        updatePasswordStrength(passwordEl.value);
    }

    // 密码生成逻辑
    function generatePasswordLogic(length, lower, upper, number, symbol) {
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
            item => Object.values(item)[0]
        );

        // 确保包含所有选中的字符类型
        if (typesCount === 0) {
            return '';
        }

        // 先添加每种类型的至少一个字符
        for (let i = 0; i < typesArr.length; i++) {
            const funcName = Object.keys(typesArr[i])[0];
            generatedPassword += randomFunc[funcName]();
        }

        // 添加剩余字符
        for (let i = typesArr.length; i < length; i++) {
            const funcName = Object.keys(typesArr[Math.floor(Math.random() * typesArr.length)])[0];
            generatedPassword += randomFunc[funcName]();
        }

        // 打乱密码顺序
        return shuffleString(generatedPassword).slice(0, length);
    }

    // 打乱字符串
    function shuffleString(string) {
        const array = string.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    // 复制密码到剪贴板
    function copyPassword() {
        if (!passwordEl.value) return;

        passwordEl.select();
        document.execCommand('copy');
        
        // 显示复制通知
        copyNotification.classList.add('show');
        
        // 确保之前的定时器被清除
        if (window.copyTimeout) {
            clearTimeout(window.copyTimeout);
        }
        
        // 设置新的定时器
        window.copyTimeout = setTimeout(() => {
            copyNotification.classList.remove('show');
        }, 2000);
    }

    // 更新密码强度指示器
    function updatePasswordStrength(password) {
        const strength = calculatePasswordStrength(password);
        
        // 更新强度条
        strengthSegments.forEach((segment, index) => {
            if (index < strength) {
                segment.classList.add('active');
            } else {
                segment.classList.remove('active');
            }
        });

        // 更新强度文本
        let strengthDescription = '';
        if (strength === 1) strengthDescription = '弱';
        else if (strength === 2) strengthDescription = '一般';
        else if (strength === 3) strengthDescription = '中等';
        else if (strength === 4) strengthDescription = '强';

        strengthText.textContent = strengthDescription;
    }

    // 计算密码强度 (1-4)
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // 长度检查
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // 复杂性检查
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^a-zA-Z0-9]/.test(password);
        
        const complexity = hasLower + hasUpper + hasNumber + hasSymbol;
        if (complexity >= 3) strength += 1;
        if (complexity >= 4) strength += 1;
        
        return Math.min(strength, 4);
    }

    // 生成随机字符函数
    function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function getRandomSymbol() {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    // 当选项改变时更新密码强度
    uppercaseEl.addEventListener('change', updateStrengthIfPasswordExists);
    lowercaseEl.addEventListener('change', updateStrengthIfPasswordExists);
    numbersEl.addEventListener('change', updateStrengthIfPasswordExists);
    symbolsEl.addEventListener('change', updateStrengthIfPasswordExists);

    function updateStrengthIfPasswordExists() {
        if (passwordEl.value) {
            updatePasswordStrength(passwordEl.value);
        }
    }
});