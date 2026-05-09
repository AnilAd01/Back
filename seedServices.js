require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Service = require('./models/Service');

const oldServices = [
  {
    title: "Web Design & Development",
    cover: "",
    order: 1,
    desc: [
      { text: "Web design" },
      { text: "Web development" },
      { text: "Custom icons & illustrations" },
      { text: "Hosting" },
      { text: "Website audit" }
    ]
  },
  {
    title: "Digital Marketing",
    cover: "",
    order: 2,
    desc: [
      { text: "Social media marketing" },
      { text: "Marketing campaigns" },
      { text: "Marketing management" },
      { text: "SEO" }
    ]
  },
  {
    title: "E-Commerce",
    cover: "",
    order: 3,
    desc: [
      { text: "E-Commerce website design" },
      { text: "WooCommerce" },
      { text: "Content management" },
      { text: "Hosting" }
    ]
  },
  {
    title: "Branding & Creative Services",
    cover: "",
    order: 4,
    desc: [
      { text: "Visual identity" },
      { text: "Branding for social media" },
      { text: "Custom illustrations" }
    ]
  },
];

const seed = async () => {
  await connectDB();
  for (const service of oldServices) {
    const exists = await Service.findOne({ title: service.title });
    if (!exists) {
      await Service.create(service);
      console.log(`✅ Added: ${service.title}`);
    } else {
      console.log(`⏭️ Already exists: ${service.title}`);
    }
  }
  console.log('🎉 Done!');
  mongoose.connection.close();
};

seed();