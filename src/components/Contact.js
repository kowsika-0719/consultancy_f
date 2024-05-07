import React from 'react';
import './Contact.css';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
// import emailjs from 'emailjs-com';



const ContactPage = () => {
  const form=useRef()
  const contactRef = useRef()
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_n40g7eu', 'template_darfk0j', form.current, 'htT3k18IuGjFfdIoo')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  };

  return (
   
    <div ref={contactRef} className="contact-container">
      <h5 className='animated-underline'>Contact Us </h5>
      <form ref={form}
      onSubmit = {sendEmail}>
      <div className="input-row">
        <input type="text" name="user_name" placeholder="  Your Name" required className="name-input" />
        <input type="text"  name ="contact_no" placeholder="  Contact No" required className="contact-input" />
      </div>
      <div className="input-row">
        <input type="text" name ="user_email" placeholder="  Email" required className="email-input" />
        <input type="text" name ="sub" placeholder="  Subject" required className="sub-input" />
      </div>
      <div className="input-row">
        <input type="text" name ="message" placeholder="  Message" required className="msg-input" />
      </div>
      <div className="button-container">
        <a href="/Home">
        <button type="submit" className="submit-button">Send Message</button>
        </a>
      </div>
      </form>

    </div>
  );
};

export default ContactPage;

