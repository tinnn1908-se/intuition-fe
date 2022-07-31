import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageCarousel, { ImageType } from '../components/image.carousel.component';
import '../styles/product.detail.view.style.scss'
import '../styles/image.carousel.style.scss'
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import StarIcon from '@mui/icons-material/Star';
import { Tabs, Tab } from 'react-bootstrap';
import Products from '../components/products.component';
import { setSearchBoxHidden } from '../app/slices/canvas.slice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addToCart } from '../app/slices/cart.slice'
import { initialProduct, IProduct } from '../models/product.model';
import ProductService from '../services/product.service';
import '../styles/color.circle.style.scss'
import { ICartItem } from '../models/cart.model';
import { Modal, Button } from 'react-bootstrap'
import { IColor } from '../models/color.model';
import CurrencyUtil from '../utils/currency.util';
import { APPLICATION } from '../Constants/application.constant';
const ProductDetailView = () => {


    const { productID } = useParams();
    const [key, setKey] = useState('productdetail');
    const [images, setImages] = useState<ImageType[]>();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<IColor>({
        name: 'Select Your Color',
        value: '#fff'
    });
    const [selectedQty, setSelectedQty] = useState<string>('1');
    const [product, setProduct] = useState<IProduct>(initialProduct);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [show, setShow] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<Array<IProduct>>([]);
    
    const handleClose = () => {
        setShow(false);
        setModalMessage('');
    };
    const handleShow = () => setShow(true);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchBoxHidden());
        setImages(
            Array.from(Array(5).keys()).map((id) => ({
                id,
                url: `https://picsum.photos/1000?random=${id}`
            }))
        );
        async function fetchRelatedProducts() {
            var resp = await ProductService.getNewestProducts();
            if(resp) setRelatedProducts(resp);
        }
        fetchRelatedProducts();
    }, []);

    useEffect(() => {
        async function fetchProductByID(productID: string) {
            var data = await ProductService.getProductByID(productID);
            if (data !== null)
                setProduct(data);
        }
        if (productID) {
            fetchProductByID(productID);
        }
    }, [productID])


    function onSizeClickedHandler(event: React.MouseEvent) {
        var size = event.currentTarget.getAttribute('id');
        if (size) setSelectedSize(size);
    }

    function onColorClickedHandler(event: React.MouseEvent) {
        var name = event.currentTarget.getAttribute('id');
        var value = event.currentTarget.getAttribute('itemID');
        if (name && value) setSelectedColor({
            name, value
        });
    }

    function onSelectHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        var quantity = event.currentTarget.value;
        if (quantity)
            setSelectedQty(quantity);
    }

    function onClickHandler(event: React.MouseEvent) {
        var btnId = event.currentTarget.getAttribute('id');
        if (btnId === 'btnAddToCart') {
            // add to cart
            var cartItem: ICartItem = {
                product: product,
                quantity: Number(selectedQty),
                color: selectedColor.value,
                size: selectedSize
            }
            if (cartItem.color === 'Select Your Color') {
                // show pop up that not selected
                setModalMessage('Select Your Color Please !')
                handleShow();
            } else if (cartItem.size === '') {
                setModalMessage('Select Your Size Please !')
                handleShow();
            } else {
                dispatch(addToCart(cartItem));
                setModalMessage('Add to cart successfully !');
                handleShow();
                setSelectedQty('1');
                setSelectedColor({
                    name: 'Select Your Color',
                    value: '#fff'
                });
                setSelectedSize('');
            }
            // show popup added successfully
        } else if (btnId === 'btnAddToFavourite') {
            // if logged in -> add to favourite
            // if not -> show pop up have not logged in
        }
    }

    return (
        <div className='product-detail' >
            <Header />
            <div className='__container'>
                {
                    /** Breadcrumb */
                    /** Content (slider : infor) */
                    /** Related products */
                }
                <div className='__breadcrumb' ></div>
                <div className='__content' >
                    <div className='__slider'>
                        <ImageCarousel images={images} />
                    </div>
                    <div className='__infor' >
                        {/* <h2>Women Supima Cotton V-Neck Short - Sleeve T-Shirt</h2> */}
                        <h2>{product.name}</h2>
                        <div className='__reviews' >
                            <div className='__stars'>
                                {
                                    [...Array(5)].map(star => <StarIcon />)
                                }
                            </div>
                            <Link to="/">reviews</Link>
                        </div>
                        <div className='__prices'>
                            <p>{CurrencyUtil.toVND(Number((product.price)) + ((Number(product.price) * 0.2)))}</p>
                            <p>{CurrencyUtil.toVND(Number(product.price))}</p>
                        </div>
                        <div className='__line' ></div>
                        <div className='__color'>
                            <div className='__text'>
                                <p>Color : </p>
                                <p>{selectedColor.name}</p>
                            </div>
                            <div className='__circles'  >
                                {product.colors.map(color => <div onClick={onColorClickedHandler} key={color.value} id={color.name} itemID={color.value} className='color-circle' style={{ backgroundColor: `${color.value}` }} ></div>)}
                            </div>
                        </div>
                        <div className='__line' ></div>
                        <div className='__sizes'>
                            <div className='__text'>
                                <p>Sizes : </p>
                            </div>
                            <div className='__boxes'>
                                {
                                    product.sizes.map(size => (<p style={{ 'backgroundColor': `${size === selectedSize ? '#edb0ab' : 'transparent'}` }} onClick={onSizeClickedHandler} key={size} id={size}>{size}</p>))
                                }
                            </div>
                        </div>
                        <div className='__line' ></div>
                        <div className='__qty-buttons' >
                            <div className='__qty' >
                                <p>Qty : </p>
                                <select value={selectedQty} name="" id="" onChange={onSelectHandler}>
                                    {/* <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option> */}
                                    {
                                        Array.from(Array(5).keys()).map(number => <option value={number + 1}>{number + 1}</option>)
                                    }
                                </select>
                            </div>
                            <div className='__buttons' >
                                <button id='btnAddToCart' onClick={onClickHandler} >ADD TO CART</button>
                                <button id='btnAddToFavourite' onClick={onClickHandler} >ADD TO FAVOURITE LIST</button>
                            </div>
                        </div>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => {
                                if (k) setKey(k)
                            }}
                            className="mb-2"
                        >
                            <Tab eventKey="productdetail" title="Product Detail">
                                Product Detail
                            </Tab>
                            <Tab eventKey="material" title="Materials & Care">
                                Materials & Care
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className='__related-products' >
                    <Products title={APPLICATION.PRODUCT_TITLE_RELATED_PRODUCTS} products={relatedProducts}/>
                </div>
            </div>
            <Footer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inform</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ProductDetailView