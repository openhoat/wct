export const caseRegexp = /[\s-_]/

export const toPascalCase = (s: string) =>
  s
    .split(caseRegexp)
    .map((word) => {
      const firstLetter = word.charAt(0).toUpperCase()
      const otherLetters = word.substring(1).toLowerCase()
      return `${firstLetter}${otherLetters}`
    })
    .join('')
