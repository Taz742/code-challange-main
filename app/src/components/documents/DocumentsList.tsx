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
import { Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { IDocumentsListProps } from "./interfaces";

const useStyles = makeStyles({
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
  detailsContent: {
    marginTop: 20,
    padding: '10px 20px',
    borderRadius: 10,
    border: "1px solid rgba(0, 0, 0, 0.23)",
  },
});

const DocumentsList = ({ onDocumentClick }: IDocumentsListProps) => {
  const [activeDocument, setActiveDocument] = useState<IDocument | null>(null);

  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  const styles = useStyles();

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
      {activeDocument && (
        <div className={styles.detailsContainer}>
          <Typography variant="h4">{`${activeDocument.title} - Details`}</Typography>
          <Editor className={styles.detailsContent} readOnly value={activeDocument.body} />
        </div>
      )}
    </>
  );
};

export default observer(DocumentsList);
