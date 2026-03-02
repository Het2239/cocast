
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const carouselProducts = [
    { src: "/media/gold-shampoo-1.png", alt: "Gold Shampoo", to: "/products/gold-shampoo" },
    { src: "/media/rose-soap-1.jpeg", alt: "Rose Petals Soap", to: "/products/rose-soap" },
    { src: "/media/vt-shampoo-1.jpeg", alt: "Velvet Touch Shampoo", to: "/products/velvet-shampoo" },
    { src: "/media/neem-soap-1.jpeg", alt: "Neem Basil Soap", to: "/products/neem-soap" },
    { src: "/media/rose-lotion-1.jpeg", alt: "Rose-Oud Body Lotion", to: "/products/rose-body-lotion" },
    { src: "/media/camphor-soap-1.jpeg", alt: "Camphor Cube Soap", to: "/products/camphor-soap" },
    { src: "/media/rose-shampoo-1.png", alt: "Rosemary Shampoo", to: "/products/rosemary-shampoo" },
    { src: "/media/sandal-soap-1.jpeg", alt: "Sandal & Saffron Soap", to: "/products/sandal-soap" },
    { src: "/media/vt-lotion-1.jpeg", alt: "Velvet Touch Lotion", to: "/products/velvet-body-lotion" },
    { src: "/media/rose-bodywash-1.jpeg", alt: "Rose Oud Body Wash", to: "/products/rose-body-wash" },
    { src: "/media/lemon-soap-1.jpeg", alt: "Lemon Grass Soap", to: "/products/lemon-soap" },
    { src: "/media/vt-bodywash-1.jpeg", alt: "Velvet Touch Body Wash", to: "/products/velvet-body-wash" },
    { src: "/media/honey-lotion-1.jpeg", alt: "Honey Almonds Lotion", to: "/products/honey-body-lotion" },
    { src: "/media/vt-soap-1.jpeg", alt: "Velvet Touch Soap", to: "/products/velvet-soap" },
    { src: "/media/oilfree-facewash-1.jpg", alt: "Oil-Free Face Wash", to: "/products/oil-free-facewash" },
    { src: "/media/allskin-facewash-1.jpg", alt: "All Skin Face Wash", to: "/products/all-skin-facewash" },
];

// Duplicate for seamless infinite loop
const doubled = [...carouselProducts, ...carouselProducts];

const ProductCarousel = () => {
    return (
        <section className="py-16 bg-cocast-cream/30">
            <div className="container mx-auto px-4 mb-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block text-sm font-medium text-cocast-darkSage mb-3 tracking-wider uppercase">
                        Our Products
                    </span>
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-cocast-brown">
                        Explore the Full Collection
                    </h2>
                    <p className="mt-3 text-cocast-brown/70 max-w-xl mx-auto">
                        From nourishing shampoos to luxurious soaps and body care — all crafted with nature's finest.
                    </p>
                </motion.div>
            </div>

            {/* Carousel track */}
            <div className="relative w-full overflow-hidden">
                {/* Fade masks */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#f8f5f0] to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#f8f5f0] to-transparent" />

                <div
                    className="flex gap-6 w-max"
                    style={{ animation: "marquee-products 50s linear infinite" }}
                >
                    {doubled.map((product, index) => (
                        <Link
                            key={index}
                            to={product.to}
                            className="flex-shrink-0 group relative w-56 h-56 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                            title={product.alt}
                        >
                            <img
                                src={product.src}
                                alt={product.alt}
                                loading="lazy"
                                className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* Name label */}
                            <div className="absolute bottom-0 left-0 right-0 bg-cocast-darkSage/90 text-white text-[11px] font-medium text-center py-1.5 px-2 translate-y-full group-hover:translate-y-0 transition-transform duration-250 leading-tight">
                                {product.alt}
                            </div>
                        </Link>
                    ))}
                </div>

                <style>{`
          @keyframes marquee-products {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
                <Link
                    to="/products"
                    className="inline-block bg-cocast-sage hover:bg-cocast-darkSage text-white font-medium py-3 px-8 rounded-md transition-colors"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
};

export default ProductCarousel;
