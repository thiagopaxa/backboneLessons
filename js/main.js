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
// 
var Thiago = new Person({age:24,name:'Thiagão',occupation:'Developer'})

Person.prototype.on('error',function(model,error){

  console.log(error)
  return false;
})