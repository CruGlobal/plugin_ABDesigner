import sinon from "sinon";

export default class ABViewEditorPlugin {
   constructor(view, base) {
      this.view = view;
      this.base = base;
      this.component = {
         ui: sinon.stub().returns({}),
         init: sinon.stub(),
         detatch: sinon.stub(),
         onShow: sinon.stub(),
      };
   }

   ui() {
      return { view: "mock-editor-ui" };
   }

   async init(AB) {
      this.AB = AB;
   }

   detatch() {}

   onShow() {}
}
