import Image from 'next/image';
import { FaRegLightbulb, FaUsersCog, FaCalendarCheck, FaChartBar } from 'react-icons/fa';

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaRegLightbulb className="text-4xl text-[#2A9D58]" />,
      title: "Create Your League",
      description: "Sign up and create your league in minutes. Set your league format, rules, and divisions."
    },
    {
      icon: <FaUsersCog className="text-4xl text-[#2A9D58]" />,
      title: "Add Teams",
      description: "Add teams to your league, invite managers, and build rosters with detailed profiles."
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-[#2A9D58]" />,
      title: "Schedule & Play",
      description: "Schedule matches, record scores, and keep track of results, goals, and other statistics."
    },
    {
      icon: <FaChartBar className="text-4xl text-[#2A9D58]" />,
      title: "Track Progress",
      description: "Monitor standings, statistics, and trends throughout your season with beautiful visualizations."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D2A68] mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage your soccer leagues in a few simple steps</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col items-center text-center">
              <div className="mb-6">
                {step.icon}
              </div>
              <div className="w-12 h-12 rounded-full bg-[#2A9D58] text-white flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-[#1D2A68] mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-lg p-6 md:p-8 overflow-hidden">
          <Image
            src="/images/dashboard-preview.webp" 
            alt="Dashboard Preview"
            width={1200}
            height={600}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}