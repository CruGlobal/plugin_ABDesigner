// FNAbviewkanban Properties
// A properties side import for an ABView.
//
import FABViewKanbanWorkspace from "./Abkanbanworkspace.js";

export default function FNAbviewkanbanProperties({
   AB,
   ABViewPropertiesPlugin,
   ABUIPlugin,
}) {
   const BASE_ID = "properties_abview_kanban";

   const FPopupNewDataField = require("../../rootPages/Designer/ui_work_object_workspace_popupNewDataField").default;
   const FABViewPropertyLinkPage =
      require("../../rootPages/Designer/properties/views/viewProperties/ABViewPropertyLinkPage").default;
   const LinkPagePropertyClass = FABViewPropertyLinkPage(AB, BASE_ID);

   const uiConfig = AB.UISettings.config();
   const L = AB.Label();

   const ViewKanbanProperties = FABViewKanbanWorkspace(AB, ABUIPlugin, BASE_ID);
   let PopupNewDataFieldComponent = null;

   return class ABAbviewkanbanProperties extends ABViewPropertiesPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
      }

      constructor() {
         super(BASE_ID, { datacollection: "" });

         this.AB = AB;
         this.linkPageComponent = new LinkPagePropertyClass();
      }

      static get key() {
         return "kanban";
      }

      ui() {
         let _ui = ViewKanbanProperties.ui();

         let rows = [
            {
               view: "fieldset",
               label: L("Kanban Data:"),
               labelWidth: uiConfig.labelWidthLarge,
               body: {
                  type: "clean",
                  padding: 10,
                  rows: [
                     {
                        id: this.ids.datacollection,
                        view: "richselect",
                        name: "dataviewID",
                        label: L("Data Source:"),
                        placeholder: L("Select a Datacollection"),
                        labelWidth: uiConfig.labelWidthLarge,
                        options: [],
                        on: {
                           onChange: (newv, oldv) => {
                              if (newv != oldv) {
                                 this.refreshFields(newv);
                                 this.onChange();
                              }
                           },
                        },
                     },
                  ],
               },
            },
            ..._ui.rows,
            this.linkPageComponent.ui(),
         ];

         return super.ui(rows);
      }

      async init(AB) {
         this.AB = AB;

         ViewKanbanProperties.on("new.field", (key) => {
            const dc = this.AB.datacollectionByID(
               this.CurrentView.settings.dataviewID
            );
            if (!dc) return;
            PopupNewDataFieldComponent.objectLoad(dc.datasource);
            PopupNewDataFieldComponent.resetState();
            PopupNewDataFieldComponent.show(null, key, false);
         });
         ViewKanbanProperties.on("changed", () => {
            this.onChange();
         });

         PopupNewDataFieldComponent = FPopupNewDataField(
            AB,
            `${BASE_ID}_popupNewDataField`
         );
         await PopupNewDataFieldComponent.init(AB);
         PopupNewDataFieldComponent.on("save", (...params) => {
            ViewKanbanProperties.emit("field.added", params[0]);
         });

         this.linkPageComponent.init();
         this.linkPageComponent.on("changed", () => {
            this.onChange();
         });

         await super.init(AB);
      }

      populate(view) {
         super.populate(view);

         const listDC = view.application.datacollectionsIncluded().map((d) => {
            return {
               id: d.id,
               value: d.label,
               icon:
                  d.sourceType == "query" ? "fa fa-filter" : "fa fa-database",
            };
         });

         let $dc = $$(this.ids.datacollection);
         let dcID = view.settings.dataviewID || null;
         $dc.blockEvent();
         $dc.define("options", listDC);
         $dc.define("value", dcID);
         $dc.unblockEvent();
         $dc.refresh();
         this.refreshFields(dcID);

         this.linkPageComponent.viewLoad(view);
         this.linkPageComponent.setSettings(view.settings);
      }

      refreshFields(dcID) {
         let dc = this.AB.datacollectionByID(dcID);
         if (!dc) {
            ViewKanbanProperties.clearValues();
            return;
         }

         let obj = dc.datasource;
         ViewKanbanProperties.init(obj, this.CurrentView);
         PopupNewDataFieldComponent?.objectLoad(obj);
      }

      values() {
         const values = super.values();

         const ids = this.ids;
         const $component = $$(ids.component);

         values.settings = $component.getValues();

         let fields = ViewKanbanProperties.values();
         Object.keys(fields).forEach((f) => {
            values.settings[f] = fields[f];
         });

         const linkSettings = this.linkPageComponent.getSettings();
         for (const key in linkSettings) {
            values.settings[key] = linkSettings[key];
         }

         return values;
      }

      ViewClass() {
         return super._ViewClass("kanban");
      }
   };
}
