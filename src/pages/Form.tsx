import { Box, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Input, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { index, show } from "../api/api";
import global from "../api/globals";
import { IAuthor, IBook, ICategory, IUser } from "../models/interface";

type FormProps = {
  data: IBook | IAuthor | ICategory | IUser | undefined;
}

const FormBook = ({data}: FormProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [authors, setAuthors] = useState<IAuthor[]>([])
  const [fields, setFields] = useState<IBook>({
    id: 1,
    name: '',
    published_date: '',
    user_borrowed_id: null,
    created_at: '',
    updated_at: '',
    categories: [],
    authors: []
  })
  const [published_date, setPublished_date] = useState<string>('')

  useEffect(() => {
    if(data) {
      const date = new Date((data as IBook).published_date);
      setPublished_date(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`)
      setFields({
        ...(data as IBook)
      })
    }
  }, [data])
  

  useEffect(() => {

    index(`${global.urlApi}/all/categories`).then((response) => {
      setCategories(response.categories)
    });
    index(`${global.urlApi}/all/authors`).then((response) => {
      setAuthors(response.authors)
    });
  }, [])

  const handleSubmit = () => {

  }
  console.log(fields);
  return (
    <form>
      <Box sx={{ maxWidth: '35rem', margin: 'auto' }}>
        <Typography variant="h3">Book</Typography>
        <Typography>Complete the fields</Typography>
        <FormGroup className="field">
          <FormLabel htmlFor="name">Title</FormLabel>
          <TextField defaultValue={fields.name} onChange={e => setFields({...fields, name: e.target.value})} type="text" name="name" id="name" />
        </FormGroup>
        <br/>
        <FormGroup className="field">
          <FormLabel htmlFor="published_date">Published Date</FormLabel>
          <TextField defaultValue={published_date} onChange={e => setFields({...fields, published_date: e.target.value})} type="date" name="published_date" id="published_date" />
        </FormGroup>
        <br/>
        <FormGroup className="field">
          <FormLabel htmlFor="categories_id">Titulo</FormLabel>
            {categories && categories.map ( category => (
              <FormControlLabel
              key={category.id}
              control={
                <Checkbox defaultChecked={fields.categories?.some( cat => cat.id === category.id )} name={category.name} />
              }
              label={category.name}
            />
            ))}
        </FormGroup>
        <br/>
        <FormGroup className="field">
          <FormLabel htmlFor="authors_id">Author</FormLabel>
            {authors && authors.map ( author => (
              <FormControlLabel
              key={author.id}
              control={
                <Checkbox  name={author.name} />
              }
              label={author.name}
            />
            ))}
        </FormGroup>
        <br/>
        <Button onClick={() => handleSubmit()} >Save</Button>
      </Box>
    </form>
  );
};

const Form = () => {
  const [data, setData] = useState<IBook | IAuthor | ICategory | IUser>();
  let { element, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      show(`${global.urlApi}/${element}/${id}`).then((data) => {
        setData(data.showed);
      });
    }
  }, []);
  if (element === "books") return (
    <Container sx={{marginBottom: '3rem'}}>
      <FormBook data={(data as IBook)} />
    </Container>
  )

  return null;
};

export default Form;
