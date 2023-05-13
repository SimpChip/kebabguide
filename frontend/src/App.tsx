import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

// pages & components
import Home from "./pages/Home";
import Resturant from "./pages/Resturant";
import CreatePage from "./pages/CreatePage";

import CreateResturantForm from "./pages/CreatePage/CreateResturantForm";
import CreateUserForm from "./pages/CreatePage/CreateUserForm";
import CreateReviewForm from "./pages/CreatePage/CreateReviewForm";
import CreateItemForm from "./pages/CreatePage/CreateItemForm";

function App() {
  return (
    <div className="min-h-screen bg-orange-50">
      <BrowserRouter>
        <NavBar />
        <div className="min-w-full px-4">
          <Routes>
            <Route path="" element={<Home />}></Route>
            <Route path="resturant/:id" element={<Resturant />} />
            <Route path="create" element={<CreatePage />}>
              <Route path="user" element={<CreateUserForm />} />
              <Route path="resturant" element={<CreateResturantForm />} />
              <Route path="item" element={<CreateItemForm />} />
              <Route path="review" element={<CreateReviewForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
