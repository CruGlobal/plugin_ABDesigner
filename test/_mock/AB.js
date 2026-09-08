import { EventEmitter } from "events";

function noopProxy() {
   return new Proxy(
      function () { },
      {
         get: () => () => { },
         apply: () => { },
      }
   );
}

class SortPopup extends EventEmitter {
   constructor(/* ibase */) {
      super();
   }

   init() {
      return Promise.resolve();
   }
}

export default class AB {
   constructor(definitions) {
      this._definitions = definitions || {};
      this.applications = {};

      this.custom = {
         editunitlist: {
            view: "editunitlist",
         },
      };

      this.Class = {
         ABFieldManager: {
            allFields: () => { },
            fieldByKey: () => undefined,
         },
         ABProcessTaskManager: {
            allTasks: () => [
               {
                  defaults: () => ({ key: "TimerStartEvent" }),
               },
            ],
         },
         SortPopup,
      };
      this.ClassUI = ClassUI;
      this.Config = new Config();
      this.Multilingual = Multilingual;
      this.UISettings = {
         config: () => ({}),
      };
      this.Account = {
         isSystemDesigner: () => false,
      };
   }

   Label() {
      return (key) => key;
   }

   getPluginAPI() {
      return { AB: this };
   }

   filterComplexNew(/* id */) {
      return noopProxy();
   }

   datacollectionByID() {
      return undefined;
   }

   applicationByID(id) {
      return this.applications[id];
   }

   objectByID() {
      return undefined;
   }

   queryByID() {
      return undefined;
   }

   processByID() {
      return undefined;
   }

   processNew(values) {
      return Promise.resolve({
         save: () => Promise.resolve(),
         ...values,
      });
   }

   datacollectionNew(values) {
      return {
         init: () => { },
         isValid: () => ({ fail: () => false }),
         save: () => Promise.resolve(values),
         filterCondition: () => { },
         reloadData: () => { },
         fromValues: () => { },
         datasource: null,
         ...values,
      };
   }

   plugins() {
      return [];
   }

   jobID() {
      return "test-job-id";
   }
}

class ClassUI extends EventEmitter {
   constructor(base, ids) {
      super();
      this.ids = {};
      if (typeof base == "string") {
         this.ids.component = base;
      }
      if (ids && typeof ids == "object") {
         Object.keys(ids).forEach((k) => {
            this.ids[k] = `${base}_${ids[k] || k}`;
         });
      } else if (typeof base == "object" && base !== null && !ids) {
         this.ids = base;
      }
   }

   static CYPRESS_REF() { }
}

class Config {
   uiSettings() {
      return {};
   }
}

class Multilingual {
   static labelPlugin(...params) {
      this._params = params;
   }
}
