export default function useUtils() {
  function calculateAge(bd: Date): number {
    const birthDate = new Date(bd)
    const today = new Date()
    let calculatedAge = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--
    }

    return calculatedAge
  }

  return {
    calculateAge
  }
}
