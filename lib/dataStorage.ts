// File-based data storage (can be replaced with database later)
import fs from 'fs';
import path from 'path';
import type { 
  HomeContent, AboutContent, Service, Project, TeamMember, Message, Quote, Client, BlogPost, Analytics,
  Stat, WhyChooseUs, Solution, Testimonial, SocialMedia, SEOSettings, SiteSettings
} from './data';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('Created data directory:', DATA_DIR);
  } catch (error) {
    console.error('Failed to create data directory:', error);
  }
}

function getFilePath(fileName: string): string {
  return path.join(DATA_DIR, fileName);
}

function readJsonFile<T>(fileName: string, defaultValue: T): T {
  const filePath = getFilePath(fileName);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8').trim();
      if (!data || data === '{}' || data === '[]') {
        console.log(`File ${fileName} is empty, using default value`);
        return defaultValue;
      }
      const parsed = JSON.parse(data);
      // If file exists but is empty or invalid, return default
      if (parsed === null || parsed === undefined || (typeof parsed === 'object' && Object.keys(parsed).length === 0 && !Array.isArray(parsed) && Array.isArray(defaultValue))) {
        console.log(`File ${fileName} is empty or invalid, using default value`);
        return defaultValue;
      }
      return parsed as T;
    }
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
  }
  return defaultValue;
}

function writeJsonFile<T>(fileName: string, data: T): void {
  const filePath = getFilePath(fileName);
  try {
    // Ensure data directory exists before writing
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Created data directory:', DATA_DIR);
    }
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
    console.log(`✓ Successfully wrote ${fileName} (${jsonData.length} bytes) to ${filePath}`);
  } catch (error) {
    console.error(`✗ Error writing ${fileName} to ${filePath}:`, error);
    throw error;
  }
}

// Home Content
export function getHomeContent(): HomeContent {
  return readJsonFile('home.json', {
    hero: {
      badge: "Aqua Solar",
      title: "Dive into the Future of Clean Solar Energy",
      description: "Fluid design. Powerful technology. Excel Energy delivers seamless solar ecosystems that ripple out cleaner, smarter power for communities across India.",
      ctaPrimary: { text: "Explore Liquid Services", link: "/services" },
      ctaSecondary: { text: "Start a Flow Consultation", link: "/contact" }
    },
    stats: [
      { icon: "Zap", value: "30+ MW", label: "Total Capacity Installed" },
      { icon: "Users", value: "200+", label: "Happy Clients" },
      { icon: "Award", value: "10+", label: "Years Experience" },
      { icon: "TrendingUp", value: "95%", label: "Customer Satisfaction" }
    ],
    features: [
      { icon: "Sun", title: "Solar Expertise", desc: "Years of experience in solar energy solutions" },
      { icon: "CheckCircle", title: "Quality Assured", desc: "ISO certified installations and maintenance" },
      { icon: "Award", title: "Award Winning", desc: "Recognized for excellence in renewable energy" },
      { icon: "TrendingUp", title: "Growing Fast", desc: "Expanding across India with innovative solutions" }
    ]
  });
}

export function saveHomeContent(content: HomeContent): void {
  writeJsonFile('home.json', content);
}

// About Content
export function getAboutContent(): AboutContent {
  return readJsonFile('about.json', {
    mission: "Flowing toward a decarbonized future by deploying hyper-efficient solar systems that empower communities, elevate businesses, and preserve the planet's delicate balance.",
    vision: "To be India's leading solar energy solutions provider, transforming how businesses and communities harness clean energy.",
    goal: "Deliver 100 MW+ of liquid solar capacity by 2030 while delivering premium experiences, sustainable outcomes, and constant innovation for every client we serve.",
    milestones: [
      "200+ solar orchestrations completed nationwide",
      "Ranked Top 10 Green Energy Innovators (2023)",
      "ISO-certified excellence & audit-ready operations",
      "Strategic alliances with major industrial & government leaders"
    ],
    contactInfo: {
      address: "Solar Heights, Sector 62, Noida, UP, India",
      phone: "+91 9876543210",
      email: "info@excelenergy.in"
    },
    locations: [
      { id: '1', name: 'Delhi', address: 'Delhi, India', latitude: 28.6139, longitude: 77.2090 },
      { id: '2', name: 'Mumbai', address: 'Mumbai, Maharashtra, India', latitude: 19.0760, longitude: 72.8777 },
      { id: '3', name: 'Jaipur', address: 'Jaipur, Rajasthan, India', latitude: 26.9124, longitude: 75.7873 },
      { id: '4', name: 'Bengaluru', address: 'Bengaluru, Karnataka, India', latitude: 12.9716, longitude: 77.5946 }
    ]
  });
}

