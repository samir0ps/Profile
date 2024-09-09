export const separateLetters = (str: string): string[] => {
  return str.split('').map(char => char === ' ' ? '\u00A0' : char)
}
