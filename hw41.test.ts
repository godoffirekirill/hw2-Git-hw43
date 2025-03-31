
import {addCategory, isCategoryExists, removeCategory} from "./src/firebase/fireBaseDbService";


const categories: string[] = ["bread", "biscuits", "cake", "croissants", "pizza", "pretzels", "sweets", "tart"]

describe("HW41 tests: ", () => {
    test("All categories exist: ", async () => {
    const promiseArr = categories.map(cat =>
        isCategoryExists(cat));
    const resArr = await Promise.all(promiseArr);
    const res = resArr.every(item => item);
        expect(res).toBeTruthy();
    })

    test("remove and add category", async () => {
        const cat = 'bread';
        await removeCategory({cat_name: cat});
        expect(await isCategoryExists(cat)).toBeFalsy();
        await addCategory({cat_name: cat})
        expect(await isCategoryExists(cat)).toBeTruthy()
    })
})
