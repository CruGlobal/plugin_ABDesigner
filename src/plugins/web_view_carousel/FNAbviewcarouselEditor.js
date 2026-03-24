// FNAbviewcarousel Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewcarouselEditor({ ABViewEditorPlugin }) {
   // var L = UIClass.L();
   // var L = ABViewContainer.L();

   return class ABAbviewcarouselEditor extends ABViewEditorPlugin {
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
         return "carousel";
      }

      constructor(view, base = "interface_editor_viewcarousel") {
         // base: {string} unique base id reference

         super(view, base, {
            label: "",
         });
         this.settings = view.settings;
         // shortcut to reference the settings

         this.base = base;
      }

      ui() {
         return super.ui();
      }

      async init(AB) {
         this.AB = AB;
         await super.init(AB);
      }

      detatch() {
         super.detatch();
      }

      onShow() {
         super.onShow();
      }
   };
}
