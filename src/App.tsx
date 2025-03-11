import Home from './Pages/HomePage';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Pages/Products';
import Forum from './Pages/Forums';
import Selling from './Pages/Selling';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='Login' element={<Login />} />
        <Route path='Product' element={<Products />} />
        <Route path='Forum' element={<Forum />} />
        <Route path='Selling' element={<Selling />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
