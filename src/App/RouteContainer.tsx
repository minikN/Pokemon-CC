import { Home } from '@mui/icons-material';
import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Pokedex from '../Routes/Pokedex';
import Pokemon from '../Routes/Pokemon';
import PokemonList from '../Routes/PokemonList';
import App from './App';

const RouteContainer = (): ReactElement => {
  return (
    <>
      <Routes>
        <Route path="/:pokemonName" element={<Pokemon />}></Route>
        <Route path="/list" element={<PokemonList />}></Route>

        <Route path="/" element={<Pokedex />}></Route>
      </Routes>
    </>
  );
};

export default RouteContainer;
