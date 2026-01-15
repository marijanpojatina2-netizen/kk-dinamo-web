
import { NextResponse } from 'next/server';
import { sendAdminEmail } from '../../../lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, oib, address, email, phone, consent } = data;

    if (!firstName || !lastName || !oib || !email || !consent) {
      return NextResponse.json({ error: 'Molimo ispunite sva obavezna polja.' }, { status: 400 });
    }

    const htmlContent = `
      <h1>Novi zahtjev za članstvo</h1>
      <p><strong>Ime i Prezime:</strong> ${firstName} ${lastName}</p>
      <p><strong>OIB:</strong> ${oib}</p>
      <p><strong>Adresa:</strong> ${address}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>GDPR Privola:</strong> DA</p>
      <hr />
      <p>Molimo pošaljite podatke za uplatu članarine na navedeni email.</p>
    `;

    const success = await sendAdminEmail({
      subject: `Članstvo: ${firstName} ${lastName}`,
      htmlContent,
      replyTo: { email, name: `${firstName} ${lastName}` }
    });

    if (!success) {
      return NextResponse.json({ error: 'Greška pri slanju emaila.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Zahtjev uspješno poslan!' }, { status: 200 });

  } catch (error) {
    console.error('Membership Join Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
