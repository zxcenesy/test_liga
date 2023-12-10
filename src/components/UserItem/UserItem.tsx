import {FC, memo} from 'react';
import {IUser} from "../../utils/types";
import './UserItem.scss';

interface UserItem {
    index: number
    user: IUser,
    isActive: boolean,
    handleChange: (index: number) => void
}

export const UserItem: FC<UserItem> = memo(({user, index, isActive, handleChange}) => {

    const date = new Date(user.time * 1000);
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    return (

        <li className={isActive ? 'user-item active' : 'user-item'} onClick={() => handleChange(index)}>
            <span className='user-item__number'>{index + 1}</span>
            <div className='user-item__image'>
                <div className='user-item__image-wrapper'>
                    <img src={user.photo}/>
                </div>
            </div>
            <div className='user-item__descriptions user-descriptions'>
                <span className='user-descriptions__name' title={user.name}>{user.name}</span>
                <div className='user-descriptions__time'>
                    <span>{minutes}:{seconds}:{milliseconds}</span>
                    <span></span>
                    <span>{user.speed} км/ч</span>
                </div>
                <span className='user-descriptions__color'>любимый цвет: {user.color}</span>
            </div>
        </li>
    );
});

