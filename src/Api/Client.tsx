import axios, { AxiosError, AxiosResponse } from 'axios';
import { resolve } from 'dns';
import { Ability, Move, Pokemon, PokemonListType } from './Types';

const PokeClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: { 'Content-Type': 'application/json' },
});

export const getPokemonByName = (name: string): Promise<Pokemon> => {
  return new Promise<Pokemon>((resolve, reject) => {
    PokeClient.get<Pokemon>(`pokemon/${name}`)
      .then((r: AxiosResponse) =>
        resolve({
          id: r.data.id,
          name: r.data.name,
          moves: r.data.moves.map((move: Move) => ({
            id: move.id,
            move: { name: move.move.name },
          })),

          abilities: r.data.abilities.map((ability: Ability) => ({
            id: ability.id,
            ability: { name: ability.ability.name },
          })),

          sprites: {
            front_default: new URL(r.data.sprites.front_default),
            artwork: new URL(r.data.sprites.other['official-artwork'].front_default),
          },
        })
      )
      .catch((error: AxiosError<string>) => reject(error));
  });
};

export const getPokemon = (limit: number, offset: number): Promise<PokemonListType> => {
  return new Promise<PokemonListType>((resolve, reject) => {
    PokeClient.get<PokemonListType>(`pokemon/?limit=${limit}&offset=${offset}`)
      .then((r: AxiosResponse<PokemonListType>) =>
        resolve({
          count: r.data.count,
          results: r.data.results.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            sprites: pokemon.sprites,
            moves: pokemon.moves,
            abilities: pokemon.abilities,
          })),
        })
      )
      .catch((error: AxiosError<string>) => reject(error));
  });
};
