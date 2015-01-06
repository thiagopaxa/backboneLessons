(function(){
  
  window.App = {
    Models: {},
    Views: {},
    Collections: {}

  };

  window.templateMaker = function(id){
    return _.template($('#' + id).html());
  };
  
  // Person Model
  App.Models.Person = Backbone.Model.extend({
    
    defaults: {
      name: 'John Doe',
      age: 33,
      occupation: 'worker'
    },
    
    validate : function(attrs){
    
      if ( Number(attrs.age) < 0 ){
        return "The age must be positive, jackass.";
      }
      if ( ! attrs.name ){
        return "Every Person should have a name";
      }
    },

    work : function(){
      return this.get('name') + ' is now working';
    }
  })

  // The collection of persons
  App.Collections.People = Backbone.Collection.extend({
    model: App.Models.Person
  })
  // View For a Person
  App.Views.Person = Backbone.View.extend({
    
    tagName: 'li',
    className: 'person',
    template : templateMaker('personTemplate'),
    
    render: function(){
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }

  });

  // View For all people
  App.Views.People = Backbone.View.extend({
    
    tagName: 'ul',
    render: function(){
      // this.collection is passed in the instance
      // and the .each method is one of the many underscore built in helpers
      this.collection.each(function(person){
      
        var personView = new App.Views.Person({model:person})
        this.$el.append(personView.render().el);
      
      },this); 
      // 'this' is passed like a binding property
      // to use the collection 'this', instead of the window 'this'
      return this;
    }

  });

  // Collection instantiated
  var people = new App.Collections.People([
    {
      name: 'Jorge',
      age: 20,
      occupation: 'pedreiro'
    },
    {
      name: 'Carlos',
      age: 22,
      occupation: 'farmaceutico'
    },
    {
      name: 'Thiago',
      age: 24,
      occupation: 'Dev'
    },
  ])

  var peopleView = new App.Views.People({
    collection: people
  });
  $('body').append(peopleView.render().el);

})();