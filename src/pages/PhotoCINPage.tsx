import React, { useState, useCallback, useRef } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { PageHeading, Card, FormField, Button } from '../components/ui'
import { getCroppedImg, type PixelCrop } from '../lib/cropImage'
import { Seo } from '../components/Seo'

export type DocumentType = 'CIN (35x45mm)' | 'Passeport (35x45mm)'

const DOCUMENT_TYPES: DocumentType[] = [
  'CIN (35x45mm)',
  'Passeport (35x45mm)',
]

const PhotoCINPage: React.FC = () => {
  const [docType, setDocType] = useState<DocumentType>('CIN (35x45mm)')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null)
  const [generatedResult, setGeneratedResult] = useState<{
    dataUrl: string
    blob: Blob
  } | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Veuillez sélectionner un fichier image valide (JPEG, PNG).')
      return
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('L\'image est trop volumineuse (maximum 15 Mo).')
      return
    }

    setErrorMsg(null)
    setGeneratedResult(null)

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
    }
    reader.readAsDataURL(file)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0])
    }
  }

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleGenerate = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    setIsProcessing(true)
    setErrorMsg(null)

    try {
      const result = await getCroppedImg(imageSrc, croppedAreaPixels, 413, 531)
      setGeneratedResult(result)
    } catch (e) {
      console.error(e)
      setErrorMsg('Erreur lors du traitement de l\'image. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!generatedResult) return
    const url = URL.createObjectURL(generatedResult.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = docType.startsWith('Passeport') ? 'photo-passeport.jpg' : 'photo-cin.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setImageSrc(null)
    setGeneratedResult(null)
    setErrorMsg(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Photo CIN / Passeport Maroc aux normes — Redimensionner en ligne"
        description="Format officiel photo CIN Maroc (35×45 mm, 300 DPI) : cadrez et redimensionnez votre photo d'identité en ligne gratuitement pour CIN et passeport marocain."
        canonicalUrl="https://kaghit.com/photo-cin"
      />

      <PageHeading
        title="Photo CIN / Passeport"
        description="Recadrez et adaptez facilement votre photo d'identité au format officiel marocain (35 × 45 mm, 300 DPI) directement depuis votre navigateur."
        icon={
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        }
      />

      {/* ── Guidelines card ── */}
      <Card className="mb-8 border-primary-100 bg-neutral-50/80">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-3">
          <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          Recommandations pour une photo conforme (norme officielle)
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            Fond uni clair (de préférence blanc ou gris très clair).
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            Visage centré, face à l'objectif, expression neutre.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            Yeux bien ouverts et visibles, sans reflet sur les lunettes.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            Éclairage homogène sans ombres portées sur le visage.
          </li>
        </ul>
      </Card>

      {/* ── Document specification selector ── */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <FormField id="documentType" label="Type de document d'identité">
            <div className="relative min-w-[240px]">
              <select
                id="documentType"
                value={docType}
                onChange={(e) => setDocType(e.target.value as DocumentType)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              >
                {DOCUMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </FormField>

          <div className="bg-neutral-50 px-4 py-3 rounded-lg border border-neutral-100 text-xs text-neutral-600 sm:text-right">
            <span className="font-semibold text-neutral-900 block">Format d'exportation :</span>
            35 × 45 mm (413 × 531 px @ 300 DPI) · JPEG
          </div>
        </div>
      </Card>

      {/* Error alert if any */}
      {errorMsg && (
        <div role="alert" className="mb-6 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          {errorMsg}
        </div>
      )}

      {/* ── Main Tool Workspace ── */}
      {!imageSrc ? (
        /* Upload Drag & Drop zone */
        <Card className="p-8 sm:p-12 text-center border-2 border-dashed border-neutral-200 hover:border-primary/50 transition-colors">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center p-6 rounded-xl transition-colors ${
              isDragging ? 'bg-primary-50/50 border-primary' : ''
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
              Glissez-déposez votre photo ici
            </h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-md">
              Supporte les formats JPG, JPEG et PNG (taille maximale : 15 Mo).
            </p>

            <div>
              <Button
                variant="primary"
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 3.5A1.5 1.5 0 014.5 2h11A1.5 1.5 0 0117 3.5v13a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zM4.5 3.5v9.878l3.25-3.25a.75.75 0 011.06 0l2.69 2.69 1.47-1.47a.75.75 0 011.06 0l2.47 2.47V3.5h-12z" clipRule="evenodd" />
                </svg>
                Choisir une photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={onSelectFile}
                className="sr-only"
              />
            </div>
          </div>
        </Card>
      ) : (
        /* Crop & Editing Interface */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left / Center 2 Cols: Cropper */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Ajustement du cadrage (35 × 45)
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs font-medium text-primary hover:text-primary-600 transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.5a.75.75 0 00-.75.75v3.75a.75.75 0 001.5 0v-1.928l.43.43a7 7 0 1010.559-8.487.75.75 0 00-1.127.99 5.5 5.5 0 01.2 3.84z" clipRule="evenodd" />
                  </svg>
                  Changer de photo
                </button>
              </div>

              {/* Cropper Container */}
              <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={35 / 45}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  showGrid={false}
                  objectFit="contain"
                />

                {/* Oval & Shoulder Overlay Guide for Head Positioning */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[50%] h-[75%] max-w-[200px] max-h-[260px] border border-dashed border-white/70 rounded-full flex flex-col items-center justify-start pt-6 shadow-2xl">
                    {/* Eye level line indicator */}
                    <div className="w-full border-t border-dotted border-white/50 absolute top-[38%]" />
                    <span className="text-[10px] text-white/80 font-sans bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs select-none">
                      Centrer le visage
                    </span>

                    {/* Shoulder guideline curve */}
                    <svg
                      className="absolute bottom-0 w-[140%] h-[35%] text-white/40 overflow-visible"
                      viewBox="0 0 100 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    >
                      <path d="M -20 50 Q 50 10 120 50" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Controls: Zoom slider */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                  <span className="text-xs font-medium text-neutral-600 shrink-0">Zoom :</span>
                  <button
                    onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                    className="p-1 rounded bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold"
                    aria-label="Zoom arrière"
                  >
                    –
                  </button>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.05}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <button
                    onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                    className="p-1 rounded bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-bold"
                    aria-label="Zoom avant"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleGenerate}
                  variant="primary"
                  disabled={isProcessing}
                  className="w-full sm:w-auto shrink-0"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Génération...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 0v9.5c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75z" clipRule="evenodd" />
                      </svg>
                      Générer la photo
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Col: Result Preview & Download */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                Résultat final (35 × 45 mm)
              </h3>

              {generatedResult ? (
                <div className="flex flex-col items-center gap-4">
                  {/* Photo Container styled like physical photo print */}
                  <div className="p-2 bg-white rounded shadow-md border border-neutral-200 inline-block">
                    <img
                      src={generatedResult.dataUrl}
                      alt="Photo d'identité générée"
                      className="w-[140px] h-[180px] object-cover rounded-xs border border-neutral-100"
                    />
                  </div>

                  <div className="text-xs text-neutral-500 space-y-1">
                    <p className="font-semibold text-neutral-800">Prête pour impression</p>
                    <p>Format : 413 × 531 px (300 DPI)</p>
                    <p>Fichier : JPEG Haute Qualité</p>
                  </div>

                  <Button
                    onClick={handleDownload}
                    variant="primary"
                    className="w-full py-3 mt-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v7.44l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0L5.72 9.78a.75.75 0 011.06-1.06l2.47 2.47V3.75A.75.75 0 0110 3zM3.25 14a.75.75 0 01.75.75v1.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-1.5a.75.75 0 011.5 0v1.5A2 2 0 0115.5 18h-11A2 2 0 012.5 16v-1.25A.75.75 0 013.25 14z" clipRule="evenodd" />
                    </svg>
                    Télécharger la photo
                  </Button>
                </div>
              ) : (
                <div className="py-12 border border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center text-neutral-400">
                  <svg className="w-10 h-10 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-xs max-w-[180px] leading-relaxed">
                    Ajustez le cadrage puis cliquez sur "Générer la photo".
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* ── Footer Disclaimer ── */}
      <div className="mt-10 flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
        <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Avertissement :</strong> Cet outil aide au cadrage et au formatage de vos photos d'identité aux normes marocaines (35 × 45 mm). Il ne garantit pas l'acceptation officielle par les autorités compétentes. Veuillez vérifier les exigences spécifiques actuelles de votre administration.
        </p>
      </div>

      {/* ── Informational / SEO Section ── */}
      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Guide et normes pour la photo d'identité au Maroc
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Dimensions officielles (35 × 45 mm)
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pour la carte nationale d'identité électronique (CNIE) et le passeport biométrique marocain, le format standard est strictement fixé à 35 mm de largeur et 45 mm de hauteur. Cet outil génère une image en haute résolution (300 DPI - 413 × 531 px).
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Cadrage et posture du visage
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Le visage doit être parfaitement centré, orienté de face avec le regard fixe vers l'objectif. L'expression doit être neutre (bouche fermée, pas de sourire prononcé). La tête doit occuper entre 70% et 80% de la hauteur de la photo.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Éclairage &amp; Fond recommandé
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              La photo doit être prise sur un fond clair et uniforme (blanc ou bleu très clair), sans motifs ni ombres. L'éclairage doit être homogène afin d'éviter les yeux rouges ou les reflets sur les lunettes. Cet outil de recadrage ne remplace pas une prise de vue conforme.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default PhotoCINPage
