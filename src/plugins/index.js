import viewDocxBuilderProperties from "./web_view_docxBuilder/FNAbviewdocxbuilder.js";
import viewDocxBuilderEditor from "./web_view_docxBuilder/FNAbviewdocxbuilderEditor.js";
import CsvExporterEditor from "./web_view_csvExporter/FNAbviewcsvexporterEditor.js";
import CsvExporterProperties from "./web_view_csvExporter/FNAbviewcsvexporter.js";
import CsvImporterEditor from "./web_view_csvImporter/FNAbviewcsvimporterEditor.js";
import CsvImporterProperties from "./web_view_csvImporter/FNAbviewcsvimporter.js";
import viewCarouselEditor from "./web_view_carousel/FNAbviewcarouselEditor.js";
import viewCarouselProperties from "./web_view_carousel/FNAbviewcarousel.js";
import viewCommentEditor from "./web_view_comment/FNAbviewcommentEditor.js";
import viewCommentProperties from "./web_view_comment/FNAbviewcomment.js";
import viewDataSelectEditor from "./web_view_data-select/FNAbviewdataselectEditor.js";
import viewDataSelectProperties from "./web_view_data-select/FNAbviewdataselect.js";
import viewDataviewEditor from "./web_view_dataview/FNAbviewdataviewEditor.js";
import viewDataviewProperties from "./web_view_dataview/FNAbviewdataview.js";
import viewDetailEditor from "./web_view_detail/FNAbviewdetailEditor.js";
import viewDetailProperties from "./web_view_detail/FNAbviewdetail.js";
import viewFormEditor from "./web_view_form/FNAbviewformEditor.js";
import viewFormProperties from "./web_view_form/FNAbviewform.js";
import viewGanttEditor from "./web_view_gantt/FNAbviewganttEditor.js";
import viewGanttProperties from "./web_view_gantt/FNAbviewgantt.js";
import viewGridEditor from "./web_view_grid/FNAbviewgridEditor.js";
import viewGridProperties from "./web_view_grid/FNAbviewgrid.js";
import viewImageEditor from "./web_view_image/FNAbviewimageEditor.js";
import viewImageProperties from "./web_view_image/FNAbviewimage.js";
import viewKanbanEditor from "./web_view_kanban/FNAbviewkanbanEditor.js";
import viewKanbanProperties from "./web_view_kanban/FNAbviewkanban.js";
import viewLabelEditor from "./web_view_label/FNAbviewLabelEditor.js";
import viewLabelProperties from "./web_view_label/FNAbviewLabel.js";
import viewLayoutEditor from "./web_view_layout/FNAbviewlayoutEditor.js";
import viewLayoutProperties from "./web_view_layout/FNAbviewlayout.js";
import viewListProperties from "./web_view_list/FNAbviewlist.js";
import viewPdfImporterEditor from "./web_view_pdfImporter/FNAbviewpdfimporterEditor.js";
import viewPdfImporterProperties from "./web_view_pdfImporter/FNAbviewpdfimporter.js";
import viewPivotEditor from "./web_view_pivot/FNAbviewpivotEditor.js";
import viewPivotProperties from "./web_view_pivot/FNAbviewpivot.js";
import viewTabEditor from "./web_view_tab/FNAbviewtabEditor.js";
import viewTabProperties from "./web_view_tab/FNAbviewtab.js";
import viewTextEditor from "./web_view_text/FNAbviewtextEditor.js";
import viewTextProperties from "./web_view_text/FNAbviewtext.js";
import viewChartProperties from "./web_view_chart/properties/FNAbviewchart.js";
import viewChartEditor from "./web_view_chart/editors/FNAbviewchartEditor.js";

import FABViewContainer from "../rootPages/Designer/properties/views/ABViewContainer.js";
import FABViewContainerEditor from "../rootPages/Designer/editors/views/ABViewContainer.js";

const ABDesignResources = {
   FABViewContainer,
   FABViewContainerEditor,
};

const AllPlugins = [
   CsvExporterEditor,
   CsvExporterProperties,
   CsvImporterEditor,
   CsvImporterProperties,
   viewCarouselEditor,
   viewCarouselProperties,
   viewCommentEditor,
   viewCommentProperties,
   viewDataSelectEditor,
   viewDataSelectProperties,
   viewDataviewEditor,
   viewDataviewProperties,
   viewDetailEditor,
   viewDetailProperties,
   viewFormEditor,
   viewFormProperties,
   viewGanttEditor,
   viewGanttProperties,
   viewGridEditor,
   viewGridProperties,
   viewImageEditor,
   viewImageProperties,
   viewKanbanEditor,
   viewKanbanProperties,
   viewLabelEditor,
   viewLabelProperties,
   viewLayoutEditor,
   viewLayoutProperties,
   viewListProperties,
   viewPdfImporterEditor,
   viewPdfImporterProperties,
   viewPivotEditor,
   viewPivotProperties,
   viewTabEditor,
   viewTabProperties,
   viewTextEditor,
   viewTextProperties,
   viewDocxBuilderProperties,
   viewDocxBuilderEditor,
   viewChartProperties,
   viewChartEditor,
];

export default {
   load: (AB) => {
      AllPlugins.forEach((plugin) => {
         AB.pluginRegister((api) => plugin({ ...api, ...ABDesignResources }));
      });
   },
};
