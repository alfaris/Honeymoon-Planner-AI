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
        <div className="p-6 bg-white rounded-xl shadow-xl border border-slate-200/80">
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-4 flex items-center">
                <ChecklistIcon />
                {t('preTripChecklist')}
            </h3>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index}>
                       <label className="flex items-center cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={!!checkedState[index]}
                                onChange={() => handleCheckboxChange(index)}
                                className="w-5 h-5 border-2 border-slate-300 rounded-sm me-3 text-rose-500 focus:ring-rose-500/50 accent-rose-500" 
                            />
                            <span className={`text-slate-700 text-sm group-hover:text-rose-600 transition-all ${checkedState[index] ? 'line-through text-slate-400' : ''}`}>
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