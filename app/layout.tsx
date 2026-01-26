
import React from 'react';
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CookieConsent from '../components/CookieConsent';

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: 'KK Dinamo Zagreb',
    sport: 'Basketball',
    logo: 'https://shop.kkdinamo.hr/wp-content/uploads/2022/09/grb-dinamo.png',
    url: 'https://www.kkdinamo.hr',
    location: {
      '@type': 'Place',
      name: 'KC Dražen Petrović',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Savska cesta 30',
        addressLocality: 'Zagreb',
        postalCode: '10000',
        addressCountry: 'HR'
      }
    },
    sameAs: [
      'https://www.facebook.com/kkdinamo',
      'https://www.instagram.com/kk_dinamo',
      'https://twitter.com/kkdinamo',
      'https://www.youtube.com/@kkdinamo'
    ]
  }

  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL;

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* 
            INLINE SCRIPT: Provjera GDPR Postavki prije učitavanja
            Čita 'cookie_consent_v2' JSON objekt.
        */}
        <script dangerouslySetInnerHTML={{__html: `
          try {
            const consentV2 = localStorage.getItem('cookie_consent_v2');
            let analyticsAllowed = false;
            let marketingAllowed = false;

            if (consentV2) {
                const settings = JSON.parse(consentV2);
                analyticsAllowed = settings.analytics;
                marketingAllowed = settings.marketing;
            } else {
                // Fallback za stari ključ ako postoji
                const oldConsent = localStorage.getItem('cookie_consent');
                if (oldConsent === 'accepted') {
                    analyticsAllowed = true;
                    marketingAllowed = true;
                }
            }

            // Postavi GA flags
            if (!analyticsAllowed) {
               window['ga-disable-${gaId}'] = true;
            } else {
               window['ga-disable-${gaId}'] = false;
            }

            // Pohrani globalne varijable za kasnije skripte ako zatreba
            window.cookieMarketingAllowed = marketingAllowed;

          } catch (e) {
             console.log('Cookie logic error', e);
          }
        `}} />
      </head>
      <body className={`font-sans antialiased`}>
        {/* GOOGLE ANALYTICS */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                // Zadano stanje - denied, osim ako skripta u headu nije otkrila pristanak
                // Ipak, gtag config se okida ovdje.
                
                let adStorage = 'denied';
                let analyticsStorage = 'denied';

                try {
                    const c = localStorage.getItem('cookie_consent_v2');
                    if(c) {
                        const s = JSON.parse(c);
                        if(s.analytics) analyticsStorage = 'granted';
                        if(s.marketing) adStorage = 'granted';
                    } else if (localStorage.getItem('cookie_consent') === 'accepted') {
                        adStorage = 'granted';
                        analyticsStorage = 'granted';
                    }
                } catch(e){}

                gtag('consent', 'default', {
                    'ad_storage': adStorage,
                    'analytics_storage': analyticsStorage
                });

                gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* META PIXEL (Samo ako je marketing dozvoljen) */}
        {fbPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                const checkMarketing = () => {
                    try {
                        const c = localStorage.getItem('cookie_consent_v2');
                        if(c && JSON.parse(c).marketing) return true;
                        if(localStorage.getItem('cookie_consent') === 'accepted') return true;
                    } catch(e){}
                    return false;
                };

                if (checkMarketing()) {
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    
                    fbq('init', '${fbPixelId}');
                    fbq('track', 'PageView');
                }
              `}
            </Script>
          </>
        )}

        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
