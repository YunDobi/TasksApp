import React from "react";
import Link from "next/link";

const Layout: React.FC = ({children}) => {
  return(
    <div className="pages">
      <Link href="/">
        <a className="logo">
          <img alt="logo" src="/logo.png" />
        </a>
      </Link>
      {children}
      </div>

  )
}

export default Layout;