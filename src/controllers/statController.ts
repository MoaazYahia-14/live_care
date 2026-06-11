import { Request, Response } from 'express'
import Product from '../models/Product'
import Category from '../models/Category'

// @desc    Get dashboard stats
// @route   GET /api/stats
// @access  Public (or Private depending on needs, we'll keep it public for easy fetching like other routes for now)
export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalProducts = await Product.countDocuments()
    const activeProducts = await Product.countDocuments({ isActive: true })
    const categoriesCount = await Category.countDocuments()
    
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title sku category price images createdAt')

    // Category Distribution
    const categoryDistributionAgg = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ])
    
    const categoryDistribution = categoryDistributionAgg.map(item => ({
      label: item._id,
      value: totalProducts > 0 ? Math.round((item.count / totalProducts) * 100) : 0,
      count: item.count
    }))

    // Weekly Growth (last 7 days including today)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const weeklyProducts = await Product.find({ createdAt: { $gte: sevenDaysAgo } })
    
    // Initialize last 7 days array
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    const weeklyGrowthMap = new Map()
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      weeklyGrowthMap.set(days[d.getDay()], 0)
    }

    weeklyProducts.forEach(p => {
      const dayName = days[new Date(p.createdAt).getDay()]
      if (weeklyGrowthMap.has(dayName)) {
        weeklyGrowthMap.set(dayName, weeklyGrowthMap.get(dayName) + 1)
      }
    })

    const weeklyGrowth = Array.from(weeklyGrowthMap, ([day, count]) => ({ day, count }))

    res.json({
      totalProducts,
      activeProducts,
      categoriesCount,
      recentProducts,
      categoryDistribution,
      weeklyGrowth
    })
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ في جلب الإحصائيات' })
  }
}
