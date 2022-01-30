import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export const mainListItems = (
  <>
    <ListItemButton component={Link} to={'/'}>
      <ListItemIcon>
        <CatchingPokemonIcon />
      </ListItemIcon>
      <ListItemText primary="Pokédex" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/list'}>
      <ListItemIcon>
        <CatchingPokemonIcon />
      </ListItemIcon>
      <ListItemText primary="My Pokemons" />
    </ListItemButton>
  </>
);
