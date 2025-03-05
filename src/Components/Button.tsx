import { FC } from 'react';
import '../App.css'
interface ButtonProps {
    title: string;
    onclick?: () => void;
}
const Button: FC<ButtonProps> = ({ title = 'text', onclick, }) => {
    return (
        <>
            <button className='button' onClick={onclick} >{title}</button>
        </>
    )
}

export default Button;
