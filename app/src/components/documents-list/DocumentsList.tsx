import React, { useState, useEffect } from "react";

import { observer } from "mobx-react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import LoadingButton from "@mui/lab/LoadingButton";

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

import useStores from "../../hooks/useStores";

import DocumentsStore from "../../stores/documents/DocumentsStore";
import { IDocument } from "../../stores/documents/interfaces";

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
    fontSize: "72px !important",
    position: "absolute",
    top: 180,
    cursor: "pointer",
    background: "#fff",
    borderRadius: "50%",
  },
  loadingContainer: {
    display: "flex",
    minWidth: "750px",
    maxWidth: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px 0",
  },
});

const DocumentsList = ({
  onDocumentClick,
  onCreateDocument,
  onRowClick,
}: IDocumentsListProps) => {
  const [isReady, setIsReady] = useState(false);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortKeys>("title");

  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  const styles = useStyles();

  useEffect(() => {
    documentsStore.getList(order, orderBy);
  }, [documentsStore, order, orderBy]);

  useEffect(() => {
    let timeOut: any = null;

    if (documentsStore.loading) {
      setIsReady(false);
    } else {
      timeOut = setTimeout(() => {
        setIsReady(true);
      }, 500);
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [documentsStore.loading]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SortKeys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleEditDocument = (document: IDocument) => (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    
    onDocumentClick(document);
  };

  const handleDelete = (id: string) => (e: React.MouseEvent<any>) => {
    e.stopPropagation();

    documentsStore.delete(id);
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
            {!isReady ? (
              <div className={styles.loadingContainer}>
                <LoadingButton size="large" loading />
              </div>
            ) : (
              <TableBody>
                {documentsStore.list.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => onRowClick(row)}
                    >
                      <TableCell align="left">
                        <Typography>{row.title}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.updated_at}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <EditIcon
                          onClick={handleEditDocument(row)}
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
            )}
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default observer(DocumentsList);
