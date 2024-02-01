import React, { useState } from 'react';
import Link from 'next/link';
import Img from "next/image";
import Layout from '../components/layout';
import Masonry from 'react-masonry-css';
import Typewriter from 'typewriter-effect';
import TypewriterCore from 'typewriter-effect/dist/core';
import { $, wait, show, fadeIn, fadeOut, disableScroll, enableScroll } from '../components/functions';
import Modal from '../components/modal';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Intro } from '../components/intro';
import { movePageScroll } from '../components/navigation';

export default function Index() {
  useEffect(() => {
    let overlay;
    let modal;
    let projectlinks = $('.projects-item a', true);
    projectlinks.forEach((projectlink) => {
      if (!projectlink.hash) return;
      projectlink.addEventListener('click', async (event) => {
        event.preventDefault();
        overlay = $(projectlink.hash + " .modal-overlay");
        overlay.style.display = 'block';
        overlay.style.height = document.body.scrollHeight.toString() + 'px';
        overlay.style.opacity = '1';
        modal = $(projectlink.hash + " .modal-container");
        modal.style.top = window.scrollY.toFixed(1).toString() + 'px';
        await wait(300);
        modal.style.opacity = '1';
        modal.style.transform = "translateY(0)";
        disableScroll();
      });
    });

    let closeModalLinks = $('.modal-dismiss', true);
    closeModalLinks.forEach((closeModalLink) => {
      closeModalLink.addEventListener('click', async (event) => {
        event.preventDefault();
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = "translateY(-100%)";
        await wait(300);
        overlay.style.display = 'none';
        modal.style.top = '0';
        enableScroll();
      });
    });

    let modals = $('.modal', true);
    modals.forEach((modal) => {
      modal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    let projectVisitLinks = $('.modal-visit', true);
    projectVisitLinks.forEach((projectVisitLink) => {
      projectVisitLink.addEventListener('click', () => {
        var win = window.open(projectVisitLink.href, '_blank');
        win.focus();
      });
    });

    // const infoContents = ["developer", ""];
    // let infoContentIndex = 0;
    // const typingInfo = async () => {
    //   if ($(".intro-info .lead")) {
    //     const text = $("#job");
    //     const infoContent = infoContents[infoContentIndex].split("");
    //     await wait(150);
    //     while (infoContent.length) {
    //       if (!$(".intro-info .lead")) {
    //         setIsInfoTyping(false);
    //         break;
    //       }
    //       await wait(150);
    //       text.innerHTML += infoContent.shift();
    //     }
    //     await wait(3500);
    //     await removeInfo();
    //   }
    // };

    // const removeInfo = async () => {
    //   if ($(".intro-info .lead")) {
    //     const text = $("#job");
    //     const infoContent = infoContents[infoContentIndex].split("");
    //     while (infoContent.length) {
    //       if (!$(".intro-info .lead")) {
    //         setIsInfoTyping(false);
    //         break;
    //       }
    //       await wait(100);
    //       infoContent.pop();
    //       text.innerHTML = infoContent.join("");
    //     }
    //     if (infoContents[infoContentIndex + 1]) {
    //       infoContentIndex++;
    //     } else {
    //       infoContentIndex = 0;
    //     }
    //     await wait(500);
    //     await typingInfo();
    //   }
    // };

    if (movePageScroll.move) {
      window.scrollTo({
        left: 0,
        top: $(movePageScroll.to).offsetTop,
        behavior: "smooth"
      });
      movePageScroll.move = false;
    }

    setTimeout(() => {
      Intro();
    }, 500);
  }, []);
  return (
    <Layout>
      <section id="intro" style={{ background: '#000000' }}>
        <div id="intro-overlay" style={{ background: '#000000' }}></div>
        <div className="intro-content">
          <div className="row">
            <h2 className="fade-out"><Typewriter onInit={(typewriter) => {
              typewriter.pauseFor(350)
              .changeDelay(100)
              .typeString('Anything is possible<br>if you have got enough nerve.')
              .callFunction(() => {
                $('.intro-content h2').classList.add("active");
              }).start();
            }} options={{ cursor: '' }} /></h2>
            <h5 style={{ display: 'none' }}><Typewriter /></h5>
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
          <div id="twitter" className='fade-in'>
            <li><a href="https://twitter.com/lafleur3509"><FontAwesomeIcon icon={faTwitter} /></a></li>
          </div>
        </ul>
      </section>

      <section id="about">
        <div className="row section-intro">
          <div className="col-twelve">
            <h5>About</h5>
            <h1>HI, there! 👋</h1>
            <div className="intro-info">
              <div className="lead">
                <span>I am a </span><Typewriter onInit={(typewriter) => {
                  typewriter.pauseFor(100)
                  .changeDelay(125)
                  .typeString('developer')
                  .pauseFor(3500)
                  .deleteAll(75)
                  .typeString('')
                  .pauseFor(3500)
                  .start();
                }} options={{
                  cursor: '',
                  autoStart: true,
                  loop: true
                }} /><span> who dreams and pursues the future.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row about-content">
          <div className="col-six tab-full profile">
            <h3>Profile</h3>
            <ul className="info-list">
              <li>
                <strong>NickName:</strong>
                <span>Kyllox, LafleurN</span>
              </li>
              <li>
                <strong>Job:</strong>
                <span>Developer</span>
              </li>
              <li>
                <strong>Portfolio:</strong>
                <span><a href='https://kyllox.pe.kr'>kyllox.pe.kr</a></span>
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
                <div className="progress percent85"><span>85%</span></div>
                <strong>Front-End</strong>
              </li>
              <li>
                <div className="progress percent90"><span>90%</span></div>
                <strong>C#</strong>
              </li>
              <li>
                <div className="progress percent60"><span>60%</span></div>
                <strong>Python</strong>
              </li>
              <li>
                <div className="progress percent50"><span>50%</span></div>
                <strong>PHP</strong>
              </li>
              <li>
                <div className="progress percent40"><span>40%</span></div>
                <strong>C++</strong>
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
            <a href="https://durango.kyllox.pe.kr" target="_blank" className="modal-visit">Visit WebSite</a>
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
            <a href="http://db.kyllox.pe.kr/archive/what-studio/" target="_blank" className="modal-visit">Visit WebSite</a>
            <a className="modal-dismiss">Close</a>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}