import { FC, useState } from "react";
import "../Css/Home.css"
import { COLORS } from "../Constants/Colors";

const Home: FC = () => {
    const [isHover, setIsHover] = useState(false);

    const menuItems = [{
        text: 'Forums',
    },
    { text: 'Start Selling' }, {
        text: 'Our Products'
    }, {
        text: 'Sign In'
    }]
    return (
        <div>
            <div className="headerbg">
                <div id="topic">
                    <span color={{color: COLORS.Light}}>OnlineMarket</span>
                </div>
                <div id="headerList">
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            className="button2"
                            onMouseEnter={() => setIsHover(item)}
                            onMouseLeave={() => setIsHover(null)}
                        >
                            <span
                                style={{
                                    color: isHover === item ? COLORS.Light : COLORS.InActiveBtn,
                                    fontFamily: "sans-serif",
                                    fontSize: "15px",
                                }}
                            >
                                {item}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Home;