import React from 'react';
import ReactDOM from 'react-dom';
import NiaDora from './NiaDora'; // NiaDoraコンポーネントのインポート

ReactDOM.render(
  <React.StrictMode>
    <NiaDora /> {/* NiaDoraコンポーネントのレンダリング */}
  </React.StrictMode>,
  document.getElementById('root')
);


// // Footerコンポーネント
// const Footer = ({ onMenuItemClick }) => {
//   return (
//     <footer>
//       <button onClick={() => onMenuItemClick('screen1')}>設定画面</button>
//       <button onClick={() => onMenuItemClick('screen2')}>計算画面</button>
//     </footer>
//   );
// };

// // MainAppコンポーネント
// const MainApp = () => {
//   const [currentScreen, setCurrentScreen] = useState('screen1');

//   const handleMenuItemClick = (screen) => {
//     setCurrentScreen(screen);
//   };

//   return (
//     <div>
//       {currentScreen === 'screen1' && <NiaDora />}
//       {currentScreen === 'screen2' && <NiaDora />}
//       <Footer onMenuItemClick={handleMenuItemClick} />
//     </div>
//   );
// };

// // アプリ全体のレンダリング
// ReactDOM.render(
//   <React.StrictMode>
//     <MainApp />
//   </React.StrictMode>,
//   document.getElementById('root')
// );