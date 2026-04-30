const results = document.getElementById('results');
const generateButton = document.getElementById('generate-button');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

const THEME_KEY = 'lotto-theme';
const LOTTO_MAX_NUMBER = 45;
const NUMBERS_PER_SET = 6;
const SET_COUNT = 5;

function shuffle(numbers) {
    const shuffled = [...numbers];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled;
}

function createLottoSet() {
    const numbers = Array.from({ length: LOTTO_MAX_NUMBER }, (_, index) => index + 1);
    return shuffle(numbers).slice(0, NUMBERS_PER_SET).sort((a, b) => a - b);
}

function createFiveLottoSets() {
    return Array.from({ length: SET_COUNT }, createLottoSet);
}

function getBallClass(number) {
    if (number <= 10) return 'yellow';
    if (number <= 20) return 'blue';
    if (number <= 30) return 'red';
    if (number <= 40) return 'gray';
    return 'green';
}

function renderLottoSets(sets) {
    results.innerHTML = '';

    sets.forEach((set, index) => {
        const card = document.createElement('article');
        card.className = 'lotto-card';

        const title = document.createElement('h3');
        title.textContent = `${index + 1}세트`;

        const numberList = document.createElement('div');
        numberList.className = 'number-list';

        set.forEach((number) => {
            const ball = document.createElement('span');
            ball.className = `lotto-ball ${getBallClass(number)}`;
            ball.textContent = number;
            numberList.appendChild(ball);
        });

        card.appendChild(title);
        card.appendChild(numberList);
        results.appendChild(card);
    });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === 'dark';

    themeIcon.textContent = isDark ? '☀' : '☾';
    themeLabel.textContent = isDark ? '화이트' : '다크';
    themeToggle.setAttribute('aria-label', isDark ? '화이트 모드로 변경' : '다크 모드로 변경');
}

function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

generateButton.addEventListener('click', () => {
    renderLottoSets(createFiveLottoSets());
});

themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
});

applyTheme(getInitialTheme());
renderLottoSets(createFiveLottoSets());
