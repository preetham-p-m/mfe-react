import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container-app",
});

const App = () => {
  const [isSignedIn, setSignIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={() => setSignIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setSignIn(true)} />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
