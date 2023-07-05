let days = 1;
let locks = 0;
let unlocks = 0;
let buttons = [];
let gameboard = document.getElementById("gameboard");

function createButtons() {
    // ロックとアンロックボタンを3個ずつ
    let lockUnlockButtons = [
        { type: 'lock', count: 3 },
        { type: 'unlock', count: 3 }
    ];

    // その他のボタンの種類を定義
    let otherButtonTypes = [
        { type: 'add', value: 1 },
        { type: 'add', value: 2 },
        { type: 'add', value: 3 },
        { type: 'multiply', value: 2 },
        { type: 'nothing' }
    ];

    // ロックとアンロックボタンを作成
    lockUnlockButtons.forEach(buttonType => {
        for (let i = 0; i < buttonType.count; i++) {
            buttons.push({ type: buttonType.type });
        }
    });

    // ボタンの総数が16個になるまでランダムにボタンを追加
    while (buttons.length < 16) {
        let randomButtonType = otherButtonTypes[Math.floor(Math.random() * otherButtonTypes.length)];
        buttons.push({ type: randomButtonType.type, value: randomButtonType.value });
    }

    // ボタンの配列をシャッフル
    buttons.sort(() => Math.random() - 0.5);
}



function resetGame() {
    gameboard.innerHTML = '';
    days = 1;
    locks = 0;
    unlocks = 0;
    buttons = [];
    document.getElementById("days").textContent = days;
    document.getElementById("locks").textContent = locks;
    document.getElementById("unlocks").textContent = unlocks;
    createButtons();
    createGameBoard();
}

function createGameBoard() {
    // ボタンを生成し、ゲームボードに追加
    buttons.forEach((button, index) => {
        let newButton = document.createElement("button");
        newButton.textContent = "???";
        newButton.addEventListener('click', () => buttonClick(newButton, index));
        gameboard.appendChild(newButton);
    });
}

function buttonClick(buttonElement, index) {
    let button = buttons[index];
    buttonElement.textContent = button.type.charAt(0).toUpperCase() + button.type.slice(1);

    switch (button.type) {
        case 'add':
            days += button.value;
            break;
        case 'multiply':
            days *= button.value;
            break;
        case 'lock':
            locks++;
            break;
        case 'unlock':
            unlocks++;
            break;
    }
    // ボタンを無効化
    buttonElement.disabled = true;

    // 状態更新
    document.getElementById("days").textContent = days;
    document.getElementById("locks").textContent = locks;
    document.getElementById("unlocks").textContent = unlocks;

    // ロックまたは解除が3つたまった場合、ゲーム終了
    if (locks >= 3 || unlocks >= 3) {
        endGame();
        if (locks = 3) startCountdown(days);
    }
}


function endGame() {
    // ボタンを全て無効化
    for (let i = 0; i < gameboard.children.length; i++) {
        gameboard.children[i].disabled = true;
    }

    // ゲーム終了時の状態をcookieに保存（期限は計算された日数後）
    document.cookie = `days=${days}; max-age=${days * 24 * 60 * 60}`;
}

// ゲーム初期化
resetGame();

function startCountdown(days) {
    // 現在の日時を取得
    let now = new Date().getTime();

    // 現在から指定された日数後の日時を計算
    let countdownDate = now + days * 24 * 60 * 60 * 1000;

    // クッキーにカウントダウンの終了日時を保存
    document.cookie = "countdownDate=" + countdownDate + ";path=/";

    // カウントダウンを開始
    let countdown = setInterval(function () {
        // 現在の日時を再取得
        now = new Date().getTime();

        // 残りの時間を計算
        let remainingTime = countdownDate - now;

        // 残りの日数を計算
        let remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        // 残りの時間（日数未満）を計算
        let remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // HTMLにカウントダウンを表示
        document.getElementById("countdown").innerHTML = remainingDays + "d " + remainingHours + "h " + remainingMinutes + "m " + remainingSeconds + "s ";

        // カウントダウンが0になったら停止
        if (remainingTime < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}
