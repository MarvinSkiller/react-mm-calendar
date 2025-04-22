// This is a simplified implementation of Myanmar calendar to Gregorian conversion
// In a production environment, a more comprehensive library would be recommended

/**
 * Converts Myanmar calendar date to Gregorian date
 * Note: This is a simplified implementation for educational purposes
 * 
 * @param {number} myanmarYear - Myanmar year
 * @param {number} myanmarMonth - Myanmar month (1-12)
 * @param {number} myanmarDay - Myanmar day (1-30)
 * @returns {Date} - JavaScript Date object representing Gregorian date
 */
import  mcal  from 'myanmar-calendar';
import {myanmarMonths} from "./calendarData";


export const convertToGregorian = (myanmarYear, myanmarMonth, myanmarDay) => {
  var monthsString = myanmarMonths[myanmarMonth -1]
  if(monthsString === '2nd Waso'){
    myanmarDay = myanmarDay + 30
    monthsString = myanmarMonths[myanmarMonth -2]
  }
  // Format the Myanmar date string in a way compatible with mcal.toGregorian
  const formattedMyanmarDate = `${myanmarDay} ${monthsString}, ${myanmarYear -1}`;
  const result = mcal.toGregorian(formattedMyanmarDate);
  console.log(formattedMyanmarDate);
  console.log(result);
  console.log(mcal.toGregorian('35 Waso, 1354'))
  return result
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
