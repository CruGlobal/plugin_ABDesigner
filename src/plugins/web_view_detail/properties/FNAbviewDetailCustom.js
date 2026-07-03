import FNAbviewDetailItemProperties from "./FNAbviewDetailItem.js";

export default function FNAbviewDetailCustomProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewDetailItem = FNAbviewDetailItemProperties({
      AB,
      ABViewPropertiesPlugin,
   });

   const BASE_ID = "properties_abview_detail_custom";

   class ABViewDetailCustomProperty extends ABViewDetailItem {
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
         return "detailcustom";
      }

      ViewClass() {
         return super._ViewClass("detailcustom");
      }
   }

   return ABViewDetailCustomProperty;
}
