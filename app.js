// --- MODULE 1: DATA ---
const hiraganaData = {
    "a": [{kana: "あ", romaji: "a"}, {kana: "い", romaji: "i"}, {kana: "う", romaji: "u"}, {kana: "え", romaji: "e"}, {kana: "お", romaji: "o"}],
    "ka": [{kana: "か", romaji: "ka"}, {kana: "き", romaji: "ki"}, {kana: "く", romaji: "ku"}, {kana: "け", romaji: "ke"}, {kana: "こ", romaji: "ko"}],
    "sa": [{kana: "さ", romaji: "sa"}, {kana: "し", romaji: "shi"}, {kana: "す", romaji: "su"}, {kana: "せ", romaji: "se"}, {kana: "そ", romaji: "so"}],
    "ta": [{kana: "た", romaji: "ta"}, {kana: "ち", romaji: "chi"}, {kana: "つ", romaji: "tsu"}, {kana: "て", romaji: "te"}, {kana: "と", romaji: "to"}],
    "na": [{kana: "な", romaji: "na"}, {kana: "に", romaji: "ni"}, {kana: "ぬ", romaji: "nu"}, {kana: "ね", romaji: "ne"}, {kana: "の", romaji: "no"}],
    "ha": [{kana: "は", romaji: "ha"}, {kana: "ひ", romaji: "hi"}, {kana: "ふ", romaji: "fu"}, {kana: "へ", romaji: "he"}, {kana: "ほ", romaji: "ho"}],
    "ma": [{kana: "ま", romaji: "ma"}, {kana: "み", romaji: "mi"}, {kana: "む", romaji: "mu"}, {kana: "め", romaji: "me"}, {kana: "も", romaji: "mo"}],
    "ya": [{kana: "や", romaji: "ya"}, {kana: "ゆ", romaji: "yu"}, {kana: "よ", romaji: "yo"}],
    "ra": [{kana: "ら", romaji: "ra"}, {kana: "り", romaji: "ri"}, {kana: "る", romaji: "ru"}, {kana: "れ", romaji: "re"}, {kana: "ろ", romaji: "ro"}],
    "wa": [{kana: "わ", romaji: "wa"}, {kana: "を", romaji: "wo"}],
    "n": [{kana: "ん", romaji: "n"}]
};

const katakanaData = {
    "a": [{kana: "ア", romaji: "a"}, {kana: "イ", romaji: "i"}, {kana: "ウ", romaji: "u"}, {kana: "エ", romaji: "e"}, {kana: "オ", romaji: "o"}],
    "ka": [{kana: "カ", romaji: "ka"}, {kana: "キ", romaji: "ki"}, {kana: "ク", romaji: "ku"}, {kana: "ケ", romaji: "ke"}, {kana: "コ", romaji: "ko"}],
    "sa": [{kana: "サ", romaji: "sa"}, {kana: "シ", romaji: "shi"}, {kana: "ス", romaji: "su"}, {kana: "セ", romaji: "se"}, {kana: "ソ", romaji: "so"}],
    "ta": [{kana: "タ", romaji: "ta"}, {kana: "チ", romaji: "chi"}, {kana: "ツ", romaji: "tsu"}, {kana: "テ", romaji: "te"}, {kana: "ト", romaji: "to"}],
    "na": [{kana: "ナ", romaji: "na"}, {kana: "ニ", romaji: "ni"}, {kana: "ヌ", romaji: "nu"}, {kana: "ネ", romaji: "ne"}, {kana: "ノ", romaji: "no"}],
    "ha": [{kana: "ハ", romaji: "ha"}, {kana: "ヒ", romaji: "hi"}, {kana: "フ", romaji: "fu"}, {kana: "ヘ", romaji: "he"}, {kana: "ホ", romaji: "ho"}],
    "ma": [{kana: "マ", romaji: "ma"}, {kana: "ミ", romaji: "mi"}, {kana: "ム", romaji: "mu"}, {kana: "メ", romaji: "me"}, {kana: "モ", romaji: "mo"}],
    "ya": [{kana: "ヤ", romaji: "ya"}, {kana: "ユ", romaji: "yu"}, {kana: "ヨ", romaji: "yo"}],
    "ra": [{kana: "ラ", romaji: "ra"}, {kana: "リ", romaji: "ri"}, {kana: "ル", romaji: "ru"}, {kana: "レ", romaji: "re"}, {kana: "ロ", romaji: "ro"}],
    "wa": [{kana: "ワ", romaji: "wa"}, {kana: "ヲ", romaji: "wo"}],
    "n": [{kana: "ン", romaji: "n"}]
};

