import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import PasswordAttack from "./PasswordAttack";

function Title() {
  const navigate = useNavigate();
  const [ripples, setRipples,] = useState([]);

  const handleClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // クリック1回で3回波紋を繰り返す
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      setRipples(prev => [
        ...prev,
        {
          x,
          y,
          size: 30 + i * 20,     // 波の大きさを少しずつ大きく
          id: Date.now() + Math.random(),
        }
      ]);
    }, i * 400);  // i*400msごとに追加
  }

  // ページ遷移は最後の波が出るタイミングに合わせる
  setTimeout(() => navigate('/Login'), 3000);
};

  return (
    <div className="Title-Background" onClick={handleClick}>
      <div className="Title">
        <h1>Hash Learning</h1>
      </div>

      <div className="Daigo">
        <p>Saito Daigo</p>
      </div>

      {ripples.map(r => (
        <span
          key={r.id}
          className="ripple"
          style={{
            left:r.x,
            top:r.y,
            '--size': r.size + 'px',
            animationDelay: (r.delay || 0) + 's'
          }}
          />
      ))}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Title />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/PasswordAttack' element={<PasswordAttack />} />
      </Routes>
    </HashRouter>
  );
}

export default App;