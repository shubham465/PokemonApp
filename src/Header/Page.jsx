import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PropTypes } from 'prop-types';

export default function PageSelect({changeUrl}) {
  const [page, setPage] = React.useState(20);

  const handleChange = (event) => {
    setPage(event.target.value);
    changeUrl(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 100, paddingRight: 10  }}>
      <FormControl fullWidth>
        <Select
         sx={{height: '37px', backgroundColor:'aliceblue'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={page}
          label="Page"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={50}>Fifty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

PageSelect.propTypes = {
 changeUrl: PropTypes.string 
}