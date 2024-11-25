import { Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import AuthMiddleware from "./AuthMiddleware";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<AuthMiddleware><Register/></AuthMiddleware>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
