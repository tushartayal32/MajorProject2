require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

console.log("URL:", process.env.ATLASDB_URL);

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
  await initDB();
}

main().catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66f7f6554a00e701aa41e0c9",
      category: ["Trending", "Rooms", "Mountains", "Castles", "Camping", "Farms"][
      Math.floor(Math.random() * 6)
    ],
    geometry: {
      type: "Point",
      coordinates: [77.209, 28.6139], // dummy (Delhi)
    },
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
