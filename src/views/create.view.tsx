import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import get from 'lodash/get'

import { Checkbox, Button, FormControl, TextField } from '@mui/material';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { addPizzas, getToppingsList } from '../api/pizza.api';
import { StyledAutoComplete } from './styles';
import { IPizzaForServer } from '../interfaces/pizzaForServer.interface';


function Create() {
  const [toppingList, setToppingList] = useState([])
  const [numOfPizzas, setNumOfPizzas] = useState(1)
  const [pizzaToppingsMap, setPizzaToppingsMap] = useState({})
  const [havePizzasAdded, setHavePizzasAdded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getToppings = async () => {
      const toppings = await getToppingsList()
      if (toppings && toppings.length) {
        setToppingList(toppings)
      }
    }
    getToppings()
  }, [])

  const updatePizzasToppings = (toppings, pizzaIndex) => {
    setPizzaToppingsMap(prevState => ({
      ...prevState,
      [pizzaIndex]: toppings
    }));
  }

  const formmatPizzasForSend = () => {
    const formattedPizzas: IPizzaForServer[] = []
    for (let pizzaIndex = 0; pizzaIndex < numOfPizzas; pizzaIndex++) {
      formattedPizzas.push({
        toppings: pizzaToppingsMap[pizzaIndex] || []
      })
    }

    return formattedPizzas;
  }


  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('')

    const formattedPizzas = formmatPizzasForSend()

    const response = formattedPizzas.length && await addPizzas(formattedPizzas)
    if (!response || response.error) {
      setErrorMessage(get(response, 'message', 'error in saving user'))
    } else {
      setHavePizzasAdded(true)
    }
  }


  return !havePizzasAdded ? (
    <div>
      <FormControl fullWidth>
        <InputLabel id="num-pizza-label">Number of pizzas</InputLabel>
        <Select
          id="num-pizza-select"
          value={numOfPizzas}
          onChange={e => setNumOfPizzas(e.target?.value as number || 0)}>
          {
            [...Array(10)].map((x, i) => {
              return <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            })
          }
        </Select>
        {[...Array(numOfPizzas)].map((x, index) => {
          return <StyledAutoComplete
            multiple
            key={`pizza-toppings-${index}`}
            id={`pizza-toppings-${index}`}
            options={toppingList}
            disableCloseOnSelect
            onChange={(e, values) => updatePizzasToppings(values, index)}
            renderOption={(props, option, { selected }) => (
              <li {...props} >
                <Checkbox
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option as string}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label={`Toppings for Pizza ${index + 1}`} placeholder="Toppings" />
            )}
          />
        })
        }
        <Button onClick={handleSubmit}>Send</Button>
      </FormControl>
    </div>
  ) : (<div >
    {!errorMessage ? (<p>The pizzas have added successfully!</p>) : errorMessage}
    <Link id='main-page-link' to="/">Back to the main page</Link>
  </div >)
}


export default Create;
