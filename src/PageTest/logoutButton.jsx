import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  return !isAuthenticated && <button onClick={() => logout()}>SIgn In</button>;
}

export default LogoutButton;
