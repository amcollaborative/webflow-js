import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



import SplitType from 'split-type';

window.Webflow ||= [];
window.Webflow.push(() => {
  // GSAP stuff
  gsap.registerPlugin(ScrollTrigger);

  const myText: any = document.querySelectorAll('[data-wb="text"]');

  const splitType = new SplitType(myText);

  const textDivision = 'chars';

  class app {
    lenis: Lenis | undefined;
    headlineText: any;
    parallaxImage: Element[];
    portfolioHl: Element[];
    bgColors: Element[];
    delay: number;
    pageText: Element[];
    smallText: Element[];

    constructor() {
      this.pageText = [...document.querySelectorAll('[data-wb="page-text"]')];
      this.headlineText = [...document.querySelectorAll('[data-wb="headline"]')];
      this.parallaxImage = [...document.querySelectorAll('[data-scroll="parallax-image"] img')];
      this.portfolioHl = [...document.querySelectorAll('[data-wb="portfolio-hl"]')];
      this.bgColors = [...document.querySelectorAll('[data-bgcolor]')];
      this.delay = .65;
      this.smallText = [...document.querySelectorAll('[data-wb="small-text"]')];
      this._initialize();
      this._render(1);
    }

    _initialize() {
      this._setInitialState();
      this._createLenis();
      this._createLoader();
      this._createHomeIntro();
      this._createHeadlines();
      this._createSmallText();
      this._createPageHeadlines();
      this._createFeaturedImage();
      this._createServices();
      this._createAbout();
      this._createPortfolio();
    }

    _setInitialState() {
      gsap.set(splitType[textDivision], {
        opacity: 0,
        y: '110%',
        rotateZ: '5deg',
        rotateX: '-90deg',
        perspective: 1200,
      });
      gsap.set('.homehero_footer h2, .homehero_footer-social h3', {
        opacity: 0,
        y: 56,
      });
      gsap.set('.section_selectwork', {
        backgroundColor: '#070708',
        color: '#FFF',
      });
      gsap.set('.service_background-image', {
        opacity: 0.8,
      });
    }

    _createLenis() {
      this.lenis = new Lenis();
      this.lenis.on('scroll', (e: any) => {});
    }

    _createHomeIntro() {
      const tl = gsap.timeline();

      myText.forEach((el: any) => {
        tl.to('[data-hidden]', {
          opacity: 1,
        })
          .to(
            splitType[textDivision],
            {
              y: 0,
              rotateZ: 0,
              rotateX: 0,
              opacity: 1,
              ease: 'expo.out',
              duration: 2,
              stagger: 0.01,
              delay: 1,
            },
            '-=25%'
          )
          .to(
            '.homehero_footer h2, .homehero_footer-social h3',
            {
              opacity: 1,
              y: 1,
              ease: 'expo.out',
              duration: 1.5,
              stagger: 0.04,
            },
            0.5
          );
      });
    }

    _createLoader() {
      const tl = gsap.timeline();

      gsap.set('.section_loader', { bottom: 0 });
      tl.to('.section_loader', {
        height: '0svh',
        duration: .75,
        delay: this.delay,
        bottom: '100vh',
        ease: 'expo.out',
        onComplete: () => {
          gsap.set('.section_loader', { display: 'none' });
        },
      }).to('.logo-embed', {
        opacity: 0,
        delay: .85,
        ease: 'expo.out',
      },0);
      
      $(document).ready(function () {
        $('a:not(.w--current)').on('click', function (e) {
          if (
            $(this).prop('hostname') === window.location.host &&
            $(this).attr('href')?.indexOf('#') === -1 && // added null check
            $(this).attr('target') !== '_blank'
          ) {
            e.preventDefault();
            let destination = $(this).attr('href');
            gsap.set('.section_loader', { display: 'flex', bottom: 0 });
            gsap.fromTo(
              '.section_loader',
              {
                height: '0svh',
              },
              {
                height: '100vh',
                bottom: '0',
                duration: 0.65,
                ease: 'expo.out',
                onComplete: () => {
                  window.location?.assign(destination as string);
                },
              }
            );
            gsap.fromTo(
              '.logo-embed',
              { opacity: 0 },
              {
                opacity: 1,
                delay: 0.25,
                ease: 'expo.out',
              }
            )
          }
        });
      });
    }

    _createHeadlines() {
      this.headlineText.forEach((el: any) => {
        const splitHeadline = new SplitType(el);
        const headlineDivision = 'chars';

        gsap.set(el, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateZ: 0,
          
        });
        gsap.from(splitHeadline[headlineDivision], {
          scrollTrigger: el,
          y: '110%',
          opacity: 0,
          rotateX: '-90deg',
          rotateZ: '15deg',
          stagger: 0.05,
          duration: 1,
          delay: this.delay,
          ease: 'expo.out',
        });
      });
    }
    _createPageHeadlines() {
      this.pageText.forEach((el: any) => {
        const splitHeadline = new SplitType(el);
        const headlineDivision = 'chars';

        gsap.set(el, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateZ: 0,
          
        });
        gsap.from(splitHeadline[headlineDivision], {
          scrollTrigger: el,
          y: '110%',
          opacity: 0,
          rotateX: '-90deg',
          rotateZ: '15deg',
          stagger: 0.05,
          duration: .75,
          ease: 'expo.out',
        });
      });
    }
    _createSmallText(){
      this.smallText.forEach((el: any) => {

        gsap.set(el, {
          opacity: 0,
          y: 54,
        });
        gsap.to(el, {
          scrollTrigger: el,
          y: 0,
          opacity: 1,
          duration: .75,
          delay: this.delay,
          ease: 'expo.out',
        });
    })
  }

    _createFeaturedImage() {
      this.parallaxImage.forEach((image) => {
        const wrapper = document.querySelectorAll('[data-scroll="parallax-image"]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: image,
            start: 'clamp(top bottom)',
            end: 'clamp(bottom top)',
            scrub: true,
          },
        });

        tl.to(
          image,
          {
            ease: 'none',
            yPercent: gsap.utils.clamp(20, -30),
          },
          0
        );
      });
    }

    _createServices() {
      ScrollTrigger.create({
        trigger: '.selectwork_item.is-last',
        start: 'top bottom',
        end: 'bottom bottom',
        onEnter: () => {
          gsap.to('.section_selectwork', {
            backgroundColor: '#096',
            color: '#000',
            duration: 0.5,
            ease: 'power2.out',
          });
          gsap.to(
            '.section_selectwork .button.is-link.is-alternate, .blog28_title-link.is-alt, .text-size-medium.is-grey',
            {
              color: '#000',
            }
          );
        },
        onLeaveBack: () => {
          gsap.to('.section_selectwork', {
            backgroundColor: '#070708',
            color: '#FFF',
            duration: 0.5,
            ease: 'power2.out',
          });
          gsap.to(
            '.section_selectwork .button.is-link.is-alternate, .blog28_title-link.is-alt, .text-size-medium.is-grey',
            {
              color: '#FFF',
            }
          );
        },
      });
    }
    _createAbout() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.w-dyn-list',
          start: '30% center',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      tl.to('.service_background-image', {
        opacity: 0,
      });
    }

    _createPortfolio() {
      

      const bgColorElement: HTMLElement | null = this.bgColors[0] as HTMLElement;
      const bgColorValue: string | undefined =
        bgColorElement?.getAttribute('data-bgcolor') || undefined;

      const tl = gsap.timeline();
      this.portfolioHl.forEach((el: any) => {
        const splitHeadline = new SplitType(el);
        const headlineDivision = 'words';

        gsap.set(el, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateZ: 0,
        });
        gsap.from(splitHeadline[headlineDivision], {
          scrollTrigger: el,
          y: '110%',
          opacity: 0,
          rotateX: '-90deg',
          delay: this.delay,
          stagger: 0.05,
          duration: 1,
          ease: 'expo.out',
        });
      });

      gsap.set('.portfolio-header_image-wrapper', {
        opacity: 0,
        y: 25,
      });
      gsap.set('.portfolio-header_image-wrapper img', {
        scale: 1.5,
      });
      tl.to(
        '.portfolio-header_image-wrapper',
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: this.delay,
          ease: 'expo.out',
        },
        0
      ).to(
        '.portfolio-header_image-wrapper img',
        {
          scale: 1,
          duration: 1,
          delay: this.delay,
          ease: 'expo.out',
        },
        0
      );
      gsap.set('.section_portfolio-header, .section_case-gallery', {
        backgroundColor: bgColorValue,
      });

      ScrollTrigger.create({
        trigger: '.section_case-gallery',
        start: '10% center',
        onEnter: () =>
          gsap.to('.section_portfolio-header, .section_case-gallery', {
            backgroundColor: '#fff',
            color: '#070708',
            overwrite: 'auto',
          }),
        onLeaveBack: () => {
          gsap.to('.section_portfolio-header, .section_case-gallery', {
            backgroundColor: bgColorValue,
            overwrite: 'auto',
          });
        },
      });
      ScrollTrigger.create({
        trigger: '.section_more-work',
        start: 'top center',
        onEnter: () =>
          gsap.to('.section_case-gallery', {
            backgroundColor: '#E5E5E8',
            color: '#070708',
            overwrite: 'auto',
          }),
        onLeaveBack: () => {
          gsap.to('.section_case-gallery', {
            backgroundColor: '#fff',
            overwrite: 'auto',
          });
        },
      });
    }

    _render(time: any) {
      if (this.lenis) {
        this.lenis.raf(time);
      }
      requestAnimationFrame(this._render.bind(this));
    }
    
    
  }

  new app();
});
