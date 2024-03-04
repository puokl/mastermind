import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4 text-4xl font-bold">
        Welcome to Phuoc's Playground!
      </div>
      <p className="mb-8 text-lg text-gray-700">
        Explore and enjoy various games. Click on the links below to play!
      </p>
      <div className="flex flex-col space-y-4">
        <Link
          to="/play"
          className="p-4 text-white transition duration-300 rounded-md bg-sky-500 hover:bg-sky-600"
        >
          Mastermind
        </Link>
        <Link
          to="https://nonogram-theta.vercel.app/"
          className="p-4 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
        >
          Nonogram
        </Link>
        <Link
          to="https://minesweeper-two-gilt.vercel.app/"
          className="p-4 text-white transition duration-300 bg-teal-500 rounded-md hover:bg-teal-600"
        >
          Minesweeper
        </Link>
      </div>
    </div>
  );
}

export default Home;
