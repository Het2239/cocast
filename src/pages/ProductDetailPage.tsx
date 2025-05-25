
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Leaf, Heart, PackageOpen } from 'lucide-react';

// Sample product data - this would typically come from an API
const products = [
  // {
  //   id: "revitalizing-serum",
  //   name: "Revitalizing Serum",
  //   description: "A potent blend of botanical extracts that hydrate and restore skin elasticity. Our Revitalizing Serum is designed to rejuvenate tired skin and provide deep hydration where it's needed most. Formulated with hyaluronic acid and plant stem cells, this lightweight serum absorbs quickly to deliver nutrients deep into the skin.",
  //   image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1374&auto=format&fit=crop",
  //   category: "Skincare",
  //   ingredients: ["Aloe Vera Extract", "Hyaluronic Acid", "Rose Hip Oil", "Vitamin E", "Jojoba Oil", "Green Tea Extract", "Chamomile Essential Oil"],
  //   benefits: ["Deeply hydrates skin", "Improves elasticity", "Reduces fine lines", "Soothes irritation"],
  //   usage: "Apply 2-3 drops to clean skin morning and evening. Gently massage in circular motions until absorbed. Follow with moisturizer.",
  //   certifications: ["Vegan", "Cruelty-Free", "Organic"],
  //   size: "30ml",
  //   related: ["hydrating-face-cream", "refreshing-facial-toner", "gentle-exfoliating-scrub"]
  // },
  {
    id: "gold-shampoo",
    name: "Gold Shampoo",
    description: "Helps improve hair texture and enhance color longevity. Our formula reduces and prevents dandruff, which can weaken hair, while minimizing the risk of hair loss and breakage. Ideal for maintaining healthy, strong, and vibrant hair.",
    image: "/media/gold-shampoo.png",
    category: "Hair Care",
    ingredients: ["Rosemarinus Officinalis Leaf Extract","Aqua", "Cocamide Propylene Beatine", "Cocamide Diethanolaminl", "Sodium Luther Sulphate", "Coco Betaine", "Polyquaternium 7 Polyquaternium 10 Guar Hydroxypropyltrimontium Chloride", "Glycerine","Cocomonoethanod","Ethylene Glycol Monostearate","Sodium Chloride","Cyclopentasiloxane"],
    benefits: ["Gentle cleansing", "Adds natural shine", "Strengthens hair follicles", "Balances scalp"],
    usage: "Apply to wet hair and massage into scalp. Rinse thoroughly. For best results, follow with our Restorative Conditioner.",
    certifications: ["Vegan", "Cruelty-Free", "Paraben-Free","Non-Toxic"],
    size: "250ml",
    related: ["restorative-hair-mask", "calming-body-oil", "moisturizing-body-wash"]
  },
  {
    id: "velvet-shampoo",
    name: "Velvet Touch Shampoo",
    description: "Helps improve hair texture and enhance color longevity. Our formula reduces and prevents dandruff, which can weaken hair, while minimizing the risk of hair loss and breakage. Ideal for maintaining healthy, strong, and vibrant hair.",
    image: "/media/velvet-shampoo.jpg",
    category: "Hair Care",
    ingredients: ["Rosemarinus Officinalis Leaf Extract","Aqua", "Cocamide Propylene Beatine", "Cocamide Diethanolaminl", "Sodium Luther Sulphate", "Coco Betaine", "Polyquaternium 7 Polyquaternium 10 Guar Hydroxypropyltrimontium Chloride", "Glycerine","Cocomonoethanod","Ethylene Glycol Monostearate","Sodium Chloride","Cyclopentasiloxane"],
    benefits: ["Gentle cleansing", "Adds natural shine", "Strengthens hair follicles", "Balances scalp"],
    usage: "Apply to wet hair and massage into scalp. Rinse thoroughly. For best results, follow with our Restorative Conditioner.",
    certifications: ["Vegan", "Cruelty-Free", "Paraben-Free","Non-Toxic"],
    size: "250ml",
    related: ["restorative-hair-mask", "calming-body-oil", "moisturizing-body-wash"]
  },
  {
    id: "rosemary-shampoo",
    name: "Rosemary Shampoo",
    description: "Helps improve hair texture and enhance color longevity. Our formula reduces and prevents dandruff, which can weaken hair, while minimizing the risk of hair loss and breakage. Ideal for maintaining healthy, strong, and vibrant hair.",
    image: "/media/rosemary-shampoo.png",
    category: "Hair Care",
    ingredients: ["Rosemarinus Officinalis Leaf Extract","Aqua", "Cocamide Propylene Beatine", "Cocamide Diethanolaminl", "Sodium Luther Sulphate", "Coco Betaine", "Polyquaternium 7 Polyquaternium 10 Guar Hydroxypropyltrimontium Chloride", "Glycerine","Cocomonoethanod","Ethylene Glycol Monostearate","Sodium Chloride","Cyclopentasiloxane"],
    benefits: ["Gentle cleansing", "Adds natural shine", "Strengthens hair follicles", "Balances scalp"],
    usage: "Apply to wet hair and massage into scalp. Rinse thoroughly. For best results, follow with our Restorative Conditioner.",
    certifications: ["Vegan", "Cruelty-Free", "Paraben-Free","Non-Toxic"],
    size: "250ml",
    related: ["restorative-hair-mask", "calming-body-oil", "moisturizing-body-wash"]
  },
  // {
  //   id: "calming-body-oil",
  //   name: "Calming Body Oil",
  //   description: "Luxurious oil infused with lavender and chamomile to soothe and moisturize. Our lightweight, non-greasy formula absorbs quickly to nourish dry skin while promoting relaxation through aromatherapy benefits. Perfect for post-shower application or as a massage oil.",
  //   image: "https://images.unsplash.com/photo-1608248511213-a66753155c1b?q=80&w=1374&auto=format&fit=crop",
  //   category: "Body",
  //   ingredients: ["Sweet Almond Oil", "Jojoba Oil", "Lavender Essential Oil", "Chamomile Extract", "Vitamin E", "Calendula Infusion"],
  //   benefits: ["Deep hydration", "Promotes relaxation", "Soothes dry skin", "Non-greasy formula"],
  //   usage: "Apply to damp skin after bathing. Massage in circular motions until absorbed. For extra relaxation, use before bedtime.",
  //   certifications: ["Vegan", "Cruelty-Free", "Organic"],
  //   size: "100ml",
  //   related: ["moisturizing-body-wash", "nourishing-shampoo", "hydrating-face-cream"]
  // },
  {
    id: "rose-body-lotion",
    name: "Rose-Oud Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types. This nourishing cream creates a protective barrier that locks in moisture while allowing skin to breathe. Ideal for daily use and especially beneficial for dry or mature skin.",
    image: "/media/rose-bodylotion.png",
    category: "Skincare",
    ingredients: ["Rose Extract", "Shea Butter", "Vitamin E", "Aleovera Extract", "Glycerin", "Aqua","Cetyl Alchol","Stearic Acid","Light Liquid Paraffin","Phenoxithenol","Titanium Dioxide","Disodium EDTA","Butylated Hydroxy Toluene","Fragnance"],
    benefits: ["24-hour hydration", "Natural Oils and Extracts", "Reduces dryness", "Improves skin texture"],
    usage: "Apply to clean face and body morning and evening. Use gentle upward motions to massage into skin.",
    certifications: ["Vegan", "Cruelty-Free","Non-Toxic"],
    size: "50ml",
    related: ["revitalizing-serum", "refreshing-facial-toner", "gentle-exfoliating-scrub"]
  },
  {
    id: "velvet-body-lotion",
    name: "Velvet Touch Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types. This nourishing cream creates a protective barrier that locks in moisture while allowing skin to breathe. Ideal for daily use and especially beneficial for dry or mature skin.",
    image: "/media/velvet-bodylotion.png",
    category: "Skincare",
    ingredients: ["Mulberry Extract", "Rice Water", "Shea Butter", "Vitamin E", "Aleovera Extract", "Glycerin", "Aqua","Cetyl Alchol","Stearic Acid","Light Liquid Paraffin","Phenoxithenol","Titanium Dioxide","Disodium EDTA","Butylated Hydroxy Toluene","Fragnance"],
    benefits: ["24-hour hydration", "Natural Oils and Extracts", "Reduces dryness", "Improves skin texture"],
    usage: "Apply to clean face and body morning and evening. Use gentle upward motions to massage into skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "50ml",
    related: ["revitalizing-serum", "refreshing-facial-toner", "gentle-exfoliating-scrub"]
  },
  {
    id: "honey-body-lotion",
    name: "Honey Almonds Body Lotion",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types. This nourishing cream creates a protective barrier that locks in moisture while allowing skin to breathe. Ideal for daily use and especially beneficial for dry or mature skin.",
    image: "/media/honey-bodylotion.png",
    category: "Skincare",
    ingredients: ["Honey", "Almond Oil", "Shea Butter", "Vitamin E", "Aleovera Extract", "Glycerin", "Aqua","Cetyl Alchol","Stearic Acid","Light Liquid Paraffin","Phenoxithenol","Titanium Dioxide","Disodium EDTA","Butylated Hydroxy Toluene","Fragnance"],
    benefits: ["24-hour hydration", "Natural Oils and Extracts", "Reduces dryness", "Improves skin texture"],
    usage: "Apply to clean face and body morning and evening. Use gentle upward motions to massage into skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "50ml",
    related: ["revitalizing-serum", "refreshing-facial-toner", "gentle-exfoliating-scrub"]
  },
  // {
  //   id: "refreshing-facial-toner",
  //   name: "Refreshing Facial Toner",
  //   description: "Alcohol-free formula with rosewater and witch hazel to balance and refresh skin. This gentle toner removes any remaining impurities after cleansing while restoring skin's natural pH. Suitable for all skin types, particularly beneficial for combination skin.",
  //   image: "https://images.unsplash.com/photo-1614806687007-2215a9db3b1b?q=80&w=1528&auto=format&fit=crop",
  //   category: "Skincare",
  //   ingredients: ["Rose Water", "Witch Hazel Extract", "Aloe Vera Juice", "Cucumber Extract", "Glycerin", "Chamomile Extract"],
  //   benefits: ["Balances pH levels", "Reduces pore appearance", "Preps skin for moisturizer", "Refreshes without drying"],
  //   usage: "After cleansing, apply to cotton pad and sweep gently over face and neck. Allow to dry before applying serum or moisturizer.",
  //   certifications: ["Vegan", "Cruelty-Free", "Alcohol-Free"],
  //   size: "120ml",
  //   related: ["revitalizing-serum", "hydrating-face-cream", "gentle-exfoliating-scrub"]
  // },
  {
    id: "rose-body-wash",
    name: "Rose Oud Body Wash",
    description: "Indulge in a shower that delights your senses with a mood-boosting, expertly crafted fragrance. This body wash gently cleanses and hydrates, leaving your skin soft, refreshed, and subtly scented. A perfect blend of advanced technology and natural ingredients for a rejuvenating experience.",
    image: "/media/rose-bodywash.png",
    category: "Body",
    ingredients: ["Aqua", "Sodium Lauryl Ether Sulphate", "Cocamidopropyl Betain", "Glycerine", "Vitamin E", "Rose Water","Aleovera Extract","Neem Extract","Sodium Benzoate","Acrylates Copolymer","Sodium Gluconate","PHENOXITHENOL","Fragnance"],
    benefits: ["Hydrates and softens skin.", "Uplifts mood with a soothing, crafted fragrance.", "Gently cleanses without stripping moisture.", "Leaves skin subtly scented and refreshed"],
    usage: "Pour a coin sized drop on a wet Loofah. Squeeze to make it lather, massage on wet skin, then rinse away with water. joy a luxurious, long Lasting Floral Fragnance & Soft glowing Skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "250ml",
    related: ["calming-body-oil", "nourishing-shampoo", "restorative-hair-mask"]
  },
  {
    id: "velvet-body-wash",
    name: "Velvet Touch (with Tea Tree Extract) Body Wash",
    description: "Indulge in a shower that delights your senses with a mood-boosting, expertly crafted fragrance. This body wash gently cleanses and hydrates, leaving your skin soft, refreshed, and subtly scented. A perfect blend of advanced technology and natural ingredients for a rejuvenating experience.",
    image: "/media/velvet-bodywash.png",
    category: "Body",
    ingredients: ["Aqua", "Sodium Lauryl Ether Sulphate", "Cocamidopropyl Betain", "Glycerine", "Vitamin E", "Mulberry Extract","Aleovera Extract","Tea Tree Extract","Neem Extract","Sodium Benzoate","Acrylates Copolymer","Sodium Gluconate","PHENOXITHENOL","Fragnance"],
    benefits: ["Hydrates and softens skin.", "Uplifts mood with a soothing, crafted fragrance.", "Gently cleanses without stripping moisture.", "Leaves skin subtly scented and refreshed"],
    usage: "Pour a coin sized drop on a wet Loofah. Squeeze to make it lather, massage on wet skin, then rinse away with water. joy a luxurious, long Lasting Floral Fragnance & Soft glowing Skin.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "250ml",
    related: ["calming-body-oil", "nourishing-shampoo", "restorative-hair-mask"]
  },
  // {
  //   id: "restorative-hair-mask",
  //   name: "Restorative Hair Mask",
  //   description: "Deep conditioning treatment with argan oil and shea butter for damaged hair. This intensive weekly treatment repairs damage from heat styling and chemical processing while adding shine and manageability. Perfect for all hair types, especially beneficial for dry or color-treated hair.",
  //   image: "https://images.unsplash.com/photo-1610705267928-1b9f2fa7f1c5?q=80&w=1374&auto=format&fit=crop",
  //   category: "Hair Care",
  //   ingredients: ["Argan Oil", "Shea Butter", "Coconut Oil", "Silk Proteins", "Vitamin E", "Avocado Oil", "Jojoba Oil"],
  //   benefits: ["Repairs damaged hair", "Adds shine", "Improves manageability", "Prevents split ends"],
  //   usage: "Apply to clean, damp hair focusing on ends. Leave for 10-15 minutes, then rinse thoroughly. Use weekly for best results.",
  //   certifications: ["Vegan", "Cruelty-Free", "Silicone-Free"],
  //   size: "200ml",
  //   related: ["nourishing-shampoo", "calming-body-oil", "hydrating-face-cream"]
  // },
  {
    id: "rose-soap",
    name: "Rose Petals Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/rose-soap.png",
    category: "Body",
    ingredients: ["Rose Petals","Rose Water","Aleovera Extract","Neem Extract", "Coconut Oil","Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  },
  {
    id: "neem-soap",
    name: "Neem Basil Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/neem-soap.png",
    category: "Body",
    ingredients: ["Neem Leaves","Basil Extract","Aleovera Extract","Neem Oil", "Coconut Oil","Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  },
  {
    id: "camphor-soap",
    name: "Camphor Cube Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/camphor-soap.png",
    category: "Body",
    ingredients: ["Lavender Buds","Lavender Extract","Aleovera Extract","Neem Extract", "Coconut Oil","Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  },
  {
    id: "sandal-soap",
    name: "Sandal & Saffron Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/sandal-soap.png",
    category: "Body",
    ingredients: ["Sandal Oil","Saffron Extract","Aleovera Extract", "Coconut Oil","Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  },
  {
    id: "lemon-soap",
    name: "Lemon Grass Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/lemon-soap.png",
    category: "Body",
    ingredients: ["Lemongrass Extract","Lemongrass Leaf","Aleovera Extract", "Coconut Oil","Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  },
  {
    id: "velvet-soap",
    name: "Velvet Touch Soap",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells. This dual-action exfoliant combines physical and chemical exfoliation to reveal smoother, brighter skin without causing irritation. Suitable for all skin types when used as directed.",
    image: "/media/velvet-soap.png",
    category: "Body",
    ingredients: ["Lavender Buds","Lavender Extract","Aleovera Extract","Neem Extract", "Coconut Oil","Vegetable Oil Soap Base", "Glycerine", "Propylene Glycol", "Disodium EDTA", "Butylated Hydroxy Toluene", "Fragnance"],
    benefits: ["Removes dead skin cells", "Improves skin texture", "Brightens complexion", "Enhances product absorption"],
    usage: "Apply to damp skin in gentle circular motions. Rinse thoroughly. Use 1-2 times weekly or as needed.",
    certifications: ["Vegan", "Cruelty-Free", "Non-Toxic"],
    size: "100gm",
    related: ["revitalizing-serum", "hydrating-face-cream", "refreshing-facial-toner"]
  }
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
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
          {/* Product Image */}
          <div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full rounded-md object-cover"
                // style={{ maxHeight: '500px' }}
              />
            </div>
            
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
