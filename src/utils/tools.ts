

export const getRandomNumber=(start:number, end:number) => {
    return Math.trunc(Math.random() * (end - start) + start);
}