import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.jsx";
import GameDetails from "./components/GameDetails.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/",
                element: <App/>
            },
            {
                path: "/games/:id",
                element: <GameDetails/>
            },
            {},
        ],
    }
]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
