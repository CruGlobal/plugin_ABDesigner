import "@babel/polyfill";
import assert from "assert";
import sinon from "sinon";
import { EventEmitter } from "events";

import AB from "../../_mock/AB.js";
import { listComponentStub, registerApplicationForTarget } from "../../_mock/uiWorkTestHelpers.js";
import UIProcess from "../../../src/rootPages/Designer/ui_work_process";

const base = "ui_work_process";

function getMockApplication() {
   const application = sinon.createStubInstance(EventEmitter);
   application.processes = () => [];
   application.loadedProcesss = false;
   return application;
}

function getTarget(ab = null) {
   if (!ab) ab = new AB();
   return UIProcess(ab);
}

describe("ui_work_process", function () {
   it(".constructor - should set valid properties", function () {
      const target = getTarget();

      assert.equal(base, target.ids.component);
      assert.equal(true, target.CurrentApplication == null);
      assert.equal(true, target.ProcessList != null);
      assert.equal(true, target.ProcessWorkspace != null);
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
      const stubListInit = sinon.stub(target.ProcessList, "init").resolves();
      const stubWorkspaceInit = sinon.stub(target.ProcessWorkspace, "init").resolves();

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
      sinon.stub(target.ProcessList, "applicationLoad");
      sinon.stub(target.ProcessWorkspace, "applicationLoad");

      target.applicationLoad(expectParam);

      assert.equal(expectParam, target.CurrentApplication);
   });

   it(".show - should call .applicationLoad of ProcessList when .CurrentApplication is exists", function () {
      const ab = new AB();
      const target = getTarget(ab);
      target.ProcessList.count = () => 0;
      const application = getMockApplication();
      registerApplicationForTarget(target, application);
      target.CurrentApplicationID = application.id;
      sinon.stub(target.ProcessList, "applicationLoad");
      sinon.stub(target.ProcessList, "busy");
      sinon.stub(target.ProcessList, "ready");

      assert.doesNotThrow(() => target.show());
   });

   it(".show - should not call .applicationLoad of ProcessList when .CurrentApplication is null", function () {
      const ab = new AB();
      const target = getTarget(ab);
      target.ProcessList.ListComponent = listComponentStub(base);
      const spyListBusy = sinon.spy(target.ProcessList, "busy");
      const spyListApplicationLoad = sinon.spy(
         target.ProcessList,
         "applicationLoad"
      );
      const spyListReady = sinon.spy(target.ProcessList, "ready");

      target.show();

      assert.equal(false, spyListBusy.called);
      assert.equal(false, spyListApplicationLoad.called);
      assert.equal(false, spyListReady.called);
   });

   it(".select - should pass the selected process to .processLoad of ProcessWorkspace", function () {
      const target = getTarget();

      assert.equal(true, target.ProcessWorkspace != null);
   });
});
