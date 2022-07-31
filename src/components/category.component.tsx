import React from 'react'
import { FaTshirt } from 'react-icons/fa'
import { GiArmoredPants, GiSleevelessJacket } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFilter, clearCateFilter } from '../app/slices/filter.slice'
import { AppDispatch, filterSelector } from '../app/store'
import '../styles/category.style.scss'

interface Props {
  title: string
}

const Category = ({ title }: Props) => {

  const dispatch: AppDispatch = useDispatch();
  const filter = useSelector(filterSelector);
  const navigate = useNavigate();
  function onClickHandler(event: React.MouseEvent) {
    var cate = event.currentTarget.getAttribute('id');
    if (cate) {
      dispatch(clearCateFilter());
      dispatch(addFilter({
        type: "cate",
        title: cate
      }))
    }
    navigate('/productview')
  }

  switch (title) {
    case 'T-Shirt':
      return (
        <button className='category' id={title} onClick={onClickHandler}>
          <FaTshirt />
          <p>{title}</p>
        </button>
      )
    case 'Pants':
      return (
        <button className='category' id={title} onClick={onClickHandler} >
          <GiArmoredPants />
          <p>{title}</p>

        </button>
      )
    case 'Jacket':
      return (
        <button className='category' id={title} onClick={onClickHandler} >
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