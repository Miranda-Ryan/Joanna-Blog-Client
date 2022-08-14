import React from "react";

interface IProps {
  children: React.ReactNode;
}

const Container = (props: IProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen overflow-hidden py-2">
      {props.children}
    </div>
  );
};

export default Container;
