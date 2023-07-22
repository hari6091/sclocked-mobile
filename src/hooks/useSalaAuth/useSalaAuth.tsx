import { useEffect, useState } from "react";

import api from "../../services/api";
import { Toast } from "native-base";

export interface IOpenSala {
  topic?: string;
  message: string;
}

function useSalaAuth() {
  async function openSala({ message }: IOpenSala) {
    try {
      const req = await api.post("pub", { topic: "locksPing", message });
      return req.data;
    } catch (err) {
      Toast.show({
        title: "Ocorreu um erro ao tentar alterar o estado da sala" + err,
      });
    }
  }

  return {
    openSala,
  };
}

export default useSalaAuth;
