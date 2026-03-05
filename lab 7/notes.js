const express = require("express");

const router = express.Router();

const Note = require("../models/Note");

router.post("/",async(req,res)=>{
const note=new Note(req.body);
const savedNote=await note.save();
res.json(savedNote);
});

router.get("/",async(req,res)=>{
const notes=await Note.find();
res.json(notes);
});

router.put("/:id",async(req,res)=>{
const updated=await Note.findByIdAndUpdate(
req.params.id,
{$set:req.body},
{new:true}
);
res.json(updated);
});

router.delete("/:id",async(req,res)=>{
await Note.findByIdAndDelete(req.params.id);
res.json({message:"Note Deleted"});
});

module.exports=router;