export function saveAboutContent(content: AboutContent): void {
  writeJsonFile('about.json', content);
}

// Stats Section
export function getStats(): Stat[] {
  return readJsonFile('stats.json', [
    { id: '1', icon: 'Zap', value: '30+', suffix: 'MW', label: 'Total Capacity Installed', order: 1 },
    { id: '2', icon: 'Users', value: '200+', label: 'Happy Clients', order: 2 },
    { id: '3', icon: 'Award', value: '10+', suffix: 'Years', label: 'Experience', order: 3 },
    { id: '4', icon: 'TrendingUp', value: '95%', label: 'Customer Satisfaction', order: 4 },
    { id: '5', icon: 'Sun', value: '500+', label: 'Projects Completed', order: 5 },
    { id: '6', icon: 'CheckCircle', value: '24/7', label: 'Support Available', order: 6 },
  ]);
}

export function saveStats(stats: Stat[]): void {
  writeJsonFile('stats.json', stats);
}

// Why Choose Us
export function getWhyChooseUs(): WhyChooseUs[] {
  return readJsonFile('whyChooseUs.json', [
    { id: '1', icon: 'Award', title: 'Award-Winning Quality', description: 'Recognized for excellence in solar installations and customer service', color: 'from-yellow-400 to-yellow-600', order: 1 },
    { id: '2', icon: 'Shield', title: '25-Year Warranty', description: 'Comprehensive warranty coverage on all our solar installations', color: 'from-green-400 to-green-600', order: 2 },
    { id: '3', icon: 'Clock', title: 'Quick Installation', description: 'Fast and efficient installation with minimal disruption to your operations', color: 'from-blue-400 to-blue-600', order: 3 },
    { id: '4', icon: 'Headphones', title: '24/7 Support', description: 'Round-the-clock monitoring and support for all your solar needs', color: 'from-purple-400 to-purple-600', order: 4 },
    { id: '5', icon: 'Zap', title: 'Energy Savings', description: 'Reduce your electricity bills by up to 90% with our efficient systems', color: 'from-orange-400 to-orange-600', order: 5 },
    { id: '6', icon: 'Leaf', title: 'Eco-Friendly', description: 'Contribute to a greener planet with clean, renewable solar energy', color: 'from-emerald-400 to-emerald-600', order: 6 },
  ]);
}

export function saveWhyChooseUs(items: WhyChooseUs[]): void {
  writeJsonFile('whyChooseUs.json', items);
}

// Solutions
export function getSolutions(): Solution[] {
  return readJsonFile('solutions.json', [
    { id: '1', title: 'Commercial Solar Plants', desc: 'End-to-end solar installations for large businesses.', order: 1 },
    { id: '2', title: 'Residential Rooftop Solutions', desc: 'Affordable rooftop systems for sustainable homes.', order: 2 },
    { id: '3', title: 'Maintenance & Monitoring', desc: '24x7 performance monitoring and fault detection.', order: 3 },
  ]);
}

export function saveSolutions(solutions: Solution[]): void {
  writeJsonFile('solutions.json', solutions);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  return readJsonFile('testimonials.json', []);
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  writeJsonFile('testimonials.json', testimonials);
}

export function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'timestamp'>): Testimonial {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
}

export function updateTestimonial(id: string, testimonial: Partial<Testimonial>): boolean {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index === -1) return false;
  testimonials[index] = { ...testimonials[index], ...testimonial };
  saveTestimonials(testimonials);
  return true;
}

