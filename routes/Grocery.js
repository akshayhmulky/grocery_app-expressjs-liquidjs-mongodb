const router = require('express').Router()
//model
const Grocery = require('../model/Grocery')

//MIDDLEWARE WHICH PROMPT USER TO PROVIDE USERNAME AND PASSWORD
//We are using this so that we can apply login prompt for specific route
function passwordProtected(req, res, next) {
    res.set("WWW-Authenticate", "Basic realm='Grocery App'")
    if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
      next()
    } else {
      console.log(req.headers.authorization)
      res.status(401).send("Try again")
    }
  }

// groceries = ['fork and clone', 'make it better', 'make a pull request']
router.get('/', async(req,res)=>{
    //Latest grocery on the top
    const groceries = await Grocery.find().sort({_id:-1}).lean()
    res.render('home', {groceries:groceries})

})

router.post('/add',async(req,res)=>{
    const data = req.body
    // console.log("What is data", data)
    try {
        const grocery = new Grocery(data)
        grocery.save()
        res.redirect('/grocery')
    } catch (error) {
        console.log(error)
    }

})

//Since form does not support Delete method, we are using POST instead, however if you are testing in postman
//then you can use router.delete()
//or second way is to use methodoverride: https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2#:~:text=Browsers%20do%20support%20PUT%20and,supported%20by%20'HTML%20form'.
router.post('/deleteGroceryItem/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const getGroceryItem = await Grocery.findById(id)
        await getGroceryItem.remove()
        res.redirect('/grocery')
    } catch (error) {
        console.log(error)
    }
})


router.post('/updatePurchaseStatus/:id', async(req, res)=>{
    const id = req.params.id
    try{
        const updatedCard = await Grocery.findByIdAndUpdate(
            id, { $set: {isPurchased:true} }, { new: true });

         res.redirect('/grocery')   
    }
    catch(error){
        console.log(error)
    }
})


//TESTING TO SEE IF LOGIN PROMPT WILL SHOW ONLY TO THIS ROUTE
router.get('/admin', passwordProtected, (req,res)=>{
    res.send("Admin Portal")
})


module.exports = router //VERY IMPORTANT ORELSE APP WILL CRASH