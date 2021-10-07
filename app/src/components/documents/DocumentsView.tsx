import { Button } from "@mui/material";
import React from "react";
import useModal from "../../hooks/useModal";
import { IDocument } from "../../stores/documents/interfaces";
import CreateOrUpdateDocumentModal from "./CreateOrDocumentModal";
import DocumentsList from "./DocumentsList";

export const DocumentsView = () => {
  const {
    isOpen: isCreateOrUpdateDocumentOpen,
    item: createOrUpdateDocumentItem,
    openModal: openCreateOrUpdateDocumentModal,
    closeModal: closeCreateOrUpdateDocumentModal,
  } = useModal<IDocument | undefined>();

  return (
    <>
      <Button onClick={() => openCreateOrUpdateDocumentModal()}>
        Create New Document
      </Button>
      <DocumentsList
        onDocumentClick={(document) =>
          openCreateOrUpdateDocumentModal(document)
        }
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
