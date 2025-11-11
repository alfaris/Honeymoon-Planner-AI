import React, { useState, useEffect } from 'react';
import ChecklistIcon from '../icons/ChecklistIcon';

interface PreTripChecklistProps {
    t: (key: string) => string;
    items: string[];
}

const PreTripChecklist: React.FC<PreTripChecklistProps> = ({ t, items }) => {
    const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

    useEffect(() => {
        setCheckedState(items.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}));
    }, [items]);

    const handleCheckboxChange = (index: number) => {
        setCheckedState(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    
    return (
        <div className="card-style p-6">
            <h3 className="text-xl font-serif font-bold text-[var(--brand-text-heading)] mb-4 flex items-center">
                <ChecklistIcon />
                {t('preTripChecklist')}
            </h3>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index}>
                       <label className="flex items-start cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={!!checkedState[index]}
                                onChange={() => handleCheckboxChange(index)}
                                className="w-5 h-5 border-2 mt-0.5 border-slate-300 rounded me-3 text-[var(--brand-rose-500)] focus:ring-[var(--brand-rose-500)]/50 accent-[var(--brand-rose-500)] shrink-0" 
                            />
                            <span className={`text-[var(--brand-text-main)] text-sm group-hover:text-[var(--brand-rose-600)] transition-all ${checkedState[index] ? 'line-through text-[var(--brand-text-subtle)]' : ''}`}>
                                {item}
                            </span>
                       </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreTripChecklist;