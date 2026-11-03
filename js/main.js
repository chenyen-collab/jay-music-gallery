
let songs = [];

// 讀取歌曲資料
async function loadSongs() {
    try {
        const response = await fetch("data/songs.json");

        if (!response.ok) {
            throw new Error("無法讀取歌曲資料");
        }

        songs = await response.json();

        console.log("歌曲資料載入成功：", songs);
    } catch (error) {
        console.error("載入失敗：", error);

        document.getElementById("searchResult").textContent =
            "歌曲資料載入失敗，請確認網站執行方式。";
    }
}

// 搜尋歌曲
function searchSong() {
    const keyword = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();

    const resultBox = document.getElementById("searchResult");

    resultBox.replaceChildren();

    if (!keyword) {
        resultBox.textContent = "請先輸入歌曲名稱。";
        return;
    }

    const results = songs.filter(song =>
        song.title.toLowerCase().includes(keyword)
    );

    if (results.length === 0) {
        resultBox.textContent = "找不到符合條件的歌曲。";
        return;
    }

    results.forEach(song => {
        const card = document.createElement("div");
        card.className = "song-result";

        const title = document.createElement("h3");
        title.textContent = "🎵 " + song.title;

        const album = document.createElement("p");
        album.textContent = "所屬專輯：" + song.album;

        const style = document.createElement("p");
        style.textContent = "音樂風格：" + song.style;

        const description = document.createElement("p");
        description.textContent = "歌曲介紹：" + song.description;

        card.append(title, album, style, description);
        resultBox.appendChild(card);
    });
}

// 綁定搜尋按鈕
document.getElementById("searchButton")
    .addEventListener("click", searchSong);

// 按 Enter 也可以搜尋
document.getElementById("searchInput")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchSong();
        }
    });

// 網站載入時讀取資料
loadSongs();
