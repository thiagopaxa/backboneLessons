(function(){
  
  window.App = {
    Models: {},
    Views: {},
    Collections: {},
    Router: {}
  };

  // A Router Lesson
  App.Router = Backbone.Router.extend({
    routes:{
      '': 'index',
      'show/:id': 'show',
      'download/*filename': 'download',
      '*other': 'default'
    },
    index: function(){
      console.log("Hi Router");
    },
    show: function(id){
      console.log("Show id of "+ id);
    },
    default: function(other){
      console.error('There is nothing here, you requested: ' + other);
    },
    download: function(filename){
      console.log("You want the file: " + filename);
    }
  })
  var router = new App.Router;
  Backbone.history.start();
})();