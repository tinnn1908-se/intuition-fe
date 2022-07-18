import { useState, useEffect } from 'react'
import Header from '../components/header.component'
import '../styles/home.style.scss'
import { IProduct } from '../models/product.model';
import ProductService from '../services/product.service';
import Banner from '../components/banner.component';
import Categories from '../components/categories.component';


const HomeView = () => {

  const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    async function fetchProducts() {
      var response = await ProductService.getNewestProducts();
      setProducts(response);
    }
    fetchProducts();
  }, [])


  return (
    <div className='home'>
      <Header />
      <Banner />
      <Categories/>
      {/*
      
      <Products title={APPLICATION.PRODUCT_TITLE_PRODUCTS} products={products}/>
      <Trend/>
      <Discount/>
      <Footer/> */}
    </div>
  )
}

export default HomeView