
/**
 * ABViewFormEditor
 * The widget that displays the UI Editor Component on the screen
 * when designing the UI.
 */
var myClass = null;
// {singleton}
// we will want to call this factory fn() repeatedly in our imports,
// but we only want to define 1 Class reference.

export default function FNAbviewFormUrlEditor({ ABViewForm }) {

   if (!myClass) {
      // var L = UIClass.L();
      // var L = ABViewContainer.L();

      myClass = class ABViewFormEditor extends ABViewForm {
         static getPluginKey() {
            return this.key;
         }

         static getPluginType() {
            return "editor-view";
         }
         static get key() {
            return "form-url";
         }

         // constructor(view, base = "interface_editor_viewform") {
         //    // base: {string} unique base id reference

         //    super(view, base);

         //    // this.component = this.view.component();
         // }

         // ui() {
         //    let _ui = super.ui();
         //    _ui.rows[0].cellHeight = 75;
         //    return _ui;
         // }

         // init(AB) {
         //    this.AB = AB;
         //    return super.init(AB);
         // }

         // detatch() {
         //    this.component?.detatch?.();
         // }

         // onShow() {
         //    this.component?.onShow?.();
         // }
      };
   }

   return myClass;
}
