import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Media } from "reactstrap";

const LogoImage = ({ logo }) => {
  return (
    <Fragment>
      <Link href={"/"}>
        {/* <a> */}
        <Media
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
