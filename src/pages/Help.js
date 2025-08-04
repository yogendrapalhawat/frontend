import React, { useState } from 'react';
import '../styles/help.css'; // ✅ Shared styles
import {
  Mail,
  MessageCircle,
  Phone,
  Clock,
  ChevronRight,
  Search,
  BookOpen,
  Users,
  Shield
} from 'lucide-react';

const Help = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [searchQuery, setSearchQuery] = useState('');

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@oneportal.com",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      contact: "Available 24/7",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+1 (555) 123-4567",
      color: "from-orange-500 to-red-600"
    }
  ];

  const quickLinks = [
    { icon: <BookOpen className="w-5 h-5" />, title: "Documentation", desc: "Comprehensive guides and tutorials" },
    { icon: <Users className="w-5 h-5" />, title: "Community Forum", desc: "Connect with other users" },
    { icon: <Shield className="w-5 h-5" />, title: "Security Center", desc: "Learn about our security practices" },
    { icon: <Clock className="w-5 h-5" />, title: "Status Page", desc: "Check system status and uptime" }
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to Settings > Account > Change Password or use the 'Forgot Password' link on the login page."
    },
    {
      question: "How can I upgrade my plan?",
      answer: "Visit your Account Settings and click on 'Upgrade Plan' to see available options."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and follow industry best practices for data security."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export your data from Settings > Data Management > Export Data."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-wrapper">
      <div className="help-container">
        {/* Header */}
        <div className="help-header">
          <div className="help-icon">
            <MessageCircle className="icon-white" />
          </div>
          <h1 className="help-title">
            How can we <span className="highlight-text">help you?</span>
          </h1>
          <p className="help-subtitle">
            Get instant support, find answers, or connect with our expert team
          </p>
        </div>

        {/* Tabs */}
        <div className="help-tabs">
          {[
            { id: 'contact', label: 'Contact Us', icon: <Mail className="w-4 h-4" /> },
            { id: 'faq', label: 'FAQ', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'resources', label: 'Resources', icon: <Users className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`help-tab ${activeTab === tab.id ? 'active-tab' : ''}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="contact-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-card group">
                <div className={`contact-icon ${method.color}`}>
                  {method.icon}
                </div>
                <h3 className="contact-title">{method.title}</h3>
                <p className="contact-desc">{method.description}</p>
                <div className="contact-footer">
                  <span className="contact-info">{method.contact}</span>
                  <ChevronRight className="arrow-icon" />
                </div>
              </div>
            ))}
            <div className="live-chat-banner">
              <h3>Need Immediate Help?</h3>
              <p>Our support team is standing by to assist you</p>
              <button className="live-chat-button">Start Live Chat</button>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="faq-section">
            <div className="faq-search-wrapper">
              <Search className="faq-search-icon" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
              />
            </div>

            <div className="faq-list">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
              {filteredFAQs.length === 0 && (
                <div className="no-faq-found">
                  <Search className="w-12 h-12 mx-auto text-gray-400" />
                  <p>No FAQs found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="resources-grid">
            {quickLinks.map((link, index) => (
              <div key={index} className="resource-card group">
                <div className="resource-icon">{link.icon}</div>
                <div className="resource-content">
                  <h3 className="resource-title">{link.title}</h3>
                  <p className="resource-desc">{link.desc}</p>
                </div>
                <ChevronRight className="arrow-icon" />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="help-footer">
          <p>Still need help? We're here for you 24/7</p>
          <div className="footer-stats">
            <span>Response time: &lt; 2 hours</span>
            <span>•</span>
            <span>99.9% Customer satisfaction</span>
            <span>•</span>
            <span>Available in 15+ languages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
