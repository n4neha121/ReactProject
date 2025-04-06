import { FC, useState } from 'react';
import '../../Css/All.css'
import Input from '../../Components/Input';
import { COLORS } from '../../Constants/Colors';
import Button from '../../Components/Button';
import { Icons } from '../../Constants';
import { API } from '../../utils/api';
import ENDPOINTS from '../../utils/Endpoints';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../Components/toast';

const Register: FC = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState({
        usernameError: '',
        emailError: '',
        passwordError: ''
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const Validation = () => {
        let isValid = true;

        const newErrors = {
            usernameError: '',
            emailError: '',
            passwordError: ''
        };

        // Username Validation
        if (username.trim() === '') {
            newErrors.usernameError = 'Username is required';
            isValid = false;
        } else if (username.length < 3) {
            newErrors.usernameError = 'Username must be at least 3 characters';
            isValid = false;
        }

        // Email Validation
        if (email.trim() === '') {
            newErrors.emailError = 'Email is required';
            isValid = false;
        } else if (!regEx.test(email)) {
            newErrors.emailError = 'Enter a valid email address';
            isValid = false;
        }

        // Password Validation
        if (password.trim() === '') {
            newErrors.passwordError = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.passwordError = 'Password must be at least 6 characters';
            isValid = false;
        }

        setError(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (Validation()) {
            try {
                const payload = {
                    name: username,
                    email: email,
                    password: password,
                };

                const res = await API.post(ENDPOINTS.REGISTER, payload);
                console.log("Registration successful:", res);
                showSuccess('user registered successfully!')
                navigate('/Home'); // Replace with your route
            } catch (error) {
                console.error(" Registration error:", error);
                showError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className='registerBg'>
            <h1 style={{ color: COLORS.Dark, fontSize: '22px', fontWeight: 'bold' }}>Create Account</h1>
            <div style={{ height: "10px" }} />
            <div className='regiserContainer'>
                <Input
                    placeholder="Enter Username"
                    className="Input-box-background"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                    required={true}
                />
                <p style={{ fontSize: '15px', color: 'red', fontStyle: 'normal', fontFamily: 'sans-serif' }}>{error.usernameError}</p>
                <div style={{ height: "10px" }} />
                <Input
                    placeholder="Enter Email"
                    className="Input-box-background"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required={true}
                    icon={<img src={Icons.email} alt="email icon" height={20} />}

                />
                <p style={{ fontSize: '15px', color: 'red', fontStyle: 'normal', fontFamily: 'sans-serif' }}>{error.emailError}</p>
                <div style={{ height: "10px" }} />
                <Input
                    placeholder="Enter Password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="Input-box-background"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required={true}
                    icon={
                        <img
                            src={isPasswordVisible ? Icons.eyeHideIcon : Icons.eyeIcon}
                            alt="toggle visibility"
                            height={20}
                        />
                    }
                    onIconClick={() => setIsPasswordVisible(prev => !prev)}

                />
                <p style={{ fontSize: '15px', color: 'red', fontStyle: 'normal', fontFamily: 'sans-serif' }}>{error.passwordError}</p>
            </div>
            <div style={{ height: "10px" }} />
            <Button title='Submit' onclick={handleSubmit} />
        </div>
    )
}

export default Register;

