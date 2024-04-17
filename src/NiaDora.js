import React, { useState } from 'react';
import './Table.css'; // 外部のCSSファイルをインポート
import { mdiCog } from '@mdi/js';
import Icon from '@mdi/react';

function NiaDora() {
  const [showSettings, setShowSettings] = useState(false);
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  // メモ
  // オリンピックスコアは18要素の配列として扱う。
  // ニアドラスコアは8要素の配列として扱う。（ニア1~4,ドラ1~4）
  const [players, setPlayers] = useState([
    { name: 'Player 1', oriScores: Array(18).fill(0), oriSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0 , otherSoshy: 0},
    { name: 'Player 2', oriScores: Array(18).fill(0), oriSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0 , otherSoshy: 0},
    { name: 'Player 3', oriScores: Array(18).fill(0), oriSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0 , otherSoshy: 0},
    { name: 'Player 4', oriScores: Array(18).fill(0), oriSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0 , otherSoshy: 0}
  ]);

  const [oriRate, setOriRate] = useState(200);
  const [niadoraRate, setNiadoraRate] = useState(100);
  // const oriRate = 300;
  // const niadoraRate = 500;

  const [transactions, setTransactions] = useState([]);
  // const [transactions] = useState(["abc", "def", "ghi"]);

  // oriRateを更新する関数
  const updateOriRate = (e) => {
    const value = e.target.value;
    // 入力が空の場合や数字以外の文字列が含まれている場合は変更しない
    if (!value || isNaN(value)) {
      return;
    }
    setOriRate(parseInt(value, 10)); // テキストボックスの値を数値に変換して更新
    // reCalc(players);
  }

  // niadoraRateを更新する関数
  const updateNiadoraRate = (e) => {
    const value = e.target.value;
    // 入力が空の場合や数字以外の文字列が含まれている場合は変更しない
    if (!value || isNaN(value)) {
      return;
    }
    setNiadoraRate(parseInt(value, 10)); // テキストボックスの値を数値に変換して更新
    // reCalc(players);
  }


  // オリンピックの合計スコアを計算する関数
  const calculateTotalOriScore = (playerOriScores) => {
    const totalOriScore = playerOriScores.reduce((acc, cur) => acc + parseInt(cur), 0);
    return totalOriScore;
  };

  // ニアドラの合計スコアを計算する関数
  const calculateTotalNiadoraScore = (playerNiadoraScores) => {
    const totalNiadoraScore = playerNiadoraScores.reduce((acc, cur) => acc + parseInt(cur), 0);
    return totalNiadoraScore;
  };

  // オリンピックのスコアを計算する関数
  const calculateOriScore = (players, playerIndex) => {
    // 全プレイヤーの合計スコア
    const totalOriScores = players.map((player) => calculateTotalOriScore(player.oriScores));
    const totalOriScoreOfAllPlayers = totalOriScores.reduce((acc, cur) => acc + cur, 0);
    const totalOriScoreOfPlayer = totalOriScores[playerIndex];
    const oriOriScore = totalOriScoreOfPlayer * 4 - totalOriScoreOfAllPlayers;
    return oriOriScore;
  };

  // オリンピックスコアを更新する関数
  const updateOriScore = (playerIndex, holeIndex, value) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].oriScores[holeIndex] = value;
    for (let i = 0; i < newPlayers.length; i++) {
      newPlayers[i].oriSoshy = calculateOriScore(newPlayers, i) * oriRate;
    }
    // newPlayers[playerIndex].oriSoshy = calculateOriScore(newPlayers, playerIndex) * oriRate;
    setPlayers(newPlayers);
  };

  // ニアドラスコアを更新する関数
  const updateNiadoraScore = (playerIndex, holeIndex, value) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].niadoraScores[holeIndex] = value;
    newPlayers[playerIndex].niadoraSoshy = calculateTotalNiadoraScore(newPlayers[playerIndex].niadoraScores) * niadoraRate;
    setPlayers(newPlayers);
  };

  // 補正ソシーを更新する関数
  const updateOtherSoshy = (playerIndex, value) => {
    // 入力が空の場合や数字以外の文字列が含まれている場合は変更しない
    if (!value || isNaN(value)) {
      return;
    }
    const newPlayers = [...players];
    newPlayers[playerIndex].otherSoshy = parseInt(value, 10); // テキストボックスの値を数値に変換して更新
    setPlayers(newPlayers);
  };


  // プレイヤー名を更新する関数
  const updatePlayerName = (playerIndex, newName) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].name = newName;
    setPlayers(newPlayers);
  };

  // ソシーの再計算（主にレート変更時など）
  // const reCalc = (players) => {
  //   const newPlayers = [...players];
  //   for (let i = 0; i < newPlayers.length; i++) {
  //     newPlayers[i].oriSoshy = calculateOriScore(newPlayers, i) * oriRate;
  //     newPlayers[i].niadoraSoshy = calculateTotalNiadoraScore(newPlayers[i].niadoraScores) * niadoraRate;
  //   }
  //   setPlayers(newPlayers);
  // }

  // 割り勘の計算
  const calcTransactions = (e) => {
    const totalSoshies = []
    let tmpTotalSoshy = 0
    for (let i = 0; i < players.length; i++) {
      totalSoshies.push({
        id : i,
        totalSoshy : players[i].oriSoshy + players[i].niadoraSoshy + players[i].otherSoshy
      })
      tmpTotalSoshy += totalSoshies[i].totalSoshy
    }
    if (tmpTotalSoshy !== 0){
      console.log("合計が0ではありません。")
    }
    // 多く払った人と少なく払った人のリストを作成
    const overpaid = [];
    const underpaid = [];
    totalSoshies.forEach((player, i) => {
      if (player.totalSoshy > 0) {
        overpaid.push({ id: i, amount: player.totalSoshy });
      } else {
        underpaid.push({ id: i, amount: -player.totalSoshy });
      }
    });

    // 誰が誰に対していくら払うべきかを計算
    const transactions = [];
    let i = 0; // underpaidのインデックス
    let j = 0; // overpaidのインデックス

    while (i < underpaid.length && j < overpaid.length) {
      const under = underpaid[i];
      const over = overpaid[j];

      // 支払い額の差を計算
      const paymentAmount = Math.min(under.amount, over.amount);

      // トランザクションを追加
      transactions.push({
        from: under.id,
        to: over.id,
        amount: paymentAmount
      });

      // 各リストの進行状況を更新
      under.amount -= paymentAmount;
      over.amount -= paymentAmount;

      if (under.amount === 0) {
        i++;
      }
      if (over.amount === 0) {
        j++;
      }
    }
    // 結果を表示
    const transactionsTextList = []
    transactions.forEach(({ from, to, amount }) => {
      const transactionText = players[from].name + " → " + players[to].name + " : " + amount;
      if (amount > 0) {
        transactionsTextList.push(transactionText)
      };
      // transactionsTextList.push(transactionText)
    });
    setTransactions(transactionsTextList);
  };

  return (
    <div>
      {/* 画面の右上に設定ボタンを追加 */}
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        <button onClick={handleSettingsClick}>
          <Icon path={mdiCog} size={1} />
        </button>
      </div>

      {/* 設定画面 */}
      {showSettings && (
        <div style={{ position: 'fixed', top: 50, right: 10, backgroundColor: 'white', padding: 10 }}>
          <h2>Settings</h2>
          <table>
            <thead>
              <tr>
                <th>設定項目</th>
                <th>設定値</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, playerIndex) => (
              <tr key={playerIndex}>
                <td>Player {playerIndex + 1}</td>
                <td>
                  <input
                    type='text'
                    value={player.name}
                    onChange={(e) => updatePlayerName(playerIndex, e.target.value)}
                    style={{ width: '100px' }}
                  />
                </td>
              </tr>
              ))}
              <tr>
                <td>ニアドラレート</td>
                <td><input type="text" value={niadoraRate} onChange={updateNiadoraRate}/></td>
              </tr>
              <tr>
                <td>オリレート</td>
                <td><input type="text" value={oriRate} onChange={updateOriRate}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th style={{ width: '80px' }}></th>
              {/* {players.map((player, playerIndex) => (
                <th key={playerIndex} style={{ width: '100px' }}>
                  <input
                    type='text'
                    value={player.name}
                    onChange={(e) => updatePlayerName(playerIndex, e.target.value)}
                    style={{ width: '100px' }}
                  />
                </th>
              ))} */}
              {players.map((player, playerIndex) => (
                <th key={playerIndex} style={{ width: '100px' }}>{player.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="scrollable-content">
            <tr><td colSpan="5">ニアピン</td></tr>
            {[...Array(4)].map((_, holeIndex) => (
              <tr key={holeIndex}>
                <td>ﾆｱ{holeIndex + 1}</td>
                {players.map((player, playerIndex) => (
                  <td key={playerIndex}>
                    <select
                      value={player.niadoraScores[holeIndex]}
                      onChange={(e) => updateNiadoraScore(playerIndex, holeIndex, e.target.value)}
                    >
                      {[30, 20, 15, 10, 0, -10, -15, -20, -30].map((niadoraScore) => (
                        <option key={niadoraScore} value={niadoraScore}>{niadoraScore}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
            <tr><td colSpan="5">ドラコン</td></tr>
            {[...Array(4)].map((_, holeIndex) => (
              <tr key={holeIndex + 4}>
                <td>ﾄﾞﾗ{holeIndex + 1}</td>
                {players.map((player, playerIndex) => (
                  <td key={playerIndex}>
                    <select
                      value={player.niadoraScores[holeIndex + 4]}
                      onChange={(e) => updateNiadoraScore(playerIndex, holeIndex + 4, e.target.value)}
                    >
                      {[30, 20, 15, 10, 0, -10, -15, -20, -30].map((niadoraScore) => (
                        <option key={niadoraScore} value={niadoraScore}>{niadoraScore}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
            {/* ソシー計算結果を追加 */}
            <tr>
              <td>ﾆｱﾄﾞﾗｿｼｰ</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>{player.niadoraSoshy} </td>
              ))}
            </tr>
            <tr><td colSpan="5">オリンピック</td></tr>
            {[...Array(18)].map((_, holeIndex) => (
              <tr key={holeIndex}>
                <td>{holeIndex + 1}</td>
                {players.map((player, playerIndex) => (
                  <td key={playerIndex}>
                    <select
                      value={player.oriScores[holeIndex]}
                      onChange={(e) => updateOriScore(playerIndex, holeIndex, e.target.value)}
                    >
                      {[0, 1, 2, 3, 4, 5].map((oriScore) => (
                        <option key={oriScore} value={oriScore}>{oriScore}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
            {/* 合計行を追加 */}
            <tr>
              <td>ｵﾘｶｳﾝﾄ</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>{calculateTotalOriScore(player.oriScores)}</td>
              ))}
            </tr>
            {/* オリンピックのスコアを追加 */}
            <tr>
              <td>ｵﾘｽｺｱ</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>{calculateOriScore(players, playerIndex)}</td>
              ))}
            </tr>
            {/* ソシー計算結果を追加 */}
            <tr>
              <td>ｵﾘｿｼｰ</td>
              {players.map((player, playerIndex) => (
                // <td key={playerIndex}>{calculateOriScore(players, playerIndex) * oriRate} </td>
                <td key={playerIndex}>{player.oriSoshy} </td>
              ))}
            </tr>
            {/* 最終的な計算結果 */}
            <tr><td colSpan="5">ニアドラ・オリンピック合計</td></tr>
            <tr>
              <td>最終</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>{player.oriSoshy + player.niadoraSoshy} </td>
              ))}
            </tr>
            {/* その他補正 */}
            <tr><td colSpan="5">その他補正</td></tr>
            <tr>
              <td>補正</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>
                  <input 
                    type="text" 
                    value={player.otherSoshy}
                    onChange={(e) => updateOtherSoshy(playerIndex, e.target.value)}
                    style={{ width: '60px' }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>補正後</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>{player.oriSoshy + player.niadoraSoshy + player.otherSoshy} </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <input type="button" value="ワリカ計算" onClick={calcTransactions}/>
        {transactions.map((transaction, index) => (
          <p key={index}>{transaction}</p>
        ))}
      </div>
    </div>
  );
}

export default NiaDora;
