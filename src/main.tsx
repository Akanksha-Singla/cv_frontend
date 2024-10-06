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
import Dashboard from "./views/Dashboard.tsx";
import { useGetCVQuery } from "./apis/cvapi.tsx";
import Editor from "./views/Editor.tsx";
import CVCard from "./views/CVCard.tsx";
import CVTemplete from "./views/CVTemplete.tsx";


const childRoutes = [
  {
    path: "/",
    loader:()=>redirect('mycvs') 

  },
  { path: "mycvs", element: <AllCV /> },

  {
    path: "editCV/:_id",
    element: <CVForm/>,
  },
  {
    path: "addCV",
    element: <CVForm/>,
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
  path:"editor",
  element:<Editor/>},

  {
    path:"getCV",
    element:<CVTemplete/>
  }



];
const rootRoutes = [
  {
    path: "/",
    element: <App />,
    children: childRoutes,
  },
];

const cvRouter = createBrowserRouter(rootRoutes);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <RouterProvider router={cvRouter}></RouterProvider>
  </Provider>
);
