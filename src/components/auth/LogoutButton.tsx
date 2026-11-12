import React from "react";
import { Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Text onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Text>
  );
};

export default LogoutButton;