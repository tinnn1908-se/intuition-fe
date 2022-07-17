export default class ApplicationUtil{
    static generateId() : string{
        var dateObj = new Date();
        var second = dateObj.getSeconds();
        var minute = dateObj.getMinutes();
        var hour = dateObj.getHours();
        var month = dateObj.getMonth() + 1; //months from 1-12
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();
        var returnValue = `${year}${month}${day}${hour}${minute}${second}${dateObj.getMilliseconds()}`;
        return returnValue;
    }
}