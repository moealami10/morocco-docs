# Implementation Plan: Document Library PDF Conversion

## Objective
Convert specific .docx files from the uploaded inventory to PDF format and make them accessible through the Document Library page in the Kaghit project.

## Step 1: Identify Required Documents
Based on the DOCUMENTS_DATA in DocumentLibraryPage.tsx, we need to find and convert these specific documents:

1. **Demande de mariage avec étranger** (Marriage with foreigner)
   - Category: Mariage
   - Expected files in inventory: Look for marriage-related documents with foreigner/étranger

2. **Demande d'extrait d'acte de mariage** (Extract of marriage act)
   - Category: Mariage
   - Expected files: Look for "extrait" or "acte" marriage documents

3. **Demande de changement de nom** (Name change request)
   - Category: État civil
   - Expected files: Look for name change documents

4. **Demande d'extrait d'acte de naissance** (Birth certificate extract)
   - Category: État civil
   - Expected files: Look for birth extract documents

5. **Contrat de location d'habitation** (Residential lease contract)
   - Category: Contrats
   - Expected files: Look for rental/location contracts

6. **Contrat de travail à durée indéterminée** (Open-ended work contract)
   - Category: Contrats
   - Expected files: Look for work/travel contracts (CDI)

7. **Demande d'attestation de travail** (Work attestation request)
   - Category: Attestations
   - Expected files: Look for work attestation/employment verification documents

## Step 2: Search Strategy
Search in the uploaded folders for matching documents:

**Primary locations to search:**
- `/sessions/exciting-gifted-hamilton/mnt/morocco-docs/عقود والتزامات/Modèles en français/` 
- `/sessions/exciting-gifted-hamilton/mnt/morocco-docs/عقود والتزامات/الوثائق المطلوبة للحصول على الشواهد او الجواز او البطاقة/`
- Other relevant subdirectories under عقود والتزامات

**Search keywords:**
- Marriage: mariage, étranger, étranger, act
- Name change: changement, nom
- Birth: naissance, acte
- Location: location, contrat
- Work: travail, contrat, attestation
- Attestation: attestation, travail, emploi

## Step 3: Conversion Process
For each identified .docx file:
1. Locate the exact .docx file matching the requirement
2. Convert to PDF using available tools (likely LibreOffice or similar)
3. Name the PDF according to the expected pdfUrl pattern
4. Place in the corresponding directory under `/sessions/exciting-gifted-hamilton/mnt/morocco-docs/public/documents/`

## Step 4: Directory Structure Creation
Create the necessary directory structure:
- `/public/documents/mariage/`
- `/public/documents/etat-civil/`
- `/public/documents/contrats/`
- `/public/documents/attestations/`

## Step 5: File Mapping
Map each document to its expected location:

1. `demande-mariage-etranger.pdf` → `/public/documents/mariage/demande-mariage-etranger.pdf`
2. `extrait-acte-mariage.pdf` → `/public/documents/mariage/extrait-acte-mariage.pdf`
3. `changement-nom.pdf` → `/public/documents/etat-civil/changement-nom.pdf`
4. `acte-naissance.pdf` → `/public/documents/etat-civil/acte-naissance.pdf`
5. `contrat-location.pdf` → `/public/documents/contrats/contrat-location.pdf`
6. `contrat-travail.pdf` → `/public/documents/contrats/contrat-travail.pdf`
7. `attestation-travail.pdf` → `/public/documents/attestations/attestation-travail.pdf`

## Step 6: Verification
1. Verify all PDF files exist at the expected locations
2. Test that the Document Library page can successfully fetch and preview the PDFs
3. Confirm download functionality works correctly
4. Ensure file sizes are reasonable (not empty)

## Step 7: Clean Up
Remove any temporary files created during the conversion process.

## Tools Needed
- Document conversion tool (LibreOffice command line or similar)
- File system navigation and copying
- Basic PDF validation

## Estimated Time
- Document search and identification: 30 minutes
- Conversion process: 20 minutes per document (approximately 2-3 hours total)
- Directory setup and file placement: 15 minutes
- Testing and verification: 15 minutes
- Total: Approximately 4 hours

## Dependencies
- Access to document conversion software
- Read access to the uploaded inventory files
- Write access to the public/documents directory
