export interface PixelCrop {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Creates an HTMLImageElement from an image URL.
 */
export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

/**
 * Crops an image using canvas and resizes it to target dimensions (35x45mm at 300 DPI: 413x531 px).
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  targetWidth = 413,
  targetHeight = 531
): Promise<{ dataUrl: string; blob: Blob }> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Canvas 2D context not available')
  }

  canvas.width = targetWidth
  canvas.height = targetHeight

  // High quality image smoothing
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // Draw crop selection onto the target size canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
        resolve({ dataUrl, blob })
      },
      'image/jpeg',
      0.95
    )
  })
}
