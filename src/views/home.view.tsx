import { useState, useEffect } from 'react'
import Header from '../components/header.component'
import '../styles/home.style.scss'
import { IProduct } from '../models/product.model';
import ProductService from '../services/product.service';
import Banner from '../components/banner.component';
import Categories from '../components/categories.component';
import { APPLICATION } from '../Constants/application.constant';
import Products from '../components/products.component';
import Trend from '../components/trend.component';
import Discount from '../components/discount.component';
import Footer from '../components/footer.component';
import { useSelector } from 'react-redux';
import { AppDispatch, cartSelector } from '../app/store';
import { useDispatch } from 'react-redux';
import { clearCart } from '../app/slices/cart.slice';


const HomeView = () => {

  const [products, setProducts] = useState<Array<IProduct>>([]);
  const cart = useSelector(cartSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      var response = await ProductService.getNewestProducts();
      dispatch(clearCart());
      setProducts(response);
    }
    fetchProducts();
  }, [])


  return (
    <div className='home'>
      <Header />
      <Banner />
      <Categories />
      <Products title={APPLICATION.PRODUCT_TITLE_PRODUCTS} products={products} />
      <Trend />
      <Discount />
      <Footer />
    </div>
  )
}

export default HomeView