import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Login-container">

      {/* 左：新規登録 */}
      <div className="Register-box">
        <h1>新規登録</h1>

        <input type="text" placeholder="ユーザー名" />
        <input type="email" placeholder="メールアドレス" />
        <input type="password" placeholder="パスワード" />
        <input type="password" placeholder="パスワード確認" />

        <button>登録する</button>
      </div>

      {/* 右：ログイン */}
      <div className="Login-box">
        <h1>ログイン</h1>

        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>ログイン</button>

        <p>新規登録を先に入力してください</p>
      </div>

    </div>
  );
}

export default Login;
