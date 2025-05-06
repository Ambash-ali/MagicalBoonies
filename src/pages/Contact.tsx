import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';

// Formspree form ID
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const FAQS = [
  {
    question: 'What is the best time to visit East Africa?',
    answer: 'The best time for wildlife viewing is during the dry seasons (June to October and January to February). The wildebeest migration in Masai Mara occurs between July and October.'
  },
  {
    question: 'How many days do I need for a safari?',
    answer: 'We recommend at least 4-5 days for a good safari experience. This allows time to visit multiple locations and maximize wildlife viewing opportunities.'
  },
  {
    question: 'What should I pack for a safari?',
    answer: 'Essential items include neutral-colored clothing, sun protection, comfortable walking shoes, binoculars, and a camera. We provide a detailed packing list before your trip.'
  },
  {
    question: 'Are your safaris family-friendly?',
    answer: 'Yes, we offer family-friendly safaris with accommodations and activities suitable for all ages. We recommend safaris for children aged 6 and above.'
  }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const compiledMessage = `
        Subject: ${formData.subject}
        Phone: ${formData.phone}
        Message: ${formData.message}
      `;
  
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: compiledMessage.trim()
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send form');
      }
  
      toast.success("Thank you for your message. We'll be in touch soon!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Magical Boonies</title>
        <meta 
          name="description" 
          content="Get in touch with our safari experts to plan your perfect East African wildlife adventure. We're here to answer your questions and help create your dream safari."
        />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/b1.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-white mb-8 max-w-2xl">
                Get in touch with our safari experts to start planning your perfect East African adventure.
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="Safari Inquiry">Safari Inquiry</option>
                      <option value="Booking Question">Booking Question</option>
                      <option value="Package Information">Package Information</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <Button 
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  rightIcon={<Send size={16} />}
                >
                  Send Message
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin size={20} className="text-amber-600 mr-3 mt-1" />
                    <div>
                      <strong className="block">Address</strong>
                      <p className="text-gray-600">
                        Wildlife Towers, Kenyatta Avenue<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone size={20} className="text-amber-600 mr-3 mt-1" />
                    <div>
                      <strong className="block">Phone</strong>
                      <a href="tel:+254712345678" className="text-gray-600 hover:text-amber-600">
                        +254 712 345 678
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail size={20} className="text-amber-600 mr-3 mt-1" />
                    <div>
                      <strong className="block">Email</strong>
                      <a href="mailto:info@safaridreams.com" className="text-gray-600 hover:text-amber-600">
                        info@safaridreams.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock size={20} className="text-amber-600 mr-3 mt-1" />
                    <div>
                      <strong className="block">Office Hours</strong>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {FAQS.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-bold mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;