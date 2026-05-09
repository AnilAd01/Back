const mongoose = require("mongoose")
const Showcase = require("./models/Showcase")
require("dotenv").config()

const items = [
  { title: "Neon Lights", category: "DIGITAL MARKETING", order: 1, cover: "" },
  { title: "Futuristic Furniture", category: "WEBSITES", order: 2, cover: "" },
  { title: "Smart Living", category: "WEBSITES", order: 3, cover: "" },
  { title: "Light Painting", category: "BRANDING", order: 4, cover: "" },
  { title: "Ideabox", category: "BRANDING", order: 5, cover: "" },
  { title: "VR Experience", category: "WEBSITES", order: 6, cover: "" },
]

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Showcase.deleteMany({}) // clear old test data like "bfgh"
  await Showcase.insertMany(items)
  console.log("✅ Showcase seeded!")
  process.exit()
}).catch(err => {
  console.error(err)
  process.exit(1)
})