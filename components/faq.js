"use client"

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQ() {
  const faqs = [
    {
      question: "How many teams can I add to my league?",
      answer: "The number of teams depends on your plan. Free users can add up to 8 teams per league, Pro users get unlimited teams, and Enterprise users get unlimited teams across unlimited leagues."
    },
    {
      question: "Can I import team and player data from other platforms?",
      answer: "Yes! We support CSV imports for team and player data. Pro and Enterprise users can also use our API for more advanced integrations with existing systems."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Our platform is fully responsive and works great on mobile devices. We also have dedicated iOS and Android apps available for download from the app stores."
    },
    {
      question: "Can players access their own statistics?",
      answer: "Yes, players can create accounts to view their personal statistics, upcoming matches, and team information. League admins control what information is visible to players."
    },
    {
      question: "How do I handle substitutions and lineup changes?",
      answer: "Our platform allows you to manage team rosters for each match, including starting lineups and substitutions. Changes can be made before or during matches."
    },
    {
      question: "Can I customize the league rules and point system?",
      answer: "Absolutely! You can customize winning points, tie-breaking rules, match duration, and many other parameters to match your league's specific requirements."
    }
  ];
  
  // Use state to keep track of which FAQ is expanded
  const [openIndex, setOpenIndex] = useState(null);
  
  // Toggle function for expanding/collapsing FAQs
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1D2A68] mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about our platform</p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b border-gray-200 pb-4">
            <button 
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left font-semibold text-lg text-[#1D2A68] hover:text-[#2A9D58] transition duration-300"
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <div className={`mt-2 text-gray-600 ${openIndex === index ? 'block' : 'hidden'}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}