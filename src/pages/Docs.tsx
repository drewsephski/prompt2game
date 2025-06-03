import React, { useState } from 'react';
import GlowEffect from "@/components/ui/glow-effect";
import GlowCard from "@/components/ui/glow-card";
import { motion } from 'framer-motion';
import { BookOpen, Code, MessageSquare, Video, FileText, Search, ArrowRight, ChevronDown } from 'lucide-react';

const Docs = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'getting-started': true,
    'game-creation': false,
    'api': false,
    'troubleshooting': false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const documentation = {
    'getting-started': [
      {
        title: 'Introduction to Prompt2Game',
        description: 'Learn the basics of creating games with AI',
        content: 'Prompt2Game is an AI-powered platform that transforms your text descriptions into playable games. This guide will walk you through the core concepts and features.'
      },
      {
        title: 'Creating Your First Game',
        description: 'Step-by-step guide to make your first game',
        content: 'Learn how to create your first game by describing what you want in natural language. Our AI will handle the coding and game design for you.'
      },
      {
        title: 'Account Setup',
        description: 'How to set up and customize your account',
        content: 'Complete guide to setting up your account, profile, and preferences to get the most out of Prompt2Game.'
      }
    ],
    'game-creation': [
      {
        title: 'Writing Effective Prompts',
        description: 'Tips for creating better game descriptions',
        content: 'Learn how to write clear and effective prompts that help the AI understand exactly what kind of game you want to create.'
      },
      {
        title: 'Customizing Your Game',
        description: 'How to modify and enhance your generated games',
        content: 'Explore the various ways you can customize your game after generation, from changing visuals to modifying game mechanics.'
      },
      {
        title: 'Advanced Game Mechanics',
        description: 'Creating complex game interactions',
        content: 'Learn how to implement advanced game mechanics and interactions using our intuitive interface.'
      }
    ],
    'api': [
      {
        title: 'API Overview',
        description: 'Introduction to the Prompt2Game API',
        content: 'Learn how to integrate with the Prompt2Game API to create and manage games programmatically.'
      },
      {
        title: 'Authentication',
        description: 'How to authenticate with our API',
        content: 'Guide to setting up authentication and managing API keys for secure access to our services.'
      },
      {
        title: 'API Reference',
        description: 'Complete API endpoint documentation',
        content: 'Detailed reference for all available API endpoints, parameters, and response formats.'
      }
    ],
    'troubleshooting': [
      {
        title: 'Common Issues',
        description: 'Solutions to frequently encountered problems',
        content: 'Find quick solutions to common issues users face when creating and publishing games.'
      },
      {
        title: 'Performance Optimization',
        description: 'Improving your game\'s performance',
        content: 'Tips and techniques to optimize your game for better performance across different devices.'
      },
      {
        title: 'Getting Help',
        description: 'How to get support',
        content: 'Learn how to contact our support team and get help with any issues you encounter.'
      }
    ]
  };

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { id: 'game-creation', name: 'Game Creation', icon: <Code className="w-4 h-4 mr-2" /> },
    { id: 'api', name: 'API Reference', icon: <Code className="w-4 h-4 mr-2" /> },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: <MessageSquare className="w-4 h-4 mr-2" /> }
  ];

  const filteredDocs = Object.entries(documentation).reduce((acc, [category, items]) => {
    if (searchQuery) {
      const filteredItems = items.filter(
        item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }
    } else {
      acc[category] = items;
    }
    return acc;
  }, {} as Record<string, Array<{title: string, description: string, content: string}>>);

  const hasSearchResults = Object.values(filteredDocs).some(items => items.length > 0);

  return (
    <div className="min-h-screen bg-arcade-dark text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about creating amazing games with AI
          </p>
          
          <div className="max-w-2xl mx-auto mt-8 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0CF2A0]/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && !hasSearchResults && (
              <p className="mt-4 text-gray-400 text-sm">No results found for "{searchQuery}"</p>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <GlowCard className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <h3 className="font-semibold text-lg mb-4 text-[#0CF2A0]">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="mb-2">
                    <button
                      onClick={() => toggleSection(category.id)}
                      className="flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-gray-700/50 transition-colors text-sm font-medium"
                    >
                      <span className="flex items-center">
                        {category.icon}
                        {category.name}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${openSections[category.id] ? 'transform rotate-180' : ''}`} 
                      />
                    </button>
                    {openSections[category.id] && (
                      <div className="mt-1 ml-6 space-y-1">
                        {documentation[category.id as keyof typeof documentation]?.map((item, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveCategory(category.id)}
                            className={`block w-full text-left py-2 px-3 rounded text-sm ${
                              activeCategory === category.id
                                ? 'text-[#0CF2A0] bg-gray-700/50'
                                : 'text-gray-300 hover:bg-gray-700/30'
                            }`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="font-semibold text-sm mb-3 text-gray-300 uppercase tracking-wider">Resources</h3>
                <div className="space-y-2">
                  <a href="#" className="flex items-center text-sm text-gray-300 hover:text-white transition-colors">
                    <Video className="w-4 h-4 mr-2" />
                    Video Tutorials
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-300 hover:text-white transition-colors">
                    <FileText className="w-4 h-4 mr-2" />
                    API Reference
                  </a>
                  <a href="#" className="flex items-center text-sm text-gray-300 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Community Forum
                  </a>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <GlowCard className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
              {searchQuery ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Search Results</h2>
                  {Object.entries(filteredDocs).map(([category, items]) => (
                    <div key={category} className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-[#0CF2A0] capitalize">
                        {category.split('-').join(' ')}
                      </h3>
                      <div className="space-y-6">
                        {items.map((item, i) => (
                          <div key={i} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-300 mb-3">{item.description}</p>
                            <p className="text-gray-400 text-sm">{item.content}</p>
                            <a 
                              href="#" 
                              className="inline-flex items-center text-[#0CF2A0] text-sm mt-3 hover:underline"
                            >
                              Read more <ArrowRight className="w-4 h-4 ml-1" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6">
                    {activeCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h2>
                  <div className="space-y-8">
                    {documentation[activeCategory as keyof typeof documentation]?.map((item, i) => (
                      <div key={i} className="border-b border-gray-700 pb-8 last:border-0 last:pb-0">
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-gray-300 mb-4">{item.description}</p>
                        <p className="text-gray-400">{item.content}</p>
                        <a 
                          href="#" 
                          className="inline-flex items-center text-[#0CF2A0] text-sm mt-3 hover:underline"
                        >
                          Read more <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