// --- MODULE 0: UTILS ---
function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconName = type === "success" ? "check_circle" : "error";
    toast.innerHTML = `<span class="material-symbols-rounded">${iconName}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Google Sheets API
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqONAEiU0ugGsoiy5xbEUyGHWhQzePHuFjeHqsytBRXXw96j0CMkINzvFQN2bgYaLlOg/exec';
let vocabList = [];
let isVocabLoading = true;

async function fetchVocab() {
    try {
        const res = await fetch(SCRIPT_URL);
        const data = await res.json();
        vocabList = data;
    } catch (err) {
        console.error("Lỗi lấy dữ liệu Database:", err);
    } finally {
        isVocabLoading = false;
        if(document.getElementById('vocab-view').classList.contains('active')) {
            document.getElementById('btn-next-vocab').click();
        }
    }
}
fetchVocab();

// --- MODULE 2: UI LOGIC & NAVIGATION ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(btn.dataset.target).classList.add('active');
    });
});

// Flip Cards
document.getElementById('hiragana-card').addEventListener('click', function() { this.classList.toggle('is-flipped'); });
document.getElementById('katakana-card').addEventListener('click', function() { this.classList.toggle('is-flipped'); });
document.getElementById('vocab-card').addEventListener('click', function() { this.classList.toggle('is-flipped'); });


// --- MODULE 3: HIRAGANA LEARNING ---
function getSelectedHiragana() {
    let pool = [];
    document.querySelectorAll('#hiragana-checkboxes input:checked').forEach(cb => {
        pool = pool.concat(hiraganaData[cb.value] || []);
    });
    return pool;
}

document.getElementById('btn-select-all-hira').addEventListener('click', (e) => {
    const checkboxes = document.querySelectorAll('#hiragana-checkboxes input');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
    e.target.innerText = allChecked ? "Select All" : "Deselect All";
});

document.querySelectorAll('#hiragana-checkboxes input').forEach(cb => {
    cb.addEventListener('change', () => {
        const checkboxes = document.querySelectorAll('#hiragana-checkboxes input');
        const allChecked = Array.from(checkboxes).every(c => c.checked);
        document.getElementById('btn-select-all-hira').innerText = allChecked ? "Deselect All" : "Select All";
    });
});

document.getElementById('btn-next-hira').addEventListener('click', () => {
    const pool = getSelectedHiragana();
    if (pool.length === 0) return showToast("Vui lòng chọn ít nhất 1 hàng!", "error");
    
    const card = document.getElementById('hiragana-card');
    card.classList.remove('is-flipped');
    
    setTimeout(() => {
        const randomItem = pool[Math.floor(Math.random() * pool.length)];
        document.getElementById('hira-front').innerText = randomItem.kana;
        document.getElementById('hira-back').innerText = randomItem.romaji;
    }, 150); 
});

// --- MODULE 4: KATAKANA LEARNING ---
function getSelectedKatakana() {
    let pool = [];
    document.querySelectorAll('#katakana-checkboxes input:checked').forEach(cb => {
        pool = pool.concat(katakanaData[cb.value] || []);
    });
    return pool;
}

document.getElementById('btn-select-all-kata').addEventListener('click', (e) => {
    const checkboxes = document.querySelectorAll('#katakana-checkboxes input');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
    e.target.innerText = allChecked ? "Select All" : "Deselect All";
});

document.querySelectorAll('#katakana-checkboxes input').forEach(cb => {
    cb.addEventListener('change', () => {
        const checkboxes = document.querySelectorAll('#katakana-checkboxes input');
        const allChecked = Array.from(checkboxes).every(c => c.checked);
        document.getElementById('btn-select-all-kata').innerText = allChecked ? "Deselect All" : "Select All";
    });
});

document.getElementById('btn-next-kata').addEventListener('click', () => {
    const pool = getSelectedKatakana();
    if (pool.length === 0) return showToast("Vui lòng chọn ít nhất 1 hàng!", "error");
    
    const card = document.getElementById('katakana-card');
    card.classList.remove('is-flipped');
    
    setTimeout(() => {
        const randomItem = pool[Math.floor(Math.random() * pool.length)];
        document.getElementById('kata-front').innerText = randomItem.kana;
        document.getElementById('kata-back').innerText = randomItem.romaji;
    }, 150); 
});

// --- MODULE 5: VOCABULARY LEARNING ---
document.getElementById('btn-next-vocab').addEventListener('click', () => {
    if (isVocabLoading) {
        document.getElementById('vocab-kanji').innerText = "⏳";
        document.getElementById('vocab-hiragana').innerText = "Đang kết nối Database...";
        document.getElementById('vocab-romaji').innerText = "Vui lòng đợi";
        document.getElementById('vocab-meaning').innerText = "";
        return;
    }

    const levelFilter = document.getElementById('jlpt-level').value;
    let pool = levelFilter === "all" ? vocabList : vocabList.filter(v => v.level === levelFilter);
    
    if (pool.length === 0) {
        document.getElementById('vocab-kanji').innerText = "-";
        document.getElementById('vocab-hiragana').innerText = "Empty";
        document.getElementById('vocab-romaji').innerText = "Chưa có từ vựng";
        document.getElementById('vocab-meaning').innerText = "";
        return;
    }

    const card = document.getElementById('vocab-card');
    card.classList.remove('is-flipped');
    
    setTimeout(() => {
        const randomItem = pool[Math.floor(Math.random() * pool.length)];
        document.getElementById('vocab-kanji').innerText = randomItem.kanji;
        document.getElementById('vocab-hiragana').innerText = randomItem.hiragana;
        document.getElementById('vocab-romaji').innerText = randomItem.romaji;
        document.getElementById('vocab-meaning').innerText = randomItem.meaning;
    }, 150);
});


// --- MODULE 6: ADD VOCABULARY ---
document.getElementById('add-word-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    
    const newWord = {
        level: document.getElementById('new-level').value,
        kanji: document.getElementById('new-kanji').value,
        hiragana: document.getElementById('new-hiragana').value,
        romaji: document.getElementById('new-romaji').value,
        meaning: document.getElementById('new-meaning').value
    };
    
    btn.innerText = "Đang đẩy lên mây...";
    btn.disabled = true;

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(newWord),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        
        vocabList.push(newWord);
        showToast("Đã lưu từ vựng an toàn lên Đám mây!", "success");
        e.target.reset();
        
        document.getElementById('new-level').value = "N5";
        document.getElementById('selected-new').innerText = "N5";
        document.querySelectorAll('#options-new .custom-option').forEach(o => o.classList.remove('active'));
        document.querySelector('#options-new .custom-option[data-value="N5"]').classList.add('active');
        
    } catch (err) {
        showToast("Lỗi khi lưu lên mây: " + err, "error");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

// CSV Import Logic (Cloud)
document.getElementById('csv-upload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(event) {
        const text = event.target.result;
        const rows = text.split('\n');
        
        let imported = [];
        rows.forEach(row => {
            const cols = row.split(',').map(item => item.trim());
            if (cols.length >= 5 && cols[1]) {
                imported.push({ level: cols[0], kanji: cols[1], hiragana: cols[2], romaji: cols[3], meaning: cols[4] });
            }
        });
        
        if (imported.length > 0) {
            showToast(`Đang đẩy ${imported.length} từ lên Cloud. Vui lòng chờ...`, "success");
            let count = 0;
            for (let word of imported) {
                try {
                    await fetch(SCRIPT_URL, {
                        method: 'POST',
                        body: JSON.stringify(word),
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
                    });
                    vocabList.push(word);
                    count++;
                } catch(err) {
                    console.error("Lỗi đồng bộ", err);
                }
            }
            showToast(`Tuyệt! Đã copy ${count} từ vào Đám mây!`, "success");
        }
    };
    reader.readAsText(file);
    e.target.value = '';
});

// --- MODULE 7: CUSTOM DROPDOWN UI ---
function setupCustomSelect(selectId, optionsId, inputId, displayId) {
    const select = document.getElementById(selectId);
    const optionsPanel = document.getElementById(optionsId);
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    
    if (!select) return;

    select.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-options').forEach(p => { if(p !== optionsPanel) p.classList.remove('show'); });
        optionsPanel.classList.toggle('show');
        e.stopPropagation();
    });

    optionsPanel.addEventListener('click', (e) => {
        if(e.target.classList.contains('custom-option')) {
            optionsPanel.querySelectorAll('.custom-option').forEach(o => o.classList.remove('active'));
            e.target.classList.add('active');
            display.innerText = e.target.innerText;
            input.value = e.target.dataset.value;
            optionsPanel.classList.remove('show');
        }
    });
}
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-options.show').forEach(p => p.classList.remove('show'));
});
setupCustomSelect('custom-jlpt', 'options-jlpt', 'jlpt-level', 'selected-jlpt');
setupCustomSelect('custom-new', 'options-new', 'new-level', 'selected-new');

// Initialize with random cards
document.getElementById('btn-next-hira').click();
document.getElementById('btn-next-kata').click();
// Vocab block will be triggered after fetch completion