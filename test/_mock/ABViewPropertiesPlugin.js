export default class ABViewPropertiesPlugin {
   constructor(baseID, defaults) {
      this.baseID = baseID;
      this.defaults = defaults;
      this.ids = {};
      Object.keys(defaults || {}).forEach((k) => {
         this.ids[k] = `${baseID}_${k}`;
      });
   }

   ui() {
      return [];
   }

   async init(AB) {
      this.AB = AB;
   }

   _ViewClass() {
      return null;
   }

   values() {
      return { settings: {} };
   }

   populate() {}

   onChange() {}
}
