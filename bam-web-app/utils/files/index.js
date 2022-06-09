const WRONG_IMAGE_TYPE = 'wrong-image-type'
const WRONG_DOCUMENT_TYPE = 'wrong-document-type'
const TOO_LARGE_FILE = 'too-large-file'
export const MAX_MB_SIZE = 9
export const IMAGE = 'IMAGE'
export const DOCUMENT = 'DOCUMENT'
export const IMAGE_TYPES = ['.jpg', '.jpeg', '.png']
export const DOCUMENT_TYPES = [
  '.doc',
  '.docx',
  '.jpg',
  '.jpeg',
  '.png',
  '.xls',
  '.xlsx',
  '.csv',
  '.pdf'
]
export const IMAGE_MIMETYPES = ['image/png', 'image/jpeg']
export const DOCUMENT_MIMETYPES = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/pdf'
]

const isSizeValid = size => {
  return +size / 1024 / 1024 < MAX_MB_SIZE
}

export const isDocumentsInvalid = (files, existingFiles) => {
  const documents = Array.from(files)

  if (existingFiles) {
    documents.push(...existingFiles)
  }

  for (const document of documents) {
    const { type, name, size } = document

    if (!isMimeTypeAndExtValid(DOCUMENT, type, name)) {
      return WRONG_DOCUMENT_TYPE
    } else if (!isSizeValid(size)) {
      return TOO_LARGE_FILE
    }
  }

  return null
}

export const isImageInvalid = image => {
  const { type, name, size } = image

  return !isMimeTypeAndExtValid(IMAGE, type, name)
    ? WRONG_IMAGE_TYPE
    : !isSizeValid(size)
    ? TOO_LARGE_FILE
    : null
}

export const isMimeTypeAndExtValid = (typeOfFile, mimeType, fileName) => {
  const ext = fileName
    .split('.')
    .pop()
    .toLowerCase()

  return typeOfFile === DOCUMENT
    ? DOCUMENT_TYPES.includes(`.${ext}`) &&
        DOCUMENT_MIMETYPES.includes(mimeType)
    : IMAGE_TYPES.includes(`.${ext}`) && IMAGE_MIMETYPES.includes(mimeType)
}
