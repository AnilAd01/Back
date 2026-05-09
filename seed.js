require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const TeamMember = require('./models/TeamMember');

const oldTeamData = [
  { title: "Alexander Black", post: "FOUNDER, CEO", cover: "", order: 1 },
  { title: "Anna Kovalenko", post: "FINANCE DIRECTOR", cover: "", order: 2 },
  { title: "Tiffany White", post: "CREATIVE DIRECTOR", cover: "", order: 3 },
  { title: "Richard Greenwood", post: "PROGRAMMER", cover: "", order: 4 },
  { title: "Jessica Brown", post: "MARKETING DIRECTOR", cover: "", order: 5 },
  { title: "Gregory Windstorm", post: "ACCOUNTING MANAGER", cover: "", order: 6 },
  { title: "Anna Red", post: "PROJECT MANAGER", cover: "", order: 7 },
  { title: "Join our team!", post: "", cover: "", order: 8 },
];

const seed = async () => {
  await connectDB();
  // DON'T delete existing — just add missing ones
  for (const member of oldTeamData) {
    const exists = await TeamMember.findOne({ title: member.title });
    if (!exists) {
      await TeamMember.create(member);
      console.log(`✅ Added: ${member.title}`);
    } else {
      console.log(`⏭️ Already exists: ${member.title}`);
    }
  }
  console.log('🎉 Done!');
  mongoose.connection.close();
};

seed();