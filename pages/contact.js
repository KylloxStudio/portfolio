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
    function wait(ms) {
      return new Promise(res => setTimeout(res, ms));
    }

    const select = (el, all = false) => {
      el = el.trim().replace('/', '');
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

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

    select('html').style.background = '#151515';
  }, []);
  const sendEmail = (e) => {
    e.preventDefault();
    let loader = select('#submit-loader');
    fadeIn(loader);
    emailjs.sendForm('service_kyllox', 'template_kyllox', form.current, 'user_ObDVdiMQlk2RAhavouTNx').then((response) => {
      fadeOut(loader);
      hide(select('#message-warning'));
      fadeOut(select('#contact-form'));
      select('#message-success').innerHTML = "<i className='fa fa-check'></i>이메일을 성공적으로 전송했습니다. 작성해주신 이메일 주소로 답변이 전송됩니다.</p><br>" + "<p>" + response.status + "</p>" + " " + response.text;
      fadeIn(select('#message-success'));
      hide(select('#message-warning'));
    }, function (e) {
      fadeOut(loader);
      select('#message-warning').innerHTML = "<i className='fa fa-xmark'></i>이메일 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.<br>" + "<p>" + e.status + "</p>" + " " + e.text;
      fadeIn(select('#message-warning'));
    });
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
                  <input type="text" name="title" className="form-control" placeholder="Title" required />
                </div>
                <div className="form-field">
                  <input type="text" name="name" className="form-control" placeholder="Name" required />
                </div>
                <div className="form-field">
                  <input type="text" name="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="form-field">
                  <textarea name="message" className="form-control" placeholder="Message" required></textarea>
                </div>
                <div className="form-field">
                  <ReCAPTCHA className="g-recaptcha" sitekey="6LePCCMcAAAAAE0F2XW3lp0H0LuFjRlE-UXlZkcu" />
                  <div id="error-label"></div>
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