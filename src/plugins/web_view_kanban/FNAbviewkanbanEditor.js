// FNAbviewkanban Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewkanbanEditor({ AB, ABViewEditorPlugin }) {
   const BASE_ID = "interface_editor_viewkanban";

   return class ABAbviewkanbanEditor extends ABViewEditorPlugin {
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
         return "kanban";
      }

      constructor(view, base = BASE_ID) {
         super(view, base);
      }

      ui() {
         const component = this.component;
         const _ui = component.ui();
         _ui.minWidth = 400;

         return {
            view: "layout",
            cols: [_ui, { fillspace: true }],
         };
      }

      init(AB) {
         this.AB = AB;

         this.component?.init?.(AB);
      }

      detach() {
         this.component?.detach?.();
      }

      onShow() {
         this.component?.onShow?.();
      }
   };
}
