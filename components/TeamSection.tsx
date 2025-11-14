"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
    Linkedin,
    Mail,
    Phone,
    Award,
    Briefcase,
    Users,
    Crown,
    Shield
} from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    designation: string;
    department: string;
    level: "ceo" | "director" | "manager" | "employee";
    photo: string;
    email: string;
    phone?: string;
    linkedin?: string;
    bio: string;
    experience: string;
    achievements?: string[];
}

const levelConfig = {
    ceo: {
        icon: Crown,
        gradient: "from-yellow-400 via-amber-300 to-emerald-400",
    },
    director: {
        icon: Shield,
        gradient: "from-sky-400 via-blue-400 to-indigo-500",
    },
    manager: {
        icon: Briefcase,
        gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    },
    employee: {
        icon: Users,
        gradient: "from-purple-400 via-violet-400 to-sky-400",
    },
};

export default function TeamSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/content/team', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error(`Failed to fetch team members: ${res.status}`);
            }
            const data = await res.json();
            // Ensure data is an array
            if (Array.isArray(data)) {
                console.log('TeamSection: Fetched', data.length, 'team members', data);
                setMembers(data);
            } else {
                console.error('TeamSection: Invalid data format, expected array:', data);
                setMembers([]);
            }
        } catch (error) {
            console.error('TeamSection: Error fetching team members:', error);
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const ceo = members.find((m) => m.level === "ceo");
    const directors = members.filter((m) => m.level === "director");
    const managers = members.filter((m) => m.level === "manager");
    const employees = members.filter((m) => m.level === "employee");

    if (loading) {
        return (
            <section className="liquid-section relative py-24 px-4 md:px-8 text-white">
                <div className="text-center">
                    <div className="text-cyan-400 animate-pulse">Loading team...</div>
                </div>
            </section>
        );
    }

    // Show all members if no specific level sections, or show by level
    const hasLevelSections = ceo || directors.length > 0 || managers.length > 0 || employees.length > 0;

    return (
        <section ref={ref} className="liquid-section relative py-24 px-4 md:px-8 text-white" style={{ position: 'relative', zIndex: 1 }}>
            <div className="relative max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 50 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center space-y-4"
                    style={{ position: 'relative', zIndex: 50 }}
                >
                    <span className="liquid-badge">Solar Collective</span>
                    <h1 className="liquid-heading text-4xl md:text-5xl lg:text-6xl font-bold">
                        Our Illuminated Team
                    </h1>
                    <p className="liquid-subheading text-lg md:text-xl max-w-3xl mx-auto">
                        Meet the visionaries and engineers who orchestrate Axel Energy's liquid solar experiences across India.
                    </p>
                </motion.div>

                {/* CEO Section */}
                {ceo && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-20"
                        style={{ position: 'relative', zIndex: 50 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3" style={{ position: 'relative', zIndex: 51 }}>
                            <Crown className="w-8 h-8 text-yellow-300" />
                            Leadership
                        </h2>
                        <div className="flex justify-center" style={{ position: 'relative', zIndex: 51 }}>
                            <TeamMemberCard member={ceo} />
                        </div>
                    </motion.div>
                )}

                {/* Directors Section */}
                {directors.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-20"
                        style={{ position: 'relative', zIndex: 50 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3" style={{ position: 'relative', zIndex: 51 }}>
                            <Shield className="w-8 h-8 text-sky-300" />
                            Directors
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ position: 'relative', zIndex: 51 }}>
                            {directors.map((director, idx) => (
                                <TeamMemberCard key={director.id} member={director} index={idx} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Managers Section */}
                {managers.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-20"
                        style={{ position: 'relative', zIndex: 50 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3" style={{ position: 'relative', zIndex: 51 }}>
                            <Briefcase className="w-8 h-8 text-emerald-300" />
                            Management Team
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ position: 'relative', zIndex: 51 }}>
                            {managers.map((manager, idx) => (
                                <TeamMemberCard key={manager.id} member={manager} index={idx} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Employees Section */}
                {employees.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        style={{ position: 'relative', zIndex: 50 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3" style={{ position: 'relative', zIndex: 51 }}>
                            <Users className="w-8 h-8 text-purple-300" />
                            Our Team
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" style={{ position: 'relative', zIndex: 51 }}>
                            {employees.map((employee, idx) => (
                                <TeamMemberCard key={employee.id} member={employee} index={idx} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* If no level-based sections but members exist, show all */}
                {!hasLevelSections && members.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ position: 'relative', zIndex: 50 }}
                    >
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style={{ position: 'relative', zIndex: 51 }}>
                            {members.map((member, idx) => (
                                <TeamMemberCard key={member.id} member={member} index={idx} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {members.length === 0 && !loading && (
                    <div className="text-center py-20" style={{ position: 'relative', zIndex: 50 }}>
                        <p className="text-cyan-200/70 text-lg">No team members available yet.</p>
                        <p className="text-cyan-200/50 text-sm mt-2">Add team members from the admin panel.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

function TeamMemberCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });

    const config = levelConfig[member.level] || levelConfig.employee;
    const LevelIcon = config.icon;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="liquid-card w-full max-w-sm mx-auto overflow-hidden group relative"
            style={{ position: 'relative', zIndex: 100, visibility: 'visible' }}
        >
            <div className="relative h-64 overflow-hidden bg-slate-800">
                {member.photo ? (
                    <motion.img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                const placeholder = document.createElement('div');
                                placeholder.className = 'h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900';
                                placeholder.innerHTML = `
                                    <div class="text-center">
                                        <div class="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center">
                                            <svg class="w-10 h-10 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                        </div>
                                        <p class="text-xs text-cyan-200/70">${member.name.split(' ').map(n => n[0]).join('').toUpperCase()}</p>
                                    </div>
                                `;
                                parent.appendChild(placeholder);
                            }
                        }}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                        <div className="text-center">
                            <div className={`w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                                <svg className="w-10 h-10 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <p className="text-xs text-cyan-200/70">{member.name.split(' ').map(n => n[0]).join('').toUpperCase()}</p>
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className={`absolute top-4 right-4 rounded-full bg-gradient-to-br ${config.gradient} p-2 shadow-lg`}>
                    <LevelIcon className="h-5 w-5 text-slate-900" />
                </div>
            </div>

            <div className="relative space-y-4 p-6 text-cyan-100/85" style={{ position: 'relative', zIndex: 101 }}>
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-sm font-semibold text-yellow-200">{member.designation}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">{member.department}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-cyan-100/70">
                    <Award className="h-4 w-4 text-yellow-200" />
                    <span>{member.experience}</span>
                </div>

                <p className="text-sm leading-relaxed text-cyan-100/80 line-clamp-4">{member.bio}</p>

                {member.achievements && member.achievements.length > 0 && (
                    <div className="border-t border-white/10 pt-4">
                        <ul className="space-y-1 text-xs text-cyan-100/75">
                            {member.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="mt-0.5 h-1 w-1 rounded-full bg-yellow-200" />
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="border-t border-white/10 pt-4 space-y-2 text-sm text-cyan-100/80">
                    <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 transition hover:text-yellow-200"
                    >
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{member.email}</span>
                    </a>
                    {member.phone && (
                        <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 transition hover:text-yellow-200"
                        >
                            <Phone className="h-4 w-4" />
                            <span>{member.phone}</span>
                        </a>
                    )}
                    {member.linkedin && (
                        <a
                            href={`https://${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition hover:text-yellow-200"
                        >
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
