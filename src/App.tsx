import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import LogRocket from 'logrocket';

import { LoginFailurePage, LoginPage, MainPage, SignupPage } from "./pages";

export default function Page() {

  LogRocket.init('al94sq/memphis-property-hub');

  const { isLoading, isAuthenticated, error, user } = useAuth0();

  const queryString = window.location.search;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(`Error occured: ${error}`);
    // error.message === "user_not_allowed"
    // This page loads when the user has signed up, but has not been granted access yet through Sharepoint
    <LoginFailurePage />
  }

  if (queryString === "?signup") {
    return <SignupPage />
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  if (user?.email) {
    LogRocket.identify(user.email);
  }

  let token;
  if (user?.feltToken) {
    token = user.feltToken
  }

  return <MainPage token={token} />
}
