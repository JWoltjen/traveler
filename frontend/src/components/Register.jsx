import "./Register.css"; 
import { Room } from "@material-ui/icons"; 

function Register() {
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
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register
