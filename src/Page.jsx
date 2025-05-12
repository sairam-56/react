import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App";
import Ant from "./Ant";
import Query from "./Query.tsx";
import CustomAntDesign from "./customAntDesign.jsx";
function Page() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ant" element={<Ant />} />
        <Route path="/query" element={<Query />} />
        <Route path="/ant/custom" element={<CustomAntDesign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Page;
