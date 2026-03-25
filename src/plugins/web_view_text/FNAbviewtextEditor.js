// FNAbviewtext Editor
// An Editor wrapper for the ABView Component.
// The Editor is displayed in the ABDesigner as a view is worked on.
// The Editor allows a widget to be moved and placed on the canvas.
//
export default function FNAbviewtextEditor({ ABViewEditorPlugin }) {
   const BASE_ID = "interface_editor_viewtext";

   return class ABAbviewtextEditor extends ABViewEditorPlugin {
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
         return "text";
      }

      constructor(view, base = BASE_ID) {
         // base: {string} unique base id reference
         super(view, base);
      }

      ui() {
         const ids = this.ids;
         const baseView = this.view;

         return {
            _dashboardID: ids.component,
            rows: [
               {
                  id: ids.component,
                  view: "tinymce-editor",
                  value: baseView.text,
                  config: {
                     plugins:
                        "advlist autolink lists link image charmap anchor searchreplace visualblocks code fullscreen insertdatetime media table wordcount",
                     toolbar:
                        "insertfile undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                     // menu: {
                     // 	file: { title: 'File', items: 'newdocument' },
                     // 	edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall' },
                     // 	format: { title: 'Format', items: 'formats | removeformat' }
                     // },
                     init_instance_callback: (editor) => {
                        const eventHandlerOnChange = () => {
                           this.onChange();
                        };

                        editor.on("Change", eventHandlerOnChange);
                     },
                  },
               },
            ],
         };
      }

      async init(AB) {
         webix.codebase = "/js/webix/extras/";
         await super.init(AB);
      }

      async viewLoad(view) {
         await this.AB.custom["tinymce-editor"].init();
         super.viewLoad(view);
      }

      onChange() {
         const ids = this.ids;
         const baseView = this.view;

         if (baseView._onChangeFunction) {
            clearTimeout(baseView._onChangeFunction);

            baseView._onChangeFunction = null;
         }

         const $component = $$(ids.component);

         baseView._onChangeFunction = setTimeout(() => {
            baseView.text = $component.getValue();

            baseView.save();
         }, 400);
      }

      onShow() {
         super.onShow();
      }
   };
}
