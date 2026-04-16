// FNAbviewdataview Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewdataviewEditor({
   /* AB, */ ABViewEditorPlugin,
}) {
   // const ABViewContainer = FABViewContainer(AB);
   // var L = UIClass.L();
   // var L = ABViewContainer.L();

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
         // base: {string} unique base id reference

         super(view, base);

         // this.component = this.view.component();
      }

      ui() {
         let _ui = super.ui();
         _ui.rows[0].cellHeight = 75;
         return _ui;
      }

      init(AB) {
         this.AB = AB;
         return super.init(AB);
      }

      detatch() {
         this.component?.detatch?.();
      }

      onShow() {
         super.onShow();
         this.component?.onShow?.();
      }
   };
}
