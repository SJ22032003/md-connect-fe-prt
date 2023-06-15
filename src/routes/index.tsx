import { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  LazyLandingPage,
} from "./lazy.routes";
 
function Routing(){
  return (
    <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LazyLandingPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routing;
