// FNAbviewdocxbuilder Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewdocxbuilderEditor({ ABViewEditorPlugin }) {
   return class ABAbviewdocxbuilderEditor extends ABViewEditorPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "editor-view";
      }

      static get key() {
         return "docxBuilder";
      }

      constructor(view, base = "interface_editor_docxBuilder") {
         super(view, base);
      }

      ui() {
         return super.ui();
      }

      async init(AB) {
         this.AB = AB;
         await super.init(AB);
      }

      detatch() {
         super.detatch();
      }

      onShow() {
         super.onShow();
      }
   };
}
