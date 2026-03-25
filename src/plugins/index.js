import CsvExporterEditor from "./web_view_csvExporter/FNAbviewcsvexporterEditor.js";
import CsvExporterProperties from "./web_view_csvExporter/FNAbviewcsvexporter.js";
import CsvImporterEditor from "./web_view_csvImporter/FNAbviewcsvimporterEditor.js";
import CsvImporterProperties from "./web_view_csvImporter/FNAbviewcsvimporter.js";
import CsvImporterPopupImport from "./web_view_csvImporter/ui_work_object_workspace_popupImport";
import LabelEditor from "./web_view_label/FNAbviewLabelEditor.js";
import LabelProperties from "./web_view_label/FNAbviewLabel.js";
import ListProperties from "./web_view_list/FNAbviewlist.js";
import TabEditor from "./web_view_tab/FNAbviewtabEditor.js";
import TabProperties from "./web_view_tab/FNAbviewtab.js";

const AllPlugins = [TabProperties,
   CsvExporterEditor,
   CsvExporterProperties,
   CsvImporterEditor,
   CsvImporterProperties,
   CsvImporterPopupImport,
   LabelEditor,
   TabEditor,
   TabProperties,
   LabelProperties,
   ListProperties,
];

export default {
   load: (AB) => {
      AllPlugins.forEach((plugin) => {
         AB.pluginRegister(plugin);
      });
   },
};
