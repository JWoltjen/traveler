import "./Login.css"; 
import { Room, Cancel } from "@material-ui/icons"; 
import { useState, useRef } from 'react'; 
import axios from "axios";

function Login({setShowLogin}) {

    const [error, setError] = useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        const newUser = {
            username: nameRef.current.value, 
            password: passwordRef.current.value,
        }; 
        try {
            await axios.post("/users/login", newUser); 
            setError(false)
        } catch (err) {
            setError(true)
        }
    }

    return (
        <div className="loginContainer">
            <div className="logo">
                <Room/> 
                Traveler
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="loginBtn">Login</button>
                {error && (
                    <span className="failure">Login unsuccessful</span>
                )}
            </form>
            <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>
        </div>
    )
}

export default Login
