import React, { useState } from 'react'
import { Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, authSelector } from '../app/store';
import { ISignin } from '../models/signin.model';
import AuthService from '../services/auth.service';
import '../styles/register.style.scss'
import { setCurrentUser } from '../app/slices/user.slice';
import { useSelector } from 'react-redux';
import { saveInfor } from '../app/slices/auth.slice';
import { Modal } from 'react-bootstrap';

const LoginView = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { user, tokens, isLoggedIn } = useSelector(authSelector);
    const [singin, setSignin] = useState<ISignin>({
        username: '',
        password: ''
    })

    const [show, setShow] = useState(false);
    const handleModalClose = () => {
        setShow(false);
    };
    const handleModalShow = () => setShow(true);

    const renderTooltip = (msg: string) => (
        <Tooltip id="button-tooltip">{msg}</Tooltip>
    );

    async function onClickHandler(event: React.MouseEvent) {
        event.preventDefault();
        var tokens = await AuthService.authenticate(singin);
        var user = null;
        if (tokens) {
            user = await AuthService.authorize(tokens);
            if (user) {
                dispatch(saveInfor({ tokens, user, isLoggedIn: true }))
                navigate('/');
            } else {
                // display login failed
                handleModalShow();
            }
        } else {
            // display login failed
            handleModalShow();
        }
    }

    async function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        var inputID = event.currentTarget.getAttribute('id');
        if (inputID === 'login.username') {
            setSignin({ ...singin, username: event.target.value })
        } else if (inputID === 'login.password') {
            setSignin({ ...singin, password: event.target.value })
        }
    }

    async function onInputFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        var inputID = event.currentTarget.getAttribute('id');
    }

    return (
        <div className='register' >
            <Form>
                <div className='__header'>
                    <div className='__line'></div>
                    <h1>Login</h1>
                    <div className='__line'></div>
                </div>
                <small>You do not have an account. <Link to='/register'>Sign up here</Link> !</small>
                <Form.Group className="mb-3" controlId="login.username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={onInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="login.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={onInputChange} required />
                </Form.Group>
                <Button id='loginBtn' variant="primary" type="submit" onClick={onClickHandler}>Sign In</Button>
            </Form>
            <Modal show={show} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inform</Modal.Title>
                </Modal.Header>
                <Modal.Body>Login Failed !</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleModalClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default LoginView