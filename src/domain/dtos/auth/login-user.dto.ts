

import { regularExps } from "../../../config";




export class LoginUserDto {
    private constructor(
        public email: string,
        public password: string,
        
    ) {}

    static create(object: {[key:string]:any}):[string?, LoginUserDto?]{
        const {email, password,  } = object;
        if(!regularExps.email.test(email)) return ["Email is not valid"];
        if(!password) return ["Password is required"];
        if(password.length < 6) return ["Password must be at least 6 characters long"];


        return [undefined, new LoginUserDto( email, password)];
        
    }
}