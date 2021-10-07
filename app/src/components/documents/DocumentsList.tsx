import React, { useState, useEffect } from "react";

import { observer } from "mobx-react";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import useStores from "../../hooks/useStores";

import DocumentsStore from "../../stores/documents/DocumentsStore";
import { IDocument } from "../../stores/documents/interfaces";

import Editor from "rich-markdown-editor";

interface IProps {
  onDocumentClick: (document: IDocument) => void;
}

const DocumentsList = ({ onDocumentClick }: IProps) => {
  const [activeDocument, setActiveDocument] = useState<IDocument | null>(null);

  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  useEffect(() => {
    documentsStore.getList();
  }, [documentsStore]);

  const handleEditDocument = (document: IDocument) => {
    onDocumentClick(document);
  };

  const handleDelete = (id: string) => (e: React.MouseEvent<any>) => {
    e.stopPropagation();

    documentsStore.delete(id);

    if (id === activeDocument?.id) {
      setActiveDocument(null);
    }
  };

  const handleShowDetails = (document: IDocument) => {
    setActiveDocument(document);
  };

  return (
    <>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Document List Items
          </ListSubheader>
        }
      >
        {documentsStore.list.map((document) => {
          return (
            <ListItemButton
              onClick={() => handleShowDetails(document)}
              key={document.id}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={document.title} />
              <ListItemIcon onClick={() => handleEditDocument(document)}>
                <EditIcon />
              </ListItemIcon>
              <ListItemIcon onClick={handleDelete(document.id)}>
                <DeleteIcon />
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
      {activeDocument && <Editor readOnly value={activeDocument.body} />}
    </>
  );
};

export default observer(DocumentsList);
