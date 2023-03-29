import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import FormLabel from '@material-ui/core/FormLabel';
import get from 'lodash/get'

import { isEmailValid } from "../../helpers/utils";
import { createUser, isEmailExists } from "../../helpers/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '35%',
    display: 'grid',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Create() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState('')
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [isUserCreated, setIsUserCreated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function checkEmailValidation(e) {
    if (!isEmailValid(email)) {
      setEmailValidation('email is not in correct format')
    } else {
      const response = await isEmailExists(email)
      if (!response || response.error) {
        setErrorMessage(get(response, 'message', 'error in verifying the email'))
      }
      response.isExists ? setEmailValidation('Email is already exists') : setEmailValidation('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('')
    if (emailValidation) {
      setErrorMessage(emailValidation)
    } else {
      const response = await createUser({ firstName, lastName, email, password, description })
      if (!response || response.error) {
        setErrorMessage(get(response, 'message', 'error in saving user'))
      } else {
        setIsUserCreated(true)
      }
    }
  }

  return !isUserCreated ? (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="first-name" label="First Name" value={firstName} onInput={e => setFirstName(e.target.value)}
        required />
      <TextField id="last-name" label="Last Name" value={lastName} onInput={e => setLastName(e.target.value)}
        required />
      <TextField id="email" label="Email" value={email} error={!!emailValidation}
        onInput={e => setEmail(e.target.value)} helperText={emailValidation}
        onBlur={checkEmailValidation} required />
      <TextField id="password" label="Password" type={'password'} value={password}
        onInput={e => setPassword(e.target.value)} required />
      <TextField id="description" label="Description" value={description}
        onInput={e => setDescription(e.target.value)} required />
      <Button id="submit-user" type="submit">Create</Button>
      <FormLabel error={!!errorMessage}>{errorMessage}</FormLabel>
    </form>
  ) : (<div className={classes.root}>
    <p>The user has created successfully!</p>
    <Link id='main-page-link' to="/">Back to the main page</Link>
  </div>)
}

export default Create;
