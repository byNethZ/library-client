import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { borrow, destroy, index } from "../api/api";
import global from "../api/globals";
import { IAuthor, IBook, ICategory, IUser } from "../models/interface";
import Categories from "./Categories";
import ItemList from "./ItemList";

import DeleteIcon from "@mui/icons-material/Delete";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {
  title: string;
};

const Catalogue = ({ title }: Props) => {
  const [data, setData] = useState<IBook[] | IAuthor[] | ICategory[] | IUser[]>(
    []
  );
  const [totalPagination, setTotalPagination] = useState<number>(0);
  const [endpoint, setEndpoint] = useState<string>(`${global.urlApi}/${title}`);
  const [isAdmin, setIsAdmin] = useState<number>(
    parseInt(localStorage.getItem("isAdmin")!)
  );

  const navigate = useNavigate();

  useEffect(() => {
    setEndpoint(`${global.urlApi}/${title}`);
  }, [title]);

  useEffect(() => {
    fethcData();
  }, [endpoint]);

  const fethcData = () => {
    index(endpoint).then((data) => {
      setData(data[title].data);
      setTotalPagination(data[title].last_page);
    });
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //setPage(value);
    setEndpoint(`${global.urlApi}/${title}?page=${value}`);
  };

  const handleDelete = (id: number) => {
    destroy(`${global.urlApi}/${title}/${id}`).then(() => {
      fethcData();
    });
  };

  const handleAlert = (id: number) => {};

  const handleBorrow = (id: number, status: number | null ) => {
    if(status ===  null) {
      borrow(`${global.urlApi}/borrow/${id}/1`, {user_borrowed_id: localStorage.getItem('user_id')})
    } else {
      borrow(`${global.urlApi}/borrow/${id}/0`, {user_borrowed_id: localStorage.getItem('user_id')})
    }
    fethcData();
  };

  return (
    <Container>
      <Typography
        sx={{
          textAlign: "center",
          textTransform: "capitalize",
          fontSize: "2rem",
        }}
      >
        {title}
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.length > 0 &&
          data.map((el) => (
            <ListItem key={el.id} alignItems="flex-start">
              <ItemList key={el.id} title={title} isAdmin={isAdmin} item={el} />
              <Divider variant="inset" />
              {isAdmin === 1 && (
                <IconButton
                  size="large"
                  edge="start"
                  color="error"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => handleDelete(el.id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {title === "books" && isAdmin === 1 && (
                <Button onClick={() => handleBorrow(el.id, (el as IBook).user_borrowed_id)} >{(el as IBook).user_borrowed_id ? 'Return' : 'Borrow'}</Button>
              )}
              {title === "books" && isAdmin === 0 && (
                <IconButton
                  size="large"
                  edge="start"
                  color="error"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => handleAlert(el.id)}
                >
                  <AddAlertIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
      </List>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Pagination count={totalPagination} onChange={handleChange} />
      </Stack>
    </Container>
  );
};

export default Catalogue;
