import '../styles/header.style.scss'
import MyDropdown from './dropdown.component'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { AppDispatch, authSelector } from '../app/store';
import { useDispatch } from 'react-redux';
import { setSearchBoxShown, setMyCartShown, setMyCartHidden, setSearchBoxHidden } from '../app/slices/canvas.slice'
import SearchBox from './searchbox.component';
import MyCart from './cart.component';
import { useSelector } from 'react-redux';
import { logout } from '../app/slices/auth.slice';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = () => {

    const dispatch: AppDispatch = useDispatch();
    const auth = useSelector(authSelector);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const handleSearchShow = () => { dispatch(setSearchBoxShown()) };
    const handleCartShow = () => { dispatch(setMyCartShown()) };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onScroll = () => {
        setOffset(window.pageYOffset)
        handleClose();
    };
    function onNavigateHandler(event:React.MouseEvent) {
        var id = event.currentTarget.getAttribute('id');
        if(id === 'purchasedNav'){
            navigate('/orderhistory')
        }else{
            navigate('/profile')
        }
    }
    useEffect(() => {
        dispatch(setMyCartHidden());
        dispatch(setSearchBoxHidden());
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    function logoutHandler(event: React.MouseEvent) {
        dispatch(logout());
        navigate('/')
    }

    return (
        <div className='header'>
            <div className='__left' >
                <MyDropdown />
                <h2>Intuition.</h2></div>
            <div className='__middle'>
                {(auth.isLoggedIn && auth.user !== null) && (
                    <div className='__content'>
                        <small>Hi,</small>
                        <small>{auth.user.fullname}</small>
                    </div>
                )}
            </div>
            <div className='__right' >
                <button onClick={handleSearchShow} ><SearchOutlinedIcon /></button>
                <button onClick={handleCartShow} ><ShoppingBasketOutlinedIcon /></button>
                {(auth.isLoggedIn && auth.user !== null) ? <div className='__profile' >
                    <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 30, height: 30 }}>{auth.user.fullname.charAt(0)}</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            disableScrollLock={true}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem id='profileNav' onClick={onNavigateHandler}>
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem id='purchasedNav' onClick={onNavigateHandler}>
                                <Avatar /> Purchased List
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={logoutHandler}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                </div> : <Link to="/login">Login</Link>}
            </div>
            <SearchBox />
            <MyCart />
        </div>
    )
}

export default Header