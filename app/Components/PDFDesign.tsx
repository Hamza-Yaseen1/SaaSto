// app/components/PDFDesign.tsx
"use client";
import jsPDF from "jspdf";

type PDFDesignProps = {
    invoiceNo: string;
    customerName: string;
    items: { product: string; quantity: number; price: number }[];
};

export function PDFDesign({ invoiceNo, customerName, items }: PDFDesignProps) {
    const itemTotal = (q: number, p: number) => q * p;
    const grandTotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

    const createPDF = () => {
        // ================= DYNAMIC PAGE HEIGHT =================
        const rowHeight = 30;
        const headerHeight = 370; // header + invoice info + customer info
        const footerHeight = 80; // space for total & bottom wave
        const contentHeight = items.length * rowHeight;
        const minHeight = 600; // minimum page height
        const pageHeight = Math.max(headerHeight + contentHeight + footerHeight, minHeight);

        const doc = new jsPDF({
            orientation: "p",
            unit: "pt",
            format: [595, pageHeight], // width fixed (A4), height dynamic
        });
        const pageWidth = doc.internal.pageSize.getWidth();

        // Colors
        const tealColor = [30, 150, 155];
        const darkGrey = [80, 80, 80];
        const lightGrey = [240, 240, 240];

        // ================= TOP WAVE =================
        doc.setFillColor(darkGrey[0], darkGrey[1], darkGrey[2]);
        doc.ellipse(0, 0, 250, 60, "F");
        doc.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
        doc.ellipse(0, 0, 200, 50, "F");

        // ================= COMPANY NAME =================
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 0);
        doc.text("INGOUDE COMPANY", pageWidth / 2, 120, { align: "center" });

        // ================= INVOICE INFO BAR =================
        doc.setFillColor(lightGrey[0], lightGrey[1], lightGrey[2]);
        doc.rect(0, 160, pageWidth, 40, "F");

        doc.setFontSize(12);
        doc.text(`INVOICE NO: ${invoiceNo}`, 50, 185);
        doc.text(
            `DATE: ${new Date().toLocaleDateString("en-GB").toUpperCase()}`,
            pageWidth - 50,
            185,
            { align: "right" }
        );

        // ================= CUSTOMER DETAILS =================
        doc.setTextColor(tealColor[0], tealColor[1], tealColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text("Customer Name:", pageWidth / 2, 230, { align: "center" });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text(customerName.toUpperCase(), pageWidth / 2, 250, { align: "center" });

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text("+92-300-0000000", pageWidth / 2, 265, { align: "center" });
        doc.text("123 Anywhere St., Karachi, PK", pageWidth / 2, 280, { align: "center" });

        // ================= TABLE HEADER =================
        const startY = 320;
        doc.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
        doc.roundedRect(40, startY, pageWidth - 80, 35, 10, 10, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("ITEM", 60, startY + 22);
        doc.text("DESCRIPTION", 140, startY + 22);
        doc.text("PRICE", 360, startY + 22);
        doc.text("QTY", 450, startY + 22);
        doc.text("TOTAL", 530, startY + 22, { align: "right" });

        // ================= TABLE ROWS =================
        let y = startY + 50;
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");

        items.forEach((item, index) => {
            if (!item.product) return;

            const itemNum = String(index + 1).padStart(2, "0");
            doc.setFont("helvetica", "bold");
            doc.text(itemNum, 60, y);

            doc.setFont("helvetica", "normal");
            doc.text(item.product, 140, y);
            doc.text(`${item.price.toFixed(0)}`, 360, y);
            doc.text(String(item.quantity), 450, y);
            doc.text(`${itemTotal(item.quantity, item.price).toFixed(0)}`, 530, y, { align: "right" });

            // Row divider
            doc.setDrawColor(200, 200, 200);
            doc.line(40, y + 10, pageWidth - 40, y + 10);

            y += rowHeight;
        });

        // ================= GRAND TOTAL =================
        y += 25;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(tealColor[0], tealColor[1], tealColor[2]);

        const totalHeadingX = 400;
        const totalValueX = pageWidth - 50;

        // Adjust vertical alignment
        doc.text("TOTAL AMOUNT:", totalHeadingX, y);
        doc.setTextColor(0, 0, 0);
        doc.text(`${grandTotal.toFixed(0)}`, totalValueX, y, { align: "right" });

        // ================= BOTTOM WAVES =================
        doc.setFillColor(darkGrey[0], darkGrey[1], darkGrey[2]);
        doc.ellipse(pageWidth, pageHeight, 250, 100, "F");
        doc.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
        doc.ellipse(pageWidth, pageHeight, 200, 80, "F");

        return doc;
    };

    return { createPDF };
};
