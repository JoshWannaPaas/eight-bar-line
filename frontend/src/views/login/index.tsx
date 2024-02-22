import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { currentLoginAtom, defaultUser } from "../../recoil/login";
import axios from "axios";

const LoginView: FC = () => {
  const [currentLogin, setCurrentLogin] = useRecoilState(currentLoginAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = {
    username: username,
    password: password,
  };

  const onLogin = () => {
    // // Check if user is already logged in
    // if(username !== "Guest"){
    //   alert("Already logged in!\nLog out first to switch users");
    //   return;
    // }

    axios
      .post("/api/users/session/", userLogin)
      .then(() => {
        alert("Logged in!");
        setCurrentLogin(userLogin);
      })
      .catch((error: any) => {
        handleError(error);
      });
  };

  const onLogout = () => {
    // Check if user is not logged in
    if (username === "Guest") {
      alert("Not logged in! No need to log out.");
      return;
    }

    axios
      .delete("/api/users/session/")
      .then(() => {
        alert("You have logged out!");
        setCurrentLogin(defaultUser);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onRegister = () => {
    axios
      .post("/api/users", userLogin)
      .then(() => {
        alert("User created! \nNow go log in.");
      })
      .catch((error: any) => {
        handleError(error);
      });
  };

  //
  const handleError = (error: any) => {
    const errorCode = error?.response?.status;
    const errorMessage = error?.response?.data;

    switch (errorCode) {
      case 400:
        // Bad Username/Password
        alert(errorMessage);
        // Add more stuff later
        break;
      case 403:
        // Login: User is already signed in
        alert(errorMessage);
        break;
      case 409:
        // Register: Existing Username
        alert(errorMessage);
        break;
      default:
        alert("Some other weird error happened, check console.");
        console.log(error);
        break;
    }
  };

  return (
    <main>
      <TextField
        value={username}
        label="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        value={password}
        label="Password"
        InputProps={{}}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button onClick={onLogin}>Login</Button>
      <br /> <br /> <br />
      <Button onClick={onLogout}>Logout</Button>
      <br /> <br /> <br />
      <Button onClick={onRegister}>Register Account</Button>
    </main>
  );
};

export default LoginView;
