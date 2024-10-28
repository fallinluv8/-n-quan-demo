import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const AI = () => {
  const initialBoard = Array(10).fill(5); // 10 ô chơi
  const [quanLeft, setQuanLeft] = useState(1); // Ô quan bên trái
  const [quanRight, setQuanRight] = useState(1); // Ô quan bên phải
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playMode, setPlayMode] = useState('');
  const [currentBoard, setCurrentBoard] = useState([...initialBoard]);
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [selectedCell, setSelectedCell] = useState(null);
  const [moveDirection, setMoveDirection] = useState(null);

  const startGame = (mode) => {
    setPlayMode(mode);
    setIsGameStarted(true);
    resetGame(); // Reset trạng thái trò chơi
  };

  const resetGame = () => {
    setCurrentBoard([...initialBoard]);
    setQuanLeft(1);
    setQuanRight(1);
    setCurrentPlayer('player1');
    setSelectedCell(null);
    setMoveDirection(null);
  };

  const handleCellClick = (index) => {
    if (playMode === 'may' && currentPlayer === 'player2') return;
    if (currentBoard[index] > 0) {
      setSelectedCell(index);
    }
  };

  const chooseDirection = (direction) => {
    if (selectedCell !== null) {
      setMoveDirection(direction);
      distributePieces(selectedCell, direction);
    }
  };

  const distributePieces = (index, direction) => {
    let board = [...currentBoard];
    let pieces = board[index];
    board[index] = 0;
    let i = index;

    const interval = setInterval(() => {
      // Xác định hướng di chuyển
      if (direction === 'left') {
        i = (i - 1 + board.length) % board.length; // Di chuyển trái
      } else {
        i = (i + 1) % board.length; // Di chuyển phải
      }

      // Rải quân vào các ô dân và ô quan
      if (i === 0) {
        setQuanLeft((prev) => prev + 1);
      } else if (i === 5) {
        setQuanRight((prev) => prev + 1);
      } else {
        board[i]++;
      }

      pieces--;
      setCurrentBoard([...board]);

      // Nếu hết quân, dừng lại và chuyển lượt
      if (pieces === 0) {
        clearInterval(interval);
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');

        if (playMode === 'may' && currentPlayer === 'player2') {
          setTimeout(() => {
            aiMove();
          }, 1000);
        }
      }
    }, 500);
  };

  const aiMove = () => {
    let bestMove = 1; // Tạm thời gán nước đi của AI
    distributePieces(bestMove, 'right'); // AI mặc định đi phải
  };

  return (
    <div className='bg-neutral-700 min-h-screen'>
      <div className='flex flex-col justify-center items-center py-10'>
        <div className='border-4 border-cyan-100 bg-gradient-to-r from-slate-50 to-cyan-600 text-transparent bg-clip-text p-10 uppercase text-5xl font-mono shadow-lg shadow-cyan-500'>
          ô ăn quan
        </div>
        {!isGameStarted && (
          <div className='flex flex-row gap-10 pt-10 text-neutral-50 items-center'>
            <button
              onClick={() => startGame('nguoichoi')}
              className='border-2 border-cyan-100 p-4 rounded-lg hover:scale-90 opacity-80 transition ease-out hover:opacity-100 hover:border-cyan-400 shadow hover:shadow-md hover:shadow-cyan-200 text-2xl font-mono'
            >
              Chơi với người
            </button>
            <button
              onClick={() => startGame('may')}
              className='border-2 border-cyan-100 p-4 rounded-lg hover:scale-90 opacity-80 transition ease-out hover:opacity-100 hover:border-cyan-400 shadow hover:shadow-md hover:shadow-cyan-200 text-2xl font-mono'
            >
              Chơi với máy
            </button>
          </div>
        )}
      </div>

      {isGameStarted && (
        <div className='pt-10 relative flex justify-center items-center'>
          <div className='border-4 border-slate-50 h-28 w-28 p-2 bg-yellow-400 flex flex-wrap gap-2 justify-center items-center'>
            {Array.from({ length: quanLeft }).map((_, i) => (
              <FontAwesomeIcon
                key={i}
                className='text-cyan-400'
                icon={faCircle}
              />
            ))}
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-center items-center gap-2 py-1'>
              {currentBoard.slice(0, 5).map((pieces, index) => (
                <div
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className='border-4 border-slate-50 h-28 w-28 p-2 bg-slate-800 flex flex-wrap gap-2 justify-center items-center hover:border-slate-900 transition ease-in'
                >
                  {Array.from({ length: pieces }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      className='text-cyan-400'
                      icon={faCircle}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className='flex flex-row justify-center items-center gap-2 py-1'>
              {currentBoard.slice(5, 10).map((pieces, index) => (
                <div
                  key={index + 5}
                  onClick={() => handleCellClick(index + 5)}
                  className='border-4 border-slate-50 h-28 w-28 p-2 bg-slate-800 flex flex-wrap gap-2 justify-center items-center hover:border-slate-900 transition ease-in'
                >
                  {Array.from({ length: pieces }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      className='text-cyan-400'
                      icon={faCircle}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className='border-4 border-slate-50 h-28 w-28 p-2 bg-yellow-400 flex flex-wrap gap-2 justify-center items-center'>
            {Array.from({ length: quanRight }).map((_, i) => (
              <FontAwesomeIcon
                key={i}
                className='text-cyan-400'
                icon={faCircle}
              />
            ))}
          </div>
        </div>
      )}

      {selectedCell !== null && (
        <div className='flex justify-center gap-4 py-4'>
          <button
            onClick={() => chooseDirection('left')}
            className='border-2 border-cyan-400 p-2 rounded-lg text-cyan-400'
          >
            Đi trái
          </button>
          <button
            onClick={() => chooseDirection('right')}
            className='border-2 border-cyan-400 p-2 rounded-lg text-cyan-400'
          >
            Đi phải
          </button>
        </div>
      )}

      <div className='border-2 border-cyan-400 p-2 hover:scale-90 rounded-lg opacity-80 transition ease-out hover:opacity-100 hover:border-cyan-400 shadow hover:shadow-md hover:shadow-cyan-200 text-xl font-semibold text-cyan-400 w-32 text-center mx-auto'>
        <button
          onClick={() => {
            resetGame();
            setIsGameStarted(false);
          }}
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
};

export default AI;
