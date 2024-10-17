import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserDetails, ILoginValues } from '../types/userDetails';
import { ICVDetails } from "../types/cvDetails"
import { IResponse } from '../types/userDetails';

interface ICVIDResponse {
  status: string,
  data: {
    cvId: string
  }
}
// Fetch the token dynamically every time a request is made
export const cvApi = createApi({
  reducerPath: 'cvApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4001/api/',
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCV: builder.mutation<IResponse, Partial<ICVDetails>>({
      query: (cvDetails) => ({
        url: 'cv/addBasicDetails',
        method: 'POST',
        body: cvDetails,
      }),
      transformResponse: (response: IResponse): IResponse => {
        return response;
      },
    }),
    getAllCV: builder.query<IResponse, void>({
      query: () => ({
        url: 'cv/getBasicDetails',
        method: 'GET',
      }),
    }),

    
    
    getCV: builder.query<IResponse, string>({
      query: (id) => ({
        url: `cv/getCv/${id}`,
        method: 'GET',
      }),
      // Lifecycle event to log query information
    
      transformResponse: (response: IResponse) => {
        console.log(response)
        return response; // Return the response to be used in your component
      },
    }),
    
    getUser: builder.query<IResponse, void>({
      query: () => ({
        url: `cv/getUserDetails`,
        method: 'GET',
      }),   
    }),
    updateCV: builder.mutation<IResponse, Partial<ICVDetails>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `cv/update/${_id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    uploadCVImage: builder.mutation<IResponse, Partial<ICVDetails>>({
      query(data) {
        
      const{_id,cvImage} = data

      const formData = new FormData();
      formData.append("cvImage", cvImage);
      console.log("formdata entry")
      formData.forEach((value,key)=>console.log(value,key))

        console.log("inside image fe")
        return {
          url: `cv/uploadImage/${_id}`,
          method: 'PUT',
          body:formData,
        };
      },
    }),

    deleteCV: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `cv/delete/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const { 
  useCreateCVMutation, 
  useLazyGetUserQuery,
  useLazyGetAllCVQuery, 
  useGetCVQuery, 
  useDeleteCVMutation, 
  useUpdateCVMutation,
  useUploadCVImageMutation
} = cvApi;
