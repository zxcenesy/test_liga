import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {IUser} from "../../utils/types";
import usersArr from "../../data/users.json";
import {UserItem} from "../UserItem/UserItem";
import Loader from "../../UI/Loader/Loader";


const UserList: FC = ({}) => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);
    const [pageLoad, setPageLoad] = useState<boolean>(false);
    const [active, setActive] = useState<number>(-1);

    const ref = useRef<HTMLOListElement>(null);

    const scrollHandler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }

    function fetchUsers(): Promise<IUser[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(usersArr)
                setPageLoad(true)
            }, 2000);
        });
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    // Я не совсем поняла как по заданию нужно сгенерировать юзеров. Я создала json-ку на 50 юзеров и когда мы подходим к низу экрана
    //грузим тех же 50 юзеров(бесконечно). Как бы имитация порционной подгрузки когда мы запрашиваем не сразу весь список, а через _limit
    //Если надо было сгенерить именно программно, то я бы написала что-то вроде этого:

    // const loadedItems = [Array(1000)].map((item,index)=>
    //     ({
    //         name: "Райан Гослинг",
    //         photo: "./userImage.jpg",
    //         color: "Голубой",
    //         speed: 80,
    //         time: 6627571510417
    //     }));

    //ну и код переделать надо будет троху

    useEffect(() => {
        if (fetching) {
            fetchUsers().then((res) => {
                setUsers([...users, ...res])
            })
            fetchUsers().finally(() => {
                setFetching(false)
            })
        }
    }, [fetching])

    const handleChange = useCallback((index: number) => {
        setActive(index)
    }, [])

    useEffect(() => {
        const clickOutsideElement = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setActive(-1)
            }
        };

        document.addEventListener('click', clickOutsideElement);

        return () => {
            document.removeEventListener('click', clickOutsideElement);
        };
    }, []);

    return (
        <>
            {!pageLoad && <div className='blur'><Loader/></div>}
            <ol className='user-list' ref={ref}>
                {
                    // Я знаю, что индекс использовать не хорошо, но по задаче у нас порядок элементов не
                    // меняется/не удаляются элементы, а чего-то уникального типо id у меня нет.
                    users.map((user, index) =>
                        <UserItem
                            index={index}
                            user={user}
                            key={index}
                            isActive={active === index}
                            handleChange={handleChange}
                        />
                    )};
            </ol>
            {(fetching && pageLoad) && <div className='lazy'><Loader/></div>}
        </>
    );
};

export default UserList;