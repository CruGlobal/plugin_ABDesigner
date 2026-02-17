import viewCsvExporterProperties from "./web_view_csvExporter/FNAbviewcsvexporter.js";
import CsvExporterEditor from "./web_view_csvExporter/FNAbviewcsvexporterEditor.js";
import viewListProperties from "./web_view_list/FNAbviewlist.js";
import TabProperties from "./web_view_tab/FNAbviewtab.js";
import TabEditor from "./web_view_tab/FNAbviewtabEditor.js";
import viewLabelProperties from "./web_view_label/FNAbviewLabel.js";
import LabelEditor from "./web_view_label/FNAbviewLabelEditor.js";

const AllPlugins = [TabProperties, TabEditor, viewListProperties, viewLabelProperties, LabelEditor, viewCsvExporterProperties, CsvExporterEditor];

export default {
   load: (AB) => {
      AllPlugins.forEach((plugin) => {
         AB.pluginRegister(plugin);
      });
   },
};
