import React from 'react';
import Link from 'next/link';
import Img from "next/image";
import Layout from '../components/layout';
import Masonry from 'react-masonry-css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { movePageScroll } from '../components/navigation';

export default function Intro() {
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

    const intro = async () => {
      let content = "";
      let text = "";
      let index = 0;
      if (select(".intro-content h2")) {
        content = "Anything is possible if you have got enough nerve.";
        text = select(".intro-content h2");
        index = 0;
      }
      while (index < content.length) {
        if (!select(".intro-content h2")) break;
        await wait(100);
        let txt = content.charAt(index);
        text.innerHTML += txt;
        index++;
      }
      if (select('#intro-description')) {
        await wait(1250);
        if (select('#intro-description'))
          fadeOut(select('#intro-description'), true);
      }
      if (select("#intro") && select('#intro-overlay')) {
        await wait(2000);
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
            <h2 id="intro-description"></h2>
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
                <strong>WebSite:</strong>
                <span>kyllox.studio</span>
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
                <Img src="/images/durango-studio.jpg" width={1440} height={755} onLoadingComplete={() => document.querySelector('.loading').remove()} alt="DurangoStudio" />
                <div className="loading" />
                <a href="https://durango.kyllox.studio" target="_blank" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Durango Studio</h3>
                      <span className="projects-types">Web Front-End</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-airballoon.png" width={1440} height={837} onLoadingComplete={() => document.querySelector('.loading').remove()} alt="DurangoAirballoon" />
                <div className="loading" />
                <a href="https://github.com/KylloxStudio/Durango_V2" target="_blank" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">DurangoV2</h3>
                      <span className="projects-types">Unity C#</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-pet.png" width={1440} height={755} onLoadingComplete={() => document.querySelector('.loading').remove()} alt="DurangoPet" />
                <div className="loading" />
                <a href="https://github.com/KylloxStudio/Durango_V2" target="_blank" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Durango_V2</h3>
                      <span className="projects-types">Unity C#</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-combat.png" width={1440} height={838} onLoadingComplete={() => document.querySelector('.loading').remove()} alt="DurangoCombat" />
                <div className="loading" />
                <a href="https://github.com/KylloxStudio/Durango_V2" target="_blank" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Durango_V2</h3>
                      <span className="projects-types">Unity C#</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/what-studio.png" width={1440} height={960} onLoadingComplete={() => document.querySelector('.loading').remove()} alt="WhatStudio" />
                <div className="loading" />
                <a href="https://what.kyllox.studio" target="_blank" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">What Studio</h3>
                      <span className="projects-types">Web Front-End</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/durango-sailing.jpg" width={1440} height={838} onLoadingComplete={() => document.querySelector('.loading').remove()} alt="DurangoSailing" />
                <div className="loading" />
                <a href="https://github.com/KylloxStudio/Durango_V2" target="_blank" className="overlay">
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
    </Layout>
  );
}
