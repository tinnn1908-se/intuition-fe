import React, { useState } from 'react'
import '../styles/dropdown.style.scss'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';

const MyDropdown = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false);

    function onClick(event:React.MouseEvent) {
        setIsOpen(!isOpen);
    }

    return (
        <div className='myDropdown'>
            <nav onClick={onClick}>
                <h2>{isOpen ? <CloseIcon/> : <DehazeIcon/>}</h2>
                <input id="toggle" type="checkbox" defaultChecked />
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Collection</a></li>
                    <li><a href="#">My Account</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default MyDropdown