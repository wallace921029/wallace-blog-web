import { useEffect } from "react";
import avatar from "@/assets/images/avatar.jpg";
import aboutConfig from "@/config/about.json";
import siteConfig from "@/config/site.json";

export function About() {
  const { profile, bio, skills, friendLinks } = aboutConfig;

  useEffect(() => {
    document.title = siteConfig.title.about;
  }, []);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <section className="border border-border p-6 rounded-lg bg-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
          <div className="text-[10rem] leading-none font-black text-primary rotate-12 translate-x-8 -translate-y-8">
            W
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300">
              <img 
                src={avatar} 
                alt="Wallace Avatar" 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background border border-primary px-3 py-0.5 text-xs font-bold text-primary rounded-full whitespace-nowrap">
              [{profile.level}]
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">{profile.name}</h1>
              <p className="text-muted-foreground font-mono text-sm">
                // {profile.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0 text-sm font-mono">
              <div className="bg-secondary/10 p-2 rounded border border-border/50">
                <span className="text-muted-foreground block text-xs">GENDER</span>
                <span className="text-foreground font-bold">{profile.stats.gender}</span>
              </div>
              <div className="bg-secondary/10 p-2 rounded border border-border/50">
                <span className="text-muted-foreground block text-xs">LOCATION</span>
                <span className="text-foreground font-bold">{profile.stats.location}</span>
              </div>
              <div className="bg-secondary/10 p-2 rounded border border-border/50">
                <span className="text-muted-foreground block text-xs">STATUS</span>
                <span className="text-green-500 font-bold animate-pulse">{profile.stats.status}</span>
              </div>
              <div className="bg-secondary/10 p-2 rounded border border-border/50">
                <span className="text-muted-foreground block text-xs">UPTIME</span>
                <span className="text-foreground font-bold">{profile.stats.uptime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Bio */}
      <section className="border border-border rounded-lg overflow-hidden bg-black/40">
        <div className="bg-secondary/20 px-4 py-2 border-b border-border flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          <span className="ml-2 text-xs text-muted-foreground font-mono">user_profile.sh</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-4">
          <p>
            <span className="text-primary mr-2">➜</span>
            <span className="text-yellow-500">whoami</span>
          </p>
          <p className="text-muted-foreground pl-4 border-l-2 border-border/30">
            {bio.description}
          </p>
          
          <p>
            <span className="text-primary mr-2">➜</span>
            <span className="text-yellow-500">cat skills.json</span>
          </p>
          <div className="pl-4 border-l-2 border-border/30 space-y-3">
            <div>
              <h3 className="text-foreground font-bold mb-2 text-xs uppercase tracking-wider">[ Frontend ]</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {skills.frontend.map(skill => (
                  <span key={skill} className="text-muted-foreground hover:text-primary transition-colors cursor-default">
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-2 text-xs uppercase tracking-wider">[ Backend ]</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {skills.backend.map(skill => (
                  <span key={skill} className="text-muted-foreground hover:text-primary transition-colors cursor-default">
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Friend Links */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">#</span> 
          FRIEND_LINKS
          <span className="text-xs font-normal text-muted-foreground ml-auto bg-secondary/10 px-2 py-1 rounded">
            CONNECTION_ESTABLISHED
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {friendLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block border border-border p-4 rounded bg-secondary/5 hover:bg-secondary/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: link.color ? `${link.color}10` : 'rgba(var(--foreground), 0.1)',
                    color: link.color || undefined
                  }}
                >
                  {link.icon}
                </div>
                <span 
                  className="font-bold transition-colors"
                  style={{
                    ['--hover-color' as string]: link.color || 'var(--primary)'
                  }}
                  onMouseEnter={(e) => link.color && (e.currentTarget.style.color = link.color)}
                  onMouseLeave={(e) => link.color && (e.currentTarget.style.color = '')}
                >
                  {link.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {link.description}
              </p>
            </a>
          ))}

          {/* Placeholder for more links */}
          <div className="border border-border border-dashed p-4 rounded bg-transparent flex flex-col items-center justify-center text-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-2xl text-muted-foreground">+</span>
            <span className="text-xs text-muted-foreground">ADD_LINK</span>
          </div>
        </div>
      </section>
    </div>
  );
}
