
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Ne želimo da Google indeksira CMS login
    },
    sitemap: 'https://www.kkdinamo.hr/sitemap.xml',
  }
}
