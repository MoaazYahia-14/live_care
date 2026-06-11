import { Request, Response } from 'express'
import Settings from '../models/Settings'

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne()
    
    // Seed default settings if not exists
    if (!settings) {
      settings = await Settings.create({})
    }
    
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ' })
  }
}

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne()

    if (!settings) {
      settings = new Settings(req.body)
    } else {
      settings.storeName = req.body.storeName || settings.storeName
      settings.supportEmail = req.body.supportEmail || settings.supportEmail
      settings.phoneNumber = req.body.phoneNumber || settings.phoneNumber
      settings.whatsappNumber = req.body.whatsappNumber || settings.whatsappNumber
      
      if (req.body.heroTitle !== undefined) settings.heroTitle = req.body.heroTitle
      if (req.body.heroSubtitle !== undefined) settings.heroSubtitle = req.body.heroSubtitle
      if (req.body.heroPrimaryCta !== undefined) settings.heroPrimaryCta = req.body.heroPrimaryCta
      if (req.body.heroSecondaryCta !== undefined) settings.heroSecondaryCta = req.body.heroSecondaryCta
      if (req.body.heroImage !== undefined) settings.heroImage = req.body.heroImage
      
      if (req.body.aboutBadge !== undefined) settings.aboutBadge = req.body.aboutBadge
      if (req.body.aboutTitle !== undefined) settings.aboutTitle = req.body.aboutTitle
      if (req.body.aboutText !== undefined) settings.aboutText = req.body.aboutText
      if (req.body.aboutImage !== undefined) settings.aboutImage = req.body.aboutImage
      
      if (req.body.contactBannerTitle !== undefined) settings.contactBannerTitle = req.body.contactBannerTitle
      if (req.body.whatsappGreeting !== undefined) settings.whatsappGreeting = req.body.whatsappGreeting
      if (req.body.footerText !== undefined) settings.footerText = req.body.footerText
      
      // About Page Fields
      if (req.body.aboutPageHeroTitle !== undefined) settings.aboutPageHeroTitle = req.body.aboutPageHeroTitle
      if (req.body.aboutPageHeroSubtitle !== undefined) settings.aboutPageHeroSubtitle = req.body.aboutPageHeroSubtitle
      if (req.body.aboutPageStoryBadge !== undefined) settings.aboutPageStoryBadge = req.body.aboutPageStoryBadge
      if (req.body.aboutPageStoryTitle !== undefined) settings.aboutPageStoryTitle = req.body.aboutPageStoryTitle
      if (req.body.aboutPageStoryP1 !== undefined) settings.aboutPageStoryP1 = req.body.aboutPageStoryP1
      if (req.body.aboutPageStoryP2 !== undefined) settings.aboutPageStoryP2 = req.body.aboutPageStoryP2
      if (req.body.aboutPageStoryTrustBadge !== undefined) settings.aboutPageStoryTrustBadge = req.body.aboutPageStoryTrustBadge
      if (req.body.aboutPageStoryBtnText !== undefined) settings.aboutPageStoryBtnText = req.body.aboutPageStoryBtnText
      if (req.body.aboutPageStoryImage !== undefined) settings.aboutPageStoryImage = req.body.aboutPageStoryImage
      if (req.body.aboutPageStats !== undefined) {
        settings.set('aboutPageStats', req.body.aboutPageStats);
        settings.markModified('aboutPageStats');
      }
      if (req.body.aboutPageValuesTitle !== undefined) settings.aboutPageValuesTitle = req.body.aboutPageValuesTitle
      if (req.body.aboutPageValuesSubtitle !== undefined) settings.aboutPageValuesSubtitle = req.body.aboutPageValuesSubtitle
      if (req.body.aboutPageMissionTitle !== undefined) settings.aboutPageMissionTitle = req.body.aboutPageMissionTitle
      if (req.body.aboutPageMissionText !== undefined) settings.aboutPageMissionText = req.body.aboutPageMissionText
      if (req.body.aboutPageVisionTitle !== undefined) settings.aboutPageVisionTitle = req.body.aboutPageVisionTitle
      if (req.body.aboutPageVisionText !== undefined) settings.aboutPageVisionText = req.body.aboutPageVisionText
      if (req.body.aboutPageCTATitle !== undefined) settings.aboutPageCTATitle = req.body.aboutPageCTATitle
      if (req.body.aboutPageCTABtnText !== undefined) settings.aboutPageCTABtnText = req.body.aboutPageCTABtnText
      if (req.body.aboutPageCTAImage !== undefined) settings.aboutPageCTAImage = req.body.aboutPageCTAImage
      
      // Contact Page Fields
      if (req.body.contactPageHeroTitle !== undefined) settings.contactPageHeroTitle = req.body.contactPageHeroTitle
      if (req.body.contactPageHeroSubtitle !== undefined) settings.contactPageHeroSubtitle = req.body.contactPageHeroSubtitle
      if (req.body.contactPageAddress !== undefined) settings.contactPageAddress = req.body.contactPageAddress
      if (req.body.contactPageMapBadge !== undefined) settings.contactPageMapBadge = req.body.contactPageMapBadge
      if (req.body.contactPageMapIframe !== undefined) settings.contactPageMapIframe = req.body.contactPageMapIframe
      if (req.body.contactPageImage !== undefined) settings.contactPageImage = req.body.contactPageImage
      if (req.body.contactPageImageOverlayTitle !== undefined) settings.contactPageImageOverlayTitle = req.body.contactPageImageOverlayTitle
      if (req.body.contactPageImageOverlayDesc !== undefined) settings.contactPageImageOverlayDesc = req.body.contactPageImageOverlayDesc
      if (req.body.contactPageWorkingHours !== undefined) {
        settings.set('contactPageWorkingHours', req.body.contactPageWorkingHours);
        settings.markModified('contactPageWorkingHours');
      }
      
      if (req.body.socialLinks) {
        settings.socialLinks = { ...settings.socialLinks, ...req.body.socialLinks }
      }
      
      if (req.body.notifications) {
        settings.notifications = { ...settings.notifications, ...req.body.notifications }
      }
    }

    const updatedSettings = await settings.save()
    res.json(updatedSettings)
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ' })
  }
}
