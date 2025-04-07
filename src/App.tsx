import { BrowserRouter } from "react-router-dom";
import Routings from "./Routings";
import { UserProvider } from "./contexts/UserContext";

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routings />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
