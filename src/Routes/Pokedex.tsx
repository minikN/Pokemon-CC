import InfoIcon from '@mui/icons-material/Info';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination,
  TableFooter,
  Paper,
} from '@mui/material';
import React, { ReactElement, useContext, useEffect } from 'react';
import { getPokemon, getPokemonByName } from '../Api/Client';
import { PokemonListType } from '../Api/Types';
import Image from 'mui-image';
import { store } from '../App/AppState';
import { Link } from 'react-router-dom';

const Pokedex = (): ReactElement => {
  const { state, dispatch } = useContext(store);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [pokemonList, setPokemonList] = React.useState<PokemonListType>({ count: 0, results: [] });

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchPokemon = (limit: number, offset: number) => {
    getPokemon(limit, offset).then((pokemonList) => {
      Promise.all(
        pokemonList.results.map((pokemonEntry) => getPokemonByName(pokemonEntry.name))
      ).then((fetchedPokemon) =>
        setPokemonList({ count: pokemonList.count, results: fetchedPokemon })
      );
    });
  };

  useEffect(() => {
    fetchPokemon(rowsPerPage, rowsPerPage * page);
  }, [rowsPerPage, page]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Dokumente">
          <TableHead>
            <TableRow>
              <TableCell width={50}>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align={'right'}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonList.results.map((pokemon) => (
              <TableRow hover key={pokemon.id} style={{ cursor: 'pointer' }}>
                <TableCell component="th" scope="row" width={50}>
                  <Image width={30} src={pokemon.sprites.front_default.href} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </TableCell>
                <TableCell align={'right'}>
                  <Link
                    to={`${pokemon.name}`}
                    onClick={() => {
                      dispatch({ type: 'setCurrentPokemon', pokemon: pokemon });
                    }}
                  >
                    <Tooltip title={'Click for more'}>
                      <IconButton aria-label="copy" size={'small'} color={'primary'}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={pokemonList.count}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Pokemon per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default Pokedex;
