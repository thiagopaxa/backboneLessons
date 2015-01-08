(function(){
  
  window.App = {
    Models: {},
    Views: {},
    Collections: {}

  };

  window.templateMaker = function(id){
    return _.template($('#' + id).html());
  };

  App.Models.Task = Backbone.Model.extend({
    validate: function(attrs){
      if (! $.trim(attrs.title) ) {
        return 'A task requires a valid Title';
      };
    }
  });
  App.Views.Task = Backbone.View.extend({
    
    tagName : 'li',
    
    template: templateMaker('taskTemplate'),
    
    events:{
      'click .edit' : 'editTask',
      'click .delete' : 'destroyTask'
    },
    
    initialize: function(){
      this.model.on('change',this.render,this);
      this.model.on('destroy',this.remove,this);
    },
    editTask: function(){
      var newTaskTitle = prompt("Would you like to edit this title?",this.model.get('title'))
      
      if (!newTaskTitle) return;
      
      this.model.set('title',$.trim(newTaskTitle),{validate:true});
      //this is the result of the changes
      console.log(this.model.toJSON());
    },
    destroyTask: function(){
      this.model.destroy()
      console.log(tasksCollection);

    },
    remove: function(){
      this.$el.remove();
    },
    render: function(){
      this.$el.html( this.template(this.model.toJSON()) );
      return this;
    }

  });

  App.Collections.Tasks = Backbone.Collection.extend({
    model : App.Models.Task
  });
  App.Views.Tasks = Backbone.View.extend({
    
    tagName: 'ul',
    
    addOne : function(task){
      var taskModel = new App.Views.Task( {model : task });
      this.$el.append(taskModel.render().el)
    },
    
    render: function(){

      this.collection.each(this.addOne, this);

      return this;
    }
    
  })
  var tasksCollection = new App.Collections.Tasks([
    {
      title: 'Go to the Mall',
      priority: 2
    },
    {
      title: 'Go to the Store',
      priority: 4
    },
    {
      title: 'Go to Work',
      priority: 5
    }
  ])
  var tasksView = new App.Views.Tasks({ collection : tasksCollection});
  $('body').append(tasksView.render().el)
})();