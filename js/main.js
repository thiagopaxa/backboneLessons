var Person = Backbone.Model.extend({
  
  defaults: {
    name: 'John Doe',
    age: 33,
    occupation: 'worker',
  },
  
  validate : function(attrs){
    // the validate method is called whenever a property is set.
    // attrs is just like Person.toJson()

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

var Thiago = new Person({age:24,name:'Thiagão',occupation:'Developer'})

Person.prototype.on('invalid',function(model,error){
  // on invalid is the listener that will return those messages within the validate method
  console.error(error)

});

var PersonView = Backbone.View.extend({
  // at the view you can define 
  // classes, ids and tag for the element of the view.
  tagName: 'li',
  className: 'person',
  //For the template here we used the template engine of UNDERSCORE
  template : _.template( $('#personTemplate').html() ),
  initialize : function() {
    // initialize is the constructor method for backbone views
    this.render();
  },
  render: function(){
    
    this.$el.html( this.template( this.model.toJSON() ) );
  }

});

var thiagoView = new PersonView({model: Thiago});
// now you can call the view for this with
// thiagoView.el or thiagoView.$el (for jquery methods)