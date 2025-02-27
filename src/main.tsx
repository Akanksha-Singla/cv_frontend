import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../src/redux/store.ts";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import AllCV from "./views/AllCV.tsx";
import CVForm from "./views/Forms/CVForm.tsx";
import Login from "./views/Login.tsx";
import Registration from "./views/Registration.tsx";

import CVTemplete from "./views/CVTemplete.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const childRoutes = [
  {
    path: "/",
    loader:()=>redirect('mycvs') 

  },
  { path: "mycvs", element: 
   <ProtectedRoute>
    <AllCV />
  </ProtectedRoute>},

  {
    path: "editCV/:_id",
    element: 
   <ProtectedRoute>
      <CVForm/>
   </ProtectedRoute>
    
    
    
  },
  {
    path: "addCV",
   element: 
   <ProtectedRoute>
       <CVForm/>
   </ProtectedRoute>

  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Registration />,
  },


  {
    path:"getCV",
    element:<CVTemplete/>
  }



];
const rootRoutes = [
  {
    path: "/",
    element: <App/>,
    children: childRoutes,
  },
];

const cvRouter = createBrowserRouter(rootRoutes);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <RouterProvider router={cvRouter}></RouterProvider>
  </Provider>
);
