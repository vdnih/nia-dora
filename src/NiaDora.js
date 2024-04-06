import React, { useState } from 'react';

function NiaDora() {
  const [players, setPlayers] = useState([
    { name: 'Player 1', scores: Array(18).fill(0) },
    { name: 'Player 2', scores: Array(18).fill(0) },
    { name: 'Player 3', scores: Array(18).fill(0) },
    { name: 'Player 4', scores: Array(18).fill(0) }
  ]);
  const rate = 300;

  // 合計スコアを計算する関数
  const calculateTotalScore = (playerScores) => {
    const totalScore = playerScores.reduce((acc, cur) => acc + parseInt(cur), 0);
    return totalScore;
  };

  // オリンピックのスコアを計算する関数
  const calculateOlympicScore = (players, playerIndex) => {
    // 全プレイヤーの合計スコア
    const totalScores = players.map((player) => calculateTotalScore(player.scores));
    const totalScoreOfAllPlayers = totalScores.reduce((acc, cur) => acc + cur, 0);
    const totalScoreOfPlayer = totalScores[playerIndex];
    const olympicScore = totalScoreOfPlayer * 4 - totalScoreOfAllPlayers;
    return olympicScore;
  };
  

  // スコアを更新する関数
  const updateScore = (playerIndex, holeIndex, value) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].scores[holeIndex] = value;
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
      <h1>オリンピック</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {players.map((player, playerIndex) => (
              <th key={playerIndex}>
                <input
                  type='text'
                  value={player.name}
                  onChange={(e) => updatePlayerName(playerIndex, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(18)].map((_, holeIndex) => (
            <tr key={holeIndex}>
              <td>{holeIndex + 1}</td>
              {players.map((player, playerIndex) => (
                <td key={playerIndex}>
                  <select
                    value={player.scores[holeIndex]}
                    onChange={(e) => updateScore(playerIndex, holeIndex, e.target.value)}
                  >
                    {[0,1,2,3,4,5].map((score) => (
                      <option key={score} value={score}>{score}</option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
          {/* 合計行を追加 */}
          <tr>
            <td>合計</td>
            {players.map((player, playerIndex) => (
              <td key={playerIndex}>{calculateTotalScore(player.scores)}</td>
            ))}
          </tr>
          {/* オリンピックのスコアを追加 */}
          <tr>
            <td>オリンピックのスコア</td>
            {players.map((player, playerIndex) => (
              <td key={playerIndex}>{calculateOlympicScore(players, playerIndex)}</td>
            ))}
          </tr>
          {/* ソシー計算結果を追加 */}
          <tr>
            <td>ソシーの計算結果</td>
            {players.map((player, playerIndex) => (
              <td key={playerIndex}>{calculateOlympicScore(players, playerIndex) * rate} </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NiaDora;
