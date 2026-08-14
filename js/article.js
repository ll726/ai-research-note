// ============================================================
// 記事詳細ページ用スクリプト
// URLの ?id=xxxx を見て該当記事を表示する
// ============================================================

(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const catMap = {};
  CATEGORIES.forEach(function (c) {
    catMap[c.id] = c;
  });

  const article = ARTICLES.find(function (a) {
    return a.id === id;
  });

  const container = document.getElementById("article-container");

  if (!article) {
    container.innerHTML =
      '<div class="empty-message">記事が見つかりませんでした。<br><a href="index.html">トップページへ戻る</a></div>';
    return;
  }

  const cat = catMap[article.category];
  document.title = article.title + " | AI調査ノート";

  container.innerHTML =
    '<article class="article-detail">' +
    '<div class="article-meta">' +
    (cat
      ? '<a class="badge" style="background:' + cat.color + '" href="index.html?cat=' + cat.id + '">' + escapeHtml(cat.name) + "</a>"
      : "") +
    "<span>" + escapeHtml(article.date) + "</span></div>" +
    "<h1>" + escapeHtml(article.title) + "</h1>" +
    '<div class="article-body">' + article.content + "</div>" +
    "</article>";

  // ---- 同じカテゴリの他の記事 ----
  const related = ARTICLES.filter(function (a) {
    return a.category === article.category && a.id !== article.id;
  })
    .sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 5);

  if (related.length > 0) {
    const relatedWrap = document.getElementById("related");
    let html = '<h2 class="section-title">同じカテゴリの記事</h2><div class="article-list">';
    related.forEach(function (a) {
      html +=
        '<a class="article-card" href="article.html?id=' + encodeURIComponent(a.id) + '">' +
        '<div class="article-meta"><span>' + escapeHtml(a.date) + "</span></div>" +
        "<h3>" + escapeHtml(a.title) + "</h3>" +
        '<div class="summary">' + escapeHtml(a.summary || "") + "</div></a>";
    });
    html += "</div>";
    relatedWrap.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
