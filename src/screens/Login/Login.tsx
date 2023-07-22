import {
  Center,
  Text,
  Button,
  HStack,
  VStack,
  FormControl,
  Input,
  Icon,
} from "native-base";
import React, { useState } from "react";
import * as Yup from "yup";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LoginScreenProps, SignInType } from "./types";
import { screens } from "../../constants";
import { useAuth } from "../../hooks";
import { useFormik } from "formik";

const SignInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Insira um email válido!")
      .required("Este campo é obrigatório!"),
    password: Yup.string().required("Este campo é obrigatório!"),
  });

const Login = ({ navigation }: LoginScreenProps) => {
  const { signIn } = useAuth();
  const [visibility, setVisibility] = useState<boolean>(false);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: SignInSchema,
    onSubmit: () => {
      signIn(values);
    },
  });

  const getErrorMsg = (field: keyof typeof values) => {
    return touched[field] ? errors[field] : undefined;
  };

  return (
    <>
      <HStack
        w="100%"
        h="20%"
        justifyContent="center"
        alignItems="center"
        borderBottomRadius="18px"
        bg="#28374D"
        safeArea
      >
        <Icon as={FontAwesome} name="lock" size="12" color="#2486CE" />
        <Text
          fontSize="36px"
          textAlign="center"
          color="#EBE8E1"
          fontWeight={700}
        >
          Slocked
        </Text>
      </HStack>
      <Center flex={1} flexDirection="column" px="10" bg="#FFFFFF">
        <VStack justifyContent="center" w="100%">
          <Center p="14px">
            <FormControl isInvalid={!!getErrorMsg("email")} mb="6">
              <FormControl.Label>Digite seu email:</FormControl.Label>
              <Input
                placeholder="Email"
                borderColor="#2486CE"
                borderRadius="16px"
                h="64px"
                fontSize="16px"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <FormControl.ErrorMessage>
                {getErrorMsg("email")}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl mb="12" isInvalid={!!getErrorMsg("password")}>
              <FormControl.Label>Digite sua senha:</FormControl.Label>
              <Input
                placeholder="Senha"
                type={visibility ? "text" : "password"}
                borderColor="#2486CE"
                borderRadius="16px"
                h="64px"
                fontSize="16px"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                rightElement={
                  <Icon
                    as={MaterialIcons}
                    name={visibility ? "visibility" : "visibility-off"}
                    color="#2486CE"
                    size="24px"
                    mr="16px"
                    onPress={() => setVisibility(!visibility)}
                  />
                }
              />
              <FormControl.ErrorMessage>
                {getErrorMsg("password")}
              </FormControl.ErrorMessage>
            </FormControl>
            <VStack w="full" space="6">
              <Button
                h="64px"
                w="full"
                borderRadius="30px"
                bg="#2486CE"
                _text={{ fontWeight: 700, fontSize: "22px" }}
                onPress={() => handleSubmit()}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </VStack>
          </Center>
        </VStack>
      </Center>
    </>
  );
};

export default Login;
