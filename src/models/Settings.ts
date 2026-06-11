import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ISettings extends Document {
  storeName: string
  supportEmail: string
  phoneNumber: string
  whatsappNumber: string
  socialLinks: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  heroTitle: string
  heroSubtitle: string
  heroPrimaryCta: string
  heroSecondaryCta: string
  heroImage: string
  aboutBadge: string
  aboutTitle: string
  aboutText: string
  aboutImage: string
  contactBannerTitle: string
  whatsappGreeting: string
  footerText: string
  aboutPageHeroTitle: string
  aboutPageHeroSubtitle: string
  aboutPageStoryBadge: string
  aboutPageStoryTitle: string
  aboutPageStoryP1: string
  aboutPageStoryP2: string
  aboutPageStoryTrustBadge: string
  aboutPageStoryBtnText: string
  aboutPageStoryImage: string
  aboutPageStats: { number: string; desc: string }[]
  aboutPageValuesTitle: string
  aboutPageValuesSubtitle: string
  aboutPageMissionTitle: string
  aboutPageMissionText: string
  aboutPageVisionTitle: string
  aboutPageVisionText: string
  aboutPageCTATitle: string
  aboutPageCTABtnText: string
  aboutPageCTAImage: string
  contactPageHeroTitle: string
  contactPageHeroSubtitle: string
  contactPageAddress: string
  contactPageWorkingHours: { day: string; time: string; closed: boolean }[]
  contactPageMapBadge: string
  contactPageMapIframe: string
  contactPageImage: string
  contactPageImageOverlayTitle: string
  contactPageImageOverlayDesc: string
  notifications: {
    newOrder: boolean
    lowStock: boolean
    weeklyReport: boolean
  }
  createdAt: Date
  updatedAt: Date
}

const SettingsSchema = new Schema<ISettings>(
  {
    storeName: { type: String, default: 'لايف كير الطبية' },
    supportEmail: { type: String, default: 'support@livecare.com' },
    phoneNumber: { type: String, default: '+966 50 000 0000' },
    whatsappNumber: { type: String, default: '+966 50 000 0000' },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    heroTitle: { type: String, default: 'الجودة والدقة في كل جهاز' },
    heroSubtitle: { type: String, default: 'نوفر لك أحدث الأجهزة الطبية ومستحضرات التجميل المعتمدة لضمان صحتك وجمالك بأعلى المعايير.' },
    heroPrimaryCta: { type: String, default: 'تصفح منتجاتنا' },
    heroSecondaryCta: { type: String, default: 'من نحن' },
    heroImage: { type: String, default: '' },
    aboutBadge: { type: String, default: 'ريادة وتميز' },
    aboutTitle: { type: String, default: 'رؤيتنا نحو مستقبل طبي أفضل' },
    aboutText: { type: String, default: 'في لايف كير، نسعى لتقديم أحدث الحلول الطبية والجمالية التي ترتقي بمستوى الرعاية الصحية...' },
    aboutImage: { type: String, default: '' },
    contactBannerTitle: { type: String, default: 'هل تحتاج إلى مساعدة أو استشارة؟' },
    whatsappGreeting: { type: String, default: 'نحن هنا لمساعدتك دائماً' },
    footerText: { type: String, default: 'الوجهة الأولى للمستلزمات الطبية الفاخرة وأدوات التجميل المتطورة في المنطقة. نضمن لك أعلى معايير الجودة للصحة والجمال.' },
    aboutPageHeroTitle: { type: String, default: 'عن شركة لايف كير' },
    aboutPageHeroSubtitle: { type: String, default: 'نحن رواد في تقديم الحلول الطبية ومنتجات التجميل المتطورة، حيث نجلب الابتكار العالمي إلى الرعاية المحلية بجودة لا تضاهى.' },
    aboutPageStoryBadge: { type: String, default: 'قصتنا ونجاحنا' },
    aboutPageStoryTitle: { type: String, default: 'عقد من التميز في الرعاية الطبية والتجميلية' },
    aboutPageStoryP1: { type: String, default: 'تأسست لايف كير برؤية واضحة: سد الفجوة بين التقنيات الطبية العالمية والمستهلك المحلي. بدأنا كفريق صغير من المتخصصين الذين يجمعهم شغف واحد، وهو الارتقاء بجودة الحياة من خلال منتجات ذات موثوقية عالية.' },
    aboutPageStoryP2: { type: String, default: 'اليوم، نفخر بكوننا الشريك المفضل لأكبر المستشفيات ومراكز التجميل، حيث نقدم مجموعة شاملة من الأجهزة والمستلزمات التي تخضع لأعلى معايير الرقابة والجودة الدولية.' },
    aboutPageStoryTrustBadge: { type: String, default: 'مرخصون ومعتمدون' },
    aboutPageStoryBtnText: { type: String, default: 'اقرأ المزيد' },
    aboutPageStoryImage: { type: String, default: '' },
    aboutPageStats: [{
      number: { type: String },
      desc: { type: String }
    }],
    aboutPageValuesTitle: { type: String, default: 'قيمنا الجوهرية' },
    aboutPageValuesSubtitle: { type: String, default: 'نحن لا نبيع المنتجات فحسب، بل نبني علاقات قائمة على الثقة والشفافية والالتزام بالنتائج.' },
    aboutPageMissionTitle: { type: String, default: 'رسالتنا' },
    aboutPageMissionText: { type: String, default: 'تمكين المتخصصين في الرعاية الصحية والتجميلية من خلال توفير أحدث التقنيات والمنتجات الطبية والتجميلية ذات الجودة العالية التي تساهم في حياة أكثر صحة وجمالاً.' },
    aboutPageVisionTitle: { type: String, default: 'رؤيتنا' },
    aboutPageVisionText: { type: String, default: 'أن نكون الخيار الأول والاسم الأكثر ثقة في قطاع استيراد وتوزيع المستلزمات الطبية وأدوات التجميل على مستوى المنطقة بحلول عام 2030.' },
    aboutPageCTATitle: { type: String, default: 'استكشف حلولنا المتكاملة اليوم' },
    aboutPageCTABtnText: { type: String, default: 'تعرف على منتجاتنا' },
    aboutPageCTAImage: { type: String, default: '' },
    contactPageHeroTitle: { type: String, default: 'اتصل بنا' },
    contactPageHeroSubtitle: { type: String, default: 'نحن هنا للإجابة على جميع استفساراتكم وتلبية احتياجاتكم الطبية والتجميلية. تواصلوا معنا عبر القنوات المتاحة.' },
    contactPageAddress: { type: String, default: 'الرياض، حي الرحمن' },
    contactPageWorkingHours: [{
      day: { type: String },
      time: { type: String },
      closed: { type: Boolean, default: false }
    }],
    contactPageMapBadge: { type: String, default: 'المقر الرئيسي' },
    contactPageMapIframe: { type: String, default: '' },
    contactPageImage: { type: String, default: '' },
    contactPageImageOverlayTitle: { type: String, default: 'رعاية نثق بها' },
    contactPageImageOverlayDesc: { type: String, default: 'نجمع بين الخبرة الطبية والجمال في مكان واحد.' },
    notifications: {
      newOrder: { type: Boolean, default: true },
      lowStock: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
)

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema)

export default Settings
