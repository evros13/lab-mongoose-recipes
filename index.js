const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const password = require("./password")

const Schema = mongoose.Schema;

const MONGODB_URI = `mongodb+srv://evros:${password}@cluster0.pek9mht.mongodb.net/MyFirstDatabase`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    const nutellaSandwich = {
      "title": "Nutella sandwich",
      "level": "Amateur Chef",
      "ingredients": [
        "Lots of nutella",
        "Freshly baked bread",
        "A pinch of maldon salt",
      ],
      "cuisine": "Casal d'estiu",
      "dishType": "snack",
      "image": "https://assets.epicurious.com/photos/5b8863a51c53e84aa2655f56/1:1/w_2560%2Cc_limit/Nutella-Grilled-Cheese-29302018.jpg",
      "duration": 5,
      "creator": "Edna Vros"
    }
    Recipe.create(nutellaSandwich)
  })
  .then((element) => console.log(element.title))
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((alltherecipes) => {
    alltherecipes.forEach((recipe) => {
      console.log(recipe.title)
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then(updatedRecipe => console.log("THIS RECIPE HAS BEEN UPDATED: ", updatedRecipe))
  .then(() => {
   return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then((deletedRecipe) => console.log("THIS RECIPE HAS BEEN DELETED: ", deletedRecipe))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close
  })



