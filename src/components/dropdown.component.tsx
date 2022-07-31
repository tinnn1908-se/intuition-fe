import React, { useState } from 'react'
import '../styles/dropdown.style.scss'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../app/store';

const MyDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const auth = useSelector(authSelector);
    function onClick(event: React.MouseEvent) {
        setIsOpen(!isOpen);
    }

    return (
        <div className='myDropdown'>
            <nav onClick={onClick}>
                <h2>{isOpen ? <CloseIcon /> : <DehazeIcon />}</h2>
                <input id="toggle" type="checkbox" defaultChecked />
                <ul>
                    <li><Link to="/">Home       </Link></li>
                    {!auth.isLoggedIn && <li><Link to="/login">Login</Link></li>}
                    <li><Link to="/productview">Products </Link></li>
                    {auth.isLoggedIn && <li><Link to="/profile">Profile </Link></li> }
                    {auth.isLoggedIn && <li><Link to="/orderhistory">My Order</Link></li> }
                </ul>
            </nav>
        </div>
    )
}

export default MyDropdown