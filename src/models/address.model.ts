export interface IProvice {
    name: string,
    code: number,
    codename: string,
    phone_code: number
}
export interface IDistrict {
    code: number
    codename: string
    division_type: string
    name: string
    province_code: 22
}
export interface IWard {
    name : string,
    code : number,
    division_type : string,
    codename : string
    district_code : number
}

export interface IAddress {
    id : number,
    type : 'Home' | 'Workplace',
    value : string,
    isDefault : boolean
}
export interface IAddresses {
    addresses : Array<IAddress>,
    selectingAddressID : number 
}
export const initialAddress : IAddress = {
    id : 0,
    type : 'Home',
    value : '',
    isDefault : false
}
export const initialAddresses : IAddresses = {
    addresses : [
        {
            id : 1,
            type : 'Home',
            value : '123,Thành phố Hà Nội,Quận Ba Đình,Phường Giảng Võ',
            isDefault : true
        },
        {
            id : 2,
            type : 'Workplace',
            value : '258/5 KP Lap Thanh,Tỉnh Đồng Nai,Huyện Thống Nhất,Thị trấn Dầu Giây',
            isDefault : false
        },
    ],
    selectingAddressID : 1
}