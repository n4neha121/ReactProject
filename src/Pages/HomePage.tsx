import { FC, useState } from "react";
import "../Css/Home.css";
import { COLORS } from "../Constants/Colors";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import { Makeuplist } from "../Constants/staticData";
import { FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";
import ModalComponent from "../Components/Modal";
import { FaUserCircle } from "react-icons/fa";



const Home: FC = () => {
    const navigate = useNavigate();

    const [isHover, setIsHover] = useState<string | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const menuItems = [
        { text: "Forums", navigation: '/forum' },  // Change to lowercase
        { text: "Start Selling", navigation: '/selling' },
        { text: "Our Products", navigation: '/product' },
        { text: "Help", navigation: '/help'  }
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
                    <h1 style={{ color: COLORS.Light, fontSize: '20px' }}>OnlineMarket</h1>
                </div>
                <div id="headerList">
                    {menuItems.map((item) => (
                        <button
                            key={item.text}
                            className="button2"
                            onMouseEnter={() => {
                                console.log('Hover Event:', item.text);
                                setIsHover(item.text)
                            }}
                            onMouseLeave={() => setIsHover(null)}
                            onClick={() => {
                                if (item.action) {
                                    item.action();  // Call action function if available (e.g., opening modal)
                                } else {
                                    console.log("Navigate to ::", item.navigation);
                                    navigate(item.navigation);  // Navigate if navigation path exists
                                }
                            }}
                        >
                            <p
                                style={{
                                    color: isHover === item.text ? COLORS.Dark : COLORS.InActiveBtn,
                                    fontFamily: "sans-serif",
                                    fontSize: "13.5px",
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: '10px'
                                }}
                            >
                                {item.text}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                    <p className="headName">NewLyyyy</p>
                    <p className="text">Categories</p>
                    <div />
                    <p className="text">Brands</p>
                    <div />
                    <p className="text">Luxe</p>
                    <div />
                    <p className="text">Fashion</p>
                </div>
                <div style={{ width: '25%' }} />
                <div style={{ width: '60%', display: 'flex' }}>
                    <div style={{ justifyContent: 'space-between', flexDirection: 'row', display: 'flex' }}>
                        <div className="inputBox">
                            <FaSearch style={{ marginTop: '5px', height: '22px', width: '22px' }} />
                            <textarea className="inputBox" placeholder="Search.." style={{
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                color: COLORS.Dark,
                                fontSize: '16px',
                                background: 'transparent',
                            }} />

                        </div>
                        <Button size="sm" className="signupButton" >Search</Button>
                    </div>
                    <div style={{ width: '180px' }} />
                    <div onClick={() => setIsOpenModal(true)} style={{ marginTop: -5 }}>
                        <FaUserCircle style={{ height: '55px', width: '55px' }} />
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div style={{ height: '20px' }} />
            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap' }}>
                {Makeuplist.map((item) => (
                    <Card key={item.name} name={item.name} Image={item.image} />
                ))}
            </div>
            <ModalComponent modalOpen={isOpenModal} handleClose={() => setIsOpenModal(false)} title="Logout" handleLogout={handleLogout} />
        </div>
    );
};

export default Home;
