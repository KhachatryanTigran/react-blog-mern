import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./Layout";
import Home from "./pages/Home";
import FullPost from "./pages/FullPost";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import "./App.scss";

import Register from "./pages/Register";
const r = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/posts/:id" element={<FullPost />} />{" "}
      <Route path="/add-post" element={<AddPost />} />{" "}
      <Route path="/posts/:id/edit" element={<AddPost />} />{" "}
      <Route path="/login" element={<Login />} />{" "}
      <Route path="/register" element={<Register />} />{" "}
    </Route>
  )
);
function App() {
  return (
    <div className="outcontainer">
      <div className="container">
        <RouterProvider router={r}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
