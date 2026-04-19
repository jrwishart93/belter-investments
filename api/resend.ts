import { Resend } from 'resend';

type EmailRequest = {
  subject: string;
  html: string;
  to?: string;
  replyTo?: string;
};

type EnquiryField = { label?: string; value?: string };
type EnquirySection = { title?: string; fields?: EnquiryField[] };
type SuccessEmailLink = {
  label: string;
  href: string;
};

type SuccessEmailInput = {
  name: string;
  enquiryLabel: string;
  sections?: EnquirySection[];
  primaryCta?: SuccessEmailLink;
  secondaryLinks?: SuccessEmailLink[];
};

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function sendWithResend(payload: EmailRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const defaultTo = process.env.BELTER_ENQUIRY_TO ?? process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.BELTER_FROM_EMAIL ?? process.env.ENQUIRY_FROM_EMAIL;
  const toEmail = payload.to ?? defaultTo;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error('Missing RESEND_API_KEY, BELTER_ENQUIRY_TO, or BELTER_FROM_EMAIL environment variable.');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: payload.subject,
    html: payload.html,
    replyTo: payload.replyTo
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

export function confirmationHtml(name: string, enquiryLabel: string) {
  return buildSuccessEmailHtml({ name, enquiryLabel });
}

export function renderEnquirySectionsHtml(sections: EnquirySection[]) {
  return sections
    .map((section) => {
      const fields = section.fields ?? [];
      if (!section.title || fields.length === 0) {
        return '';
      }

      return `
        <section style="margin: 0 0 20px;">
          <h3 style="margin: 0 0 10px; font-size: 16px;">${escapeHtml(section.title)}</h3>
          ${fields
            .map((field) => `
              <p style="margin: 0 0 8px;">
                <strong>${escapeHtml(field.label ?? '')}:</strong>
                ${escapeHtml(field.value ?? '')}
              </p>
            `)
            .join('')}
        </section>
      `;
    })
    .join('');
}

export function detailedConfirmationWithCopyHtml(name: string, sections: EnquirySection[]) {
  return groupedEnquiryConfirmationHtml(name, 'detailed rental enquiry', sections);
}

export function groupedEnquiryConfirmationHtml(name: string, enquiryLabel: string, sections: EnquirySection[]) {
  return buildSuccessEmailHtml({ name, enquiryLabel, sections });
}

function getSiteUrl() {
  return (process.env.BELTER_SITE_URL ?? 'https://www.belter.online').replace(/\/$/, '');
}

function defaultSecondaryLinks(siteUrl: string): SuccessEmailLink[] {
  return [
    { label: 'Return to Belter', href: `${siteUrl}/` },
    { label: 'Browse Properties', href: `${siteUrl}/properties` },
    { label: 'Make Another Enquiry', href: `${siteUrl}/enquiries` }
  ];
}

function renderSecondaryLinks(links: SuccessEmailLink[]) {
  return links
    .map((link) => `
      <a
        href="${escapeHtml(link.href)}"
        style="color: #1d1d1f; text-decoration: none; font-size: 13px; font-weight: 650; margin: 0 12px 10px 0; display: inline-block;"
      >
        ${escapeHtml(link.label)}
      </a>
    `)
    .join('');
}

export function buildSuccessEmailHtml({
  name,
  enquiryLabel,
  sections = [],
  primaryCta,
  secondaryLinks
}: SuccessEmailInput) {
  const siteUrl = getSiteUrl();
  const logoUrl = `${siteUrl}/images/logo/belter-wordmark-transparent.png`;
  const featuredPropertyUrl = `${siteUrl}/properties/61-1-caledonian-crescent`;
  const mainCta = primaryCta ?? { label: 'View Featured Property', href: featuredPropertyUrl };
  const links = secondaryLinks ?? defaultSecondaryLinks(siteUrl);
  const hasSections = sections.some((section) => section.title && (section.fields ?? []).length > 0);

  return `
    <!doctype html>
    <html lang="en-GB">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>We have received your enquiry</title>
      </head>
      <body style="margin: 0; padding: 0; background: #f5f5f7; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
          Thanks, we have received your ${escapeHtml(enquiryLabel)} and will be in touch shortly.
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f5f5f7; margin: 0; padding: 28px 14px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background: #ffffff; border: 1px solid #e5e5ea; border-radius: 24px; overflow: hidden; box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);">
                <tr>
                  <td style="padding: 30px 30px 18px;">
                    <a href="${escapeHtml(siteUrl)}" style="display: inline-block; text-decoration: none;">
                      <img src="${escapeHtml(logoUrl)}" width="132" alt="Belter" style="display: block; width: 132px; max-width: 100%; height: auto; border: 0;" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 30px 8px;">
                    <p style="margin: 0 0 12px; color: #6e6e73; font-size: 13px; line-height: 1.4; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700;">
                      Enquiry received
                    </p>
                    <h1 style="margin: 0; color: #1d1d1f; font-size: 30px; line-height: 1.1; font-weight: 760; letter-spacing: -0.02em;">
                      Thanks, ${escapeHtml(name)}.
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 30px 0;">
                    <p style="margin: 0; color: #424245; font-size: 16px; line-height: 1.65;">
                      We have received your <strong>${escapeHtml(enquiryLabel)}</strong>. A member of the Belter Investments team will review it and come back to you as soon as possible.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 30px 4px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f5f5f7; border: 1px solid #e5e5ea; border-radius: 18px;">
                      <tr>
                        <td style="padding: 20px;">
                          <h2 style="margin: 0 0 10px; color: #1d1d1f; font-size: 18px; line-height: 1.25;">What happens next</h2>
                          <p style="margin: 0 0 8px; color: #424245; font-size: 14px; line-height: 1.55;">We will review your enquiry details and contact you directly using the information you provided.</p>
                          <p style="margin: 0; color: #424245; font-size: 14px; line-height: 1.55;">In the meantime, you can return to the Belter website, view the featured James Square property, or browse the current portfolio.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 30px 10px;">
                    <a
                      href="${escapeHtml(mainCta.href)}"
                      style="background: #1d1d1f; border-radius: 999px; color: #ffffff; display: inline-block; font-size: 14px; font-weight: 700; line-height: 1; padding: 14px 20px; text-decoration: none;"
                    >
                      ${escapeHtml(mainCta.label)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 20px;">
                    ${renderSecondaryLinks(links)}
                  </td>
                </tr>
                ${hasSections ? `
                  <tr>
                    <td style="padding: 6px 30px 4px;">
                      <hr style="border: 0; border-top: 1px solid #e5e5ea; margin: 0;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 22px 30px 4px;">
                      <h2 style="margin: 0 0 16px; color: #1d1d1f; font-size: 20px; line-height: 1.25;">Copy of your submitted enquiry</h2>
                      ${renderEnquirySectionsHtml(sections)}
                    </td>
                  </tr>
                ` : ''}
                <tr>
                  <td style="padding: 22px 30px 30px; background: #fbfbfd; border-top: 1px solid #e5e5ea;">
                    <p style="margin: 0 0 8px; color: #424245; font-size: 13px; line-height: 1.55;">
                      Belter Investments
                    </p>
                    <p style="margin: 0; color: #6e6e73; font-size: 12px; line-height: 1.55;">
                      This confirmation was sent because an enquiry was submitted through <a href="${escapeHtml(siteUrl)}" style="color: #1d1d1f; text-decoration: underline;">belter.online</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
