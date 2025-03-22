import { FC } from 'react';
import '../App.css'
import { COLORS } from '../Constants/Colors';
import '../Css/Card.css'
interface ButtonProps {
    Image?: string;
    name: string;
}
const ProductCard: FC<ButtonProps> = ({ Image, name }) => {
    return (
        <div className='container'>
            <div className='productContainer'>
                <img src={Image} style={{ height: '100px', width: "100px", borderRadius: '10px', borderWidth: 1 }} />
            </div>
            <p style={{ color: COLORS.Dark, fontFamily: 'serif', fontSize: '15px', textAlign: 'center' }}>{name}</p>
        </div>
    )
}

export default ProductCard;
