import "@babel/polyfill";
import assert from "assert";
import sinon from "sinon";
import { EventEmitter } from "events";

import AB from "../../_mock/AB.js";
import { listComponentStub } from "../../_mock/uiWorkTestHelpers.js";
import UIDataCollectionList from "../../../src/rootPages/Designer/ui_work_datacollection_list";

const base = "ui_work_datacollection_list";

function getTarget(ab = null) {
   if (!ab) ab = new AB();
   const target = UIDataCollectionList(ab);
   target.ListComponent = listComponentStub(base);

   return target;
}

describe("ui_work_datacollection_list", function () {
   it(".constructor - should set valid properties", function () {
      const ab = new AB();
      const target = UIDataCollectionList(ab);

      assert.equal(base, target.ids.component);
      assert.equal(true, target.ListComponent != null);
      assert.equal(base, target.ListComponent.idBase);
      assert.equal(base, target.ListComponent.ids.component);
   });

   it(".ui - should call .ui of .ListComponent", function () {
      const target = getTarget();

      target.ui();

      assert.equal(true, target.ListComponent.ui.calledOnce);
   });

   it(".init - should pass a valid parameter and set event listeners", async function () {
      const ab = new AB();
      const target = getTarget(ab);
      const spyOn = sinon.spy(target, "on");

      await target.init(ab);

      assert.equal(ab, target.AB);
      assert.equal(true, spyOn.calledOnce);
      assert.equal(true, target.ListComponent.init.calledOnceWith(ab));
      ["selected", "addNew", "deleted", "exclude"].forEach((key, index) => {
         assert.equal(key, target.ListComponent.on.getCalls()[index].args[0]);
      });
   });

   it(".applicationLoad - should listen events of application and load query data", function () {
      const target = getTarget();
      const application = sinon.createStubInstance(EventEmitter);
      application.datacollectionsIncluded = () => [
         "DataCollection1",
         "DataCollection2",
      ];

      target.applicationLoad(application);

      assert.equal(
         true,
         target.ListComponent.dataLoad.calledOnceWith(
            application.datacollectionsIncluded()
         )
      );
   });

   it(".ready - should call .ready of ListComponent", function () {
      const target = getTarget();

      target.ready();

      assert.equal(true, target.ListComponent.ready.calledOnce);
   });

   it(".clickNewDataCollection - should call .show of .AddForm", function () {
      const target = getTarget();

      assert.doesNotThrow(() => target.clickNewDataCollection());
   });
});
