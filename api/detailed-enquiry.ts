import { sendWithResend } from './resend';

type Request = { method?: string; body?: Record<string, string> };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

const field = (label: string, value: string | undefined) => `<p><strong>${label}:</strong> ${value || 'Not provided'}</p>`;

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body ?? {};

  if (!body.fullName || !body.email || !body.contactNumber || !body.rentalPeriod || !body.moveInDate) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    await sendWithResend({
      subject: 'Belter Investments · Detailed Rental Enquiry',
      html: `
        <h2>Detailed Enquiry</h2>
        ${field('Full Name', body.fullName)}
        ${field('Email', body.email)}
        ${field('Contact Number', body.contactNumber)}
        ${field('Rental Period', body.rentalPeriod)}
        ${field('Employed', body.employed)}
        ${field('Student', body.student)}
        ${field('Occupants', body.occupants)}
        ${field('Pets', body.pets)}
        ${field('Pets Notes', body.petsNotes)}
        ${field('Smoking', body.smoking)}
        ${field('Location Status', body.locationStatus)}
        ${field('Viewing Preference', body.viewingPreference)}
        ${field('Viewing Information', body.viewingInformation)}
        ${field('Move-in Date', body.moveInDate)}
        ${field('References', body.references)}
        ${field('Further Questions', body.furtherQuestions)}
        ${field('Lead Source', body.leadSource)}
        ${field('Lead Source (Other)', body.leadSourceOther)}
      `
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'Unexpected error' });
  }
}
