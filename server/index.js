const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_PORT;
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { House } = require("./models/house");
const { Favorite } = require("./models/favorite");

User.hasMany(Favorite);
Favorite.belongsTo(User);

app.use(express.json());
app.use(cors());
const {
    getHouse,
    getAllHouses,
    getAllZipcodes,
    addHouse,
    addBulkHouses,
    getPageHouses,
    getZipcodeHouses,
    editHouse,
    deleteHouse,
} = require("./controllers/house");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const {
    getAllFavorites,
    getCurrentUserFavorites,
    getCurrentUserHouses,
    deleteFavorite,
    addFavorite,
    deleteUserFavorite
} = require("./controllers/favorite");

app.post("/register", register);
app.post("/login", login);
app.get("/favorites", getAllFavorites);
app.post("/favorites", addFavorite);
app.get("/userfavorites/:userId", getCurrentUserFavorites);
app.get("/userhouses/:userId", getCurrentUserHouses);
app.delete("/userfavorite", deleteUserFavorite);
app.delete("/favorites/:id", deleteFavorite);
app.get("/houses", getAllHouses);
app.get("/zipcodes", getAllZipcodes);
app.get("/house/:id", getHouse);
app.get("/houses/:id", getPageHouses);
app.get("/zipcodehouses/:zipcode/:page", getZipcodeHouses);
app.post("/houses", isAuthenticated, addHouse);
app.post("/seed", addBulkHouses);
app.put("/houses/:id", isAuthenticated, editHouse);
app.delete("/houses/:id", isAuthenticated, deleteHouse);

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`db sync successful & server running on port ${PORT}`)
        );
    })
    .catch((err) => console.log(err));

