"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    Building2,
    Home,
    Factory,
    CheckCircle,
    Clock,
    TrendingUp,
    MapPin,
    Zap,
    Award,
    ArrowRight
} from "lucide-react";

interface Project {
    id: string;
    title: string;
    client: string;
    type: "Commercial" | "Residential" | "Industrial";
    location: string;
    capacity: string;
    status: "working" | "completed";
    description: string;
    features: string[];
    startDate: string;
    completionDate?: string;
    image: string;
    achievements?: string[];
    progress?: number;
}

const typeColors = {
    Commercial: "border border-white/20 bg-white/10 text-yellow-200",
    Residential: "border border-white/20 bg-white/10 text-emerald-200",
    Industrial: "border border-white/20 bg-white/10 text-sky-200"
};

const typeIcons = {
    Commercial: Building2,
    Residential: Home,
    Industrial: Factory
};

export default function ProjectsSection() {
    const [filter, setFilter] = useState<"all" | "working" | "completed">("all");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/content/projects');
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    const workingProjects = projects.filter(p => p.status === "working");
    const completedProjects = projects.filter(p => p.status === "completed");
    const totalProjects = projects.length;

    const filteredWorking = selectedType === "all"
        ? workingProjects
        : workingProjects.filter(p => p.type === selectedType);

    const filteredCompleted = selectedType === "all"
        ? completedProjects
        : completedProjects.filter(p => p.type === selectedType);

    const { scrollYProgress } = useScroll();
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

    const projectTypes = ["all", "Commercial", "Residential", "Industrial"];

    if (loading) {
        return (
            <section className="liquid-section relative min-h-screen text-white">
                <div className="text-center py-20">
                    <div className="text-cyan-400 animate-pulse">Loading projects...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="liquid-section relative min-h-screen text-white">
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Header with Dynamic Scroll Effect */}
                <motion.div
                    style={{ opacity: headerOpacity, scale: headerScale }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="liquid-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                    >
                        Our Solar Project Waves
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="liquid-subheading text-lg md:text-xl max-w-3xl mx-auto"
                    >
                        Transforming skylines and skylights with immersive solar installations that blend water-like fluidity with sun-powered brilliance.
                    </motion.p>
                </motion.div>

                {/* Dynamic Stats Section */}
                <motion.div
                    ref={statsRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-12"
                >
                    {[
                        { label: "Total Projects", value: totalProjects, icon: Award },
                        { label: "In Progress", value: workingProjects.length, icon: Clock },
                        { label: "Completed", value: completedProjects.length, icon: CheckCircle },
                        { label: "Total Capacity", value: "30+ MW", icon: Zap }
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: idx * 0.1, type: "spring" }}
                                className="liquid-card p-6 text-center cursor-pointer"
                            >
                                <Icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.35)]" />
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-cyan-100/75">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 flex flex-wrap justify-center gap-3"
                >
                    <button
                        onClick={() => setFilter("all")}
                        className={`rounded-full px-6 py-2 font-semibold transition-all ${
                            filter === "all"
                                ? "bg-gradient-to-r from-yellow-400 via-emerald-400 to-sky-500 text-slate-900 shadow-xl"
                                : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                        }`}
                    >
                        All Projects ({totalProjects})
                    </button>
                    <button
                        onClick={() => setFilter("working")}
                        className={`flex items-center gap-2 rounded-full px-6 py-2 font-semibold transition-all ${
                            filter === "working"
                                ? "bg-gradient-to-r from-yellow-400 via-emerald-400 to-sky-500 text-slate-900 shadow-xl"
                                : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                        }`}
                    >
                        <Clock className="w-4 h-4" />
                        In Progress ({workingProjects.length})
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={`flex items-center gap-2 rounded-full px-6 py-2 font-semibold transition-all ${
                            filter === "completed"
                                ? "bg-gradient-to-r from-yellow-400 via-emerald-400 to-sky-500 text-slate-900 shadow-xl"
                                : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                        }`}
                    >
                        <CheckCircle className="w-4 h-4" />
                        Completed ({completedProjects.length})
                    </button>
                </motion.div>

                {/* Type Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12 flex flex-wrap justify-center gap-2"
                >
                    {projectTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                selectedType === type
                                    ? "bg-white/20 text-white shadow-lg"
                                    : "border border-white/10 text-white/70 hover:bg-white/10"
                            }`}
                        >
                            {type === "all" ? "All Types" : type}
                        </button>
                    ))}
                </motion.div>

                {/* Currently Working Section */}
                {(filter === "all" || filter === "working") && (
                    <ProjectSection
                        title="Currently Working Projects"
                        projects={filteredWorking}
                        status="working"
                        icon={Clock}
                    />
                )}

                {/* Completed Projects Section */}
                {(filter === "all" || filter === "completed") && (
                    <ProjectSection
                        title="Completed Projects"
                        projects={filteredCompleted}
                        status="completed"
                        icon={CheckCircle}
                    />
                )}

                {/* Empty State */}
                {((filter === "working" && filteredWorking.length === 0) ||
                    (filter === "completed" && filteredCompleted.length === 0)) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-cyan-100/70">No projects found with the selected filters.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

interface ProjectSectionProps {
    title: string;
    projects: Project[];
    status: "working" | "completed";
    icon: React.ComponentType<{ className?: string }>;
}

function ProjectSection({ title, projects, status, icon: Icon }: ProjectSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    if (projects.length === 0) return null;

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-20 space-y-8"
        >
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
            >
                <div className="rounded-2xl bg-gradient-to-br from-yellow-400 via-emerald-400 to-sky-500 p-3 shadow-xl">
                    <Icon className="h-8 w-8 text-slate-900" />
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
                    <p className="text-sm text-cyan-100/80 mt-1">
                        {projects.length} {projects.length === 1 ? "project" : "projects"}
                    </p>
                </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} status={status} />
                ))}
            </div>
        </motion.div>
    );
}

