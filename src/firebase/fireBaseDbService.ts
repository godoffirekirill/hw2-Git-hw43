import {collection,doc,getDoc,deleteDoc,getCountFromServer, setDoc} from "firebase/firestore"
import productConfig from "../components/configurations/products-config.json"
import {db} from "../components/configurations/firebase-config.ts";
import {Category, ProductType} from "../utils/types-bakery-shop.ts";
import {getRandomNumber} from "../utils/tools.ts";
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore";

const productCollection = collection(db, "products_collection")
const categoryCollection = collection(db, "category_collection")

export const addProduct = async (product:ProductType) => {
product.id = getRandomNumber(10_000, 100_000).toString();
const ref =doc(productCollection, product.id);
await setDoc(ref, product);
}

export const addCategory = async (category: Category) => {
    const ref =doc(categoryCollection, category.cat_name);
    await setDoc(ref, category);
}

export const removeCategory = async (category: Category) => {
    const ref =doc(categoryCollection, category.cat_name);
    await deleteDoc(ref);
}

export const removeProduct = async (id: string):Promise<ProductType> => {
    const ref=doc(productCollection, id);
    const temp = await getDoc(ref);
    await deleteDoc(ref);
    return temp.data() as ProductType;
}

export const getProduct = async (id: string):Promise<ProductType> => {
    const ref = doc(productCollection,id);
    return (await getDoc(ref)).data() as ProductType;
}

export const updateProduct = async (product:ProductType) => {
    const ref =doc(productCollection, product.id);
    await setDoc(ref, product);
}

export const isCategoryExists = async (name: string):Promise<boolean> => {
    const ref =doc(categoryCollection, name);
    return (await getDoc(ref)).exists();
}

export const setProducts = async ():Promise<number> => {
    let count= (await getCountFromServer(productCollection)).data().count;
    if(count === 0){
        const products = productConfig.map(
            item => ({
                title: item.name,
                unit: item.unit,
                cost: item.cost,
                img:item.name+".jpg",
                category: item.name.split("-")[0],
            })
        );
        for (let i = 0; i < products.length; i++) {
            const tempCat = await isCategoryExists(products[i].category);
            if(!tempCat){
                await addCategory({cat_name: products[i].category});
            }
            await addProduct(products[i]);
            count++;
        }
    }
    return count;
}

export const getProducts= (): Observable<ProductType[]>=>{
    return collectionData(productCollection) as Observable<ProductType[]>
}