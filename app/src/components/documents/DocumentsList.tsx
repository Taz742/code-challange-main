import React, { useState, useEffect } from "react";

import { observer } from "mobx-react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import useStores from "../../hooks/useStores";

import DocumentsStore from "../../stores/documents/DocumentsStore";
import { IDocument } from "../../stores/documents/interfaces";

import Editor from "rich-markdown-editor";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { IDocumentsListProps, Order, SortKeys } from "./interfaces";
import { TableHeader } from "./DocumentsListHeader";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    marginTop: "60px !important",
  },
  addDocument: {
    color: "#305ECA",
    fontSize: 72,
    position: "absolute",
    top: 180,
    cursor: "pointer",
    background: "#fff",
    borderRadius: "50%",
  },
});

const DocumentsList = ({
  onDocumentClick,
  onCreateDocument,
}: IDocumentsListProps) => {
  const [activeDocument, setActiveDocument] = useState<IDocument | null>(null);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortKeys>("title");

  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  const styles = useStyles();

  useEffect(() => {
    documentsStore.getList(order, orderBy);
  }, [documentsStore, order, orderBy]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SortKeys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
    <Box className={styles.container}>
      <Container>
        <AddCircleIcon
          className={styles.addDocument}
          onClick={() => onCreateDocument()}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort as any}
            />
            <TableBody>
              {documentsStore.list.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">
                      <Typography>{row.title}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{row.updated_at}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        onClick={() => handleEditDocument(row)}
                        sx={{ cursor: "pointer" }}
                      />
                      <DeleteIcon
                        onClick={handleDelete(row.id)}
                        sx={{ cursor: "pointer", marginLeft: 5 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default observer(DocumentsList);
