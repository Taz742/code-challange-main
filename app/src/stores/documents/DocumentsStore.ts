import { makeObservable, observable } from "mobx";
import { documentsService } from "../../services/documentsService";
import { IDocument } from "./interfaces";

export default class DocumentsStore {
  @observable list = [] as IDocument[];

  constructor() {
    makeObservable(this);
    // this.list.push({
    //   id: "1",
    //   title: "One",
    //   body: "Description One",
    // });
    // this.create({
    //   title: "One",
    //   body: "Description One",
    // });
  }

  async create(document: Omit<IDocument, "id">) {
    const documentResponse = await documentsService.create(document);
    this.list.push(documentResponse.data);
  }

  async getList() {
    const documentsListResponse = await documentsService.getList();
    this.list = documentsListResponse.data;
  }
}
