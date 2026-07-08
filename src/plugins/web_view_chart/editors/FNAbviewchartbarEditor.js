export default function FNAbviewchartbarEditor({ ABViewEditorPlugin }) {
   return class ABAbviewchartbarEditor extends ABViewEditorPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "editor-view";
      }

      static get key() {
         return "bar";
      }

      constructor(view, base = "interface_editor_viewchart_bar") {
         super(view, base);
      }
   };
}
