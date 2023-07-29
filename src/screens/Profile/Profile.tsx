import { Center, Text, Button, VStack } from "native-base";
import React from "react";
import { ProfileScreenProps } from "./types";
import { screens } from "../../constants";
import { useAuth, useProfile } from "../../hooks";
import { UserHeader } from "../../components";

export function dataCadastro(param: string | undefined) {
  const data = new Date(param ?? "");
  const dia = data.getDate().toString();
  const diaF = dia.length === 1 ? `0${dia}` : dia;
  const mes = (data.getMonth() + 1).toString();
  const mesF = mes.length === 1 ? `0${mes}` : mes;
  const anoF = data.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
}

const Profile = ({ navigation }: ProfileScreenProps) => {
  const { logout } = useAuth();
  const { profile } = useProfile();

  const handleNavigateLogin = async () => {
    await logout();
    navigation.navigate(screens.LOGIN);
  };

  return (
    <>
      <UserHeader />
      <Center
        flex={1}
        flexDirection="column"
        safeArea
        px="10"
        bg="#FFFFFF"
        pb="42px"
      >
        <VStack
          w="100%"
          bg="#28374D"
          borderRadius="20px"
          py="22px"
          px="16px"
          space="12px"
          justifyContent="center"
        >
          <Text color="#FFFFFF" fontSize="32px" fontWeight={700}>
            Perfil
          </Text>
          <Text color="#FFFFFF" fontSize="24px" fontWeight={700}>
            Nome do Usuário
          </Text>
          <Text color="#FFFFFF" fontSize="24px" testID="profile-username">
            {profile?.name ?? "Carregando..."}
          </Text>
          <Text color="#FFFFFF" fontSize="24px" fontWeight={700}>
            Cargo / Nível de acesso
          </Text>
          <Text color="#FFFFFF" fontSize="24px" testID="profile-cargo">
            {profile?.disciplinaOUcargo ?? "Carregando..."} /{" "}
            {profile?.role === "admin" ? "Administrador" : "Usuário comum"}
          </Text>
          <Text color="#FFFFFF" fontSize="24px" fontWeight={700}>
            Ingresso no Sistema
          </Text>
          <Text color="#FFFFFF" fontSize="24px" testID="profile-data-criado">
            {dataCadastro(profile?.createdAt)}
          </Text>
          <Button
            w="full"
            bg="#2486CE"
            _text={{ fontWeight: 700, fontSize: "24px" }}
            onPress={handleNavigateLogin}
            testID="profile-logout-button"
          >
            Sair
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default Profile;
