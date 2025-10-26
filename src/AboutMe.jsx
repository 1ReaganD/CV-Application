import { useState, useEffect } from "react";
import "./AboutMe.css"
import Profile from "./assets/cvProfile.jpeg"
import { createPortal } from "react-dom";

function Modal(props) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (props.isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup function
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [props.isOpen]);

    if (!props.isOpen) return null;

    return createPortal(
        <div id="modal" onClick={(event) => (event.target.id === "modal") ? props.onClose() : null}>
            <div id="modalInnerPart">{props.children}</div>
        </div>, document.body
    )
}

function AboutMe({ setWork, setEducation}) {
    const [isOpen, setIsOpen] = useState(false);

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        role: "",
        location: "",
        email: "",
        phoneNumber: "",
    });

    const [skills, setSkills] = useState([{
        skillName: "",
        confidenceLevel: 0,
    }]);

    const [language, setLanguage] = useState([{
        languageName: "",
        confidenceLevelLang: 0
    }]);

    var fullName = `${details.firstName} ${details.lastName}`;

    const handleChange = (event) => {
        var fieldName = event.target.id;
        var value = event.target.value;
        console.log(fieldName)
        setDetails((detailsCopy) => ({ ...detailsCopy, [fieldName]: value }))
    }

    const handleSkillChange = (event) => {
        var skillsname = event.target.id;
        var skillsValue = event.target.value;
        setSkills((prevSkills) => {
            const lastSkill = prevSkills[prevSkills.length - 1];
            const updatedLastSkill = { ...lastSkill, [skillsname]: skillsValue }
            return [...prevSkills.slice(0, -1), updatedLastSkill];
        })
    }

    const addSkill = () => {
        document.querySelector("#skillName").value = "";
        document.querySelector("#confidenceLevel").value = "";
        setSkills((prevSkills) => {
            return [...prevSkills, { skillName: "", confidenceLevel: 0, }];
        })
    }

    const handleLanguageChange = (event) => {
        const idLang = event.target.id;
        const langTitle = event.target.value;
        setLanguage((prevLang) => {
            const lastLang = prevLang[prevLang.length - 1];
            const updatedLang = { ...lastLang, [idLang]: langTitle };
            return [...prevLang.slice(0, -1), updatedLang];
        })
    }

    const addLang = () => {
        document.querySelector("#languageName").value = "";
        document.querySelector("#confidenceLevelLang").value = "";
        setLanguage((prevLang) => {
            return [...prevLang, { languageName: "", confidenceLevelLang: 0, }];
        })
    }

    const handleWorkChange = (event) => {
        const id = event.target.id;
        const desc = event.target.value;
        setWork((prevWorks) => {
            const newWork = prevWorks[prevWorks.length - 1];
            const updatedNewWork = {...newWork, [id] : desc};
            return [...prevWorks.slice(0, -1), updatedNewWork];
        })
    }

    const addWork = () => {
        document.querySelector("#workName").value = "";
        document.querySelector("#startDate").value = "";
        document.querySelector("#lastDate").value = "";
        document.querySelector("#description").value = "";
        setWork((prevWork) => {
            return [...prevWork, {
                workName : "",
                startDate : "",
                lastDate : "",
                description : "",
            }]
        })
    }

    const handleEducationChange = (event) => {
        const id = event.target.id;
        const desc = event.target.value;
        setEducation((prevWorks) => {
            const newEdu = prevWorks[prevWorks.length - 1];
            const updatedNewEdu = {...newEdu, [id] : desc};
            return [...prevWorks.slice(0, -1), updatedNewEdu];
        })
    }

    const addEduc = () => {
        document.querySelector("#SchoolName").value = "";
        document.querySelector("#StartYear").value = "";
        document.querySelector("#EndYear").value = "";
        document.querySelector("#descriptionEduc").value = "";
        setEducation((preEduc) => [...preEduc, {
            SchoolName : "",
            StartYear : "",
            EndYear : "",
            description : ""
        }])
    }

    return (
        <>
            <div id="AboutMe">
                <div id="image">
                    <img src={Profile} />
                    <h2>{fullName}</h2>
                </div>
                <div id="information">
                    <p>{details.role }</p>
                    <p>{details.location}</p>
                    <p>{details.email}</p>
                    <p>{details.phoneNumber}</p>
                </div>
                <div id="skills">
                    <h2>Skills</h2>
                    {skills.map((skill, index) => {
                        return (
                            <div className="skill" key={index}>
                                <p>{skill.skillName}</p>
                                <div className="myProgress">
                                    <div className="myBar" style={{ width: `${skill.confidenceLevel}%` }}><p>{skill.confidenceLevel}</p></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div id="languages">
                    <h2>Languages</h2>
                    {language.map((langu, index) => {
                        return (
                            <div className="skill" key={index}>
                                <p>{langu.languageName}</p>
                                <div className="myProgress">
                                    <div className="myBar" style={{ width: `${langu.confidenceLevelLang}%` }}></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div id="buttonArea">
                    <button id="edit" onClick={() => setIsOpen(true)}>Edit</button>
                    <button id="download">Download</button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <fieldset>
                    <legend>Personal Information</legend>
                    <label> First Name : <input type="text" id="firstName" onChange={handleChange} /></label>
                    <label> Last Name : <input type="text" id="lastName" onChange={handleChange} /></label><br /><br />
                    <label> Job Position : <input type="text" id="role" onChange={handleChange} /></label>
                    <label> Home Place : <input type="text" id="location" onChange={handleChange} /></label><br /><br />
                    <label> Email : <input type="text" id="email" onChange={handleChange} /></label><br /><br />
                    <label> Phone Number : <input type="number" id="phoneNumber" onChange={handleChange} /></label>
                </fieldset><br /><br />
                <fieldset>
                    <legend>Skills</legend>
                    <label> Skill - Name : <input type="text" id="skillName" onChange={handleSkillChange} /></label><br /><br />
                    <label> Confidence Level : <input type="range" id="confidenceLevel" onChange={handleSkillChange} /></label><br /><br />
                    <button className="add" id="add" onClick={addSkill} >Add</button>
                </fieldset><br /><br />
                <fieldset>
                    <legend>Languages</legend>
                    <label> Language : <input type="text" id="languageName" onChange={handleLanguageChange} /></label><br /><br />
                    <label> Confidence Level : <input type="range" id="confidenceLevelLang" onChange={handleLanguageChange}/></label><br /><br />
                    <button className="add" id="add" onClick={addLang} >Add</button>
                </fieldset><br /><br />
                <fieldset>
                    <legend>Work Experience</legend>
                    <label> Work place : <input type="text" id="workName" onChange={handleWorkChange}/></label><br /><br />
                    <label> Start Date : <input type="date" id="startDate" onChange={handleWorkChange}/></label><br /><br />
                    <label> Last Date : <input type="date" id="lastDate" onChange={handleWorkChange}/></label><br /><br />
                    <label> Description : <br />
                        <textarea id="description" onChange={handleWorkChange}></textarea></label><br /><br />
                        <button className="add" id="add" onClick={addWork} >Add</button>
                </fieldset><br /><br />
                <fieldset>
                    <legend>Education</legend>
                    <label> School Name : <input type="text" id="SchoolName" onChange={handleEducationChange}/></label><br /><br />
                    <label> Start Year : <input type="date" id="StartYear" onChange={handleEducationChange}/></label>
                    <label> End Year : <input type="date" id="EndYear" onChange={handleEducationChange}/></label><br /><br />
                    <label> Description : <br />
                        <textarea id="descriptionEduc" onChange={handleEducationChange}></textarea></label><br /><br />
                        <button className="add" id="add" onClick={addEduc} >Add</button>
                </fieldset><br /><br />
            </Modal>
        </>
    )
}

export default AboutMe;