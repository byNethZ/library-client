import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { show } from "../api/api";
import global from "../api/globals";
import { IAuthor, IBook, ICategory, IUser } from "../models/interface";

const Details = () => {
  const [data, setData] = useState<IBook | IAuthor | ICategory | IUser>();
  let { element, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    show(`${global.urlApi}/${element}/${id}`).then((data) => {
      setData(data.showed);
    });
  }, []);

  return (
    <Container>
      <Button onClick={()=> navigate(`/create/${element}`)}>Crear Nuevo</Button>
      <Button onClick={()=> navigate(`/update/${element}/${id}`)}>Actualizar datos</Button>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold" }}>
        {data?.name}
      </Typography>
      {element === "books" && (
        <>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {(data as IBook)?.user_borrowed_id ? "No available" : "Available"}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Published date: {(data as IBook)?.published_date}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Author(s):
          </Typography>
          {(data as IBook)?.authors?.map((item: IAuthor) => (
            <List
              key={item.id}
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={item.name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Categories:
          </Typography>
          {(data as IBook)?.categories?.map((item: ICategory) => (
            <List
              key={item.id}
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={item.name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </>
      )}
      {element === "categories" && (
        <>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Description: {(data as ICategory)?.description}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Book(s):
          </Typography>
          {(data as ICategory)?.books?.map((item: IBook) => (
            <List
              key={item.id}
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={item.name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </>
      )}
      {element === "authors" && (
        <>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Book(s):
          </Typography>
          {(data as IAuthor)?.books?.map((item: IBook) => (
            <List
              key={item.id}
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={item.name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </>
      )}
      {element === "users" && (
        <>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {(data as IUser)?.lastname}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {(data as IUser)?.email}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {(data as IUser)?.phone}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {(data as IUser)?.role === 1 ? 'Admin' : 'Client'}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Following Book(s):
          </Typography>
          {(data as IUser)?.notifies?.map((item: IBook) => (
            <List
              key={item.id}
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={item.name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </>
      )}
    </Container>
  );
};

export default Details;
