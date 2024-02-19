import './style.css'

function InputBox(props) {
    return (
        <div className="input-box"> 
            <label>{props.label}</label>
            <br />
            <input type={props.type} />
        </div>
    )
}


export default InputBox