// Helper for converting DOCX to PDF using mammoth and html2pdf.js
import mammoth from 'mammoth';
import html2pdf from 'html2pdf.js';

// Cache for conversion promises
const conversionCache = new Map<string, Promise<Blob>>();

/**
 * Converts a DOCX file to a PDF Blob.
 * @param fileName - The base filename (without .docx extension)
 * @returns Promise that resolves to a PDF Blob
 */
export async function docxToPdfBlob(fileName: string): Promise<Blob> {
  // Check cache
  if (conversionCache.has(fileName)) {
    return conversionCache.get(fileName)!;
  }

  // Create a promise for the conversion and cache it
  const conversionPromise = (async () => {
    try {
      // Fetch the DOCX file
      const response = await fetch(`/docx/${fileName}.docx`);
      if (!response.ok) {
        throw new Error(`Failed to fetch DOCX file: ${response.statusText}`);
      }

      // Convert response to ArrayBuffer
      const arrayBuffer = await response.arrayBuffer();

      // Convert DOCX to HTML using mammoth
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
      // Mammoth returns an object with value (html) and messages.

      // Create a temporary container for the HTML
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = html;
      // Set some basic styling to ensure proper rendering
      tempContainer.style.fontFamily = 'inherit';
      tempContainer.style.fontSize = '12pt';
      tempContainer.style.lineHeight = '1.5';

      // Append to body (off-screen) for html2pdf to work
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      document.body.appendChild(tempContainer);

      // Convert HTML to PDF using html2pdf.js
      const pdfBlob = await new Promise<Blob>((resolve, reject) => {
        const opt = {
          margin: 10, // 10mm for all sides
          filename: `${fileName}.pdf`,
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4' }
        };
        // Use html2pdf().set(opt).from(tempContainer).outputPdf('blob')
        html2pdf()
          .set(opt)
          .from(tempContainer)
          .outputPdf('blob')
          .then(resolve)
          .catch(reject);
      });

      // Clean up temporary container
      document.body.removeChild(tempContainer);

      return pdfBlob;
    } catch (error) {
      // Remove from cache on error so we can retry
      conversionCache.delete(fileName);
      throw error;
    }
  })();

  // Cache the promise
  conversionCache.set(fileName, conversionPromise);

  // Wait for the promise and return the result
  return conversionPromise;
}

/**
 * Clears the conversion cache. Useful for testing or if you want to force re-conversion.
 */
export function clearConversionCache() {
  conversionCache.clear();
}