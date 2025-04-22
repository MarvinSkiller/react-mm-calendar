import React, { useState, useEffect } from 'react'
import { convertToGregorian, calculateAge } from '../utils/dateConverter'
import { myanmarMonths, myanmarDays } from '../utils/calendarData'
import AgeResult from './AgeResult'
import '../styles/AgeCalculator.css'

const AgeCalculator = () => {
    const [formData, setFormData] = useState({
        myanmarYear: '',
        myanmarMonth: '',
        myanmarDay: '',
    })

    const [gregorianDate, setGregorianDate] = useState(null)
    const [age, setAge] = useState(null)
    const [error, setError] = useState('')
    const [isCalculating, setIsCalculating] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear previous results when inputs change
        setGregorianDate(null)
        setAge(null)
        setError('')
    }

    const validateInputs = () => {
        const { myanmarYear, myanmarMonth, myanmarDay } = formData

        if (!myanmarYear || !myanmarMonth || !myanmarDay) {
            setError('Please fill in all fields')
            return false
        }

        const yearNum = parseInt(myanmarYear)
        const monthNum = parseInt(myanmarMonth)
        const dayNum = parseInt(myanmarDay)

        if (isNaN(yearNum) || yearNum < 1 || yearNum > 2000) {
            setError('Please enter a valid Myanmar year (1-2000)')
            return false
        }

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            setError('Please enter a valid Myanmar month (1-12)')
            return false
        }

        if (isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
            setError('Please select a valid Myanmar moon phase')
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateInputs()) {
            return
        }

        setIsCalculating(true)

        try {
            // Convert Myanmar date to Gregorian
            const { myanmarYear, myanmarMonth, myanmarDay } = formData
            const gregorian = convertToGregorian(
                parseInt(myanmarYear),
                parseInt(myanmarMonth),
                parseInt(myanmarDay)
            )

            // Calculate age based on Gregorian date
            const calculatedAge = calculateAge(gregorian)

            // Simulate calculation delay for animation
            setTimeout(() => {
                setGregorianDate(gregorian)
                setAge(calculatedAge)
                setIsCalculating(false)
            }, 800)
        } catch (err) {
            setError('Error calculating age. Please check your inputs.')
            setIsCalculating(false)
        }
    }

    const resetForm = () => {
        setFormData({
            myanmarYear: '',
            myanmarMonth: '',
            myanmarDay: '',
        })
        setGregorianDate(null)
        setAge(null)
        setError('')
    }

    return (
        <div className="calculator-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="myanmarYear">Myanmar Year</label>
                        <input
                            type="number"
                            id="myanmarYear"
                            name="myanmarYear"
                            value={formData.myanmarYear}
                            onChange={handleInputChange}
                            placeholder="e.g., 1383"
                            min="1"
                            max="2000"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="myanmarMonth">Myanmar Month</label>
                        <select
                            id="myanmarMonth"
                            name="myanmarMonth"
                            value={formData.myanmarMonth}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Month</option>
                            {myanmarMonths.map((month, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="myanmarDay">Moon Phase</label>
                        <select
                            id="myanmarDay"
                            name="myanmarDay"
                            value={formData.myanmarDay}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Moon Phase</option>
                            {myanmarDays.map((day, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="button-group">
                        <button
                            type="submit"
                            className="calculate-button"
                            disabled={isCalculating}
                        >
                            {isCalculating ? 'Calculating...' : 'Calculate Age'}
                        </button>
                        <button
                            type="button"
                            className="reset-button"
                            onClick={resetForm}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            {(gregorianDate && age) && (
                <AgeResult
                    gregorianDate={gregorianDate}
                    age={age}
                />
            )}
        </div>
    )
}

export default AgeCalculator