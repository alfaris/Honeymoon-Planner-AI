import React, { memo } from 'react';

interface CurrencyInputProps {
    label: string;
    budgetName: string;
    currencyName: string;
    budgetValue: string;
    currencyValue: string;
    onBudgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
    required?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    label,
    budgetName,
    currencyName,
    budgetValue,
    currencyValue,
    onBudgetChange,
    onCurrencyChange,
    placeholder,
    required,
}) => {
    return (
        <div>
            <label htmlFor={budgetName} className="block text-sm font-medium text-[var(--brand-text-main)] mb-1.5">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center w-full border border-[var(--brand-border-soft)] rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[var(--brand-rose-300)] focus-within:border-[var(--brand-rose-500)] transition bg-white">
                <input
                    type="number"
                    name={budgetName}
                    id={budgetName}
                    value={budgetValue}
                    onChange={onBudgetChange}
                    placeholder={placeholder}
                    required={required}
                    min="0"
                    className="appearance-none w-full px-3 py-2.5 bg-transparent border-0 focus:ring-0"
                />
                <div className="w-px h-6 bg-[var(--brand-border-soft)]"></div>
                <div className="relative">
                    <select
                        name={currencyName}
                        value={currencyValue}
                        onChange={onCurrencyChange}
                        className="appearance-none bg-transparent border-0 ps-3 pe-8 py-2.5 focus:ring-0 font-medium text-[var(--brand-text-subtle)]"
                        aria-label="Currency"
                    >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>JPY</option>
                        <option>CAD</option>
                        <option>AUD</option>
                        <option>CHF</option>
                        <option>CNY</option>
                        <option>INR</option>
                        <option>BRL</option>
                        <option>EGP</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-[var(--brand-text-subtle)]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CurrencyInput);