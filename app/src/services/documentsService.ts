import { IDocument } from "../stores/documents/interfaces";

export const documentsService = {
  create: async (document: Omit<IDocument, "id">) => {
    return fetch("http://localhost:3001/v1/documents", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(document),
    })
      .then((response) => response.json())
  },
  getList: async () => {
    return fetch("http://localhost:3001/v1/documents", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
  },
  delete: async (id: string) => {
    return fetch(`http://localhost:3001/v1/documents/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
  },
};
