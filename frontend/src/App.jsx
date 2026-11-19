import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AdminProducts from "./pages/AdminProducts";
import ProductForm from "./pages/ProductForm";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Products />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminProducts />
              </ProtectedRoute>
            }
          />
                    <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute role="admin">
                <ProductForm />
              </ProtectedRoute>
            }
          />
                    <Route
            path="/admin/products/:id/edit"
            element={
              <ProtectedRoute role="admin">
                <ProductForm />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}