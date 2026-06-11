// Abkanbanworkspace.js
//
// Manages the settings for a KanBan View in the Object Workspace

let classABViewKanban = null;

export default function (AB, ABUIPlugin, ibase) {
   const L = AB.Label();

   const ABFieldConnect = AB.Class.ABFieldManager.fieldByKey("connectObject");
   const ABFieldList = AB.Class.ABFieldManager.fieldByKey("list");
   const ABFieldUser = AB.Class.ABFieldManager.fieldByKey("user");

   if (!classABViewKanban) {
      classABViewKanban = class ABViewKanban extends ABUIPlugin {
         constructor(idBase) {
            super(idBase, {
               vGroupInput: "",
               hGroupInput: "",
               ownerInput: "",
            });

            this.on("field.added", (field) => {
               this.refreshOptions(this.CurrentObject, this._view);
               if (this._autoSelectInput) {
                  $$(this._autoSelectInput)?.setValue(field.id);
               }
            });

            this._autoSelectInput = null;
         }

         type() {
            return "kanban";
         }

         icon() {
            return "fa fa-columns";
         }

         refreshOptions(object, view, options = {}) {
            let ids = this.ids;

            const initSelect = (
               $option,
               attribute,
               filter = (f) => f.key === ABFieldList.defaults().key,
               isRequired
            ) => {
               if ($option == null || object == null) return;

               const fieldOptions = object
                  .fields()
                  .filter(filter)
                  .map(({ id, label }) => ({ id, value: label }));
               if (!isRequired && fieldOptions.length) {
                  fieldOptions.unshift({
                     id: "none",
                     value: L("None"),
                  });
               }
               $option.define("options", fieldOptions);

               if (view) {
                  if (view.settings[attribute]) {
                     $option.define("value", view.settings[attribute]);
                  } else if (!isRequired && fieldOptions[0]) {
                     $option.define("value", fieldOptions[0].id);
                  }
               } else if (fieldOptions.filter((o) => o.id).length === 1) {
                  $option.define("value", fieldOptions[0].id);
               }

               $option.refresh();
            };

            const verticalGroupingFieldFilter = (field) =>
               [
                  ABFieldList.defaults().key,
                  ABFieldUser.defaults().key,
               ].includes(field.key);

            const horizontalGroupingFieldFilter = (field) =>
               [
                  ABFieldConnect.defaults().key,
                  ABFieldList.defaults().key,
                  ABFieldUser.defaults().key,
               ].includes(field.key);

            initSelect(
               options.vGroupInput || $$(ids.vGroupInput),
               "verticalGroupingField",
               verticalGroupingFieldFilter,
               true
            );
            initSelect(
               options.hGroupInput || $$(ids.hGroupInput),
               "horizontalGroupingField",
               horizontalGroupingFieldFilter,
               false
            );
            initSelect(
               options.ownerInput || $$(ids.ownerInput),
               "ownerField",
               (f) => {
                  return (
                     f.key === ABFieldUser.defaults().key ||
                     (f.key === ABFieldConnect.defaults().key &&
                        f.settings.linkType == "one" &&
                        f.settings.linkViaType == "many")
                  );
               },
               false
            );
         }

         ui() {
            let ids = this.ids;
            return {
               batch: "kanban",
               rows: [
                  {
                     cols: [
                        {
                           id: ids.vGroupInput,
                           view: "richselect",
                           label: `<span style="opacity: 0.6;" class='webix_icon fa fa-columns'></span> ${L(
                              "Vertical Grouping"
                           )}`,
                           placeholder: L("Select a field"),
                           labelWidth: 180,
                           name: "verticalGroupingField",
                           required: true,
                           options: [],
                           on: {
                              onChange: () => {
                                 $$(ids.vGroupInput).validate();
                                 $$(ids.hGroupInput).validate();
                                 this.emit("changed");
                              },
                           },
                           invalidMessage: L("Required"),
                        },
                        {
                           view: "button",
                           css: "webix_primary",
                           type: "icon",
                           icon: "fa fa-plus",
                           label: "",
                           width: 30,
                           click: () => {
                              this._autoSelectInput = ids.vGroupInput;
                              this.emit(
                                 "new.field",
                                 ABFieldList.defaults().key
                              );
                           },
                        },
                     ],
                  },
                  {
                     cols: [
                        {
                           id: ids.hGroupInput,
                           view: "richselect",
                           label: `<span style="opacity: 0.6;"class='webix_icon fa fa-list'></span> ${L(
                              "Horizontal Grouping"
                           )}`,
                           placeholder: L("Select a field"),
                           labelWidth: 180,
                           name: "horizontalGroupingField",
                           required: false,
                           options: [],
                           invalidMessage: L(
                              "Cannot be the same as vertical grouping field"
                           ),
                           validate: (value) => {
                              const vGroupValue = $$(
                                 ids.vGroupInput
                              ).getValue();
                              return (
                                 !vGroupValue || !value || vGroupValue !== value
                              );
                           },
                           on: {
                              onChange: () => {
                                 $$(ids.hGroupInput).validate();
                                 this.emit("changed");
                              },
                           },
                        },
                        {
                           view: "button",
                           css: "webix_primary",
                           type: "icon",
                           icon: "fa fa-plus",
                           label: "",
                           width: 30,
                           click: () => {
                              this._autoSelectInput = ids.hGroupInput;
                              this.emit(
                                 "new.field",
                                 ABFieldList.defaults().key
                              );
                           },
                        },
                     ],
                  },
                  {
                     cols: [
                        {
                           id: ids.ownerInput,
                           view: "richselect",
                           label: `<span style="opacity: 0.6;" class='webix_icon fa fa-user-circle'></span> ${L(
                              "Card Owner"
                           )}`,
                           placeholder: L("Select a user field"),
                           labelWidth: 180,
                           name: "ownerField",
                           options: [],
                           on: {
                              onChange: (newID, oldID) => {
                                 if (newID == oldID) return;
                                 this.emit("changed");
                              },
                           },
                        },
                        {
                           view: "button",
                           css: "webix_primary",
                           type: "icon",
                           icon: "fa fa-plus",
                           label: "",
                           width: 30,
                           click: () => {
                              this._autoSelectInput = ids.ownerInput;
                              this.emit(
                                 "new.field",
                                 ABFieldConnect.defaults().key
                              );
                           },
                        },
                     ],
                  },
               ],
            };
         }

         init(object, view) {
            this.objectLoad(object);
            this._view = view;
            this.refreshOptions(object, view);
         }

         clearValues() {
            const ids = this.ids;
            let idFields = [ids.vGroupInput, ids.hGroupInput, ids.ownerInput];
            idFields.forEach((id) => {
               let $o = $$(id);
               $o.blockEvent();
               $o.define("value", null);
               $o.unblockEvent();
               $o.refresh();
            });
         }

         values() {
            let ids = this.ids;
            let result = {};
            result.verticalGroupingField =
               $$(ids.vGroupInput).getValue() || null;
            result.horizontalGroupingField =
               $$(ids.hGroupInput).getValue() || null;
            result.ownerField = $$(ids.ownerInput).getValue() || null;

            return result;
         }
      };
   }

   return new classABViewKanban(ibase);
}
