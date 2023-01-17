import {
  ListItemText,
  Typography,
} from "@mui/material";
import Categories from "./Categories";


import { IAuthor, IBook, ICategory, IUser } from "../models/interface";

import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  isAdmin: number;
  item: IBook | IAuthor | ICategory | IUser;
};

const ItemList = ({ title, isAdmin, item }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <ListItemText
        primary={
          title === "users"
            ? `${item.name} ${(item as IUser).lastname}`
            : item.name
        }
        onClick={() => navigate(`/details/${title}/${item.id}`)}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {title === "books" && (
                <>
                  {title === "books" && (item as IBook).user_borrowed_id
                    ? "No disponible"
                    : null}
                  {`Published: ${(item as IBook).published_date}`}
                  {title === "books" && (
                    <Categories categories={(item as IBook).categories} />
                  )}
                </>
              )}
              {title === "categories" && (item as ICategory).description}
              {title === "users" &&
                ((item as IUser).role === 1 ? "Admin" : "Client")}
            </Typography>
          </>
        }
      />
    </>
  );
};

export default ItemList;
