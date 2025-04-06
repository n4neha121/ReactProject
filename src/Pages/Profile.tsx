import { FC, useState } from 'react';
import { Icons, Images } from '../Constants';
import Input from '../Components/Input';
import { useNavigate } from 'react-router-dom';
import DateInput from '../Components/DateInput';
import { showError, showSuccess } from '../Components/toast';
import { API } from '../utils/api';
import ENDPOINTS from '../utils/Endpoints';
import Button from '../Components/Button';
import '../Css/profile.css';

const Profile: FC = () => {
    const [name, setName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [dobError, setDobError] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const navigate = useNavigate();

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
                    name,
                    dob,
                };

                const res = await API.post(ENDPOINTS.REGISTER, payload);
                console.log('Registration successful:', res);
                showSuccess('User registered successfully!');
                navigate('/Home');
            } catch (error) {
                console.error('Registration error:', error);
                showError('Registration failed. Please try again.');
            }
        }
    };

    const getProfileDetails = async () => {
        try {
            const res = await API.post(ENDPOINTS.REGISTER, userId);
            console.log('Registration successful:', res);
            showSuccess('User registered successfully!');
            navigate('/Home');
        } catch (error) {
            console.error('Registration error:', error);
            showError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="profileBg">
            <div className="heading-container">
                {isEdit === true ? <h1 className="heading">Edit  Profile</h1> : <h1 className="heading">Create Profile</h1>}
                <img
                    src={Icons.editIcon}
                    alt="Edit"
                    className="edit-icon"
                    width={20}
                    height={20}
                    onClick={() => setIsEdit(!isEdit)} />
            </div>

            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
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
            </div>
        </div>
    );
};

export default Profile;
