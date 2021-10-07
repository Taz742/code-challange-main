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
  onDocumentClick: (document: IDocument) => void;
}
