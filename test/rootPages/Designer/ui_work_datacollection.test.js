import "@babel/polyfill";
import assert from "assert";
import sinon from "sinon";
import { EventEmitter } from "events";

import AB from "../../_mock/AB.js";
import UIDataCollection from "../../../src/rootPages/Designer/ui_work_datacollection";

const base = "ui_work_datacollection";

function getMockApplication() {
   const application = sinon.createStubInstance(EventEmitter);
   application.datacollectionsIncluded = () => [];
   return application;
}

function getTarget(ab = null) {
   if (!ab) ab = new AB();
   return UIDataCollection(ab);
}

describe("ui_work_datacollection", function () {
   it(".constructor - should set valid properties", function () {
      const target = getTarget();

      assert.equal(base, target.ids.component);
   });

   it(".ui - should return valid UI definition", function () {
      const target = getTarget();

      assert.equal("function", typeof target.ui);
   });

   it(".init - should pass a valid parameter and call .init of child pages", async function () {
      const target = getTarget();

      assert.equal("function", typeof target.init);
   });

   it(".applicationLoad - should pass a valid parameter to functions of child pages", async function () {
      const target = getTarget();

      assert.equal("function", typeof target.applicationLoad);
   });

   it(".show - should call .applicationLoad of DataCollectionList when .CurrentApplication is exists", function () {
      const target = getTarget();

      assert.equal("function", typeof target.show);
   });

   it(".show - should not call .applicationLoad of DataCollectionList when .CurrentApplication is null", function () {
      const target = getTarget();

      assert.doesNotThrow(() => target.show());
   });

   it(".select - should pass the selected data collection to workspace handlers", function () {
      const target = getTarget();

      assert.equal(true, target != null);
   });
});
