# beposi

- API 理解のために作成した Web アプリ
- つぶやいて気分を判定するだけのシンプルな仕様

# How to build & Local start

sqlite> select \* from words;
1|どちらでもない|0
2|ポジティブ|1
3|ネガティブ|2

CREATE TABLE words (  
 id INTEGER NOT NULL PRIMARY KEY,
word TEXT NOT NULL,
mind INTEGER NOT NULL
);
# beposi
