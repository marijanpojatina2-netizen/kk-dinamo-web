
import React from 'react';
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | KK Dinamo Zagreb',
    default: 'KK Dinamo Zagreb',
  },
  description: 'Službena web stranica košarkaškog kluba Dinamo Zagreb. Najnovije vijesti, raspored utakmica, momčad i webshop.',
  keywords: ['KK Dinamo', 'Košarka', 'Zagreb', 'Premijer Liga', 'Dražen Petrović', 'Dinamo Zagreb', 'Sport'],
  openGraph: {
    title: 'KK Dinamo Zagreb',
    description: 'Ponos grada. Službena stranica košarkaškog kluba Dinamo Zagreb.',
    url: 'https://www.kkdinamo.hr',
    siteName: 'KK Dinamo Zagreb',
    images: [
      {
        url: 'https://shop.kkdinamo.hr/wp-content/uploads/2022/09/grb-dinamo.png',
        width: 800,
        height: 800,
        alt: 'KK Dinamo Grb',
      },
    ],
    locale: 'hr_HR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KK Dinamo Zagreb',
    description: 'Službena web stranica košarkaškog kluba Dinamo Zagreb.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-antonio: 'Antonio', sans-serif;
          }
        `}} />
      </head>
      <body className={`font-sans antialiased`}>
        {/* 
          GOOGLE ANALYTICS (GA4)
          Zamijenite 'G-XXXXXXXXXX' sa svojim Measurement ID-om
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* 
          META PIXEL (Facebook)
          Zamijenite 'YOUR_PIXEL_ID' sa svojim Pixel ID-om
        */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>

        {children}
        
        {/* Meta Pixel NoScript Fallback */}
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
          src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          alt="Meta Pixel"
          />
        </noscript>
      </body>
    </html>
  )
}
