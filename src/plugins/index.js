import viewListProperties from "./web_view_list/FNAbviewlist.js";
import TabProperties from "./web_view_tab/FNAbviewtab.js";
import TabEditor from "./web_view_tab/FNAbviewtabEditor.js";
import viewDetailProperties from "./web_view_detail/FNAbviewdetail.js";

const AllPlugins = [TabProperties, TabEditor, viewListProperties, viewDetailProperties];

export default {
   load: (AB) => {
      AllPlugins.forEach((plugin) => {
         AB.pluginRegister(plugin);
      });
   },
};
