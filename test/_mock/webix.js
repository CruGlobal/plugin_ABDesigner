export default class webix {
   static alert() {}
   static confirm() {}
   static extend() {}
   static ui() {}
   static ProgressBar = {};
   static DataCollection = class {
      constructor() {
         this.data = { attachEvent: () => { } };
      }

      sort() { }

      count() {
         return 0;
      }

      remove() { }

      parse() { }
   };
}
