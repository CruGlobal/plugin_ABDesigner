import viewGanttProperties from "./web_view_gantt/FNAbviewgantt.js";
import viewGanttEditor from "./web_view_gantt/FNAbviewganttEditor.js";
import viewCarouselProperties from "./web_view_carousel/FNAbviewcarousel.js";
import viewCarouselEditor from "./web_view_carousel/FNAbviewcarouselEditor.js";
import viewCommentProperties from "./web_view_comment/FNAbviewcomment.js";
import viewCommentEditor from "./web_view_comment/FNAbviewcommentEditor.js";
import viewDataSelectProperties from "./web_view_data-select/FNAbviewdataselect.js";
import viewDataSelectEditor from "./web_view_data-select/FNAbviewdataselectEditor.js";
import viewImageProperties from "./web_view_image/FNAbviewimage.js";
import viewImageEditor from "./web_view_image/FNAbviewimageEditor.js";
import viewLabelProperties from "./web_view_label/FNAbviewLabel.js";
import viewLabelEditor from "./web_view_label/FNAbviewLabelEditor.js";
import viewLayoutProperties from "./web_view_layout/FNAbviewlayout.js";
import viewLayoutEditor from "./web_view_layout/FNAbviewlayoutEditor.js";
import viewListProperties from "./web_view_list/FNAbviewlist.js";
import viewPdfImporterProperties from "./web_view_pdfImporter/FNAbviewpdfimporter.js";
import viewPdfImporterEditor from "./web_view_pdfImporter/FNAbviewpdfimporterEditor.js";
import viewTabProperties from "./web_view_tab/FNAbviewtab.js";
import viewTabEditor from "./web_view_tab/FNAbviewtabEditor.js";
import viewTextProperties from "./web_view_text/FNAbviewtext.js";
import viewTextEditor from "./web_view_text/FNAbviewtextEditor.js";

const AllPlugins = [
   viewCarouselEditor,
   viewCarouselProperties,
   viewCommentEditor,
   viewCommentProperties,
   viewDataSelectEditor,
   viewDataSelectProperties,
   viewGanttEditor,
   viewGanttProperties,
   viewImageEditor,
   viewImageProperties,
   viewLabelEditor,
   viewLabelProperties,
   viewLayoutEditor,
   viewLayoutProperties,
   viewListProperties,
   viewPdfImporterEditor,
   viewPdfImporterProperties,
   viewTabEditor,
   viewTabProperties,
   viewTextEditor,
   viewTextProperties,
];

export default {
   load: (AB) => {
      AllPlugins.forEach((plugin) => {
         AB.pluginRegister(plugin);
      });
   },
};
