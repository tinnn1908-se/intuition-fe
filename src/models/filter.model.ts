export interface IFilter {
    cates : Array<string>,
    colors : Array<string>,
    sizes : Array<string>,
    price : {
        min : number,
        max : number,
    }
}

export const initialFilter : IFilter = {
    cates : [],
    colors : [],
    sizes : [],
    price : {
        min : 0,
        max : 10000000 
    }
}