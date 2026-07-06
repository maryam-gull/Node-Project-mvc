// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  // save() {
  //   Home.fetchAll((registeredHomes) => {
  //     registeredHomes.push(this);
  //     const homeDataPath = path.join(rootDir, "data", "homes.json");
  //     fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
  //       console.log("File Writing Concluded", error);
  //     });
  //   });
  // }
save() {
  Home.fetchAll((registeredHomes) => {
    // Validate and fix photo URL
    if (!this.photoUrl || this.photoUrl.trim() === '' || this.photoUrl === 'asdf') {
      this.photoUrl = `https://picsum.photos/seed/${this.houseName}/400/300`;
    }
    registeredHomes.push(this);
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
      console.log("File Writing Concluded", error);
    });
  });
}

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};