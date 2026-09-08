import FNAbviewchartareaEditor from "./FNAbviewchartareaEditor.js";
import FNAbviewchartbarEditor from "./FNAbviewchartbarEditor.js";
import FNAbviewchartlineEditor from "./FNAbviewchartlineEditor.js";
import FNAbviewchartpieEditor from "./FNAbviewchartpieEditor.js";

export default function FNAbviewchartEditor({
   AB,
   ABViewEditorPlugin,
   FABViewContainerEditor,
}) {
   const ABViewContainer = FABViewContainerEditor(AB);
   const BASE_ID = "interface_editor_viewchart";

   class ABAbviewchartEditor extends ABViewContainer {
      static getPluginKey() {
         return "chart";
      }

      static getPluginType() {
         return "editor-view";
      }

      constructor(view, base = BASE_ID) {
         super(view, base);
      }

      static get key() {
         return "chart";
      }

      ui() {
         const _ui = super.ui();
         _ui.rows[0].cellHeight = 400;
         return _ui;
      }

      async init(AB) {
         this.AB = AB;
         await super.init(AB);
      }

      detatch() {}

      onShow() {
         super.onShow();
      }
   }

   return [
      ABAbviewchartEditor,
      FNAbviewchartareaEditor({ ABViewEditorPlugin }),
      FNAbviewchartbarEditor({ ABViewEditorPlugin }),
      FNAbviewchartlineEditor({ ABViewEditorPlugin }),
      FNAbviewchartpieEditor({ ABViewEditorPlugin }),
   ];
}
