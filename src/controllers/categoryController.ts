import { Request, Response } from 'express'
import Category from '../models/Category'

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    let categories = await Category.find({})
    
    // Seed default categories if none exist
    if (categories.length === 0) {
      const defaultCats = [
        { name: 'أجهزة طبية', slug: 'medical-devices', subcategories: [] },
        { name: 'مستحضرات تجميل', slug: 'cosmetics', subcategories: [] }
      ]
      categories = await Category.insertMany(defaultCats)
    }
    
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ' })
  }
}

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = new Category(req.body)
    const createdCategory = await category.save()
    res.status(201).json(createdCategory)
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ' })
  }
}

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id)

    if (category) {
      category.name = req.body.name || category.name
      category.slug = req.body.slug || category.slug
      category.icon = req.body.icon || category.icon
      category.subcategories = req.body.subcategories || category.subcategories

      const updatedCategory = await category.save()
      res.json(updatedCategory)
    } else {
      res.status(404).json({ error: 'غير موجود' })
    }
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ' })
  }
}

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id)

    if (category) {
      await category.deleteOne()
      res.json({ message: 'تم الحذف' })
    } else {
      res.status(404).json({ error: 'غير موجود' })
    }
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ' })
  }
}
