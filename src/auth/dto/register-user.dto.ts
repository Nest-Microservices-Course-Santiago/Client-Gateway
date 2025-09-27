import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class RegisterUserDto {
    
    @IsString()
    name: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsStrongPassword()
    password: string
}