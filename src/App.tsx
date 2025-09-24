import React, { useState } from 'react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setIsFormOpen(false);
    setFormData({
      name: '',
      age: '',
      email: '',
      phone: '',
      experience: '',
      message: ''
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-club-black to-club-silver-dark">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="TYRC Logo" className="h-10 w-10 object-contain" />
                <h1 className="text-xl font-bold text-club-black">TYRC</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => scrollToSection('home')} className="text-club-black hover:text-club-silver px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-club-silver px-3 py-2 rounded-md text-sm font-medium transition-colors">About</button>
                <button onClick={() => scrollToSection('programs')} className="text-gray-700 hover:text-club-silver px-3 py-2 rounded-md text-sm font-medium transition-colors">Programs</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-club-silver px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</button>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-club-black hover:text-club-silver p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-club-black hover:text-club-silver hover:bg-gray-50 rounded-md transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-club-silver hover:bg-gray-50 rounded-md transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('programs')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-club-silver hover:bg-gray-50 rounded-md transition-colors"
              >
                Programs
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-club-silver hover:bg-gray-50 rounded-md transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Logo Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(/logo.png)',
            backgroundSize: 'contain'
          }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-club-black/80 to-club-silver-dark/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Tenderloin Youth
              <span className="block text-club-silver">Rugby Club</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Building character, community, and champions through the sport of rugby
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-club-silver text-club-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-club-silver-light transition-colors shadow-lg"
              >
                Join Our Team
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-club-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-club-black mb-4">About TYRC</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded in the heart of San Francisco's Tenderloin district, we're dedicated to providing 
              youth with opportunities to grow through rugby while building lasting friendships and life skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-club-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-club-black mb-2">Community</h3>
              <p className="text-gray-600">Building strong bonds and lasting friendships within our diverse community</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-club-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-club-black mb-2">Excellence</h3>
              <p className="text-gray-600">Striving for excellence both on and off the field through dedication and hard work</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-club-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-club-black mb-2">Passion</h3>
              <p className="text-gray-600">Fostering a love for rugby and the values it teaches about teamwork and respect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-club-black mb-4">Our Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer programs for youth of all ages and skill levels, from beginners to competitive players.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-club-black to-club-silver-dark flex items-center justify-center">
                <span className="text-white text-2xl font-bold">U8-U12</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-club-black mb-2">Mini Rugby</h3>
                <p className="text-gray-600 mb-4">Introduction to rugby fundamentals for our youngest players</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Basic skills development</li>
                  <li>• Fun, safe environment</li>
                  <li>• Team building activities</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-club-silver to-club-silver-dark flex items-center justify-center">
                <span className="text-white text-2xl font-bold">U13-U16</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-club-black mb-2">Youth Rugby</h3>
                <p className="text-gray-600 mb-4">Competitive play and advanced skill development</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tournament participation</li>
                  <li>• Advanced techniques</li>
                  <li>• Leadership development</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-club-silver-dark to-club-black flex items-center justify-center">
                <span className="text-white text-2xl font-bold">U17+</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-club-black mb-2">Senior Youth</h3>
                <p className="text-gray-600 mb-4">Elite training and college preparation</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• College recruitment support</li>
                  <li>• Elite competition</li>
                  <li>• Mentorship programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-club-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Ready to join the Titans? Contact us to learn more about our programs and how to get involved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <svg className="w-5 h-5 text-club-silver mr-3 mb-2 sm:mb-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white text-sm sm:text-base break-all">isaachirsch@gmail.com</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <svg className="w-5 h-5 text-club-silver mr-3 mb-2 sm:mb-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-white text-sm sm:text-base">(415) 572-4853</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <svg className="w-5 h-5 text-club-silver mr-3 mb-2 sm:mb-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white text-sm sm:text-base">Tenderloin District, San Francisco</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Practice Schedule</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between text-white">
                  <span className="font-medium mb-1 sm:mb-0">Tuesday & Thursday</span>
                  <span className="text-sm sm:text-base">4:00 PM - 6:00 PM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-white">
                  <span className="font-medium mb-1 sm:mb-0">Saturday</span>
                  <span className="text-sm sm:text-base">9:00 AM - 11:00 AM</span>
                </div>
                <div className="text-white/80 text-sm mt-4 pt-3 border-t border-white/20">
                  All practices held at Tenderloin Recreation Center
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-club-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Tenderloin Youth Rugby Club</h3>
            <p className="text-white/80 mb-4">Building champions on and off the field</p>
            <div className="flex justify-center space-x-6">
              <button 
                className="text-white/80 hover:text-club-silver transition-colors focus:outline-none focus:ring-2 focus:ring-club-silver focus:ring-opacity-50 rounded-full p-1"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button 
                className="text-white/80 hover:text-club-silver transition-colors focus:outline-none focus:ring-2 focus:ring-club-silver focus:ring-opacity-50 rounded-full p-1"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button 
                className="text-white/80 hover:text-club-silver transition-colors focus:outline-none focus:ring-2 focus:ring-club-silver focus:ring-opacity-50 rounded-full p-1"
                aria-label="Follow us on Pinterest"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </button>
            </div>
            <p className="text-white/60 text-sm mt-4">
              © 2024 Tenderloin Youth Rugby Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Join Team Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-club-black">Join Our Team</h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-silver focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="5"
                    max="18"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-silver focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-silver focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-silver focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Rugby Experience Level
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-club-silver focus:border-club-black transition-all appearance-none bg-white cursor-pointer hover:border-gray-400"
                    >
                      <option value="" disabled>Select your experience level</option>
                      <option value="beginner">Beginner - Never played rugby before</option>
                      <option value="some">Some Experience - Played a few times or know basics</option>
                      <option value="intermediate">Intermediate - Played regularly for 1-2 years</option>
                      <option value="advanced">Advanced - Experienced player with 3+ years</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {formData.experience && (
                    <div className="mt-2 p-3 bg-club-silver-light rounded-lg">
                      <p className="text-sm text-gray-700">
                        {formData.experience === 'beginner' && "Perfect! We welcome all skill levels and will help you learn the fundamentals of rugby."}
                        {formData.experience === 'some' && "Great! We can build on your existing knowledge and help you develop further."}
                        {formData.experience === 'intermediate' && "Excellent! You'll fit well with our competitive teams and advanced training."}
                        {formData.experience === 'advanced' && "Fantastic! You'll be a valuable addition to our elite programs and can help mentor newer players."}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-silver focus:border-transparent"
                    placeholder="Tell us about yourself, any questions, or special considerations..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-club-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
