import React from "react";
import { Text, HStack, VStack, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useProfile } from "../../hooks";

const UserHeader = () => {
  const { profile } = useProfile();

  return (
    <HStack
      w="100%"
      h="17%"
      bg="#FFFFFF"
      justifyContent="center"
      alignItems="center"
      space="22px"
      safeArea
    >
      <Icon as={FontAwesome} name="user-circle-o" size="12" color="#28374D" />
      <VStack>
        <Text
          fontSize="18px"
          textAlign="center"
          color="#28374D"
          testID="username"
        >
          {profile?.name ?? "Carregando..."}
        </Text>
        {profile?.matricula && (
          <Text
            fontSize="18px"
            textAlign="center"
            color="#28374D"
            testID="matricula"
          >
            {profile?.matricula ?? "Carregando..."}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default UserHeader;
