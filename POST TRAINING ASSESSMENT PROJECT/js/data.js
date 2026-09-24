/**
 * DHAGO - Product & Collection Data
 * Modern Nepali Fashion Store
 */

const DHAGO_DATA = {
  storeInfo: {
    name: "DHAGO धागो",
    tagline: "Threads of Tradition, Stitches of Tomorrow",
    currency: "Rs.",
    phone: "+977 1-4432109 / +977 9801234567",
    email: "namaste@dhagofashion.np",
    locations: [
      {
        city: "Kathmandu",
        address: "Durbar Marg (Opposite Royal Palace Museum), Kathmandu",
        hours: "Sun - Fri: 10:00 AM - 7:30 PM"
      },
      {
        city: "Pokhara",
        address: "Lakeside Road, Ward 6 (Near Barahi Temple), Pokhara",
        hours: "Mon - Sun: 10:00 AM - 8:00 PM"
      }
    ]
  },

  collections: [
    {
      id: "dhaka-fusion",
      title: "The Dhaka Revival",
      subtitle: "Heritage Patterns Reimagined for Modern Streetwear",
      description: "Handwoven Palpali & Terhathumi Dhaka weaves seamlessly fused into modern silhouettes, jackets, and urban daily wear.",
      image: "images/product_trench.png",
      badge: "Signature Collection"
    },
    {
      id: "cashmere-luxe",
      title: "Himalayan Cashmere Luxe",
      subtitle: "Pure Chyangra Pashmina & High Altitude Knits",
      description: "Ultra-soft, ethically sourced 100% Chyangra Pashmina shawls and contemporary knitwear crafted in the valleys of Mustang.",
      image: "images/image.png",
      badge: "Premium Winter"
    },
    {
      id: "urban-eco",
      title: "Zero-Waste Hemp & Cotton",
      subtitle: "Sustainable Eco-Fashion from Western Nepal",
      description: "Organic hemp grown in Western Nepal, processed naturally and tailored into breathable minimal streetwear.",
      image: "images/product_hoodie.png",
      badge: "Sustainable Line"
    }
  ],

  products: [
    {
      id: "p_trench",
      name: "DHAGO Royal Palpali Accent Trench Coat",
      category: "Outerwear",
      collectionId: "dhaka-fusion",
      price: 9990,
      originalPrice: 11500,
      rating: 5.0,
      reviewsCount: 42,
      image: "images/product_trench.png",
      isNew: true,
      isBestSeller: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#D4C5B9", "#1A1A1A", "#8B0000"],
      description: "Signature modern double-breasted trench coat tailored in heavy beige khaki canvas featuring handwoven Palpali Dhaka geometric pattern accents on the lapel collar, storm flap, and sleeve cuffs.",
      fabric: "Heavy Cotton Canvas & Handwoven Palpali Dhaka Weave",
      care: "Dry Clean Only",
      inStock: true
    },
    {
      id: "p1",
      name: "DHAGO Heritage Dhaka Jacket",
      category: "Outerwear",
      collectionId: "dhaka-fusion",
      price: 6800,
      originalPrice: 8200,
      rating: 4.9,
      reviewsCount: 34,
      image: "images/product_jacket.png",
      isNew: true,
      isBestSeller: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#1A1A1A", "#8B0000", "#C88A58"],
      description: "Tailored luxury jacket featuring handwoven traditional Palpali Dhaka fabric panels on high-density organic cotton canvas. Fully lined with breathable silk blend.",
      fabric: "100% Cotton & Traditional Handloom Dhaka",
      care: "Dry Clean Only",
      inStock: true
    },
    {
      id: "p2",
      name: "Himalayan Cashmere Crewneck",
      category: "Knitwear",
      collectionId: "cashmere-luxe",
      price: 8500,
      originalPrice: 9800,
      rating: 5.0,
      reviewsCount: 28,
      image: "images/product_knit.png",
      isNew: true,
      isBestSeller: false,
      sizes: ["S", "M", "L"],
      colors: ["#F5F5DC", "#2F4F4F", "#D3D3D3"],
      description: "Featherlight yet exceptionally warm sweater knitted from 100% authentic Grade-A Mustang Chyangra pashmina wool.",
      fabric: "100% Mustang Chyangra Pashmina Cashmere",
      care: "Hand wash in lukewarm water with wool detergent",
      inStock: true
    },
    {
      id: "p3",
      name: "Kathmandu Organic Hemp Hoodie",
      category: "Streetwear",
      collectionId: "urban-eco",
      price: 4200,
      originalPrice: 4800,
      rating: 4.8,
      reviewsCount: 52,
      image: "images/product_hoodie.png",
      isNew: false,
      isBestSeller: true,
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["#C88A58", "#355E3B", "#2B2B2B"],
      description: "Heavyweight relaxed-fit hoodie crafted from naturally dyed organic wild hemp and recycled cotton fibers.",
      fabric: "55% Wild Hemp, 45% Organic Cotton",
      care: "Machine wash cold inside out",
      inStock: true
    },
    {
      id: "p4",
      name: "Chyangra Pashmina Luxury Shawl",
      category: "Accessories",
      collectionId: "cashmere-luxe",
      price: 12000,
      originalPrice: 14500,
      rating: 4.9,
      reviewsCount: 19,
      image: "images/image.png",
      isNew: true,
      isBestSeller: false,
      sizes: ["One Size"],
      colors: ["#E6D7C3", "#8B4513", "#1C1C1C"],
      description: "Exquisite 100% authentic Mustang Chyangra Pashmina hand-spun luxury shawl featuring hand-twisted fringe details and ultra-soft weave.",
      fabric: "100% Mustang Chyangra Pashmina Wool",
      care: "Professional Dry Clean Recommended",
      inStock: true
    },

    {
      id: "p6",
      name: "Highland Eco Hemp Cargo Pants",
      category: "Bottoms",
      collectionId: "urban-eco",
      price: 3900,
      originalPrice: 4500,
      rating: 4.6,
      reviewsCount: 41,
      image: "images/product_hoodie.png",
      isNew: false,
      isBestSeller: true,
      sizes: ["30", "32", "34", "36"],
      colors: ["#4A5D4E", "#8C6D58", "#1E1E1E"],
      description: "Utility cargo trousers designed with durable hemp canvas, deep ergonomic pockets, and adjustable cuff pull cords.",
      fabric: "100% Natural Industrial Hemp Canvas",
      care: "Machine wash warm, hang dry",
      inStock: true
    },
    {
      id: "p7",
      name: "Nepal Silk Fusion Kurtha Set",
      category: "Shirts",
      collectionId: "dhaka-fusion",
      price: 5100,
      originalPrice: 5900,
      rating: 4.8,
      reviewsCount: 27,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      isNew: true,
      isBestSeller: false,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#FFFFFF", "#FAF0E6", "#D4AF37"],
      description: "Mandarin collar minimalist fusion shirt with hand-carved wooden buttons and discrete Dhaka placket detailing.",
      fabric: "Raw Silk & Handloom Cotton Blend",
      care: "Hand wash gently in cold water",
      inStock: true
    },
    {
      id: "p8",
      name: "Handwoven Dhaka Minimalist Tote",
      category: "Accessories",
      collectionId: "dhaka-fusion",
      price: 2600,
      originalPrice: 3200,
      rating: 4.9,
      reviewsCount: 63,
      image: "images/product_tote.png",
      isNew: false,
      isBestSeller: true,
      sizes: ["One Size"],
      colors: ["#8B0000", "#1A1A1A"],
      description: "Structured daily tote bag featuring full-panel traditional Dhaka weaving, genuine leather straps, and laptop sleeve.",
      fabric: "Heavy Cotton Canvas & Terhathum Dhaka Weave",
      care: "Spot clean with damp cloth",
      inStock: true
    }
  ]
};
