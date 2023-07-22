import {
  AlertDialog,
  Box,
  Button,
  Center,
  FlatList,
  Flex,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DoorsScreenProps, ISalaOpt } from "./types";
import { useProfile, useSalaAuth } from "../../hooks";
import { UserHeader } from "../../components";
import { MyUserSalas } from "../../hooks/useProfile/types";
import { useFocusEffect } from "@react-navigation/native";

const Doors = ({ navigation }: DoorsScreenProps) => {
  const { allUserSalas } = useProfile();
  const { openSala } = useSalaAuth();

  const [salas, setSalas] = useState<MyUserSalas[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadSalas = useCallback(async () => {
    try {
      setIsLoading(true);
      const getSalas = await allUserSalas();
      setSalas(getSalas);
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    loadSalas();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadSalas();
    }, [loadSalas])
  );

  const [salaOpt, setSalaOpt] = useState<ISalaOpt | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclose();

  const cancelRef = React.useRef(null);

  const handleAlterSalaState = async (salaOpt: ISalaOpt | undefined) => {
    if (salaOpt) {
      await openSala({ message: salaOpt.salaNumber });
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: MyUserSalas }) => (
      <Pressable
        w="100%"
        onPress={() => {
          setSalaOpt({ salaNumber: item.numero, status: item.status });
          onOpen();
        }}
      >
        <HStack
          w="100%"
          bg="#28374D"
          borderRadius="12px"
          p="16px"
          alignItems="center"
          justifyContent="space-between"
        >
          <VStack maxW="80%">
            <Text fontWeight={700} fontSize="20px" color="#FFFFFF">
              {item?.name + " / " + item.numero ?? "Carregando..."}
            </Text>
            <HStack alignItems="center" space="12px">
              <Text fontSize="16px" color="#FFFFFF">
                {item?.status.toUpperCase() ?? "Carregando..."}
              </Text>
              <Flex
                w="15px"
                h="15px"
                borderRadius="15px"
                bg={
                  item?.status.toUpperCase() === "ATIVO" ? "#00FF29" : "#FF0000"
                }
              />
            </HStack>
          </VStack>
          <Icon
            as={MaterialCommunityIcons}
            name="door"
            size="12"
            color="#FFFFFF"
          />
        </HStack>
      </Pressable>
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: MyUserSalas, index: number) => index.toString(),
    []
  );

  const ItemSeparatorComponent = useCallback(() => <Box mt="22px" />, []);

  return (
    <>
      <UserHeader />
      <Center flex={1} flexDirection="column" safeArea px="10" bg="#FFFFFF">
        <Text fontSize="24px" color="#28374D" mb="12px">
          Salas que você tem acesso
        </Text>

        <FlatList
          testID="feed-items"
          flex={1}
          data={salas}
          refreshing={isLoading}
          onRefresh={() => loadSalas()}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReachedThreshold={2}
          initialNumToRender={10}
          w="full"
        />
      </Center>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            <Text bold fontSize="16px">
              {salaOpt?.status === "inativo" ? "Abrir" : "Fechar"}
              {" sala " + salaOpt?.salaNumber + "?"}
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              Isto vai alterar o estado da sala para{" "}
              {salaOpt?.status === "inativo" ? "aberta" : "fechada"}
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button
                colorScheme={
                  salaOpt?.status === "inativo" ? "emerald" : "coolGray"
                }
                onPress={() => {
                  handleAlterSalaState(salaOpt);
                  onClose();
                }}
              >
                {salaOpt?.status === "inativo" ? "Abrir Sala" : "Fechar sala"}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default Doors;
