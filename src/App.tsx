import { Route, Routes } from "react-router-dom";
import Navigation from "./components/ui/custom/navigation"
import Home from "./routes/home";
import Map from "./routes/map";

function App() {
  return <div className="w-screen overflow-hidden h-screen font-poppins bg-linear-360 from-[#FFD7C7] to-background">
    <Navigation />
    <div className="w-full h-full py-30 px-5 pb-30">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  </div>
}

export default App
