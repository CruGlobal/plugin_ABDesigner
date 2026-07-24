export default function FNAbviewchartpieProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const uiConfig = AB.Config.uiSettings();
   const L = AB.Label();

   const BASE_ID = "properties_abview_chart_pie";

   return class ABAbviewchartpieProperties extends ABViewPropertiesPlugin {
      static getPluginKey() {
         return "pie";
      }

      static getPluginType() {
         return "properties-view";
      }

      constructor() {
         super(BASE_ID, {});

         this.AB = AB;
      }

      static get key() {
         return "pie";
      }

      ui() {
         return super.ui([
            {
               name: "pieType",
               view: "richselect",
               label: L("Chart Type"),
               labelWidth: uiConfig.labelWidthLarge,
               options: [
                  {
                     id: "pie",
                     value: L("Standard"),
                  },
                  {
                     id: "pie3D",
                     value: L("Pie3D"),
                  },
                  {
                     id: "donut",
                     value: L("Donut"),
                  },
               ],
               on: {
                  onChange: () => {
                     this.onChange();
                  },
               },
            },
            {
               name: "height",
               view: "counter",
               min: 1,
               label: L("Height"),
               on: {
                  onChange: () => {
                     this.onChange();
                  },
               },
            },
            {
               name: "innerFontSize",
               view: "counter",
               min: 1,
               label: L("Inner Font Size"),
               labelWidth: uiConfig.labelWidthXLarge,
               on: {
                  onChange: () => {
                     this.onChange();
                  },
               },
            },
            {
               name: "labelFontSize",
               view: "counter",
               min: 1,
               label: L("Label Font Size"),
               labelWidth: uiConfig.labelWidthXLarge,
               on: {
                  onChange: () => {
                     this.onChange();
                  },
               },
            },
            {
               name: "isLegend",
               view: "checkbox",
               labelRight: L("Show Legend"),
               labelWidth: uiConfig.labelWidthCheckbox,
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

         const $component = $$(this.ids.component);
         const defaultValues = this.defaultValues();
         const values = Object.assign(
            $component.getValues(),
            Object.assign(defaultValues, view.settings)
         );

         $component.setValues(values);
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
         const values = super.values();

         values.settings = Object.assign(
            $$(this.ids.component).getValues(),
            values.settings
         );

         return values;
      }

      /**
       * @method FieldClass()
       * A method to return the proper ABViewXXX Definition.
       * NOTE: Must be overwritten by the Child Class
       */
      ViewClass() {
         return super._ViewClass("pie");
      }
   };
}
