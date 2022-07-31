import '../styles/categories.style.scss'
import Category from './category.component'
const Categories = () => {
  const data: Array<string> = [
    "T-Shirt", "Pants", "Jacket"
  ]
  return (
    <div className='categories'>
      <h1>Category</h1>
      <div className='__item' >
        {data.map(category => <Category key={category} title={category} />)}
      </div>
    </div>
  )
}

export default Categories