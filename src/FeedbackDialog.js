import React, { useState } from 'react';

const questions = [
    "तुम्हाला एक्सपर्ट गुरुजी ॲप बदल माहित आहे का?",
    "तुम्ही एक्सपर्ट गुरुजी ॲप मोफत वापरण्यासाठी इच्छुक आहात का?",
    "तुमच्या शाळेतील इतर शिक्षक एक्स्पर्ट गुरुजी ॲप वापरतात का?",
    "तुमच्या शाळेतील इतर शिक्षकांना एक्स्पर्ट गुरुजी ॲप बदल माहिती देऊ शकता का?"
];

const FeedbackDialog = ({ onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);

    // Function to handle user's answer to a question
    const handleAnswer = (answer) => {
        const newAnswers = [...answers, {
            question: questions[currentQuestion],
            answer
        }];
        setAnswers(newAnswers);

        // Move to the next question or mark as completed if all questions are answered
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCompleted(true);
        }
    };

    // Render the completion message once all questions are answered
    if (completed) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '16px', // p-4
                fontFamily: "'Poppins', sans-serif" // Changed to Poppins
            }}>
                {/* Dialog Container */}
                <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)', // bg-gradient-to-br from-gray-50 to-gray-200
                    padding: '32px', // p-8
                    borderRadius: '24px', // rounded-3xl
                    maxWidth: '500px', // max-w-sm sm:max-w-md md:max-w-lg (simplified for inline)
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)', // shadow-2xl
                    border: '1px solid rgba(255,255,255,0.2)', // border border-white border-opacity-20
                    overflow: 'hidden',
                    transition: 'all 0.3s', // transition-all duration-300
                    transform: 'scale(1)' // scale-100
                }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // hover:scale-105
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {/* Top Gradient Bar */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px', // h-2 (converted from rem to px)
                        background: 'linear-gradient(90deg, #1e40af, #3b82f6)', // bg-gradient-to-r from-indigo-800 to-blue-500
                        borderTopLeftRadius: '24px', // rounded-t-3xl
                        borderTopRightRadius: '24px' // rounded-t-3xl
                    }}></div>

                    {/* Thank You Message */}
                    <div style={{
                        fontSize: '2rem', // text-4xl
                        fontWeight: '800', // font-extrabold
                        background: 'linear-gradient(90deg, #1e40af, #3b82f6)', // bg-gradient-to-r from-indigo-800 to-blue-600
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        marginBottom: '24px', // mb-6
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)' // drop-shadow-lg (simplified for inline)
                    }}>
                        धन्यवाद !
                    </div>

                    {/* Completion Message */}
                    <p style={{
                        fontSize: '1rem',
                        color: '#1f2937',
                        marginBottom: '32px',
                        lineHeight: '1.625'
                    }}>
                        तुमचा फीडबॅक यशस्वीरित्या जतन केला गेला आहे!<br />
                        <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            🎉 आणि तुम्हाला एक्सपर्ट गुरुजी ॲप मोफत मिळाले आहे! 🙏
                        </span>
                    </p>


                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(90deg, #1e40af, #3b82f6)', // bg-gradient-to-r from-indigo-800 to-blue-600
                            color: 'white',
                            fontWeight: '600', // font-semibold
                            padding: '12px 32px', // py-3 px-8
                            borderRadius: '9999px', // rounded-full
                            fontSize: '1.125rem', // text-lg
                            boxShadow: '0 5px 15px rgba(30, 64, 175, 0.4)', // shadow-lg
                            transition: 'all 0.3s', // transition-all duration-300
                            transform: 'translateY(0)', // transform hover:-translate-y-1
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none' // focus:outline-none (simplified)
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 64, 175, 0.6)'; // hover:shadow-xl
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(30, 64, 175, 0.4)';
                        }}
                    >
                        ठीक आहे
                    </button>
                </div>
            </div>
        );
    }

    // Render the feedback questions dialog
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '16px', // p-4
            fontFamily: "'Poppins', sans-serif" // Changed to Poppins
        }}>
            {/* Dialog Container */}
            <div style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)', // bg-gradient-to-br from-gray-50 to-gray-200
                padding: '32px', // p-8
                borderRadius: '24px', // rounded-3xl
                maxWidth: '500px', // max-w-sm sm:max-w-md md:max-w-lg (simplified for inline)
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)', // shadow-2xl
                border: '1px solid rgba(255,255,255,0.2)', // border border-white border-opacity-20
                overflow: 'hidden'
            }}>
                {/* Top Gradient Bar */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '8px', // h-2 (converted from rem to px)
                    background: 'linear-gradient(90deg, #1e40af, #3b82f6)', // bg-gradient-to-r from-indigo-800 to-blue-500
                    borderTopLeftRadius: '24px', // rounded-t-3xl
                    borderTopRightRadius: '24px' // rounded-t-3xl
                }}></div>

                {/* Introductory Text */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '24px' // mb-6
                }}>
                    <p style={{
                        color: '#1f2937', // darker gray for better readability
                        fontSize: '0.95rem', // slightly larger for emphasis
                        fontWeight: '500', // medium weight
                        marginBottom: '20px',
                        lineHeight: '1.7',
                        fontFamily: "'Poppins', sans-serif",
                        transition: 'all 0.3s ease-in-out'
                    }}>
                        हे ॲप <span style={{ fontWeight: '550', color: '#3b82f6' }}>तुमच्या सोयीसाठी</span> तयार केले असून,<br />
                        <span style={{ fontWeight: '550', color: '#16a34a' }}>तुमचा फीडबॅक</span> आम्हाला ते अधिक चांगले बनवण्यासाठी मदत करेल. 🙌
                    </p>


                    {/* Question Progress Indicator */}
                    <div style={{
                        display: 'inline-block',
                        backgroundColor: '#e0e7ff', // bg-indigo-100
                        color: '#3730a3', // text-indigo-800
                        padding: '8px 16px', // px-4 py-2
                        borderRadius: '9999px', // rounded-full
                        fontSize: '0.875rem', // text-sm
                        fontWeight: '600', // font-semibold
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' // shadow-inner (simplified for inline)
                    }}>
                        प्रश्न {currentQuestion + 1} / {questions.length}
                    </div>
                </div>

                {/* Current Question */}
                <h3 style={{
                    color: '#1e3a8a', // text-indigo-900
                    fontSize: '1.115rem', // text-xl sm:text-2xl (simplified for inline)
                    fontWeight: '700', // font-bold
                    textAlign: 'center',
                    marginBottom: '32px', // mb-8
                    lineHeight: '1.25' // leading-tight
                }}>
                    {questions[currentQuestion]}
                </h3>

                {/* Answer Buttons */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row', // Changed from 'column' to 'row' for horizontal layout
                    justifyContent: 'center',
                    gap: '16px', // gap-4
                    marginTop: '32px', // mt-8
                    flexWrap: 'wrap' // Added flexWrap for better mobile handling if buttons get too wide
                }}>
                    <button
                        onClick={() => handleAnswer('होय')}
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(90deg, #16a34a, #4ade80)', // bg-gradient-to-r from-green-600 to-green-400
                            color: 'white',
                            fontWeight: '600', // font-semibold
                            padding: '12px 32px', // py-3 px-8
                            borderRadius: '9999px', // rounded-full
                            fontSize: '1.125rem', // text-lg
                            boxShadow: '0 5px 15px rgba(22, 163, 74, 0.4)', // shadow-lg
                            transition: 'all 0.3s', // transition-all duration-300
                            transform: 'translateY(0)', // transform hover:-translate-y-1
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none', // focus:outline-none (simplified)
                            flexGrow: 1, // Allow buttons to grow and fill space
                            minWidth: '120px' // Ensure a minimum width for buttons
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(22, 163, 74, 0.6)'; // hover:shadow-xl
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(22, 163, 74, 0.4)';
                        }}
                    >
                        होय
                    </button>
                    <button
                        onClick={() => handleAnswer('नाही')}
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(90deg, #dc2626, #f87171)', // bg-gradient-to-r from-red-600 to-red-400
                            color: 'white',
                            fontWeight: '600', // font-semibold
                            padding: '12px 32px', // py-3 px-8
                            borderRadius: '9999px', // rounded-full
                            fontSize: '1.125rem', // text-lg
                            boxShadow: '0 5px 15px rgba(220, 38, 38, 0.4)', // shadow-lg
                            transition: 'all 0.3s', // transition-all duration-300
                            transform: 'translateY(0)', // transform hover:-translate-y-1
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none', // focus:outline-none (simplified)
                            flexGrow: 1, // Allow buttons to grow and fill space
                            minWidth: '120px' // Ensure a minimum width for buttons
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.6)'; // hover:shadow-xl
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(220, 38, 38, 0.4)';
                        }}
                    >
                        नाही
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackDialog;
