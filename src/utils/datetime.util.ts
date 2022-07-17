export default class DatetimeUtil{
    static getDate(datetime : string, format : string) {
        var date = new Date(datetime),
          month = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2),
          year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
      }
}