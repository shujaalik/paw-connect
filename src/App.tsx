import { Route, Routes } from "react-router-dom";
import Navigation from "./components/ui/custom/navigation"
import Home from "./routes/home";

function App() {
  return <div className="w-screen overflow-hidden h-screen font-poppins bg-linear-360 from-[#FFD7C7] to-background">
    <Navigation />
    <div className="w-full h-full py-30 px-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  </div>
}

export default App
