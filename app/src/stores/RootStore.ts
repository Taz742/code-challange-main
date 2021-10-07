import DocumentsStore from "./documents/DocumentsStore";
import UIStore from "./UIStore";

export interface IRootStore {
  ui?: UIStore;
  documentsStore?: DocumentsStore;
}

export default class RootStore implements IRootStore {
  ui: UIStore;
  documentsStore: DocumentsStore;

  constructor() {
    this.ui = new UIStore();
    this.documentsStore = new DocumentsStore();
  }

  get stores() {
    return {
      ui: this.ui,
      documentsStore: this.documentsStore
    };
  }
}
