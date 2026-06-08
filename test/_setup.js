import Module from "module";
import { JSDOM } from "jsdom";
import webix from "./_mock/webix";
import webixElement from "./_mock/webix_element";

const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
   if (request.endsWith(".css")) {
      return {};
   }
   if (request === "bpmn-js" || request.startsWith("bpmn-js/")) {
      return function BpmnMock() {
         return new Proxy(
            function () { },
            {
               get: () => () => { },
               apply: () => { },
            }
         );
      };
   }
   if (request.includes("properties/PropertyManager")) {
      const propertyMgrStub = {
         fields: () => [],
         processElements: () => [],
         views: () => [],
         mobileViews: () => [],
      };
      const factory = () => propertyMgrStub;
      factory.default = factory;
      return factory;
   }
   if (request.includes("properties/views/ABViewCSVImporter")) {
      const factory = () => {
         return class MockCSVImporterProperties {
            constructor() {
               this.component = {
                  ui: () => ({}),
                  init: () => Promise.resolve(),
                  detatch: () => { },
                  onShow: () => { },
               };
            }
            ui() {
               return {};
            }
            init() {
               return Promise.resolve();
            }

            toSettings() {
               return {};
            }
         };
      };
      factory.default = factory;
      return factory;
   }
   if (request.includes("ABViewRuleListFormRecordRules")) {
      const popupStub = {
         init() { },
         on() { },
         toSettings: () => [],
         fromSettings() { },
         objectLoad() { },
         qbFixAfterShow() { },
      };
      const factory = () => popupStub;
      factory.default = factory;
      return factory;
   }
   return origLoad.apply(this, arguments);
};

// Set web browser environment
const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.FileReader = global.window.FileReader;
global.Blob = global.window.Blob;

// Set webix globally
global.$$ = webixElement;
global.webix = webix;
