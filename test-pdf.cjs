const { generateAttestationPdf } = require('./dist/lib/attestationPdf.js');
const { generateAutorisationPdf } = require('./dist/lib/autorisationPdf.js');

// Sample data for testing
const sampleAttestationData = {
  nomEntreprise: 'Société Exemple SARL',
  adresseEntreprise: '123, Boulevard Mohammed V, Casablanca',
  iceEntreprise: '000000000000000',
  nomSignataire: 'Ahmed El Alami',
  qualiteSignataire: 'Directeur des Ressources Humaines',
  nomEmploye: 'Fatima Zahra Benali',
  cinEmploye: 'AB123456',
  noCnss: '1234567',
  posteOccupe: 'Ingénieur logiciel',
  natureContrat: 'CDI',
  inclureSalaire: true,
  salaireBrut: '12 500',
  dateDebut: '2020-01-15',
  toujoursEnPoste: true,
  dateFin: '',
  lieuEmission: 'Casablanca',
  dateEmission: '2023-05-20'
};

const sampleAutorisationData = {
  typeAutorisation: 'Voyage',
  nomParent: 'Ahmed El Alami',
  qualite: 'Père',
  adresseParent: '456, Rue de la Liberté, Rabat',
  cinParent: 'CD987654',
  nomEnfant: 'Lina El Alami',
  cinEnfant: 'EF123456',
  dateNaissanceEnfant: '2010-05-10',
  motif: 'Tourisme familial',
  destination: 'Marrakech',
  datesSejour: '15/07/2023 - 30/07/2023',
  accompagnePar: 'Mère',
  telephoneParent: '06 12 34 56 78',
  lieuEmission: 'Rabat',
  dateEmission: '2023-05-20'
};

async function testPDFGeneration() {
  console.log('Testing PDF generation...');

  try {
    // Test Attestation PDF
    console.log('\n1. Testing Attestation PDF generation...');
    const attestationBytes = await generateAttestationPdf(sampleAttestationData);
    console.log(`   Generated ${attestationBytes.length} bytes`);

    if (attestationBytes.length === 0) {
      console.error('   ERROR: Attestation PDF is empty!');
    } else {
      console.log('   SUCCESS: Attestation PDF generated with content');
      console.log(`   First 10 bytes: [${Array.from(attestationBytes.slice(0, 10))}]`);
    }

    // Test Autorisation PDF
    console.log('\n2. Testing Autorisation PDF generation...');
    const autorisationBytes = await generateAutorisationPdf(sampleAutorisationData);
    console.log(`   Generated ${autorisationBytes.length} bytes`);

    if (autorisationBytes.length === 0) {
      console.error('   ERROR: Autorisation PDF is empty!');
    } else {
      console.log('   SUCCESS: Autorisation PDF generated with content');
      console.log(`   First 10 bytes: [${Array.from(autorisationBytes.slice(0, 10))}]`);
    }

  } catch (error) {
    console.error('Error during PDF generation:', error);
  }
}

testPDFGeneration();
