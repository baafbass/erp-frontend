
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/HomePage"); // Giriş yapıldığında ana sayfaya yönlendirme
    };

    return (
        <div style={styles.container}>
            <h1>Giriş Yap</h1>
            <div style={styles.form}>
                <label htmlFor="username">Kullanıcı Adı:</label>
                <input type="text" id="username" name="username" style={styles.input} />
                <label htmlFor="password">Şifre:</label>
                <input type="password" id="password" name="password" style={styles.input} />
                <button onClick={handleLogin} style={styles.button}>
                    Giriş Yap
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#dce2ed",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#889eca",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
    buttonHover: {

    }
};

export default Login;



