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
  useLazyGetAllCVQuery, 
  useGetCVQuery, 
  useDeleteCVMutation, 
  useUpdateCVMutation 
} = cvApi;
