// FNAbviewdataview Properties
// A properties side import for an ABView.
//

import FNAbviewdetailProperties from "../view_detail/FNAbviewdetail.js";

export default function FNAbviewdataviewProperties({
   AB,
   FABViewContainer,
   FABViewPropertyLinkPage,
}) {
   const base = "properties_abview_dataview";

   const ABViewDetailProperties = FNAbviewdetailProperties({
      AB,
      FABViewContainer,
   });

   const LinkPageHelper = FABViewPropertyLinkPage(AB, base);
   const uiConfig = AB.Config.uiSettings();
   const L = ABViewDetailProperties.L();

   let ABViewDataviewPropertyComponentDefaults = {};

   return class ABAbviewdataviewProperties extends ABViewDetailProperties {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
         // properties-view : will display in the properties panel of the ABDesigner
      }

      constructor() {
         super(base, {
            // Put our ids here
            xCount: "",
         });

         this.AB = AB;
         ABViewDataviewPropertyComponentDefaults =
            this.AB.ClassManager.viewClass("dataview").defaultValues();

         this.linkPageComponent = new LinkPageHelper();
      }

      static get key() {
         return "dataview";
      }

      ui() {
         const ids = this.ids;

         return super.ui([
            {
               id: ids.xCount,
               view: "counter",
               name: "xCount",
               min: 1, // we cannot have 0 columns per row so lets not accept it
               label: L("Items in a row"),
               labelWidth: uiConfig.labelWidthLarge,
               step: 1,
               on: {
                  onChange: () => {
                     this.onChange();
                  },
               },
            },
            this.linkPageComponent.ui(),
         ]);
      }

      async init(AB) {
         await super.init(AB);

         await this.linkPageComponent.init(AB);
         this.linkPageComponent.on("changed", () => {
            this.onChange();
         });
      }

      populate(view) {
         super.populate(view);
         if (!view) return;

         const ids = this.ids;

         $$(ids.xCount).setValue(
            view.settings.xCount ||
               ABViewDataviewPropertyComponentDefaults.xCount,
         );

         this.linkPageComponent.viewLoad(view);
         this.linkPageComponent.setSettings(view.settings);
      }

      defaultValues() {
         let values = {};
         const ViewClass = this.ViewClass();
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
         let vals = super.values();

         vals.settings = vals.settings ?? {};
         vals.settings.xCount = $$(ids.xCount).getValue();

         let linkSettings = this.linkPageComponent.getSettings();
         for (let key in linkSettings) {
            vals.settings[key] = linkSettings[key];
         }

         return vals;
      }

      /**
       * @method FieldClass()
       * A method to return the proper ABViewXXX Definition.
       * NOTE: Must be overwritten by the Child Class
       */
      ViewClass() {
         return super._ViewClass("dataview");
      }
   };
}
