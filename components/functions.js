export function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export const $ = (el, all = false) => {
  el = el.trim().replace('/', '');
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

export const disableScroll = () => {
  document.querySelector('html').style.overflow = 'hidden';
};

export const enableScroll = () => {
  document.querySelector('html').style.removeProperty('overflow');
};

export const show = (el, inline = false) => {
  if (inline) {
    el.style.display = 'inline-block';
  } else {
    el.style.display = 'block';
  }
};

export const hide = (el) => {
  el.style.display = 'none';
};

export const toggle = (el) => {
  if (el.style.display == "none")
    show(el);
  else
    hide(el);
};

export const toggleClass = (el, css) => {
  if (!el.classList.contains(css)) {
    el.classList.add(css);
  } else {
    el.classList.remove(css);
  }
};

export const fadeIn = (el, up = true, transition = 2000) => {
  if (el) {
    if (el.style.display === 'none')
    {
      show(el);
    }
    if (up) {
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity " + transition + "ms, transform " + transition + "ms";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    } else {
      el.style.transition = "opacity " + transition + "ms";
      el.style.opacity = "1";
    }
  }
};

export const fadeOut = async (el, down = true, transition = 2000) => {
  if (el) {
    if (down) {
      el.style.transform = "translateY(0)";
      el.style.transition = "opacity " + transition + "ms, transform " + transition + "ms";
      el.style.opacity = "0";
      el.style.transform = "translateY(25px)";
    } else {
      el.style.transition = "opacity " + transition + "ms";
      el.style.opacity = "0";
    }
    await wait(transition);
    hide(el);
  }
};

export const slideUp = (target, duration = 500) => {
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

export const slideDown = (target, duration = 500) => {
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

export const slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

export const scrollToY = (scrollTargetY, speed, easing) => {
  var scrollY = window.scrollY,
    scrollTargetY = scrollTargetY || 0,
    speed = speed || 500,
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

export function getAbsPosY(el) {
  let clientRect = el.getBoundingClientRect();
  let relativeTop = clientRect.top;
  let scrolledTopLength = window.pageYOffset;
  let absoluteTop = scrolledTopLength + relativeTop;
  return absoluteTop;
}

export const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener);
};
