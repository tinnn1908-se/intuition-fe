import React, { useState } from 'react'
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { authSelector } from '../app/store'
import Footer from '../components/footer.component'
import Header from '../components/header.component'
import '../styles/updateUser.style.scss'
import { IUser } from '../models/user.model'
import Validator from '../utils/validator.util'
import { Button } from 'react-bootstrap'
import { IModal } from '../models/modal.model'
import DatePicker from "react-datepicker";
import UserService from '../services/user.service'
import { AxiosResponse } from 'axios'
const UpdateUserView = () => {
    const auth = useSelector(authSelector);
    const [user, setUser] = useState<IUser | null>(auth.user);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [modal, setModal] = useState<IModal>({
        title: 'Inform',
        href: '',
        isOpen: false,
        message: 'Update Failed !'
    })
    const renderTooltip = (msg: string) => (
        <Tooltip id="button-tooltip">
            {msg}
        </Tooltip>
    );
    async function onInputFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        var inputID = event.currentTarget.getAttribute('id');
        if (user) {
            switch (inputID) {
                case 'update.username':
                    if (!Validator.isValidUsername(user.username)) {
                        setUser({ ...user, username: '' })
                        document.getElementById('update.username')?.focus();
                    }
                    break;
                case 'update.password':
                    var isValid = Validator.isValidPassword(user.password);
                    console.log("isValid : " + isValid)
                    if (!Validator.isValidPassword(user.password) && user.password === 'unchanged') {
                        setUser({ ...user, password: '' })
                        document.getElementById('update.password')?.focus();
                    }

                    break;
                case 'update.fullname':
                    if (!Validator.isValidFullname(user.fullname)) {
                        setUser({ ...user, fullname: '' })
                        document.getElementById('update.fullname')?.focus();
                    }
                    break;
                case 'update.email':
                    if (!Validator.isValidEmail(user.email)) {
                        setUser({ ...user, email: '' })
                        document.getElementById('update.email')?.focus();
                    }
                    break;
                case 'update.phone':
                    console.log('update.phone')
                    if (typeof user.phoneNumber === 'undefined') user.phoneNumber = '';
                    if (!Validator.isValidPhoneNumber(user.phoneNumber)) {
                        setUser({ ...user, phoneNumber: '' })
                        document.getElementById('update.phone')?.focus();
                    }
                    break;
                default: break;
            }
        }
    }
    async function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        var inputID = event.currentTarget.getAttribute('id')?.toString();
        if (user) {
            switch (inputID) {
                case 'update.username':
                    setUser({ ...user, username: event.target.value })
                    break;
                case 'update.password':
                    setUser({ ...user, password: event.target.value })
                    break;
                case 'update.fullname':
                    setUser({ ...user, fullname: event.target.value })
                    break;
                case 'update.email':
                    setUser({ ...user, email: event.target.value })
                    break;
                case 'update.phone':
                    setUser({ ...user, phoneNumber: event.target.value })
                    break;
                case 'update.address':
                    setUser({ ...user, address: event.target.value })
                    break;
                default: break;
            }
        }
    }
    async function onClickHandler(event: React.MouseEvent) {
        var btnId = event.currentTarget.getAttribute('id');
        if (btnId === 'btnUpdate') {
            // call api
            if (user) {
                var updatedUser: IUser | null = await UserService.updateUser(user);
                if (updatedUser) {
                    // set modal udpate success
                    updatedUser.password = "changed";
                    setUser(updatedUser);
                    setStartDate(null);
                    setModal({ ...modal, message: 'Update Successfully !', isOpen: true });
                } else {
                    setModal({ ...modal, message: 'Update Failed !', isOpen: true });
                }
            }
        }
    }
    function handleModalClose() {
        setModal({ ...modal, isOpen: false });
        // set user = new user
    }
    return (
        <div className='updateUser' >
            <Header />
            <h1 style={{
                "marginTop": "100px",
                "textAlign": "center"
            }}>Update User</h1>
            <div className='content'>
                <Form.Group className="mb-3" controlId="update.username">
                    <Form.Label>Username</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("Username is required ! Username must contain dot character ! ")}
                    >
                        <Form.Control value={user ? user.username : ''} type="text" placeholder="Username" onBlur={onInputFocusOut} onChange={onInputChange} />
                    </OverlayTrigger>
                </Form.Group>
                <Form.Group className="mb-3" controlId="update.password">
                    <Form.Label>Password</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("Password is required ! Password must contain at least Uppercase, special character and number !")}
                    >
                        <Form.Control value={'unchanged'} type="password" placeholder="Password" onBlur={onInputFocusOut} onChange={onInputChange} />
                    </OverlayTrigger>
                </Form.Group>
                <Form.Group className="mb-3" controlId="update.fullname">
                    <Form.Label>Fullname</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("Fullname is required ! Fullname must not contain special characters and number ! ")}
                    >
                        <Form.Control value={user ? user.fullname : ''} type="text" placeholder="Fullname" onBlur={onInputFocusOut} onChange={onInputChange} />
                    </OverlayTrigger>
                </Form.Group>
                <Form.Group className="mb-3" controlId="update.email">
                    <Form.Label>Email</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("Email is required ! Email must follow [abcxyz@gmail.com] ")}
                    >
                        <Form.Control value={user ? user.email : ''} type="email" placeholder="Email" onBlur={onInputFocusOut} onChange={onInputChange} />
                    </OverlayTrigger>
                </Form.Group>
                <Form.Group className="mb-3" controlId="register.phone">
                    <Form.Label>Birthday(Optional)</Form.Label>
                    {/* <DatePicker id='datePicker' onChange={(date: Date) => setStartDate(date)} selected={startDate} placeholderText="Your Birthday" /> */}
                    <DatePicker id='datePicker' onChange={(date: Date) => {
                        if (user) setUser({ ...user, birthday: date.toDateString() })
                        setStartDate(date)
                    }} selected={startDate} placeholderText="Your Birthday" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="update.phone">
                    <Form.Label>Phone Number</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("Phone Number must contain only number !")}
                    >
                        <Form.Control value={user ? user.phoneNumber : ''} type="tel" placeholder="Phone Number" onBlur={onInputFocusOut} onChange={onInputChange} />
                    </OverlayTrigger>
                </Form.Group>

            </div>
            <Button id='btnUpdate' variant="primary" type="submit" onClick={onClickHandler}>Update</Button>
            <Modal show={modal.isOpen}
                onHide={handleModalClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleModalClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    )
}

export default UpdateUserView