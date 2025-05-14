import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App";
import Ant from "./Ant";
import Query from "./Query.jsx";
import CustomAntDesign from "./customAntDesign.jsx";
import ReduxSaga from "./ReduxSaga.jsx";
import NotFound from "./NotFound.jsx";
function Page() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ant" element={<Ant />} />
        <Route path="/ant" element={<Ant />} />
        <Route path="/saga" element={<ReduxSaga />} />
        <Route path="/query" element={<Query />} />
        <Route path="/ant/custom" element={<CustomAntDesign />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Page;
