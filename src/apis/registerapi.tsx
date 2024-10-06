import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserDetails ,ILoginValues,ILoginResponse} from '../types/userDetails'; // Assuming IUserDetails contains the structure of the user data

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4001/api/' }),
  endpoints: (builder) => ({
    createUser: builder.mutation<IUserDetails, Partial<IUserDetails>>({
      query: (userData) => ({
        url: 'user/register',
        method: 'POST',
        body: userData,  // Passing the user data as the body for the POST request
      }),
    }),
    
    loginUser: builder.mutation<ILoginResponse, Partial<ILoginValues>>({
        query: (loginValues) => ({
          url: 'user/login',
          method: 'POST',
          body: loginValues,  // Passing the user data as the body for the POST request
        }),
      }),
  }),
});

export const { useCreateUserMutation,useLoginUserMutation } = registrationApi;
