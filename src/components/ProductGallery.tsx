import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Ensure we have at least one image
    const galleryImages = images && images.length > 0 ? images : ['/placeholder.svg'];
    const hasMultipleImages = galleryImages.length > 1;

    // Navigation functions
    const goToPrevious = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setSelectedImageIndex((prev) =>
            prev === galleryImages.length - 1 ? 0 : prev + 1
        );
    };

    // Keyboard navigation
    useEffect(() => {
        if (!hasMultipleImages) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [hasMultipleImages, galleryImages.length]);

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-square group bg-gray-50">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={selectedImageIndex}
                            src={galleryImages[selectedImageIndex]}
                            alt={`${productName} - Image ${selectedImageIndex + 1}`}
                            className="w-full h-full rounded-md object-contain"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        />
                    </AnimatePresence>

                    {/* Navigation Arrows - Only show if multiple images */}
                    {hasMultipleImages && (
                        <>
                            {/* Left Arrow */}
                            <button
                                onClick={goToPrevious}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-cocast-brown p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Right Arrow */}
                            <button
                                onClick={goToNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-cocast-brown p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                {selectedImageIndex + 1} / {galleryImages.length}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Thumbnail Navigation */}
            {hasMultipleImages && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {galleryImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 relative rounded-md overflow-hidden transition-all duration-200 ${selectedImageIndex === index
                                ? 'ring-2 ring-cocast-sage ring-offset-2'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <div className="w-20 h-20 bg-white p-1">
                                <img
                                    src={image}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            {selectedImageIndex === index && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute inset-0 border-2 border-cocast-sage rounded-md pointer-events-none"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
