import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  const form = useRef();
  useEffect(() => {
    document.querySelector('html').style.background = '#151515';
  }, []);
  function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  const show = (el) => {
    el.style.display = 'block';
  };

  const hide = (el) => {
    el.style.display = 'none';
  };

  const fadeIn = (el, up = false) => {
    show(el);
    if (up) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    } else {
      el.style.transform = "translateY(0)";
      el.style.opacity = "1";
    }
  };

  const fadeOut = async (el, down = false) => {
    if (el) {
      let opacity = Number(window.getComputedStyle(el).getPropertyValue("opacity"));
      let top = 0;
      while (opacity > 0 && opacity <= 1) {
        if (!el) break;
        await wait(50);
        opacity -= 0.1;
        el.style.opacity = opacity.toString();
        if (down) {
          await wait(50);
          el.style.top = top.toString() + 'px';
          top += 3.3;
        }
      }
      hide(el);
    }
  };

  const select = (el, all = false) => {
    el = el.trim().replace('/', '');
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    let pass = [false, false, false, false, false];
    select('.error-label', true).forEach((label) => {
      label.innerHTML = "";
    });
    document.getElementsByName('title').forEach((input) => {
      if (input.value == null || input.value == "") {
        pass[0] = false;
        select('.error-label', true)[0].innerHTML = "<label class='error' for='#'>Please Enter a Title.</label>";
      } else {
        pass[0] = true;
      }
    });
    document.getElementsByName('name').forEach((input) => {
      if (input.value == null || input.value == "") {
        pass[1] = false;
        select('.error-label', true)[1].innerHTML = "<label class='error' for='#'>Please Enter Your Name.</label>";
      } else {
        pass[1] = true;
      }
    });
    document.getElementsByName('email').forEach((input) => {
      if (input.value == null || input.value == "") {
        pass[2] = false;
        select('.error-label', true)[2].innerHTML = "<label class='error' for='#'>Please Enter Your Email.</label>";
      }
      let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if (!regEmail.test(input.value)) {
        pass[2] = false;
        select('.error-label', true)[2].innerHTML = "<label class='error' for='#'>Please Enter a Valid Email.</label>";
      } else {
        pass[2] = true;
      }
    });
    document.getElementsByName('message').forEach((input) => {
      if (input.value == null || input.value == "") {
        pass[3] = false;
        select('.error-label', true)[3].innerHTML = "<label class='error' for='#'>Please Enter the Messages.</label>";
      } else {
        pass[3] = true;
      }
    });
    if (select('#g-recaptcha-response').value == null || select('#g-recaptcha-response').value == "") {
      pass[4] = false;
      select('.error-label', true)[4].innerHTML = "<label class='error' for='#'>Please Proceed With reCAPTCHA Certification.</label>";
    } else {
      pass[4] = true;
    }
    if (pass[0] && pass[1] && pass[2] && pass[3] && pass[4]) {
      select('.error-label', true).forEach((label) => {
        label.remove();
      });
      let loader = select('#submit-loader');
      fadeIn(loader);
      emailjs.sendForm('service_kyllox', 'template_kyllox', form.current, 'user_ObDVdiMQlk2RAhavouTNx').then((response) => {
        fadeOut(loader);
        hide(select('#message-warning'));
        fadeOut(select('#contact-form'));
        select('#message-success').innerHTML = "<i className='fa fa-check'></i>The message was sent successfully. The answer will be sent to the email address you filled out.</p><br>" + "<p>" + response.status + "</p>" + " " + response.text;
        fadeIn(select('#message-success'));
        hide(select('#message-warning'));
      }, function (e) {
        fadeOut(loader);
        fadeOut(select('#contact-form'));
        select('#message-warning').innerHTML = "<i className='fa fa-xmark'></i>Failed to send message. Please try again in a few minutes.<br>" + "<p>" + e.status + "</p>" + " " + e.text;
        fadeIn(select('#message-warning'));
      });
    }
  };
  return (
    <Layout>
      <div>
        <section id="contact">
          <div className="row contact-content">
            <div className="col-twelve">
              <h5>Contact</h5>
              <h1>I'd Love To Hear From You.</h1>
              <form ref={form} id="contact-form" name="contact-form" className="contact-form" onSubmit={sendEmail}>
                <div className="form-field">
                  <input type="text" name="title" className="form-control" placeholder="Title" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <input type="text" name="name" className="form-control" placeholder="Name" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <input type="text" name="email" className="form-control" placeholder="Email" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <textarea name="message" className="form-control" placeholder="Message"></textarea>
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <ReCAPTCHA className="g-recaptcha" sitekey="6LePCCMcAAAAAE0F2XW3lp0H0LuFjRlE-UXlZkcu" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <input type="submit" name="submit" className="submit" value="Send" />
                </div>
                <div id="submit-loader">
                  <div className="text-loader">Sending...</div>
                  <div className="s-loader">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                </div>
              </form>
              <div id="message-success"></div>
              <div id="message-warning"></div>
            </div>
          </div>
        </section>

        <footer id="copyright">
          <div className="row">
            <div className="col-six tab-full">
              <p className="fl_left text">Kyllox &copy; 2021. All Rights Reserved.</p>
            </div>
            <div className="col-six tab-full pull-right social">
              <ul className="footer-social">
                <li><a href="https://github.com/KylloxStudio"><FontAwesomeIcon icon={faGithub} /></a></li>
                <li><a href="https://www.youtube.com/channel/UCd2bfrmZWJ52sQjFDGZKeXQ"><FontAwesomeIcon icon={faYoutube} /></a></li>
                <li><a href="https://twitter.com/KylloxStudio"><FontAwesomeIcon icon={faTwitter} /></a></li>
              </ul>
              <button id="donate">
                <a href="https://toss.me/kyllox">
                  <span aria-label="coffee"><FontAwesomeIcon icon={faMugHot} /></span>
                  <span>커피 한 잔 선물하기</span>
                </a>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}