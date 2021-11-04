import { ApiResponse } from "../Pokedex/interface"

export interface PropType{
  pokemon: ApiResponse;
  onClose: () => void;
}