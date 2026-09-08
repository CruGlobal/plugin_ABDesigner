import FNAbviewformItem from "./FNAbviewFormItem.js";

/*
 * ABViewFormCustom
 * A Property manager for our ABViewFormCustom definitions
 */

export default function FNAbviewFormCustomProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewFormItem = FNAbviewformItem({ AB, ABViewPropertiesPlugin });

   const BASE_ID = "properties_abview_form_custom";

   class ABViewFormCustomProperty extends ABViewFormItem {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
      }
      constructor() {
         super(BASE_ID, {});

         this.AB = AB;
      }

      static get key() {
         return "fieldcustom";
      }
   }

   return ABViewFormCustomProperty;
}
