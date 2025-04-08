import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/HomePage";
import Products from "./Pages/Contact";
import Forum from "./Pages/AboutUs";
import Selling from "./Pages/PrivacyPolicy";
import PrivateRoute from "./PrivateRouting";
import Help from "./Pages/Help";
import Register from "./Pages/Auth/Register";
import Profile from "./Pages/Profile";
import AboutUs from "./Pages/AboutUs";
import Contacts from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

const Routings = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="Profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="aboutUs" element={<PrivateRoute element={<AboutUs />} />} />
            <Route path="contact" element={<PrivateRoute element={<Contacts />} />} />
            <Route path="privacy" element={<PrivateRoute element={<PrivacyPolicy />} />} />
            <Route path="help" element={<PrivateRoute element={<Help />} />} />
        </Routes>

    );
}
export default Routings;