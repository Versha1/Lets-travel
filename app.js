let express = require('express');
let app = express();
let mongoose = require('mongoose');

app.use(express.json());
//mongoose.connect("mongodb://localhost/travels");
let userName = process.env.username;
let userPass = process.env.userpass;
mongoose.connect(`mongodb+srv://${userName}:${userPass}@mycluster.1041hqk.mongodb.net/travels`);
app.set('view engine', 'ejs');

let postRouter = require('./routes/post.route');
let callbackRequestRouter = require('./routes/callback-requests.route');
let emailsRouter = require('./routes/emails.route');
let usersRouter = require('./routes/users.route');

let Post = require('./models/post.models').Post;

let multer = require('multer');

let cookieParser = require('cookie-parser');
let auth = require('./controllers/auth');



let imageStorage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null,'public/images'),
    filename:  (req,file,cb)=> cb(null,file.originalname)
});
app.use(multer({storage:imageStorage}).single('imageFile'));


app.use(cookieParser());
app.use('/posts',postRouter);
app.use('/callback-requests',callbackRequestRouter);
app.use('/emails',emailsRouter);
app.use('/users',usersRouter);

app.use(express.static('public'));
app.get('/landmark', async(req,resp)=>{
    let id = req.query.id
    post = await Post.findOne({id:id})
    resp.render('landmark',{
        title: post.title,
        imageURL: post.imageUrl,
        date: post.date,
        text: post.text
    })
})
//let isLoggedIn = false;
app.get('/admin',(req,resp)=>{
    let token = req.cookies['auth-token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    }else{
        resp.redirect('/login');
    }
    
})

app.get('/login',(req,resp)=>{
    let token = req.cookies['auth-token'];
    if(token && auth.checkToken(token)){
        resp.redirect('/admin');
    }else{
    resp.render('login');
    }
})

let port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening ${port}...`))