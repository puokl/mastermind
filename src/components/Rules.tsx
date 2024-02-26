import React from "react";

function Rules() {
  return (
    <div className="m-5 mb-20 text-black">
      <h2 className="mb-4 text-2xl font-bold">Mastermind Game</h2>
      <p>
        Mastermind is a classic code-breaking game where the goal is to guess
        the secret code.
      </p>
      <p>
        <strong>Goal:</strong> Crack the secret code consisting of a sequence of
        colored pegs.
      </p>
      <p>
        <strong>Rules:</strong>
      </p>
      <ul className="pl-6 list-disc">
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
          <ul className="pl-6 list-disc">
            <li>
              A <strong>red peg</strong> indicates a correct color in the
              correct position.
            </li>
            <li>
              A <strong>white peg</strong> indicates a correct color but in the
              wrong position.
            </li>
          </ul>
        </li>
        <li>
          Use the feedback to refine your guesses and crack the code within the
          given number of attempts.
        </li>
        <li>
          Be strategic! Each guess brings you closer to revealing the secret
          code.
        </li>
      </ul>
    </div>
  );
}

export default Rules;
