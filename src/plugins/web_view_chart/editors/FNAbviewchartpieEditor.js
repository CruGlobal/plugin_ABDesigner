export default function FNAbviewchartpieEditor({ ABViewEditorPlugin }) {
   return class ABAbviewchartpieEditor extends ABViewEditorPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "editor-view";
      }

      static get key() {
         return "pie";
      }

      constructor(view, base = "interface_editor_viewchart_pie") {
         super(view, base);
      }
   };
}
