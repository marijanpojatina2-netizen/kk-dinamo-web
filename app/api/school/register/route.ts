
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email je obavezan.' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error: Missing API Key' }, { status: 500 });
    }

    // Poziv prema Brevo Contacts API
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          IME: firstName || '',
          PREZIME: lastName || '',
        },
        updateEnabled: true, // Ažuriraj ako već postoji
        listIds: [2], // ID liste u Brevu (obično je 2 prva custom lista)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Ignoriraj grešku ako je korisnik već prijavljen
      if (errorData.code === 'duplicate_parameter') {
         return NextResponse.json({ message: 'Već ste na našoj listi, hvala!' }, { status: 200 });
      }

      console.error('Brevo Newsletter Error:', errorData);
      return NextResponse.json({ error: 'Greška pri spremanju kontakta.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Uspješno ste se prijavili na newsletter!' }, { status: 200 });

  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
