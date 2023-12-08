// <script type="text/javascript">
//   const cursor = document.querySelector(".cursor");
//   let timeout;

//   document.addEventListener("mousemove", (e) => {
//     let x = e.pageX;
//     let y = e.pageY;

//     cursor.style.top = y + "px";
//     cursor.style.left = x + "px";
//     cursor.style.display = "block";

//     function mouseStopped() {
//       cursor.style.display = "none";
//     }
//     timeout = setTimeout(mouseStopped, 1500);
//   });
//   document.addEventListener("mouseout", () => {
//     cursor.style.display = "none";
//   });
// </script>

//SITE WIDE CURSOR

const site_wide_cursor = document.querySelector(".cursor.site-wide");

document.addEventListener("mouseenter", () => {
  site_wide_cursor.style.display = "block";
});

document.addEventListener("mouseleave", () => {
  site_wide_cursor.style.display = "none";
});

document.addEventListener("mousemove", TrackCursor);

document.addEventListener("mousedown", () =>
  site_wide_cursor.classList.add("active")
);
document.addEventListener("mouseup", () =>
  site_wide_cursor.classList.remove("active")
);

function TrackCursor(e) {
  const w = site_wide_cursor.clientWidth;
  const h = site_wide_cursor.clientHeight;
  site_wide_cursor.style.transform = `translate(${e.clientX - w / 2}px, ${
    e.clientY - h / 2
  }px)`;
}

//CUSTOM CURSORS

// const customs = document.querySelectorAll(".homediv");

// for (let i = 0; i < customs.length; i++) {
//   const custom = customs[i];
//   const cursor = custom.querySelector(".cursorhome");

//   custom.addEventListener("mouseenter", () => {
//     site_wide_cursor.style.display = "none";
//   });

//   custom.addEventListener("mouseleave", () => {
//     site_wide_cursor.style.display = "block";
//   });

//   document.addEventListener("mousemove", TrackCustomCursor.bind(custom));

//   document.addEventListener("mousedown", () => cursor.classList.add("active"));
//   document.addEventListener("mouseup", () => cursor.classList.remove("active"));
// }

// function TrackCustomCursor(e) {
//   const custom = this;
//   const cursor = custom.querySelector(".cursorhome");

//   const customRect = custom.getBoundingClientRect();

//   const x = e.clientX - customRect.left;
//   const y = e.clientY - customRect.top;

//   cursor.style.transform = `translate(${x}px, ${y}px)`;
// }
