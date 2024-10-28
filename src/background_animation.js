export const startStarAnimation = () => {
  const starCount = 1000;
  const maxDuration = 1000;
  const universe = document.getElementById("universe");
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName("body")[0];
  const width = w.innerWidth || e.clientWidth || g.clientWidth;
  const height = w.innerHeight || e.clientHeight || g.clientHeight;

  for (let i = 0; i < starCount; ++i) {
    const ypos = Math.round(Math.random() * height);
    const star = document.createElement("div");
    const speed = 1000 * (Math.random() * maxDuration + 1);
    star.setAttribute("class", "star" + (3 - Math.floor(speed / 1000 / 8)));
    universe.appendChild(star);

    star.animate(
      [
        { transform: `translate3d(${width}px, ${ypos}px, 0)` },
        { transform: `translate3d(-${Math.random() * 256}px, ${ypos}px, 0)` }
      ],
      {
        delay: Math.random() * -speed,
        duration: speed,
        iterations: 1000
      }
    );
  }
};