export const sum = (a:number, b:number) =>a+b;

export const compactArr=<T>(arr:T[]) => arr.filter(value =>!!value)

export const multiply=(a:number, b:number) => a * b;

export const pushOneTwo=(arr: string[]):string[]=>{
    arr.push("one", "two");
    return arr;
}

export const reverseString=(str: string):string=>str.split("").reverse().join("");

export const isEven=(a:number) => a%2===0;

//============================async=============================

export const echo= async <T>(data:T): Promise<T>=>
{
    return await new Promise((resolve, reject) => {
       setTimeout(() => {
           if (data) resolve(data);
           else reject(new Error(`Error`));
       }, 200)});
}

export const fetchData = async (url:string):Promise<any> => {
    const res = await fetch(url);
    if (!res.ok) throw Error("network res was not ok");
    return res.json();
}

