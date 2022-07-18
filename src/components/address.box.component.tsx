import React from 'react'
import { IAddress } from '../models/address.model'
import '../styles/addrBox.style.scss'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { removeAddress,setSelectingAddress } from '../app/slices/address.slice';
import { openEditAddressPopup } from '../app/slices/popup.slice';
import EditAddressPopup from './popups/editAddress.popup';
const AdddressBox = (address: IAddress) => {
    const dispatch : AppDispatch = useDispatch();
    function onClickHandler(event:React.MouseEvent) {
        var btnId = event.currentTarget.getAttribute('id');
        if(btnId === 'btnEditAddress'){
            dispatch(setSelectingAddress(address.id));
            dispatch(openEditAddressPopup());
        }else if(btnId === 'btnRemoveAddress'){
            dispatch(removeAddress(address));
        }
    }
    return (
        <div className='addrBox' >
            {address.type === 'Home' && <HomeOutlinedIcon/>}
            {address.type === 'Workplace' && <HomeWorkOutlinedIcon/>}
            <div className='__content'>
                <div className='__top' >
                    {
                        address.isDefault ? 
                        (<div className='__default' ><p>Default</p></div> ) :
                        (<div className='__default' style={{
                            'border' : 'none'
                        }} ></div> )
                    }
                    <div className='__icons' >
                        <button id='btnEditAddress' onClick={onClickHandler} ><EditOutlinedIcon/></button>
                        <div className='__line' ></div>
                        <button id='btnRemoveAddress' onClick={onClickHandler}><CloseOutlinedIcon/></button>
                    </div>
                </div>
                <div className='__bottom' >
                    <p>{`Address : `}</p>
                    <p>{`${address.value}`}</p>
                </div>
            </div>
            
        </div>
    )
}

export default AdddressBox