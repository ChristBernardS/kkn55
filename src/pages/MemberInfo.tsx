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
        quote: "Community is where life begins and love never ends.",
        description: "Nathanael is a passionate advocate for local empowerment, with over a decade of experience in community development. He has successfully launched several initiatives focused on sustainable living and youth mentorship, believing deeply in the power of collective action to create lasting positive change.",
        initials: "NSD"
    },
    {
        id: 2,
        name: "Nova Febriani",
        photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=600&fit=crop&crop=face",
        quote: "Innovation thrives when diverse minds collaborate.",
        description: "Nova brings a fresh perspective to community engagement through her expertise in digital communication and social media. She specializes in creating vibrant online spaces that connect residents and amplify local voices, fostering a stronger, more informed community.",
        initials: "NF"
    },
    {
        id: 3,
        name: "I Made Wira Adi Sentana",
        photo: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=600&fit=crop&crop=face",
        quote: "Every small act of kindness creates ripples of positive change.",
        description: "Wira is a dedicated volunteer and a true pillar of the community, known for his tireless efforts in organizing local clean-up drives and food donation campaigns. His commitment to humanitarian causes inspires those around him to contribute to a more compassionate society.",
        initials: "IMWAS"
    },
    {
        id: 4,
        name: "Juan Fortunasua Helka",
        photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop&crop=face",
        quote: "Art has the power to transform spaces and touch souls.",
        description: "Juan, a talented graphic designer, enriches our community by visually communicating important messages and events. He transforms ideas into captivating visuals, making information accessible and engaging for all residents, and adding an artistic touch to community initiatives.",
        initials: "JFH"
    },
    {
        id: 5,
        name: "Ida Ayu Nyoman Handaru Dyah Komala",
        photo: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=600&fit=crop&crop=face",
        quote: "Sustainability today ensures a better tomorrow for our children.",
        description: "Ida Ayu is an environmental enthusiast and an active proponent of sustainable practices within the community. She champions eco-friendly initiatives, from organizing recycling programs to educating residents on conservation, striving to create a greener and healthier local environment.",
        initials: "IANHDK"
    },
    {
        id: 6,
        name: "Elsava Vidiarama Puteri Permata",
        photo: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=600&fit=crop&crop=face",
        quote: "Leadership is about empowering others to reach their potential.",
        description: "Elsava is a dynamic leader in the local business community, bringing valuable insights into fostering economic growth and opportunity. She actively mentors aspiring entrepreneurs and works to connect local businesses with community needs, strengthening the local economy.",
        initials: "EVPP"
    },
    {
        id: 7,
        name: "Christopher Bernard Suryanto",
        photo: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=600&fit=crop&fit=crop&face",
        quote: "Building bridges, not walls, creates stronger communities.",
        description: "Christopher is a community liaison, adept at connecting diverse groups and facilitating open dialogue. He is instrumental in organizing town halls and forums, ensuring every voice is heard and contributing to a more inclusive and harmonious community.",
        initials: "CBS"
    },
    {
        id: 8,
        name: "Yehezkiel Ardy Herwangga",
        photo: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=600&fit=crop&crop=face",
        quote: "Our collective strength lies in our individual differences.",
        description: "Yehezkiel is a dedicated volunteer coordinator, tirelessly working to match community needs with willing hands. He inspires countless individuals to give back, fostering a culture of service and making a tangible difference in the lives of many.",
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
        <div className="w-3/4 bg-slate-800 text-white flex items-start p-16"> {/* MODIFIED: items-center to items-start */}
            <div className="space-y-4 max-w-2xl animate-fade-in">
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
                    <p className="text-base leading-relaxed text-slate-200 line-clamp-4">
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Meet Our Team
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Get to know the dedicated individuals who make our team special
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
                    <h3 className="text-xl font-semibold mb-4">Follow Our Social Media</h3>
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