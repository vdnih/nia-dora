import React, { useState } from 'react';
import './Table.css'; // 外部のCSSファイルをインポート

function NiaDora() {
  // メモ
  // オリンピックスコアは18要素の配列として扱う。
  // ニアドラスコアは8要素の配列として扱う。（ニア1~4,ドラ1~4）
  const [players, setPlayers] = useState([
    { name: 'Player 1', olympicScores: Array(18).fill(0), olympicSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0},
    { name: 'Player 2', olympicScores: Array(18).fill(0), olympicSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0},
    { name: 'Player 3', olympicScores: Array(18).fill(0), olympicSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0},
    { name: 'Player 4', olympicScores: Array(18).fill(0), olympicSoshy: 0, niadoraScores: Array(8).fill(0), niadoraSoshy: 0}
  ]);

  const rate = 300;

  // 合計スコアを計算する関数
  const calculateTotalOlympicScore = (playerOlympicScores) => {
    const totalOlympicScore = playerOlympicScores.reduce((acc, cur) => acc + parseInt(cur), 0);
    return totalOlympicScore;
  };

  // オリンピックのスコアを計算する関数
  const calculateOlympicScore = (players, playerIndex) => {
    // 全プレイヤーの合計スコア
    const totalOlympicScores = players.map((player) => calculateTotalOlympicScore(player.olympicScores));
    const totalOlympicScoreOfAllPlayers = totalOlympicScores.reduce((acc, cur) => acc + cur, 0);
    const totalOlympicScoreOfPlayer = totalOlympicScores[playerIndex];
    const olympicOlympicScore = totalOlympicScoreOfPlayer * 4 - totalOlympicScoreOfAllPlayers;
    return olympicOlympicScore;
  };


  // スコアを更新する関数
  const updateOlympicScore = (playerIndex, holeIndex, value) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].olympicScores[holeIndex] = value;
    for(let i = 0; i < newPlayers.length; i++){
      newPlayers[i].olympicSoshy = calculateOlympicScore(newPlayers, i) * rate;
    }
    // newPlayers[playerIndex].olympicSoshy = calculateOlympicScore(newPlayers, playerIndex) * rate;
    setPlayers(newPlayers);
  };

  // プレイヤー名を更新する関数
  const updatePlayerName = (playerIndex, newName) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].name = newName;
    setPlayers(newPlayers);
  };

  return (
    <div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th className='fixed-column'></th>{/* 一番左の列を固定 */}
              {players.map((player, playerIndex) => (
                <th key={playerIndex} style={{ width: '100px' }}>
                  <input
                    type='text'
                    value={player.name}
                    onChange={(e) => updatePlayerName(playerIndex, e.target.value)}
                    style={{ width: '100px' }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="scrollable-content">
            <tr><td colSpan="5">オリンピック</td></tr>
            {[...Array(18)].map((_, holeIndex) => (
              <tr key={holeIndex}>
                <td className="fixed-column">{holeIndex + 1}</td>
                {players.map((player, playerIndex) => (
                  <td key={playerIndex}>
                    <select
                      value={player.olympicScores[holeIndex]}
                      onChange={(e) => updateOlympicScore(playerIndex, holeIndex, e.target.value)}
                    >
                      {[0, 1, 2, 3, 4, 5].map((olympicScore) => (
                        <option key={olympicScore} value={olympicScore}>{olympicScore}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
            {/* 合計行を追加 */}
            <tr>
              <td className="fixed-column">合計</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>{calculateTotalOlympicScore(player.olympicScores)}</td>
              ))}
            </tr>
            {/* オリンピックのスコアを追加 */}
            <tr>
              <td className="fixed-column">ｵﾘ</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>{calculateOlympicScore(players, playerIndex)}</td>
              ))}
            </tr>
            {/* ソシー計算結果を追加 */}
            <tr>
              <td className="fixed-column">ｿｼｰ</td>
              {players.map((player, playerIndex) => (
                // <td key={playerIndex}>{calculateOlympicScore(players, playerIndex) * rate} </td>
                <td key={playerIndex}>{player.olympicSoshy} </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NiaDora;
