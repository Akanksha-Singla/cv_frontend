import React from 'react'
import { useGetAllCVQuery ,useDeleteCVMutation} from '../apis/cvapi'
import CVCard from './CVCard';
import { ObjectSchema } from 'yup';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import './allcv.css'
const AllCV = () => {
    const {data:cv,
      isLoading,
      isError,
      isSuccess
    } = useGetAllCVQuery();
    const[deleteCV] = useDeleteCVMutation()

    console.log("data",cv)

    const deleteById=(id:string)=>{
      const ans = window.confirm("Do you really want to delete?")
       if(ans){
        deleteCV(id);
        window.alert("CV deleted successfully?")

       }
    }
  return (
  <>
   {isLoading && <h5>loading...</h5>}
   {isError && <h4>Something went wrong</h4>}
   <div >
  <Button
    to={`/editor`}
    component={Link}
    startIcon={<AddIcon />}
    color='primary'
    variant='contained'
    style={{"position":"relative" , "float":"right" ,"margin":"9px"}}
  >
    Add CV
  </Button>

  <div style={{"position":"relative" ,"display":"flex" ,"margin":"9px","flex-wrap": "wrap"}}>
    {cv && cv.map((cvItem) => (
      <CVCard key={cvItem._id} cv={cvItem} deleteCVById={deleteById} />
    ))}
  </div>
</div>


  
   </>
  )
}

export default AllCV