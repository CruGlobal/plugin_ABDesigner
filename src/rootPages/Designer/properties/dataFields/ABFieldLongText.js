/*
 * ABFieldLongText
 * A Property manager for our ABFieldLongText.
 */

import FFieldClass from "./ABField";

export default function (AB) {
   const uiConfig = AB.Config.uiSettings();

   const ABField = FFieldClass(AB);
   const L = ABField.L();

   class ABFieldLongText extends ABField {
      constructor(ibase = "properties_abfield") {
         super(`${ibase}_longtext`, {
            default: "",
            defaultCheckbox: "",
            maxLength: "",  // <-- 新增 ID
         });
      }

      ui() {
         const ids = this.ids;

         return super.ui([
            {
               view: "layout",
               cols: [
                  {
                     view: "label",
                     label: L("Default Value:"),
                     align: "right",
                     width: 100,
                  },
                  {
                     id: ids.defaultCheckbox,
                     view: "checkbox",
                     width: 30,
                     value: 0,
                     on: {
                        onChange: (newv) => {
                           this.checkboxDefaultValue(newv);
                        },
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
                  {
                     id: ids.default,
                     view: "text",
                     name: "default",
                     placeholder: L("Enter default value"),
                     disabled: true,
                     labelWidth: uiConfig.labelWidthXLarge,
                     on: {
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
               ],
            },
            {
               view: "layout",
               cols: [
                  {
                     view: "label",
                     label: L("Max Length:"),
                     align: "right",
                     width: 100,
                  },
                  {
                     id: ids.maxLength,
                     view: "counter",
                     name: "maxLength",
                     min: 1,
                     max: 10000,
                     step: 1,
                     labelWidth: uiConfig.labelWidthXLarge,
                     placeholder: L("Optional limit"),
                     on: {
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
               ],
            },
            {
               view: "checkbox",
               name: "supportMultilingual",
               disallowEdit: true,
               labelRight: L("Support multilingual"),
               labelWidth: uiConfig.labelWidthCheckbox,
               value: false,
               on: {
                  onAfterRender: function () {
                     ABField.CYPRESS_REF(this);
                  },
               },
            },
         ]);
      }

      FieldClass() {
         return super._FieldClass("LongText");
      }

      populate(field) {
         super.populate(field);

         const value = field.settings.default === "" ? 0 : 1;
         $$(this.ids.defaultCheckbox).setValue(value);
         $$(this.ids.default).setValue(field.settings.default || "");

         // 新增：设置 maxLength 值
         if (field.settings.maxLength) {
            $$(this.ids.maxLength).setValue(field.settings.maxLength);
         }
      }

      show() {
         super.show();
         $$(this.ids.defaultCheckbox).setValue(0);
         $$(this.ids.default).setValue("");
         $$(this.ids.default).disable();

         // 新增：清空 maxLength
         $$(this.ids.maxLength).setValue("");
      }

      checkboxDefaultValue(state) {
         if (state == 0) {
            $$(this.ids.default).disable();
            $$(this.ids.default).setValue("");
         } else {
            $$(this.ids.default).enable();
         }
      }

      values() {
         const values = super.values();

         values.default = $$(this.ids.defaultCheckbox).getValue()
            ? $$(this.ids.default).getValue()
            : "";

         // 加入 maxLength 保存
         values.maxLength = parseInt($$(this.ids.maxLength).getValue()) || null;

         return values;
      }
   }

   return ABFieldLongText;
}
