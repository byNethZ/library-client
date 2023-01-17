import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/api";
import stylesParams from "../globalStylesParams";
import { ICredentials } from "../models/interface";

import bgImage from "/img/cover.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<ICredentials>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    console.log(credentials);

    login(credentials).then((response) => {
      console.log(response);
      if (response.code === 401) {
        setCredentials({
          email: "",
          password: "",
        });
        setError(response.message);
      } else if (response.code === 400) {
        setCredentials({
          email: "",
          password: "",
        });
        setError("Fields must be valid");
      } else if (response.code === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.user.name);
        localStorage.setItem("isAdmin", response.user.role);
        localStorage.setItem("id", response.user.id);
        navigate("/");
      }
    });
  };
  
  return (
    <LoginContent>
      <div className="content">
        <div className="space"></div>
        <div className="form">
          <form>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              The Library
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <div className="field">
              <InputLabel htmlFor="email">Email</InputLabel>
              <input
                value={credentials.email}
                type="email"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
            <div className="field">
              <InputLabel htmlFor="password">Password</InputLabel>
              <input
                value={credentials.password}
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <div>
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>
            <div className="submit">
              <button onClick={(e) => handleSubmit(e)}>Log In</button>
            </div>
          </form>
          <Typography sx={{ fontSize: '.8rem' }} variant="h6" >You do not have an account yet?</Typography>
          <LinkStyled to="/register">Register</LinkStyled>
        </div>
      </div>
    </LoginContent>
  );
};

const LoginContent = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bgImage});
  margin: 0;
  background-position: center center;
  background-size: cover;

  .content {
    width: 90%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .space {
      display: none;

      @media screen and (min-width: 768px) {
        display: block;
        width: 50%;
      }
    }

    .form {
      background-color: #fff;
      padding: 1rem;
      width: 100%;
      border-radius: 1rem;

      h3,
      p {
        text-align: center;
        margin: 0;
      }

      .field {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;

        input {
          border: 1px solid #ccc;
          height: 1.8rem;
          border-radius: 0.3rem;
        }

        div {
          width: 100%;
        }
      }

      .submit {
        display: flex;
        justify-content: flex-end;

        button {
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          background-color: ${stylesParams.mainColor};
          color: #fff;
          padding: 0.5rem;
          border-radius: 0.3rem;

          &:hover {
            background-color: ${stylesParams.hoverMainColor};
          }
        }
      }

      @media screen and (min-width: 768px) {
        width: 50%;
      }
    }
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${stylesParams.mainColor};
  font-weight: bold;
`

export default Login;
