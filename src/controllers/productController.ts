import { Request, Response } from 'express'
import Product from '../models/Product'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    let query: any = {};

    // Filter by category if provided
    if (category && category !== 'الكل' && category !== 'all') {
      query.category = category;
    }

    // Filter by search text in multiple fields
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { subCategory: searchRegex },
        { sku: searchRegex },
        { 'features.title': searchRegex },
        { 'features.description': searchRegex }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء جلب المنتجات' });
  }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = new Product(req.body)
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء المنتج' })
  }
}

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: 'المنتج غير موجود' })
    }
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ' })
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      product.title = req.body.title || product.title
      product.sku = req.body.sku || product.sku
      product.description = req.body.description || product.description
      product.category = req.body.category || product.category
      product.subCategory = req.body.subCategory !== undefined ? req.body.subCategory : product.subCategory
      product.price = req.body.price || product.price
      product.oldPrice = req.body.oldPrice || product.oldPrice
      product.features = req.body.features || product.features
      product.images = req.body.images || product.images
      product.isActive = req.body.isActive !== undefined ? req.body.isActive : product.isActive
      product.isPopular = req.body.isPopular !== undefined ? req.body.isPopular : product.isPopular

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ error: 'المنتج غير موجود' })
    }
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث المنتج' })
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.deleteOne()
      res.json({ message: 'تم حذف المنتج بنجاح' })
    } else {
      res.status(404).json({ error: 'المنتج غير موجود' })
    }
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء حذف المنتج' })
  }
}
