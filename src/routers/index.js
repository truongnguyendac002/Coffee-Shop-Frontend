import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Cart from "../pages/Cart";
import OtpAuthentication from "../pages/OtpAuthentication";
import ChangePassword from "../pages/ChangePassword";
import PrivateRoute from "./private.route";
import Checkout from "../pages/Checkout";
import ProductDetail from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import AdminHome from "../pages/AdminHome";
import ProductsContent from "../components/adminpage/product/ProductsContent";
import UsersContent from "../components/adminpage/user/UsersContent";
import HomeContent from "../components/adminpage/HomeContent";
import NotFound from "../pages/NotFound404";
import SearchProduct from "../pages/SearchProduct";
import CategoryPage from "../pages/CategoryPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: "cart",
                        element: (
                            <PrivateRoute>
                                <Cart />
                            </PrivateRoute>
                        ),

                    },
                    {
                        path: "/product/:id",
                        element: <ProductDetail />
                    },
                    {
                        path: "checkout",
                        element: (
                            <PrivateRoute>
                                <Checkout />
                            </PrivateRoute>
                        ),

                    },
                    {
                        path: "/search", 
                        element: <SearchProduct/>
                    },
                    {
                        path: "profile",
                        element: (
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        ),
                    },
                    {
                        path: "*",
                        element: <NotFound />,

                    },
                    {
                        path: "category/:categoryName/:categoryId",
                        element: <CategoryPage />
                    },
                ]
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/sign-up",
                element: <SignUp />,
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/otp-auth',
                element: <OtpAuthentication />
            },
            {
                path: '/change-password',
                element: <ChangePassword />
            },
            {
                path: "/admin",
                element: (
                    <PrivateRoute>
                        <AdminHome />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: "",
                        element: (
                            <HomeContent />
                        ),
                    },
                    {
                        path: "products",
                        element: (
                            <ProductsContent />
                        ),
                    },
                    {
                        path: "users",
                        element: (
                            <UsersContent />
                        ),
                    },
                    {
                        path: "*",
                        element: <NotFound />,

                    }
                ]

            },


        ]

    }
]);

export default router;