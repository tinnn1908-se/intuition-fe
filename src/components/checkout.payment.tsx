import '../styles/checkoutPayment.style.scss'
import { useState } from 'react'
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { setPaymentMethod } from '../app/slices/order.slice';
const CheckoutPayment = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(0);
    const dispatch: AppDispatch = useDispatch();
    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value)
        setSelectedPaymentMethod(Number(event.currentTarget.value))
        if (selectedPaymentMethod === 0 ||
            selectedPaymentMethod === 1 ||
            selectedPaymentMethod === 2 ||
            selectedPaymentMethod === 3)
            dispatch(setPaymentMethod(selectedPaymentMethod))
    }
    return (
        <div className='checkoutPayment'>
            <div className='__yourPayment' >
                <p>Payment Selection</p>
            </div>
            <div className='__content'>
                <div className="__radios">
                    <div className="__singleRadio">
                        <input type="radio" name="group1" id="radio1" checked={selectedPaymentMethod === 0} value={0} onChange={onChangeHandler} />
                        <div className='__line'></div>
                        COD
                    </div>
                    <div className="__singleRadio">
                        <input type="radio" name="group1" id="radio1" checked={selectedPaymentMethod === 1} value={1} onChange={onChangeHandler} />
                        <div className='__line'></div>
                        Internet Banking
                    </div>
                    <div className="__singleRadio">
                        <input type="radio" name="group1" id="radio1" checked={selectedPaymentMethod === 2} value={2} onChange={onChangeHandler} />
                        <div className='__line'></div>
                        Momo
                    </div>
                    <div className="__singleRadio">
                        <input type="radio" name="group1" id="radio1" checked={selectedPaymentMethod === 3} value={3} onChange={onChangeHandler} />
                        <div className='__line'></div>
                        Card
                    </div>
                </div>
                {selectedPaymentMethod === 1 && (<div className='__method'>
                    <div className='__text' >
                        <p>STK : 0123456789</p>
                        <p>Bank : TPBank</p>
                        <p>Owner : Nguyen Ngoc Tin</p>
                    </div>
                </div>)}
                {selectedPaymentMethod === 2 && (<div className='__method'>
                    <p>STK : 0327244190</p>
                    <p>Owner : Nguyen Ngoc Tin</p>
                </div>)}
                {selectedPaymentMethod === 3 && (<div>Card</div>)}
            </div>
        </div>
    )
}

export default CheckoutPayment