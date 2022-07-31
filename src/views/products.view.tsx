import Footer from '../components/footer.component'
import Header from '../components/header.component'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import '../styles/productsView.style.scss'
import { setMyFilterShown } from '../app/slices/canvas.slice'
import { useDispatch } from 'react-redux'
import { AppDispatch, filterSelector, productsSelector } from '../app/store'
import Filter from '../components/filter.component';
import { useSelector } from 'react-redux';
import Products from '../components/products.component';
import { APPLICATION } from '../Constants/application.constant';
import { useEffect, useState } from 'react'
import { IProduct } from '../models/product.model';
import ProductService from '../services/product.service';
import FilterService from '../services/filter.service';
const ProductsView = () => {

    const { products } = useSelector(productsSelector);
    const [currProducts, setCurrProducts] = useState<Array<IProduct>>(products);
    const filter = useSelector(filterSelector);
    const dispatch: AppDispatch = useDispatch();
    function onClickHandler() {
        dispatch(setMyFilterShown());
    }
    useEffect(() => {
        async function fetchData() {
            if (currProducts.length === 0 && FilterService.isEmptyFilter(filter)) {
                var response = await ProductService.getProductsByFilterReq(filter, 1);
                console.log("response : " + response)
                setCurrProducts(response);
            } else if (!FilterService.isEmptyFilter(filter)) {
                var response = await ProductService.getProductsByFilterReq(filter, 1);
                console.log("response : " + response)
                setCurrProducts(response);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        setCurrProducts(products)
    }, [products])



    return (
        <div className='productView'>
            <Header />
            <div className='__title'>
                <h1>Products</h1>
                <button onClick={onClickHandler}><FilterAltOutlinedIcon /></button>
            </div>
            <Products title={APPLICATION.PRODUCT_TITLE_PRODUCTS_FILTER} products={currProducts} />
            <Footer />
            <Filter />
        </div>
    )
}

export default ProductsView