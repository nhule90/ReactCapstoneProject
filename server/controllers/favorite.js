const user = require("../models/user");
const { sequelize } = require("../util/database");
const Favorite = require("../models/favorite").Favorite;
const User = require("../models/user").User;
const { QueryTypes } = require("sequelize");
module.exports = {
    addFavorite: async (req, res) => {
        try {
            const { house_id, userId } = req.body;
            await Favorite.create({ house_id, userId });
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN addFavorites");
            console.log(error);
            res.sendStatus(400);
        }
    },
    deleteUserFavorite: async (req, res) => {
        try {
            const { house_id, userId } = req.body;
            await Favorite.destroy({
                where: { house_id: +house_id, userId: +userId },
            });
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN deleteUserFavorites");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getAllFavorites: async (req, res) => {
        try {
            const favs = await Favorite.findAll();
            res.status(200).send(favs);
        } catch (error) {
            console.log("ERROR IN getAllPosts");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getCurrentUserFavorites: async (req, res) => {
        try {
            const { userId } = req.params;
            var favs = await Favorite.findAll({
                where: { userId: userId },
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: [`username`],
                    },
                ],
            });
            favs = favs.map((a) => a.dataValues.house_id);
            favs = favs.filter(
                (value, index, array) => array.indexOf(value) === index
            );
            res.status(200).send(favs);
        } catch (error) {
            console.log("ERROR IN getCurrentUserFavorites");
            console.log(error);
            res.sendStatus(400);
        }
    },
    getCurrentUserHouses: async (req, res) => {
        try {
            const { userId } = req.params;
            var houses = await sequelize.query(        `
            SELECT DISTINCT hou.*
            FROM public.favorites AS fav
                LEFT JOIN
                    public.houses AS hou
                    ON fav.house_id = hou.id
            WHERE "userId"=${userId}
            ORDER BY hou.id
                `,
                {
                    type: QueryTypes.SELECT,
                }
            );
            res.status(200).send(houses);
        } catch (error) {
            console.log("ERROR IN getCurrentUserHouses");
            console.log(error);
            res.sendStatus(400);
        }
    },
    deleteFavorite: async (req, res) => {
        try {
            const { id } = req.params;
            await Favorite.destroy({ where: { id: +id } });
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN deleteFavorite");
            console.log(error);
            res.sendStatus(400);
        }
    },
};
