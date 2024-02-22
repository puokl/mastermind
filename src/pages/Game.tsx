import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Rules from "../components/Rules";

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

  const getColorClassDark = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-700",
      green: "bg-green-700",
      blue: "bg-blue-700",
      yellow: "bg-yellow-700",
      purple: "bg-purple-700",
      orange: "bg-orange-700",
    };
    return colorMap[color] || "";
  };

  const maxAttempts: number = 10;
  const codeLength: number = 4;
  const pegsPerRow =
    codeLength % 2 === 0 ? codeLength / 2 : (codeLength + 1) / 2;

  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [activePeg, setActivePeg] = useState<number | null>(null);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(false);
  const [selectedPegs, setSelectedPegs] = useState<number[]>([]);
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
  const [hoveredPeg, setHoveredPeg] = useState<number | null>(null);
  const [currentPeg, setCurrentPeg] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>(
    Array(maxAttempts).fill({
      guess: Array(codeLength).fill(""),
      feedback: { correctPosition: 0, correctColor: 0 },
    })
  );
  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(codeLength).fill("")
  );

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
    if (activePeg === pegIndex) {
      setActivePeg(null);
    } else {
      setActivePeg(pegIndex);
    }
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
    // Check if any pegs are not selected
    if (currentGuess.some((color) => color === "")) {
      alert("Please choose the color for all pegs before submitting.");
      return;
    }
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
      // setIsGameOver(true);
      // setIsGameInProgress(false);
    } else if (currentAttemptNumber + 1 >= maxAttempts) {
      setIsGameOver(true);
      // setIsGameInProgress(false);
    } else {
      setCurrentAttemptNumber(currentAttemptNumber + 1);
    }
    setCurrentPeg(0);
    setCurrentGuess(Array(codeLength).fill(""));
  };

  const selectColorFromPalette = (selectedColor: string, pegIndex: number) => {
    if (pegIndex !== -1 && currentPeg < codeLength) {
      const newGuess = [...currentGuess];
      newGuess[pegIndex] = selectedColor;
      setCurrentGuess(newGuess);
      setCurrentPeg((prevPeg) => prevPeg + 1);
      setSelectedPegs([...selectedPegs, pegIndex + 1]);
      setSelectedPeg(null);
    } else {
      // Inform the user to select the specific peg manually
      console.log("Please select a specific peg manually.");
    }
  };

  const startGame = () => {
    setSecretCode(generateRandomCode());
    setAttempts(
      Array(maxAttempts).fill({
        guess: Array(codeLength).fill(""),
        feedback: { correctPosition: 0, correctColor: 0 },
      })
    );
    setCurrentAttemptNumber(0);
    setIsGameOver(false);
    setHasWon(false);
    setIsGameInProgress(true); // Start the game
  };

  useEffect(() => {
    console.log("Attempts updated:", attempts);
    console.log("currentGuess", currentGuess);
    console.log("currentPeg", currentPeg);
    console.log("pegsPerRow", pegsPerRow);
  }, [attempts, currentGuess, currentPeg]);

  useEffect(() => {
    console.log("Secret code updated:", secretCode);
  }, [secretCode]);

  return (
    <div className="w-screen min-h-screen pt-10 bg-blue-400">
      {/* Start Game */}
      {!isGameInProgress && (
        <div className="p-10">
          <Rules />
          <button
            onClick={startGame}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Start Game
          </button>
        </div>
      )}

      {isGameInProgress && (
        <div className="w-100% bg-yellow-300 min-h-screen p-10">
          <div className="md:flex">
            <div className="md:w-1/2">
              {/* {automatic selection} */}
              <div className="flex flex-col items-center justify-center h-24 mb-4 space-x-2 bg-red-200 ">
                {currentGuess.includes("") ? (
                  <p className="mb-2">
                    Choose the color of peg n. {currentGuess.indexOf("") + 1}:
                  </p>
                ) : (
                  <p className="mb-2">You can change the colors manually</p>
                )}
                <div className="flex space-x-2">
                  {pegColors.map((color) => {
                    const index = currentGuess.indexOf("");

                    return (
                      <div
                        key={color}
                        className={`w-6 h-6 rounded-full ${getColorClass(
                          color
                        )} hover:${getColorClassDark(color)} block m-0`}
                        style={{
                          background: `radial-gradient(circle at 2px 2px, ${color}, #4C4C4C)`,
                        }}
                        onClick={() => selectColorFromPalette(color, index)}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs md:text-md">
                  Click on the peg to manually choose or modify the color
                </p>
              </div>
              <div className="flex items-center justify-center space-x-8 bg-cyan-500">
                <div className="flex space-x-2">
                  {currentGuess.map((color, pegIndex) => (
                    <div
                      key={pegIndex}
                      className={`relative w-6 h-6 rounded-full border-2 border-gray-600 ${
                        activePeg === pegIndex ? "scale-125" : ""
                      } ${getColorClass(
                        color
                      )} hover:cursor-pointer hover:opacity-75`}
                      onMouseEnter={() => setHoveredPeg(pegIndex)}
                      onMouseLeave={() => setHoveredPeg(null)}
                      onClick={() =>
                        isGameInProgress && handlePegClick(pegIndex)
                      }
                    >
                      {/* {color === "" &&
                        hoveredPeg === pegIndex &&
                        isGameInProgress && (
                          <div className="absolute w-48 px-2 py-1 mt-2 text-xs transform -translate-x-1/2 bg-gray-400 rounded top-full left-1/2">
                            Click to manually choose this peg color
                          </div>
                        )}
                      {color !== "" &&
                        hoveredPeg === pegIndex &&
                        isGameInProgress && (
                          <div className="absolute w-48 px-2 py-1 mt-2 text-xs transform -translate-x-1/2 bg-gray-400 rounded top-full left-1/2">
                            Click to manually modify this peg color
                          </div>
                        )} */}
                    </div>
                  ))}
                </div>
                <button
                  onClick={submitGuess}
                  className="p-2 text-sm text-white bg-blue-500 rounded"
                  disabled={isGameOver}
                >
                  Submit
                </button>
              </div>

              <div className="w-auto h-16 bg-slate-100">
                <div className="flex flex-col items-center justify-center w-auto h-full p-4 border border-gray-100 rounded">
                  {activePeg !== null && (
                    <p className="mb-2 text-xs">
                      Choose the color of peg n. {activePeg + 1}:
                    </p>
                  )}

                  {activePeg !== null && (
                    <div className="flex space-x-2 ">
                      {pegColors.map((color) => (
                        <div
                          key={color}
                          className={`w-6 h-6 rounded-full ${getColorClass(
                            color
                          )}`}
                          onClick={() => selectColor(color)}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Attempts board */}
            <div className="m-10 md:w-1/2 ">
              {/* <div className=""> */}
              {attempts.map((attempt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center border-orange-400 border-1"
                >
                  {/* Guess Pegs Section - your code*/}
                  <div className="p-3 md:p-3.5 bg-orange-800 ">
                    <div className="flex space-x-2 bg-orange-800 ">
                      {/* Rendering pegs */}
                      {[...Array(codeLength)].map((_, pegIndex) => (
                        <div
                          key={pegIndex}
                          className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-gray-600 ${getColorClass(
                            attempt.guess[pegIndex]
                          )}`}
                          onClick={
                            index === currentAttemptNumber
                              ? () => handlePegClick(pegIndex)
                              : undefined
                          }
                        >
                          {attempt.guess[pegIndex] === "" && (
                            <div className="w-full h-full rounded-full bg-orange-950"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Feedback Section - key pegs*/}
                  <div
                    className={`grid grid-rows-2 grid-flow-col gap-1 bg-orange-800 p-2 w-20`}
                  >
                    {/* default empty pegs */}
                    {Array(
                      codeLength -
                        attempt.feedback.correctPosition -
                        attempt.feedback.correctColor
                    )
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full md:w-4 md:h-4 bg-orange-950"
                        ></div>
                      ))}

                    {/* colored pegs based on feedback */}
                    {Array(attempt.feedback.correctPosition)
                      .fill("red-600")
                      .map((color, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-${color} bg-gradient-to-br from-${color}-light to-${color}-dark`}
                        ></div>
                      ))}
                    {Array(attempt.feedback.correctColor)
                      .fill("white")
                      .map((color, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-${color}`}
                        ></div>
                      ))}
                  </div>
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
          <div className="p-2 m-4 bg-teal-200">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 bg-red-600 rounded-full"></div> =
              correct color in correct position
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 bg-white rounded-full"></div> =
              correct color in wrong position
            </div>
          </div>
        </div>
      )}
      {/* Current guess */}
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center min-h-screen bg-gray-700 bg-opacity-50">
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
        <div className="absolute inset-0 flex items-center justify-center h-full bg-gray-700 bg-opacity-50">
          <div className="p-4 bg-white rounded">
            <p>Congratulations! You won!</p>
            <div className="flex mt-2 space-x-2">
              {secretCode.map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full ${getColorClass(color)}`}
                ></div>
              ))}
            </div>
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
    </div>
  );
};
export default Game;
