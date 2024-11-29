document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    if (!searchResults) {
      return;
    }
  
    searchButton.addEventListener('click', function() {
      const query = searchInput.value.trim().toLowerCase();
      const articles = document.querySelectorAll('main h2'); 
  
      searchResults.innerHTML = '';
  
      if (!query) {
        searchResults.innerHTML = '<p class="no-results">検索クエリを入力してください。</p>';
        return;
      }
  
      let foundResults = false;
  
      articles.forEach(article => {
        const title = article.textContent.toLowerCase();
        const content = article.nextElementSibling ? article.nextElementSibling.textContent.toLowerCase() : '';
        const section = article.closest('section');
  
        if (section) {
          const sectionId = section.id ? section.id : '';
          const linkHref = sectionId ? `#${sectionId}` : '';
          const sectionLink = sectionId ? `<a href="${linkHref}">移動する</a>` : '';
  
          if (title.includes(query) || content.includes(query)) {
            foundResults = true;
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
  
            resultItem.innerHTML = `
              <h2>${article.innerHTML}</h2>
              <p>${content}</p>
              ${sectionLink} 
            `;
  
            searchResults.appendChild(resultItem);
          }
        }
      });
  
      if (!foundResults) {
        searchResults.innerHTML = '<p class="no-results">該当する結果が見つかりませんでした。</p>';
      }
    });
  });