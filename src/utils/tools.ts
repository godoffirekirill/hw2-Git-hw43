

export const getRandomNumber=(start:number, end:number) => {
    return Math.trunc(Math.random() * (end - start) + start);
}

export const checkImageUri = (path:string) => {
    let imagePath = "";
    if(path)
        imagePath = path.startsWith("http")? path : `/images/${path}`
    return imagePath
}