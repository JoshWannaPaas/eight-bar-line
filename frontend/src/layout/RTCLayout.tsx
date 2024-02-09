import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { ensembleAtom, userListAtom } from "../recoil/ensemble";
import { socketAtom } from "../recoil/socket";
import { Ensemble, EnsembleObject } from "common/dist";

/**
 * This is a separate layout for Real Time Collaboration (RTC)
 *
 * When navigating to the Ensemble view, this component gets loaded.
 * When this happens, we communicate with the server to set up the necessary listeners
 * for RTC, using userListAtom and ensembleAtom, before it gets used.
 *
 * We do this to be ready to "catch" the information given to us by the server when we join an Ensemble.
 * Otherwise, the information is sent too quickly for us to receive, store, and utilize the data.
 */
const RTCLayout: React.FC = () => {
  // Attach ALL passive event listeners
  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);
  const setCurrentUsers = useSetRecoilState(userListAtom);
  const setCurrentEnsemble = useSetRecoilState(ensembleAtom);

  useEffect(() => {
    // I need to check if we have the value before we continue to do anything
    if (state !== "hasValue") return undefined;

    const serverEnsembleUpdateHandler = (ensembleObject: EnsembleObject) => {
      const newEnsemble = Ensemble.fromObject(ensembleObject);
      setCurrentEnsemble(newEnsemble);
    };

    // Attach event listeners
    socket.on("ensemble:update", serverEnsembleUpdateHandler);
    socket.on("room:user-list", setCurrentUsers);

    return () => {
      // Remove event listeners
      socket.off("ensemble:update", serverEnsembleUpdateHandler);
      socket.off("room:user-list", setCurrentUsers);
    };
  }, [socket, state, setCurrentEnsemble, setCurrentUsers]);

  return <Outlet />;
};
export default RTCLayout;
