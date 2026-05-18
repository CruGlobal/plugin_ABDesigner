// FNAbviewgantt Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewganttEditor({ AB, ABViewEditorPlugin }) {
   const BASE_ID = "interface_editor_viewgantt";

return class ABAbviewganttEditor extends ABViewEditorPlugin {

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
            return "gantt";
         }

         constructor(view, base = BASE_ID) {
            // base: {string} unique base id reference
            super(view, base, {
               label: "",
            });
         }

         ui() {
            return this.component.ui();
         }

         async init(AB) {
            this.AB = AB;
            this.component.ignoreLocal = true;
            // in our editor, we provide accessLv = 2
            await this.component.init(AB, 2);
         }

         detatch() {
            this.component.detatch?.();
         }

         onShow() {
            this.component.onShow?.();
         }
      };
   

}
