import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Cart from "../pages/Cart";
import OtpAuthentication from "../pages/OtpAuthentication";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter ([
    {
        path : '/',
        element: <App />,
        children : [
            {
                path: "",
                element: <Home/>,
                children: [
                    {   path: "/cart",
                        element: <Cart/>,
                    }
                ]
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/sign-up",
                element: <SignUp/>,
            },
            {
                path:'/forgot-password',
                element:<ForgotPassword />
            }, 
            {
                path:'/otp-auth',
                element:<OtpAuthentication />
            }, 
            {
                path:'/change-password',
                element:<ChangePassword />
            }, 
        
        ]

    }
]);

export default router ;