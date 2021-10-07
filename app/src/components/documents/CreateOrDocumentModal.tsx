import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import Editor from "rich-markdown-editor";

import { IDocument } from "../../stores/documents/interfaces";

import FormInput from "../../shared/form/form-input";

import useStores from "../../hooks/useStores";

import DocumentsStore from "../../stores/documents/DocumentsStore";

interface IFormInput {
  title: string;
  body: string;
}

interface IProps {
  isOpen: boolean;
  document?: IDocument;
  handleClose: () => void;
}

const CreateOrUpdateDocumentModal = ({
  isOpen,
  document,
  handleClose,
}: IProps) => {
  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  console.log("doc is: ", document);

  const methods = useForm<IFormInput>({
    defaultValues: {
      title: document?.title ?? "",
      body: document?.body ?? "",
    },
  });

  const { setValue, watch, handleSubmit } = methods;

  const body = watch("body");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (document) {
      await documentsStore.update({ ...data, id: document.id });
    } else {
      await documentsStore.create(data);
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {document ? `Edit ${document.title} - Document` : "Create Document"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  name="title"
                  label="Title"
                  validate={{ required: true }}
                />
                <div
                  style={{
                    padding: "20px 50px",
                    marginTop: 20,
                    height: 200,
                    overflowY: "scroll",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: 4,
                  }}
                >
                  <Editor
                    key="body-input"
                    value={body}
                    onChange={(getContent) => {
                      const content = getContent();
                      setValue("body", content);
                    }}
                  />
                </div>
              </form>
            </FormProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateOrUpdateDocumentModal;
