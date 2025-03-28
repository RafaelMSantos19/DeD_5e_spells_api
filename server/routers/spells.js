const { Router } = require("express")
const newSpellController =  require("../controllers/newSpell")
const getSpellsController = require("../controllers/getSpells")
const router = Router()

router
    .post('/newSpell', 
        
        newSpellController
    )

    .get('/getSpells',

        getSpellsController
    )

module.exports = router