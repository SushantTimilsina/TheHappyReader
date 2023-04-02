import Layout from "./Components/Layout/Layout";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import Contactus from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Shop from "./Pages/shop";
import Signup from "./Pages/Signup";
import ProductDetailPage from "./Pages/shop/ProductDetailPage";
import Error from "./Pages/Error";
import Aboutus from "./Pages/Aboutus";
import Cart from "Pages/cart";
import AdminDashboard from "Pages/Dashboard/Admin/AdminDashboard";
import Author from "Pages/Dashboard/Admin/Author";
import Product from "Pages/Dashboard/Admin/Product";
import AddProduct from "Pages/Dashboard/Admin/Product/Add";
import EditProduct from "Pages/Dashboard/Admin/Product/Edit";
import AddAuthor from "Pages/Dashboard/Admin/Author/Add";
import EditAuthor from "Pages/Dashboard/Admin/Author/Edit";
import Genre from "Pages/Dashboard/Admin/Genre";
import EditGenre from "Pages/Dashboard/Admin/Genre/Edit";
import AddGenre from "Pages/Dashboard/Admin/Genre/Add";
import UserProfile from "Pages/Profile";
import DashboardLayout from "Components/Layout/DashboardLayout/DashboardLayout";
import Checkout from "Pages/cart/checkout";
import { ScrollToTop } from "./Components/ScrollToTop";
import Order from "Pages/Dashboard/Admin/Order";
import UserOrder from "Pages/orders";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="contact"
          element={
            <Layout>
              <Contactus />
            </Layout>
          }
        />
        <Route
          path="login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="shop"
          element={
            <Layout>
              <Shop />
            </Layout>
          }
        />
        <Route
          path="about"
          element={
            <Layout>
              <Aboutus />
            </Layout>
          }
        />
        <Route
          path="signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="shop/:productId"
          element={
            <Layout>
              <ProductDetailPage />
            </Layout>
          }
        />
        <Route
          path="cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route
          path="cart/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />

        <Route
          path="profile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }
        />
        <Route
          path="order"
          element={
            <Layout>
              <UserOrder />
            </Layout>
          }
        />
        {/* dashboard routes starts */}
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="admin-dashboard/profile"
          element={
            <DashboardLayout>
              <UserProfile />
            </DashboardLayout>
          }
        />
        <Route path="admin-dashboard/author" element={<Author />} />
        <Route path="admin-dashboard/author/add" element={<AddAuthor />} />
        <Route path="admin-dashboard/author/edit" element={<EditAuthor />} />
        <Route path="admin-dashboard/genre" element={<Genre />} />
        <Route path="admin-dashboard/genre/add" element={<AddGenre />} />
        <Route path="admin-dashboard/genre/edit" element={<EditGenre />} />
        <Route path="admin-dashboard/product" element={<Product />} />
        <Route path="admin-dashboard/product/add" element={<AddProduct />} />
        <Route path="admin-dashboard/product/edit" element={<EditProduct />} />
        <Route path="admin-dashboard/order" element={<Order />} />
        {/* dashboard route ends */}

        <Route
          path="*"
          element={
            <Layout>
              <Error />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
