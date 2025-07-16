import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button
    size="xl"
    backgroundColor={"#60c9b7"}
    width={250}
    onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}>
    Sign Up
  </Button>;
};

export default SignupButton;
