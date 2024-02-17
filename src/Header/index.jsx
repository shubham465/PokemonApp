import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import PokemonDialog from './Modal';
import PageSelect from './Page';
import PropTypes from "prop-types"

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '25%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const SearchAppBar = ({changeUrl}) => {

  const [pokemon, setPokemon] = React.useState('')
  const [data, setData] = React.useState(null)
  const searchRef = React.useRef(null)
  const submit = () => {
    async function onSubmit(){
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((res)=> {
              setData(res.data)
              searchRef.current.value=''
            }).catch((error)=> {
              searchRef.current.value=''
              console.log(error)
            })
    }
    onSubmit()
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: 'left', display: { xs: 'none', sm: 'block' } }}
          >
            Pokedex
          </Typography> 

          <PageSelect changeUrl={changeUrl} />
          <Search ref={searchRef} onKeyPress={(e)=> {if(e.charCode === 13) {submit()} }} onChange={(e)=> {setPokemon(e.target.value)}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    <PokemonDialog data={data}/>
    </>
  );
}

SearchAppBar.propTypes = {
  changeUrl: PropTypes.func
}

export default SearchAppBar