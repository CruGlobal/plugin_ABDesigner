import FNAbviewformItem from "./FNAbviewformItem.js";

/*
 * ABViewFormDatepicker
 * A Property manager for our ABViewFormDatepicker definitions
 */



export default function FNAbviewFormDatepickerProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewFormItem = FNAbviewformItem({ AB, ABViewPropertiesPlugin });

   const BASE_ID = "properties_abview_form_datepicker";

   

   class ABViewFormDatepickerProperty extends ABViewFormItem {
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
         return "datepicker";
      }
   }

   return ABViewFormDatepickerProperty;
}
