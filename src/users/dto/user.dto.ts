export class UserDto {
  readonly username: string;
  readonly password: string;
}

export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
}
