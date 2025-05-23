
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

// Sample product data
const products = [
  // {
  //   id: "revitalizing-serum",
  //   name: "Revitalizing Serum",
  //   description: "A potent blend of botanical extracts that hydrate and restore skin elasticity.",
  //   image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1374&auto=format&fit=crop",
  //   category: "Skincare"
  // },
  {
    id: "gold-shampoo",
    name: "Gold Shampoo",
    description: "Gentle cleansing with aloe vera and avocado oil for soft, healthy hair.",
    image: "/media/gold-shampoo.png",
    category: "Hair Care"
  },
  {
    id: "velvet-shampoo",
    name: "Velvet Touch Shampoo",
    description: "Gentle cleansing with aloe vera and avocado oil for soft, healthy hair.",
    image: "/media/velvet-shampoo.jpg",
    category: "Hair Care"
  },
  {
    id: "rosemary-shampoo",
    name: "Rosemary Shampoo",
    description: "Gentle cleansing with aloe vera and avocado oil for soft, healthy hair.",
    image: "/media/rosemary-shampoo.png",
    category: "Hair Care"
  },
  // {
  //   id: "calming-body-oil",
  //   name: "Calming Body Oil",
  //   description: "Luxurious oil infused with lavender and chamomile to soothe and moisturize.",
  //   image: "https://images.unsplash.com/photo-1608248511213-a66753155c1b?q=80&w=1374&auto=format&fit=crop",
  //   category: "Body"
  // },
  {
    id: "rose-body-lotion",
    name: "Rose-Oud Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types.",
    image: "/media/rose-bodylotion.png",
    category: "Skincare"
  },
  {
    id: "velvet-body-lotion",
    name: "Velvet Touch Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types.",
    image: "/media/velvet-bodylotion.png",
    category: "Skincare"
  },
  {
    id: "honey-body-lotion",
    name: "Honey Almonds Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types.",
    image: "/media/honey-bodylotion.png",
    category: "Skincare"
  },
  // {
  //   id: "refreshing-facial-toner",
  //   name: "Refreshing Facial Toner",
  //   description: "Alcohol-free formula with rosewater and witch hazel to balance and refresh skin.",
  //   image: "https://images.unsplash.com/photo-1614806687007-2215a9db3b1b?q=80&w=1528&auto=format&fit=crop",
  //   category: "Skincare"
  // },
  {
    id: "rose-body-wash",
    name: "Rose Oud Body Wash",
    description: "Gentle cleansing with coconut-derived surfactants and essential oils.",
    image: "/media/rose-bodywash.png",
    category: "Body"
  },
  {
    id: "velvet-body-wash",
    name: "Velvet Touch Body Wash",
    description: "Gentle cleansing with coconut-derived surfactants and essential oils.",
    image: "/media/velvet-bodywash.png",
    category: "Body"
  },
  // {
  //   id: "restorative-hair-mask",
  //   name: "Restorative Hair Mask",
  //   description: "Deep conditioning treatment with argan oil and shea butter for damaged hair.",
  //   image: "https://images.unsplash.com/photo-1610705267928-1b9f2fa7f1c5?q=80&w=1374&auto=format&fit=crop",
  //   category: "Hair Care"
  // },
  {
    id: "neem-soap",
    name: "Neam Basil Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells.",
    image: "/media/neem-soap.png",
    category: "Body"
  },
  {
    id: "rose-soap",
    name: "Rose Petals Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells.",
    image: "/media/rose-soap.png",
    category: "Body"
  },
  {
    id: "camphor-soap",
    name: "Camphor Cube Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells.",
    image: "/media/camphor-soap.png",
    category: "Body"
  },
  {
    id: "sandal-soap",
    name: "Sandal & Saffron Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells.",
    image: "/media/sandal-soap.png",
    category: "Body"
  }
];

const categories = ["All", "Skincare", "Hair Care", "Body"];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Our Products</h1>
          <p className="max-w-2xl mx-auto text-cocast-brown/80">
            Explore our collection of natural personal care products, crafted with sustainable ingredients and thoughtful formulations.
          </p>
          
          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-cocast-sage text-white' 
                    : 'bg-cocast-cream text-cocast-brown hover:bg-cocast-beige'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-cocast-brown/70">No products found in this category.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsPage;
