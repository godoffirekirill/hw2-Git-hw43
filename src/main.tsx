import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {setProducts} from "./firebase/fireBaseDbService.ts";

setProducts().then(()=>{
createRoot(document.getElementById('root')!).render(
    <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>
)})
