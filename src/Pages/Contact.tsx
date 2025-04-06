import { FC } from "react";
import { COLORS } from "../Constants/Colors";
import Card from "../Components/Card";
import { Makeuplist } from "../Constants/staticData";
import { FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "../Css/Home.css";
const Contacts: FC = () => {
    return (
        <div>
            <h1 style={{ color: COLORS.Dark, textAlign: 'center' }}>Product List</h1>
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

                </div>
            </div>
            <div className="line"></div>
            <div style={{ height: '20px' }} />
            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap' }}>
                {Makeuplist.map((item) => (
                    <Card key={item.name} name={item.name} Image={item.image} />
                ))}
            </div>
        </div>
    )
}
export default Contacts;