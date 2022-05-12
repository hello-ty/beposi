const indexModule = (() => {
  const path = window.location.pathname;

  switch (path) {
    case "/":
      document.getElementById("search-btn").addEventListener("click", () => {
        return searchModule.searchWords();
      });
      break;

    case "/admin.html":
      document.getElementById("search-btn").addEventListener("click", () => {
        return searchModule.searchWords();
      });
      return wordsModule.fetchAllWords();

    case "/create.html":
      document.getElementById("save-btn").addEventListener("click", () => {
        return wordsModule.createWord();
      });
      document.getElementById("cancel-btn").addEventListener("click", () => {
        return (window.location.href = "/admin.html");
      });
      break;

    case "/edit.html":
      const uid = window.location.search.split("?uid=")[1];

      document.getElementById("save-btn").addEventListener("click", () => {
        return wordsModule.saveWord(uid);
      });
      document.getElementById("cancel-btn").addEventListener("click", () => {
        return (window.location.href = "/admin.html");
      });
      document.getElementById("delete-btn").addEventListener("click", () => {
        return wordsModule.deleteWord(uid);
      });

      return wordsModule.setExistingValue(uid);
    default:
      break;
  }
})();
