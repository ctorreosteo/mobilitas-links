import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Linkedin, Instagram, Star, Upload, MessageCircle, User, Baby, Play, Facebook, Share2, Copy, Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import './App.css';

// Custom TikTok Icon Component
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: React.ReactNode;
  category: 'studio' | 'social';
}

const studioLinks: LinkItem[] = [
  {
    id: 'new-patients',
    title: 'Coupon esclusivo per nuovi clienti',
    url: 'https://www.osteo-touch.it/pages/peyron54',
    icon: <User className="w-5 h-5" />,
    category: 'studio'
  },
  {
    id: 'pregnant-women',
    title: 'Coupon per Donne in Gravidanza',
    url: 'https://www.osteo-touch.it/pages/gravidanza',
    icon: <Baby className="w-5 h-5" />,
    category: 'studio'
  },
  {
    id: 'website',
    title: 'Sito web ufficiale',
    url: 'https://www.osteo-touch.it/',
    icon: <Globe className="w-5 h-5" />,
    category: 'studio'
  }
];

const socialLinks: LinkItem[] = [
  {
    id: 'tiktok',
    title: 'TikTok',
    url: 'https://www.tiktok.com/@osteotouch',
    icon: <TikTokIcon className="w-5 h-5" />,
    category: 'social'
  },
  {
    id: 'youtube',
    title: 'Youtube',
    url: 'https://www.youtube.com/@osteotouch',
    icon: <Play className="w-5 h-5" />,
    category: 'social'
  },
  {
    id: 'instagram',
    title: 'Instagram',
    url: 'https://www.instagram.com/studio_osteotouch',
    icon: <Instagram className="w-5 h-5" />,
    category: 'social'
  },
  {
    id: 'facebook',
    title: 'Facebook',
    url: 'https://www.facebook.com/people/OsteoTouch-Studio-Osteopatico/61557857444482/',
    icon: <Facebook className="w-5 h-5" />,
    category: 'social'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/company/103669665/admin/dashboard/',
    icon: <Linkedin className="w-5 h-5" />,
    category: 'social'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const menuVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: -10
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: -10,
    transition: {
      duration: 0.15,
      ease: "easeIn" as const
    }
  }
};

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  position: { x: number; y: number };
  onCopyConfirm: () => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ isOpen, onClose, url, title, position, onCopyConfirm }) => {
  const shareOptions = [
    {
      name: 'Copia Link',
      icon: <Copy className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText(url);
        onCopyConfirm();
        onClose();
      }
    },
    {
      name: 'Condividi',
      icon: <Share2 className="w-4 h-4" />,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: title,
            url: url
          }).catch((error) => {
            console.log('Errore durante la condivisione:', error);
          });
        } else {
          // Fallback per browser che non supportano Web Share API
          navigator.clipboard.writeText(url);
        }
        onClose();
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px]"
            style={{
              left: position.x,
              top: position.y
            }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {shareOptions.map((option, index) => (
              <button
                key={index}
                className="w-full px-4 py-3 text-left text-brand-blue hover:bg-brand-green/10 flex items-center space-x-3 transition-colors duration-200"
                onClick={option.action}
              >
                <div className="text-brand-blue">
                  {option.icon}
                </div>
                <span className="text-sm font-medium">{option.name}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [shareMenu, setShareMenu] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    url: '',
    title: '',
    position: { x: 0, y: 0 }
  });

  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareClick = (event: React.MouseEvent, url: string, title: string) => {
    event.stopPropagation();
    
    const menuWidth = 200; // Larghezza approssimativa del menu
    const menuHeight = 120; // Altezza approssimativa del menu
    
    // Usa le coordinate del mouse per un posizionamento preciso
    let x = event.clientX - (menuWidth / 2);
    let y = event.clientY + 10; // 10px sotto il punto cliccato
    
    // Assicurati che il menu non esca dallo schermo a sinistra
    if (x < 10) {
      x = 10;
    }
    
    // Assicurati che il menu non esca dallo schermo a destra
    if (x + menuWidth > window.innerWidth - 10) {
      x = window.innerWidth - menuWidth - 10;
    }
    
    // Se il menu esce dallo schermo in basso, posizionalo sopra il punto cliccato
    if (y + menuHeight > window.innerHeight - 10) {
      y = event.clientY - menuHeight - 10;
    }
    
    setShareMenu({
      isOpen: true,
      url,
      title,
      position: { x, y }
    });
  };

  const closeShareMenu = () => {
    setShareMenu(prev => ({ ...prev, isOpen: false }));
  };

  const showCopyConfirmation = () => {
    setShowCopyToast(true);
    setTimeout(() => {
      setShowCopyToast(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-blue flex flex-col font-montserrat">
      {/* Top Bar */}
      <div className="bg-brand-blue/80 backdrop-blur-sm border-b border-white/10 px-4 py-2 flex justify-between items-center">
        <div></div>
        <button
          className="hover:bg-white/10 rounded transition-colors duration-200 p-1"
          onClick={(e) => handleShareClick(e, window.location.href, 'Studio Mobilitas - Link')}
        >
          <Upload className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="max-w-md w-full relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            variants={itemVariants}
          >
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-6 mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/Logo.png" 
                alt="Studio Mobilitas Logo" 
                className="h-12 w-auto logo-glow"
              />
            </motion.div>
            
            {/* Tagline */}
            <p className="text-white/90 text-sm mb-16">UN TOCCO. UNA TRASFORMAZIONE.</p>
            
            {/* Main Heading */}
            <h2 className="text-2xl font-semibold text-white mb-2 text-left">Il tuo Studio Osteopatico di riferimento</h2>
            
            {/* Subtitle */}
            <p className="text-white/80 text-sm text-left">Una vita libera da dolori e limitazioni, per invecchiare in salute nonostante lo stile di vita moderno esagerato in tutto.</p>
          </motion.div>

          {/* Contacts Section */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-semibold text-lg mb-4 text-left">I Nostri Contatti</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-start space-x-2">
                  <Phone className="w-4 h-4 text-brand-green" />
                  <span className="text-white/90 text-sm">351 819 8457</span>
                </div>
                <div className="flex items-center justify-start space-x-2">
                  <Mail className="w-4 h-4 text-brand-green" />
                  <span className="text-white/90 text-sm">studio@osteotouch.it</span>
                </div>
                <div className="flex items-center justify-start space-x-2">
                  <MapPin className="w-4 h-4 text-brand-green" />
                  <span className="text-white/90 text-sm">Via Peyron 54 (Comodo con la metro)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Actions Section */}


          {/* Studio Links Section */}
          <motion.div
            className="space-y-3 mb-8"
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div
              className="mb-4"
              variants={itemVariants}
            >
              <h3 className="text-white/90 text-base font-medium text-left">Servizi e Informazioni</h3>
            </motion.div>

            {studioLinks.map((link) => (
              <motion.button
                key={link.id}
                className={`w-full p-4 rounded-xl bg-brand-green text-brand-blue font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between relative`}
                onClick={() => handleLinkClick(link.url)}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-brand-blue">
                    {link.icon}
                  </div>
                  <span className="text-brand-blue font-semibold text-sm text-left">{link.title}</span>
                </div>
                <button
                  className="flex space-x-1 p-1 hover:bg-brand-blue/10 rounded transition-colors duration-200"
                  onClick={(e) => handleShareClick(e, link.url, link.title)}
                >
                  <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                  <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                  <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                </button>
              </motion.button>
            ))}

            <motion.button
              className={`w-full p-4 rounded-xl bg-brand-green text-brand-blue font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between relative`}
              onClick={() => handleLinkClick('https://www.google.com/search?q=Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino&stick=H4sIAAAAAAAA_-NgU1IxqEhLNUo1skwztjBMS0m2NLYyqLA0T01NNTQ3SU5MMjBPTElcxGoWXFKakpmv4F9ckppfkFiSmZyvoAvhheSXJmcoBAf5wASA0okKI flFmXn5AE3a9AxhAAAA&hl=it&mat=CXo9HS-cpKcEElYBmzl_pSjKAk19ZjNmiUWNb1lVW4Rrxha9bmGQktuOJIndl5ahaBrVIi0EYe_OIThjlUSv5uUay4jbSfowMvuOp2Pwo4pd9UW4rHzQpGMyOnvtsuDoxg&authuser=0#mpd=~335417687974690170/customers/reviews')}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-brand-blue">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-brand-blue font-semibold text-sm">Leggi le nostre Recensioni Google</span>
              </div>
              <button
                className="flex space-x-1 p-1 hover:bg-brand-blue/10 rounded transition-colors duration-200"
                onClick={(e) => handleShareClick(e, 'https://www.google.com/search?q=Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino&stick=H4sIAAAAAAAA_-NgU1IxqEhLNUo1skwztjBMS0m2NLYyqLA0T01NNTQ3SU5MMjBPTElcxGoWXFKakpmv4F9ckppfkFiSmZyvoAvhheSXJmcoBAf5wASA0okKI flFmXn5AE3a9AxhAAAA&hl=it&mat=CXo9HS-cpKcEElYBmzl_pSjKAk19ZjNmiUWNb1lVW4Rrxha9bmGQktuOJIndl5ahaBrVIi0EYe_OIThjlUSv5uUay4jbSfowMvuOp2Pwo4pd9UW4rHzQpGMyOnvtsuDoxg&authuser=0#mpd=~335417687974690170/customers/reviews', 'Leggi le nostre Recensioni Google')}
              >
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
              </button>
            </motion.button>
          </motion.div>
          <motion.div
            className="space-y-3 mb-8"
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div
              className="mb-4"
              variants={itemVariants}
            >
              <h3 className="text-white/90 text-base font-medium text-left">Contattaci</h3>
            </motion.div>

            {/* Contact Action Links */}
            <motion.button
              className={`w-full p-4 rounded-xl bg-brand-green text-brand-blue font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between relative`}
              onClick={() => handleLinkClick('https://wa.me/393518198457')}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-brand-blue">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-brand-blue font-semibold text-sm">WhatsApp</span>
              </div>
              <button
                className="flex space-x-1 p-1 hover:bg-brand-blue/10 rounded transition-colors duration-200"
                onClick={(e) => handleShareClick(e, 'https://wa.me/393518198457', 'WhatsApp')}
              >
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
              </button>
            </motion.button>

            <motion.button
              className={`w-full p-4 rounded-xl bg-brand-green text-brand-blue font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between relative`}
              onClick={() => handleLinkClick('mailto:studio@osteotouch.it')}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-brand-blue">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-brand-blue font-semibold text-sm">Email</span>
              </div>
              <button
                className="flex space-x-1 p-1 hover:bg-brand-blue/10 rounded transition-colors duration-200"
                onClick={(e) => handleShareClick(e, 'mailto:studio@osteotouch.it', 'Email')}
              >
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
              </button>
            </motion.button>

            <motion.button
              className={`w-full p-4 rounded-xl bg-brand-green text-brand-blue font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between relative`}
              onClick={() => handleLinkClick('https://www.google.com/maps/place/Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m6!3m5!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!16s%2Fg%2F11kqfhtyvd?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D')}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-brand-blue">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-brand-blue font-semibold text-sm">Indicazioni per lo studio</span>
              </div>
              <button
                className="flex space-x-1 p-1 hover:bg-brand-blue/10 rounded transition-colors duration-200"
                onClick={(e) => handleShareClick(e, 'https://www.google.com/maps/place/Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m6!3m5!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!16s%2Fg%2F11kqfhtyvd?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D', 'Indicazioni per lo studio')}
              >
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
              </button>
            </motion.button>



            <motion.button
              className={`w-full p-4 rounded-xl bg-brand-green text-brand-blue font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between relative`}
              onClick={() => handleLinkClick('https://www.google.com/search?q=Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino&stick=H4sIAAAAAAAA_-NgU1IxqEhLNUo1skwztjBMS0m2NLYyqLA0T01NNTQ3SU5MMjBPTElcxGoWXFKakpmv4F9ckppfkFiSmZyvoAvhheSXJmcoBAf5wASA0okKIflFmXn5AE3a9AxhAAAA&hl=it&mat=CXo9HS-cpKcEElYBmzl_pSjKAk19ZjNmiUWNb1lVW4Rrxha9bmGQktuOJIndl5ahaBrVIi0EYe_OIThjlUSv5uUay4jbSfowMvuOp2Pwo4pd9UW4rHzQpGMyOnvtsuDoxg&authuser=0#mpd=~335417687974690170/customers/reviews')}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-brand-blue">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-brand-blue font-semibold text-sm">Scrivi una Recensione Google</span>
              </div>
              <button
                className="flex space-x-1 p-1 hover:bg-brand-blue/10 rounded transition-colors duration-200"
                onClick={(e) => handleShareClick(e, 'https://www.google.com/search?q=Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino&stick=H4sIAAAAAAAA_-NgU1IxqEhLNUo1skwztjBMS0m2NLYyqLA0T01NNTQ3SU5MMjBPTElcxGoWXFKakpmv4F9ckppfkFiSmZyvoAvhheSXJmcoBAf5wASA0okKIflFmXn5AE3a9AxhAAAA&hl=it&mat=CXo9HS-cpKcEElYBmzl_pSjKAk19ZjNmiUWNb1lVW4Rrxha9bmGQktuOJIndl5ahaBrVIi0EYe_OIThjlUSv5uUay4jbSfowMvuOp2Pwo4pd9UW4rHzQpGMyOnvtsuDoxg&authuser=0#mpd=~335417687974690170/customers/reviews', 'Scrivi una Recensione Google')}
              >
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
              </button>
            </motion.button>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            className="space-y-3"
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div
              className="mb-4"
              variants={itemVariants}
            >
              <h3 className="text-white/90 text-base font-medium text-left">Seguici sui Social Media</h3>
            </motion.div>

            {/* Social Links */}
            {socialLinks.map((link) => (
              <motion.button
                key={link.id}
                className={`w-full p-4 rounded-xl bg-brand-green text-brand-blue font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between relative`}
                onClick={() => handleLinkClick(link.url)}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-brand-blue">
                    {link.icon}
                  </div>
                  <span className="text-brand-blue font-semibold text-sm">{link.title}</span>
                </div>
                <button
                  className="flex space-x-1 p-1 hover:bg-brand-blue/10 rounded transition-colors duration-200"
                  onClick={(e) => handleShareClick(e, link.url, link.title)}
                >
                  <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                  <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                  <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                </button>
              </motion.button>
            ))}
          </motion.div>

          {/* Share Menu */}
                  <ShareMenu
          isOpen={shareMenu.isOpen}
          onClose={closeShareMenu}
          url={shareMenu.url}
          title={shareMenu.title}
          position={shareMenu.position}
          onCopyConfirm={showCopyConfirmation}
        />

        {/* Copy Confirmation Toast */}
        <AnimatePresence>
          {showCopyToast && (
            <motion.div
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="bg-brand-green text-brand-blue px-6 py-3 rounded-full shadow-lg border-2 border-brand-blue/20 flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span className="font-medium text-sm">Link copiato negli appunti!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
      </div>

      {/* Final Section - Health Quote */}
      <div className="px-4 py-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-left">
            <div className="mb-6">
              <div className="w-12 h-0.5 bg-brand-green mb-4"></div>
              <blockquote className="text-white/90 text-lg font-light italic leading-relaxed">
                "La salute non è tutto, ma senza salute tutto è niente."
              </blockquote>
              <div className="w-12 h-0.5 bg-brand-green mt-4"></div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-xl">
                Non vediamo l'ora di accoglierti in studio 😁
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Il tuo benessere è la nostra priorità. 
                Iniziamo insieme questo percorso verso una vita più sana e libera.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-brand-blue/80 backdrop-blur-sm border-t border-white/10 px-4 py-3">
        <div className="flex justify-center space-x-4 text-xs text-white/60">
          <button 
            className="hover:text-white/80 transition-colors duration-200"
            onClick={() => handleLinkClick('https://www.iubenda.com/privacy-policy/67925714/cookie-policy')}
          >
            Cookie Preferences
          </button>
          <span>•</span>
          <button 
            className="hover:text-white/80 transition-colors duration-200"
            onClick={() => handleLinkClick('https://www.iubenda.com/privacy-policy/67925714')}
          >
            Privacy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
