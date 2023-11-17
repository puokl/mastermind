import { Link } from "react-router-dom";

function Home() {
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
