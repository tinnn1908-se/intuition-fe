import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import '../styles/singleFilter.style.scss'
import { removeFilter } from '../app/slices/filter.slice';
import '../styles/singleFilter.style.scss'
interface Props {
    type: "cate" | "color" | "size" | "price",
    title: string
}
const SingleFilter = ({ title, type }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    console.log(title)
    function onClickHandler(event: React.MouseEvent) {
        switch (type) {
            case "cate":
                dispatch(removeFilter({
                    type : "cate",
                    title
                }));
                break;
            case "color":
                dispatch(removeFilter({
                    type : "color",
                    title
                }));
                break;
            case "size":
                dispatch(removeFilter({
                    type : "size",
                    title
                }));
                break;
            case "price":
                dispatch(removeFilter({
                    type : "price",
                    title
                }));
                break;
            default:
                break;
        }
    }
    return (
        <div className='singleFiler'>
            <div className='__content'>{title}</div>
            <button onClick={onClickHandler} ><CloseIcon /></button>
        </div>
    )
}

export default SingleFilter