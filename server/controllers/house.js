const House = require("../models/house").House;
// const User = require("../models/user").User;
var houseData = require("../houseDatabase.json");
module.exports = {
    addHouse: async (req, res) => {
        try {
            const { address, zipcode, price, photo_link, num_bed, num_bath } =
                req.body;
            await House.create({
                address,
                zipcode,
                price,
                photo_link,
                num_bed,
                num_bath,
            });
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN addHouse");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getHouse: async (req, res) => {
        try {
            const { id } = req.params;
            const house = await House.findAll({ where: { id: +id } });
            res.status(200).send(house[0]);
        } catch (error) {
            console.log("ERROR IN getAllHouses");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getAllHouses: async (req, res) => {
        try {
            const houses = await House.findAll();
            res.status(200).send(houses);
        } catch (error) {
            console.log("ERROR IN getAllHouses");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getAllZipcodes: async (req, res) => {
        try {
            var zipcodes = await House.findAll({
                attributes: ["zipcode"],
                distinct: true,
            });
            zipcodes = zipcodes.map((a) => a.zipcode);
            zipcodes = zipcodes.filter(
                (value, index, array) => array.indexOf(value) === index
            );
            res.status(200).send(zipcodes);
        } catch (error) {
            console.log("ERROR IN getAllHouses");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getPageHouses: async (req, res) => {
        try {
            const { id } = req.params;
            const houses = await House.findAll({
                offset: id * 20,
                limit: 20,
                order: [["id", "ASC"]],
            });
            res.status(200).send(houses);
        } catch (error) {
            console.log("ERROR IN getAllHouses");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getZipcodeHouses: async (req, res) => {
        try {
            const { zipcode, page } = req.params;
            console.log(zipcode, page);
            const houses = await House.findAll({
                where: { zipcode: zipcode },
                offset: page * 20,
                limit: 20,
                order: [["id", "ASC"]],
            });
            res.status(200).send(houses);
        } catch (error) {
            console.log("ERROR IN getAllHouses");
            console.log(error);
            res.sendStatus(400);
        }
    },
    addBulkHouses: async (req, res) => {
        try {
            await House.bulkCreate(houseData);
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN addBulkHouse");
            console.log(error);
            res.sendStatus(400);
        }
    },
    editHouse: async (req, res) => {
        try {
            const { id } = req.params;
            const { address, zipcode, price, photo_link, num_bed, num_bath } =
                req.body;
            await House.update(
                {
                    address: address,
                    zipcode: zipcode,
                    price: price,
                    photo_link: photo_link,
                    num_bed: num_bed,
                    num_bath: num_bath,
                },
                {
                    where: { id: +id },
                }
            );
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN getCurrentUserPosts");
            console.log(error);
            res.sendStatus(400);
        }
    },
    deleteHouse: async (req, res) => {
        try {
            const { id } = req.params;
            await House.destroy({ where: { id: +id } });
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN getCurrentUserPosts");
            console.log(error);
            res.sendStatus(400);
        }
    },
};
