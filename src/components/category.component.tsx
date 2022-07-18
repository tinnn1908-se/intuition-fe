import { FaTshirt } from 'react-icons/fa'
import { GiArmoredPants, GiSleevelessJacket } from 'react-icons/gi'
import '../styles/category.style.scss'

interface Props {
  title: string
}

const Category = ({ title }: Props) => {
  switch (title) {
    case 'Shirt':
      return (
        <button className='category'>
          <FaTshirt />
          <p>{title}</p>

        </button>
      )
    case 'Pant':
      return (
        <button className='category'>
          <GiArmoredPants />
          <p>{title}</p>

        </button>
      )
    case 'Jacket':
      return (
        <button className='category'>
          <GiSleevelessJacket />
          <p>{title}</p>
        </button>
      )
    default: return (
      <div className='category'></div>
    );
  }
}

export default Category