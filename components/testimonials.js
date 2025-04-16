import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Rodriguez",
      role: "League Administrator",
      image: "/images/testimonial-1.jpg",
      quote: "KICKOFF has transformed how we run our community soccer league. The automatic standings and scheduling features have saved me countless hours of work."
    },
    {
      name: "Sarah Johnson",
      role: "Team Coach",
      image: "/images/testimonial-2.jpg",
      quote: "As a coach, having all my team's information in one place is invaluable. The player stats tracking has helped me identify strengths and areas for improvement."
    },
    {
      name: "Michael Chen",
      role: "Sports Club Director",
      image: "/images/testimonial-3.jpg",
      quote: "We manage multiple leagues across different age groups, and KICKOFF has streamlined our entire operation. The parents and players love the transparency it provides."
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1D2A68] mb-4">What Our Users Say</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied league managers and teams</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-md flex flex-col">
            <FaQuoteLeft className="text-3xl text-[#2A9D58] mb-4" />
            <p className="text-gray-700 mb-6 flex-grow">{testimonial.quote}</p>
            <div className="flex items-center">
              <div className="w-14 h-14 relative rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-[#1D2A68]">{testimonial.name}</h4>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}