// FNViewLabel Properties
// A properties side import for an ABView.
//
export default function FNViewLabelProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   return class ABViewLabelProperties extends ABViewPropertiesPlugin {
      constructor() {
         super(ABViewLabelProperties.getPluginKey(), {
            text: "",
            format: "",
            alignment: "",
         });
         this.AB = AB;
      }


      static getPluginKey() {
         return "label";
      }

      static getPluginType() {
         return "properties-view";
         // properties-view : will display in the properties panel of the ABDesigner
      }

      defaultValues() {
         let values = {
            format: 0,
            alignment: "left"
         };
         return values;
      }

      ui() {
         const ids = this.ids;
         let L = this.AB.Label();
         const defaultValues = this.defaultValues();
         let initial_text = this.view?.settings?.text || "";
         return super.ui([
            // .text :  The Text displayed for this label
            {
               id: ids.text,
               view: "text",
               name: initial_text || "text",
               label: L("Text"),
               placeholder: L("Text Placeholder"),
               on: {
                  onChange: (newValue, oldValue) => {
                     if (newValue !== oldValue) {
                        const baseView = this.CurrentView;

                        baseView.text = newValue;

                        baseView.save();
                        this.onChange();
                     }
                  },
               },
            },
            {
               view: "fieldset",
               label: L("Format Options:"),
               body: {
                  type: "clean",
                  padding: 10,
                  rows: [
                     {
                        id: ids.format,
                        view: "radio",
                        name: "format",
                        vertical: true,
                        value: defaultValues.format,
                        options: [
                           {
                              id: 0,
                              value: L("normal"),
                           },
                           {
                              id: 1,
                              value: L("title"),
                           },
                           {
                              id: 2,
                              value: L("description"),
                           },
                        ],
                        on: {
                           onChange: () => {
                              this.onChange();
                           },
                        },
                     },
                  ],
               },
            },
            {
               view: "fieldset",
               label: L("Alignment:"),
               body: {
                  type: "clean",
                  padding: 10,
                  rows: [
                     {
                        id: ids.alignment,
                        view: "radio",
                        name: "alignment",
                        vertical: true,
                        value: defaultValues.alignment,
                        options: [
                           {
                              id: "left",
                              value: L("Left"),
                           },
                           {
                              id: "center",
                              value: L("Center"),
                           },
                           {
                              id: "right",
                              value: L("Right"),
                           },
                        ],
                        on: {
                           onChange: () => {
                              this.onChange();
                           },
                        },
                     },
                  ],
               },
            },
            {},
         ]);
      }

      async init(AB) {
         this.AB = AB;
         await super.init(AB);
      }

      /**
       * @method populate
       * populate the properties with the values from the view.
       * @param {obj} view
       */
      populate(view) {
         super.populate(view);
         const ids = this.ids;

         $$(ids.text).setValue(view.text);
         $$(ids.format).setValue(view.settings.format);
         $$(ids.alignment).setValue(view.settings.alignment);
      }

      /**
       * @method values
       * return the values from the property editor
       * @return {obj}
       */
      values() {
         const values = super.values();

         const ids = this.ids;
         const $component = $$(ids.component);
         values.settings = $component.getValues();
         values.text = values.settings.text;

         return values;
      }

      /**
       * @method fromValues()
       *
       * initialze this object with the given set of values.
       * @param {obj} values
       */
      fromValues(values) {
         super.fromValues(values);

         this.settings = this.settings || {};

         // convert from "0" => 0
         this.settings.height = parseInt(
            this.settings.height || ABViewTextPropertyComponentDefaults.height
         );

         // if this is being instantiated on a read from the Property UI,
         this.text = values.text || ABViewTextPropertyComponentDefaults.text;

         // NOTE: ABView auto translates/untranslates "label"
         // add in any additional fields here:
         this.translate(this, this, ["text"]);
      }
      /**
       * @method FieldClass()
       * A method to return the proper ABViewXXX Definition.
       * NOTE: Must be overwritten by the Child Class
       */
      ViewClass() {
         return super._ViewClass("label");
      }
   };
}

