export function formatedDate(date:string){
    return new Date(date).toLocaleDateString();
}

export function paramDate(date:Date){
    const fullDate = date.toISOString().split("T");
    return fullDate[0];    
}