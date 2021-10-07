import React from "react";
import { Provider } from "mobx-react";

import stores from "./stores";

import { DocumentsView } from "./components/documents/";

import "./App.css";

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <DocumentsView />
    </Provider>
  );
};

export default App;
