import { CustomError } from "../errors/custom.error";


export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) {}

    static fromObject( object: {[key:string]:any}){
        const {id,_id, name, email, emailValidated, password, role, img } = object;
        if(!_id && !id){
            throw CustomError.badRequest("Invalid object");
        }

        if(!name){
            throw CustomError.badRequest("Name is required");
        }
        if(!email) throw CustomError.badRequest("Email is required");
        if(!password) throw CustomError.badRequest("Password is required");
        if(emailValidated === undefined) throw CustomError.badRequest("Email validation is required");


        return new UserEntity(_id || id,name,email,emailValidated,password,role,img);
    }
}