import React, { useState, useEffect } from 'react'
import '../styles/AgeResult.css'

const AgeResult = ({ gregorianDate, age }) => {
    const [animatedAge, setAnimatedAge] = useState(0)

    useEffect(() => {
        // Animate the age counter
        if (age > 0) {
            let startValue = 0
            const duration = 1500 // animation duration in ms
            const frameDuration = 1000 / 60 // 60fps
            const totalFrames = Math.round(duration / frameDuration)
            const increment = age / totalFrames

            const counter = setInterval(() => {
                startValue += increment

                if (startValue >= age) {
                    clearInterval(counter)
                    setAnimatedAge(age)
                } else {
                    setAnimatedAge(Math.floor(startValue))
                }
            }, frameDuration)

            return () => clearInterval(counter)
        }
    }, [age])

    if (!gregorianDate || !age) {
        return null
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="result-container">
            <div className="result-card">
                <h2>Your Results</h2>

                <div className="result-section">
                    <div className="result-label">Gregorian Date:</div>
                    <div className="result-value date-value">
                        {formatDate(gregorianDate)}
                    </div>
                </div>

                <div className="result-section age-section">
                    <div className="result-label">Your Age:</div>
                    <div className="result-value age-value">
                        <span className="age-number">{animatedAge}</span>
                        <span className="age-text">years old</span>
                    </div>
                </div>

                <div className="birthday-message">
                    {new Date().getMonth() === gregorianDate.getMonth() &&
                        new Date().getDate() === gregorianDate.getDate() && (
                            <div className="birthday-alert">
                                Happy Birthday! 🎉
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default AgeResult