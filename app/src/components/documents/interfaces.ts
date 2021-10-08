import { IDocument } from "../../stores/documents/interfaces";

export interface IFormInput {
  title: string;
  body: string;
}

export interface ICreateOrUpdateDocumentModalProps {
  isOpen: boolean;
  document?: IDocument;
  handleClose: () => void;
}

export interface IDocumentsListProps {
  onCreateDocument: () => void;
  onDocumentClick: (document: IDocument) => void;
}

type SortableColumns = Pick<IDocument, "title" | "updated_at">;
export type SortKeys = keyof SortableColumns;;
export type Order = "asc" | "desc";
