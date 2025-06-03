import React, { useState } from 'react';
import GlowEffect from "@/components/ui/glow-effect";
import GlowCard from "@/components/ui/glow-card";
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Code, Gamepad2, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$9' : '$90',
      billing: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'Perfect for hobbyists and indie developers',
      features: [
        '5 game generations per month',
        'Basic game templates',
        'Community support',
        'Web export',
        '1 active project'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonVariant: 'outline'
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$29' : '$290',
      billing: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'For serious game developers and small studios',
      features: [
        '20 game generations per month',
        'All game templates',
        'Priority support',
        'Web & mobile export',
        '5 active projects',
        'Custom assets',
        'Team collaboration',
        'Early access to new features'
      ],
      popular: true,
      buttonText: 'Go Pro',
      buttonVariant: 'primary'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      billing: 'tailored to your needs',
      description: 'For studios and large-scale productions',
      features: [
        'Unlimited game generations',
        'All Pro features',
        '24/7 dedicated support',
        'All export options',
        'Unlimited projects',
        'Custom integrations',
        'On-premise deployment',
        'Custom AI model training',
        'Dedicated account manager'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-[#0CF2A0]" />,
      title: "Lightning Fast",
      description: "Generate complete games in seconds, not weeks."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#0CF2A0]" />,
      title: "AI-Powered",
      description: "Leverage cutting-edge AI to bring your ideas to life."
    },
    {
      icon: <Code className="w-5 h-5 text-[#0CF2A0]" />,
      title: "Developer Friendly",
      description: "Full access to clean, well-documented code."
    },
    {
      icon: <Gamepad2 className="w-5 h-5 text-[#0CF2A0]" />,
      title: "Cross-Platform",
      description: "Export to web, mobile, and desktop platforms."
    }
  ];

  return (
    <div className="min-h-screen bg-arcade-dark text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Simple, Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your game development needs
          </p>
          
          <div className="inline-flex items-center bg-gray-800 rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-gray-700 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-gray-700 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly Billing (Save 16%)
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] text-gray-900 text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <GlowCard className={`h-full overflow-hidden transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 border-[#0CF2A0] scale-105' 
                  : 'border border-gray-700 hover:border-gray-600'
              }`}>
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="ml-2 text-gray-400 text-sm">
                        {plan.billing}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.price !== 'Custom' && (
                      <p className="text-sm text-green-400">Save 16% annually</p>
                    )}
                  </div>
                  
                  <GlowEffect className="w-full">
                    <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#0CF2A0] to-[#00FF9D] text-gray-900 hover:shadow-lg hover:shadow-[#0CF2A0]/30'
                        : 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600'
                    }`}>
                      {plan.buttonText}
                      <ArrowRight className="inline ml-2 w-4 h-4" />
                    </button>
                  </GlowEffect>

                  <div className="mt-8 space-y-4">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      What's included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-[#0CF2A0] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 bg-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! New users get 3 free game generations to test out our platform before committing to a paid plan."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Absolutely! You can change your plan at any time, and we'll prorate the difference."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="font-medium text-[#0CF2A0] mb-2">{faq.question}</h4>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6">Everything you need to create amazing games</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
              >
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
