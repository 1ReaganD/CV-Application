import AboutMe from "./AboutMe"
import Work from "./Work"
import Education from "./Education"
import Footer from "./Footer"
import "./App.css"
import { useState } from "react";

function App() {
  const [work, setWork] = useState([{
          workName : "",
          startDate : "",
          lastDate : "",
          description : "",
      }]);

  const [education, setEducation] = useState([{
    SchoolName : "",
    StartYear : "",
    EndYear : "",
    description : "",
  }])
  
  return (
    <div id="mainApp">
        <AboutMe setWork={setWork} setEducation={setEducation}/>
      <div id="rightPart">
        <Work work={work}/>
        <Education education={education}/>
      </div>
      <div id="footer"><Footer /></div>
    </div>
  )
}

export default App
