
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

// Sample product data
const featuredProducts = [
  {
    id: "gold-shampoo",
    name: "Gold Shampoo",
    description: "Gentle cleansing with aloe vera and avocado oil for soft, healthy hair.",
    image: "/media/gold-shampoo.png",
    category: "Hair Care"
  },
  {
    id: "rose-body-lotion",
    name: "Rose-Oud Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types.",
    image: "/media/rose-bodylotion.png",
    category: "Skincare"
  },
  {
    id: "velvet-body-wash",
    name: "Velvet Touch Body Wash",
    description: "Gentle cleansing with coconut-derived surfactants and essential oils.",
    image: "/media/velvet-bodywash.png",
    category: "Body"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-cocast-cream to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-cocast-brown/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our most loved natural formulations, created with sustainable ingredients and packaged in eco-friendly materials.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a 
              href="/products" 
              className="inline-block border-b-2 border-cocast-sage text-cocast-sage hover:border-cocast-darkSage hover:text-cocast-darkSage font-medium transition-colors"
            >
              View all products →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
