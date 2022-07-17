export default class Validator{
    static isValidUsername(username : string){
        var regex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i;
        return regex.test(username);
    }
    static isValidPassword(password:string){
        var regex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return regex.test(password);
    }
    static isValidFullname(fullname:string) {
        var regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i;
        return regex.test(fullname);
    }
    static isValidEmail(email : string){
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    }
    static isValidPhoneNumber(phoneNumber : string){
        var regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        return regex.test(phoneNumber);
    }
    static isValidSelect(code : number){
        return code !== 0 ? true : false;
    }
    static isValidAddress(address : string){
        if(address.length > 0){
            return true;
        }
        return false;
    }
}