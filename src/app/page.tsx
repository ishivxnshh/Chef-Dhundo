'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Chatbot } from '@/components/chatbot'
import { SubmitResume } from '@/components/submitResume'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.info('Login to access forms', {
        description: 'You can browse the site, but login is required to submit forms.',
        duration: 3000,
        closeButton: true,
      })
    }
  }, [isSignedIn, isLoaded])

  // Check if mobile and update on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chefTypes = [
    {
      number: "01.",
      title: "Indian Tandoor",
      description: "A skilled culinary role specializing in the operation and mastery of the tandoor oven. This involves preparing a variety of Indian breads (like naan and roti), grilling meats (such as tandoori chicken and kebabs), and ensuring dishes have the authentic smoky flavor characteristic of tandoor cooking. They understand heat control and marination techniques specific to tandoor items."
    },
    {
      number: "02.",
      title: "Indian Commi",
      description: "An entry-level chef in the Indian kitchen, assisting senior chefs with food preparation. This includes chopping vegetables, preparing spice mixes, marinating ingredients, and maintaining a clean and organized work station. They are learning the fundamentals of Indian cuisine and developing their culinary skills under supervision."
    },
    {
      number: "03.",
      title: "Chinese Commi",
      description: "Similar to the Indian Commi, this role is an entry-level position within the Chinese kitchen. Responsibilities involve assisting chefs with prepping ingredients like vegetables, meats, and sauces according to Chinese culinary techniques. They learn about stir-frying, steaming, and other essential Chinese cooking methods while maintaining kitchen hygiene."
    },
    {
      number: "04.",
      title: "Kitchen Helper",
      description: "A support role in the kitchen responsible for basic tasks such as cleaning dishes and kitchen equipment, maintaining sanitation standards, and assisting with food preparation as directed by chefs. They ensure the smooth operation of the kitchen by handling essential but less specialized duties."
    },
    {
      number: "05.",
      title: "Head Chef",
      description: "The culinary leader of the kitchen, responsible for overseeing all food preparation, menu planning, and kitchen staff management. They ensure food quality, consistency, and cost-effectiveness, while also maintaining hygiene standards and often contributing to the restaurant's overall culinary vision."
    }
  ]

  // Auto-scroll effect for desktop carousel only
  useEffect(() => {
    if (isMobile) return; // Don't auto-scroll on mobile
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(chefTypes.length / 3));
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, chefTypes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(chefTypes.length / 3));
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(chefTypes.length / 3)) % Math.ceil(chefTypes.length / 3));
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative text-white min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3217157/pexels-photo-3217157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Chef in a modern kitchen"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-4xl">
            <p className="text-lg mb-4 text-gray-200">Your Premier Partner in Culinary Staffing</p>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Hired Faster – Chef Jobs Made Easy
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Create your profile, showcase your skills, and get hired by top clients and restaurants – fast and easy
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#get-a-job" className="bg-orange-500 text-white px-8 py-4 rounded-md hover:bg-orange-600 transition-colors font-medium text-center">
                Get a Job
              </a>
              <a href="#hire-a-chef" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-gray-900 transition-colors font-medium text-center">
                Contact a Chef
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Submit Resume Form */}
            {isLoaded && isSignedIn ? (
              <SubmitResume />
            ) : (
              <motion.div
                id="get-a-job"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="flex-1"
              >
                <Card className="p-8 rounded-2xl shadow-xl border-0 bg-gradient-to-br from-orange-50 to-white">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Submit Resume: Get a Job 👩‍🍳</h2>
                    <p className="text-gray-600 mb-6">
                      Please sign in to access the resume submission form.
                    </p>
                    <SignInButton mode="modal">
                      <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium">
                        Sign In to Submit Resume
                      </button>
                    </SignInButton>
                  </div>
                </Card>
              </motion.div>
            )}
            
            {/* Vertical Divider for desktop only */}
            <div className="hidden md:flex h-auto self-stretch items-center">
              <div className="w-px bg-gray-200 h-full mx-2" />
            </div>
            
            {/* Find Chef Search Form */}
            <motion.div
              id="hire-a-chef"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="flex-1"
            >
              <Card className="p-8 rounded-2xl shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white flex flex-col justify-between h-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Hire a Chef 🤝</h2>
                <form className="space-y-5 flex flex-col h-full justify-between" onSubmit={e => {
                  e.preventDefault();
                  const search = (e.currentTarget.elements.namedItem('findchef-search') as HTMLInputElement).value;
                  if (search) {
                    window.location.href = `/findchef?search=${encodeURIComponent(search)}`;
                  } else {
                    window.location.href = '/findchef';
                  }
                }}>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="findchef-search">Search Chefs / खोज करें </Label>
                    <Input
                      type="text"
                      name="findchef-search"
                      id="findchef-search"
                      placeholder="Search by name, location, or experience..."
                      className="p-3"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md text-lg transition-colors shadow-md mt-4">
                    Search Chefs / खोज करें
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Chef Types</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover the diverse range of culinary professionals we connect with top restaurants and hospitality establishments
            </p>
          </div>
          
          {/* Chef Types - Conditional Rendering */}
          {isMobile ? (
            // Mobile: Simple vertical stack
            <div className="space-y-6">
              {chefTypes.map((chef, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="text-orange-500 text-3xl font-bold mb-4">{chef.number}</div>
                  <h4 className="text-xl font-bold mb-3 text-gray-800">{chef.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {chef.description}
                  </p>
                  <Link href="#" className="inline-block text-orange-500 hover:text-orange-600 font-medium transition-colors text-base">
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            // Desktop: Carousel
            <div className="relative w-full">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-xl mx-16">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100/3)}%)` }}
                >
                  {/* First set of cards */}
                  {chefTypes.map((chef, index) => (
                    <div key={`first-${index}`} className="w-1/3 flex-shrink-0 px-4">
                      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
                        <div className="text-orange-500 text-3xl font-bold mb-6">{chef.number}</div>
                        <h4 className="text-2xl font-bold mb-4 text-gray-800">{chef.title}</h4>
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                          {chef.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {chefTypes.map((chef, index) => (
                    <div key={`second-${index}`} className="w-1/3 flex-shrink-0 px-4">
                      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
                        <div className="text-orange-500 text-3xl font-bold mb-6">{chef.number}</div>
                        <h4 className="text-2xl font-bold mb-4 text-gray-800">{chef.title}</h4>
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                          {chef.description}
                        </p>
                        <Link href="#" className="inline-block text-orange-500 hover:text-orange-600 font-medium transition-colors text-lg">
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 z-10"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 z-10"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: Math.ceil(chefTypes.length / 3) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide group ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
          <p className="text-gray-600 mb-16 max-w-4xl mx-auto text-lg leading-relaxed">
            4300+ videos published in 4 years with addressing thousands of chefs pan India and globally to make them capable of run any food and beverage business profitably
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-white group">
              <div className="text-5xl mb-6 group-hover:text-white">👥</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white">India&apos;s Largest Hospitality Network</h3>
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white">
                Dominant Reach: Covers the most locations, offering maximum convenience. Wide Choice: Provides a diverse range of hospitality options for all needs.
              </p>
            </div>
            
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-white group">
              <div className="text-5xl mb-6 group-hover:text-white">🔍</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white">India&apos;s Largest Hospitality Manpower Solution</h3>
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white">
                Vast Talent Pool: Quick access to the biggest selection of hospitality staff. Specialized Staffing: Understands unique industry hiring needs.
              </p>
            </div>
            
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-white group">
              <div className="text-5xl mb-6 group-hover:text-white">🎓</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white">India&apos;s Largest Hospitality Edtech With 4300 Hospitality Videos On Chef Dheeraj Bhandari Youtube Channel</h3>
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-white">
                Unparalleled collection of hospitality video content. Expert-Led Education
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "190+", label: "Projects" },
              { number: "180+", label: "Restaurants Opened" },
              { number: "1000+", label: "Trained Hospitality Staffs" },
              { number: "7000+", label: "Hospitality Students Trained" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-3">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Outlets</h2>
          <div className="relative">
            {/* Marquee Container */}
            <div className="flex animate-marquee space-x-8">
              {/* First set of images */}
              {Array.from({ length: 20 }, (_, index) => (
                <div key={`first-${index}`} className="flex-shrink-0">
                  <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
                    <Image
                      src={`/website/outlets/${index + 1}.png`}
                      alt={`Outlet ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {Array.from({ length: 20 }, (_, index) => (
                <div key={`second-${index}`} className="flex-shrink-0">
                  <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
                    <Image
                      src={`/website/outlets/${index + 1}.png`}
                      alt={`Outlet ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full opacity-10 transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 rounded-full opacity-10 transform -translate-x-32 translate-y-32"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">        
          <div className="mb-12">
            {/* Address removed */}
          </div>
          
        
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400">Copyright © 2025 Chef Dhundho</p>
            </div>
            <div className="flex items-center space-x-6">
             
              <p className="text-gray-400">Powered by Billionaire Chef Media Private Limited</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}

