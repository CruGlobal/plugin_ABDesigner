import FNAbviewformItem from "./FNAbviewformItem.js";

/*
 * ABViewFormSelectMultiple
 * A Property manager for our ABViewFormSelectMultiple definitions
 */

export default function FNAbviewFormSelectMultipleProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const ABViewFormItem = FNAbviewformItem({ AB, ABViewPropertiesPlugin });

   const BASE_ID = "properties_abview_form_select_multiple";

   const L = AB.Label();

   class ABViewFormSelectMultipleProperty extends ABViewFormItem {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
      }
      constructor() {
         super(BASE_ID, {
            // Put our ids here
            type: "",
         });

         this.AB = AB;
      }

      static get key() {
         return "selectmultiple";
      }

      ui() {
         const ids = this.ids;

         return super.ui([
            {
               id: ids.type,
               name: "type",
               view: "richselect",
               label: L("Type"),
               options: [
                  {
                     id: "multicombo",
                     value: L("Multi Combo"),
                  },
                  {
                     id: "checkbox",
                     value: L("Checkboxes"),
                  },
               ],
               on: {
                  onChange: () => this.onChange(),
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
         const ABViewFormSelectMultiplePropertyComponentDefaults =
            this.defaultValues();

         $$(ids.type).setValue(
            view.settings.type ||
               ABViewFormSelectMultiplePropertyComponentDefaults.type
         );
      }

      /**
       * @method values
       * return the values for this form.
       * @return {obj}
       */
      values() {
         const ids = this.ids;

         const $component = $$(ids.component);

         const values = super.values() ?? {};
         values.settings = $component.getValues() ?? {};
         values.settings.type = $$(ids.type).getValue();

         return values;
      }

      /**
       * @method FieldClass()
       * A method to return the proper ABViewXXX Definition.
       * NOTE: Must be overwritten by the Child Class
       */
      ViewClass() {
         return super._ViewClass("selectmultiple");
      }
   }

   return ABViewFormSelectMultipleProperty;
}
