import {useAppSelector} from "../../app/hooks.ts";
import BreadProductUser from "./BreadProductUser.tsx";

import BreadProductAdmin from "./BreadProductAdmin.tsx";


const Bread = () => {
    const {authUser} = useAppSelector(state => state.auth)
    if (authUser&&authUser.includes("admin")) {
        return <BreadProductAdmin/>
    }
    return <BreadProductUser/>
};

export default Bread;