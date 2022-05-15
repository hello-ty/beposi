const searchModule = (() => {
  const BASE_URL = "http://localhost:3000/api/v1/search";
  const path = window.location.pathname;

  return {
    searchWords: async () => {
      const query = document.getElementById("search").value;
      // 管理者画面に移動
      if (query == "8BJP6HdVTGgeSd") window.location.href = "/admin.html";

      if (!query || query === "") {
        alert("入力してください");
      } else {
        // 検索結果を削除
        const element = document.getElementById("mind-word");
        if (element) element.remove();

        const res = await fetch(BASE_URL + "?q=" + query);
        const resJson = await res.json();

        let mindColor = "text-stone-700";

        if (res.status == 404 || resJson["0"] == null) {
          mindWord = "Ooops";
        } else if (res.status == 200) {
          switch (resJson["0"]["mind"]) {
            case 1:
              mindWord = "ポジティブ";
              mindColor = "text-red-500";
              break;
            case 2:
              mindWord = "ネガティブ";
              mindColor = "text-blue-500";
              break;
            case 0:
              mindWord = "イーブン";
              mindColor = "text-green-500";
              break;
            default:
              mindWord = "登録されていません。";
              break;
          }
        }

        if (path == "/admin.html") {
          body = `<p id="mind-word" class="text-5xl">「${mindWord}」</p>`;
        } else if (path == "/") {
          body = `<p id="mind-word" class="text-5xl ${mindColor}">${mindWord}</p>`;
        }
        document.getElementById("content").insertAdjacentHTML("afterend", body);
      }
    },
  };
})();
