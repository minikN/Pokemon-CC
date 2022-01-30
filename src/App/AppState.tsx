import React, { createContext, useReducer } from 'react';
import { Pokemon } from '../Api/Types';

export type Action =
  | { type: 'setLoading'; loading: boolean }
  | { type: 'setCurrentPokemon'; pokemon: Pokemon }
  | { type: 'addPokemonToList'; pokemon: Pokemon }
  | { type: 'setNotification'; notification: NotificationType }
  | { type: 'removePokemonFromList'; id: number };

interface NotificationType {
  level: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

interface InitialStateType {
  isLoading: boolean;
  currentPokemon?: Pokemon;
  notification?: NotificationType;
  pokemonList: Pokemon[];
}
const initialState: InitialStateType = {
  isLoading: false,
  currentPokemon: undefined,
  notification: undefined,
  pokemonList: [],
};

interface ContextType {
  state: InitialStateType;
  dispatch: React.Dispatch<Action>;
}

const store = createContext<ContextType>({ state: initialState, dispatch: () => null });
const { Provider } = store;

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: InitialStateType, action: Action) => {
    switch (action.type) {
      case 'setLoading':
        return {
          ...state,
          isLoading: action.loading,
        };
      case 'setNotification':
        return {
          ...state,
          notification: action.notification,
        };
      case 'setCurrentPokemon':
        return {
          ...state,
          currentPokemon: action.pokemon,
        };
      case 'addPokemonToList':
        return {
          ...state,
          pokemonList: [...state.pokemonList, action.pokemon],
        };
      case 'removePokemonFromList':
        return {
          ...state,
          pokemonList: state.pokemonList.filter((pokemon) => pokemon.id !== action.id),
        };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
