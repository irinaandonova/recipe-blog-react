import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const Register = () => {
    const { register } = useContext(AuthContext)
    const navigate = useNavigate();

    const registerHandler = async(e) => {
        e.preventDefault();
        console.log('here');
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const rePassword = formData.get('rePassword');
        const user = {
            username, password, email
        }
        console.log(user);
            if(!username || !email || !password) {
                throw new Error('All fields must be filled!');
            }
            if(password === rePassword ) {
                
                const response = await register(user);
                console.log(response)
                if(response.status === 'err') {
                    throw new Error('Connot register!');
                }
                navigate('/');
            } 
            else {
                console.log(password);
                console.log(rePassword);
                throw new Error('Pasword mismatch')
            }        

    }
    return (
        <section className="auth-section">
            <form className="auth-form" onSubmit={registerHandler}>
                <label htmlFor="username" >Username:</label>
                <input name="username" type="string" />
                <label htmlFor="email">Email:</label>
                <input name="email" type="email" />
                <label htmlFor="password" >Password:</label>
                <input name="password" type="password"/>
                <label htmlFor="rePassword" >Repeat password:</label>
                <input name="rePassword" type="password"/>
                <button type="submit">Register</button>
            </form>
        </section>
    )
}

export default Register;