
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import { motion, AnimatePresence } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { Leaf, Heart, PackageOpen } from 'lucide-react';

// Sample product data - this would typically come from an API
const products = [
  {
    id: "gold-shampoo",
    name: "Gold Shampoo",
    description: "Helps improve hair texture and enhance color longevity. Our formula reduces and prevents dandruff, which can weaken hair, while minimizing the risk of hair loss and breakage. Ideal for maintaining healthy, strong, and vibrant hair.",
    image: "/media/gold-shampoo.png",
    images: ["/media/gold-shampoo-1.png", "/media/gold-shampoo-3.jpg"],
    category: "Hair Care",
    ingredients: ["Rosemarinus Officinalis Leaf Extract", "Aqua", "Cocamide Propylene Beatine", "Cocamide Diethanolaminl", "Sodium Luther Sulphate", "Coco Betaine", "Polyquaternium 7 Polyquaternium 10 Guar Hydroxypropyltrimontium Chloride", "Glycerine", "Cocomonoethanod", "Ethylene Glycol Monostearate", "Sodium Chloride", "Cyclopentasiloxane"],
    benefits: ["Gentle cleansing", "Adds natural shine", "Strengthens hair follicles", "Balances scalp"],
    usage: "Apply to wet hair and massage into scalp. Rinse thoroughly. For best results, follow with our Restorative Conditioner.",
    certifications: ["Vegan", "Cruelty-Free", "Paraben-Free", "Non-Toxic"],
    size: "350ml",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Shampoo-Daily-Nourishing-Cleanser/dp/B0G443VB27/",
      flipkart: "https://www.flipkart.com/cocast-gold-shampoo-250-ml/p/itm224207702d92c?pid=SHOG443VB27",
    },
    related: []
  },
  {
    id: "velvet-shampoo",
    name: "Velvet Touch Shampoo",
    description: "Helps improve hair texture and enhance color longevity. Our formula reduces and prevents dandruff, which can weaken hair, while minimizing the risk of hair loss and breakage. Ideal for maintaining healthy, strong, and vibrant hair.",
    image: "/media/velvet-shampoo.jpg",
    images: ["/media/vt-shampoo-1.jpeg", "/media/vt-shampoo-2.jpg"],
    category: "Hair Care",
    ingredients: ["Rosemarinus Officinalis Leaf Extract", "Aqua", "Cocamide Propylene Beatine", "Cocamide Diethanolaminl", "Sodium Luther Sulphate", "Coco Betaine", "Polyquaternium 7 Polyquaternium 10 Guar Hydroxypropyltrimontium Chloride", "Glycerine", "Cocomonoethanod", "Ethylene Glycol Monostearate", "Sodium Chloride", "Cyclopentasiloxane"],
    benefits: ["Gentle cleansing", "Adds natural shine", "Strengthens hair follicles", "Balances scalp"],
    usage: "Apply to wet hair and massage into scalp. Rinse thoroughly. For best results, follow with our Restorative Conditioner.",
    certifications: ["Vegan", "Cruelty-Free", "Paraben-Free", "Non-Toxic"],
    size: "350ml",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Velvet-Shampoo-Smooth-Cleanser/dp/B0G43Z7DR5/",
    },
    related: []
  },
  {
    id: "rosemary-shampoo",
    name: "Rosemary Shampoo",
    description: "Helps improve hair texture and enhance color longevity. Our formula reduces and prevents dandruff, which can weaken hair, while minimizing the risk of hair loss and breakage. Ideal for maintaining healthy, strong, and vibrant hair.",
    image: "/media/rose-shampoo-1.png",
    images: ["/media/rose-shampoo-1.png", "/media/rose-shampoo-2.jpg"],
    category: "Hair Care",
    ingredients: ["Rosemarinus Officinalis Leaf Extract", "Aqua", "Cocamide Propylene Beatine", "Cocamide Diethanolaminl", "Sodium Luther Sulphate", "Coco Betaine", "Polyquaternium 7 Polyquaternium 10 Guar Hydroxypropyltrimontium Chloride", "Glycerine", "Cocomonoethanod", "Ethylene Glycol Monostearate", "Sodium Chloride", "Cyclopentasiloxane"],
    benefits: ["Gentle cleansing", "Adds natural shine", "Strengthens hair follicles", "Balances scalp"],
    usage: "Apply to wet hair and massage into scalp. Rinse thoroughly. For best results, follow with our Restorative Conditioner.",
    certifications: ["Vegan", "Cruelty-Free", "Paraben-Free", "Non-Toxic"],
    size: "350ml",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Shampoo-Refreshing-Fragrance-Cleanser/dp/B0G4431GR2/",
    },
    related: []
  },
  {
    id: "rose-body-lotion",
    name: "Rose-Oud Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types. This nourishing cream creates a protective barrier that locks in moisture while allowing skin to breathe. Ideal for daily use and especially beneficial for dry or mature skin.",
    image: "/media/rose-lotion-1.jpeg",
    images: ["/media/rose-lotion-1.jpeg", "/media/rose-lotion-2.jpeg"],
    category: "Skincare",
    ingredients: ["Rose Extract", "Shea Butter", "Vitamin E", "Aleovera Extract", "Glycerin", "Aqua", "Cetyl Alchol", "Stearic Acid", "Light Liquid Paraffin", "Phenoxithenol", "Titanium Dioxide", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["24-hour hydration", "Natural Oils and Extracts", "Reduces dryness", "Improves skin texture"],
    usage: "Apply to clean face and body morning and evening. Use gentle upward motions to massage into skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "50ml",
    purchaseLinks: {
      amazon: null,
    },
    related: []
  },
  {
    id: "velvet-body-lotion",
    name: "Velvet Touch Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types. This nourishing cream creates a protective barrier that locks in moisture while allowing skin to breathe. Ideal for daily use and especially beneficial for dry or mature skin.",
    image: "/media/vt-lotion-1.jpeg",
    images: ["/media/vt-lotion-1.jpeg", "/media/vt-lotion-2.jpeg"],
    category: "Skincare",
    ingredients: ["Mulberry Extract", "Rice Water", "Shea Butter", "Vitamin E", "Aleovera Extract", "Glycerin", "Aqua", "Cetyl Alchol", "Stearic Acid", "Light Liquid Paraffin", "Phenoxithenol", "Titanium Dioxide", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["24-hour hydration", "Natural Oils and Extracts", "Reduces dryness", "Improves skin texture"],
    usage: "Apply to clean face and body morning and evening. Use gentle upward motions to massage into skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "50ml",
    purchaseLinks: {
      amazon: null,
    },
    related: []
  },
  {
    id: "honey-body-lotion",
    name: "Honey Almonds Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types. This nourishing cream creates a protective barrier that locks in moisture while allowing skin to breathe. Ideal for daily use and especially beneficial for dry or mature skin.",
    image: "/media/honey-lotion-1.jpeg",
    images: ["/media/honey-lotion-1.jpeg", "/media/honey-lotion-2.jpeg"],
    category: "Skincare",
    ingredients: ["Honey", "Almond Oil", "Shea Butter", "Vitamin E", "Aleovera Extract", "Glycerin", "Aqua", "Cetyl Alchol", "Stearic Acid", "Light Liquid Paraffin", "Phenoxithenol", "Titanium Dioxide", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["24-hour hydration", "Natural Oils and Extracts", "Reduces dryness", "Improves skin texture"],
    usage: "Apply to clean face and body morning and evening. Use gentle upward motions to massage into skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "50ml",
    purchaseLinks: {
      amazon: null,

    },
    related: []
  },
  {
    id: "rose-body-wash",
    name: "Rose Oud Body Wash",
    description: "Indulge in a shower that delights your senses with a mood-boosting, expertly crafted fragrance. This body wash gently cleanses and hydrates, leaving your skin soft, refreshed, and subtly scented. A perfect blend of advanced technology and natural ingredients for a rejuvenating experience.",
    image: "/media/rose-bodywash.png",
    images: ["/media/rose-bodywash-1.jpeg", "/media/rose-wash-1.jpg", "/media/rose-bodywash-2.jpg"],
    category: "Body",
    ingredients: ["Aqua", "Sodium Lauryl Ether Sulphate", "Cocamidopropyl Betain", "Glycerine", "Vitamin E", "Rose Water", "Aleovera Extract", "Neem Extract", "Sodium Benzoate", "Acrylates Copolymer", "Sodium Gluconate", "PHENOXITHENOL", "Fragnance"],
    benefits: ["Hydrates and softens skin.", "Uplifts mood with a soothing, crafted fragrance.", "Gently cleanses without stripping moisture.", "Leaves skin subtly scented and refreshed"],
    usage: "Pour a coin sized drop on a wet Loofah. Squeeze to make it lather, massage on wet skin, then rinse away with water. joy a luxurious, long Lasting Floral Fragnance & Soft glowing Skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "250ml",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Shower-Gel-Hydrating-Brightening/dp/B0G47WN7QM/",

    },
    related: []
  },
  {
    id: "velvet-body-wash",
    name: "Velvet Touch (with Tea Tree Extract) Body Wash",
    description: "Indulge in a shower that delights your senses with a mood-boosting, expertly crafted fragrance. This body wash gently cleanses and hydrates, leaving your skin soft, refreshed, and subtly scented. A perfect blend of advanced technology and natural ingredients for a rejuvenating experience.",
    image: "/media/velvet-bodywash.png",
    images: ["/media/vt-bodywash-1.jpeg", "/media/vt-wash-1.jpg", "/media/vt-bodywash-2.jpg"],
    category: "Body",
    ingredients: ["Aqua", "Sodium Lauryl Ether Sulphate", "Cocamidopropyl Betain", "Glycerine", "Vitamin E", "Mulberry Extract", "Aleovera Extract", "Tea Tree Extract", "Neem Extract", "Sodium Benzoate", "Acrylates Copolymer", "Sodium Gluconate", "PHENOXITHENOL", "Fragnance"],
    benefits: ["Hydrates and softens skin.", "Uplifts mood with a soothing, crafted fragrance.", "Gently cleanses without stripping moisture.", "Leaves skin subtly scented and refreshed"],
    usage: "Pour a coin sized drop on a wet Loofah. Squeeze to make it lather, massage on wet skin, then rinse away with water. joy a luxurious, long Lasting Floral Fragnance & Soft glowing Skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "250ml",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Velvet-Shower-Gel-Gentle/dp/B0G47MLGFT/",

    },
    related: []
  },
  {
    id: "rose-soap",
    name: "Rose Petals Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/rose-soap-1.jpeg",
    images: ["/media/rose-soap-1.jpeg", "/media/rose-soap-1.jpg", "/media/rose-soap-2.jpg", "/media/info-p-1.jpg", "/media/info-p-2.jpg"],
    category: "Body",
    ingredients: ["Rose Petals", "Rose Water", "Aleovera Extract", "Neem Extract", "Coconut Oil", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Enriched with Rose Extract & Vitamin-E", "Provides excellent Sun Block", "Natural Toner for skin"],
    usage: "Apply Gently and foam soap, rinse it with water(warm water for oily skin, cold water for dry skin), dry pat with a soft towel.",
    certifications: ["Sulphate Free", "Cruelty-Free", "Paraben Free"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Premium-Luxury-Bathing-Vitamin/dp/B0G47Q8T91/",

    },
    related: []
  },
  {
    id: "neem-soap",
    name: "Neem Basil Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/neem-soap-1.jpeg",
    images: ["/media/neem-soap-1.jpeg", "/media/neem-soap-2.jpg", "/media/neem-soap-3.jpg", "/media/info-y-1.jpg", "/media/info-y-2.jpg"],
    category: "Body",
    ingredients: ["Neem Leaves", "Basil Extract", "Aleovera Extract", "Neem Oil", "Coconut Oil", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Skin Purifying", "Enriched with neem leaves paste", "Protects Skin from Acne & Infections"],
    usage: "Apply Gently and foam soap, rinse it with water(warm water for oily skin, cold water for dry skin), dry pat with a soft towel.",
    certifications: ["Sulphate Free", "Cruelty-Free", "Paraben Free"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Premium-Luxury-Herbal-Bathing/dp/B0G8K987W8/",

    },
    related: []
  },
  {
    id: "camphor-soap",
    name: "Camphor Cube Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/camphor-soap-1.jpeg",
    images: ["/media/camphor-soap-1.jpeg", "/media/camphor-soap-2.jpg", "/media/camphor-soap-1.jpg", "/media/info-w-1.jpg", "/media/info-w-2.jpg"],
    category: "Body",
    ingredients: ["Bhimseni Camphor powder", "Coconut Oil", "Neem Extract", "Aloevera Extract", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Skin Purifying", "Keeps skin hydrated", "Antibacterial & Antifungal"],
    usage: "Apply Gently and foam soap, rinse it with water(warm water for oily skin, cold water for dry skin), dry pat with a soft towel.",
    certifications: ["Sulphate Free", "Cruelty-Free", "Paraben Free"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Premium-Luxury-Camphor-Bathing/dp/B0G47T749R/",

    },
    related: []
  },
  {
    id: "sandal-soap",
    name: "Sandal & Saffron Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/sandal-soap-1.jpeg",
    images: ["/media/sandal-soap-1.jpeg", "/media/sandal-soap-2.jpeg", "/media/info-1.jpg"],
    category: "Body",
    ingredients: ["Sandal Oil", "Saffron Extract", "Aleovera Extract", "Coconut Oil", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Reduces Inflamation", "Promotes Skin Health", "Moisturize & Rejuvenate's skin", "Reduce Dryness & Dullness"],
    usage: "Apply Gently and foam soap, rinse it with water(warm water for oily skin, cold water for dry skin), dry pat with a soft towel.",
    certifications: ["Sulphate Free", "Cruelty-Free", "Paraben Free"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Premium-Luxury-Saffron-Bathing/dp/B0G8KQWNC4/",

    },
    related: []
  },
  {
    id: "lemon-soap",
    name: "Lemon Grass Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/lemon-soap-1.jpeg",
    images: ["/media/lemon-soap-1.jpeg", "/media/lemon-soap-2.jpeg"],
    category: "Body",
    ingredients: ["Lemongrass Extract", "Lemongrass Leaf", "Aleovera Extract", "Coconut Oil", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Antioxidant Properties", "Calming & Relaxing", "Brightens complexion", "Reduces Oily Skin"],
    usage: "Apply Gently and foam soap, rinse it with water(warm water for oily skin, cold water for dry skin), dry pat with a soft towel.",
    certifications: ["Sulphate Free", "Cruelty-Free", "Paraben Free"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Premium-Luxury-Lemongrass-Bathing/dp/B0G8JW74WP/",

    },
    related: []
  },
  {
    id: "velvet-soap",
    name: "Velvet Touch Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/vt-soap-1.jpeg",
    images: ["/media/vt-soap-1.jpeg", "/media/vt-soap-2.jpeg"],
    category: "Body",
    ingredients: ["Lavender Buds", "Lavender Extract", "Aleovera Extract", "Neem Extract", "Coconut Oil", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Stress Relieving", "Soothes Dry Skin", "Fights Acne", "Reduce Scarring"],
    usage: "Apply Gently and foam soap, rinse it with water(warm water for oily skin, cold water for dry skin), dry pat with a soft towel.",
    certifications: ["Sulphate Free", "Cruelty-Free", "Paraben Free"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Premium-Luxury-Velvet-Bathing/dp/B0G8KDDSYC/",

    },
    related: []
  },
  {
    id: "oil-free-facewash",
    name: "Oil-Free Face Wash",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/oilfree-facewash-1.jpg",
    images: ["/media/oilfree-facewash-1.jpg", "/media/oilfree-facewash-3.jpg", "/media/oilfree-facewash-2.jpg"],
    category: "Body",
    ingredients: ["Lemongrass Extract", "Lemongrass Leaf", "Aleovera Extract", "Coconut Oil", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Salicylic-Vitamin-C-Cleansing-Acne-Prone/dp/B0G47SWFJZ/",

    },
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  },
  {
    id: "all-skin-facewash",
    name: "All Skin Face Wash",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/allskin-facewash-1.jpg",
    images: ["/media/allskin-facewash-1.jpg", "/media/allskin-facewash-2.jpg"],
    category: "Body",
    ingredients: ["Lemongrass Extract", "Lemongrass Leaf", "Aleovera Extract", "Coconut Oil", "Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    purchaseLinks: {
      amazon: "https://www.amazon.in/COCAST-Face-Wash-Combo-Pack/dp/B0G47K98JS/",

    },
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  }
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useSEO({
    title: product ? product.name : 'Product',
    description: product
      ? `${product.name} by Cocast — ${product.description.slice(0, 140)}...`
      : 'View product details for Cocast natural personal care products.',
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // In a real app, this would be an API call
    const fetchProduct = () => {
      setLoading(true);
      const foundProduct = products.find(p => p.id === id);

      if (foundProduct) {
        setProduct(foundProduct);

        // Get related products
        if (foundProduct.related && foundProduct.related.length > 0) {
          const related = foundProduct.related.map(relatedId =>
            products.find(p => p.id === relatedId)
          ).filter(Boolean);
          setRelatedProducts(related);
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-cocast-beige/50 w-1/3 rounded"></div>
            <div className="h-72 bg-cocast-beige/50 rounded"></div>
            <div className="h-4 bg-cocast-beige/50 w-3/4 rounded"></div>
            <div className="h-4 bg-cocast-beige/50 w-1/2 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link
            to="/products"
            className="inline-block bg-cocast-sage hover:bg-cocast-darkSage text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex text-sm">
            <li>
              <Link to="/" className="text-cocast-brown/60 hover:text-cocast-brown">Home</Link>
              <span className="mx-2 text-cocast-brown/60">/</span>
            </li>
            <li>
              <Link to="/products" className="text-cocast-brown/60 hover:text-cocast-brown">Products</Link>
              <span className="mx-2 text-cocast-brown/60">/</span>
            </li>
            <li className="text-cocast-brown font-medium truncate">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image Gallery */}
          <div>
            <ProductGallery
              images={product.images || [product.image]}
              productName={product.name}
            />

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {product.certifications.map((cert: string) => (
                  <div
                    key={cert}
                    className="flex items-center bg-cocast-cream px-3 py-1.5 rounded-full"
                  >
                    {cert === 'Vegan' && <Leaf size={16} className="mr-1.5 text-cocast-darkSage" />}
                    {cert === 'Cruelty-Free' && <Heart size={16} className="mr-1.5 text-cocast-darkSage" />}
                    {cert === 'Organic' && <PackageOpen size={16} className="mr-1.5 text-cocast-darkSage" />}
                    {/*                     {cert === 'Paraben-Free' && <NoEntry size={16} className="mr-1.5 text-cocast-darkSage" />}
                    {cert === 'Non-Toxic' && <Shield size={16} className="mr-1.5 text-cocast-darkSage" />} */}

                    <span className="text-xs font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block text-sm font-medium text-cocast-darkSage mb-2">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">{product.name}</h1>

            <div className="prose prose-green max-w-none mb-6">
              <p className="text-cocast-brown/80">{product.description}</p>
            </div>

            {/* Purchase Links */}
            {product.purchaseLinks && (
              <div className="mb-8 p-4 bg-cocast-cream/50 rounded-lg border border-cocast-beige">
                <h3 className="font-medium mb-3 text-cocast-brown">Buy Now</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Amazon */}
                  {'amazon' in product.purchaseLinks && (
                    product.purchaseLinks.amazon ? (
                      <a
                        href={product.purchaseLinks.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#FF9900]/90 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
                      >
                        <span className="font-bold text-lg">Amazon</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4" />
                        </svg>
                      </a>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#FF9900]/40 text-white font-medium py-2.5 px-4 rounded-md cursor-not-allowed">
                        <span className="font-bold text-base">Amazon</span>
                        <span className="text-[10px] font-semibold tracking-widest uppercase bg-white/30 px-2 py-0.5 rounded-full">Coming Soon</span>
                      </div>
                    )
                  )}

                  {/* Flipkart */}
                  {'flipkart' in product.purchaseLinks && (
                    product.purchaseLinks.flipkart ? (
                      <a
                        href={product.purchaseLinks.flipkart}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#2874F0] hover:bg-[#2874F0]/90 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
                      >
                        <span className="font-bold text-lg">Flipkart</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#2874F0]/40 text-white font-medium py-2.5 px-4 rounded-md cursor-not-allowed">
                        <span className="font-bold text-base">Flipkart</span>
                        <span className="text-[10px] font-semibold tracking-widest uppercase bg-white/30 px-2 py-0.5 rounded-full">Coming Soon</span>
                      </div>
                    )
                  )}

                  {/* Meesho */}
                  {'meesho' in product.purchaseLinks && (
                    product.purchaseLinks.meesho ? (
                      <a
                        href={product.purchaseLinks.meesho}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#9F2089] hover:bg-[#9F2089]/90 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
                      >
                        <span className="font-bold text-lg">Meesho</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#9F2089]/40 text-white font-medium py-2.5 px-4 rounded-md cursor-not-allowed">
                        <span className="font-bold text-base">Meesho</span>
                        <span className="text-[10px] font-semibold tracking-widest uppercase bg-white/30 px-2 py-0.5 rounded-full">Coming Soon</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Size */}
            {product.size && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <span className="inline-block bg-cocast-cream px-3 py-1 rounded text-sm">{product.size}</span>
              </div>
            )}

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Key Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-5 h-5 text-cocast-sage mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-cocast-brown/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage Instructions */}
            {product.usage && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Suggested Usage</h3>
                <p className="text-cocast-brown/80 text-sm">{product.usage}</p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Ingredients</h3>
                <div className="bg-cocast-cream/50 p-4 rounded-md">
                  <p className="text-sm text-cocast-brown/80">
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              </div>
            )}

            {/* Back to Products Button */}
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center border border-cocast-sage text-cocast-sage hover:bg-cocast-sage hover:text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard {...relatedProduct} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
