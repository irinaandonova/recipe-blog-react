import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
const Login = () => {
    const { login } = useContext(AuthContext);
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
                <label htmlFor="username">Username:</label>
                <input name="username" type="string" />
                <label htmlFor="password">Password:</label>
                <input name="password" />
                <button onSubmit={loginHandler}>Login</button>
            </form>
        </section>
    )
}

export default Login;