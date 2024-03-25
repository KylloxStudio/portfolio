import React from 'react';
import Link from 'next/link';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { $, show, hide, toggle, toggleClass, slideDown, slideUp, slideToggle, scrollToY, getAbsPosY, onscroll } from './functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faAngleRight, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
export let movePageScroll = {
  move: false,
  to: ''
};

export default function Navigation() {
  const router = useRouter();
  useEffect(() => {
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    let dropLinks = $("#mainnav li li>a", true);
    onscroll(window, () => {
      if (getAbsPosY($("#header")) > 50) {
        $(".fixed-top").classList.add("header-scrolled");
        $(".slide-menu-container").style.top = "60px";
        $(".drop-menu").style.paddingTop = "43px";
        dropLinks.forEach((dropLink) => {
          dropLink.style.background = "rgba(0, 0, 0, 0.85)";
        });
      } else {
        $(".fixed-top").classList.remove("header-scrolled");
        $(".slide-menu-container").style.top = "70px";
        $(".drop-menu").style.paddingTop = "33px";
        dropLinks.forEach((dropLink) => {
          dropLink.style.background = "transparent";
        });
      }
    });

    let pagelinks = $('a.page-link', true);
    pagelinks.forEach((pagelink) => {
      pagelink.addEventListener('click', (event) => {
        if (router.route != '/') {
          event.preventDefault();
          let attr = '#' + pagelink.innerText.toLowerCase();
          scrollToY($(attr).offsetTop, 350, 'easeInOutQuint');
        }
      });
    });

    let pagescrolls = $('a.page-scroll', true);
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
        scrollToY($(attr).offsetTop, 350, 'easeInOutQuint');
      });
    });

    let navbarlinks = $('#mainnav .nav-link', true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 150;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.innerText) return;
        let section = $('#' + navbarlink.innerText.toLowerCase());
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

    let slidelinks = $('#slide-menu .slide-link', true);
    const slidemenulinksActive = () => {
      let position = window.scrollY + 150;
      slidelinks.forEach((slidelink) => {
        if (!slidelink.innerText) return;
        let section = $('#' + slidelink.innerText.toLowerCase());
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
        $('.slide-menu-container').style.display = 'none';
        $('.ham').classList.remove("active");
      }
    });

    $(".ham").addEventListener('click', () => {
      if (!$(".ham").classList.contains("active")) {
        $(".ham").classList.add("active");
        slideDown($('.slide-menu-container'));
      } else {
        $(".ham").classList.remove("active");
        slideUp($('.slide-menu-container'));
      }
    });

    let slidemenus = $('#slide-menu .page-scroll', true);
    slidemenus.forEach((slidemenu) => {
      slidemenu.addEventListener('click', () => {
        $('.ham').classList.remove("active");
        slideUp($('.slide-menu-container'));
      });
    });

    let slidepagelinks = $('#slide-menu .page-link', true);
    slidepagelinks.forEach((slidepagelink) => {
      slidepagelink.addEventListener('click', () => {
        $('.ham').classList.remove("active");
        slideUp($('.slide-menu-container'));
      });
    });

    $('#pages-down').addEventListener('click', () => {
      hide($('#pages-down'));
      show($('#pages-up'));
      slideDown($('#slide-menu-pages'));
      toggleClass($('#slide-pages-btn'), "active");
      toggleClass($('#pages-up'), "active");
    });

    $('#pages-up').addEventListener('click', () => {
      show($('#pages-down'));
      hide($('#pages-up'));
      slideUp($('#slide-menu-pages'));
      toggleClass($("#slide-pages-btn"), "active");
      toggleClass($("#pages-up"), "active");
    });

    $('#slide-pages-btn').addEventListener('click', () => {
      toggle($('#pages-down'));
      toggle($('#pages-up'));
      slideToggle($('#slide-menu-pages'));
      toggleClass($("#slide-pages-btn"), "active");
      toggleClass($("#pages-up"), "active");
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
                <li><a href="https://blog.kyllox.pe.kr">Blog</a></li>
                <li><a href="http://db.kyllox.pe.kr">Database</a></li>
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
                <li className="slide-item-sub"><a className="slide-link-sub" href="https://blog.kyllox.pe.kr">└ Blog</a></li>
                <li className="slide-item-sub"><a className="slide-link-sub" href="http://db.kyllox.pe.kr">└ Database</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
