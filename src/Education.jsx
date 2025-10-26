import "./education.css"

function Education({ education }) {
    console.log(education.map((elimu) => elimu))
    return (
        <div id="education">
            <h1>Education</h1>
            {education.map((elimu, index) => {
                return (
                    <div className="education" key={index}>
                        <h2>{elimu.SchoolName}</h2>
                        <p>{elimu.StartYear} - {elimu.EndYear}</p>
                        <p>{elimu.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Education;