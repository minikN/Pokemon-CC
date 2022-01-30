export interface Pokemon {
  id: number;
  name: string;
  moves: Move[];
  abilities: Ability[];
  sprites: SpriteType;
}

export type PokemonListType = {
  count: number;
  results: Pokemon[] | [];
};

export interface Move {
  id: number;
  move: MoveType;
}

type MoveType = {
  name: string;
};

export interface Ability {
  id: number;
  ability: AbilityType;
}

type AbilityType = {
  name: string;
};

type SpriteType = {
  front_default: URL;
  artwork: URL;
};
