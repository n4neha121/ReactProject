import { FC } from 'react';
import '../App.css';
import { COLORS } from '../Constants/Colors';
import '../Css/Card.css';
interface ButtonProps {
    Image?: string;
    name: string;
}
const Card: FC<ButtonProps> = ({ Image, name }) => {
    return (
        <div className='mainCard'>
            <div className='cardBg'>
                <img src={Image} style={{ height: '100px', width: "100px", borderRadius: '50px' }} />
            </div >
            <div style={{height:'25px'}}/>
            <p style={{ color: COLORS.Dark, fontFamily: 'serif', fontSize: '15px', textAlign: 'center' }}>{name}</p>
        </div>
    )
}

export default Card;
