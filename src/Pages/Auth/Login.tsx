import { FC, useEffect, useState } from "react";
import '../../App.css'
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import '../../Css/Login.css'
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/backgroundImg.jpg"; // Import the image
import { showError, showSuccess } from "../../Components/toast";
import { API } from "../../utils/api";
import ENDPOINTS from "../../utils/Endpoints";


const Login: FC = () => {
    const backgroundStyle = {
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    };
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState({
        emailError: '',
        passwordError: ''
    });
    // const [loginUser, setLoginUser] = useState<unknown>(null);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleSubmit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [email, password]);
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const Validation = () => {
        let isValid = true;

        // Email Validation
        if (email.length === 0) {
            setError(prev => ({ ...prev, emailError: 'Email is required' }));
            isValid = false;
        } else if (!regEx.test(email)) {
            setError(prev => ({ ...prev, emailError: 'Enter a valid email address' }));
            isValid = false;
        } else {
            setError(prev => ({ ...prev, emailError: '' }));
        }

        // Password Validation
        if (password.length === 0) {
            setError(prev => ({ ...prev, passwordError: 'Password is required' }));
            isValid = false;
        } else if (password.length < 6) {
            setError(prev => ({ ...prev, passwordError: 'Password must be at least 6 characters' }));
            isValid = false;
        } else {
            setError(prev => ({ ...prev, passwordError: '' }));
        }

        return isValid;
    };
    const handleSubmit = async () => {
        if (Validation()) {
            try {
                const payload = {
                    email: email,
                    password: password,
                };

                const res = await API.post(ENDPOINTS.LOGIN, payload);
                console.log("Login successful:", res);
                showSuccess('user Logged In successfully!')
                navigate('/Home'); // Replace with your route
            } catch (error) {
                console.error(" Registration error:", error);
                showError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div style={backgroundStyle}>
            <div id="login">
                <h1 className="h1">Sign In</h1>
                <div style={{ height: '10px' }} />
                <Input placeholder="Username" className='Input-box-background' onChange={(e) => {
                    setEmail(e.target.value)
                }} value={email} required={true} />
                {error.emailError && <div style={{ width: '250px' }}>
                    <h4 style={{ color: 'red', fontFamily: 'serif', fontSize: '12px', textAlign: 'left' }}>{error.emailError}</h4></div>}
                <div style={{ height: '12px' }} />
                <Input placeholder="Password" className='Input-box-background' onChange={(e) => {
                    setPassword(e.target.value)
                }} value={password} required={true} type="password" />
                {error.passwordError && <div style={{ width: '250px' }}>
                    <h4 style={{ color: 'red', fontFamily: 'serif', fontSize: '12px', textAlign: 'left' }}>{error.passwordError}</h4></div>}
                <div style={{ height: '5px' }} />
                <div style={{ height: '12px' }} />
                <Button title="Submit" onclick={handleSubmit} />
            </div>
        </div>
    );
};

export default Login;
