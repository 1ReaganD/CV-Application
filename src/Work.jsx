import "./work.css"

function Work({work}) {
    return (
        <div id="work">
            <h1>Work Experience</h1>
            {work.map((kazi, index) => {
                return (
                    <div className="experience" key={index}>
                        <h2>{kazi.workName}</h2>
                        <p>{kazi.startDate} - {kazi.lastDate}</p>
                        <p>{kazi.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Work;