import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ILoginValues } from "../types/userDetails";

export const useAuthGuard =(user:ILoginValues,test_mode:boolean)=>{
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user.email && !test_mode){
            navigate('login')
        }

    },[user?.email])
}