import React from "react";

function Rules() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="mb-4 text-4xl font-bold">Welcome to Mastermind</h1>
      <div className="mb-8 text-lg">
        <p className="mb-2">
          Mastermind is a classic code-breaking game where the goal is to guess
          the secret code.
        </p>
        <p className="mb-2">
          <strong>Goal:</strong> Crack the secret code consisting of a sequence
          of colored pegs.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Rules:</h2>
        <ul className="ml-6 list-disc">
          <li>
            The secret code is a combination of four colored pegs, chosen from a
            set of six colors.
          </li>
          <li>
            Arrange your guesses on the board and receive feedback after each
            attempt.
          </li>
          <li>
            Feedback consists of two elements: red pegs and white pegs.
            <ul className="ml-6 list-disc">
              <li>
                A <strong>red peg</strong>{" "}
                <div className="inline-block w-3 h-3 bg-red-500 rounded-full md:w-4 md:h-4 bg-gradient-to-br from-bg-red-500-light to-bg-red-700-dark"></div>{" "}
                indicates a correct color in the correct position.
              </li>
              <li>
                A <strong>white peg</strong>{" "}
                <div className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border-black border-[1px]"></div>{" "}
                indicates a correct color but in the wrong position.
              </li>
            </ul>
          </li>
          <li>
            Use the feedback to refine your guesses and crack the code within
            the given number of attempts.
          </li>
          <li>
            Be strategic! Each guess brings you closer to revealing the secret
            code.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Rules;
