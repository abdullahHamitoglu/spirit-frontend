import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

const LogoImage = ({ logo }) => {
  return (
    <Fragment>
      <Link href={"/"}>
        {/* <a> */}
        <Image
        width={100}
        height={40}
          src={`/assets/images/logo.png`}
          alt=""
          className="img-fluid"
        />
        {/* </a> */}
      </Link>
    </Fragment>
  );
};

export default LogoImage;
