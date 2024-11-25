import { Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
