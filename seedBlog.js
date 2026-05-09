require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Blog = require('./models/Blog');

const oldBlogs = [
  { title: "Ligula vel urna accumsan placerat", cover: "", category: "INDUSTRY", date: "JANUARY 12, 2023", order: 1 },
  { title: "Don't underestimate the lorem ipsum dolor amet", cover: "", category: "TIPS & TRICKS", date: "OCTOBER 20, 2023", order: 2 },
  { title: "Building the real VR lorem ipsum dolor amet glavrida from a scratch", cover: "", category: "TIPS & TRICKS", date: "OCTOBER 9, 2023", order: 3 },
  { title: "What eleifend posuere tincidunt", cover: "", category: "EVENTS", date: "OCTOBER 8, 2023", order: 4 },
];

const seed = async () => {
  await connectDB();
  for (const blog of oldBlogs) {
    const exists = await Blog.findOne({ title: blog.title });
    if (!exists) {
      await Blog.create(blog);
      console.log(`✅ Added: ${blog.title}`);
    } else {
      console.log(`⏭️ Already exists: ${blog.title}`);
    }
  }
  console.log('🎉 Done!');
  mongoose.connection.close();
};

seed();