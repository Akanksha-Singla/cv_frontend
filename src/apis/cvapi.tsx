import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserDetails,ILoginValues } from '../types/userDetails';
import { ICVDetails } from "../types/cvDetails"

interface IResponse{
  status:string,
  data:{
    cvId:string
  }
}
const token = window.localStorage.getItem('access_token')

export const cvApi = createApi({
  reducerPath: 'cvApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4001/api/' }),
  endpoints: (builder) => ({
    createCV: builder.mutation<IResponse, Partial<ICVDetails>>({
      query: (cvDetails) => ({
        url: 'cv/addBasicDetails',
        method: 'POST',
        body: cvDetails,  
        headers: {
          Authorization: `Bearer ${token}`,
          },
      }),
      transformResponse: (response: IResponse): IResponse => {
        // Returning the full response
        return response;
      },
    }),
  getAllCV: builder.query<ICVDetails[],void>({
        query: () => ({
          url: 'cv/getBasicDetails',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            },
         // Passing the user data as the body for the POST request
        }),
      }),
      getCV: builder.query<ICVDetails, string>({
        query: (id) => ({
          url:`cv/getCv/${id}`,
          method:'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            },
    }),
          }),
      updateCV: builder.mutation<ICVDetails, Partial<ICVDetails>>({
       
        query(data) {
          const { _id, ...body } = data
          console.log("update api in fe",_id,data)
          return {
            url: `cv/update/${_id}`,
            method: 'PUT',
            body,
            headers: {
              Authorization: `Bearer ${token}`,
              },
          }
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
        // invalidatesTags: (result, error, { _id }) => [{ type: 'CV', _id }],
      }),
      deleteCV: builder.mutation<{ success: boolean; id: string }, string>({
        query(id) {
          return {
            url: `cv/delete/${id}`,
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              },
          }
        },
         }),
  }),

 
});

export const { useCreateCVMutation,useGetAllCVQuery,useGetCVQuery,useDeleteCVMutation,useUpdateCVMutation} = cvApi;
