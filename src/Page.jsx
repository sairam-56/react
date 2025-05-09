import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App";
import Ant from "./Ant";
import Query from "./Query.tsx";
function Page() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ant" element={<Ant />} />
        <Route path="/query" element={<Query />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Page;
