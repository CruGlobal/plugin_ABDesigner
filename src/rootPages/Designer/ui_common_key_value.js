/*
 * ui_common_key_value
 *
 * A common UI element for entering key/value pairs.
 *
 */
import UI_Class from "./ui_class";

var myClass = null;
// {singleton}
// we will want to call this factory fn() repeatedly in our imports,
// but we only want to define 1 Class reference.

export default function (AB) {
   if (!myClass) {
      const UIClass = UI_Class(AB);
      var L = UIClass.L();

      myClass = class ABCommonKeyValue extends UIClass {
         constructor({ title, keyTitle, valueTitle, contextID = null }) {
            var idBase = "abd_common_key_value";
            if (contextID) {
               idBase += `_${contextID}`;
            }
            super(idBase, {
               kvlist: "",
            });

            this.title = title || L("Key/Value Pairs");
            this.keyTitle = keyTitle || L("Key");
            this.valueTitle = valueTitle || L("Value");
         }

         ui() {
            return {
               id: this.ids.component,
               view: "layout",
               padding: 10,
               rows: [
                  {
                     padding: 0,
                     cols: [
                        {
                           label: this.title,
                           view: "label",
                           padding: 0,
                           height: 0,
                        },
                        {
                           icon: "wxi-plus",
                           view: "icon",
                           padding: 0,
                           width: 38,
                           click: () => {
                              this._addHeaderItem($$(this.ids.kvlist));
                           },
                        },
                     ],
                  },
                  {
                     view: "scrollview",
                     scroll: "y",
                     borderless: true,
                     padding: 0,
                     margin: 0,
                     body: {
                        id: this.ids.kvlist,
                        view: "layout",
                        padding: 0,
                        margin: 0,
                        rows: [],
                     },
                  },
               ],
            };
         }

         async init(/*AB, options */) {
            // options = options || {};
         }

         _addHeaderItem($container) {
            const uiItem = this._headerItem($container);
            $container.addView(uiItem);
         }

         _headerItem($container, key, value) {
            return {
               cols: [
                  {
                     placeholder: this.keyTitle,
                     view: "text",
                     value: key,
                  },
                  {
                     placeholder: this.valueTitle,
                     view: "text",
                     suggest: this._getSecretValues().map(
                        (secret) => `SECRET:${secret.name}`
                     ),
                     value: value,
                  },
                  {
                     icon: "wxi-trash",
                     view: "icon",
                     width: 38,
                     click: function () {
                        const $item = this.getParentView();
                        $container.removeView($item);
                     },
                  },
               ],
            };
         }

         show() {
            $$(this.ids.component)?.show();
         }

         hide() {
            $$(this.ids.component)?.hide();
         }

         populate(values) {
            this.formClear();

            if (!values || !Array.isArray(values)) {
               return;
            }

            const $kvlist = $$(this.ids.kvlist);
            values.forEach((item) => {
               if (item.key && item.value) {
                  const uiItem = this._headerItem(
                     $kvlist,
                     item.key,
                     item.value
                  );
                  $kvlist.addView(uiItem);
               }
            });
         }

         formClear() {
            const $kvlist = $$(this.ids.kvlist);
            this.AB.Webix.ui([], $kvlist);
         }

         getValues() {
            const values = [];

            // Request's headers
            const $kvlist = $$(this.ids.kvlist);
            values.headers = values.headers ?? [];
            $kvlist?.getChildViews().forEach((item) => {
               let children = item.getChildViews();
               const $key = children[0];
               const $value = children[1];
               const key = $key.getValue();
               const value = $value.getValue();

               if (key != null && value != null)
                  values.push({
                     key,
                     value,
                  });
            });

            return values;
         }
      };
   }

   // NOTE: return JUST the class definition.
   return myClass;
}
