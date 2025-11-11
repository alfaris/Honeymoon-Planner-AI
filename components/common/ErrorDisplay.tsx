import React from 'react';

interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
    t: (key: string) => string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry, t }) => (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-red-50/50 border border-red-200 rounded-lg text-center">
        <h2 className="text-3xl font-serif font-bold text-red-800 mb-4">{t('errorTitle')}</h2>
        <p className="text-red-700 mb-6">{message}</p>
        <button
            onClick={onRetry}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
        >
            {t('tryAgain')}
        </button>
    </div>
);

export default ErrorDisplay;