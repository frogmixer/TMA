import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Shuffle, 
  GitBranch, 
  Shield, 
  Zap, 
  Clock, 
  Eye, 
  Globe, 
  Lock,
  ArrowRight,
  CheckCircle,
  Users,
  Code,
  ExternalLink
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Mixer",
      description: "Lightning-fast 90-second mixing for instant privacy",
      link: "/fast-mixer",
      color: "bg-yellow-500",
      demo: true
    },
    {
      icon: Shield,
      title: "Max Mixer",
      description: "Maximum privacy with top-tier private chains",
      link: "/fully-mixer", 
      color: "bg-emerald-500",
      demo: true
    },
    {
      icon: GitBranch,
      title: "Bridge Aggregator",
      description: "Optimized cross-chain bridging with best rates",
      link: "/bridge",
      color: "bg-blue-500", 
      demo: true
    },
    {
      icon: Shuffle,
      title: "Token Swaps",
      description: "Seamless multi-chain token swapping , Crosschain memecoin trading",
      link: "/swap",
      color: "bg-purple-500",
      demo: true
    }
  ];

  const stats = [
    { label: "Supported Chains", value: "5+", icon: Globe },
    { label: "Mixing Time", value: "90s", icon: Clock },
    { label: "Privacy Level", value: "100%", icon: Eye },
    { label: "Custodial Risk", value: "0%", icon: Lock }
  ];

  const benefits = [
    "Zero custodial risk - Your funds never leave your control",
    "Fully decentralized protocol with no central authority", 
    "Open source code auditable by the community",
    "Multi-chain support including TON and Solana",
    "Lightning-fast mixing in just 90 seconds",
    "Bridge aggregation for optimal cross-chain transfers"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950">
        <div className="absolute inset-0 bg-[url('/images/mixing-bg.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="relative container mx-auto px-4 lg:px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                  🐸 Take your web3 privacy back now !
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                    Frogmixer{" "}
                  </span>
                  <span className="text-emerald-800 dark:text-emerald-200">
                    Protocol
                  </span>
                </h1>
                <p className="text-xl text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  Fully decentralized, open-source multi-chain mixing and bridge aggregator protocol. 
                  Privacy-first, zero custodial risk, maximum freedom.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link to="/fast-mixer" className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Try Fast Mixer</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50" asChild>
                  <a href="https://t.me/frogmixer" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Join Community</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                          <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                          {stat.value}
                        </div>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/frog-hero.jpg" 
                  alt="Frogmixer Protocol" 
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg p-4">
                    <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                      Privacy-by-Design Architecture
                    </h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Built from the ground up with privacy as the core principle. 
                      No logs, no tracking, no compromises.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
              Core Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
              Everything You Need for Private DeFi
            </h2>
            <p className="text-lg text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
              Explore our comprehensive suite of privacy tools and cross-chain solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-emerald-200/50 hover:border-emerald-300">
                  <CardHeader className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className={`p-4 ${feature.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-emerald-800 dark:text-emerald-200">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <CardDescription className="text-emerald-600 dark:text-emerald-400">
                      {feature.description}
                    </CardDescription>
                    {feature.demo && (
                      <Button variant="outline" size="sm" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50" asChild>
                        <Link to={feature.link} className="flex items-center justify-center space-x-2">
                          <span>Try It !</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                  Why Choose Frogmixer
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                  Built for True Decentralization
                </h2>
                <p className="text-lg text-emerald-600 dark:text-emerald-400">
                  Unlike centralized mixers that require trust, Frogmixer operates entirely on-chain 
                  with mathematical guarantees of privacy and security.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-emerald-700 dark:text-emerald-300">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <a href="https://github.com/frogmixer" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <Code className="h-5 w-5" />
                    <span>View Source Code</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50" asChild>
                  <Link to="/bridge" className="flex items-center space-x-2">
                    <GitBranch className="h-5 w-5" />
                    <span>Bridge Now !</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 border-emerald-200">
                <div className="space-y-6">
                  <div className="text-center">
                    <img 
                      src="/logo.png" 
                      alt="Privacy Shield" 
                      className="h-24 w-24 mx-auto rounded-full border-4 border-emerald-300"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
                      Telegram Mini App
                    </h3>
                    <p className="text-emerald-600 dark:text-emerald-400">
                      Access Frogmixer directly through Telegram for seamless privacy operations
                    </p>
                  </div>
                  <Separator className="bg-emerald-200" />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700 dark:text-emerald-300">Supported Chains:</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">TON + Solana</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700 dark:text-emerald-300">Mix Duration:</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">90 seconds</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700 dark:text-emerald-300">Privacy Level:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Maximum</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                    <a href="https://t.me/frogmixer_bot" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                      <span>Launch TMA</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 dark:bg-emerald-800">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Experience True Privacy?
            </h2>
            <p className="text-xl text-emerald-100">
              Join thousands of users who have chosen Frogmixer for their privacy and cross-chain needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50" asChild>
                <Link to="/fast-mixer" className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Start Mixing Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
