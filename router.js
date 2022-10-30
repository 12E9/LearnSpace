var express = require("express");
var router = express.Router();
const { db } = require("./database");

router.get("/signup",(req,res)=>{
    res.render("signup");
});

//signup submit route
router.get("/signupsubmit",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    const password = req.query.password;
    // Adding new data to collection
    db.collection('usersData').add({
        name: first_name + last_name,
        password:password,
        email:email
    }).then(()=>{
        res.render("signupsuccess");
    })
});
//signin
router.get("/signin",(req,res)=>{
    res.render("signin");
});
//signin submit route
router.get("/signinsubmit",(req,res)=>{
    const email = req.query.email;
    const password = req.query.password;
    db.collection("usersData")
      .where("email", "==", email)
      .where("password", "==", password)
      .get()
      .then((docs)=>{
        if (docs.size > 0) {
            // res.send("Login Successfully")
            res.render("dashboard");
          } else {
            // res.render("invalid");
            res.render("invalidlogin");
          }
        });
    
      
});
//dashboard route
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorized user");
    }
})
//logout route
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('home',{title:"Express",logout:"Logout Successfully"})
        }
    })
})

router.get("/bootcamps",(req,res)=>{
    res.render("bootcamps");
});
router.get("/masterclasses",(req,res)=>{
    res.render("masterclasses");
});
router.get("/workshops",(req,res)=>{
    res.render("workshops");
});
//1.web development registration route
router.get("/wdregistration",(req,res)=>{
    res.render("1bc");
});
router.get("/WDbootcamp",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    
    // Adding new data to collection
    db.collection('WebDevelopmentBootcamp').add({
        name: first_name + last_name,
        
        email:email
    }).then(()=>{
        
        res.render("registersuccess");
    })
});
//2.software development registration route
router.get("/sdregistration",(req,res)=>{
    res.render("2bc");
});
router.get("/SDbootcamp",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    
    // Adding new data to collection
    db.collection('SoftwareDevelopmentBootcamp').add({
        name: first_name + last_name,
        
        email:email
    }).then(()=>{
        res.render("registersuccess");
    })
});
//3. data science registration route
router.get("/dsregistration",(req,res)=>{
    res.render("3bc");
});
router.get("/DSbootcamp",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    
    // Adding new data to collection
    db.collection('DataScienceBootcamp').add({
        name: first_name + last_name,
        
        email:email
    }).then(()=>{
        res.render("registersuccess");
    })
});
//1.Technical Analysis registration route
router.get("/taregistration",(req,res)=>{
    res.render("1mc");
});
router.get("/TAmasterclass",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    
    // Adding new data to collection
    db.collection('TechnicalAnalysisMasterclass').add({
        name: first_name + last_name,
        
        email:email
    }).then(()=>{
        res.render("registersuccess");
    })
});
//2.Data Analytics registration route
router.get("/daregistration",(req,res)=>{
    res.render("2mc");
});
router.get("/DAmasterclass",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    
    // Adding new data to collection
    db.collection('DataAnalyticsMasterclass').add({
        name: first_name + last_name,
        
        email:email
    }).then(()=>{
        res.render("registersuccess");
    })
});
//1.digital Marketing registration route
router.get("/dmregistration",(req,res)=>{
    res.render("1ws");
});
router.get("/DMworkshop",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    
    // Adding new data to collection
    db.collection('DigitalMarketingWorkshop').add({
        name: first_name + last_name,
        
        email:email
    }).then(()=>{
        res.render("registersuccess");
    })
});
//2.Cloud Computing registration route
router.get("/ccregistration",(req,res)=>{
    res.render("2ws");
});
router.get("/CCworkshop",(req,res)=>{
    const first_name =req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    
    // Adding new data to collection
    db.collection('CloudComputingWorkshop').add({
        name: first_name + last_name,
        
        email:email
    }).then(()=>{
        res.render("registersuccess");
        
    })
});
router.get("/home",(req,res)=>{
    res.render("home");
});
router.get("/bcregisteredmembers",(req,res)=>{
    var wdbootcampData = [];
        db.collection('WebDevelopmentBootcamp').get().then((docs)=>{
            docs.forEach((doc)=>{
                wdbootcampData.push(doc.data());
            })
        }).then(()=>{
            // console.log(wdbootcampData);
            // res.render("bcregistered",{wdbootcampData:wdbootcampData});
        })
        var sdbootcampData = [];
        db.collection('SoftwareDevelopmentBootcamp').get().then((docs)=>{
            docs.forEach((doc)=>{
                sdbootcampData.push(doc.data());
            })
        }).then(()=>{
            // console.log(sdbootcampData);
            // res.render("bcregistered",{sdbootcampData : sdbootcampData , wdbootcampData : wdbootcampData});
        })
        var dsbootcampData = [];
        db.collection('DataScienceBootcamp').get().then((docs)=>{
            docs.forEach((doc)=>{
                dsbootcampData.push(doc.data());
            })
        }).then(()=>{
            // console.log(dsbootcampData);
            res.render("bcregistered",{sdbootcampData : sdbootcampData , wdbootcampData : wdbootcampData, dsbootcampData : dsbootcampData});
        })
    
        
});
router.get("/wsregisteredmembers",(req,res)=>{
    
    var dmworkshopData = [];
        db.collection('DigitalMarketingWorkshop').get().then((docs)=>{
            docs.forEach((doc)=>{
                dmworkshopData.push(doc.data());
            })
        }).then(()=>{
            
        })
        var ccworkshopData = [];
        db.collection('CloudComputingWorkshop').get().then((docs)=>{
            docs.forEach((doc)=>{
                ccworkshopData.push(doc.data());
            })
        }).then(()=>{
            
            res.render("wsregistered",{dmworkshopData : dmworkshopData , ccworkshopData : ccworkshopData});
        })
});
router.get("/mcregisteredmembers",(req,res)=>{
    
    var tamasterclassData = [];
        db.collection('TechnicalAnalysisMasterclass').get().then((docs)=>{
            docs.forEach((doc)=>{
                tamasterclassData.push(doc.data());
            })
        }).then(()=>{
            
        })
        var damasterclassData = [];
        db.collection('DataAnalyticsMasterclass').get().then((docs)=>{
            docs.forEach((doc)=>{
                damasterclassData.push(doc.data());
            })
        }).then(()=>{
            
            res.render("mcregistered",{tamasterclassData : tamasterclassData , damasterclassData : damasterclassData});
        })
});
module.exports = router;
