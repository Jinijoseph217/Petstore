const express=require('express');

const cors=require('cors');

const {json} = require('jsonwebtoken');

const app=express();

app.listen(3002,()=>{
    console.log('Express server listening on port 3002');
})

app.use(express.json());


app.use(cors({
    origin:'http://localhost:4200'
}))

const dataService=require('./service/dataService')

const appMiddleWare = (req, res, next) => {
    // console.log('application specific middleware');
    next();
}
app.use(appMiddleWare)

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        //verify the token -verify()
        // console.log('Router specific middleware');
        const data = jwt.verify(token, 'superkey2020')
        next();
    }
    catch {
        //422 -unprocessible entity(unable to process)
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: 'please login'
        })
    }
}


app.post('/register', (req, res) => {
    console.log(req.body);
    dataService.register(req.body.acno, req.body.username, req.body.pass)
        .then(result => {
            res.status(result.statuscode).json(result)
        })
    // res.status(result.statuscode).json(result)
    // if (result) {
    //     res.send('Successfully registered');
    // } else {
    //     res.send('user registration failed');
    // }

})

app.post('/login', (req, res) => {
    console.log(req.body);
    dataService.login(req.body.acno, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.get('/all-items',(req,res)=>{
    dataService.getAllItems()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

    app.post('/addtowishlist',(req,res)=>{
        console.log(req.body);
        dataService.addtowishlist(req.body.id,req.body.title,req.body.price,req.body.description, req.body.category,req.body.image).then(
            (result)=>{
                res.status(result.statusCode).json(result)
            }
        )

    })

    app.get('/getwishlist',(req,res)=>{
        dataService.getwishlist().then(
            (result)=>{
                res.status(result.statusCode).json(result) 
            }
        )
    })

    app.delete('/deleteitem/:id',(req,res)=>{
        dataService.deleteitem(req.params.id).then(
            (result)=>{
            res.status(result.statusCode).json(result) 
            }

        )
    })

