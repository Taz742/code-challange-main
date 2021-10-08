import React from "react";
import { Provider } from "mobx-react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import stores from "./stores";

import { DocumentsView } from "./components/documents-list";
import { CreateOrUpdateDocument } from "./components/documents-create-or-update";
import { DocumentsDetails } from './components/documents-details';

import "./App.css";

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <Router>
        <Route exact path="/documents/" component={DocumentsView} />
        <Route exact path="/documents/details/:id" component={DocumentsDetails} />
        <Route exact path="/documents/create" component={CreateOrUpdateDocument} />
        <Route exact path="/documents/edit/:id" component={CreateOrUpdateDocument} />
        <Route exact path="*" component={() => <Redirect to="/documents/" />} />
      </Router>
    </Provider>
  );
};

export default App;
