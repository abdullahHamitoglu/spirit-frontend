import Link from "next/link";
import React from "react";

const MasterServiceContent = ({
  link,
  title,
  service,
  marijuana,
  lastChild,
  href
}) => {
  return (
    <Link href={href}
      className={`${!marijuana ? "media" : ""} ${
        lastChild ? "border-0 m-0" : ""
      }`}
    >
      <div dangerouslySetInnerHTML={{ __html: link }} />
      <div className="media-body">
        <h4 className="text-black">{title}</h4>
        <p>{service}</p>
      </div>
    </Link>
  );
};

export default MasterServiceContent;
