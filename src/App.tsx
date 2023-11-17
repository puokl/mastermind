import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Missing from "./pages/Missing";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        {/* public routes */}
        <Route path="play" element={<Game />} />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
