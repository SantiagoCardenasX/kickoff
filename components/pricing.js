import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for small teams and casual leagues",
      features: [
        "1 league",
        "Up to 8 teams",
        "Basic scheduling",
        "Standard standings",
        "Email support"
      ],
      buttonText: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "29",
      period: "month",
      description: "Great for established leagues and clubs",
      features: [
        "Up to 5 leagues",
        "Unlimited teams",
        "Advanced scheduling",
        "Detailed statistics",
        "Player profiles",
        "Custom branding",
        "Priority support"
      ],
      buttonText: "Go Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "99",
      period: "month",
      description: "For sports associations and large organizations",
      features: [
        "Unlimited leagues",
        "Unlimited teams",
        "Advanced analytics",
        "API access",
        "Multiple admins",
        "Custom integrations",
        "Dedicated support"
      ],
      buttonText: "Contact Us",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1D2A68] mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your league&apos;s needs</p>
      </div>
      
      <div className="flex flex-col lg:flex-row justify-center gap-8 px-4">
        {plans.map((plan, index) => (
          <div key={index} className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col ${plan.popular ? 'border-4 border-[#2A9D58] scale-105' : ''}`}>
            <div className={`p-6 ${plan.popular ? 'bg-[#2A9D58] text-white' : 'bg-gray-100'}`}>
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm mb-4">{plan.description}</p>
              <div className="flex items-end">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="ml-1 mb-1">/{plan.period}</span>
              </div>
            </div>
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <FaCheck className="text-[#2A9D58] mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 pt-0">
              <Link href="/signup">
                <button className={`w-full py-3 px-4 rounded-lg font-semibold ${plan.popular ? 'bg-[#2A9D58] text-white hover:bg-[#1D2A68]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition duration-300`}>
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}