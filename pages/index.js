import React from 'react';
import Link from 'next/link';
import Img from "next/image";
import Layout from '../components/layout';
import Masonry from 'react-masonry-css';
import Modal from '../components/modal';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { movePageScroll } from '../components/navigation';

export default function Index() {
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

    const page = document.querySelector('html');
    const disableScroll = () => {
      page.style.overflow = 'hidden';
    };
    const enableScroll = () => {
      page.style.removeProperty('overflow');
    };

    let overlay;
    let modal;
    let projectlinks = select('.projects-item a', true);
    projectlinks.forEach((projectlink) => {
      if (!projectlink.hash) return;
      projectlink.addEventListener('click', async (event) => {
        event.preventDefault();
        overlay = select(projectlink.hash + " .modal-overlay");
        overlay.style.display = 'block';
        overlay.style.height = document.body.scrollHeight.toString() + 'px';
        overlay.style.opacity = '1';
        modal = select(projectlink.hash + " .modal-container");
        modal.style.top = window.scrollY.toFixed(1).toString() + 'px';
        await wait(300);
        modal.style.opacity = '1';
        modal.style.transform = "translateY(0)";
        disableScroll();
      });
    });

    let closeModalLinks = select('.modal-dismiss', true);
    closeModalLinks.forEach((closeModalLink) => {
      closeModalLink.addEventListener('click', async (event) => {
        event.preventDefault();
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = "translateY(-80%)";
        await wait(300);
        overlay.style.display = 'none';
        modal.style.top = '0';
        enableScroll();
      });
    });

    let modals = select('.modal', true);
    modals.forEach((modal) => {
      modal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    let projectVisitLinks = select('.modal-visit', true);
    projectVisitLinks.forEach((projectVisitLink) => {
      projectVisitLink.addEventListener('click', () => {
        var win = window.open(projectVisitLink.href, '_blank');
        win.focus();
      });
    });

    const intro = async () => {
      let content = "";
      let text = "";
      let index = 0;
      if (select(".intro-content h2")) {
        if (window.innerWidth > 340) content = "Anything is possible\nif you have got enough nerve.";
        else content = "Anything is possible if you have got enough nerve.";
        text = select(".intro-content h2");
        index = 0;
      }
      while (index < content.length) {
        if (!select(".intro-content h2")) break;
        await wait(100);
        let txt = content.charAt(index);
        text.innerHTML += txt === "\n" ? "<br/>" : txt;
        index++;
      }
      if (select('#intro-description')) {
        await wait(1600);
        if (select('#intro-description'))
          fadeOut(select('#intro-description'), true);
      }
      if (select("#intro") && select('#intro-overlay')) {
        await wait(2500);
        if (select("#intro") && select('#intro-overlay')) {
          select("#intro-overlay").style.removeProperty('background');
          select("#intro").style.removeProperty('background');
        }
      }
      if (select("#intro-title") && select('#intro-position')) {
        await wait(350);
        if (select("#intro-title") && select('#intro-position')) {
          show(select('#intro-title'));
          show(select('#intro-position'));
        }
      }
      if (select(".intro-content h5")) {
        content = "Hello, World!";
        text = select(".intro-content h5");
        index = 0;
      }
      if (select("#hw-cursor")) {
        select("#hw-cursor").style.opacity = 1;
        await wait(350);
      }
      while (index < content.length) {
        if (!select(".intro-content h5")) break;
        await wait(175);
        let txt = content.charAt(index);
        text.innerHTML += txt;
        index++;
      }
      if (select('#intro-title')) {
        await wait(400);
        if (select('#intro-title'))
          fadeIn(select('#intro-title'));
      }
      if (select('#intro-position')) {
        await wait(400);
        if (select('#intro-position'))
          fadeIn(select('#intro-position'));
      }
      if (select('#github')) {
        await wait(500);
        if (select('#github'))
          fadeIn(select('#github'));
      }
      if (select('#youtube')) {
        await wait(400);
        if (select('#youtube'))
          fadeIn(select('#youtube'));
      }
      if (select('#email')) {
        await wait(400);
        if (select('#email'))
          fadeIn(select('#email'));
      }
      if (select('#scroll-down')) {
        await wait(750);
        if (select('#scroll-down'))
          fadeIn(select('#scroll-down'), false);
      }
    };

    let contents = [];
    const content = "";
    let i = 0;
    const typing = async () => {
      let text = "";
      if (select(".intro-info .lead")) {
        contents = ["student", "kyllox"];
        text = select("#job");
        content = contents[i].split("");
        while (content.length) {
          if (!select(".intro-info .lead")) break;
          await wait(200);
          text.innerHTML += content.shift();
        }
        await wait(1500);
        remove();
      }
    }

    const remove = async () => {
      let text = "";
      if (select(".intro-info .lead")) {
        text = select("#job");
        content = contents[i].split("");
        while (content.length) {
          if (!select(".intro-info .lead")) break;
          await wait(100);
          content.pop();
          text.innerHTML = content.join("");
        }
        if (contents[i + 1])
          i++;
        else
          i = 0;
        typing();
      }
    };

    let pagescrolls = select('a.page-scroll', true);
    pagescrolls.forEach((pagescroll) => {
      pagescroll.addEventListener('click', (event) => {
        window.scrollTo({
          left: 0,
          top: select(pagescroll.getAttribute('href')).offsetTop,
          behavior: "smooth"
        });
        event.preventDefault();
      });
    });

    const show = (el) => {
      el.style.display = 'block';
    };

    const hide = (el) => {
      el.style.display = 'none';
    };

    const fadeIn = (el, up = true) => {
      show(el);
      if (up) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      } else {
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }
    };

    const fadeOut = async (el, down) => {
      if (el) {
        if (down) {
          el.style.opacity = "0";
          el.style.transform = "translateY(25px)";
        } else {
          el.style.opacity = "0";
        }
        await wait(2000);
        hide(el);
      }
    };

    if (movePageScroll.move) {
      window.scrollTo({
        left: 0,
        top: select(movePageScroll.to).offsetTop,
        behavior: "smooth"
      });
      movePageScroll.move = false;
    }

    setTimeout(() => {
      intro();
    }, 500);
    setTimeout(() => {
      typing();
    }, 2000);
  }, []);
  return (
    <Layout>
      <section id="intro" style={{ background: '#000000' }}>
        <div id="intro-overlay" style={{ background: '#000000' }}></div>
        <div className="intro-content">
          <div className="row">
            <h2 id="intro-description" className="fade-out"></h2>
            <h5></h5><span id="hw-cursor" style={{ opacity: '0' }}></span>
            <div id="intro-title" style={{ display: 'none' }} className='fade-in'>
              <h1>I am Kyllox.</h1>
            </div>
            <div id="intro-position" style={{ display: 'none' }} className='fade-in'>
              <p>
                <span>Front-End / Game Developer</span>
              </p>
            </div>
          </div>
          <div id="scroll-down" className="arrow-down fade-in" style={{ display: 'none' }}>
            <a href="#about" className="page-scroll"><FontAwesomeIcon icon={faAnglesDown} /></a>
          </div>
        </div>
        <ul className="intro-social">
          <div id="github" className='fade-in'>
            <li><a href="https://github.com/KylloxStudio"><FontAwesomeIcon icon={faGithub} /></a></li>
          </div>
          <div id="youtube" className='fade-in'>
            <li><a href="https://www.youtube.com/channel/UCd2bfrmZWJ52sQjFDGZKeXQ"><FontAwesomeIcon icon={faYoutube} /></a></li>
          </div>
          <div id="email" className='fade-in'>
            <li><Link href="/contact" passHref><a><FontAwesomeIcon icon={faTwitter} /></a></Link></li>
          </div>
        </ul>
      </section>

      <section id="about">
        <div className="row section-intro">
          <div className="col-twelve">
            <h5>About</h5>
            <h1>HI, there! 👋</h1>
            <div className="intro-info">
              <p className="lead">I am a <span id="job"></span> who dreams of becoming a developer.<br />I'm still lacking a lot, but I'm trying hard and growing!</p>
            </div>
          </div>
        </div>
        <div className="row about-content">
          <div className="col-six tab-full profile">
            <h3>Profile</h3>
            <ul className="info-list">
              <li>
                <strong>FullName:</strong>
                <span>Jung Ji Min</span>
              </li>
              <li>
                <strong>NickName:</strong>
                <span>Kyllox</span>
              </li>
              <li>
                <strong>Job:</strong>
                <span>Student, Developer</span>
              </li>
              <li>
                <strong>Portfolio:</strong>
                <span>kyllox.tech</span>
              </li>
              <li>
                <strong>Email:</strong>
                <span>kyllox4804@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="col-six tab-full skills">
            <h3>Skills</h3>
            <ul className="skill-bars">
              <li>
                <div className="progress percent80"><span>80%</span></div>
                <strong>Front-End</strong>
              </li>
              <li>
                <div className="progress percent70"><span>70%</span></div>
                <strong>C#</strong>
              </li>
              <li>
                <div className="progress percent60"><span>60%</span></div>
                <strong>C++</strong>
              </li>
              <li>
                <div className="progress percent55"><span>55%</span></div>
                <strong>Python</strong>
              </li>
              <li>
                <div className="progress percent40"><span>40%</span></div>
                <strong>Back-End</strong>
              </li>
            </ul>
          </div>
        </div>
        <div className="row button-section">
          <div className="col-twelve">
            <Link href="/contact" passHref><a className="button stroke">Contact Me</a></Link>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="row section-intro">
          <div className="col-twelve">
            <h5>Projects</h5>
            <h1>Check Out Some of My Works.</h1>
          </div>
        </div>
        <div className="row projects-content">
          <div className="col-twelve">
            <Masonry breakpointCols={2} className="projects-wrapper" columnClassName="projects-item-wrap">
              <div className="projects-item">
                <Img src="/images/durango-studio.jpg" width={1440} height={755} onLoadingComplete={() => document.querySelector('.projects-item .loading').remove()} alt="DurangoStudio" />
                <div className="loading" />
                <a href="#durango-studio" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Durango Studio</h3>
                      <span className="projects-types">Web Front-End</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-airballoon.png" width={1440} height={837} onLoadingComplete={() => document.querySelector('.projects-item .loading').remove()} alt="DurangoAirballoon" />
                <div className="loading" />
                <a href="#durango-v2" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">DurangoV2</h3>
                      <span className="projects-types">Unity C#</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-pet.png" width={1440} height={755} onLoadingComplete={() => document.querySelector('.projects-item .loading').remove()} alt="DurangoPet" />
                <div className="loading" />
                <a href="#durango-v2" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Durango_V2</h3>
                      <span className="projects-types">Unity C#</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-combat.png" width={1440} height={838} onLoadingComplete={() => document.querySelector('.projects-item .loading').remove()} alt="DurangoCombat" />
                <div className="loading" />
                <a href="#durango-v2" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Durango_V2</h3>
                      <span className="projects-types">Unity C#</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/what-studio.png" width={1440} height={960} onLoadingComplete={() => document.querySelector('.projects-item .loading').remove()} alt="WhatStudio" />
                <div className="loading" />
                <a href="#what-studio" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">What Studio</h3>
                      <span className="projects-types">Web Front-End</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-sailing.jpg" width={1440} height={838} onLoadingComplete={() => document.querySelector('.projects-item .loading').remove()} alt="DurangoSailing" />
                <div className="loading" />
                <a href="#durango-v2" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Durango_V2</h3>
                      <span className="projects-types">Unity C#</span>
                    </div>
                  </div>
                </a>
              </div>
            </Masonry>
          </div>
        </div>
      </section>
      <div id="durango-studio">
        <Modal>
          <div className="media">
            <Img src="/images/durango-main.png" width={2160} height={1130} onLoadingComplete={() => document.querySelector('#durango-studio .loading').remove()} alt="DurangoStudio" />
            <div className="loading" />
          </div>
          <div className="description-box">
            <h4>Durango Studio</h4>
            <p>Kyllox's Durango Studio. I upload the news of Durango development this website.</p>
            <div className="categories">Web Development</div>
          </div>
          <div className="link-box">
            <a href="https://durango.kyllox.tech" target="_blank" className="modal-visit">Visit WebSite</a>
            <a className="modal-dismiss">Close</a>
          </div>
        </Modal>
      </div>
      <div id="durango-v2">
        <Modal>
          <div className="media">
            <Img src="/images/durango-project.jpg" width={1439} height={750} onLoadingComplete={() => document.querySelector('#durango-v2 .loading').remove()} alt="DurangoV2" />
            <div className="loading" />
          </div>
          <div className="description-box">
            <h4>Durango_V2</h4>
            <p>This is Kyllox's New Durango. I'm developing Durango as a solo play game.</p>
            <div className="categories">Game Development</div>
          </div>
          <div className="link-box">
            <a href="https://github.com/KylloxStudio/Durango_V2" target="_blank" className="modal-visit">Visit WebSite</a>
            <a className="modal-dismiss">Close</a>
          </div>
        </Modal>
      </div>
      <div id="what-studio">
        <Modal>
          <div className="media">
            <Img src="/images/what-studio.png" width={1440} height={960} onLoadingComplete={() => document.querySelector('#what-studio .loading').remove()} alt="WhatStudio" />
            <div className="loading" />
          </div>
          <div className="description-box">
            <h4>What! Studio</h4>
            <p>This is a website that restored the website of What Studio, which is now disbanded. You can see the NDC of What Studio here.</p>
            <div className="categories">Web Development</div>
          </div>
          <div className="link-box">
            <a href="https://what.kyllox.tech" target="_blank" className="modal-visit">Visit WebSite</a>
            <a className="modal-dismiss">Close</a>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}