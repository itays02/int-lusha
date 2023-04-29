import React, { useState, useEffect } from 'react';
import get from "lodash/get";
import { getPizzaStatus } from '../api/pizza.api';
import { StyledPizzaSummary } from './styles';
import { FormLabel } from '@mui/material';

const PizzaSummary = () => {
  const titles = ['Id', 'Toppings', 'Status', 'Time ordered']

  const [pizzas, setPizzas] = useState([])
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const fetchPizzaStatus = () => {
    setIsFetching(true)
    getPizzaStatus().then(response => {
      if (response.error) {
        setErrorMessage(get(response, 'message', 'failed in retrieve users'))
      } else if (!response.data || response.data.length === 0) {
        setErrorMessage('No pizzas!')
      } else {
        setPizzas(response.data)
      }
      setIsFetching(false)
    })
  }

  useEffect(() => {
    fetchPizzaStatus()
  }, []);

  return !errorMessage ? <div>
    {!isFetching ? (
      <StyledPizzaSummary >
        <tbody>
          <tr>{titles.map(title => (<th key={title}>{title}</th>))}</tr>
          {pizzas.map(pizza => {
            const { id, toppings = [], status, createdAt } = pizza
            return (<tr key={id}>
              <td>{id}</td>
              <td>{toppings.join(', ')}</td>
              <td>{status}</td>
              <td>{new Date(createdAt).toLocaleString()}</td>
            </tr>)
          })}
        </tbody>
      </StyledPizzaSummary>
    ) : (<FormLabel >Fetching pizzas...</FormLabel>)}
  </div > :
    <FormLabel error>{errorMessage}</FormLabel>
}

export default PizzaSummary;
