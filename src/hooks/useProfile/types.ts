export interface MyUser {
  uuid?: string;
  id?: string;
  name: string;
  tags: string;
  matricula: string;
  email: string;
  disciplinaOUcargo: string;
  role: string;
  createdAt: string;
}

export interface MyUserSalas {
  uuid?: string;
  id?: string;
  name: string;
  numero: string;
  grupo: string;
  status: string;
  users: MyUser[];
}

export type IUserUpdate = {
  id?: string | undefined;
  name: string | undefined;
  tags: string | undefined;
  matricula: string | undefined;
  disciplinaOUcargo: string | undefined;
  email: string | undefined;
  password: string;
  confPassword: string;
  role: string | undefined;
};
