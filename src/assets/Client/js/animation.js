export function loadAOS() {
  if (window.AOS) {
    window.AOS.init({
      duration: 500,
      easing: 'ease-in-out-sine',
      once: false,
      mirror: false,
    });
    window.AOS.refreshHard(); // Bắt buộc render lại hiệu ứng khi DOM thay đổi
  }
}