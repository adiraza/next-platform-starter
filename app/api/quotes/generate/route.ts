import { NextRequest, NextResponse } from 'next/server';
import { addQuote } from '@/lib/dataStorage';
import jsPDF from 'jspdf';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, company, requirements } = data;

    // Generate PDF
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Excel Energy - Solar Quote', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated for: ${name}`, 20, 40);
    if (email) doc.text(`Email: ${email}`, 20, 50);
    if (phone) doc.text(`Phone: ${phone}`, 20, 60);
    if (company) doc.text(`Company: ${company}`, 20, 70);
    doc.text('Requirements:', 20, 85);
    doc.setFontSize(10);
    const splitRequirements = doc.splitTextToSize(requirements || 'N/A', 170);
    doc.text(splitRequirements, 20, 95);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 140);
    doc.text('Thank you for your interest in Excel Energy!', 20, 150);
    doc.text('We will contact you soon with a detailed proposal.', 20, 160);

    const pdfBlob = doc.output('blob');
    const pdfBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(pdfBlob);
    });

    // Save quote to database
    const pdfPath = `quotes/quote-${Date.now()}.pdf`;
    const quote = addQuote({
      name,
      email,
      phone,
      company,
      requirements: requirements || '',
      pdfPath
    });

    return NextResponse.json({
      success: true,
      pdf: pdfBase64,
      quoteId: quote.id
    });
  } catch (error) {
    console.error('Quote generation error:', error);
    return NextResponse.json({ error: 'Failed to generate quote' }, { status: 500 });
  }
}

