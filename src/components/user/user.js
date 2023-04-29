import React, { useState, useEffect } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {getUsers} from "../../api";
import get from "lodash/get";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  usersTable: {
    borderSpacing: '6px',
    paddingLeft: '5px',
    '& > *': {
      textAlign: 'center'
    }
  }
}));

const User = () => {
  const classes = useStyles();
  const titles = ['First Name', 'Last Name', 'Email', 'Description']

  const [users, setUsers] = useState([])
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const fetchMoreUsers = () => {
    getUsers(users.length).then(response => {
      if (response.error) {
        setErrorMessage(get(response, 'message', 'failed in retrieve users'))
      } else if (response.users.length === 0) {
        setErrorMessage('No more users')
      } else {
        setUsers(prevState => prevState.concat(response.users))
      }
      setIsFetching(false)
    })
  }

  useEffect(() => {
    fetchMoreUsers()
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreUsers();
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  return <div>
    <table className={classes.usersTable}>
      <tbody>
      <tr>{titles.map(title => (<th key={title}>{title}</th>))}</tr>
      {users.map(user => {
        const {firstName, lastName, email, description} = user
        return (<tr>
          <td key={firstName}>{firstName}</td>
          <td key={lastName}>{lastName}</td>
          <td key={email}>{email}</td>
          <td key={description}>{description}</td>
        </tr>)
      })}
      </tbody>
    </table>
    {isFetching && 'Fetching more list items...'}
    <FormLabel error={!!errorMessage}>{errorMessage}</FormLabel>
  </div>
}

export default User;
