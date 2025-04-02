import {ProductType} from "../../utils/types-bakery-shop.ts";
import React, {FormEvent, useState} from "react";
import {Box, Button, Grid2, TextField} from "@mui/material";

type Props = {
    submitFn: (prod:ProductType) => Promise<string>
}
const AddProductForm:React.FC<Props> = ({submitFn}) => {
    const initialProd:ProductType = {title:"Title", category:"bread", img:"", cost:0, unit:"unit"}
    const [prod, setProd] = useState(initialProd);

    async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const errMessage = await submitFn(prod);
        if (errMessage) {
            //TODO error handling
        }

    }

    function imageHandler(e) {
        setProd({...prod, img: e.target.value})
    }

    function titleHandler(e) {
        setProd({...prod,title: e.target.value})
    }

    return (
        <Box>
            <form onSubmit={onSubmitHandler}>
                <Grid2 container spacing={2}>
                    <Grid2 size={{xs:8}}>
                        <TextField label={"URL image"}
                        required fullWidth
                        onChange={imageHandler}
                        />
                    </Grid2>
                    <Grid2 size={{xs:8}} sx={{
                        height:"20vh"
                    }}>
                        <img src={prod.img} alt="" style={{height:"100%"}}/>
                    </Grid2>
                    <Grid2 size={{xs:8}}>
                        <TextField label={"Product name"}
                                   required fullWidth
                                   onChange={titleHandler}
                        />
                    </Grid2>
                    <Grid2 size={{xs:8}}>
                        <Button variant={"outlined"} type={"submit"}>Submit</Button>
                        <Button variant={"outlined"} type={"reset"}>Reset</Button>
                    </Grid2>
                </Grid2>

            </form>
        </Box>
    );
};

export default AddProductForm;