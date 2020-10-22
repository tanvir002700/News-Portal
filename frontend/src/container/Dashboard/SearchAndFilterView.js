import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, InputAdornment, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';


const useStyles = makeStyles((theme) => ({
}));

const COUNTRY_OPTIONS = [
  { label: 'USA', value: 'us' },
  { label: 'UA', value: 'ua' }
];
const CATEGORY_OPTIONS = [
  { label: 'Busineess', value: 'business' },
  { label: 'Entertainment', value: 'entertainment' }
];
const SOURCE_OPTIONS = [
  { label: 'ABC News', value: 'ABC News'},
  { label: 'Wired', value: 'Wired'},
];


const SearchAndFilterView = props => {
  const {onClickSearch = () => {}} = props;
  const classes = useStyles();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [country, setCountry] = useState();
  const [category, setCategory] = useState();
  const [source, setSource] = useState();

  const handleOnClickSearch = () => {
    onClickSearch({
      searchKeyword,
      country: country ? country.value : null,
      category: category ? category.value : null,
      source: source ? source.value : null
    });
  };

  const handleOnClickClear = () => {
    setSearchKeyword("");
    setCountry(null);
    setCategory(null);
    setSource(null);
    onClickSearch({});
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="TextField"
                variant="outlined"
                fullWidth
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                value={country}
                options={COUNTRY_OPTIONS}
                onChange={(val, _) => setCountry(val)}
                placeholder="Select Country"
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                value={category}
                options={CATEGORY_OPTIONS}
                onChange={(val, _) => setCategory(val)}
                placeholder="Select Category"
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                value={source}
                options={SOURCE_OPTIONS}
                onChange={(val, _) => setSource(val)}
                placeholder="Select Source"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                data-testid="submit"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleOnClickSearch}
              >
                  Search
              </Button>
              <Button
                data-testid="submit"
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleOnClickClear}
              >
                  Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>



    </React.Fragment>
  );
};

export default SearchAndFilterView;
