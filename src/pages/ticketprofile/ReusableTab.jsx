import React from "react";
import { TabPane } from "reactstrap";

const ReusableTab = (props) => {
  return <TabPane tabId={props.id}>{props.children}</TabPane>;
};

export default ReusableTab;
