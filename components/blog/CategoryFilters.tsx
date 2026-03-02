import React from 'react';

interface CategoryFiltersProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
    categories,
    activeCategory,
    onCategoryChange
}) => {
    return (
        <div className="sticky top-16 z-20 bg-cream/90 backdrop-blur-md border-y border-stone/10 py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                            ? 'bg-seafoam text-white shadow-md shadow-seafoam/20'
                            : 'bg-transparent text-stone/60 hover:text-stone hover:bg-stone/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};
