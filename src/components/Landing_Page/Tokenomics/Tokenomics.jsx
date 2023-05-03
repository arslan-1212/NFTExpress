import React from 'react'
import ContactSocial from './contact-social/ContactSocial'
import './contact.css'

function Tokenomics() {
  return (
    <div>
       <ContactSocial/>
      <section id="contact">
        <form >
          <div className="form-inputs hm_inpt">
              <input type="text" name="firstname" placeholder="First Name" required/>
              <input type="text" name="lastname" placeholder="Last Name" required/>
          </div>
          <div className="form-inputs hm_inpt">
              <input type="text" name="phone" placeholder="Phone" required/>
              <input type="text" name="website" placeholder="Website" required/>
          </div>
          <textarea name="message" placeholder="Message" required></textarea>
          <div className="form-btn">
              <input type="submit" value="Send"/>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Tokenomics