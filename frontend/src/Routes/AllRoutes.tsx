import { Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import AuthMiddleware from "./AuthMiddleware";
import Login from "../pages/Login";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<AuthMiddleware><Register/></AuthMiddleware>}/>
        <Route path="/login" element={<AuthMiddleware><Login/></AuthMiddleware>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
