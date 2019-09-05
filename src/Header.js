import React, { useContext, useState, useCallback } from "react";
import styled from "styled-components";

import AuthContext from "./AuthContext";
import Modal from "./Modal";
import { auth as firebaseAuth } from "./Initialize"

import Identity from "./Identity";

const Header = () => {
  const [open, modalState] = useState(false);
  const openDialog = useCallback(() => modalState(true), []);
  const closeDialog = useCallback(() => modalState(false), []);
  const [auth, updateAuth] = useContext(AuthContext);
  const logoutHandle = useCallback(() => {
		firebaseAuth.signOut().then(() => {
			window.localStorage.removeItem("auth");
			updateAuth(null);
		}).catch(error => alert(error))
  }, [updateAuth]);

  return (
    <>
      <StyledHeader>
        <StyledTitle>Firebase-demo</StyledTitle>
        <StyledState>
          {auth ? (<>
							{auth.email}
            	<button onClick={logoutHandle}>Logout</button>
						</>
          ) : (
            <button onClick={openDialog}>Login</button>
          )}
        </StyledState>
      </StyledHeader>
      <Modal open={open} onClose={closeDialog}>
        <Identity onSuccess={closeDialog}></Identity>
      </Modal>
    </>
  );
};

export default Header;

const StyledTitle = styled.div`
  flex-grow: 1;
  padding: 0 20px;
  text-align: left;
  font-weight: bold;
`;
const StyledState = styled.div`
  width: 400px;
  text-align: right;
  padding: 0 20px;
`;

const StyledHeader = styled.header`
  height: 50px;
  line-height: 50px;
  display: flex;
`;
