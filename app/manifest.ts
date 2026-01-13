
import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KK Dinamo Zagreb',
    short_name: 'KK Dinamo',
    description: 'Službena aplikacija KK Dinamo Zagreb',
    start_url: '/',
    display: 'standalone',
    background_color: '#001035',
    theme_color: '#002060',
    icons: [
      {
        src: 'https://shop.kkdinamo.hr/wp-content/uploads/2022/09/grb-dinamo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://shop.kkdinamo.hr/wp-content/uploads/2022/09/grb-dinamo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
