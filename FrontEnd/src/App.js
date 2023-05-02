import "./App.css";

import { createBrowserRouter, RouterProvider , BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Recomandation from "./components/Recomandation";
import Recommed from "./components/Recommed";
import VideoCompression from "./components/VideoCompression";
import Dataset from "./components/Dataset";
// import { loader as RecomandationLoader } from "./components/Recomandation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "recomandations/:videoId",
        element: <Recomandation></Recomandation>,
      },
    ],
  },
]);

function App() {
  
  // return <RouterProvider router={router}></RouterProvider>;
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/recommed/:videoId" element={<Recommed />}></Route>
        <Route path="/compress" element={<VideoCompression />}></Route>
        <Route path="/createdataset" element={<Dataset />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
