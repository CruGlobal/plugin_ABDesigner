export default function FNAbviewchartareaEditor({ ABViewEditorPlugin }) {
   return class ABAbviewchartareaEditor extends ABViewEditorPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "editor-view";
      }

      static get key() {
         return "area";
      }

      constructor(view, base = "interface_editor_viewchart_area") {
         super(view, base);
      }
   };
}
