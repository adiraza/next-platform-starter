// Initialize default data from existing components
import { saveServices, saveProjects, saveTeamMembers, saveHomeContent, saveAboutContent } from './dataStorage';
import type { Service, Project, TeamMember, HomeContent, AboutContent } from './data';

export function initializeDefaultData() {
  // Initialize Services
  const defaultServices: Service[] = [
    {
      id: 'commercial',
      title: 'Commercial Solar Plants',
      shortDesc: 'End-to-end solar installations for large businesses.',
      description: 'Transform your business operations with our comprehensive commercial solar solutions. We design, install, and maintain large-scale solar power systems that significantly reduce your electricity costs while contributing to your sustainability goals.',
      features: [
        'Custom-designed systems for your facility',
        'Grid-tied and off-grid solutions available',
        'Advanced monitoring and analytics',
        'Scalable installations from 100kW to 10MW+',
      ],
      benefits: [
        'Reduce electricity bills by up to 90%',
        'Protect against rising energy costs',
        'Improve your company\'s sustainability profile',
        'Eligible for tax incentives and rebates',
      ],
      stats: [
        { label: 'Average ROI', value: '5-7 years' },
        { label: 'Energy Savings', value: 'Up to 90%' },
        { label: 'CO2 Reduction', value: '1000+ tons/year' },
        { label: 'Warranty', value: '25 years' },
      ],
      process: [
        {
          step: 1,
          title: 'Site Assessment & Consultation',
          description: 'Our expert team conducts a thorough site evaluation.',
        },
        {
          step: 2,
          title: 'Custom System Design',
          description: 'We create a detailed engineering design tailored to your needs.',
        },
      ],
    },
    {
      id: 'residential',
      title: 'Residential Rooftop Solutions',
      shortDesc: 'Affordable rooftop systems for sustainable homes.',
      description: 'Make your home energy-independent with our residential solar rooftop solutions.',
      features: [
        'Tailored system sizing for your home',
        'Premium solar panels with 25-year warranty',
        'Smart inverter technology',
        'Mobile app for real-time monitoring',
      ],
      benefits: [
        'Save thousands on electricity bills',
        'Increase home value by 3-4%',
        'Protect against energy price hikes',
        'Reduce carbon footprint significantly',
      ],
      stats: [
        { label: 'Payback Period', value: '4-6 years' },
        { label: 'Monthly Savings', value: '₹3,000-15,000' },
        { label: 'System Lifespan', value: '25+ years' },
        { label: 'Warranty Coverage', value: '25 years' },
      ],
      process: [
        {
          step: 1,
          title: 'Free Home Assessment',
          description: 'We schedule a convenient time to visit your home.',
        },
        {
          step: 2,
          title: 'Customized Proposal',
          description: 'We provide a detailed proposal with system recommendations.',
        },
      ],
    },
  ];

  // Initialize Projects
  const defaultProjects: Project[] = [
    {
      id: 'proj-1',
      title: 'Tata Steel Solar Power Plant',
      client: 'Tata Steel Limited',
      type: 'Industrial',
      location: 'Jamshedpur, Jharkhand',
      capacity: '5 MW',
      status: 'working',
      description: 'A large-scale industrial solar power plant designed to meet 40% of the facility\'s energy requirements.',
      features: [
        'Advanced monitoring dashboard',
        'Battery storage system',
        'Grid-tied configuration',
        'Automated cleaning system',
      ],
      startDate: 'January 2024',
      image: '/image/Image1.jpg',
      progress: 65,
    },
    {
      id: 'proj-2',
      title: 'GreenTech Corporate Campus',
      client: 'GreenTech Solutions Pvt. Ltd.',
      type: 'Commercial',
      location: 'Gurgaon, Haryana',
      capacity: '2.5 MW',
      status: 'working',
      description: 'Comprehensive solar solution for a modern corporate campus.',
      features: [
        'Rooftop + ground mount',
        'Smart energy management',
        'Net metering enabled',
        'Real-time analytics',
      ],
      startDate: 'March 2024',
      image: '/image/Image2.jpg',
      progress: 45,
    },
  ];

  // Initialize Team Members
  const defaultTeam: TeamMember[] = [
    {
      id: 'ceo-1',
      name: 'Rajesh Kumar',
      designation: 'Chief Executive Officer',
      department: 'Executive',
      level: 'ceo',
      photo: '/image/Image1.jpg',
      email: 'rajesh.kumar@excelenergy.in',
      phone: '+91 9876543210',
      bio: 'Visionary leader with 20+ years of experience in renewable energy sector.',
      experience: '20+ Years',
      achievements: [
        'Industry Leader of the Year 2023',
        'Led 500+ successful projects',
        'Renewable Energy Expert',
      ],
    },
    {
      id: 'dir-1',
      name: 'Priya Sharma',
      designation: 'Director of Operations',
      department: 'Operations',
      level: 'director',
      photo: '/image/Image2.jpg',
      email: 'priya.sharma@excelenergy.in',
      phone: '+91 9876543211',
      bio: 'Operations expert ensuring seamless project execution.',
      experience: '15+ Years',
    },
  ];

  // Initialize Home Content
  const defaultHome: HomeContent = {
    hero: {
      badge: 'Aqua Solar',
      title: 'Dive into the Future of Clean Solar Energy',
      description: 'Fluid design. Powerful technology. Excel Energy delivers seamless solar ecosystems that ripple out cleaner, smarter power for communities across India.',
      ctaPrimary: { text: 'Explore Liquid Services', link: '/services' },
      ctaSecondary: { text: 'Start a Flow Consultation', link: '/contact' },
    },
    stats: [
      { icon: 'Zap', value: '30+ MW', label: 'Total Capacity Installed' },
      { icon: 'Users', value: '200+', label: 'Happy Clients' },
      { icon: 'Award', value: '10+', label: 'Years Experience' },
      { icon: 'TrendingUp', value: '95%', label: 'Customer Satisfaction' },
    ],
    features: [
      { icon: 'Sun', title: 'Solar Expertise', desc: 'Years of experience in solar energy solutions' },
      { icon: 'CheckCircle', title: 'Quality Assured', desc: 'ISO certified installations and maintenance' },
      { icon: 'Award', title: 'Award Winning', desc: 'Recognized for excellence in renewable energy' },
      { icon: 'TrendingUp', title: 'Growing Fast', desc: 'Expanding across India with innovative solutions' },
    ],
  };

  // Initialize About Content
  const defaultAbout: AboutContent = {
    mission: 'Flowing toward a decarbonized future by deploying hyper-efficient solar systems that empower communities, elevate businesses, and preserve the planet\'s delicate balance.',
    vision: 'To be India\'s leading solar energy solutions provider, transforming how businesses and communities harness clean energy.',
    goal: 'Deliver 100 MW+ of liquid solar capacity by 2030 while delivering premium experiences, sustainable outcomes, and constant innovation for every client we serve.',
    milestones: [
      '200+ solar orchestrations completed nationwide',
      'Ranked Top 10 Green Energy Innovators (2023)',
      'ISO-certified excellence & audit-ready operations',
      'Strategic alliances with major industrial & government leaders',
    ],
    contactInfo: {
      address: 'Solar Heights, Sector 62, Noida, UP, India',
      phone: '+91 9876543210',
      email: 'info@excelenergy.in',
    },
    locations: [
      { id: '1', name: 'Delhi', address: 'Delhi, India', latitude: 28.6139, longitude: 77.2090 },
      { id: '2', name: 'Mumbai', address: 'Mumbai, Maharashtra, India', latitude: 19.0760, longitude: 72.8777 },
      { id: '3', name: 'Jaipur', address: 'Jaipur, Rajasthan, India', latitude: 26.9124, longitude: 75.7873 },
      { id: '4', name: 'Bengaluru', address: 'Bengaluru, Karnataka, India', latitude: 12.9716, longitude: 77.5946 }
    ],
  };

  // Only save if data doesn't exist
  const { getServices, getProjects, getTeamMembers, getHomeContent, getAboutContent } = require('./dataStorage');
  
  const existingServices = getServices();
  if (existingServices.length === 0) {
    saveServices(defaultServices);
  }

  const existingProjects = getProjects();
  if (existingProjects.length === 0) {
    saveProjects(defaultProjects);
  }

  const existingTeam = getTeamMembers();
  if (existingTeam.length === 0) {
    saveTeamMembers(defaultTeam);
  }

  // Always initialize home and about (they have defaults in dataStorage)
  const existingHome = getHomeContent();
  if (!existingHome.hero.title) {
    saveHomeContent(defaultHome);
  }

  const existingAbout = getAboutContent();
  if (!existingAbout.mission) {
    saveAboutContent(defaultAbout);
  }
}

