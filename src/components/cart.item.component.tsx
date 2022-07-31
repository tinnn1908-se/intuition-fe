import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap'
import { ICartItem } from '../models/cart.model';
import '../styles/cart.style.scss'
import { addToCart, removeFromCart, updateQuantity } from '../app/slices/cart.slice';
import { AppDispatch } from '../app/store';
import { Modal, Button } from 'react-bootstrap'
import { setMyCartHidden } from '../app/slices/canvas.slice';
import CurrencyUtil from '../utils/currency.util';

const CartItem = (item: ICartItem) => {
    const dispatch: AppDispatch = useDispatch();
    const [currQuantity, setCurrQuantity] = useState<Number>(item.quantity);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function onRemoveItem(event: React.MouseEvent) {
        dispatch(removeFromCart(item))
        handleClose();
    }
    function changeQuantity(type: string, item: ICartItem, quantity: number) {
        switch (type) {
            case 'increment':
                // dispatch(updateQuantity({ type, item, quantity }));
                dispatch(addToCart({ ...item, quantity: 1 }));
                break;
            case 'decrement':
                if (item.quantity === 1) {
                    // dispatch(removeFromCart(item))
                    // show modal  ' Do you want to remove this item '
                    // if yes -> remove
                    // if no -> remain
                    handleShow();
                } else {
                    dispatch(updateQuantity({ type, item, quantity }));
                }
                break;
            default:
                break;
        }
    }
    // function changeQuantityByInput(event: React.ChangeEvent<HTMLInputElement>) {
    //     var inputQuantity = 0;
    //     console.log(Number(event.currentTarget.value))
    //     inputQuantity = Number(event.currentTarget.value);
    //     var diff = Number(item.quantity) - inputQuantity;
    //     if (diff > 0) {
    //         // increment
    //         dispatch(updateQuantity({
    //             type: 'increment',
    //             item: item,
    //             quantity: diff
    //         }));
    //     } else {
    //         // decrement
    //         dispatch(updateQuantity({
    //             type: 'decrement',
    //             item: item,
    //             quantity: diff
    //         }));
    //     }
    // }
    function onNavigateHandler(event: React.MouseEvent<HTMLAnchorElement>) {
        var btnId = event.currentTarget.getAttribute('id');
        if (btnId === 'btnNavigate') {
            // window.scrollBy({
            //     top: 50,
            //     behavior: 'smooth',
            // });
            dispatch(setMyCartHidden());
        }
    }


    return (
        <ListGroup.Item key={item.product.no}>
            <img src="/images/shirt01.jpg" alt="" />
            <div className='__content' >
                <div className='__top' >
                    <Link id='btnNavigate' onClick={onNavigateHandler} to={`/ProductDetail/${item.product.no}`} >{item.product.name}</Link>
                    <button id='btnRemoveFromCart' onClick={handleShow}><CloseIcon /></button>
                </div>
                <div className='__bottom' >
                    <div className='_qty'>
                        <button onClick={() => changeQuantity('increment', item, 1)} ><KeyboardArrowUpIcon /></button>
                        {/* <input type="text" name="" id="qtyVal" onChange={changeQuantityByInput} value={`${item.quantity}`} /> */}
                        <input type="text" name="" id="qtyVal" value={`${item.quantity}`} />
                        <button onClick={() => changeQuantity('decrement', item, 1)}><KeyboardArrowDownIcon /></button>
                    </div>
                    <p className='__size'>{item.size}</p>
                    <div className='__color' style={{
                        'backgroundColor': `${item.color}`
                    }} ></div>
                    <p className='__price' >{CurrencyUtil.toVND(Number(item.product.price) * item.quantity)}</p>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to remove this item ?</Modal.Body>
                <Modal.Footer>
                    <Button id='btnModalRemoveItem' variant="success" onClick={onRemoveItem}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </ListGroup.Item>
    )
}

export default CartItem