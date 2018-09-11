module.exports = class WikiPolicy {
     constructor(user, record) {
       this.user = user;
       this.record = record;
     }

     _isStandard() {
      return this.record && (this.record.userId === 0);
    }
  
    _isPremium() {
      return this.user && (this.user.role === 1);
    }

    _isAdmin() {
      return this.user && (this.user.role === 2);
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