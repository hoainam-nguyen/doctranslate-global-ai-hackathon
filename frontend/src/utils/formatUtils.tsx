export const shortString = (str: string, maxLength: number) => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str
  }
  
  type DictionaryItem = { [key: string]: any[] }
  
  export const unifyDictionary = (dictionary: DictionaryItem[]): any[] => {
    let unifiedDictionary: any[] = []
  
    dictionary.forEach(item => {
      Object.values(item).forEach(innerArray => {
        unifiedDictionary = unifiedDictionary.concat(innerArray)
      })
    })
  
    return unifiedDictionary
  }
  