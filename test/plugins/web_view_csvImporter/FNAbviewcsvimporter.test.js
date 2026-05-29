import "@babel/polyfill";
import assert from "assert";

import AB from "../../_mock/AB.js";
import ABViewPropertiesPlugin from "../../_mock/ABViewPropertiesPlugin.js";
import FNAbviewcsvimporterProperties from "../../../src/plugins/web_view_csvImporter/FNAbviewcsvimporter.js";

function recordRulesFactory() {
   return {
      init() {},
      on() {},
      toSettings: () => [],
      fromSettings() {},
      objectLoad() {},
      qbFixAfterShow() {},
   };
}

function buildPropertiesClass() {
   const ab = new AB();
   return FNAbviewcsvimporterProperties({
      AB: ab,
      ABViewPropertiesPlugin,
      ABViewRuleListFormRecordRules: recordRulesFactory,
   });
}

describe("FNAbviewcsvimporterProperties", function () {
   it("exposes csvImporter plugin metadata", function () {
      const PropertiesClass = buildPropertiesClass();

      assert.equal(PropertiesClass.key, "csvImporter");
      assert.equal(PropertiesClass.getPluginKey(), "csvImporter");
      assert.equal(PropertiesClass.getPluginType(), "properties-view");
   });

   it("defaultValues() returns expected settings shape", function () {
      const PropertiesClass = buildPropertiesClass();
      const props = new PropertiesClass();

      const values = props.defaultValues();

      assert.deepEqual(values, {
         dataviewID: null,
         buttonLabel: "Upload CSV",
         width: 0,
         recordRules: [],
         availableFieldIds: [],
      });
   });
});
