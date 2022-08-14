import React, { Fragment } from "react";
import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface IProps {
  children: React.ReactNode;
}

const Layout = (props: IProps) => {
  return (
    <Fragment>
      <Header />

      <Container>{props.children}</Container>

      <Footer />
    </Fragment>
  );
};

export default Layout;
