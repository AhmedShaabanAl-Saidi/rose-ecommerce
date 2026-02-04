export interface UserModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export interface AuthModel {
  message: string;
  token: string;
  user: UserModel;
}

export interface ProfileModel {
  message: string;
  user: UserModel;
}

export interface MessageModel {
  message: string;
}
export interface StatusModel {
  status: string;
}

export interface PasswordModel {
  message: string;
  token: string;
}
