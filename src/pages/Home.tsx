import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-slate-400">
      <div className="mb-4 text-4xl font-bold">
        Welcome to Phuoc's Playground!
      </div>
      <p className="mb-8 text-lg ">
        Explore and enjoy various games. Click on the links below to play!
      </p>
      <div className="flex flex-col space-y-4">
        <Link
          to="/play"
          // className="p-4 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
          className="flex items-center justify-center w-40 h-10 p-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-yellow-700"
        >
          Mastermind
        </Link>
        <a
          href="https://nonogram-theta.vercel.app/"
          // className="p-4 text-white transition duration-300 bg-green-600 rounded-md hover:bg-green-700"
          className="flex items-center justify-center w-40 h-10 p-2 text-white transition duration-300 bg-green-600 rounded-md hover:bg-yellow-700"
        >
          Nonogram
        </a>
        <a
          href="https://minesweeper-two-gilt.vercel.app/"
          // className="p-4 text-white transition duration-300 bg-red-600 rounded-md hover:bg-red-700"
          className="flex items-center justify-center h-10 p-2 text-white transition duration-300 bg-red-600 rounded-md hover:bg-yellow-700"
        >
          Minesweeper
        </a>
        <a
          href="https://tetris-delta-eight.vercel.app/"
          className="flex items-center justify-center h-10 p-2 text-white transition duration-300 bg-yellow-600 rounded-md hover:bg-yellow-700"
        >
          Tetris
        </a>
      </div>
    </div>
  );
}

export default Home;
