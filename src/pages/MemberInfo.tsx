import { DashboardLayout } from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { Instagram, Music2 } from "lucide-react";

interface Member {
    id: number;
    name: string;
    photo: string;
    quote: string;
    description: string;
    initials: string;
}

const members: Member[] = [
    {
        id: 1,
        name: "Nathanael Syiar Damaiputra",
        photo: "/image/prof_1.jpg",
        quote: "It's not about how much you give, but how far you're willing to go for change. That's beyond limits.",
        description: "Ketua Kelompok.",
        initials: "NSD"
    },
    {
        id: 2,
        name: "Nova Febriani",
        photo: "/image/prof_2.jpg",
        quote: "Sudut kota - pegunungan - pantai di Pacitan menjadi saksi cerita baru di tahun ini yang kini menjadi memori indah. Perjalanan akan berkesan apabila dirasakan dengan hati yang sukacita. Meskipun ini singkat tapi sangat membekas. Terimakasih, hadirnya kalian kelompok 55 mengisi ruang kosong hati ini & terbanglah setinggi mungkin raih cita - cita yang kalian harapkan. Doaku selalu mengiringi kalian semua!!",
        description: "Humas Kelompok.",
        initials: "NF"
    },
    {
        id: 3,
        name: "I Made Wira Adi Sentana",
        photo: "/image/prof_3.jpg",
        quote: "Jangan pernah samakan kemampuanmu dengan orang lain, sebab tak semua orang mampu melakukan apa yang kamu lakukan.",
        description: "Sekretaris Kelompok.",
        initials: "IMWAS"
    },
    {
        id: 4,
        name: "Juan Fortunasua Helka",
        photo: "/image/prof_4.jpg",
        quote: "you will never know the value of a moment, till it becomes a memory.",
        description: "Bendahara Kelompok.",
        initials: "JFH"
    },
    {
        id: 5,
        name: "Ida Ayu Nyoman Handaru Dyah Komala",
        photo: "/image/prof_5.jpg",
        quote: "bukan tentang sejauh apa kita pergi, tapi seberapa dalam kita terhubung. KKN bukan sekadar tugas ini tentang tumbuh, berbagi, dan merasa hidup di tempat yang sederhana.",
        description: "Sekretaris Kelompok.",
        initials: "IANHDK"
    },
    {
        id: 6,
        name: "Elsava Vidiarama Puteri Permata",
        photo: "/image/prof_6.jpg",
        quote: "The smile may be sweet, but the content of our conversation is like stand-up comedy.",
        description: "Desdok Kelompok.",
        initials: "EVPP"
    },
    {
        id: 7,
        name: "Christopher Bernard Suryanto",
        photo: "/image/prof_7.jpg",
        quote: "I thought leveling up only happened in games, until my friends invited me on real-world adventures, proving that the best experience points are collected not from a screen, but from the journeys we take and the laughter we share.",
        description: "Perkab Kelompok.",
        initials: "CBS"
    },
    {
        id: 8,
        name: "Yehezkiel Ardy Herwangga",
        photo: "/image/prof_8.jpg",
        quote: "Syukuri apa yang ada dan terima apa adanya dengan hidup penuh rasa syukur serta menerima semuanya dengan penuh rasa lapang dada, karena bahagiaan yang sejati terletak pada kesederhanaan.",
        description: "Desdok Kelompok.",
        initials: "YAH"
    }
];

// Sub-component for a single member slide
const MemberSlide: React.FC<{ member: Member; isVisible: boolean }> = ({ member, isVisible }) => (
    <div
        className={`h-[70vh] flex transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
    >
        {/* Left side - Photo */}
        <div className="w-1/4 relative overflow-hidden">
            <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
            />
        </div>

        {/* Right side - Content with dark background */}
        <div className="w-3/4 bg-slate-800 text-white flex items-center p-16">
            <div className="space-y-4 max-w-3xl animate-fade-in">
                {/* Name as main title */}
                <h1 className="text-5xl font-bold font-playfair leading-tight">
                    {member.name}
                </h1>

                {/* Quote */}
                <blockquote className="text-lg font-playfair italic text-slate-300 leading-relaxed">
                    "{member.quote}"
                </blockquote>

                {/* Description */}
                <div className="space-y-4">
                    <p className="text-base leading-relaxed text-slate-400 line-clamp-4">
                        {member.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default function MemberInfo() {
    const [currentMember, setCurrentMember] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMember((prev) => (prev + 1) % members.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent py-1">
                        Anggota Kelompok
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Perkenalan anggota kelompok
                    </p>
                </div>

                {/* Member Slideshow Section - Now only contains the slides */}
                <div className="relative h-[70vh] rounded-lg overflow-hidden shadow-lg">
                    {members.map((member, index) => (
                        <MemberSlide
                            key={member.id}
                            member={member}
                            isVisible={index === currentMember}
                        />
                    ))}
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center space-x-2">
                    {members.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                                index === currentMember ? 'bg-primary' : 'bg-gray-400'
                            }`}
                            onClick={() => setCurrentMember(index)}
                        />
                    ))}
                </div>

                {/* Social Media Footer */}
                <div className="text-center pt-2">
                    <h3 className="text-xl font-semibold mb-4">Ikuti Akun Sosial Media Kami</h3>
                    <div className="flex justify-center space-x-8">
                        <a
                            href="https://www.instagram.com/kkn.ukdw_dusun.sumur_kel_55?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            <Instagram className="h-6 w-6" />
                            <span className="font-medium">@kkn 55</span>
                        </a>
                        <a
                            href="https://www.tiktok.com/@kkndusunsumurklp55ukdw?_t=ZS-8wal1jC36LQ&_r=1"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            <Music2 className="h-6 w-6" />
                            <span className="font-medium">@kkn 55</span>
                        </a>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
