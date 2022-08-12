import { createContext } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { login } = useContext(login);
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        let response = await login({ username, password });
        if (response === 'ok') {
            navigate('/');
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
                <button onSubmit={loginHandler}>Register</button>
            </form>
        </section>
    )
}

export default Login;