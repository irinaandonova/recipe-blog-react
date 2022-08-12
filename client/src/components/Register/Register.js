import { register } from "../../services/authService";

const Register = () => {
    const registerHandler = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const rePassword = formData.get('repeat-password');
            if(!username || !email || !password) {
                throw new Error('All fields must be filled!');
            }
            if(password === rePassword ) {
                const user = {
                    username,
                    email,
                    password
                }
                const response = await register(user);
                if(response.status === 'err') {
                    throw new Error('Connot register!');
                }
            }
            

    }
    return (
        <section className="auth-section">
            <form className="auth-form">
                <label htlmFor="username">Username:</label>
                <input name="username" type="string" />
                <label htlmFor="email">Email:</label>
                <input name="email" type="email" />
                <label htlmFor="password">Password:</label>
                <input name="password" />
                <label htlmFor="repeat-password">Repeat password:</label>
                <input name="reapeat-password" />
                <button onSubmit={registerHandler}>Register</button>
            </form>
        </section>
    )
}

export default Register;