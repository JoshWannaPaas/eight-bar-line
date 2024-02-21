import { Button } from "@mui/material";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { currentLoginAtom, defaultUser } from "../../recoil/login";

const LoginView: FC = () => {
  const [currentLogin, setCurrentLogin] = useRecoilState(currentLoginAtom);

  const login = () => {
    // Once backend can handle it,
    // replace this by talking to the server with postgres
    alert("You have logged in as Admin!");
    setCurrentLogin({
      username: "Admin",
      password: "admin",
    });
  };

  const logout = () => {
    alert("You have logged out!");
    setCurrentLogin(defaultUser);
  };

  return (
    <main>
      <Button onClick={login}>Login</Button>
      <Button onClick={logout}>Logout</Button>
    </main>
  );
};

export default LoginView;
