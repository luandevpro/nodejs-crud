var express      = require("express")
    router       = express.Router()
 mainControllers = require("./controllers/main.controllers")
 eventControllers= require("./controllers/events.controllers")
// export router
module.exports = router   
// 
router.get('/' , mainControllers.showHome)    

//
router.get('/events' , eventControllers.showEvents)
//
router.get("/events/create" , eventControllers.showCreate)
//
router.post("/events/create" , eventControllers.processCreate)
//
router.get("/events/:slug/edit" , eventControllers.showEdit)
//
router.post("/events/:slug" , eventControllers.processEdit)
//
router.get("/events/:slug/delete" , eventControllers.showDelete)
//
router.get('/events/:slug' , eventControllers.showSingle)
