import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./Login.css";

function Login() {
  // ログイン用状態
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginHash, setLoginHash] = useState("");

  // 登録用状態
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regMessage, setRegMessage] = useState("");
  const [registerHash, setRegisterHash] = useState("");

  // データベース（配列）
  const [users, setUsers] = useState([]);

  // 新規登録処理
  const handleRegister = () => {
    if (regPassword !== regConfirmPassword) {
      setRegMessage("パスワードが一致しません");
      return;
    }
    const exists = users.find(u => u.username === regUsername);
    if (exists) {
      setRegMessage("登録済み");
      return;
    }
    const hash = CryptoJS.SHA256(regPassword).toString();
    setUsers([...users, { username: regUsername, password: hash }]);
    setRegisterHash(hash);
    setRegMessage("登録完了");
  };

  // ログイン処理
  const handleLogin = () => {
    const foundUser = users.find(u => u.username === username);
    const hash = CryptoJS.SHA256(password).toString();
    setLoginHash(hash);
    if (foundUser && foundUser.password === hash) {
      setLoginMessage("ログイン成功");
    } else {
      setLoginMessage("ログイン失敗");
    }
  };

  return (
    <div className="Login-page">
      
      {/* 上段：手順書 */}
      <div className="Hash-Learning-box">
        <h2>ハッシュ化を学ぼう</h2>
        <p>
          入力したパスワードはSHA256でハッシュ化されます。<br/>
          ハッシュ値は元に戻せませんが、ログイン時は同じハッシュを作って比較することで認証できます。
        </p>
      </div>

      {/* 中段：新規登録・ログイン・データベース */}
      <div className="Middle-row">
        {/* 新規登録ボックス */}
        <div className="Register-box">
          <h1>新規登録</h1>
          <input
            type="text"
            placeholder="ユーザー名"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="確認"
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister}>登録する</button>
          <p style={{ color: regMessage.includes("失敗") ? "red" : "green" }}>{regMessage}</p>
        </div>

        {/* ログインボックス */}
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
          <button onClick={handleLogin}>ログイン</button>
          <p style={{ color: loginMessage.includes("失敗") ? "red" : "green" }}>{loginMessage}</p>
        </div>

        {/* データベースボックス */}
        <div className="Database-box">
          <h2>Database</h2>
          {users.length === 0 && <p>まだデータがありません</p>}
          {users.map((u, index) => (
            <div key={index} className="db-item">
              <p>ユーザー名: {u.username}</p>
              <p>パスワード(hash): {u.password}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 下段：処理フロー */}
      <div className="Hash-Learning-box">
        {registerHash && (
          <div className="Flow-box">
            <h3>登録フロー</h3>
            <p>入力パスワード: {regPassword}</p>
            <p>ハッシュ化結果: {registerHash}</p>
            <p>DBに保存（入力されたパスワードではなく、ハッシュ値を保存）</p>
          </div>
        )}
        {loginHash && (
          <div className="Flow-box">
            <h3>ログインフロー</h3>
            <p>入力パスワード: {password}</p>
            <p>ハッシュ化結果: {loginHash}</p>
            <p>DBのハッシュと比較 → 認証</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Login;