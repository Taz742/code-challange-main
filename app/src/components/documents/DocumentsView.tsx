import { Button } from "@mui/material";
import React from "react";
import useModal from "../../hooks/useModal";
import { IDocument } from "../../stores/documents/interfaces";
import CreateOrUpdateDocumentModal from "./CreateOrDocumentModal";
import DocumentsList from "./DocumentsList";
import { DocumentsAppBar } from "../app-bar";

export const DocumentsView = () => {
  const {
    isOpen: isCreateOrUpdateDocumentOpen,
    item: createOrUpdateDocumentItem,
    openModal: openCreateOrUpdateDocumentModal,
    closeModal: closeCreateOrUpdateDocumentModal,
  } = useModal<IDocument | undefined>();

  const redirect = (id?: string) => {};

  return (
    <>
      <DocumentsAppBar />
      <DocumentsList
        onCreateDocument={() => redirect()}
        onDocumentClick={(document) => redirect(document.id)}
      />
      {isCreateOrUpdateDocumentOpen && (
        <CreateOrUpdateDocumentModal
          isOpen={isCreateOrUpdateDocumentOpen}
          document={createOrUpdateDocumentItem}
          handleClose={closeCreateOrUpdateDocumentModal}
        />
      )}
    </>
  );
};
