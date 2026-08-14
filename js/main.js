// ============================================================
// トップページ用スクリプト(カテゴリ一覧・記事一覧・検索・絞り込み)
// ============================================================

(function () {
  const params = new URLSearchParams(location.search);
  const activeCat = params.get("cat") || "";

  const catMap = {};
  CATEGORIES.forEach(function (c) {
    catMap[c.id] = c;
  });

  // 記事は日付の新しい順に並べる(同日ならidの大きい順)
  const sortedArticles = ARTICLES.slice().sort(function (a, b) {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.id < b.id ? 1 : -1;
  });

  // ---- カテゴリ一覧を描画 ----
  function renderCategories() {
    const grid = document.getElementById("category-grid");
    grid.innerHTML = "";
    CATEGORIES.forEach(function (cat) {
      const count = ARTICLES.filter(function (a) {
        return a.category === cat.id;
      }).length;
      const card = document.createElement("a");
      card.className = "category-card" + (cat.id === activeCat ? " active" : "");
      card.href = cat.id === activeCat ? "index.html" : "index.html?cat=" + cat.id;
      card.innerHTML =
        '<span class="cat-name"><span class="badge" style="background:' + cat.color + '">&nbsp;</span> ' +
        escapeHtml(cat.name) + '</span><span class="cat-count">(' + count + '件)</span>' +
        '<div class="cat-desc">' + escapeHtml(cat.description || "") + "</div>";
      grid.appendChild(card);
    });
  }

  // ---- 記事一覧を描画 ----
  function renderArticles(keyword) {
    const list = document.getElementById("article-list");
    const status = document.getElementById("filter-status");
    list.innerHTML = "";

    let items = sortedArticles;
    if (activeCat) {
      items = items.filter(function (a) {
        return a.category === activeCat;
      });
    }
    if (keyword) {
      const kw = keyword.toLowerCase();
      items = items.filter(function (a) {
        return (
          a.title.toLowerCase().indexOf(kw) !== -1 ||
          (a.summary || "").toLowerCase().indexOf(kw) !== -1 ||
          (a.content || "").toLowerCase().indexOf(kw) !== -1
        );
      });
    }

    // 絞り込み状態の表示
    const parts = [];
    if (activeCat && catMap[activeCat]) parts.push("カテゴリ: " + catMap[activeCat].name);
    if (keyword) parts.push("検索: 「" + keyword + "」");
    if (parts.length) {
      status.innerHTML =
        escapeHtml(parts.join(" / ")) +
        ' <a class="filter-clear" href="index.html">[解除]</a> ' +
        "(" + items.length + "件)";
    } else {
      status.textContent = "全 " + items.length + " 件";
    }

    if (items.length === 0) {
      list.innerHTML = '<div class="empty-message">該当する記事がありません</div>';
      return;
    }

    items.forEach(function (a) {
      const cat = catMap[a.category];
      const card = document.createElement("a");
      card.className = "article-card";
      card.href = "article.html?id=" + encodeURIComponent(a.id);
      card.innerHTML =
        '<div class="article-meta">' +
        (cat ? '<span class="badge" style="background:' + cat.color + '">' + escapeHtml(cat.name) + "</span>" : "") +
        "<span>" + escapeHtml(a.date) + "</span></div>" +
        "<h3>" + escapeHtml(a.title) + "</h3>" +
        '<div class="summary">' + escapeHtml(a.summary || "") + "</div>";
      list.appendChild(card);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---- 初期化 ----
  renderCategories();
  renderArticles("");

  const searchBox = document.getElementById("search-box");
  searchBox.addEventListener("input", function () {
    renderArticles(searchBox.value.trim());
  });
})();
