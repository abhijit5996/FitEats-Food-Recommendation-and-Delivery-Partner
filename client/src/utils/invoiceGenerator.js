import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Extend jsPDF with autoTable plugin
jsPDF.autoTable = autoTable;

export function generateInvoice(order) {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    
    // App colors (matching your CSS theme)
    const colors = {
      primary: [26, 26, 46],      // --color-background: #1a1a2e
      accent: [255, 193, 7],      // --color-primary: #ffc107
      secondary: [255, 107, 53],  // --color-secondary: #ff6b35
      darkAccent: [44, 44, 84],   // --color-sidebar-accent: #2c2c54
      white: [255, 255, 255],
      lightGray: [248, 249, 250], // --color-muted: #f8f9fa
      textGray: [108, 117, 125],  // --color-muted-foreground: #6c757d
      borderGray: [203, 206, 212],
      success: [40, 167, 69]      // Green for success elements
    };
    
    // Set margins and page dimensions
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = margin;
    
    // Calculate available table width
    const availableTableWidth = pageWidth - (2 * margin);
    
    // Add modern gradient header background
    const headerHeight = 80;
    
    // Create gradient effect with overlapping rectangles
    for (let i = 0; i < headerHeight; i += 2) {
      const opacity = 1 - (i / headerHeight) * 0.3;
      doc.setFillColor(...colors.primary);
      doc.setGState(new doc.GState({ opacity }));
      doc.rect(0, i, pageWidth, 2, 'F');
    }
    
    // Reset opacity
    doc.setGState(new doc.GState({ opacity: 1 }));
    
    // Add accent stripe
    doc.setFillColor(...colors.accent);
    doc.rect(0, headerHeight - 5, pageWidth, 5, 'F');
    
    // Add company logo placeholder (you can add actual logo here)
    doc.setFillColor(...colors.accent);
    doc.circle(margin + 15, 35, 15, 'F');
    doc.setFontSize(16);
    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", "bold");
    doc.text("F", margin + 12, 38);
    
    // Add company name and tagline
    doc.setFontSize(28);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("FitEats", margin + 40, 40);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(220, 220, 220);
    doc.text("Healthy Food Delivery", margin + 40, 48);
    
    // Add invoice title on right
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.accent);
    doc.text("INVOICE", pageWidth - margin, 35, { align: 'right' });
    
    // Add invoice number and date in header
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.setFont("helvetica", "normal");
    const invoiceDate = new Date(order.date);
    doc.text(`INV-${order.id} | ${invoiceDate.toLocaleDateString('en-IN')}`, pageWidth - margin, 45, { align: 'right' });
    
    // Add contact info at bottom of header
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.setFont("helvetica", "normal");
    doc.text("contact@fiteats.com | +91 98765 43210 | www.fiteats.com", pageWidth / 2, headerHeight - 15, { align: 'center' });
    
    // Reset position after header
    yPosition = headerHeight + 20;
    
    // Add invoice details in modern card-style layout
    doc.setFillColor(...colors.lightGray);
    doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 35, 5, 5, 'F');
    
    // Invoice details
    doc.setFontSize(11);
    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Details", margin + 10, yPosition + 12);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.textGray);
    
    doc.text(`Invoice #${order.id}`, margin + 10, yPosition + 20);
    doc.text(`Date: ${invoiceDate.toLocaleDateString('en-IN')}`, margin + 10, yPosition + 27);
    
    // Payment status badge with improved styling
    const statusWidth = 40;
    const statusX = pageWidth - margin - statusWidth - 5;
    doc.setFillColor(...colors.success);
    doc.roundedRect(statusX, yPosition + 8, statusWidth, 15, 3, 3, 'F');
    doc.setFontSize(8);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text("PAID", statusX + statusWidth/2, yPosition + 17, { align: 'center' });
    
    yPosition += 40;
    
    // Customer information in modern card
    const cardWidth = (pageWidth - 3 * margin) / 2;
    doc.setFillColor(...colors.white);
    doc.setDrawColor(...colors.borderGray);
    doc.roundedRect(margin, yPosition, cardWidth, 45, 5, 5, 'FD');
    
    doc.setFontSize(11);
    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", margin + 10, yPosition + 12);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(order.customer.name, margin + 10, yPosition + 22);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.textGray);
    doc.text(order.customer.phone, margin + 10, yPosition + 30);
    
    // Handle address with proper wrapping
    const addressLines = doc.splitTextToSize(order.customer.address, cardWidth - 20);
    doc.setFontSize(9);
    let addressY = yPosition + 37;
    addressLines.forEach(line => {
      doc.text(line, margin + 10, addressY);
      addressY += 4;
    });
    
    // Delivery info in second card
    const deliveryCardX = margin + cardWidth + 10;
    doc.setFillColor(...colors.white);
    doc.roundedRect(deliveryCardX, yPosition, cardWidth, 45, 5, 5, 'FD');
    
    doc.setFontSize(11);
    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", "bold");
    doc.text("Delivery Info:", deliveryCardX + 10, yPosition + 12);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.textGray);
    doc.text(`Order Time: ${invoiceDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`, deliveryCardX + 10, yPosition + 22);
    doc.text(`Delivery: 30-45 mins`, deliveryCardX + 10, yPosition + 30);
    doc.text(`Payment: Online (Credit Card)`, deliveryCardX + 10, yPosition + 38);
    
    yPosition += 50;
    
    // Modern items table with fixed alignment
    const tableData = order.items.map(item => [
      item.name,
      item.quantity.toString(),
      `INR ${(item.price ?? 0).toFixed(2)}`,
      `INR ${((item.quantity ?? 0) * (item.price ?? 0)).toFixed(2)}`
    ]);
    
    // ❌ Removed the note row ("All items are prepared...") here
    
    // Calculate proportional column widths based on available space
    const columnWidths = {
      0: availableTableWidth * 0.5,
      1: availableTableWidth * 0.15,
      2: availableTableWidth * 0.175,
      3: availableTableWidth * 0.175
    };
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Item Description', 'Qty', 'Rate (INR)', 'Amount (INR)']],
      body: tableData,
      theme: 'plain',
      headStyles: {
        fillColor: colors.primary,
        textColor: colors.white,
        fontStyle: 'bold',
        fontSize: 10,
        cellPadding: { top: 10, bottom: 10, left: 12, right: 12 },
        font: 'helvetica',
        halign: 'center',
        valign: 'middle'
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: { top: 8, bottom: 8, left: 8, right: 8 },
        font: 'helvetica',
        textColor: [60, 60, 60],
        valign: 'middle'
      },
      alternateRowStyles: {
        fillColor: [252, 252, 252]
      },
      columnStyles: {
        0: { halign: 'left', cellWidth: columnWidths[0], fontStyle: 'bold' },
        1: { halign: 'center', cellWidth: columnWidths[1] },
        2: { halign: 'right', cellWidth: columnWidths[2] },
        3: { halign: 'right', cellWidth: columnWidths[3], fontStyle: 'bold', textColor: colors.primary }
      },
      margin: { left: margin, right: margin },
      tableWidth: 'wrap',
      tableLineColor: colors.borderGray,
      tableLineWidth: 0,
      styles: {
        overflow: 'linebreak',
        cellPadding: { top: 8, bottom: 8, left: 8, right: 8 },
        lineColor: colors.borderGray,
        lineWidth: 0.5
      },
      // didDrawCell: function(data) {
      //   if (data.section === 'body' && data.row.index % 2 === 0) {
      //     doc.setDrawColor(240, 240, 240);
      //     doc.setLineWidth(0.3);
      //     doc.line(
      //       data.cell.x, 
      //       data.cell.y + data.cell.height, 
      //       data.cell.x + data.cell.width, 
      //       data.cell.y + data.cell.height
      //     );
      //   }
      // }
    });
    
    // ✅ FIXED: Proper spacing after table
    let finalY = doc.lastAutoTable.finalY + 20;
    
    // Ensure minimum space (avoid overlap if table is too short)
    if (finalY < 300) {
      finalY = 300;
    }
    
    // If table is too long, add a new page
    if (doc.lastAutoTable.finalY > 650) {
      doc.addPage();
      finalY = 40;
    }
    
    // --- Summary Section ---
    const summaryWidth = 100;
    const summaryX = pageWidth - margin - summaryWidth - 5;
    const summaryHeight = 90;
    
    doc.setFillColor(...colors.lightGray);
    doc.roundedRect(summaryX, finalY, summaryWidth, summaryHeight, 8, 8, 'F');
    doc.setDrawColor(...colors.borderGray);
    doc.setLineWidth(0.5);
    doc.roundedRect(summaryX, finalY, summaryWidth, summaryHeight, 8, 8, 'S');
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.primary);
    doc.text("Order Summary", summaryX + summaryWidth/2, finalY + 12, { align: 'center' });
    
    const summaryItems = [
      { label: "Subtotal", value: order.subtotal ?? 0 },
      { label: "Tax (5%)", value: order.tax ?? 0 },
      { label: "Delivery Fee", value: order.deliveryFee ?? 0 },
      { label: "Discount", value: -(order.discount ?? 0) }
    ];
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.textGray);
    
    let summaryY = finalY + 24;
    summaryItems.forEach(item => {
      doc.text(item.label, summaryX + 10, summaryY);
      doc.text(`INR ${item.value.toFixed(2)}`, summaryX + summaryWidth - 10, summaryY, { align: 'right' });
      summaryY += 8;
    });
    
    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(1.5);
    doc.line(summaryX + 10, summaryY + 2, summaryX + summaryWidth - 10, summaryY + 2);
    
    summaryY += 12;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.primary);
    doc.text("TOTAL", summaryX + 10, summaryY);
    
    doc.setFontSize(14);
    doc.setTextColor(...colors.accent);
    doc.text(`INR ${(order.total ?? 0).toFixed(2)}`, summaryX + summaryWidth - 10, summaryY, { align: 'right' });
    
    // --- Thank You Message ---
    const messageY = finalY + summaryHeight + 25;
    doc.setFillColor(...colors.accent);
    doc.roundedRect(margin, messageY, pageWidth - 2 * margin, 25, 5, 5, 'F');
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.primary);
    doc.text("Thank you for choosing FitEats!", pageWidth / 2, messageY + 10, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Your health journey continues with every delicious meal!", pageWidth / 2, messageY + 18, { align: 'center' });
    
    // --- Footer ---
    const footerY = pageHeight - 40;
    doc.setDrawColor(...colors.borderGray);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY, pageWidth - margin, footerY);
    
    doc.setFontSize(8);
    doc.setTextColor(...colors.textGray);
    doc.setFont("helvetica", "normal");
    doc.text("This is a computer generated invoice. No signature required.", margin, footerY + 8);
    doc.text(`Generated on ${new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, pageWidth - margin, footerY + 8, { align: 'right' });
    
    doc.setFontSize(7);
    doc.text("Terms: All sales are final. Returns accepted within 30 days with original receipt.", pageWidth / 2, footerY + 16, { align: 'center' });
    
    // --- Decorative Border ---
    doc.setDrawColor(...colors.borderGray);
    doc.setLineWidth(1);
    doc.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 5, 5, 'S');
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(...colors.accent);
    
    // Top-left corner
    doc.line(15, 15, 25, 15);
    doc.line(15, 15, 15, 25);
    
    // Top-right corner
    doc.line(pageWidth - 15, 15, pageWidth - 25, 15);
    doc.line(pageWidth - 15, 15, pageWidth - 15, 25);
    
    // Bottom-left corner
    doc.line(15, pageHeight - 15, 25, pageHeight - 15);
    doc.line(15, pageHeight - 15, 15, pageHeight - 25);
    
    // Bottom-right corner
    doc.line(pageWidth - 15, pageHeight - 15, pageWidth - 25, pageHeight - 15);
    doc.line(pageWidth - 15, pageHeight - 15, pageWidth - 15, pageHeight - 25);
    
    // Save the PDF with professional naming
    const fileName = `FitEats-Invoice-${order.id}-${invoiceDate.getFullYear()}.pdf`;
    doc.save(fileName);
    
    console.log('Enhanced professional invoice generated successfully');
    return { success: true, fileName };
    
  } catch (error) {
    console.error('Error generating professional invoice:', error);
    return { success: false, error: error.message };
  }
}
