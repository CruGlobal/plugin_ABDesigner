import FNAbviewDetailItemProperties from "./FNAbviewDetailItem.js";

export default function FNAbviewDetailCheckboxProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewDetailItem = FNAbviewDetailItemProperties({
      AB,
      ABViewPropertiesPlugin,
   });

   const BASE_ID = "properties_abview_detail_checkbox";

   class ABViewDetailCheckboxProperty extends ABViewDetailItem {
      constructor() {
         super(BASE_ID, {
            height: "",
         });

         this.AB = AB;
      }

      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
      }

      static get key() {
         return "detailcheckbox";
      }

      ViewClass() {
         return super._ViewClass("detailcheckbox");
      }
   }

   return ABViewDetailCheckboxProperty;
}
