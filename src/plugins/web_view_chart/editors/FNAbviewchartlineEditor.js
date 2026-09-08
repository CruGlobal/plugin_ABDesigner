export default function FNAbviewchartlineEditor({ ABViewEditorPlugin }) {
   return class ABAbviewchartlineEditor extends ABViewEditorPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "editor-view";
      }

      static get key() {
         return "line";
      }

      constructor(view, base = "interface_editor_viewchart_line") {
         super(view, base);
      }
   };
}
