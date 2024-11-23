import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    axios.get("/api/jokes")
    .then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error.message)
    })
  }, []);
  return (
    <>
      <h1> My Full Stack</h1>
    </>
  );
}

export default App;
