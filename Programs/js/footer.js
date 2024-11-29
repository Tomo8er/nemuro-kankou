document.addEventListener('DOMContentLoaded', function () {
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (footerPlaceholder) {
      loadFooter();
  } else {
      console.error('site-System-Error フッターのプレースホルダーが見つかりません。);');
  }
});

function loadFooter() {
  const footer = document.getElementById('footer-placeholder');
  
  if (!footer) {
      console.error('site-System-Error フッターのプレースホルダーが存在しません。);');
      return;
  }

  footer.innerHTML = `
      <button id="backToTopBtn" onclick="scrollToTop()">
        <i class="fas fa-arrow-up"></i>トップへ戻る
      </button>
      <nav id="footer-nav">
              <ul>
                  <li><a href="/support/index.html">お問い合わせ</a></li>
                  <li><a href="/support/policy.html">プライバシーポリシー</a></li>
                  <li><a href="/sitemap.html">サイトマップ</a></li>
                  <li><a href="/support/faq.html">FAQ</a></li>
              </ul>
      </nav>
      <p>&copy; 2024 根室市観光応援ガイド All Rights Reserved.</p>
      <div id="footer-about">
        <p>根室市観光応援ガイドは、最東端のまち、根室市をより多くの人に知ってもらうための情報を発信するサイトです。</p>
      </div>
  `;
}
