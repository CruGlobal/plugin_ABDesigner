// FNAbviewpivot Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewpivotEditor({ AB, ABViewEditorPlugin }) {
   // var L = UIClass.L();
      // var L = ABViewContainer.L();

return class ABAbviewpivotEditor extends ABViewEditorPlugin {

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
            return "pivot";
         }

         constructor(view, base = "interface_editor_viewpivot") {
            // base: {string} unique base id reference

            super(view, base);
         }

         ui() {
            const pivotContainer = this.component.ui();
            const pivot = pivotContainer.rows[0];

            pivot.readonly = false;

            // NOTE: ui_work_interface_workspace_editor_layout is expecting a { rows:[] }
            // type of response from this.
            return pivotContainer;
         }

         init(AB) {
            this.AB = AB;

            this.component?.init?.();

            const pivotId = this.ui().rows[0].id;
            const $pivot = $$(pivotId);
            $pivot.getState().$observe("structure", (structure) => {
               this._saveStructure(structure);
            });
         }

         detatch() {
            this.component?.detatch?.();
         }

         onShow() {
            this.component?.onShow?.();
         }

         _saveStructure(structure) {
            this.view.settings.structure = structure;
            this.view.save();
         }
      };
   

}
