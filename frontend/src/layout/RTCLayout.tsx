import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { ensembleAtom, userListAtom } from "../recoil/ensemble";
import { socketAtom } from "../recoil/socket";
import { Ensemble, EnsembleObject } from "common/dist";

const RTCLayout: React.FC = () => {
  // Attach ALL passive event listeners
  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);
  const setCurrentUsers = useSetRecoilState(userListAtom);
  const setCurrentEnsemble = useSetRecoilState(ensembleAtom);

  const updateUsers = useCallback(
    (users: string[]) => {
      setCurrentUsers(users);
    },
    [setCurrentUsers],
  );

  useEffect(() => {
    // I need to check if we have the value before we continue to do anything
    if (state !== "hasValue") return undefined;

    const serverEnsembleUpdateHandler = (ensembleObject: EnsembleObject) => {
      const newEnsemble = Ensemble.fromObject(ensembleObject);
      console.log(ensembleObject);
      console.log("New Ensemble ", newEnsemble);
      setCurrentEnsemble(newEnsemble);
      // console.log("Ensemble Update Received from Server")
    };

    // Attach event listeners
    console.log("Attaching event listeners");
    socket.on("ensemble:update", serverEnsembleUpdateHandler);
    socket.on("room:user-list", updateUsers);

    return () => {
      // Remove event listeners
      console.log("Removing event listeners");
      socket.off("ensemble:update", serverEnsembleUpdateHandler);
      socket.off("room:user-list", updateUsers);
    };
  }, [socket, state, setCurrentEnsemble, updateUsers]);

  return <Outlet />;
};
export default RTCLayout;
