import { IDocument } from "../stores/documents/interfaces";
import { getEnvVariable } from "../utils/env";

export const documentsService = {
  create: async (document: Omit<IDocument, "id">) => {
    return fetch(`${getEnvVariable('BASE_API_URL')}/v1/documents`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(document),
    }).then((response) => response.json());
  },
  getList: async () => {
    return fetch(`${getEnvVariable('BASE_API_URL')}/v1/documents`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
  delete: async (id: string) => {
    return fetch(`${getEnvVariable('BASE_API_URL')}/v1/documents/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
  update: async (document: IDocument) => {
    return fetch(`${getEnvVariable('BASE_API_URL')}/v1/documents/${document.id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(document),
    }).then((response) => response.json());
  },
};
