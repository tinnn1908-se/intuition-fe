import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux'
// import AddressService from '../services/address.service';
// import { IWard,IProvice,IDistrict } from '../models/address.model';
import { addressSelector, AppDispatch, popupSelector } from '../app/store'
import AdddressBox from './address.box.component';
import '../styles/checkoutAddress.style.scss'
import NewAddressPopup from '../components/popups/newAddress.popup'
import { openCreateNewAddressPopup } from '../app/slices/popup.slice';
import { useDispatch } from 'react-redux';
import EditAddressPopup from './popups/editAddress.popup';
const CheckoutAddress = () => {

    const { addresses } = useSelector(addressSelector);
    const dispatch: AppDispatch = useDispatch()
    function onClickHandler(event: React.MouseEvent) {
        dispatch(openCreateNewAddressPopup());
    }

    return (
        <div className='checkoutAddress'>
            {/** Addresses */}
            <div className='__yourAddress' >
                <p>Address Selection</p>
            </div>
            <ListGroup>
                {addresses.map(address => (
                    <ListGroupItem key={address.id}>
                        <AdddressBox {...address} />
                    </ListGroupItem>
                ))}
            </ListGroup>
            {/** Button Add */}
            <button onClick={onClickHandler} >+</button>
            <NewAddressPopup />
            <EditAddressPopup />
        </div>
    )
}

export default CheckoutAddress