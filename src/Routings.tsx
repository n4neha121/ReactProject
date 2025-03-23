import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/HomePage";
import Products from "./Pages/Products";
import Forum from "./Pages/Forums";
import Selling from "./Pages/Selling";
import PrivateRoute from "./PrivateRouting";

const Routings = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="home" element={<PrivateRoute element={<Home />} />} />
            <Route path="forum" element={<PrivateRoute element={<Forum />} />} />
            <Route path="selling" element={<PrivateRoute element={<Selling />} />} />
            <Route path="product" element={<PrivateRoute element={<Products />} />} />
        </Routes>

    )
}
export default Routings;