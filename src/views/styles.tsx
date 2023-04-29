import { Autocomplete, Button, CardMedia, IconButton } from "@mui/material";
import styled from "styled-components";

export const StyledPizzaSummary = styled.table`
    border-spacing: 6px;
    padding-left: 5px;
    /* & > *': {
      text-align: 'center'
    } */
`

export const StyledAutoComplete = styled(Autocomplete)`
  margin-top: 10px;
  width: 500px;
`