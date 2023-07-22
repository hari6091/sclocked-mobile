import { screens } from "../../constants";
import { RootStackScreenProps } from "../../routes/types";

export type LoginScreenProps = RootStackScreenProps<screens.LOGIN>;

export type SignInType = {
  email: string;
  password: string;
};
