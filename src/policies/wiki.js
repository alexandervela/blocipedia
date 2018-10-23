module.exports = class WikiPolicy {
     constructor(user, record, collaborator) {
       this.user = user;
       this.record = record;
       this.collaborator = collaborator;
     }

     _isOwner() {
      return this.record && (this.record.userId == this.user.id);
    }

    _isCollaborator() {
      return (
        this.record.collaborators[0] && 
        this.record.collaborators.find(collaborator => {
          return collaborator.userId == this.user.id;
        })
      );
    }

     _isStandard() {
      return this.user && (this.user.role === 0);
    }
  
    _isPremium() {
      return this.user && (this.user.role === 1);
    }

    _isAdmin() {
      return this.user && (this.user.role === 2);
    }

    _isPrivate() {
      return this.record.private === true;
    }
   
     new() {
       return this.user != null;
     }
   
     create() {
       return this.new();
     }
   
     show() {
      if (this._isPrivate()) {
        if (this.new() &&
          (this._isOwner() || this._isCollaborator() || this._isAdmin())
        ) {
          return true;
        } else {
          console.log("Error, you are not authorized to view this wiki.")
          return false;
        }
      } else {
        return true;
      }
     }
   
     edit() {
      if(this.record.private == false) {
        return this.new() &&
        this.record && 
        (this._isStandard() || this._isAdmin() || this._isPremium());
      } else if (this._isPrivate) {
        return this.new() &&
        this.record && 
        (this._isOwner() || this._isCollaborator() || this._isAdmin());
      }
     }

     showCollaborators() {
       return true;
     }
   
     update() {
       return this.edit();
     }
   
     destroy() {
       return this.update();
     }
   }