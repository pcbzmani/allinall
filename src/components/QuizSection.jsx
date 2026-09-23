import React, { useState } from 'react';
import { quizData } from '../data/quizData';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, X } from 'lucide-react';

export function QuizSection({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = quizData[currentIdx];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '680px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color-glow)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <HelpCircle color="var(--primary)" size={24} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Computer & DevOps Knowledge Self-Test</h2>
        </div>

        {!quizFinished ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
              <span>Question {currentIdx + 1} of {quizData.length}</span>
              <span className="tag-badge">{currentQ.category}</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              {currentQ.question}
            </h3>

            <div>
              {currentQ.options.map((opt, optIdx) => {
                let stateClass = '';
                if (selectedOption === optIdx) stateClass = 'selected';
                if (isSubmitted) {
                  if (optIdx === currentQ.correctIndex) stateClass = 'correct';
                  else if (selectedOption === optIdx) stateClass = 'incorrect';
                }

                return (
                  <div 
                    key={optIdx}
                    className={`quiz-option ${stateClass}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <span style={{ fontWeight: 700, width: '24px' }}>
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>

            {isSubmitted && (
              <div style={{
                marginTop: '1.25rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: selectedOption === currentQ.correctIndex ? 'rgba(52, 211, 153, 0.1)' : 'rgba(251, 113, 133, 0.1)',
                border: `1px solid ${selectedOption === currentQ.correctIndex ? 'rgba(52, 211, 153, 0.3)' : 'rgba(251, 113, 133, 0.3)'}`
              }}>
                <div style={{ fontWeight: 700, color: selectedOption === currentQ.correctIndex ? 'var(--accent-green)' : 'var(--accent-rose)', marginBottom: '0.3rem' }}>
                  {selectedOption === currentQ.correctIndex ? '✔ Correct Answer!' : '❌ Incorrect'}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{currentQ.explanation}</p>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {!isSubmitted ? (
                <button 
                  className="btn btn-primary" 
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  style={{ opacity: selectedOption === null ? 0.5 : 1 }}
                >
                  Submit Answer
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleNextQuestion}>
                  {currentIdx + 1 < quizData.length ? 'Next Question' : 'View Results'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Quiz Completed!</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Your Score: <strong style={{ color: 'var(--accent-green)', fontSize: '1.4rem' }}>{score}</strong> / {quizData.length}
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              {score === quizData.length ? '🎉 Outstanding! You are a master of DevOps & Computer Science fundamentals.' : 'Good effort! Review the guides and test yourself again to score 100%.'}
            </p>
            <button className="btn btn-primary" onClick={handleRestart}>
              <RefreshCw size={16} />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
