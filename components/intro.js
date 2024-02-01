import TypewriterCore from 'typewriter-effect/dist/core';
import { $, wait, show, fadeIn, fadeOut } from '../components/functions';

export const Intro = async () => {
  // if ($(".intro-content h2")) {
  //   if (window.innerWidth > 340) content = "Anything is possible\nif you have got enough nerve.";
  //   else content = "Anything is possible if you have got enough nerve.";
  //   text = $(".intro-content h2");
  //   index = 0;
  // }
  // while (index < content.length) {
  //   if (!$(".intro-content h2")) break;
  //   await wait(100);
  //   let txt = content.charAt(index);
  //   text.innerHTML += txt === "\n" ? "<br/>" : txt;
  //   index++;
  // }
  if ($('.intro-content h2')) {
    $('.intro-content h2').classList.remove("active");
  }
  if ($('.intro-content h5')) {
    $('.intro-content h5').classList.remove("active");
  }
  while ($('.intro-content h2')) {
    if ($('.intro-content h2').classList.contains("active")) {
      break;
    }
    await wait(500);
  }
  if ($('.intro-content h2')) {
    await wait(1600);
    fadeOut($('.intro-content h2'), true);
  }
  if ($("#intro") && $('#intro-overlay')) {
    await wait(2500);
    $("#intro-overlay").style.removeProperty('background');
    $("#intro").style.removeProperty('background');
  }
  if ($("#intro-title") && $('#intro-position')) {
    await wait(350);
    show($('#intro-title'));
    show($('#intro-position'));
  }
  if ($(".intro-content h5")) {
    await wait(350);
    show($(".intro-content h5"), false);
    let typewriter = new TypewriterCore($(".intro-content h5 .Typewriter"), {
      cursor: '',
      delay: 175
    });
    typewriter.typeString('Hello, World!').callFunction(() => {
      $('.intro-content h5').classList.add("active");
    }).start();
  }
  while ($('.intro-content h5')) {
    if ($('.intro-content h5').classList.contains("active")) {
      break;
    }
    await wait(500);
  }
  // if ($(".intro-content h5")) {
  //   content = "Hello, World!";
  //   text = $(".intro-content h5");
  //   index = 0;
  // }
  // if ($("#hw-cursor")) {
  //   $("#hw-cursor").style.opacity = 1;
  //   await wait(350);
  // }
  // while (index < content.length) {
  //   if (!$(".intro-content h5")) break;
  //   await wait(175);
  //   let txt = content.charAt(index);
  //   text.innerHTML += txt;
  //   index++;
  // }
  if ($('#intro-title')) {
    await wait(400);
    fadeIn($('#intro-title'));
  }
  if ($('#intro-position')) {
    await wait(400);
    fadeIn($('#intro-position'));
  }
  if ($('#github')) {
    await wait(500);
    fadeIn($('#github'));
  }
  if ($('#youtube')) {
    await wait(400);
    fadeIn($('#youtube'));
  }
  if ($('#twitter')) {
    await wait(400);
    fadeIn($('#twitter'));
  }
  if ($('#scroll-down')) {
    await wait(750);
    fadeIn($('#scroll-down'), false);
  }
};