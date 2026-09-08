import FNAbviewDetailItemProperties from "./FNAbviewDetailItem.js";

export default function FNAbviewDetailTreeProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewDetailItem = FNAbviewDetailItemProperties({
      AB,
      ABViewPropertiesPlugin,
   });

   const BASE_ID = "properties_abview_detail_tree";

   class ABViewDetailTreeProperty extends ABViewDetailItem {
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
         return "detailtree";
      }

      ViewClass() {
         return super._ViewClass("detailtree");
      }
   }

   return ABViewDetailTreeProperty;
}
