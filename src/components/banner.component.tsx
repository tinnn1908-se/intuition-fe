import '../styles/banner.style.scss'
import MyCarousel from './carousel.component'
import { Link } from 'react-router-dom';
import '../styles/banner.style.scss'

const Banner = () => {
  return (
    <div className='banner'>
      <div className='__left'>
        <h1>Summer 22'</h1>
        <p>Summer layer season is here. Check out our trendy new summer collection to stay hot in style.</p>
        <div className='__price'>
          <p>Price</p>
          <h3>$117.99</h3>
        </div>
        <Link to="/productview">Shop Now</Link>
      </div>
      <div className='__right'>
        <MyCarousel />
      </div>
    </div>
  )
}

export default Banner