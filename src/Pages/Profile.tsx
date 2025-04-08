import { FC, useEffect, useState } from 'react';
import { Icons, Images } from '../Constants';
import Input from '../Components/Input';
import { useNavigate } from 'react-router-dom';
import DateInput from '../Components/DateInput';
import { API, setToken } from '../utils/api';
import ENDPOINTS from '../utils/Endpoints';
import Button from '../Components/Button';
import '../Css/profile.css';
import axios from 'axios';
import '../Css/All.css'
import { COLORS } from '../Constants/Colors';
import { useUser } from '../contexts/UserContext';
import { getToken, saveTokenToStorage } from '../utils/storage';

const Profile: FC = () => {
    const [name, setName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [dobError, setDobError] = useState<string>('');
    const [profileName, setProfileName] = useState<string>('');
    const [profileDob, setProfileDob] = useState<string>('');
    const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
    const { user, setUser } = useUser(); // 👈 use context here
    const navigate = useNavigate();
    const userId = user?._id
    const menuItems = [
        { text: "Home", navigation: '/' },  // Change to lowercase
        { text: "Login", navigation: '/Login' },
        { text: "Register", navigation: '/Register' },
        { text: "Profile", navigation: '/Profile' }
    ];
    useEffect(() => {
        if (userId) {
            getProfileDetails();
        }
    }, [userId])

    const getProfileDetails = async () => {
        try {
            const res = await API.get(ENDPOINTS.GET_PROFILE(userId));
            console.log("✅ Profile retrieved:3", res?.profileData);
            setProfileName(res?.profileData?.name);
            setProfileDob(res?.profileData?.dob);
            alert("Profile retrieved Successfully!");
        } catch (error) {
            console.error("Profile fetch error:", error);
            alert("Failed to fetch profile.");
        }
    };
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
                    userId: user?._id, // You might want to get this from context or localStorage
                    profileData: {
                        name: name,
                        dob: dob,
                    },
                };

                console.log("payload", payload);

                const response = await API.post(ENDPOINTS.CREATE_PROFILE, payload);
                console.log("✅ Profile Created successful:", response);
                alert("Profile Created Successful");
                setIsEditProfile(false);
                getProfileDetails();
                // navigate("/Login");
            } catch (error) {
                console.error("❌ Profile error:", error);
                alert("Profile failed. Please try again.");
            }
        }
    };

    const Logout = () => {
        saveTokenToStorage('');
        setToken('');
        setUser(null);
        navigate('/');
    }

    console.log('profileName', profileName);

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
                    {isEditProfile === false && <div className='shadowCard'>
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <div>
                                <img src={Images.profile} alt="profile" style={{ height: '60px', width: '60px', borderRadius: '45px' }} />
                            </div>
                            <div style={{ width: '5px' }} />
                            <div>
                                {profileName && <p style={{ color: COLORS.Dark, fontFamily: 'sans-serif', fontSize: '14px', fontStyle: 'italic', fontWeight: 'bold' }}>Name: {profileName}</p>
                                }<p style={{ color: COLORS.Dark, fontFamily: 'sans-serif', fontSize: '14px' }}>Username: {user?.username}</p>
                                <p style={{ color: COLORS.Dark, fontFamily: 'sans-serif', fontSize: '14px' }}>Email :{user?.email}</p>
                                {profileDob && <p style={{ color: COLORS.Dark, fontFamily: 'sans-serif', fontSize: '14px' }}>Date of Birth :{profileDob}</p>}
                            </div>
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ backgroundColor: COLORS.Dark, height: '30px', width: '80px', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <p style={{
                                    color: COLORS.Light, fontFamily: 'sans-serif', fontSize: '12px',
                                    fontWeight: 'bold', textAlign: 'center',
                                    padding: 9
                                }} onClick={() => {
                                    Logout();
                                    navigate('/')
                                }}>Logout</p>
                            </div>
                            <div style={{ width: '5px' }} />
                            <div style={{ backgroundColor: COLORS.Dark, height: '30px', width: '80px', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <p style={{
                                    color: COLORS.Light, fontFamily: 'sans-serif', fontSize: '12px',
                                    fontWeight: 'bold', textAlign: 'center',
                                    padding: 8
                                }} onClick={() => {
                                    setIsEditProfile(true);
                                }}>Edit Profile</p>
                            </div>
                        </div>
                    </div>}
                    {isEditProfile === true && <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
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

                        <div style={{ height: '3px' }} />

                        <DateInput
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="Input-box-background"
                            required
                        />
                        {dobError && <p className="error-text">{dobError}</p>}

                        <div style={{ height: '10px' }} />
                        <Button title="Save" onclick={CreateProfile} />
                    </div>}
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
