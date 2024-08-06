import { Navbar } from "./components/navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <div className=" bg-gray-700">
        <div>
          <Navbar />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
