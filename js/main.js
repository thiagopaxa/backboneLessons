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
      'show': 'show'
    },
    index: function(){
      console.log("Hi Router");
    },
    show: function(){
      console.log("This is a show");
    }
  })
  var router = new App.Router;
  Backbone.history.start();
})();