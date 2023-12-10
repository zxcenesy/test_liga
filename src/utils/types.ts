import {Dispatch, SetStateAction} from "react";


export type TypeSetState<T> = Dispatch<SetStateAction<T>>


export interface IUser {
    photo: string,
    color: string,
    name: string,
    speed: number,
    time: number
}