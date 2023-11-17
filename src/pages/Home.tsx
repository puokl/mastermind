// import { useState } from "react";
// import StartButton from "../components/StartButton";
// import CodeInput from "../components/CodeInput";
// import FeedbackDisplay from "../components/FeedbackDisplay";
import { Link } from "react-router-dom";

function Home() {
  //   const [gameStarted, setGameStarted] = useState(false);
  //   const [secretCode, setSecretCode] = useState([]);
  //   // Additional state like currentGuess, guessHistory, etc.

  //   const startGame = () => {
  //     // Generate a random code and update the state
  //     setGameStarted(true);
  //   };

  //   // Function to handle guesses, update state, etc.

  return (
    <div className="app">
      Hello from Home
      <div className="mt-4">
        <Link to="/play" className="text-blue-500 hover:underline">
          Play Mastermind
        </Link>
      </div>
    </div>
  );
}

export default Home;
