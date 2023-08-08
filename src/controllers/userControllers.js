const { user, portofolio, usersosmed, sosmed } = require('../models');
const { Op } = require('sequelize');

module.exports = {

    searchUser: async(req, res) => {
        const {s} = req.query;
        try {
            
            const searchUser = await user.findAll({
                where: {
                    [Op.or]: [
                        {
                            username: {
                                [Op.like]: `%${s}%`
                            }
                        },
                        {
                            email: {
                                [Op.like]: `%${s}%@gmail.com`
                            }
                        }
                    ]
                }
            })
            res.status(200).send({
                msg: 'success search data',
                status: 200,
                searchUser
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed search data',
                status: 500,
                error
            })
        }
            
    },

    getAllDataUserById: async (req, res) => {
        try {
            const { id } = req.params;

            // query
            const DataUser = await user.findOne({
                where: { id },
                include: {
                    model: portofolio,
                    as: 'portofolio',
                    attributes: ['id', 'title', 'image'],
                },
                // attributes: ['username', 'email'],
            })
          
            const userSosmed = await usersosmed.findAll({
                where: {userId: id},
                include :
                {
                model:sosmed,
                as: "sosmeds",
                attributes: ['nama'],
                },
                attributes: ['linksosmed']
            })
            const testData = userSosmed.map(e => {
                return {
                    image: e.linksosmed
                }
            })
            console.log(testData);
            // logic
            // let portoUser = getSosmedUser.map(element => {
            //     return {
            //         id: element.id,
            //         image: element.image,
            //         title: element.title,
            //         users: element.users
            //     }
            // });
            const data = {
                id: DataUser.id,
                username: DataUser.username,
                email: DataUser.email,
                address: DataUser.address,
                nohp: DataUser.nohp,
                verify: DataUser.verify,
                portofolio: DataUser.portofolio,
                userSosmed
                // getSosmedUser
                // portoUser
                    // id: newDataPorto.id,
                    // image: newDataPorto.image,
                    // title: newDataPorto.title,
            }
            res.status(200).send({
                msg: 'success get data user',
                status: 200,
                data: data
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get data user',
                status: 500,
                error
            })
        }
    },

    editDataUser: async (req, res) => {
        const id = req.decodedToken.id;
        const { username, address, nohp } = req.body;
        try {
            const userData = await user.findOne({
                where: { id }
            })
            if (!userData) {
                return res.status(404).json({ msg: 'User not found.' });
            }
            userData.username = username;
            userData.address = address;
            userData.nohp = nohp;

            await userData.save();

            res.status(200).send({
                msg: 'success update data user',
                status: 200,
                userData
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed update data',
                status: 500,
                error
            })
        }
    },

    getAllUser: async(req, res) => {
        try {
            const data = await user.findAll()
            let getAllUser = data.map((element) => {
                return {
                    id: element.id,
                    username: element.username,
                    email: element.email
                }
            })
                res.status(200).send({
                    msg: 'success get data',
                    status: 200,
                    getAllUser
                })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get All data',
                status: 500,
                error
            })
        }
    },
}