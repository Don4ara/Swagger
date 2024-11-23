const Product = require('../models/Product') // Модель Product

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving products', error: error.message })
  }
}

exports.createProduct = async (req, res) => {
  const { name, price } = req.body
  try {
    const product = await Product.create({ name, price })
    res.status(201).json(product)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating product', error: error.message })
  }
}

exports.getProductById = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving product', error: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, price } = req.body

  try {
    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    product.name = name || product.name
    product.price = price || product.price
    await product.save()

    res.json(product)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating product', error: error.message })
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await product.destroy()
    res.status(204).json({ message: 'Product deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message })
  }
}
