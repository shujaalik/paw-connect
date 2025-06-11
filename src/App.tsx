import { Route, Routes } from "react-router-dom";
// import Navigation from "./components/ui/custom/navigation"
import Home from "./routes/home";
// import Map from "./routes/map";
import Adoptions from "./routes/adoptions";
import Navbar04Page from "./components/navbar-04/navbar-04"
import LostAndFound from "./routes/lost-and-found";
import Map from "./routes/map";

function App() {
  return <div className="w-screen overflow-x-hidden h-screen font-poppins bg-[#f1f5f9]">
    <Navbar04Page />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adoption" element={<Adoptions />} />
      <Route path="/lost-and-found" element={<LostAndFound />} />
      <Route path="/map" element={<Map />} />
      {/* <Route path="/home" element={<Home />} />
      */}
    </Routes>
    {/* <Navigation>
      <div className="w-full h-full px-5">
      </div>
    </Navigation> */}
  </div>
}

export default App
