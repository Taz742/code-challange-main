import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

import { observer } from "mobx-react";
import { Button, Container } from "@mui/material";

import { makeStyles } from "@mui/styles";

import Editor from "rich-markdown-editor";

import useStores from "../../hooks/useStores";
import DocumentsStore from "../../stores/documents/DocumentsStore";

import { DocumentsAppBar } from "../app-bar";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../documents-list/interfaces";

import FormInput from "../../shared/form/form-input";

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
  button: {
    minWidth: 140,
    marginTop: 20
  }
});

export const CreateOrUpdateDocument = observer(() => {
  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  const history = useHistory();
  const { id } = useParams() as { id?: string };

  const styles = useStyles();

  const document = useMemo(() => {
    return documentsStore.list.find((document) => document.id === id);
  }, [documentsStore.list, id]);

  const methods = useForm<IFormInput>({
    defaultValues: {
      title: document?.title ?? "",
      body: document?.body ?? "",
    },
  });

  const { setValue, handleSubmit } = methods;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (document) {
      await documentsStore.update({ ...data, id: document.id });
    } else {
      await documentsStore.create(data);
    }

    history.push("/documents/");
  };

  return (
    <>
      <DocumentsAppBar />
      <Container className={styles.container}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="title"
              label="Title"
              validate={{ required: true }}
            />
            <Editor
              id="body-input"
              defaultValue={document?.body ?? ""}
              className={styles.detailsContent}
              onChange={(getContent) => {
                const content = getContent();
                setValue("body", content);
              }}
            />
          </form>
        </FormProvider>
        <Button className={styles.button} variant="contained" onClick={handleSubmit(onSubmit)}>
          {document ? "Save" : "Create"}
        </Button>
      </Container>
    </>
  );
});
