import PdfPrinter from "pdfmake";
import fs from "fs-extra";
import path from "path";

export const getPdfReadableStream = (journal) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      // bold: "Helvetica-Bold",
      italics: "Helvetica-Italic",
      bolditalics: "Helvetica-BoldItalic",
    },
  };

  const printer = new PdfPrinter(fonts);
  console.log("journal.title: ", journal.title);

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],
    header: {
      columns: [
        {
          text: "Journal Entry",
          alignment: "right",
          fontSize: 18,
          margin: [0, 10, 40, 10],
        },
      ],
      margin: [40, 20, 40, 20],
    },
    content: [
      {
        text: journal.title,
        style: "header",
        alignment: "center",
        fontSize: 28,
        margin: [0, 20, 0, 20],
      },
      {
        alignment: "justify",
        columns: [
          {
            width: 100,
            text: "Date:\n\nTopic:\n\nContent:\n\n",
            fontSize: 14,
          },
          {
            width: "*",
            text: `${journal.createdAt.toLocaleDateString()}\n\n${journal.topic}\n\n${journal.content}`,
            fontSize: 14,
            margin: [0, 0, 0, 10],
          },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        color: "#0077b6",
      },
    },
  };

  console.log("content image: ", docDefinition.content);

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();

  return pdfReadableStream;
};
