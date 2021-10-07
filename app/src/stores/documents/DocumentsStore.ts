import { makeObservable, observable } from "mobx";
import { documentsService } from "../../services/documentsService";
import { IDocument } from "./interfaces";

export default class DocumentsStore {
  @observable list = [] as IDocument[];

  constructor() {
    makeObservable(this);
  }

  async create(document: Omit<IDocument, "id">) {
    const documentResponse = await documentsService.create(document);
    this.list.push(documentResponse.data);
  }

  async getList() {
    const documentsListResponse = await documentsService.getList();
    this.list = documentsListResponse.data;
  }

  async delete(id: string) {
    const documentDeleteResponse = await documentsService.delete(id);
    this.list = this.list.filter((document) => document.id !== id);
  }
}
