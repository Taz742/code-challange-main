import DocumentsStore from "./documents/DocumentsStore";
import UIStore from "./UIStore";

export interface IRootStore {
  ui?: UIStore;
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
      ui: this.ui
    };
  }
}
