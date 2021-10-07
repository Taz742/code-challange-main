import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IDocument } from "../../stores/documents/interfaces";
// import Editor from "rich-markdown-editor";

interface IProps {
  isOpen: boolean;
  document?: IDocument;
  handleClose: () => void;
}

const CreateOrUpdateDocumentModal = ({
  document,
  isOpen,
  handleClose,
}: IProps) => {
  const [title, setTitle] = useState(document?.title ?? "");

  return (
    <div>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {document ? `Edit ${document.title} - Document` : "Create Document"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {title}
            {/* <div style={{ margin: "25px" }}>
          <Editor defaultValue="Hello world!" />
        </div> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateOrUpdateDocumentModal;
