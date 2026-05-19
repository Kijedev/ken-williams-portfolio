// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer"

// interface ContactForm {
//   name: string;
//   email: string;
//   company: string;
//   message: string;
// }

// export async function POST(req: Request) {
//   try {
//     const { name, email, company, message }: ContactForm = await req.json();

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: "All fields are required." },
//         { status: 400 },
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//   from: `"Ekho Studios" <${process.env.EMAIL_USER}>`,
//   replyTo: email,
//   to: process.env.EMAIL_USER,
//   subject: "Ekho Studios - New Message",
//   html: `
//   <div style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">
    
//     <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
//       <tr>
//         <td align="center">

//           <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;">
            
//             <!-- Header -->
//             <tr>
//               <td style="padding:24px 32px;">
//                 <h2 style="margin:0;color:#FEE9CE;font-weight:600;letter-spacing:-0.5px;">
//                   Ekho Studios
//                 </h2>
//                 <p style="margin:6px 0 0;color:#888;font-size:14px;">
//                   New contact form submission
//                 </p>
//               </td>
//             </tr>

//             <!-- Content -->
//             <tr>
//               <td style="padding:32px;">

//                 <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  
//                   <tr>
//                     <td style="padding:12px 0;color:#888;font-size:13px;">Name:</td>
//                     <td style="padding:12px 0;color:#fff;font-size:14px;">
//                       ${name}
//                     </td>
//                   </tr>

//                   <tr>
//                     <td style="padding:12px 0;color:#888;font-size:13px;">Email:</td>
//                     <td style="padding:12px 0;font-size:14px;">
//                       <a href="mailto:${email}" style="color:#EF5143;text-decoration:none;">
//                         ${email}
//                       </a>
//                     </td>
//                   </tr>

//                   <tr>
//                     <td style="padding:12px 0;color:#888;font-size:13px;">Company:</td>
//                     <td style="padding:12px 0;color:#fff;font-size:14px;">
//                       ${company || "—"}
//                     </td>
//                   </tr>

//                 </table>

//                 <!-- Message -->
//                 <div>
//                   <p style="margin:0 0 10px;color:#888;font-size:13px;">
//                     Message:
//                   </p>
//                   <p style="margin:0;color:#ddd;font-size:14px;line-height:1.6;">
//                     ${message}
//                   </p>
//                 </div>

//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
//                 <p style="margin:0;color:#666;font-size:12px;">
//                   © ${new Date().getFullYear()} Ekho Studios — Lagos, Nigeria
//                 </p>
//               </td>
//             </tr>

//           </table>

//         </td>
//       </tr>
//     </table>

//   </div>
//   `,
// });

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("Email send error:", error);

//     let message = "Something went wrong.";
//     if (error.response) message += ` ${error.response}`;

//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, company, message }: ContactForm = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Ekho Studios <noreply@ekhostudios.co>",
      replyTo: email,
      to: "kendarawilliams1@gmail.com",
      subject: "Ekho Studios — New Message",
      html: `
        <div style="font-family:Arial,sans-serif;background:#111;padding:40px;">
          <h2 style="color:#FEE9CE;margin:0 0 4px;">Ekho Studios</h2>
          <p style="color:#888;font-size:13px;margin:0 0 32px;">New contact form submission</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;width:80px;">Name</td>
              <td style="padding:10px 0;color:#fff;font-size:14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;">Email</td>
              <td style="padding:10px 0;font-size:14px;">
                <a href="mailto:${email}" style="color:#EF5143;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#888;font-size:13px;">Company</td>
              <td style="padding:10px 0;color:#fff;font-size:14px;">${company || "—"}</td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <p style="color:#888;font-size:13px;margin:0 0 8px;">Message</p>
            <p style="color:#ddd;font-size:14px;line-height:1.7;margin:0;">${message}</p>
          </div>

          <p style="margin-top:40px;color:#555;font-size:12px;border-top:1px solid #222;padding-top:20px;">
            © ${new Date().getFullYear()} Ekho Studios — Lagos, Nigeria
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend] Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}