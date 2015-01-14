(function(){
  
  window.App = {
    Models: {},
    Views: {},
    Collections: {},
    Router: {}
  };
  var vent = _.extend({},Backbone.Events);
  // A Router Lesson
  App.Views.Appointment = Backbone.View.extend({
    initialize: function(){
      vent.on('appointment:show',this.appointmentShow,this);
    },
    appointmentShow: function(id){
      console.log(id)
    }
  })
  App.Router = Backbone.Router.extend({
    routes:{
      '': 'index',
      'appointment/:id': 'showAppointment'
    },
    index: function(){
      console.log('Index Page');    
    },
    showAppointment: function(appointmentId){
      vent.trigger('appointment:show',appointmentId);
    }
  });
  var view = new App.Views.Appointment();
  var router = new App.Router;
  Backbone.history.start();

})();