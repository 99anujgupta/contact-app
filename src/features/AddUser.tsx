import React, { FC, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import Button from '../components/Button';
import { addUser } from './userSlice';

const AddUser: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: ''
  });

  const handleAddUser = () => {
    setValues({ name: '', email: '' });
    dispatch(addUser({
      id: uuidv4(), // Using a string UUID as id
      name: values.name,
      email: values.email
    }));
    navigate('/');
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, name: e.target.value });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: e.target.value });
  };

  return (
    <div className='mt-10 max-w-xl mx-auto'>
      <TextField
        label="Name"
        value={values.name}
        onChange={handleNameChange}
        inputProps={{ type: 'text', placeholder: 'Enter your name' }}
      />
      <br />
      <TextField
        label="Email"
        value={values.email}
        onChange={handleEmailChange}
        inputProps={{ type: 'email', placeholder: 'Enter your email id' }}
      />
      <Button onClick={handleAddUser}>Submit</Button>
    </div>
  );
};

export default AddUser;
