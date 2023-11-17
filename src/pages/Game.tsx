import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type GameProps = {};
type Attempt = {
  guess: string[];
  feedback: { correctPosition: number; correctColor: number };
};

const Game: React.FC<GameProps> = () => {
  const pegColors: string[] = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
  ];

  const getColorClass = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    };
    return colorMap[color] || "";
  };

  const maxAttempts: number = 2;
  const codeLength: number = 6;

  const [secretCode, setSecretCode] = useState<string[]>([]);
  //   const [attempts, setAttempts] = useState<string[][]>(
  //     Array(maxAttempts).fill([])
  //   );
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

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const generateRandomCode = (): string[] => {
    let code: string[] = [];
    for (let i = 0; i < codeLength; i++) {
      const randomIndex: number = Math.floor(Math.random() * pegColors.length);
      code.push(pegColors[randomIndex]);
    }
    return code;
  };

  const handlePegClick = (pegIndex: number) => {
    setActivePeg(pegIndex);
  };

  const selectColor = (color: string) => {
    if (activePeg !== null) {
      const newGuess = [...currentGuess];
      newGuess[activePeg] = color;
      setCurrentGuess(newGuess);
      setActivePeg(null);
    }
  };

  const generateFeedback = (guess: string[]) => {
    let correctPosition = 0;
    let correctColor = 0;
    const secretCodeCopy = [...secretCode];

    // Check for correct position and color
    guess.forEach((color, index) => {
      if (color === secretCode[index]) {
        correctPosition++;
        secretCodeCopy[index] = "-"; // Mark this as counted
      }
    });

    // Check for correct color but wrong position
    guess.forEach((color, index) => {
      if (color !== secretCode[index] && secretCodeCopy.includes(color)) {
        correctColor++;
        secretCodeCopy[secretCodeCopy.indexOf(color)] = "-";
      }
    });

    return { correctPosition, correctColor };
  };

  const submitGuess = () => {
    const feedback = generateFeedback(currentGuess);
    console.log("Submitting guess:", currentGuess);
    console.log("secretCode", secretCode);
    console.log("feedback", feedback);
    setAttempts((prevAttempts) =>
      prevAttempts.map((attempt, index) =>
        index === currentAttemptNumber
          ? { guess: currentGuess, feedback }
          : attempt
      )
    );
    const isWinningGuess = currentGuess.every(
      (color, index) => color === secretCode[index]
    );
    if (isWinningGuess) {
      setHasWon(true);
      setIsGameOver(true);
    } else if (currentAttemptNumber + 1 >= maxAttempts) {
      setIsGameOver(true);
    } else {
      setCurrentAttemptNumber(currentAttemptNumber + 1);
    }

    setCurrentGuess(Array(codeLength).fill(""));
  };

  //   const correctGuesses = attempts.reduce((count, attempt) => {
  //     return count + (attempt.feedback.correctPosition === codeLength ? 1 : 0);
  //   }, 0);

  const selectColorFromPalette = (selectedColor: string) => {
    const nextEmptyPegIndex = currentGuess.indexOf("");
    if (nextEmptyPegIndex !== -1) {
      const newGuess = [...currentGuess];
      newGuess[nextEmptyPegIndex] = selectedColor;
      setCurrentGuess(newGuess);
    }
  };

  const startGame = () => {
    const newSecretCode = generateRandomCode();
    console.log("Starting new game with secret code:", newSecretCode);
    setSecretCode(newSecretCode);

    const initialAttempts = Array(maxAttempts).fill({
      guess: Array(codeLength).fill(""),
      feedback: { correctPosition: 0, correctColor: 0 },
    });
    console.log("Initial attempts:", initialAttempts);
    setAttempts(initialAttempts);

    setCurrentAttemptNumber(0);
    setIsGameOver(false);
    setHasWon(false);
    setIsGameInProgress(true);

    console.log("Game started");
  };

  //   const startGame = () => {
  //     setSecretCode(generateRandomCode());
  //     setAttempts(
  //       Array(maxAttempts).fill({
  //         guess: Array(codeLength).fill(""),
  //         feedback: { correctPosition: 0, correctColor: 0 },
  //       })
  //     );
  //     setCurrentAttemptNumber(0);
  //     setIsGameOver(false);
  //     setHasWon(false);
  //     setIsGameInProgress(true); // Start the game
  //   };

  useEffect(() => {
    console.log("Attempts updated:", attempts);
  }, [attempts]);

  useEffect(() => {
    console.log("Secret code updated:", secretCode);
  }, [secretCode]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      {/* Start Game */}
      {!isGameInProgress && (
        <button
          onClick={startGame}
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
            {/* Additional info */}
            {/* <p className="mt-2">You got {correctGuesses} guesses right.</p> */}

            <button
              onClick={startGame}
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
        <>
          <div className="flex mb-4 space-x-2">
            {pegColors.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full ${getColorClass(color)}`}
                onClick={() => selectColorFromPalette(color)}
              ></div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-8">
            <div className="flex space-x-2">
              {currentGuess.map((color, pegIndex) => (
                <div
                  key={pegIndex}
                  className={`w-6 h-6 rounded-full border-2 border-gray-300 ${getColorClass(
                    color
                  )}`}
                  onClick={() => handlePegClick(pegIndex)}
                ></div>
              ))}
            </div>
            <button
              onClick={submitGuess}
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
                    onClick={() => selectColor(color)}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Attempts board */}
          {attempts.map((attempt, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 bg-slate-500"
            >
              <div className="flex space-x-2">
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
                            ? () => handlePegClick(pegIndex)
                            : undefined
                        }
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Feedback Section */}
              <div className="flex space-x-1 bg-stone-700">
                <div className="flex space-x-1">
                  {Array(attempt.feedback.correctPosition)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-green-500 rounded-full"
                      ></div>
                    ))}
                  {Array(attempt.feedback.correctColor)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-yellow-500 rounded-full"
                      ></div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default Game;
