import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4 text-4xl font-bold">Welcome to Game Playground!</div>
      <p className="mb-8 text-lg text-gray-700">
        Explore and enjoy various games. Click on the links below to play!
      </p>
      <div className="flex flex-col space-y-4">
        <Link
          to="/play"
          className="p-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Play Mastermind
        </Link>
        <Link
          to="https://nonogram-theta.vercel.app/"
          className="p-4 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
        >
          Play Nonogram
        </Link>
      </div>
    </div>
  );
}

export default Home;
