
import React,{useEffect} from 'react';
import Notes from "./Notes";
import AddNote from './AddNote';
import {useNavigate} from "react-router-dom"
import Alert from './Alert';
function Home(props) {

  let navigate = useNavigate();
  console.log(navigate);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signup",{replace:true});
    } 
  },[token])
  const { showAlert } = props;
  return (
    <div>
      <AddNote showAlert={ showAlert}/>
      <div className="container mb-1">
        <Notes showAlert={ showAlert}/>
      </div>
    </div>
  )
}

export default Home