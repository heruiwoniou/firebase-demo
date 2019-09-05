import React, { useContext, useCallback, useRef } from "react";
import styled from "styled-components";

import AuthContext from "./AuthContext";
import { auth } from "./Initialize";

const Identity = ({ onSuccess = () => {} }) => {
  const [, updateAuth] = useContext(AuthContext);
  const regsiterEmailRef = useRef(null);
  const regsiterPswRef = useRef(null);
  const registerHandle = useCallback(() => {
    auth
      .createUserWithEmailAndPassword(
        regsiterEmailRef.current.value,
        regsiterPswRef.current.value
      )
      .then(({ user }) => {
				updateAuth(user);
				window.localStorage.auth = JSON.stringify({
					email: user.email
				});
				alert(`Welcome ${user.email}`);
        onSuccess();
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
      });
  }, [onSuccess, updateAuth]);

  const loginEmailRef = useRef(null);
  const loginPswRef = useRef(null);
  const loginHandle = useCallback(() => {
    auth
      .signInWithEmailAndPassword(
        loginEmailRef.current.value,
        loginPswRef.current.value
      )
      .then(({ user }) => {
				updateAuth(user);
				window.localStorage.auth = JSON.stringify({
					email: user.email
				});
				alert(`Wellcome ${user.email}`);
        onSuccess();
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        // ...

        alert(errorMessage);
      });
  }, [onSuccess, updateAuth]);

  return (
    <StyledIdentityWrapper>
      <StyledLoginPanel>
        <p>
          usename: <input ref={loginEmailRef} type="text" />
        </p>
        <p>
          password: <input ref={loginPswRef} type="password" />
        </p>
        <p>
          <button onClick={loginHandle}>login</button>
        </p>
      </StyledLoginPanel>
      <StyledRegisterPanel>
        <p>
          usename: <input ref={regsiterEmailRef} type="text" />
        </p>
        <p>
          password: <input ref={regsiterPswRef} type="password" />
        </p>
        <p>
          <button onClick={registerHandle}>register</button>
        </p>
      </StyledRegisterPanel>
    </StyledIdentityWrapper>
  );
};

export default Identity;

const StyledLoginPanel = styled.div`
  height: 100%;
  flex-grow: 1;
`;
const StyledRegisterPanel = styled.div`
  position: relative;
  height: 100%;
  flex-grow: 1;
  padding-left: 20px;
  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 80%;
    width: 1px;
    left: 0px;
    background: linear-gradient(white, black, white);
  }
`;

const StyledIdentityWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;