export function deleteTestimonial(id: string): boolean {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  if (filtered.length === testimonials.length) return false;
  saveTestimonials(filtered);
  return true;
}

// Social Media
export function getSocialMedia(): SocialMedia {
  return readJsonFile('socialMedia.json', {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    whatsapp: '',
  });
}

export function saveSocialMedia(social: SocialMedia): void {
  writeJsonFile('socialMedia.json', social);
}

// SEO Settings
export function getSEOSettings(): SEOSettings {
  return readJsonFile('seo.json', {
    siteTitle: 'Excel Energy | Solar Solutions',
    siteDescription: 'Powering a greener future with sustainable solar energy systems.',
    keywords: ['solar energy', 'renewable energy', 'solar panels', 'solar installation'],
    ogImage: '',
    twitterHandle: '',
    googleAnalyticsId: '',
    facebookPixelId: '',
  });
}

export function saveSEOSettings(seo: SEOSettings): void {
  writeJsonFile('seo.json', seo);
}

// Site Settings
export function getSiteSettings(): SiteSettings {
  return readJsonFile('siteSettings.json', {
    siteName: 'Excel Energy',
    logo: '',
    favicon: '',
    contactEmail: 'info@excelenergy.in',
    contactPhone: '+91 9876543210',
    address: 'Solar Heights, Sector 62, Noida, UP, India',
    workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
    footerText: '© 2024 Excel Energy. All rights reserved.',
    socialMedia: getSocialMedia(),
    seo: getSEOSettings(),
  });
}

export function saveSiteSettings(settings: SiteSettings): void {
  writeJsonFile('siteSettings.json', settings);
}

// Services
export function getServices(): Service[] {
  const services = readJsonFile('services.json', []);
  return services;
}

export function saveServices(services: Service[]): void {
  writeJsonFile('services.json', services);
}

export function getService(id: string): Service | null {
  const services = getServices();
  return services.find(s => s.id === id) || null;
}

export function addService(service: Service): void {
  const services = getServices();
  services.push(service);
  saveServices(services);
}

export function updateService(id: string, service: Partial<Service>): boolean {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return false;
  services[index] = { ...services[index], ...service };
  saveServices(services);
  return true;
}

export function deleteService(id: string): boolean {
  const services = getServices();
  const filtered = services.filter(s => s.id !== id);
  if (filtered.length === services.length) return false;
  saveServices(filtered);
  return true;
}

// Projects
export function getProjects(): Project[] {
  return readJsonFile('projects.json', []);
}

export function saveProjects(projects: Project[]): void {
  writeJsonFile('projects.json', projects);
}

export function getProject(id: string): Project | null {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
}

export function addProject(project: Project): void {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
}

export function updateProject(id: string, project: Partial<Project>): boolean {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return false;
  projects[index] = { ...projects[index], ...project };
  saveProjects(projects);
  return true;
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveProjects(filtered);
  return true;
}

// Team Members
export function getTeamMembers(): TeamMember[] {
  return readJsonFile('team.json', []);
}

export function saveTeamMembers(members: TeamMember[]): void {
  writeJsonFile('team.json', members);
}

export function getTeamMember(id: string): TeamMember | null {
  const members = getTeamMembers();
  return members.find(m => m.id === id) || null;
}

export function addTeamMember(member: TeamMember): void {
  const members = getTeamMembers();
  console.log('addTeamMember: Current members count:', members.length);
  console.log('addTeamMember: Adding member:', JSON.stringify(member, null, 2));
  members.push(member);
  console.log('addTeamMember: New members count:', members.length);
  saveTeamMembers(members);
  const verify = getTeamMembers();
  console.log('addTeamMember: Verified saved members count:', verify.length);
}

export function updateTeamMember(id: string, member: Partial<TeamMember>): boolean {
  const members = getTeamMembers();
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return false;
  members[index] = { ...members[index], ...member };
  saveTeamMembers(members);
  return true;
}

