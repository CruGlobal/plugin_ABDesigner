// FNAbviewdataview Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewdataviewEditor({ ABViewEditorPlugin }) {
   return class ABAbviewdataviewEditor extends ABViewEditorPlugin {
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
         return "dataview";
      }

      constructor(view, base = "interface_editor_viewdataview") {
         super(view, base);
      }

      ui() {
         let _ui = super.ui();
         if (_ui?.rows?.[0]) {
            _ui.rows[0].cellHeight = 75;
         }
         return _ui;
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
