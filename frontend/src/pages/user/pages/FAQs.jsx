import React from "react";
import "../styles/styles.css";

const FAQs = () => {
  const faqData = [
    {
      question: "What is the Techno Clubs Portal?",
      answer: "The Techno Clubs Portal is an all-in-one digital platform designed to streamline student organization management, including club enrollments, event planning, credit tracking, and collaboration."
    },
    {
      question: "How do I register for the platform?",
      answer: "To register, go to the 'Register' page from the navigation bar, fill in your details, and create an account. Once registered, you can explore clubs and events."
    },
    {
      question: "How can I join a club?",
      answer: "Once you log in, navigate to the 'Clubs' section, browse through available clubs, and click the 'Join' button. Some clubs may require approval from the admin."
    },
    {
      question: "What are the benefits of joining a club?",
      answer: "By joining a club, you can network with peers, participate in events, earn credits for contributions, and enhance your skills in a structured learning environment."
    },
    {
      question: "How does the AI-driven credit system work?",
      answer: "The system tracks your participation, including event attendance and contributions. Based on predefined rules, it assigns credits which can be used for incentives or recognition."
    },
    {
      question: "Can I create my own club?",
      answer: "Yes! If you want to create a new club, go to the 'Club Management' section and submit a request. A system admin will review and approve it."
    },
    {
      question: "How do I register for events?",
      answer: "Visit the 'Events' section, browse upcoming events, and click 'Register' for the ones you're interested in. You'll receive event details and reminders."
    },
    {
      question: "How can I track my participation in clubs and events?",
      answer: "Your dashboard will show all the clubs you've joined, events you've attended, and your accumulated credits. You can also download reports for reference."
    },
    {
      question: "Is my data secure on this platform?",
      answer: "Yes! The platform uses encrypted authentication, role-based access control, and strict data privacy policies to ensure security."
    },
    {
      question: "Can I interact with other students on this platform?",
      answer: "Absolutely! Use the 'Community Forum' to ask questions, share ideas, and discuss various topics with other members."
    },
    {
      question: "How do I contact support if I face issues?",
      answer: "You can reach out to the support team through the 'Contact Us' section or email us at support@technoclubs.com."
    },
    {
      question: "Can club admins assign roles to members?",
      answer: "Yes, club admins can assign roles like Event Manager, Content Creator, or Treasurer to manage operations efficiently."
    },
    {
      question: "How do I post in the Community Forum?",
      answer: "Simply go to the 'Community Forum' section, enter your discussion title, add details, and click 'Post Discussion' to share your thoughts."
    }
  ];

  return (
    <div className="container-fluid px-4 mt-5">
      <h1 className="text-center mb-4">❓ Frequently Asked Questions (FAQs)</h1>
      <p className="text-center">Find answers to the most common questions about the Techno Clubs Portal.</p>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="accordion" id="faqAccordion">
            {faqData.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div 
                  id={`collapse${index}`} 
                  className="accordion-collapse collapse" 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
