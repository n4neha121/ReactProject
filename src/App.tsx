import Home from './Pages/HomePage';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
      <BrowserRouter>
        <Routes>
        <Route index element={<Home />} />
        <Route path='Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
