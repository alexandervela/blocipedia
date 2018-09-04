module.exports = class WikiPolicy {
     constructor(user, record) {
       this.user = user;
       this.record = record;
     }
   
     new() {
       return this.user != null;
     }
   
     create() {
       return this.new();
     }
   
     show() {
       return true;
     }
   
     edit() {
       return this.new();
     }
   
     update() {
       return this.edit();
     }
   
     destroy() {
       return this.update();
     }
   }