import Image from "next/image";
import {
  FaTrophy,
  FaCalendarAlt,
  FaUserFriends,
  FaChartLine,
  FaMobileAlt,
  FaBell,
} from "react-icons/fa";

export default function Features() {
  const featuresList = [
    {
      icon: <FaTrophy className="text-4xl text-[#2A9D58]" />,
      title: "League Creation",
      description:
        "Create and customize leagues with flexible formats, from single elimination to round-robin tournaments.",
    },
    {
      icon: <FaUserFriends className="text-4xl text-[#2A9D58]" />,
      title: "Team Management",
      description:
        "Add teams, manage rosters, and keep track of statistics throughout the season.",
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-[#2A9D58]" />,
      title: "Match Scheduling",
      description:
        "Easily schedule matches with our intuitive calendar interface, avoiding conflicts and overlaps.",
    },
    {
      icon: <FaChartLine className="text-4xl text-[#2A9D58]" />,
      title: "Live Standings",
      description:
        "Real-time standings and statistics updated instantly as you enter match results.",
    },
    {
      icon: <FaMobileAlt className="text-4xl text-[#2A9D58]" />,
      title: "Mobile Access",
      description:
        "Access your league information anywhere, anytime with our mobile-friendly interface.",
    },
    {
      icon: <FaBell className="text-4xl text-[#2A9D58]" />,
      title: "Notifications",
      description:
        "Keep everyone informed with automated notifications for upcoming matches and results.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1D2A68] mb-4">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to manage your soccer leagues efficiently in one
          platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-[#1D2A68] mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
