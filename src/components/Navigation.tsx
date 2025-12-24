import { useState, useEffect } from 'react';
import { TrendingUp, Menu, X, ArrowRight } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/62895612344661?text=Halo%20GoldThrusher,%20saya%20tertarik%20untuk%20menggunakan%20bot%20trading%20emas%20MT5.";

const menuItems = [
    { label: 'Fitur', id: 'features' },
    { label: 'Hasil', id: 'results' },
    { label: 'Harga', id: 'pricing' },
    { label: 'FAQ', id: 'faq' }
];

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={scrollToTop}>
                        <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-gold/20 group-hover:rotate-[15deg] transition-transform duration-500">
                            <TrendingUp className="text-white w-6 h-6" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight hidden sm:block text-[#1A1A1A]">
                            GOLD<span className="text-[#D4AF37]">THRUSHER</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 font-bold text-xs uppercase tracking-wider">
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => scrollToSection(e, item.id)}
                                className="relative hover:text-[#D4AF37] transition-colors group py-1"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-500 group-hover:w-full"></span>
                            </a>
                        ))}
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-shine bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#D4AF37] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
                        >
                            Mulai Sekarang
                        </a>
                    </div>

                    <button className="md:hidden p-2 text-[#1A1A1A]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[500px] py-8 shadow-2xl opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                <div className="flex flex-col gap-3 px-6">
                    {menuItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className="py-4 px-6 rounded-2xl hover:bg-gray-50 font-bold capitalize text-xl text-[#1A1A1A] flex justify-between items-center group transition-all"
                        >
                            {item.label}
                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                        </a>
                    ))}
                    <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#D4AF37] text-white py-5 mt-4 rounded-2xl font-bold shadow-xl shadow-gold/30 text-center text-lg active:scale-[0.98] transition-transform"
                    >
                        Mulai Sekarang
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
