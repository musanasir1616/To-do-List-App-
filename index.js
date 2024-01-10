import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/ItemDB');

const itemSchema = new mongoose.Schema({
    item: "string"
})
const workSchema = new mongoose.Schema({
    work: "string"
})

const Items = mongoose.model("item", itemSchema)
const works = mongoose.model("work", workSchema)

const app = express();
// const items = [];
// const works = [];

// const defaultItems = ["Reading", "Studying"];

// const convertedDefaultItems = defaultItems.map((item) => {
//   return new Items({ item });
// });

// Items.insertMany(convertedDefaultItems);


let date = new Date().toDateString();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res)=>{

    Items.find().then(items=>{
        console.log("Succesfully get the items from the database");
        res.render("index.ejs",{items: items,date: date})

    }).catch(err=>{
        console.log(err)
    })

    
})

app.post("/", (req, res)=>{
    var newItem = req.body.newItem;
    const itemNew = new Items({
        item: newItem
    })

    itemNew.save().then(res=>{
        console.log("Successfully Added to the database")
    }).catch(err=>{
        console.log(err)
    })
  
    res.redirect("/");
})

app.post("/delete", (req, res)=>{
    const selectedItems = req.body.checkbox;
    async function deleteItem(id){
        const deleteItem = await Items.deleteOne({_id: id});
        return deleteItem
    }

    deleteItem(selectedItems).then(res=>{
        console.log("Success")
    }).catch(err=>{
        console.log(err)
    })
    console.log(selectedItems);
    
    res.redirect("/")
})

app.get("/work", (req, res)=>{
    works.find().then(works =>{
        res.render("work.ejs",{workList: works, work: "Work"})
    })
})

app.post("/work", (req, res)=>{
    var newWork = req.body.newWork;
    const worknew = new works({
        work: newWork
    })
    worknew.save().then(res=>{
        console.log("Success");
    }).catch(err=>{
        console.log(err)
    })
    res.redirect("/work");
})

app.post("/deleteWork", (req, res)=>{
    const deleteWork = req.body.checkbox;

    async function deleteworks(id){
        const deleteWork = await works.deleteOne({_id: id});
        return deleteWork
    }

    deleteworks(deleteWork).then(res=>{
        console.log("Success")
    }).catch(err=>{
        console.log(err)
    })
    console.log(deleteWork)
    res.redirect("/work");
})


app.listen(3000, ()=>{
    console.log("App running on port 3000");
});


