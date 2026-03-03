
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';

// Sample product data
const products = [
  {
    id: "gold-shampoo",
    name: "Gold Shampoo",
    description: "Provitamin B5 & Rosemary Leaf Extract formula that strengthens hair, reduces dandruff, and leaves every strand cleaner and shinier.",
    image: "/media/gold-shampoo-1.png",
    category: "Hair Care"
  },
  {
    id: "velvet-shampoo",
    name: "Velvet Touch Shampoo",
    description: "Cyclopentasiloxane-enriched shampoo with dual Polyquaternium conditioning for silky, bouncy, more manageable hair.",
    image: "/media/vt-shampoo-1.jpeg",
    category: "Hair Care"
  },
  {
    id: "rosemary-shampoo",
    name: "Rosemary Shampoo",
    description: "Rosmerinus Officinalis (Rosemary) Leaf Extract shampoo that stimulates the scalp, repairs the hair cuticle, and strengthens from within.",
    image: "/media/rose-shampoo-1.png",
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
    description: "Rose extract and licorice water lotion that reduces dryness, brightens skin tone, and leaves a soft, delicate fragrance.",
    image: "/media/rose-lotion-1.jpeg",
    category: "Skincare"
  },
  {
    id: "velvet-body-lotion",
    name: "Velvet Touch Body Lotion",
    description: "Mulberry extract and rice water lotion for intense hydration that brightens, smooths, and leaves skin feeling velvety and luminous.",
    image: "/media/vt-lotion-1.jpeg",
    category: "Skincare"
  },
  {
    id: "honey-body-lotion",
    name: "Honey Almonds Body Lotion",
    description: "Honey extract and almond oil blend that locks in 24-hour hydration, soothes dryness, and leaves skin silky and naturally radiant.",
    image: "/media/honey-lotion-1.jpeg",
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
    description: "Rose water and aloe vera body wash that gently cleanses, hydrates, and leaves skin soft with a mood-lifting floral fragrance.",
    image: "/media/rose-bodywash-1.jpeg",
    category: "Body"
  },
  {
    id: "velvet-body-wash",
    name: "Velvet Touch Body Wash",
    description: "Tea tree and mulberry extract body wash that cleanses deeply, protects skin, and leaves a fresh, long-lasting fragrance.",
    image: "/media/vt-bodywash-1.jpeg",
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
    description: "Neem leaves paste with castor oil and Vitamin E — your daily defence against acne-causing bacteria and skin infections.",
    image: "/media/neem-soap-1.jpeg",
    category: "Body"
  },
  {
    id: "rose-soap",
    name: "Rose Petals Soap",
    description: "Handcrafted with real rose petals and rose water — a natural toner that softens, hydrates, and gently protects against sun damage.",
    image: "/media/rose-soap-1.jpeg",
    category: "Body"
  },
  {
    id: "camphor-soap",
    name: "Camphor Cube Soap",
    description: "Camphor powder with neem and aloe vera for a cooling, antibacterial and antifungal cleanse that purifies and hydrates.",
    image: "/media/camphor-soap-1.jpeg",
    category: "Body"
  },
  {
    id: "sandal-soap",
    name: "Sandal & Saffron Soap",
    description: "Precious sandal oil and saffron extract soap that moisturises, brightens, and reduces dryness for healthy-looking skin.",
    image: "/media/sandal-soap-1.jpeg",
    category: "Body"
  },
  {
    id: "lemon-soap",
    name: "Lemon Grass Soap",
    description: "Lemongrass extract with Vitamin C and scrub beads — antioxidant-rich soap that brightens complexion and controls oily skin.",
    image: "/media/lemon-soap-1.jpeg",
    category: "Body"
  },
  {
    id: "velvet-soap",
    name: "Velvet Touch Soap",
    description: "Lavender buds and neem extract soap that relieves stress, fights acne, soothes dry skin, and helps reduce scarring.",
    image: "/media/vt-soap-1.jpeg",
    category: "Body"
  },
  {
    id: "all-skin-facewash",
    name: "All Skin Face Wash",
    description: "Salicylic acid and Golden Thread face wash for all skin types — gently cleanses, brightens, and maintains a healthy skin balance.",
    image: "/media/allskin-facewash-1.jpg",
    category: "Face"
  },
  {
    id: "oil-free-facewash",
    name: "Oil-Free Face Wash",
    description: "Salicylic acid and Vitamin C oil-free face wash that deep cleanses pores, controls acne, and brightens dull skin.",
    image: "/media/oilfree-facewash-1.jpg",
    category: "Face"
  }
];

const categories = ["All", "Skincare", "Hair Care", "Body", "Face"];

const ProductsPage = () => {
  useSEO({
    title: 'All Products',
    description: 'Shop the full Cocast collection — herbal shampoos, artisan soaps, body lotions, body wash and face wash. All products are natural, vegan and cruelty-free.',
  });
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
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
