import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import Editor from "rich-markdown-editor";

import { Container, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import useStores from "../../hooks/useStores";
import DocumentsStore from "../../stores/documents/DocumentsStore";
import { IDocument } from "../../stores/documents/interfaces";
import { DocumentsAppBar } from "../app-bar";

const useStyles = makeStyles({
  container: {
    padding: "40px 0",
  },
  detailsContent: {
    padding: "20px 50px",
    marginTop: 20,
    height: 200,
    overflowY: "scroll",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: 4,
    justifyContent: "flex-start !important",
  },
});

export const DocumentsDetails = observer(() => {
  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  const { id } = useParams() as { id?: string };

  const styles = useStyles();

  const document = useMemo(() => {
    return documentsStore.list.find(
      (document) => document.id === id
    ) as Required<IDocument>;
  }, [documentsStore.list, id]);

  return (
    <>
      <DocumentsAppBar />
      <Container className={styles.container}>
        <TextField
          label="Title"
          value={document.title}
          InputProps={{
            readOnly: true,
          }}
        />
        <Editor
          readOnly
          id="body-input"
          defaultValue={document?.body ?? ""}
          className={styles.detailsContent}
        />
      </Container>
    </>
  );
});
