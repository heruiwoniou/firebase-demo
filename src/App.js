import React, { useState, useEffect, useRef, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./Initialize";
import { db, auth as firebaseAuth } from "./Initialize";

import AuthContext from "./AuthContext";
import Header from "./Header";

const addAction = name =>
  db.collection("todos").add({
    name: name,
    author: firebaseAuth.currentUser.uid,
    finish: true
  });

const putAction = ({ id, finish = false }) =>
  db
    .collection("todos")
    .doc(id)
    .update({
      finish
    });

const deleteAction = ({ id }) =>
  db
    .collection("todos")
    .doc(id)
    .delete();

const getlistAction = () => {
  if(!firebaseAuth.currentUser) return Promise.resolve([]);
  return db
    .collection("todos").where('author', '==', firebaseAuth.currentUser.uid)
    .get()
    .then(querySnapshot => {
      let res = [];
      querySnapshot.forEach(doc => res.push({ id: doc.id, data: doc.data() }));
      return res;
    });
};

const List = ({ list, putClickHandle, deleteClickHandle }) => {
  return (
    <ul>
      {list.map(({ id, data: { name, finish = false } }) => (
        <li key={id} id={id}>
          {name}
          <button onClick={() => putClickHandle({ id, finish: !finish })}>
            {finish ? " Yes" : " No"}
          </button>
          <button onClick={() => deleteClickHandle({ id })}>X</button>
        </li>
      ))}
    </ul>
  );
};

function App() {
  const ref = useRef(null);
  const localStoreAuth = window.localStorage.getItem("auth");
  const authForContext = useState(
    localStoreAuth ? JSON.parse(localStoreAuth) : null
  );
  const [auth] = authForContext;
  const [list, updateList] = useState([]);

  const refreshList = useCallback(
    () =>
      getlistAction()
        .then(res => updateList(res))
        .catch(alert),
    []
  );

  const addClickHandle = useCallback(() => {
    addAction(ref.current.value)
      .then(function(docRef) {
        alert("Document written with ID: " + docRef.id);
        ref.current.value = "";
        refreshList();
      })
      .catch(alert);
  }, [refreshList]);

  const putClickHandle = useCallback(
    payload => {
      putAction(payload)
        .then(() => {
          alert("Document update with ID: " + payload.id);
          refreshList();
        })
        .catch(alert);
    },
    [refreshList]
  );

  const deleteClickHandle = useCallback(
    payload => {
      deleteAction(payload)
        .then(() => {
          alert(`Document ${payload.id} has been deleted!`);
          refreshList();
        })
        .catch(alert);
    },
    [refreshList]
  );

  useEffect(() => {
    auth && refreshList();
  }, [auth, refreshList]);

  return (
    <AuthContext.Provider value={authForContext}>
      <div className="App">
        <Header></Header>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {auth && (
            <div>
              <p>
                <input type="text" ref={ref} style={{ display: "inline" }} />
                <button onClick={addClickHandle}>添加内容</button>
              </p>
              <List
                list={list}
                putClickHandle={putClickHandle}
                deleteClickHandle={deleteClickHandle}
              />
            </div>
          )}
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
