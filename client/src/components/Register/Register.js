import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
   
    const registerHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const rePassword = formData.get('rePassword');
        const user = {
            username, password, email
        }
        
            if(password === rePassword ) {                
                const response = await register(user);
               
                if(response.status === 'err') {
                    throw new Error('Connot register!');
                }
                navigate('/');
            } 
            else {
                alert('Pasword mismatch!')
            }        

    }
    return (
        <section className="auth-section">
            <form className="basic-form" onSubmit={registerHandler}>
                <label htmlFor="username" >Username:</label>
                <input name="username" type="string" minLength={4}/>
                <label htmlFor="email">Email:</label>
                <input name="email" type="email" />
                <label htmlFor="password" >Password:</label>
                <input name="password" type="password" minLength={4}/>
                <label htmlFor="rePassword" >Repeat password:</label>
                <input name="rePassword" type="password"/>
                <button type="submit">Register</button>
            </form>
        </section>
    )
}

export default Register;