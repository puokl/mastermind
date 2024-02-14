export const maxAttempts: number = 2;
export const codeLength: number = 6;

export const pegColors: string[] = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
];

export const getColorClass = (color: string): string => {
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

export const generateRandomCode = (): string[] => {
  let code: string[] = [];
  for (let i = 0; i < codeLength; i++) {
    const randomIndex: number = Math.floor(Math.random() * pegColors.length);
    code.push(pegColors[randomIndex]);
  }
  return code;
};

export const handlePegClick = (
  pegIndex: number,
  activePeg: number | null,
  setActivePeg: React.Dispatch<React.SetStateAction<number | null>>
) => {
  if (activePeg === pegIndex) {
    setActivePeg(null);
  } else {
    setActivePeg(pegIndex);
  }
};

export const selectColor = (
  color: string,
  activePeg: number | null,
  currentGuess: string[],
  setCurrentGuess: React.Dispatch<React.SetStateAction<string[]>>,
  setActivePeg: React.Dispatch<React.SetStateAction<number | null>>
) => {
  if (activePeg !== null) {
    const newGuess = [...currentGuess];
    newGuess[activePeg] = color;
    setCurrentGuess(newGuess);
    setActivePeg(null);
  }
};

type GenerateFeedbackParams = {
  guess: string[];
  secretCode: string[];
};

export const generateFeedback = ({
  guess,
  secretCode,
}: GenerateFeedbackParams) => {
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

type Attempt = {
  guess: string[];
  feedback: { correctPosition: number; correctColor: number };
};

type SubmitGuessParams = {
  currentGuess: string[];
  secretCode: string[];
  currentAttemptNumber: number;
  maxAttempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>;
  setHasWon: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentAttemptNumber: React.Dispatch<React.SetStateAction<number>>;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string[]>>;
};

export const submitGuess = ({
  currentGuess,
  secretCode,
  currentAttemptNumber,
  maxAttempts,
  setAttempts,
  setHasWon,
  setIsGameOver,
  setCurrentAttemptNumber,
  setCurrentGuess,
}: SubmitGuessParams) => {
  const feedback = generateFeedback({ guess: currentGuess, secretCode });
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

  setCurrentGuess(Array(secretCode.length).fill(""));
};

export const selectColorFromPalette = (
  selectedColor: string,
  currentGuess: string[],
  setCurrentGuess: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const nextEmptyPegIndex = currentGuess.indexOf("");
  if (nextEmptyPegIndex !== -1) {
    const newGuess = [...currentGuess];
    newGuess[nextEmptyPegIndex] = selectedColor;
    setCurrentGuess(newGuess);
  }
};

export const startGame = (
  generateRandomCode: () => string[],
  maxAttempts: number,
  codeLength: number,
  setSecretCode: React.Dispatch<React.SetStateAction<string[]>>,
  setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>,
  setCurrentAttemptNumber: React.Dispatch<React.SetStateAction<number>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setHasWon: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameInProgress: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
