import React from 'react';
import Link from 'next/link';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faAngleRight, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
export let movePageScroll = {
  move: false,
  to: ''
};

export default function Navigation() {
  const router = useRouter();
  useEffect(() => {
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    const scrollToY = (scrollTargetY, speed, easing) => {
      var scrollY = window.scrollY,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;
      var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));
      // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
      const PI_D2 = Math.PI / 2,
        easingEquations = {
          easeOutSine: function (pos) {
            return Math.sin(pos * (Math.PI / 2));
          },
          easeInOutSine: function (pos) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
          },
          easeInOutQuint: function (pos) {
            if ((pos /= 0.5) < 1) {
              return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
          }
        };

      function tick() {
        currentTime += 1 / 60;
        var p = currentTime / time;
        var t = easingEquations[easing](p);
        if (p < 1) {
          requestAnimFrame(tick);
          window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
          window.scrollTo(0, scrollTargetY);
        }
      }
      tick();
    }

    const show = (el) => {
      el.style.display = 'block';
    };

    const hide = (el) => {
      el.style.display = 'none';
    };

    const toggle = (el) => {
      if (el.style.display == "none")
        show(el);
      else
        hide(el);
    };

    const toggleClass = (el, css) => {
      if (!el.classList.contains(css)) {
        el.classList.add(css);
      } else {
        el.classList.remove(css);
      }
    };

    const slideUp = (target, duration = 500) => {
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.boxSizing = 'border-box';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
      }, duration);
    };

    const slideDown = (target, duration = 500) => {
      target.style.removeProperty('display');
      let display = window.getComputedStyle(target).display;
      if (display === 'none') display = 'block';
      target.style.display = display;
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.boxSizing = 'border-box';
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
      }, duration);
    };

    const slideToggle = (target, duration = 500) => {
      if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
      } else {
        return slideUp(target, duration);
      }
    };

    function getAbsPosY(el) {
      let clientRect = el.getBoundingClientRect();
      let relativeTop = clientRect.top;
      let scrolledTopLength = window.pageYOffset;
      let absoluteTop = scrolledTopLength + relativeTop;
      return absoluteTop;
    }

    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener);
    };

    let dropLinks = select("#mainnav li li>a", true);
    onscroll(window, () => {
      if (getAbsPosY(select("#header")) > 50) {
        select(".fixed-top").classList.add("header-scrolled");
        select(".slide-menu-container").style.top = "60px";
        select(".drop-menu").style.paddingTop = "43px";
        dropLinks.forEach((dropLink) => {
          dropLink.style.background = "rgba(0, 0, 0, 0.85)";
        });
      } else {
        select(".fixed-top").classList.remove("header-scrolled");
        select(".slide-menu-container").style.top = "70px";
        select(".drop-menu").style.paddingTop = "33px";
        dropLinks.forEach((dropLink) => {
          dropLink.style.background = "transparent";
        });
      }
    });

    let pagelinks = select('a.page-link', true);
    pagelinks.forEach((pagelink) => {
      pagelink.addEventListener('click', (event) => {
        if (router.route != '/') {
          event.preventDefault();
          let attr = '#' + pagelink.innerText.toLowerCase();
          scrollToY(select(attr).offsetTop, 350, 'easeInOutQuint');
        }
      });
    });

    let pagescrolls = select('a.page-scroll', true);
    pagescrolls.forEach((pagescroll) => {
      pagescroll.addEventListener('click', (event) => {
        event.preventDefault();
        let attr = pagescroll.getAttribute('href').replace('/', '');
        if (router.route != '/' && pagescroll.innerText != 'Contact') {
          movePageScroll.move = true;
          movePageScroll.to = attr;
          router.push('/');
          return;
        }
        scrollToY(select(attr).offsetTop, 350, 'easeInOutQuint');
      });
    });

    let navbarlinks = select('#mainnav .nav-link', true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 150;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.innerText) return;
        let section = select('#' + navbarlink.innerText.toLowerCase());
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };
    navbarlinksActive();
    onscroll(document, navbarlinksActive);

    let slidelinks = select('#slide-menu .slide-link', true);
    const slidemenulinksActive = () => {
      let position = window.scrollY + 150;
      slidelinks.forEach((slidelink) => {
        if (!slidelink.innerText) return;
        let section = select('#' + slidelink.innerText.toLowerCase());
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          slidelink.classList.add('active');
        } else {
          slidelink.classList.remove('active');
        }
      });
    };
    slidemenulinksActive();
    onscroll(document, slidemenulinksActive);

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        select('.slide-menu-container').style.display = 'none';
        select('.ham').classList.remove("active");
      }
    });

    select(".ham").addEventListener('click', () => {
      if (!select(".ham").classList.contains("active")) {
        select(".ham").classList.add("active");
        slideDown(select('.slide-menu-container'));
      } else {
        select(".ham").classList.remove("active");
        slideUp(select('.slide-menu-container'));
      }
    });

    let slidemenus = select('#slide-menu .page-scroll', true);
    slidemenus.forEach((slidemenu) => {
      slidemenu.addEventListener('click', () => {
        select('.ham').classList.remove("active");
        slideUp(select('.slide-menu-container'));
      });
    });

    let slidepagelinks = select('#slide-menu .page-link', true);
    slidepagelinks.forEach((slidepagelink) => {
      slidepagelink.addEventListener('click', () => {
        select('.ham').classList.remove("active");
        slideUp(select('.slide-menu-container'));
      });
    });

    select('#pages-down').addEventListener('click', () => {
      hide(select('#pages-down'));
      show(select('#pages-up'));
      slideDown(select('#slide-menu-pages'));
      toggleClass(select('#slide-pages-btn'), "active");
      toggleClass(select('#pages-up'), "active");
    });

    select('#pages-up').addEventListener('click', () => {
      show(select('#pages-down'));
      hide(select('#pages-up'));
      slideUp(select('#slide-menu-pages'));
      toggleClass(select("#slide-pages-btn"), "active");
      toggleClass(select("#pages-up"), "active");
    });

    select('#slide-pages-btn').addEventListener('click', () => {
      toggle(select('#pages-down'));
      toggle(select('#pages-up'));
      slideToggle(select('#slide-menu-pages'));
      toggleClass(select("#slide-pages-btn"), "active");
      toggleClass(select("#pages-up"), "active");
    });
  }, []);
  return (
    <header id="header" className="fixed-top">
      <div className="hoc clear">
        <h1 className="logo"><a href="/">Kyllox</a></h1>
        <nav id="mainnav">
          <div className="ham">
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
          </div>
          <ul className="nav-items clear">
            <li><a href="/#intro" className="nav-link page-scroll">Intro</a></li>
            <li><a href="/#about" className="nav-link page-scroll">About</a></li>
            <li><a href="/#projects" className="nav-link page-scroll">Projects</a></li>
            <li><Link href="/contact" passHref><a className="nav-link page-link">Contact</a></Link></li>
            <li><a className="nav-link drop"><FontAwesomeIcon icon={faSortDown} />Pages</a>
              <ul className="drop-menu">
                <li><a href="https://blog.kyllox.tech">Blog</a></li>
                <li><a href="https://durango.kyllox.tech">Durango Studio</a></li>
                <li><a href="https://what.kyllox.tech">What! Studio</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        <nav id="slide-menu" className="slide-menu-container">
          <ul className="slide-menu">
            <li className="slide-item">
              <div className="slide-go-arrow">
                <a href="/#intro" className="slide-link page-scroll"><FontAwesomeIcon icon={faAngleRight} /></a>
              </div>
              <a href="/#intro" className="slide-link page-scroll">Intro</a>
            </li>
            <li className="slide-item">
              <div className="slide-go-arrow">
                <a href="/#about" className="slide-link page-scroll"><FontAwesomeIcon icon={faAngleRight} /></a>
              </div>
              <a href="/#about" className="slide-link page-scroll">About</a>
            </li>
            <li className="slide-item">
              <div className="slide-go-arrow">
                <a href="/#projects" className="slide-link page-scroll"><FontAwesomeIcon icon={faAngleRight} /></a>
              </div>
              <a href="/#projects" className="slide-link page-scroll">Projects</a>
            </li>
            <li className="slide-item">
              <div className="slide-go-arrow">
                <Link href="/contact" passHref><a className="slide-link page-link"><FontAwesomeIcon icon={faAngleRight} /></a></Link>
              </div>
              <Link href="/contact" passHref><a className="slide-link page-link">Contact</a></Link>
            </li>
            <li className="slide-item">
              <div className="slide-drop-arrow">
                <a id="pages-down"><FontAwesomeIcon icon={faAngleDown} /></a>
                <a id="pages-up"><FontAwesomeIcon icon={faAngleUp} /></a>
              </div>
              <div className="slide-pages-wrapper">
                <a id="slide-pages-btn" className="slide-link">Pages</a>
              </div>
              <ul id="slide-menu-pages" className="slide-menu-sub">
                <li className="slide-item-sub"><a className="slide-link-sub" href="https://blog.kyllox.tech">└ Blog</a></li>
                <li className="slide-item-sub"><a className="slide-link-sub" href="https://durango.kyllox.tech">└ Durango Studio</a></li>
                <li className="slide-item-sub"><a className="slide-link-sub" href="https://what.kyllox.tech">└ What! Studio</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
