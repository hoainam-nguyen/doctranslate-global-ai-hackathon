import FileTypePowerPoint from '@src/assets/file-type-powerpoint.svg'
import FileTypePdf from '@src/assets/file-type-pdf2.svg'
import FileTypeBlank from '@src/assets/blank-file.svg'

export const setIconFile = (fileName: string, className?: string) => {
  if (
    fileName.includes('pptx') ||
    fileName.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')
  ) {
    return <img src={FileTypePowerPoint} alt="" className={className} />
  }
  if (fileName.includes('application/pdf') || fileName.includes('pdf')) {
    return <img src={FileTypePdf} alt="" className={className} />
  }
  return <img src={FileTypeBlank} alt="" className={className} />
}

export const getFileSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB']
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units?.length - 1) {
    size /= 1024
    unitIndex++
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`
}

export const getFileType = (fileType: string) => {
  if (fileType === 'application/pdf') {
    return 'application/pdf'
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    return 'application/pptx'
  } else {
    return ''
  }
}

export const isFileTooLarge = (file: File, maxSizeMB: number): boolean => {
  const fileSizeMB = file.size / (1024 * 1024)
  return fileSizeMB > maxSizeMB
}

export const convertFileName = (fileName: string) => {
  const myArray = fileName.split('_')
  const key = myArray[myArray.length - 2]
  const last = myArray.pop()?.split('.')[0]
  const key_remove = '_' + key + '_' + last
  const textConvert = fileName.replace(key_remove, '')
  return textConvert
}
