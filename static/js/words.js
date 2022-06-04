const wordsModule = (() => {
  const BASE_URL = "http://localhost:3000/api/v1/words";

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const handleError = async (res) => {
    switch (res.status) {
      case 200:
        window.location.href = "/admin.html";
        break;
      case 201:
        window.location.href = "/admin.html";
        break;
      default:
        alert("何らかのエラーが発生しました。");
        break;
    }
  };

  return {
    fetchAllWords: async () => {
      const res = await fetch(BASE_URL);
      const words = await res.json();

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const body = `<tr>
                        <td>${word.id}</td>
                        <td>${word.text}</td>
                        <td>${
                          word.mind == 1
                            ? "ポジティブ"
                            : word.mind == 2
                            ? "ネガティブ"
                            : "イーブン"
                        }</td>
                        <td><a href="edit.html?uid=${word.id}">編集</a></td>
                      </tr>`;
        document
          .getElementById("words-list")
          .insertAdjacentHTML("beforeend", body);
      }
    },
    createWord: async () => {
      const text = document.getElementById("text").value;
      const mind = document.getElementById("mind").value;

      // バリデーション
      if (!text) {
        alert("テキストを入力してください");
        return;
      }

      const body = {
        text: text,
        mind: mind,
      };

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      return handleError(res);
    },
    setExistingValue: async (uid) => {
      const res = await fetch(BASE_URL + "/" + uid);
      const resJson = await res.json();

      document.getElementById("text").value = resJson[0].text;
      document.getElementById("mind").value = resJson[0].mind;
    },
    saveWord: async (uid) => {
      const text = document.getElementById("text").value;
      const mind = document.getElementById("mind").value;

      // バリデーション
      if (!text) {
        alert("テキストを入力してください");
        return;
      }

      const body = {
        text: text,
        mind: mind,
      };

      const res = await fetch(BASE_URL + "/" + uid, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });

      return handleError(res);
    },
    deleteWord: async (uid) => {
      const ret = window.confirm("この言葉を削除してもいいですか？");

      if (!ret) {
        return false;
      } else {
        const res = await fetch(BASE_URL + "/" + uid, {
          method: "DELETE",
          headers: headers,
        });

        return handleError(res);
      }
    },
  };
})();
