import "./Register.css"; 
import { Room } from "@material-ui/icons"; 
import { useState, useRef } from 'react'; 
import axios from "axios";

function Register() {
    const [success, setSuccess] = useState(true)
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        const newUser = {
            username: nameRef.current.value, 
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }; 
        try {
            await axios.post("/users/register", newUser); 
            setError(false)
            setSuccess(true)
        } catch (err) {
            setError(true)
        }
    }

    return (
        <div className="registerContainer">
            <div className="logo">
                <Room/> 
                Traveler
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
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
