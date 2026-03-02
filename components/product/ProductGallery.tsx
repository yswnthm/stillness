import React from 'react';

interface ProductGalleryProps {
    images: string[];
    activeImageIndex: number;
    setActiveImageIndex: (index: number) => void;
    tag?: string;
    productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
    images,
    activeImageIndex,
    setActiveImageIndex,
    tag,
    productName
}) => {
    return (
        <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4 lg:sticky lg:top-32 h-fit">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full lg:w-20 shrink-0 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-square rounded-lg overflow-hidden shrink-0 w-20 lg:w-full border-2 transition-colors ${activeImageIndex === idx ? 'border-seafoam' : 'border-transparent'}`}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-stone/20 transition-opacity ${activeImageIndex === idx ? 'opacity-0' : 'opacity-100 hover:opacity-50'}`} />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-sand/20">
                {tag && (
                    <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm text-stone px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium shadow-sm">
                        {tag}
                    </div>
                )}
                <img
                    src={images[activeImageIndex]}
                    alt={productName}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};
