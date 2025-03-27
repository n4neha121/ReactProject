import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/HomePage";
import Products from "./Pages/Products";
import Forum from "./Pages/Forums";
import Selling from "./Pages/Selling";
import PrivateRoute from "./PrivateRouting";
import Help from "./Pages/Help";

const Routings = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="home" element={<PrivateRoute element={<Home />} />} />
            <Route path="forum" element={<PrivateRoute element={<Forum />} />} />
            <Route path="selling" element={<PrivateRoute element={<Selling />} />} />
            <Route path="product" element={<PrivateRoute element={<Products />} />} />
            <Route path="help" element={<PrivateRoute element={<Help />} />} />
        </Routes>

    )
}
export default Routings;