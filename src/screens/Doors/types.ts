import { screens } from "../../constants";
import { MainTabScreenProps } from "../../routes/types";

export type DoorsScreenProps = MainTabScreenProps<screens.DOOR>;

export interface ISalaOpt {
  salaNumber: string;
  status: string;
}
