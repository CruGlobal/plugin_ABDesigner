import FNAbviewformItem from "./FNAbviewFormItem.js";

/*
 * ABViewFormCheckbox
 * A Property manager for our ABViewFormCheckbox definitions
 */

export default function FNAbviewFormCheckboxProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewFormItem = FNAbviewformItem({ AB, ABViewPropertiesPlugin });

   const BASE_ID = "properties_abview_form_checkbox";

   class ABViewFormCheckboxProperty extends ABViewFormItem {
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
         return "checkbox";
      }
   }

   return ABViewFormCheckboxProperty;
}
