const { portofolio } = require('../models');
const { v4: uuid4 } = require('uuid');

module.exports = {
    // upload data portofolio
    postDataPorto: (req, res) => {
        const { body } = req;
        const id = uuid4();
        const userId = req.decodedToken.id

        const DataPorto = {
            image: req.Image.url,
            id,
            userId,
            ...body
        }
        portofolio.create(DataPorto)
            .then((data) => {
                res.status(200).send({
                    msg: "succes post data",
                    status: 200,
                    data,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    msg: 'failed get data',
                    status: 500,
                    err,
                })
            })
    },
    // get detail data portofolio
    getDetailPorto: async (req, res) => {
        try {
            const { id } = req.params;
            const dataPorto = await portofolio.findOne({
                where: { id }
            })
            // const dataPorto = await portofolio.findAll();
            res.status(200).send({
                msg: 'Success get detail portofolio',
                status: 200,
                dataPorto
            })

        } catch (error) {
            res.status(500).send({
                msg: 'Failed get detail portofolio',
                status: 500,
                error
            })
        }
    },
    // update data portofolio
    updateDataPorto: async (req, res) => {
        const { id } = req.params;
        const { title, deskripsi, linkproject } = req.body;
        try {
            const dataPorto = await portofolio.findOne({
                where: { id }
            })
            if (!dataPorto) {
                return res.status(404).send({ msg: 'Data not found.' });
            }
            if (dataPorto.userId !== req.decodedToken.id) {
                res.send({
                    msg: 'failed update data',
                    error: 'error user id tidak sama dengan data user'
                })
            } else {
                dataPorto.title = title;
                dataPorto.deskripsi = deskripsi;
                dataPorto.linkproject = linkproject;
                await dataPorto.save();
                res.send({
                    msg: 'success update data',
                    status: 200,
                    dataPorto
                })
            }
        } catch (error) {
            res.status(500).send({
                msg: 'Failed update data portofolio',
                status: 500,
                error
            })
        }
    },

    deleteDataPorto: (req, res) => {
        const { id } = req.params;

        portofolio.destroy({
            where: {id}
        })
        .then((data) => {
            res.status(200).send({
                msg: 'success delete data',
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                msg: 'failed delete data',
                status: 500,
                error
            })
        })
    },

    getAllDataPorto: (req, res) => {
        portofolio.findAll()
        .then((data) => {
            res.send({
                msg: 'success get all data portofolio',
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.send({
                msg: 'failed get all data',
                status: 500,
                error
            })
        })
    }
}