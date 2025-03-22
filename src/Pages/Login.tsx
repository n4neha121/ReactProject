import { FC, useEffect, useState } from "react";
import '../App.css'
import Input from "../Components/Input";
import Button from "../Components/Button";
import '../Css/Login.css'
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userNameError, setUserNameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                Submit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [userName, password]); 
    const Submit = () => {
        let isValid = true;

        if (userName.length < 2) {
            setUserNameError("Please enter a valid user name");
            isValid = false;
        } else {
            setUserNameError("");
        }

        if (password.length < 10) {
            setPasswordError("Please enter a valid 10-digit password");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid) {
            // Proceed with submission logic (e.g., API call)
            console.log("Form submitted", { userName, password });
            navigate('/')
        }
    };
    return (
        <div id="login">
            <h1 className="h1">Sign In</h1>
            <div style={{ height: '10px' }} />
            <Input placeholder="Username" className='Input-box-background' onChange={(e) => {
                setUserName(e.target.value)
            }} value={userName} required={true} />
            {userNameError && <div style={{ width: '380px' }}>
                <h4 style={{ color: 'red', fontFamily: 'serif', fontSize: '12px', textAlign: 'left' }}>{userNameError}</h4></div>}
            <div style={{ height: '5px' }} />
            <Input placeholder="Password" className='Input-box-background' onChange={(e) => {
                setPassword(e.target.value)
            }} value={password} required={true} type="password" />
            {passwordError && <div style={{ width: '380px' }}>
                <h4 style={{ color: 'red', fontFamily: 'serif', fontSize: '12px', textAlign: 'left' }}>{passwordError}</h4></div>}
            <div style={{ height: '5px' }} />

            <Button title="Submit" onclick={Submit} />
        </div>
    );
};

export default Login;
