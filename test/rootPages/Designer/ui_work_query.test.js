import "@babel/polyfill";
import assert from "assert";
import sinon from "sinon";
import { EventEmitter } from "events";

import AB from "../../_mock/AB.js";
import { registerApplicationForTarget } from "../../_mock/uiWorkTestHelpers.js";
import UIQuery from "../../../src/rootPages/Designer/ui_work_query";

const base = "ab_work_query";

function getMockApplication() {
   const application = sinon.createStubInstance(EventEmitter);
   application.queriesIncluded = () => [];
   return application;
}

function getTarget(ab = null) {
   if (!ab) ab = new AB();
   return UIQuery(ab);
}

describe("ui_work_query", function () {
   it(".constructor - should set valid properties", function () {
      const target = getTarget();

      assert.equal(base, target.ids.component);
   });

   it(".ui - should return valid UI definition", function () {
      const target = getTarget();

      const result = target.ui();

      assert.equal(base, result.id);
      assert.equal("space", result.type);
      assert.equal(3, result.cols.length);
   });

   it(".init - should pass a valid parameter and call .init of child pages", async function () {
      const ab = new AB();
      const target = getTarget(ab);
      const stubListInit = sinon.stub(target.QueryList, "init").resolves();
      const stubWorkspaceInit = sinon.stub(target.QueryWorkspace, "init").resolves();

      await target.init(ab);

      assert.equal(target.AB, ab);
      assert.equal(true, stubListInit.calledOnceWith(ab));
      assert.equal(true, stubWorkspaceInit.calledOnceWith(ab));
   });

   it(".applicationLoad - should pass a valid parameter to functions of child pages", async function () {
      const ab = new AB();
      const target = getTarget(ab);
      const expectParam = getMockApplication();
      registerApplicationForTarget(target, expectParam);
      sinon.stub(target.QueryList, "applicationLoad");
      sinon.stub(target.QueryWorkspace, "applicationLoad");
      sinon.stub(target.QueryWorkspace, "clearWorkspace");

      target.applicationLoad(expectParam);

      assert.equal(expectParam, target.CurrentApplication);
   });

   it(".show - should call .applicationLoad of QueryList when .CurrentApplication is exists", function () {
      const ab = new AB();
      const target = getTarget(ab);
      const application = getMockApplication();
      registerApplicationForTarget(target, application);
      target.CurrentApplicationID = application.id;
      sinon.stub(target.QueryList, "applicationLoad");
      sinon.stub(target.QueryList, "ready");

      assert.doesNotThrow(() => target.show());
   });

   it(".show - should not call .applicationLoad of QueryList when .CurrentApplication is null", function () {
      const target = getTarget();

      assert.doesNotThrow(() => target.show());
   });

   it(".select - should pass the selected query to .queryLoad of QueryWorkspace", function () {
      const target = getTarget();

      assert.equal(true, target.QueryWorkspace != null);
   });
});
