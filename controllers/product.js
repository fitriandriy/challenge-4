const { products } = require('./../models');

module.exports = {
  index: async (req, res, next) => {
    try {
      const data = await products.findAll();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: data
      });
    } catch (err) {
      next(err);
    }
  },
  store: async (req, res, next) => {
    try {
      const { name, quantity } = req.body;

      const product = await products.create({
        name: name,
        quantity: quantity
      })

      return res.status(201).json({
        status: true,
        message: 'success',
        data: product
      });
    } catch (err) {
      next(err);
    }
  },
  show: async (req, res, next) => {
    try {
      const product_id = req.params.id;
      const product = await products.findOne({where: {id: product_id}})

      if (!product) {
        return res.status(404).json({
          status: false,
          message: 'data not found',
          data: null
        });
      }
      return res.status(200).json({
        status: true,
        message: 'success',
        data: product,
      })
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const product_id = req.params.id;

      const updated = await products.update(
        req.body, {where:
        {id: product_id}})
      
      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `product with id ${product_id} is not found`,
          data: null
        })
      }

      return res.status(201).json({
        message: 'success',
        data: updated
      })
    } catch(err) {
      next(err);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const product_id = req.params.id;

      const deleted = await products.destroy({where:
      {id: product_id}})

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `product with id ${product_id} is not found`,
          data: deleted
        })
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: deleted
      })
    } catch(err) {
      next(err);
    }
  }
}