function ProjectCard({ project, index, status }: { project: Project; index: number; status: "working" | "completed" }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });

    const TypeIcon = typeIcons[project.type];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="liquid-card overflow-hidden group"
        >
            <div className="relative h-48 md:h-56 overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.08 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-200">
                        {status === "working" ? "In Progress" : "Completed"}
                    </span>
                </div>
                <div className="absolute top-4 left-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColors[project.type]}`}>
                        {project.type}
                    </span>
                </div>
            </div>

            <div className="relative z-10 space-y-4 p-6 text-cyan-100/85">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-200 transition-colors">
                        {project.title}
                    </h3>
                    <TypeIcon className="h-5 w-5 text-cyan-100/70" />
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-yellow-200" />
                        <span className="font-semibold text-white/90">Client:</span>
                        <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sky-300" />
                        <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-emerald-300" />
                        <span className="font-semibold text-white/90">Capacity:</span>
                        <span>{project.capacity}</span>
                    </div>
                </div>

                <p className="line-clamp-3 text-sm leading-relaxed text-cyan-100/80">
                    {project.description}
                </p>

                {project.features && project.features.length > 0 && (
                    <div className="space-y-2 text-xs">
                        <h4 className="font-semibold text-white/90">Key Features:</h4>
                        <ul className="space-y-1">
                            {project.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle className="mt-0.5 h-3 w-3 text-emerald-300" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="border-t border-white/10 pt-4 text-xs text-cyan-100/70">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-white/80">Started:</span>
                        <span>{project.startDate}</span>
                    </div>
                    {project.completionDate && (
                        <div className="mt-1 flex items-center justify-between">
                            <span className="font-semibold text-white/80">Completed:</span>
                            <span>{project.completionDate}</span>
                        </div>
                    )}
                </div>

                {project.achievements && project.achievements.length > 0 && (
                    <div className="border-t border-white/10 pt-4">
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/80">
                            <TrendingUp className="h-3 w-3 text-yellow-200" />
                            Achievements
                        </div>
                        <ul className="space-y-1 text-xs text-cyan-100/75">
                            {project.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="mt-0.5 h-1 w-1 rounded-full bg-yellow-200" />
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
