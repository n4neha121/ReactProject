import { FC, useState } from "react";
import "../Css/Home.css";
import { COLORS } from "../Constants/Colors";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
    const navigate = useNavigate();

    const [isHover, setIsHover] = useState<string | null>(null);

    const menuItems = [
        { text: "Forums", navigation: '/Forum' },
        { text: "Start Selling", navigation: '/Selling' },
        { text: "Our Products", navigation: '/Product' },
        { text: "Sign In", navigation: '/Login' }
    ];

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
                                console.log('navigate to ::', item.navigation);
                                navigate(item?.navigation)
                            }}
                        >
                            <p
                                style={{
                                    color: isHover === item.text ? COLORS.Dark : COLORS.InActiveBtn,
                                    fontFamily: "sans-serif",
                                    fontSize: "13.5px",
                                    fontWeight: 'bold'
                                }}
                            >
                                {item.text}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
