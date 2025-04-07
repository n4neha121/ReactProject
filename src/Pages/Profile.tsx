import { FC, useState } from 'react';
import { Icons, Images } from '../Constants';
import Input from '../Components/Input';
import { useNavigate } from 'react-router-dom';
import DateInput from '../Components/DateInput';
import { API } from '../utils/api';
import ENDPOINTS from '../utils/Endpoints';
import Button from '../Components/Button';
import '../Css/profile.css';
import axios from 'axios';
import '../Css/All.css'
import { COLORS } from '../Constants/Colors';

const Profile: FC = () => {
    const [name, setName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [dobError, setDobError] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { user } = useUser(); // 👈 use context here


    const navigate = useNavigate();
    const menuItems = [
        { text: "Home", navigation: '/' },  // Change to lowercase
        { text: "Login", navigation: '/Login' },
        { text: "Register", navigation: '/Register' },
        { text: "Profile", navigation: '/Profile' }
    ];

    const Validation = () => {
        let isValid = true;
        setNameError('');
        setDobError('');

        if (name.trim() === '') {
            setNameError('Username is required');
            isValid = false;
        } else if (name.length < 3) {
            setNameError('Username must be at least 3 characters');
            isValid = false;
        }

        if (dob.trim() === '') {
            setDobError('DOB is required');
            isValid = false;
        }

        return isValid;
    };

    const CreateProfile = async () => {
        if (Validation()) {
            try {
                const payload = {
                    name: name,
                    dob: dob,
                };
                console.log("payload", payload);

                const response = await axios.post(
                    "http://ec2-13-233-128-152.ap-south-1.compute.amazonaws.com:5000/api/auth/profile/create",
                    payload,

                );
                console.log("✅ Profile Created successful:", response);
                alert("Profile Created Successful");
                navigate("/Login");
            } catch (error) {
                console.error(" Profile error:", error);
                alert("Profile failed. Please try again.");
            }
        }
    };

    // const getProfileDetails = async () => {
    //     try {
    //         const res = await API.post(ENDPOINTS.REGISTER, userId);
    //         console.log('Registration successful:', res);
    //         // showSuccess('User registered successfully!');
    //         navigate('/Home');
    //     } catch (error) {
    //         console.error('Registration error:', error);
    //         // showError('Registration failed. Please try again.');
    //     }
    // };

    return (
        <div>
            <div className='profileHeader'>
                <div id="topic">
                    <div style={{ width: "10px" }} />
                    <img src={Images.WebIcon} style={{ height: '30px', width: "30px" }} />
                    <div style={{ width: "10px" }} />
                    <h1 style={{ color: COLORS.Light, fontSize: '20px', fontStyle: 'italic' }}>Shoppora</h1>
                </div>
                <div id="headerList">
                    {menuItems.map((item) => (
                        <p
                            style={{
                                color: COLORS.Light,
                                fontFamily: "sans-serif",
                                fontSize: "13.5px",
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}
                            onClick={() => {
                                navigate(item.navigation)
                            }}>
                            {item.text}
                        </p>
                    ))}
                </div>
            </div>
            <div className="profileBg">
                <div className='middleContainer'>
                    {/* <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <h1 className="heading">Edit Profile</h1>
                        <img src={Images.profile} alt="profile" style={{ height: '120px', width: '120px' }} />
                        <div style={{ height: '10px' }} />

                        <Input
                            placeholder="Username"
                            className="Input-box-background"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                        {nameError && <p className="error-text">{nameError}</p>}

                        <div style={{ height: '10px' }} />

                        <DateInput
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="Input-box-background"
                            required
                        />
                        {dobError && <p className="error-text">{dobError}</p>}

                        <div style={{ height: '20px' }} />
                        <Button title="Save" onclick={CreateProfile} />
                    </div> */}
                </div>
            </div>
            <div className="bottomBg">
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p className="text" onClick={() => navigate('/aboutUs')}>About Us</p>
                    <div style={{ width: '15px' }} />
                    <p className="text" onClick={() => navigate('/contact')}>Contact</p>
                    <div style={{ width: '15px' }} />
                    <p className="text" onClick={() => navigate('/privacy')}>Privacy Policy</p>
                </div>
                <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#000' }}>2025 Shoppora.All right reserved.</p>
            </div>
        </div>
    );
};

export default Profile;
