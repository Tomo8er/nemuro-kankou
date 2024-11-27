function copyArticleToClipboard() {
    const article = document.getElementById("article");
    const textToCopy = article.innerText;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("記事をクリップボードにコピーしました！");
        })
        .catch(err => {
            alert("コピーに失敗しました。");
        });
}