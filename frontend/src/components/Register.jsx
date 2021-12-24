import "./Register.css"; 
import { Room } from "@material-ui/icons"; 
import { useState } from 'react'; 

function Register() {
    const [success, setSuccess] = useState(true)
    const [error, setError] = useState(false)

    return (
        <div className="registerContainer">
            <div className="logo">
                <Room/> 
                Traveler
            </div>
            <form>
                <input type="text" placeholder="username"/>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password" />
                <button className="registerBtn">Register</button>
                {success &&
                <span className="success">Successful Login!</span>
                } {error &&
                <span className="failure">Login unsuccessful</span>
                }
            </form>
        </div>
    )
}

export default Register
