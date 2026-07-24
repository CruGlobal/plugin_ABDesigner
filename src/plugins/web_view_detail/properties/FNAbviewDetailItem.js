export default function FNAbviewDetailItemProperties({
   AB,
   ABViewPropertiesPlugin,
}) {
   const L = AB.Label();

   class ABViewDetailItemProperty extends ABViewPropertiesPlugin {
      static getPluginKey() {
         return this.key;
      }

      static getPluginType() {
         return "properties-view";
      }

      static get key() {
         return "detailitem";
      }

      constructor(BASE_ID, ids = {}) {
         super(
            BASE_ID ?? "properties_abview_detail_item",
            Object.assign(ids, {
               // Put our ids here
               field: "",
            })
         );

         this.AB = AB;
      }

      ui(elements = [], rules = {}) {
         const ids = this.ids;
         const _ui = [
            {
               id: ids.field,
               name: "fieldLabel",
               view: "text",
               disabled: true,
               label: L("Field"),
            },
         ].concat(elements);

         return super.ui(_ui, rules);
      }

      populate(view) {
         super.populate(view);

         const [field] = this.AB.objectByID(view.settings.objectId).fields(
            (f) => f.id == view.settings.fieldId
         );

         $$(this.ids.field).setValue(field ? field.label : "");
      }

      defaultValues() {
         const ViewClass = this.ViewClass();

         let values = {};

         if (ViewClass) {
            values = ViewClass.defaultValues();
         }

         return values;
      }
   }

   return ABViewDetailItemProperty;
}
