import {FC} from 'react';
import './Loader.scss'

const Loader: FC = ({}) => {
    return (
        <div className='loader'>
            <div className='loader__indicator'>
            </div>
            <p className='loader__text'>Загрузка данных...</p>
        </div>
    );
};

export default Loader;