import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./Login.css";

function Login() {
  // ログイン用
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginHash, setLoginHash] = useState("");

  // 登録用
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regMessage, setRegMessage] = useState("");
  const [registerHash, setRegisterHash] = useState("");

  // 表示制御
  const [showRegisterFlow, setShowRegisterFlow] = useState(false);
  const [showLoginFlow, setShowLoginFlow] = useState(false);

  // データベース（仮）
  const [users, setUsers] = useState([]);

  // -------------------------
  // 新規登録
  // -------------------------
  const handleRegister = () => {
    
    if (!regUsername.trim() || !regPassword.trim() || !regConfirmPassword.trim()) {
      setRegMessage("すべて入力してください");
      setShowRegisterFlow(false);
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegMessage("パスワードが一致しません");
      setShowRegisterFlow(false);
      return;
    }

    const exists = users.find(u => u.username === regUsername);
    if (exists) {
      setRegMessage("登録済み");
      setShowRegisterFlow(false);
      return;
    }

    // ハッシュ化
    const hash = CryptoJS.SHA256(regPassword).toString();

    // 保存
    setUsers([...users, { username: regUsername, password: hash }]);
    setRegisterHash(hash);
    setRegMessage("登録完了");

    // フロー表示
    setShowRegisterFlow(true);
    
  };

  // -------------------------
  // ログイン
  // -------------------------
  const handleLogin = () => {
    // 入力チェック
    if (!username.trim() || !password.trim()) {
      setLoginMessage("すべて入力してください");
      setShowLoginFlow(false);
      return;
    }

    const foundUser = users.find(u => u.username === username);

    // ハッシュ化
    const hash = CryptoJS.SHA256(password).toString();
    setLoginHash(hash);

    // フロー表示
    setShowLoginFlow(true);
    

    // 判定
    if (!foundUser) {
      setLoginMessage("ユーザーIDが存在しません");
      return;
    }

    if (foundUser.password !== hash) {
      setLoginMessage("パスワードが違います");
      return;
    }

    setLoginMessage("ログイン成功");
  };

  // ログイン時のユーザー取得（UI用）
  const foundUser = users.find(u => u.username === username);

  return (
    <div className="Login-page">

      {/* 説明 */}
      <div className="Hash-Learning-box">
        <h2>ハッシュ化を学ぼう</h2>
        <p>
          パスワードはSHA256でハッシュ化されます。<br/>
          ハッシュは元に戻せませんが、同じ入力から同じ値を作ることで認証できます。
        </p>
      </div>

      {/* 中段 */}
      <div className="Middle-row">

        {/* 登録 */}
        <div className="Register-box">
          <h1>新規登録</h1>
          <input type="text" placeholder="ユーザー名"
            value={regUsername} onChange={e => setRegUsername(e.target.value)} />
          <input type="password" placeholder="パスワード"
            value={regPassword} onChange={e => setRegPassword(e.target.value)} />
          <input type="password" placeholder="確認"
            value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} />
          <button onClick={handleRegister}>登録する</button>

          <p style={{ color: regMessage === "登録完了" ? "green" : "red" }}>
            {regMessage}
          </p>
        </div>

        {/* ログイン */}
        <div className="Login-box">
          <h1>ログイン</h1>
          <input type="text" placeholder="ユーザー名"
            value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="パスワード"
            value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>ログイン</button>

          <p style={{ color: loginMessage === "ログイン成功" ? "green" : "red" }}>
            {loginMessage}
          </p>
          <p>入力されたパスをハッシュ化してデータベースと比較します</p>
        </div>

        {/* DB */}
        <div className="Database-box">
          <h2>Database</h2>
          {users.length === 0 && <p>まだデータがありません</p>}
          {users.map((u, i) => (
            <div key={i} className="db-item">
              <p>ユーザー名: {u.username}</p>
              <p>パスワード(hash): {u.password}</p>
            </div>
          ))}
        </div>

      </div>

      {/* フロー表示 */}
      <div className="Hash-Learning-box">

        {showRegisterFlow && (
          <div className="Flow-box">
            <h3>登録フロー</h3>
            <p>入力: {regPassword}</p>
            <p>ハッシュ: {registerHash}</p>
            <p>→ DBに保存（ハッシュのみ）</p>
          </div>
        )}

        {showLoginFlow && (
          <div className="Flow-box">
            <h3>ログインフロー</h3>
            <p>入力: {password}</p>
            <p>ハッシュ: {loginHash}</p>

            {!foundUser && <p>→ ユーザーが存在しない</p>}

            {foundUser && foundUser.password !== loginHash && (
              <p>→ ハッシュ不一致（パスワード違い）</p>
            )}

            {foundUser && foundUser.password === loginHash && (
              <p>→ ハッシュ一致（認証成功）</p>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

export default Login;