import { Routes, Route } from "react-router-dom";
import "./App.css";

import AdminProduct from "./pages/AdminProduct";
import AdminUser from "./pages/AdminUser";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import AdminShopping from "./pages/AdminShopping";
import GeneratePurchase from "./pages/GeneratePurchase";
import AdminMovements from "./pages/AdminMovements";
import AdminHome from "./pages/AdminHome";
import Products from "./pages/Products";
import Factures from "./pages/Factures";
import ProtectedRoute from "./ProtectedRoute"; // Importar ruta protegida

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/products" element={<Products />} />
      <Route path="/factures" element={<Factures />} />

      {/* Rutas protegidas */}
      <Route path="/admin-home" element={<ProtectedRoute element={<AdminHome />} />} />
      <Route path="/admin-product" element={<ProtectedRoute element={<AdminProduct />} />} />
      <Route path="/admin-user" element={<ProtectedRoute element={<AdminUser />} />} />
      <Route path="/admin-shopping" element={<ProtectedRoute element={<AdminShopping />} />} />
      <Route path="/generate-purchase" element={<ProtectedRoute element={<GeneratePurchase />} />} />
      <Route path="/admin-movements" element={<ProtectedRoute element={<AdminMovements />} />} />
    </Routes>
  );
}

export default App;
