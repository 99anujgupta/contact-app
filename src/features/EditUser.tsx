import React, { FC, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Make sure to import useNavigate
import TextField from '../components/TextField';
import Button from '../components/Button';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store';
import { editUser } from './userSlice';


interface User {
  id: string;
  name: string;
  email: string;
}

const EditUser: React.FC = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const users = useSelector((store: RootState) => store.users);
  const navigate = useNavigate();
  const existingUser = users.filter((user: User) => user.id === params.id);
  const { name, email } = existingUser[0];
  const [values, setValues] = useState({
    name,
    email,
  });

  const handleEditUser = () => {
    setValues({ name: '', email: '' });
    dispatch(editUser({
      id: params.id,
      name: values.name,
      email: values.email,
    }));
    navigate('/');
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Name"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'John Doe' }}
      />
      <br />
      <TextField
        label="Email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        inputProps={{ type: 'email', placeholder: 'johndoe@mail.com' }}
      />
      <Button onClick={handleEditUser}>Edit</Button>
    </div>
  );
};

export default EditUser;