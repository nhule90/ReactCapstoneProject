import React from "react";

const Header = () => {
  return (
    <header>
      <svg
        width="55"
        height="55"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="256" cy="256" r="248" stroke="#232323" strokeWidth="20" />
        <path
          d = "M100 420L100 80L350 460L350 80"
          // d="M255 222L203 132.5L83.9282 338H233L331 168L427.675 338.571L317.5 338.5"
          stroke="#232323"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2>Houston Realtor</h2>
    </header>
  );
};

export default Header;
