import viewCarouselProperties from "./web_view_carousel/FNAbviewcarousel.js";
import viewCarouselEditor from "./web_view_carousel/FNAbviewcarouselEditor.js";
import viewCommentProperties from "./web_view_comment/FNAbviewcomment.js";
import viewCommentEditor from "./web_view_comment/FNAbviewcommentEditor.js";
import viewDataSelectProperties from "./web_view_data-select/FNAbviewdataselect.js";
import viewDataSelectEditor from "./web_view_data-select/FNAbviewdataselectEditor.js";
import viewDataviewProperties from "./web_view_dataview/FNAbviewdataview.js";
import viewDataviewEditor from "./web_view_dataview/FNAbviewdataviewEditor.js";
import viewDetailProperties from "./web_view_detail/FNAbviewdetail.js";
import viewDetailEditor from "./web_view_detail/FNAbviewdetailEditor.js";
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
   viewCarouselProperties,
   viewCarouselEditor,
   viewCommentProperties,
   viewCommentEditor,
   viewDataSelectProperties,
   viewDataSelectEditor,
   viewDataviewProperties,
   viewDataviewEditor,
   viewDetailProperties,
   viewDetailEditor,
   viewImageProperties,
   viewImageEditor,
   viewLabelProperties,
   viewLabelEditor,
   viewLayoutProperties,
   viewLayoutEditor,
   viewListProperties,
   viewPdfImporterProperties,
   viewPdfImporterEditor,
   viewTabProperties,
   viewTabEditor,
   viewTextProperties,
   viewTextEditor,
];

export default {
   load: (AB) => {
      AllPlugins.forEach((plugin) => {
         AB.pluginRegister(plugin);
      });
   },
};
