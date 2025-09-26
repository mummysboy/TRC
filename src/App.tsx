import React, { useState } from 'react';
import rugby1 from './assets/rugby1.jpeg';
import rugby2 from './assets/rugby2.jpeg';
import rugby3 from './assets/rugby3.jpeg';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: require name and either email or phone
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    
    if (!formData.email.trim() && !formData.phone.trim()) {
      alert('Please enter either your email address or phone number.');
      return;
    }
    
    // Show notification with smooth fade-in
    setShowNotification(true);
    setTimeout(() => setNotificationVisible(true), 100);
    
    // Auto-close form after 2 seconds
    setTimeout(() => {
      setNotificationVisible(false);
      setTimeout(() => {
        setIsFormOpen(false);
        setShowNotification(false);
        setFormData({
          name: '',
          age: '',
          email: '',
          phone: '',
          experience: '',
          message: ''
        });
      }, 300);
    }, 2000);
    
    // Optional: Still try to submit to API in background
    try {
      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'https://kh57u83vqc.execute-api.us-west-2.amazonaws.com/dev';
      
      const response = await fetch(`${apiEndpoint}/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully to API:', result);
      } else {
        console.log('API submission failed, but user experience continues');
      }
    } catch (error) {
      console.log('API submission error, but user experience continues:', error);
    }
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
                <h1 className="text-xl font-bold text-club-black">Titan Rugby</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => scrollToSection('home')} className="text-club-black hover:text-club-red px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-club-black hover:text-club-red px-3 py-2 rounded-md text-sm font-medium transition-colors">About</button>
                <button onClick={() => scrollToSection('programs')} className="text-club-black hover:text-club-red px-3 py-2 rounded-md text-sm font-medium transition-colors">Programs</button>
                <button onClick={() => scrollToSection('contact')} className="text-club-black hover:text-club-red px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</button>
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
                className="block w-full text-left px-3 py-2 text-base font-medium text-club-black hover:text-club-red hover:bg-club-red-light rounded-md transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-club-black hover:text-club-red hover:bg-club-red-light rounded-md transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('programs')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-club-black hover:text-club-red hover:bg-club-red-light rounded-md transition-colors"
              >
                Programs
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-club-black hover:text-club-red hover:bg-club-red-light rounded-md transition-colors"
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
        
        {/* Clean overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-club-black/90 via-club-black/75 "></div>
        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Tenderloin Titan
              <span className="block text-club-silver">
                Youth <span className="text-club-red-accent">Rugby</span> Club
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Building character, community, and champions through the sport of rugby
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-white to-club-red-light text-club-black px-10 py-4 rounded-xl font-bold text-xl hover:from-club-red-light hover:to-white transition-all duration-300 border-2 border-club-red-accent hover:border-club-red transform hover:scale-105"
              >
                Join Our <span className="text-club-red-accent">Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-club-black mb-4">
              About <span className="text-club-red-accent">Titan Rugby</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded in the heart of San Francisco's Tenderloin district, we're dedicated to providing 
              youth with opportunities to grow through rugby while building lasting friendships and life skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-club-red-light/20 border border-club-red-subtle hover:border-club-red-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-br from-club-black to-club-red-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-club-black mb-2 group-hover:text-club-red-accent transition-colors duration-300">Community</h3>
              <p className="text-gray-600">Building strong bonds and lasting friendships within our diverse community</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-club-red-light/20 border border-club-red-subtle hover:border-club-red-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-br from-club-black to-club-red-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-club-black mb-2 group-hover:text-club-red-accent transition-colors duration-300">Excellence</h3>
              <p className="text-gray-600">Striving for excellence both on and off the field through dedication and hard work</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-club-red-light/20 border border-club-red-subtle hover:border-club-red-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-br from-club-black to-club-red-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-club-black mb-2 group-hover:text-club-red-accent transition-colors duration-300">Passion</h3>
              <p className="text-gray-600">Fostering a love for rugby and the values it teaches about teamwork and respect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-club-black mb-4">
              Our <span className="text-club-red-accent">Programs</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer programs for youth of all ages and skill levels, from beginners to competitive players.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-club-red-subtle hover:border-club-red-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div 
                className="h-48 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${rugby2})`
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <span className="text-white text-2xl font-bold relative z-10">U8-U12</span>
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
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-club-red-subtle hover:border-club-red-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div 
                className="h-48 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${rugby1})`
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <span className="text-white text-2xl font-bold relative z-10">U13-U16</span>
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
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-club-red-subtle hover:border-club-red-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <div 
                className="h-48 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${rugby3})`
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <span className="text-white text-2xl font-bold relative z-10">U17+</span>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In <span className="text-club-red-accent">Touch</span></h2>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-club-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Tenderloin Youth <span className="text-club-red-accent">Rugby</span> Club</h3>
            <p className="text-white/80 mb-4">Building champions on and off the field</p>
            <div className="flex justify-center space-x-6">
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
                <h2 className="text-2xl font-bold text-club-black">Join Our <span className="text-club-red-accent">Team</span></h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-red-accent focus:border-club-red-accent focus:shadow-red-glow transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="5"
                    max="18"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-red-accent focus:border-club-red-accent focus:shadow-red-glow transition-all duration-300"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-red-accent focus:border-club-red-accent focus:shadow-red-glow transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-red-accent focus:border-club-red-accent focus:shadow-red-glow transition-all duration-300"
                  />
                  <p className="text-xs text-gray-500 mt-1">* Please provide either email or phone number</p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-red-accent focus:border-club-red-accent focus:shadow-red-glow transition-all duration-300"
                    placeholder="Tell us about yourself, any questions, or special considerations..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 px-4 py-2 border-2 border-club-silver text-club-black rounded-md hover:bg-club-silver-light transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-club-black to-club-red-dark text-white rounded-md hover:from-club-red-dark hover:to-club-black transition-all duration-300 font-semibold shadow-lg border-2 border-club-red-accent transform hover:scale-105"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Smooth Success Notification */}
      {showNotification && (
        <div className={`fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 transition-all duration-500 ease-out ${notificationVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Subtle floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-1/4 left-1/4 w-1 h-1 bg-club-red-accent rounded-full opacity-60 animate-pulse transition-all duration-1000 ${notificationVisible ? 'opacity-60' : 'opacity-0'}`} style={{animationDelay: '0s', animationDuration: '3s'}}></div>
            <div className={`absolute top-1/3 right-1/3 w-1 h-1 bg-club-red-dark rounded-full opacity-40 animate-pulse transition-all duration-1000 ${notificationVisible ? 'opacity-40' : 'opacity-0'}`} style={{animationDelay: '1s', animationDuration: '4s'}}></div>
            <div className={`absolute bottom-1/3 left-1/3 w-1 h-1 bg-club-red-accent rounded-full opacity-50 animate-pulse transition-all duration-1000 ${notificationVisible ? 'opacity-50' : 'opacity-0'}`} style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
            <div className={`absolute bottom-1/4 right-1/4 w-1 h-1 bg-club-red-dark rounded-full opacity-30 animate-pulse transition-all duration-1000 ${notificationVisible ? 'opacity-30' : 'opacity-0'}`} style={{animationDelay: '0.5s', animationDuration: '4.5s'}}></div>
          </div>
          
          <div className={`bg-white rounded-2xl p-8 max-w-md w-full text-center transform transition-all duration-500 ease-out shadow-xl border border-club-red-subtle relative overflow-hidden ${notificationVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-club-red-light/5 via-transparent to-club-red-accent/5"></div>
            
            <div className="relative z-10">
              {/* Elegant success icon */}
              <div className={`w-16 h-16 bg-gradient-to-br from-club-red-accent to-club-red-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-500 hover:scale-105 ${notificationVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <svg className="w-8 h-8 text-white transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Smooth animated title */}
              <h3 className={`text-2xl font-semibold text-club-black mb-3 transition-all duration-700 ease-out ${notificationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                Welcome to the <span className="text-club-red-accent font-bold">Team</span>
              </h3>
              
              {/* Gentle message */}
              <p className={`text-gray-600 mb-6 leading-relaxed transition-all duration-900 ease-out ${notificationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                Thank you for joining TYRC. We're excited to have you on board and will be in touch soon with next steps.
              </p>
              
              {/* Smooth progress indicator */}
              <div className={`w-full bg-gray-100 rounded-full h-1 mb-4 overflow-hidden transition-all duration-1000 ${notificationVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`bg-gradient-to-r from-club-red-accent to-club-red-dark h-1 rounded-full transition-all duration-2000 ease-out ${notificationVisible ? 'w-full' : 'w-0'}`}></div>
              </div>
              
              {/* Subtle loading dots */}
              <div className={`flex justify-center items-center space-x-1 transition-all duration-1000 ${notificationVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-2 h-2 bg-club-red-accent rounded-full opacity-60 animate-pulse" style={{animationDelay: '0s'}}></div>
                <div className="w-2 h-2 bg-club-red-dark rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-club-red-accent rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
