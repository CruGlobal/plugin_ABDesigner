import FNAbviewformItem from "./FNAbviewformItem.js";

/*
 * ABViewFormTree
 * A Property manager for our ABViewFormTree definitions
 */

export default function FNAbviewFormTreeProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewFormItem = FNAbviewformItem({ AB, ABViewPropertiesPlugin });

   const BASE_ID = "properties_abview_form_tree";

   class ABViewFormTreeProperty extends ABViewFormItem {
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
         return "formtree";
      }
   }

   return ABViewFormTreeProperty;
}
