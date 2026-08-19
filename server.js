const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));


mongoose.connect(
    "mongodb://127.0.0.1:27017/placementDB"
)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(error => {
    console.log("MongoDB Error:", error);
});



const studentSchema = new mongoose.Schema({

    name: String,

    email: String,

    department: String,

    placed: {
        type: Boolean,
        default: false
    }

});


const Student =
    mongoose.model("Student", studentSchema);


app.post("/add", async (req, res) => {

    try {

        const student =
            new Student(req.body);

        await student.save();

        res.send("Student added successfully!");

    }

    catch (error) {

        res.status(500)
            .send("Error adding student");

    }

});


app.get("/students", async (req, res) => {

    try {

        const students =
            await Student.find();

        res.json(students);

    }

    catch (error) {

        res.status(500)
            .send("Error loading students");

    }

});


app.get("/student/:id", async (req, res) => {

    try {

        const student =
            await Student.findById(req.params.id);

        res.json(student);

    }

    catch (error) {

        res.status(500)
            .send("Student not found");

    }

});



app.put("/update/:id", async (req, res) => {

    try {

        await Student.findByIdAndUpdate(
            req.params.id,
            {
                placed: req.body.placed
            }
        );

        res.send("Placement status updated!");

    }

    catch (error) {

        res.status(500)
            .send("Error updating status");

    }

});


app.delete("/delete/:id", async (req, res) => {

    try {

        await Student.findByIdAndDelete(
            req.params.id
        );

        res.send("Student deleted successfully!");

    }

    catch (error) {

        res.status(500)
            .send("Error deleting student");

    }

});



app.listen(5000, () => {

    console.log(
        "Server running at http://localhost:5000"
    );

});
