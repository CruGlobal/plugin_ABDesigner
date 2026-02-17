import viewListProperties from "./web_view_list/FNAbviewlist.js";
import TabProperties from "./web_view_tab/FNAbviewtab.js";
import TabEditor from "./web_view_tab/FNAbviewtabEditor.js";
import viewLabelProperties from "./web_view_label/FNAbviewLabel.js";
import LabelEditor from "./web_view_label/FNAbviewLabelEditor.js";

const AllPlugins = [TabProperties, TabEditor, viewListProperties];

export default {
   load: (AB) => {
      AllPlugins.forEach((plugin) => {
         AB.pluginRegister(plugin);
      });
   },
};
