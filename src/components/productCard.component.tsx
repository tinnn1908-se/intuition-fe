import React from 'react'
import { IProduct } from '../models/product.model';
import '../styles/product.card.style.scss'
import { Link } from 'react-router-dom';
import CurrencyUtil from '../utils/currency.util';

const ProductCard = (product: IProduct) => {
    function onClickHandler(event: React.MouseEvent) {
        window.scrollTo({
            top: 250,
            behavior: 'smooth',
        });
    }

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className="container page-wrapper">
            <div className="page-inner">
                <div className="row">
                    <div className="el-wrapper">
                        <div className="box-up">
                            {/* <img className="img" src={product.images[0]} alt="image" /> */}
                            <img className="img" src="/images/shirt01.jpg" alt="image" />
                            <div className="img-info">
                                <div className="info-inner">
                                    <span className="p-name">{product.name}</span>
                                    {/* <span className="p-company">Yeezy</span> */}
                                </div>
                                <div className="a-size">{"Available sizes : "}
                                    {sizes.map(size => <span key={size} className="size">{` ${size}`}</span>)}
                                </div>
                                {/* <div className="a-buttons"> 
                                <button id='addToCartBtn' onClick={onClickHandler} ><AddShoppingCartIcon/></button>
                                </div> */}
                            </div>
                        </div>
                        <div className="box-down">
                            <div className="h-bg">
                                <div className="h-bg-inner" />
                            </div>
                            <Link className="cart" onClick={onClickHandler} to={`/ProductDetail/${product.no}`}>
                                <span className="price">{CurrencyUtil.toVND(Number(product.price))}</span>
                                <span className="add-to-cart">
                                    <span className='txt'>Detail</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard