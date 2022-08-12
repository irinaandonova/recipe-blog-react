const Register = () => {
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
            </form>
        </section>
    )
}

export default Register;