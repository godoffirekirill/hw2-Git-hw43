import {useAppSelector} from "../../app/hooks.ts";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid2, Typography} from "@mui/material";
import {addProductUnitToCart, removeProductUnitFromCart} from "../../firebase/firebaseCartService.ts";
import {useNavigate} from "react-router-dom";
import {checkImageUri} from "../../utils/tools.ts";


const BreadProductUser = () => {
    const {products} = useAppSelector(state => state.currProduct)
    const {authUser} = useAppSelector(state => state.auth)
    const {cartProducts} = useAppSelector(state => state.cart)
    const navigate = useNavigate();

    function getProdCount(id:string) {
            const prod = cartProducts.find(item => item.cartProdId === id)
        return prod? prod.count : 0;
    }
    const counts:number[] = products.map(prod => getProdCount(prod.id!))

    return (
        <Grid2 container spacing={2}>
            {products.map((item, index) =>
            <Grid2 key={index} size={{xs: 12, sm: 5, md: 3}}>
                <Card sx={{
                    height:"100%",
                    display:'flex',
                    flexDirection:'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image= {checkImageUri(item.img)}
                    />
                    <CardContent>
                        <Typography>{item.title}</Typography>
                        <Typography>Units: {item.unit}</Typography>
                        <Typography>Price: {item.cost}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant={'outlined'}
                        onClick={async () => {
                            if(!authUser) navigate('/login');
                        await addProductUnitToCart(`${authUser}_collection`, item.id!)
                        }}
                        >+</Button>
                        <Box> {counts[index]} </Box>
                        <Button variant={'outlined'}
                                disabled={counts[index]==0}
                                onClick={async () => {
                                    if(!authUser) navigate('/login');
                                    await removeProductUnitFromCart(`${authUser}_collection`, item.id!)
                                }}
                        >-</Button>
                    </CardActions>
                </Card>
            </Grid2>
            )}
        </Grid2>
    );
};

export default BreadProductUser;