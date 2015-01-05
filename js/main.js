// Person Model
var Person = Backbone.Model.extend({
  
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
var PeopleCollection = Backbone.Collection.extend({
  model:Person
})
// View For a Person
var PersonView = Backbone.View.extend({
  
  tagName: 'li',
  className: 'person',
  template : _.template( $('#personTemplate').html() ),
  
  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }

});

// View For all people
var PeopleView = Backbone.View.extend({
  tagName: 'ul',
  render: function(){
    // this.collection is passed in the instance
    // and the .each method is one of the many underscore built in helpers
    this.collection.each(function(person){
    
      var personView = new PersonView({model:person})
      this.$el.append(personView.render().el);
    
    },this); 
    // 'this' is passed like a binding property
    // to use the collection 'this', instead of the window 'this'
    return this;
  }

});

// Collection instantiated
var people = new PeopleCollection([
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

var peopleView = new PeopleView({
  collection: people
});
$('body').append(peopleView.render().el);