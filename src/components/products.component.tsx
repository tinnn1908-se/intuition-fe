import React, { useState, useEffect } from 'react'
import '../styles/products.style.scss'
import { Row, Col, Card, Button } from 'react-bootstrap'
import ProductCard from '../components/productCard.component'
import { IProduct } from '../models/product.model'
import { Link, useNavigate } from 'react-router-dom'
import ProductService from '../services/product.service'
import { APPLICATION } from '../Constants/application.constant'
interface Props {
    title: string,
    products: Array<IProduct>
}
const Products = (params: Props) => {

    const navigate = useNavigate();

    function onClickHandler(event: React.MouseEvent) {
        navigate('/productview');
    }

    return (
        <div className='products'>
            {(params.title !== APPLICATION.PRODUCT_TITLE_PRODUCTS_FILTER) && <h1>{params.title}</h1>}
            <Row xs={1} md={3} className="g-4">
                {
                    params.products.map(product => (
                        <Col><ProductCard key={product.no} {...product} /></Col>
                    ))
                }
            </Row>
            {(params.title === APPLICATION.PRODUCT_TITLE_PRODUCTS) && <button className="custom-btn btn-15" onClick={onClickHandler} >See More</button>}
        </div>
    )
}

export default Products