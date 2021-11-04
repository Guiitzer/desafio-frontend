interface Ability2 {
  name: string;
  url: string;
}

interface Ability {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
}

interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Stat2 {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat2;
}

export interface Type2 {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Type2;
}

export interface ApiResponse {
  abilities: Ability[];
  base_experience: number;
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  past_types: any[];
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;

  filter: (arg0: any) => string;
  length: any;
  map: (arg0: any) => JSX.Element;

}
