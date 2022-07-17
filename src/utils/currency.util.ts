export default class CurrencyUtil{
    static toVND(price : number){
        var formatter = new Intl.NumberFormat(
            'vi-VN',{
                style : 'currency',
                currency : 'VND'
            }
        )
        return formatter.format(price);
    }
}