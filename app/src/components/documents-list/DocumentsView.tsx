import React from "react";
import { useHistory } from "react-router-dom";

import DocumentsList from "./DocumentsList";
import { DocumentsAppBar } from "../app-bar";

export const DocumentsView = () => {
  const history = useHistory();

  const redirect = (id?: string) => {
    history.push(`/documents/${id ? `edit/${id}` : 'create'}`)
  };

  const redirectToDetails = (id: string) => {
    history.push(`/documents/details/${id}`)
  };

  return (
    <>
      <DocumentsAppBar />
      <DocumentsList
        onCreateDocument={() => redirect()}
        onDocumentClick={(document) => redirect(document.id)}
        onRowClick={(document) => redirectToDetails(document.id)}
      />
    </>
  );
};
