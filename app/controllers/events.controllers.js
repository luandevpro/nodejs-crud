var Event = require('./../models/event')

module.exports = {
   showEvents: showEvents,
   showSingle: showSingle,
   showCreate: showCreate,
   processCreate: processCreate,
   showEdit: showEdit,
   processEdit: processEdit,
   showDelete:showDelete
}

function showEvents(req,res) {
   Event.find({} , (err, events) => {
      if(err){
         res.status(404);
         res.send("File not found 404");
      }
      res.render('pages/events' , { 
         events: events ,
         'success': req.flash('success')
      })
   })
}

function showSingle(req,res) {
   Event.findOne({ slug: req.params.slug } , (err,event) => {
      if(err) {
         res.status(404);
         res.send('Event not found!');
      }
      res.render('pages/single' , { 
         event: event ,
         success: req.flash('success')
      })
   })
}

function showCreate(req,res) {
   res.render('pages/create', { errors : req.flash('errors')})
}

function processCreate(req,res) {

   req.checkBody('name' , "Name is Required").notEmpty();
   req.checkBody('description' , "Description is Required").notEmpty();

   const errors = req.validationErrors();

   if(errors){
      req.flash("errors" , errors.map(err => err.msg))
      return res.redirect('/events/create')
   }

   var event = new Event({
      name: req.body.name,
      description: req.body.description
   })

   event.save((err) => {
      if(err)
         throw err;

      req.flash('success' , 'Created Success Message')

      res.redirect(`/events/${event.slug}`)
   })
}

function showEdit(req,res) {
   Event.findOne({ slug: req.params.slug} , (err,event) => {
      res.render('pages/edit' , {
         event: event,
         errors: req.flash('errors')
      })
   })
}

function processEdit(req,res) {
   req.checkBody('name' ,"Name is Required").notEmpty();
   req.checkBody('description' , 'Description is Required').notEmpty();

   var errors = req.validationErrors()
   if(errors){
      req.flash('errors' , errors.map(err => err.msg))
      return res.redirect(`/events/${req.params.slug}/edit`)
   }

   Event.findOne({ slug: req.params.slug} , (err,event) => {
      
      event.name = req.body.name,
      event.description = req.body.description,

      event.save((error) => {
         if(error)
            throw error;

         req.flash('success' , 'Successfully updated event.')
         res.redirect(`/events/${event.slug}`)
      })
   })

}

function showDelete(req,res) {
   Event.remove({ slug: req.params.slug }, (err) => {
      // set flash data
      // redirect back to the events page
      req.flash('success', 'Event deleted!');
      res.redirect('/events');
    });
}