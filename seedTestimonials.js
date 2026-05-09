require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Testimonial = require('./models/Testimonial');

const oldTestimonials = [
  { name: "Alexander Black", post: "Seven consulting - CEO", cover: "", desc: "Nunc fermentum - tempus erat ligula, sit amet lacinia justo cursus ac. Suspendisse quis nulla tincidunt! Lorem ipsum dolor amet at ornare ex, quis fringilla tortor!", order: 1 },
  { name: "Diana Green", post: "Seven Arts - marketing manager", cover: "", desc: "Cras at ornare fermentum quam et tortor euismod, vel maximus metus tristique at ornare ex, quis fringilla tortor. Aenean semper neque quis consectetur lobortis.", order: 2 },
  { name: "Alexander Black", post: "Seven consulting - CEO", cover: "", desc: "Nunc fermentum - tempus erat ligula, sit amet lacinia justo cursus ac. Suspendisse quis nulla tincidunt!", order: 3 },
  { name: "Diana Green", post: "Seven Arts - marketing manager", cover: "", desc: "Cras at ornare fermentum quam et tortor euismod, vel maximus metus tristique.", order: 4 },
];

const seed = async () => {
  await connectDB();
  for (const item of oldTestimonials) {
    const exists = await Testimonial.findOne({ name: item.name, post: item.post, order: item.order });
    if (!exists) {
      await Testimonial.create(item);
      console.log(`✅ Added: ${item.name}`);
    } else {
      console.log(`⏭️ Already exists: ${item.name}`);
    }
  }
  console.log('🎉 Done!');
  mongoose.connection.close();
};

seed();