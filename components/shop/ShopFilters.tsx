import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface ShopFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const ShopFilters: React.FC<ShopFiltersProps> = ({
    categories,
    activeCategory,
    onCategoryChange
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-stone/10">
            <div className="flex overflow-x-auto w-full md:w-auto gap-8 pb-4 md:pb-0 scrollbar-hide">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`whitespace-nowrap text-sm tracking-widest uppercase transition-colors duration-300 ${activeCategory === category
                            ? 'text-seafoam font-semibold'
                            : 'text-stone/50 hover:text-seafoam'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm text-stone/70 hover:text-stone transition-colors group">
                <Filter size={16} /> Filter & Sort <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </button>
        </div>
    );
};
