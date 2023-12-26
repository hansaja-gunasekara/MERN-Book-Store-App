import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";

const BookDetail = () => {
  const [inputs, setInputs] = useState({
    name: "",
    author: "",
    description: "",
    price: 0,
    image: "",
  });
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        const data = response.data;
        setInputs(data.book);
        setChecked(data.book.available || false);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/books/${id}`, {
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        image: String(inputs.image),
        available: Boolean(checked),
      });
    } catch (error) {
      console.error("Error updating book:", error);
      throw error; // Propagate the error to the calling function if needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      history("/books");
    } catch (error) {
      // Handle the error if needed
      console.error("Error updating book:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={700}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight="auto"
          marginTop={10}
        >
          <FormLabel>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="name"
          />
          <FormLabel>Author</FormLabel>
          <TextField
            value={inputs.author}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="author"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="description"
          />
          <FormLabel>Price</FormLabel>
          <TextField
            value={inputs.price}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="price"
          />
          <FormLabel>Image</FormLabel>
          <TextField
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label="Available"
          />

          <Button variant="contained" type="submit">
            Update Book
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default BookDetail;
