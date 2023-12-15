import React, { useState, useEffect } from "react";

const TapTop = () => {
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    // Tap to Top Scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 500) setGoingUp(true);
      else setGoingUp(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const tapToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  return (
    <div
      className="tap-top top-cls"
      style={goingUp ? { display: "block" } : { display: "none" }}
      onClick={tapToTop}
    >
      <div className="d-flex justify-content-center align-items-center">
        <i className="fa fa-angle-double-up w-auto h-auto"></i>
      </div>
    </div>
  );
};

export default TapTop;
