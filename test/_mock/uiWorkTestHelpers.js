import sinon from "sinon";

export function listComponentStub(base) {
   return {
      idBase: base,
      ids: { component: base },
      ui: sinon.stub(),
      init: sinon.stub().resolves(),
      on: sinon.stub(),
      dataLoad: sinon.stub(),
      ready: sinon.stub(),
      select: sinon.stub(),
      selectedItem: sinon.stub(),
      warningsRefresh: sinon.stub(),
   };
}

export function registerApplication(ab, application) {
   if (!application.id) {
      application.id = `mock-app-${Date.now()}-${Math.random()}`;
   }
   ab.applications[application.id] = application;
   return application;
}

export function registerApplicationForTarget(target, application) {
   return registerApplication(target.AB, application);
}
