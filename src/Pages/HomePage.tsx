import { FC, useState } from "react";
import "../Css/Home.css";
import { COLORS } from "../Constants/Colors";
import { useNavigate } from "react-router-dom";

import ModalComponent from "../Components/Modal";
import { Images } from "../Constants";

const Home: FC = () => {
    const navigate = useNavigate();

    const [isHover, setIsHover] = useState<string | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const menuItems = [
        { text: "Home", navigation: '/' },  // Change to lowercase
        { text: "aboutUs", navigation: '/' },
        { text: "Register", navigation: '/Register' },
        { text: "Profile", navigation: '/Profile' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsOpenModal(false);
        navigate('/');
    }
    return (
        <div>
            <div className="headerbg">
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
            <div style={{ height: '120px' }} />
            <div className="middleContainer">
                <h1 className="middleTxt">Welcome to </h1>
                <p className="intoTxt">Discover a world of curated essentials and timeless style — only at Shoppora, where your shopping experience meets elegance</p>
                <img src={Images.shoppingImg} style={{ height: '180px', width: '180px' }} />
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
            <ModalComponent modalOpen={isOpenModal} handleClose={() => setIsOpenModal(false)} title="Logout" handleLogout={handleLogout} />
        </div>
    );
};

export default Home;
