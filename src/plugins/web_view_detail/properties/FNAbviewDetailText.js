import FNAbviewDetailItemProperties from "./FNAbviewDetailItem.js";

export default function FNAbviewDetailTextProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewDetailItem = FNAbviewDetailItemProperties({
      AB,
      ABViewPropertiesPlugin,
   });

   const BASE_ID = "properties_abview_detail_text";
   const DEFAULT_VALUES = {
      height: 0,
   };

   class ABViewDetailTextProperty extends ABViewDetailItem {
      constructor() {
         super(BASE_ID, {
            height: "",
         });

         this.AB = AB;
      }

      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
      }

      static get key() {
         return "detailtext";
      }

      ui() {
         return super.ui([
            {
               id: this.ids.height,
               name: "height",
               view: "counter",
               label: this.label("Height"),
               on: {
                  onChange: () => this.onChange(),
               },
            },
         ]);
      }

      ViewClass() {
         return super._ViewClass("detailtext");
      }

      populate(view) {
         super.populate(view);
         const defaults = this.defaultValues();
         const height = view.settings?.height ?? defaults.height;
         $$(this.ids.height).setValue(height);
      }

      defaultValues() {
         const values = super.defaultValues();
         return Object.assign(DEFAULT_VALUES, values);
      }

      values() {
         const values = super.values() ?? {};
         values.settings = values.settings ?? {};
         values.settings.height = $$(this.ids.height).getValue();
         return values;
      }
   }

   return ABViewDetailTextProperty;
}
