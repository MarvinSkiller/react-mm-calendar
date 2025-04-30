
import {myanmarMonths} from "./calendarData";
import { MyanmarDate, MyanmarMonths, MyanmarMonthType, MoonPhase } from 'mm-calendar';


export const convertToGregorian = (myanmarYear, myanmarMonth, myanmarDay) => {
  const monthsString = myanmarMonths[myanmarMonth-1];
  const monthValue = MyanmarMonths[monthsString];

  let moonPhase;

  switch (true) {
    case (myanmarDay < 15):
      moonPhase = MoonPhase.waxing;
      break;
    case (myanmarDay === 15):
      moonPhase = MoonPhase.fullMoon;
      break;
    case (myanmarDay > 15 && myanmarDay < 30):
      moonPhase = MoonPhase.waning;
      break;
    case (myanmarDay === 30):
      moonPhase = MoonPhase.newMoon;
      break;
    default:
      moonPhase = null; // Or throw an error if invalid day
  }

  const fortnightDay = myanmarDay > 15 ? myanmarDay -15 : myanmarDay;

  const date1 = MyanmarDate.fromMyanmarDate({
    year: myanmarYear,
    month: monthValue,
    day: fortnightDay,
    moonPhase: moonPhase,
    myanmarMonthType: MyanmarMonthType.oo,
    fortnightDay: fortnightDay,
  }, { lang: 'en' })

  const gregorianDate = date1.toGregorian()
  console.log(gregorianDate.year, gregorianDate.month, gregorianDate.day)

  return new Date(gregorianDate.year, gregorianDate.month -1, gregorianDate.day)
}

/**
 * Calculates age based on birthdate and current date
 * 
 * @param {Date} birthdate - JavaScript Date object for birthdate
 * @returns {number} - Age in years
 */
export const calculateAge = (birthdate) => {
  const today = new Date()
  let age = today.getFullYear() - birthdate.getFullYear()
  
  // Adjust age if birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthdate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--
  }
  
  return age
}
