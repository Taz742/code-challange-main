import { makeObservable, observable } from "mobx";
import { Order, SortKeys } from "../../components/documents-list/interfaces";
import { documentsService } from "../../services/documentsService";
import { IDocument } from "./interfaces";

export default class DocumentsStore {
  @observable list = [] as IDocument[];
  @observable loading = false;

  constructor() {
    makeObservable(this);
  }

  async create(document: Omit<IDocument, "id" | "updated_at">) {
    const documentResponse = await documentsService.create(document);
    this.list.push(documentResponse.data);
  }

  async getList(order: Order, orderBy: SortKeys) {
    this.loading = true;

    const documentsListResponse = await documentsService.getList(order, orderBy);
    this.list = documentsListResponse.data;

    this.loading = false;
  }

  async delete(id: string) {
    await documentsService.delete(id);
    this.list = this.list.filter((document) => document.id !== id);
  }

  async update(document: Partial<IDocument>) {
    const documentUpdateResponse = await documentsService.update(document);
    this.list = this.list.map((_document) =>
      _document.id !== document.id ? _document : documentUpdateResponse.data
    );
  }
}
