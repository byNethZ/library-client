import { MenuBook } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import stylesParams from "../globalStylesParams";

import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ClassIcon from "@mui/icons-material/Class";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import styled from "styled-components";

const menuItems = [
  { title: "books", path: "/" },
  { title: "authors", path: "/authors" },
  { title: "categories", path: "/categories" },
];

const Header = () => {
  const [name, setName] = useState<string | null>(localStorage.getItem("name"));
  const [isAdmin, setIsAdmin] = useState<number | null>(
    parseInt(localStorage.getItem("isAdmin")!)
  );
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  return name ? (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" color="default">
          <Container maxWidth="lg">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuBook />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hi, {name}
              </Typography>
              <Button color="inherit">Log Out</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <List>
          <Image src="icon.svg" alt="" />
          <Typography sx={{ textAlign: "center" }}>The Library</Typography>
          {menuItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <LinkStyled to={item.path}>{item.title}</LinkStyled>
              </ListItemButton>
            </ListItem>
          ))}
          {isAdmin === 1 && (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <LinkStyled to="/users">Users</LinkStyled>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  ) : null;
};

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${stylesParams.mainColor};
  text-transform: capitalize;
`;

const Image = styled.img`
  width: 5rem;
  margin: 1rem auto;
  display: block;
`;

export default Header;
