const { usersosmed, sosmed, user } = require('../models');
const { v4: uuid4 } = require('uuid');

module.exports = {
    
    postDataUserSosmed: async(req, res) => {
        const userId = req.decodedToken.id;
        const id = uuid4();
        // const { sosmedId }
        const { sosmedId, linksosmed } = req.body;
        try {
            const sosmedlink = `https://${linksosmed}`
            
            const newData = {
                id,
                userId,
                sosmedId,
                linksosmed: sosmedlink
            }
            // const getsosmedid = await usersosmed.findAll()
            // const getsosmedidobj = getsosmedid.map(e => {
            //     return {
            //         sosmedId : e.sosmedId
            //     }
            // })
            // console.log(newData.sosmedId);
            // console.log(getsosmedidobj === newData.sosmedId);
            // if (sosmedId === newData.sosmedId) {
            //     res.send({
            //         msg: 'failed post data',
            //         status: 400,
            //         error: 'sosmed sudah tercantum'
            //     })
            // } else if(sosmedId !== newData.sosmedId) {
                usersosmed.create(newData)
                        res.send({
                            msg: 'success post data',
                            status: 200,
                            newData
                        })
            // }
        } catch (error) {
            res.send({
                msg: 'error post data',
                status: 500,
                error
            })
        }
    },
    getSosmed: (req, res) => {
        usersosmed.findAll({
            include:
            {
                model: sosmed,
                as: "sosmeds",
                attributes: ['nama'],
            },
            attributes: ['linksosmed']

        })
            .then((data) => {
                res.send({
                    msg: 'success get data',
                    status: 200,
                    data
                })
            })
            .catch((error) => {
                res.send({
                    msg: 'failed get data',
                    status: 500,
                    error
                })
            })
    },
    searchUser: async (req, res) => {
        const { s } = req.query;
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
}