export function deleteTeamMember(id: string): boolean {
  const members = getTeamMembers();
  const filtered = members.filter(m => m.id !== id);
  if (filtered.length === members.length) return false;
  saveTeamMembers(filtered);
  return true;
}

// Messages
export function getMessages(): Message[] {
  return readJsonFile('messages.json', []);
}

export function saveMessages(messages: Message[]): void {
  writeJsonFile('messages.json', messages);
}

export function addMessage(message: Omit<Message, 'id' | 'timestamp' | 'read'>): Message {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    read: false
  };
  messages.unshift(newMessage);
  saveMessages(messages);
  return newMessage;
}

export function markMessageAsRead(id: string): boolean {
  const messages = getMessages();
  const message = messages.find(m => m.id === id);
  if (!message) return false;
  message.read = true;
  saveMessages(messages);
  return true;
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages();
  const filtered = messages.filter(m => m.id !== id);
  if (filtered.length === messages.length) return false;
  saveMessages(filtered);
  return true;
}

// Quotes
export function getQuotes(): Quote[] {
  return readJsonFile('quotes.json', []);
}

export function saveQuotes(quotes: Quote[]): void {
  writeJsonFile('quotes.json', quotes);
}

export function addQuote(quote: Omit<Quote, 'id' | 'timestamp'>): Quote {
  const quotes = getQuotes();
  const newQuote: Quote = {
    ...quote,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  };
  quotes.unshift(newQuote);
  saveQuotes(quotes);
  return newQuote;
}

// Clients
export function getClients(): Client[] {
  return readJsonFile('clients.json', []);
}

export function saveClients(clients: Client[]): void {
  writeJsonFile('clients.json', clients);
}

export function addClient(client: Omit<Client, 'id' | 'timestamp'>): Client {
  const clients = getClients();
  const newClient: Client = {
    ...client,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  };
  clients.unshift(newClient);
  saveClients(clients);
  return newClient;
}

export function updateClient(id: string, client: Partial<Client>): boolean {
  const clients = getClients();
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) return false;
  clients[index] = { ...clients[index], ...client };
  saveClients(clients);
  return true;
}

export function deleteClient(id: string): boolean {
  const clients = getClients();
  const filtered = clients.filter(c => c.id !== id);
  if (filtered.length === clients.length) return false;
  saveClients(filtered);
  return true;
}

// Blog Posts
export function getBlogPosts(): BlogPost[] {
  return readJsonFile('blog.json', []);
}

export function saveBlogPosts(posts: BlogPost[]): void {
  writeJsonFile('blog.json', posts);
}

export function getBlogPost(id: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find(p => p.id === id) || null;
}

export function addBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt'>): BlogPost {
  const posts = getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString()
  };
  posts.unshift(newPost);
  saveBlogPosts(posts);
  return newPost;
}

export function updateBlogPost(id: string, post: Partial<BlogPost>): boolean {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return false;
  posts[index] = { ...posts[index], ...post };
  saveBlogPosts(posts);
  return true;
}

export function deleteBlogPost(id: string): boolean {
  const posts = getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  if (filtered.length === posts.length) return false;
  saveBlogPosts(filtered);
  return true;
}

// Analytics
export function getAnalytics(): Analytics {
  return readJsonFile('analytics.json', {
    totalVisitors: 0,
    dailyVisitors: [],
    weeklyVisitors: [],
    monthlyVisitors: [],
    pageViews: [],
    lastUpdated: new Date().toISOString()
  });
}

export function saveAnalytics(analytics: Analytics): void {
  writeJsonFile('analytics.json', analytics);
}

export function incrementVisitor(): void {
  const analytics = getAnalytics();
  analytics.totalVisitors++;
  const today = new Date().toISOString().split('T')[0];
  const dailyIndex = analytics.dailyVisitors.findIndex(d => d.date === today);
  if (dailyIndex >= 0) {
    analytics.dailyVisitors[dailyIndex].count++;
  } else {
    analytics.dailyVisitors.push({ date: today, count: 1 });
  }
  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
}
