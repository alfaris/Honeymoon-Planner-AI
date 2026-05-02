import React, { useState, useEffect } from 'react';
import { ClipboardCheck } from 'lucide-react';

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
        <div className="bg-white p-8 rounded-[2rem] shadow-card border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose-50 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl -z-10"></div>
            <h3 className="text-2xl font-serif font-black text-brand-text-heading mb-6 tracking-tight flex items-center gap-3">
                <div className="p-2 bg-brand-rose-50 rounded-lg">
                    <ClipboardCheck className="h-5 w-5 text-brand-rose-500" />
                </div>
                {t('preTripChecklist')}
            </h3>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index}>
                       <label className="flex items-start cursor-pointer group">
                            <div className="relative flex items-center shrink-0">
                                <input 
                                    type="checkbox" 
                                    checked={!!checkedState[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                    className="peer w-6 h-6 border-2 border-brand-rose-100 rounded-lg text-brand-rose-500 focus:ring-brand-rose-500/20 accent-brand-rose-500 cursor-pointer transition-all hover:border-brand-rose-300" 
                                />
                            </div>
                            <span className={`ms-4 text-sm font-medium leading-relaxed transition-all duration-300 ${checkedState[index] ? 'line-through text-brand-text-subtle/50' : 'text-brand-text-subtle group-hover:text-brand-text-heading'}`}>
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