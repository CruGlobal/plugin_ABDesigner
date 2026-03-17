// Uses built-in Detail property panel so behavior matches built-in detail widget.
// Thin wrapper to expose getPluginType/getPluginKey for pluginRegister.
import FABViewDetail from "../../rootPages/Designer/properties/views/ABViewDetail";

export default function FNAbviewdetailProperties(apiOrAB) {
   const AB = apiOrAB?.AB ?? apiOrAB;
   const ABViewDetailProperty = FABViewDetail(AB);

   class ABViewDetailPropertyPlugin extends ABViewDetailProperty {
      static getPluginType() {
         return "properties-view";
      }
      static getPluginKey() {
         return "detail";
      }
   }

   return ABViewDetailPropertyPlugin;
}
