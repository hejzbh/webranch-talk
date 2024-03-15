import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Header = dynamic(() => import("@/components/Header"));

const ServerChannelHeader = () => {
  return <Header>ServerChannelHeader</Header>;
};

export default ServerChannelHeader;
