import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  codeLength,
  generateRandomCode,
  getColorClass,
  handlePegClick,
  maxAttempts,
  pegColors,
  selectColor,
  selectColorFromPalette,
  startGame,
  submitGuess,
} from "../utils/gameUtils";

type GameProps = {};
type Attempt = {
  guess: string[];
  feedback: { correctPosition: number; correctColor: number };
};

const GameXX: React.FC<GameProps> = () => {
  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>(
    Array(maxAttempts).fill({
      guess: Array(codeLength).fill(""),
      feedback: { correctPosition: 0, correctColor: 0 },
    })
  );
  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(codeLength).fill("")
  );
  const [activePeg, setActivePeg] = useState<number | null>(null);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(false);
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const handleSubmission = () => {
    submitGuess({
      currentGuess,
      secretCode,
      currentAttemptNumber,
      maxAttempts,
      setAttempts,
      setHasWon,
      setIsGameOver,
      setCurrentAttemptNumber,
      setCurrentGuess,
    });
  };

  const handleGameStart = () => {
    startGame(
      generateRandomCode,
      maxAttempts,
      codeLength,
      setSecretCode,
      setAttempts,
      setCurrentAttemptNumber,
      setIsGameOver,
      setHasWon,
      setIsGameInProgress
    );
  };

  const handlePaletteSelection = (selectedColor: string) => {
    selectColorFromPalette(selectedColor, currentGuess, setCurrentGuess);
  };

  useEffect(() => {
    console.log("Attempts updated:", attempts);
  }, [attempts]);

  useEffect(() => {
    console.log("Secret code updated:", secretCode);
  }, [secretCode]);

  return (
    <div className="w-screen mt-10">
      {/* Start Game */}
      {!isGameInProgress && (
        <button
          onClick={handleGameStart}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Start Game
        </button>
      )}
      {/* Current guess */}
      {isGameOver && (
        <div className="flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="p-4 bg-white rounded">
            <p>Game Over!</p>
            <p className="mt-2">The correct code was:</p>
            <div className="flex mt-2 space-x-2">
              {secretCode.map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full ${getColorClass(color)}`}
                ></div>
              ))}
            </div>
            <button
              onClick={handleGameStart}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
            >
              Restart Game
            </button>
            <button
              onClick={goToHome}
              className="px-4 py-2 mt-4 ml-4 text-white bg-gray-500 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
      {hasWon && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="p-4 bg-white rounded">
            <p>Congratulations! You won!</p>
          </div>
        </div>
      )}
      {isGameInProgress && (
        <div className="w-100% bg-slate-300">
          <div className="flex mb-4 space-x-2">
            {pegColors.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full ${getColorClass(color)}`}
                onClick={() => handlePaletteSelection}
              ></div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-8">
            <div className="flex space-x-2">
              {currentGuess.map((color, pegIndex) => (
                <div
                  key={pegIndex}
                  className={`w-6 h-6 rounded-full border-2 border-gray-600 ${getColorClass(
                    color
                  )} ${selectedPeg === pegIndex ? "scale-150" : ""}`}
                  onClick={() =>
                    handlePegClick(pegIndex, activePeg, setActivePeg)
                  }
                ></div>
              ))}
            </div>
            <button
              onClick={handleSubmission}
              className="p-4 text-white bg-blue-500 rounded"
              disabled={isGameOver}
            >
              Submit
            </button>
          </div>
          <div className="w-auto my-6">
            {activePeg !== null && (
              <div className="flex w-auto p-4 border border-gray-300 rounded">
                {pegColors.map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full ${getColorClass(color)}`}
                    onClick={() =>
                      selectColor(
                        color,
                        activePeg,
                        currentGuess,
                        setCurrentGuess,
                        setActivePeg
                      )
                    }
                  ></div>
                ))}
              </div>
            )}
          </div>
          <div>
            <p>red = correct color in correct position</p>
            <p>white = correct color in wrong position</p>
          </div>
          <div className="flex justify-around h-8 bg-white">
            <h2>your code</h2>
            <h3>key pegs</h3>
          </div>
          {/* Attempts board */}
          {attempts.map((attempt, index) => (
            <div
              key={index}
              className="flex items-center justify-around py-2 bg-slate-400 "
            >
              <div className="flex space-x-2 w-100% bg-slate-300">
                <div>
                  {/* Guess Pegs Section */}
                  <div className="flex space-x-2">
                    {attempt.guess.map((color, pegIndex) => (
                      <div
                        key={pegIndex}
                        className={`w-6 h-6 rounded-full border-2 border-gray-300 ${getColorClass(
                          color
                        )}`}
                        onClick={
                          index === currentAttemptNumber
                            ? () =>
                                handlePegClick(
                                  pegIndex,
                                  activePeg,
                                  setActivePeg
                                )
                            : undefined
                        }
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Feedback Section */}
              <div className="flex space-x-1 bg-stone-700 w-100%">
                <div className="flex space-x-1">
                  {Array(attempt.feedback.correctPosition)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-red-900 rounded-full"
                      ></div>
                    ))}
                  {Array(attempt.feedback.correctColor)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-white rounded-full"
                      ></div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default GameXX;
