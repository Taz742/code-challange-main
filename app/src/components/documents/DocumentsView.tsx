import { Button } from "@mui/material";
import React from "react";
import useModal from "../../hooks/useModal";
import CreateOrUpdateDocumentModal from "./CreateDocumentModal";
import DocumentsList from "./DocumentsList";

export const DocumentsView = () => {
  const {
    isOpen: isCreateOrUpdateDocumentOpen,
    openModal: openCreateOrUpdateDocumentModal,
    closeModal: closeCreateOrUpdateDocumentModal
  } = useModal();

  return (
    <>
      <DocumentsList />
      <Button onClick={openCreateOrUpdateDocumentModal}>
        Create Document
      </Button>
      <CreateOrUpdateDocumentModal
        isOpen={isCreateOrUpdateDocumentOpen}
        handleClose={closeCreateOrUpdateDocumentModal}
      />
    </>
  );
};
