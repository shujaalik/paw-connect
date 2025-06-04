import { Route, Routes } from "react-router-dom";
import Navigation from "./components/ui/custom/navigation"
import Home from "./routes/home";
import Map from "./routes/map";
import Adoptions from "./routes/adoptions";

function App() {
  return <div className="w-screen overflow-x-hidden h-screen font-poppins bg-linear-360 from-[#FFD7C7] to-background">
    <Navigation>
      <div className="w-full h-full px-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/adoption" element={<Adoptions />} />
        </Routes>
      </div>
    </Navigation>
  </div>
}

export default App
