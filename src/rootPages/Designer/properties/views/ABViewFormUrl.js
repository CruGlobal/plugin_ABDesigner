/*
 * ABViewForm
 * A Property manager for our ABViewForm definitions
 */
import FCommonKeyValue from "../../ui_common_key_value";
import FABViewForm from "./ABViewForm";

export default function (AB) {
   const UIClassCommonKeyValue = FCommonKeyValue(AB);
   const ABViewForm = FABViewForm(AB);
   const uiConfig = AB.Config.uiSettings();
   const L = ABViewForm.L();

   const base = "properties_abview_form_url";

   class ABViewFormUrlProperty extends ABViewForm {
      constructor() {
         super(base, {
            method: "",
            url: "",
            headers: "",
         });

         this.AB = AB;

         this.UIKeyValues = new UIClassCommonKeyValue({
            title: L("Headers"),
            keyTitle: L("Key"),
            valueTitle: L("Value"),
            // contextID: base || randomID(),
         });
      }

      static get key() {
         return "form-url";
      }

      ui() {
         let ids = this.ids;

         return super.ui([
            {
               view: "fieldset",
               label: L("URL:"),
               labelWidth: uiConfig.labelWidthLarge,
               body: {
                  type: "clean",
                  padding: 10,
                  rows: [
                     {
                        id: ids.method,
                        view: "richselect",
                        name: "urlMethod",

                        label: L("Method"),
                        labelWidth: uiConfig.labelWidthLarge,
                        options: [
                           {
                              id: "get",
                              value: L("GET"),
                           },
                           {
                              id: "post",
                              value: L("POST"),
                           },

                           {
                              id: "put",
                              value: L("PUT"),
                           },
                           {
                              id: "delete",
                              value: L("DELETE"),
                           },
                        ],
                        on: {
                           onChange: () => {
                              this.onChange();
                           },
                        },
                     },
                     {
                        id: ids.url,
                        view: "text",
                        label: L("URL"),
                        name: "url",
                        value: "",
                        on: {
                           onChange: () => {
                              this.onChange();
                           },
                        },
                     },
                     this.UIKeyValues.ui(),
                  ],
               },
            },
         ]);
      }

      populate(view) {
         super.populate(view);
         let ids = this.ids;
         if (!view) return;

         var methodSelector = $$(ids.method);
         methodSelector.define("value", view.settings?.method || "get");
         methodSelector.refresh();
         methodSelector.enable();

         $$(ids.url).setValue(view.settings.url);

         this.UIKeyValues.populate(view.settings?.headers || []);
      }

      defaultValues() {
         let values = {};
         var ViewClass = this.ViewClass();
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
         let ids = this.ids;
         let vals = super.values();

         vals.settings = vals.settings || {};

         vals.settings.method = $$(ids.method).getValue();
         vals.settings.url = $$(ids.url).getValue();

         vals.headers = this.UIKeyValues.getValues();
         return vals;
      }

      /**
       * @method FieldClass()
       * A method to return the proper ABViewXXX Definition.
       * NOTE: Must be overwritten by the Child Class
       */
      ViewClass() {
         return super._ViewClass("form-url");
      }
   }

   return ABViewFormUrlProperty;
}
