import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { AppDispatch, canvasSelector, cartSelector } from '../app/store'
import { ListGroup, Offcanvas, Button } from 'react-bootstrap'
import { setMyCartHidden } from '../app/slices/canvas.slice';
import '../styles/cart.style.scss'
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cart.item.component'
import React,{useState} from 'react';
import { Modal } from 'react-bootstrap';
import CurrencyUtil from '../utils/currency.util';
const MyCart = () => {
    const { isMyCartShown, isEnableScroll } = useSelector(canvasSelector);
    const dispatch: AppDispatch = useDispatch();
    const handleCartClose = () => { dispatch(setMyCartHidden()) };
    const cart = useSelector(cartSelector)
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);
    function onClickHandler(event:React.MouseEvent) {
        var btnId = event.currentTarget.getAttribute('id');
        if(btnId === 'btnProceed'){
            if(cart.items.length !== 0){
                navigate('/checkout',{
                    replace : false,
                })
            }else{
                //show modal
                handleShow();
            }
        }
    }
    
    
    return (
        <Offcanvas show={isMyCartShown} onHide={handleCartClose} placement='end' scroll={isEnableScroll}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='cart'>
                <div className='__text' >
                    <h5>Total :</h5>
                    <h5>{CurrencyUtil.toVND(cart.total)}</h5>
                </div>
                <Button id='btnProceed' onClick={onClickHandler} variant="success">PROCEED TO CHECKOUT</Button>
                {/* <div className='line'></div> */}
                <ListGroup>
                    {cart.items.map((item,index) => (
                        <CartItem key={index} {...item} />
                    ))}
                </ListGroup>
            </Offcanvas.Body>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inform</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your Cart is empty. Let shopping !</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Offcanvas>
    )

}

export default MyCart