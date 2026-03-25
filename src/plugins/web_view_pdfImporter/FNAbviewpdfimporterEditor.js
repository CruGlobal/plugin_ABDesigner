// FNAbviewpdfimporter Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewpdfimporterEditor({ ABViewEditorPlugin }) {
   // var L = UIClass.L();
   // var L = ABViewContainer.L();

   return class ABAbviewpdfimporterEditor extends ABViewEditorPlugin {
      static getPluginKey() {
         return this.key;
      }

      /**
       * @method getPluginType
       * return the plugin type for this editor.
       * plugin types are how our ClassManager knows how to store
       * the plugin.
       * @return {string} plugin type
       */
      static getPluginType() {
         return "editor-view";
         // editor-view : will display in the editor panel of the ABDesigner
      }

      static get key() {
         return "pdfImporter";
      }

      constructor(view, base = "interface_editor_pdfImporter") {
         // base: {string} unique base id reference

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
