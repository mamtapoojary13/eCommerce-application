import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import HomeScreen from "./Screens/HomeScreen.jsx";
import ProductScreen from "./Screens/ProductScreen.jsx";
import CartScreen from "./Screens/CartScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";
import ShippingScreen from "./Screens/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentScreen from "./Screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen.jsx";
import OrderScreen from "./Screens/OrderScreen.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProfileScreen from "./Screens/ProfileScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./Screens/admin/OrderListScreen.jsx";
import ProductListScreen from "./Screens/admin/ProductListScreen.jsx";
import ProductEditScreen from "./Screens/admin/ProductEditScreen.jsx";
import UserListScreen from "./Screens/admin/UserListScreen.jsx";
import UserEditScreen from "./Screens/admin/UserEditScreen.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
