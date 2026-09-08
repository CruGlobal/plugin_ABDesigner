import FNAbviewDetailItemProperties from "./FNAbviewDetailItem.js";

export default function FNAbviewDetailImageProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewDetailItem = FNAbviewDetailItemProperties({
      AB,
      ABViewPropertiesPlugin,
   });

   const BASE_ID = "properties_abview_detail_image";
   const DEFAULT_VALUES = {
      height: 0,
      width: 0,
   };

   class ABViewDetailImageProperty extends ABViewDetailItem {
      constructor() {
         super(BASE_ID, {
            height: "",
            width: "",
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
         return "detailimage";
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
            {
               id: this.ids.width,
               name: "width",
               view: "counter",
               label: this.label("Width"),
               on: {
                  onChange: () => this.onChange(),
               },
            },
         ]);
      }

      ViewClass() {
         return super._ViewClass("detailimage");
      }

      populate(view) {
         super.populate(view);
         const defaults = this.defaultValues();
         const height = view.settings?.height ?? defaults.height;
         $$(this.ids.height).setValue(height);
         const width = view.settings?.width ?? defaults.width;
         $$(this.ids.width).setValue(width);
      }

      defaultValues() {
         const values = super.defaultValues();
         return Object.assign(DEFAULT_VALUES, values);
      }

      values() {
         const values = super.values() ?? {};
         values.settings = values.settings ?? {};
         values.settings.height = $$(this.ids.height).getValue();
         values.settings.width = $$(this.ids.width).getValue();
         return values;
      }
   }

   return ABViewDetailImageProperty;
}
