/*
 * UIProcessTaskServiceTLReportsEmail
 *
 * Display the form for entering the properties of a
 * "Team Leader Reports Email" task: email every Team Leader the RC Balances
 * and Budget vs. Actual reports of a fiscal period.
 *
 * @return {ClassUI} The Class Definition for this UI widget.
 */
import ABProcessTaskServiceAccounting from "./_ABProcessTaskServiceAccounting";

export default function (AB) {
   const ProcessAccounting = ABProcessTaskServiceAccounting(AB);
   const L = ProcessAccounting.L();
   const uiConfig = AB.Config.uiSettings();

   class ABProcessTaskServiceTLReportsEmail extends ProcessAccounting {
      constructor() {
         super("properties_process_service_tl_reports_email", {
            form: "",

            label: "",
            processFPValue: "",
            objectFP: "",
            sendTo: "",
            from: "",
         });

         this.element = null;
      }

      static get key() {
         return "TLReportsEmail";
      }

      ui() {
         const ids = this.ids;

         return {
            id: ids.form,
            view: "form",
            elementsConfig: {
               labelWidth: uiConfig.labelWidthXXLarge,
            },
            elements: [
               {
                  id: ids.label,
                  view: "text",
                  label: L("Name"),
                  name: "label",
               },
               {
                  id: ids.processFPValue,
                  view: "select",
                  label: L("Process Fiscal Period Value"),
                  name: "processFPValue",
                  options: [],
               },
               {
                  id: ids.objectFP,
                  view: "select",
                  label: L("FP Object"),
                  name: "objectFP",
                  options: [],
               },
               {
                  id: ids.sendTo,
                  view: "text",
                  label: L("Send all emails to (testing)"),
                  placeholder: L("leave empty to email each Team Leader"),
                  name: "sendTo",
               },
               {
                  id: ids.from,
                  view: "text",
                  label: L("From"),
                  placeholder: "noreply@l2d.biz",
                  name: "from",
               },
            ],
         };
      }

      populate(element) {
         const ids = this.ids;

         const processValues = (
            element?.process?.processDataFields(element) ?? []
         ).map((item) => {
            return {
               id: item.key,
               value: item.label,
            };
         });
         processValues.unshift({ value: L("Select a Process Value") });

         const objectList = (
            this.CurrentApplication?.objectsIncluded() ?? []
         ).map((o) => {
            return { id: o.id, value: o.label || o.name };
         });
         objectList.unshift({ value: L("Select an Object") });

         this._updateFieldOptions([ids.processFPValue], processValues);
         this._updateFieldOptions([ids.objectFP], objectList);

         // Set values
         $$(ids.label).setValue(element.label);
         element.defaults.settings.forEach((setting) => {
            const val = element[setting] == 0 ? "" : element[setting];
            $$(ids[setting]).setValue(val ?? "");
         });
      }

      values() {
         const ids = this.ids;
         return $$(ids.form).getValues();
      }
   }

   return ABProcessTaskServiceTLReportsEmail;
}
