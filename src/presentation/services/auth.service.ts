import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { UserModel } from "../../data";
import { CustomError } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) {
      throw CustomError.badRequest("User already exists");
    }

    try {
      const user = new UserModel(registerUserDto);
      

      //Encriptar la contraseña
        user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();
      // JWT <- para mantener la autenticación del usuario
      // Enviar un email de confirmación
      const { password, ...rest } = UserEntity.fromObject(user);
      return { user: rest,  token: "ABC" };

      return user;
    } catch (error) {
      throw CustomError.internalServer("Error creating user");
    }
  }
  public async loginUser(loginUserDto: LoginUserDto) {
        
    const user = await UserModel.findOne({email: LoginUserDto.email})

    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
    if(!isMatch){
        throw CustomError.badRequest("Invalid credentials");
    }

    const { password, ...userEntity } = UserEntity.fromObject(user);
    const token = await JwtAdapter.generateToken({id:user?.id });
    if(!token) throw CustomError.internalServer("Error generating token");
    return {
        user: userEntity,
        token: token
  }
}
