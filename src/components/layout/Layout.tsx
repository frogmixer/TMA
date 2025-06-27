import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ExternalLink, Shuffle, GitBranch, Shield, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Swap', href: '/swap', icon: Shuffle },
    { name: 'Bridge', href: '/bridge', icon: GitBranch },
    { name: 'Fast Mixer', href: '/fast-mixer', icon: Zap },
    { name: 'Max Mixer', href: '/fully-mixer', icon: Shield },
  ];

  const communityLinks = [
    { name: 'Telegram', href: 'https://t.me/frogmixer', external: true },
    { name: 'TMA', href: 'https://frogmixer.autos', external: true },
    { name: 'BOT', href: 'https://t.me/frogmixer_bot', external: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-emerald-200/50 bg-white/80 backdrop-blur-md dark:border-emerald-800/50 dark:bg-slate-950/80">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="" 
                  className="h-10 w-10 rounded-full border-2 border-emerald-300"
                />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Frogmixer
                </h1>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Autos</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-2 ${
                        isActive 
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                          : "text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Community Links */}
            <div className="hidden lg:flex items-center space-x-2">
              {communityLinks.map((link) => (
                <Button key={link.name} variant="outline" size="sm" asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-emerald-200/50 bg-white/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`w-full justify-start flex items-center space-x-2 ${
                          isActive 
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                            : "text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  );
                })}
                <Separator className="my-2" />
                <div className="space-y-1">
                  {communityLinks.map((link) => (
                    <Button key={link.name} variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                        <span>{link.name}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-200/50 bg-white/60 backdrop-blur-md dark:border-emerald-800/50 dark:bg-slate-950/60">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/frog-icon.jpg" 
                  alt="Frogmixer" 
                  className="h-8 w-8 rounded-full border border-emerald-300"
                />
                <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Frogmixer Protocol
                </h3>
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Fully decentralized, open-source multi-chain mixing and bridge aggregator protocol.
              </p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  Zero Custodial Risk
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Fully Decentralized
                </Badge>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">Navigation</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-emerald-600 dark:text-emerald-400">
                <li>• Multi-Chain Support (TON, Solana)</li>
                <li>• 90s Fast Mixing</li>
                <li>• Cross-Chain Bridge Aggregator</li>
                <li>• Privacy-by-Design</li>
                <li>• Open Source</li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">Community</h4>
              <div className="space-y-2">
                {communityLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
                <div className="pt-2">
                  <p className="text-xs text-emerald-500 dark:text-emerald-400">
                    Website: frogmixer.autos
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-emerald-200/50" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-emerald-500 dark:text-emerald-400">
              © 2025 Frogmixer Protocol. All rights reserved. Open source and decentralized.
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <Badge variant="outline" className="border-emerald-300 text-emerald-600">
                Privacy First
              </Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-600">
                Trustless
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
