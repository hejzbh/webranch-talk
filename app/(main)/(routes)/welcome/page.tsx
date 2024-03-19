import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Header = dynamic(() => import("@/components/Header"));
const HeaderTitle = dynamic(() =>
  import("@/components/Header").then((res) => res.HeaderTitle)
);

const WelcomePage = () => {
  return (
    <main className="h-full text-white">
      <Header>
        <HeaderTitle text="Webranch talk" />
      </Header>
    </main>
  );
};

export default WelcomePage;
