import * as React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { SortKeys, Order } from './interfaces';
import { IDocument } from "../../stores/documents/interfaces";

interface HeadCell {
  id: SortKeys;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "updated_at",
    label: "Last Updated",
  },
];

interface IProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IDocument
  ) => void;
}

export function TableHeader(props: IProps) {
  const { order, orderBy, onRequestSort } = props;
  
  const createSortHandler =
    (property: keyof IDocument) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}