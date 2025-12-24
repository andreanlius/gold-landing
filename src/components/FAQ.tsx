import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';

const faqItems = [
    { q: "Berapa modal minimal?", a: "Kami menyarankan modal minimal $500 untuk manajemen risiko yang sehat sesuai algoritma GoldThrusher." },
    { q: "Platform apa yang digunakan?", a: "GoldThrusher dirancang eksklusif dan hanya berjalan pada MetaTrader 5 (MT5)." },
    { q: "Apakah ada biaya bulanan?", a: "Tidak. Lisensi kami bersifat sekali bayar (one-time payment) untuk akses seumur hidup." },
    { q: "Bagaimana jika saya pemula?", a: "Jangan khawatir. Tim kami akan membimbing Anda melalui setup via AnyDesk sampai bot berjalan di akun Anda." }
];

export const FAQ = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    return (
        <section id="faq" className="py-32 lg:py-56 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <Reveal className="text-center mb-28">
                    <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-[#1A1A1A]">Informasi <span className="text-[#D4AF37]">Detail.</span></h2>
                </Reveal>
                <div className="space-y-6">
                    {faqItems.map((faq, idx) => (
                        <Reveal key={idx} delay={idx * 150} direction="up">
                            <div className={`rounded-[45px] overflow-hidden transition-all duration-700 border ${activeFaq === idx ? 'bg-gray-50 border-[#D4AF37]/40 shadow-2xl' : 'bg-white border-gray-100 hover:border-[#D4AF37]/20 shadow-sm hover:shadow-lg'}`}>
                                <button
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full flex justify-between items-center p-12 text-left group"
                                >
                                    <span className="font-black text-2xl pr-8 group-hover:text-[#D4AF37] transition-colors uppercase tracking-tight">{faq.q}</span>
                                    <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 transition-all duration-700 ${activeFaq === idx ? 'bg-[#D4AF37] text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]'}`}>
                                        <ChevronDown className="w-7 h-7" />
                                    </div>
                                </button>
                                <div className={`px-12 overflow-hidden transition-all duration-700 ease-in-out ${activeFaq === idx ? 'max-h-[300px] pb-12 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-500 text-xl font-bold leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
