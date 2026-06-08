import "@babel/polyfill";
import assert from "assert";
import sinon from "sinon";

import AB from "../../_mock/AB.js";
import ABViewEditorPlugin from "../../_mock/ABViewEditorPlugin.js";
import FNAbviewcsvimporterEditor from "../../../src/plugins/web_view_csvImporter/FNAbviewcsvimporterEditor.js";

function buildEditorClass() {
   const ab = new AB();
   return FNAbviewcsvimporterEditor({
      AB: ab,
      ABViewEditorPlugin,
   });
}

describe("FNAbviewcsvimporterEditor", function () {
   let EditorClass;
   let uiSpy;
   let initSpy;
   let detatchSpy;
   let onShowSpy;

   beforeEach(function () {
      EditorClass = buildEditorClass();
      uiSpy = sinon.spy(ABViewEditorPlugin.prototype, "ui");
      initSpy = sinon.spy(ABViewEditorPlugin.prototype, "init");
      detatchSpy = sinon.spy(ABViewEditorPlugin.prototype, "detatch");
      onShowSpy = sinon.spy(ABViewEditorPlugin.prototype, "onShow");
   });

   afterEach(function () {
      sinon.restore();
   });

   it("exposes csvImporter plugin metadata", function () {
      assert.equal(EditorClass.key, "csvImporter");
      assert.equal(EditorClass.getPluginKey(), "csvImporter");
      assert.equal(EditorClass.getPluginType(), "editor-view");
   });

   it("delegates ui() to the editor base class", function () {
      const editor = new EditorClass({}, "interface_editor_csvImporter");
      const result = editor.ui();

      assert.equal(true, uiSpy.calledOnce);
      assert.deepEqual(result, { view: "mock-editor-ui" });
   });

   it("init(AB) sets AB and delegates to super.init", async function () {
      const ab = new AB();
      const editor = new EditorClass({}, "interface_editor_csvImporter");

      await editor.init(ab);

      assert.equal(ab, editor.AB);
      assert.equal(true, initSpy.calledOnce);
      assert.equal(ab, initSpy.firstCall.args[0]);
   });

   it("detatch() and onShow() delegate to super", function () {
      const editor = new EditorClass({}, "interface_editor_csvImporter");

      editor.detatch();
      editor.onShow();

      assert.equal(true, detatchSpy.calledOnce);
      assert.equal(true, onShowSpy.calledOnce);
   });
});
