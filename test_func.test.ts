import {compactArr, multiply, sum, reverseString, isEven, echo, fetchData} from "./src/utils/test_func";

describe("simple testing", ()=> {
    test("sum correct two numbers", () => {
        expect(sum(4, 8)).toBe(12);
        expect(sum(-1, 1)).toBe(0);
    })

    test("compact Arr removed correctly", () => {
        expect(compactArr([1, 0, "hello", "", null, undefined, 42])).toEqual([1, "hello", 42]);
    })

    test("multiply correct", () => {
        expect(multiply(4, 8)).toBe(32);
        expect(multiply(-1, 1)).toBe(-1);
    })

    test("reverse string correctly", () => {
        expect(reverseString("hello")).toBe("olleh");
        expect(reverseString("world")).toBe("dlrow");
    })

    test("is even correct", () => {
        expect(isEven(1)).toBe(false);
        expect(isEven(2)).toBe(true);
    })
})
//=======================async tests===================================

describe("async testing", () => {
    test("echo resolves", async () => {
        await expect(echo("hello")).resolves.toBe("hello");
        await expect(echo(505)).resolves.toBe(505);
    })
    test("echo rejects", async () => {
        await expect(echo(null)).rejects.toThrow("Error");
        await expect(echo("")).rejects.toThrow("Error");
    })

    test("fetch success", async () => {
        global.fetch = jest.fn(()=>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({message:"Success"}),})
        ) as jest.Mock;
    await  expect(fetchData("https://api.example.com")).resolves.toEqual({message:"Success"})
    })

    test("fetch error", async () => {
        global.fetch = jest.fn(()=>
            Promise.resolve({
                ok: false,
            })
        ) as jest.Mock;
        await  expect(fetchData("https://api.example.com")).rejects.toThrow("network res was not ok")
    })
})