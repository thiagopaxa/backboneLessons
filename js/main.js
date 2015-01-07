(function(){
  
  window.App = {
    Models: {},
    Views: {},
    Collections: {}

  };

  window.templateMaker = function(id){
    return _.template($('#' + id).html());
  };

  App.Models.Task = Backbone.Model.extend({});
  App.Views.Task = Backbone.View.extend({
    
    tagName : 'li',
    
    template: templateMaker('taskTemplate'),
    
    events:{
      'click .edit' : 'editTask'
    },
    
    editTask: function(){
      var newTaskTitle = prompt("Would you like to edit this title?",this.model.get('title'))

      if (newTaskTitle !== null) {
        this.model.set('title',newTaskTitle);
      };
      //this is the result of the changes
      console.log(this.model.toJSON());
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
  var tasksColl = new App.Collections.Tasks([
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
  var tasksView = new App.Views.Tasks({ collection : tasksColl});
  $('body').append(tasksView.render().el)
})();