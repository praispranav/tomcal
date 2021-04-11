import React from "react";
import Files from "./files";
import { Provider } from "react-redux";
import store from "./Redux/store";
const YourDrive = () => {
  return (
    <Provider store={store}>
      <Files />
    </Provider>
  );
};

export default YourDrive;
