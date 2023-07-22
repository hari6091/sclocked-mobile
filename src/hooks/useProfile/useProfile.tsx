import { useEffect, useState } from "react";

import api from "../../services/api";
import { IUserUpdate, MyUser, MyUserSalas } from "./types";

function useProfile() {
  const [profile, setProfile] = useState<MyUser>();
  async function getUSer() {
    await api.get("me").then((response) => {
      setProfile(response.data);
    });
  }

  async function getSingleUser(id: string | undefined): Promise<MyUser> {
    const request = await api.get(`users/${id}`);
    return request.data;
  }

  async function getUserSalas(id: string | undefined): Promise<MyUserSalas[]> {
    const request = await api.get(`salas/user/${id}`);
    return request.data;
  }

  async function deleteUser(id: string | undefined) {
    const request = await api.delete(`users/${id}`);
    return request.data;
  }

  async function deleteUserSala(
    salaId: string | undefined,
    userId: string | undefined
  ) {
    const request = await api.delete(`usersala/${userId}`, {
      data: { salaId },
    });
    return request.data;
  }

  const [salas, setSalas] = useState<MyUserSalas[]>();
  async function userSalas() {
    await api.get("salas").then((response) => {
      setSalas(response.data);
    });
  }

  async function allUserSalas() {
    try {
      const request = await api.get("salas");
      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao listar as salas. " + e);
    }
  }

  async function addUserSala(
    salaId: string | undefined,
    userId: string | undefined
  ) {
    try {
      const request = await api.post("/salauser", {
        salaId,
        userId,
      });

      return request.data;
    } catch {
      return null;
    }
  }

  async function addUserSalaGroup(
    grupo: string | undefined,
    userId: string | undefined
  ) {
    try {
      const request = await api.post("/salauser/group", {
        grupo,
        userId,
      });

      return request.data;
    } catch {
      return null;
    }
  }

  const updateUser = async ({
    id,
    name,
    tags,
    matricula,
    disciplinaOUcargo,
    email,
    password,
    confPassword,
    role,
  }: IUserUpdate) => {
    try {
      const request = await api.patch(`/users/${id}`, {
        name,
        tags,
        matricula,
        disciplinaOUcargo,
        email,
        password,
        confPassword,
        role,
      });

      return request.data;
    } catch {
      return new Error("Algo deu errado ao editar o usuário");
    }
  };

  useEffect(() => {
    getUSer();
    userSalas();
  }, []);

  return {
    profile,
    salas,
    getSingleUser,
    deleteUser,
    allUserSalas,
    getUserSalas,
    deleteUserSala,
    addUserSala,
    addUserSalaGroup,
    updateUser,
  };
}

export default useProfile;
