import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image alt="logo" src='/logo.svg' height={130} width={130} />
  );
};

export default Logo;
