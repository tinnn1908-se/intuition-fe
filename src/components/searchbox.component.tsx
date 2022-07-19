import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { AppDispatch, canvasSelector } from '../app/store'
import { Offcanvas, ListGroup } from 'react-bootstrap'
import { setSearchBoxHidden } from '../app/slices/canvas.slice';
import '../styles/searchbox.style.scss'
import { IProduct } from '../models/product.model';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import ProductService from '../services/product.service';
import CurrencyUtil from '../utils/currency.util';
const SearchBox = () => {
    const { isSearchBoxShown, isEnableScroll, placement } = useSelector(canvasSelector);
    const dispatch: AppDispatch = useDispatch();
    const handleSearchClose = () => { dispatch(setSearchBoxHidden()) };
    const [products, setProducts] = useState<Array<IProduct>>([]);
    // var products: Array<IProduct> = [
    //     {
    //         no: '1',
    //         name: 'Product',
    //         cate_no: 1,
    //         description: 'description ',
    //         entp_no: 1,
    //         images: [],
    //         insert_date: '23/05/2022',
    //         insert_id: 'ngoctin',
    //         modified_date: '23/05/2022',
    //         modify_id: 'ngoctin',
    //         price: '100.000',
    //         quantity: 10,
    //         sizes: ['S', 'M', 'L', 'XL', 'XXL']
    //     },
    //     {
    //         no: '1',
    //         name: 'Product',
    //         cate_no: 1,
    //         description: 'description ',
    //         entp_no: 1,
    //         images: [],
    //         insert_date: '23/05/2022',
    //         insert_id: 'ngoctin',
    //         modified_date: '23/05/2022',
    //         modify_id: 'ngoctin',
    //         price: '100.000',
    //         quantity: 10,
    //         sizes: ['S', 'M', 'L', 'XL', 'XXL']
    //     },
    //     {
    //         no: '1',
    //         name: 'Product',
    //         cate_no: 1,
    //         description: 'description ',
    //         entp_no: 1,
    //         images: [],
    //         insert_date: '23/05/2022',
    //         insert_id: 'ngoctin',
    //         modified_date: '23/05/2022',
    //         modify_id: 'ngoctin',
    //         price: '100.000',
    //         quantity: 10,
    //         sizes: ['S', 'M', 'L', 'XL', 'XXL']
    //     },
    //     {
    //         no: '1',
    //         name: 'Product',
    //         cate_no: 1,
    //         description: 'description ',
    //         entp_no: 1,
    //         images: [],
    //         insert_date: '23/05/2022',
    //         insert_id: 'ngoctin',
    //         modified_date: '23/05/2022',
    //         modify_id: 'ngoctin',
    //         price: '100.000',
    //         quantity: 10,
    //         sizes: ['S', 'M', 'L', 'XL', 'XXL']
    //     },
    //     {
    //         no: '1',
    //         name: 'Product',
    //         cate_no: 1,
    //         description: 'description ',
    //         entp_no: 1,
    //         images: [],
    //         insert_date: '23/05/2022',
    //         insert_id: 'ngoctin',
    //         modified_date: '23/05/2022',
    //         modify_id: 'ngoctin',
    //         price: '100.000',
    //         quantity: 10,
    //         sizes: ['S', 'M', 'L', 'XL', 'XXL']
    //     }

    // ] 

    async function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        var data: Array<IProduct> = await ProductService.getProductsByLikeName(event.currentTarget.value, 1);
        setProducts(data);
    }

    function onClickHandler(event: React.MouseEvent) {
        dispatch(setSearchBoxHidden());
        window.scrollTo({
            top: 250,
            behavior: 'smooth',
        });
    }

    return (
        <Offcanvas show={isSearchBoxShown} onHide={handleSearchClose} placement='start' scroll={isEnableScroll}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Search Products</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='searchBox' >
                <input type="text" name="" id="searchValue" onChange={onChangeHandler} />
                {/* <input type="text" name="" id="searchValue" /> */}
                <ListGroup>
                    {products.map(product =>
                        <ListGroup.Item key={product.no}>
                            <img src="/images/shirt01.jpg" alt="" />
                            <div className='__content' >
                                <Link onClick={onClickHandler} to={`/ProductDetail/${product.no}`} >{product.name}</Link>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                                <div className='__bottom' >
                                    <small>{CurrencyUtil.toVND(Number(product.price) + (Number(product.price) * 0.2))}</small>
                                    <small>{CurrencyUtil.toVND(Number(product.price))}</small>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    )

}

export default SearchBox