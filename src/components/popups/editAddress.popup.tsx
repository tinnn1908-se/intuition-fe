import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { closeEditAddressPopup } from '../../app/slices/popup.slice'
import { addressSelector, AppDispatch, popupSelector } from '../../app/store'
import { updateAddress } from '../../app/slices/address.slice'
const EditAddressPopup = () => {
    const { isEditAddressShown } = useSelector(popupSelector)
    const dispatch: AppDispatch = useDispatch()
    const { selectingAddressID } = useSelector(addressSelector)
    useEffect(() => {
        dispatch(closeEditAddressPopup());
    }, [])
    function onClickHandler(event: React.MouseEvent) {
        var btnId = event.currentTarget.getAttribute('id');
        if (btnId === 'btnConfirmSetDefault') {
            // call to update 
            if (selectingAddressID)
                dispatch(updateAddress({
                    id: Number(selectingAddressID),
                    newIsDefault: true
                }))
            dispatch(closeEditAddressPopup());
        } else if (btnId === 'btnCloseEditAddressPopup') {
            // close popup
            dispatch(closeEditAddressPopup());
        }
    }
    return (
        <Modal
            show={isEditAddressShown}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Edit Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to use this as default address ?
            </Modal.Body>
            <Modal.Footer>
                <Button id='btnCloseEditAddressPopup' variant="danger" onClick={onClickHandler}>
                    No
                </Button>
                <Button id='btnConfirmSetDefault' variant="success" onClick={onClickHandler}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditAddressPopup