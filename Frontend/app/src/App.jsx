import "./App.css";
import Login from "./components/login/Login";
import Products from "./components/products/Products";
import Register from "./components/register/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
