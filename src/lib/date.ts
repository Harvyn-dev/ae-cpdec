import { format } from "date-fns"
import { fr } from "date-fns/locale"

/**
 * Formate une date pour l'affichage en français avec le fuseau horaire d'Abidjan
 * @param date - La date à formater
 * @returns La date formatée en français
 */
export function formatAbidjan(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  // Format français avec jour, mois et année
  return format(dateObj, "d MMMM yyyy", { locale: fr })
}

/**
 * Formate une date avec l'heure pour l'affichage en français
 * @param date - La date à formater
 * @returns La date et l'heure formatées en français
 */
export function formatAbidjanWithTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return format(dateObj, "d MMMM yyyy 'à' HH:mm", { locale: fr })
}

/**
 * Formate une date de manière relative (il y a X jours)
 * @param date - La date à formater
 * @returns La date formatée de manière relative
 */
export function formatRelative(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "Aujourd'hui"
  if (diffInDays === 1) return "Hier"
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`
  if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`

  return formatAbidjan(dateObj)
}
