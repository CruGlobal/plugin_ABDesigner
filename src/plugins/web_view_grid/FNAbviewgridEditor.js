// FNAbviewgrid Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewgridEditor({ AB, ABViewEditorPlugin }) {
   // var L = UIClass.L();
      // var L = ABViewContainer.L();

return class ABAbviewgridEditor extends ABViewEditorPlugin {

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
            return "grid";
         }

         constructor(view, base = "interface_editor_viewgrid") {
            // base: {string} unique base id reference

            super(view, base, {
               label: "",
            });
            this.settings = view.settings;
            // shortcut to reference the settings

            this.base = base;
         }

         ui() {
            return this.component.ui();
         }

         init(AB) {
            this.AB = AB;
            this.component.ignoreLocal = true;
            return this.component.init(AB, 2);
            // in our editor, we provide accessLv = 2
         }

         detatch() {
            this.component.detatch?.();
         }

         onShow() {
            this.component.onShow?.();
         }
      };
   

}
