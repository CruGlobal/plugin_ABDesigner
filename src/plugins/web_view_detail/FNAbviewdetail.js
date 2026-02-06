// FNAbviewdetail Properties
// A properties side import for an ABView Detail.
// 仿照 web_view_list/FNAbviewlist.js，为 detail 视图提供属性编辑器
//
export default function FNAbviewdetailProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const BASE_ID = "properties_abview_detail";

   const uiConfig = AB.UISettings.config();
   const L = AB.Label();

   return class ABAbviewdetailProperties extends ABViewPropertiesPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
      }

      constructor() {
         super(BASE_ID, {
            datacollection: "",
            height: "",
         });
         this.AB = AB;
      }

      static get key() {
         return "detail";
      }

      ui() {
         const ids = this.ids;

         return super.ui([
            {
               id: ids.datacollection,
               name: "dataviewID",
               view: "richselect",
               label: L("Data Source"),
               labelWidth: uiConfig.labelWidthLarge,
               on: {
                  onChange: (dcId, oldDcId) => {
                     if (dcId == oldDcId) return;
                     this.onChange();
                  },
               },
            },
            {
               id: ids.height,
               view: "counter",
               name: "height",
               label: L("Height:"),
               labelWidth: uiConfig.labelWidthLarge,
               on: {
                  onChange: () => {
                     this.onChange();
                  },
               },
            },
         ]);
      }

      async init(AB) {
         this.AB = AB;
         await super.init(AB);
      }

      populate(view) {
         super.populate(view);

         const ids = this.ids;

         var dcID = view.settings.dataviewID ? view.settings.dataviewID : null;
         var $dc = $$(ids.datacollection);

         var dcOptions = view.application.datacollectionsIncluded().map((d) => {
            return {
               id: d.id,
               value: d.label,
               icon:
                  d.sourceType == "query" ? "fa fa-filter" : "fa fa-database",
            };
         });
         $dc.define("options", dcOptions);
         $dc.define("value", dcID);
         $dc.refresh();

         $$(ids.height).setValue(
            view.settings.height != null ? view.settings.height : ""
         );
      }

      defaultValues() {
         const ViewClass = this.ViewClass();
         let values = null;
         if (ViewClass) {
            values = ViewClass.defaultValues();
         }
         return values;
      }

      /**
       * @method values
       * return the values for this form.
       * @return {obj}
       */
      values() {
         const ids = this.ids;
         const $component = $$(ids.component);
         const values = super.values();
         values.settings = $component.getValues();
         return values;
      }

      ViewClass() {
         return super._ViewClass("detail");
      }
   };
}
