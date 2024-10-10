import React from 'react'
import { useLazyGetAllCVQuery ,useDeleteCVMutation} from '../apis/cvapi'
import CVCard from './CVCard';
import { ObjectSchema } from 'yup';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import './allcv.css'
import { useEffect ,useState} from 'react';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../redux/authSlice';
import { ICVDetails } from '../types/cvDetails';

const AllCV = () => {
    // const [trigger,result] = useLazyGetAllCVQuery();
     const [trigger,{
      data:cv,
      isLoading,
      isError,
      isSuccess,
   
      
    }] = useLazyGetAllCVQuery()

    const isLogin = useSelector((state:any)=>state.auth.isLogin)

    const[deleteCV] = useDeleteCVMutation()

    console.log("cv?.data",cv?.data)
    const[deleteId ,setDelete] = useState(true)

    const deleteById=(id:string)=>{
      const ans = window.confirm("Do you really want to delete?")
       if(ans){
        deleteCV(id);
        window.alert("CV deleted successfully?")
       }
       setDelete(!deleteId)
    }
    
    useEffect(()=>{
      console.log("on rerender")
      // refetch()
     trigger()
      
    },[])
    
    useEffect(()=>{
     trigger()
    },[deleteId,isLogin])

  return (
  <>
   {isLoading && <h5>loading...</h5>}
   {isError && <h4>Something went wrong</h4>}
   <div >
  <Button
    to={`/addCV`}
    component={Link}
    startIcon={<AddIcon />}
    color='primary'
    variant='contained'
    style={{"position":"relative" , "float":"right" ,"margin":"9px"}}
  >
    Add CV
  </Button>
{ cv?.data && cv?.data.length>0 ? ( <div style={{"position":"relative" ,"display":"flex" ,"margin":"9px","flexWrap":"wrap"}}>
    {cv?.data && cv?.data.map((cvItem:ICVDetails) => (
      <CVCard key={cvItem._id} cv={cvItem} deleteCVById={deleteById} />
    ))}
  </div>):<h2>No CV available add your first cv</h2> 
}

</div>


  
   </>
  )
}

export default AllCV