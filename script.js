// File: /presentasi-biot-savart/script.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("biotForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const mu0 = 4 * Math.PI * 1e-7; // konstanta permeabilitas vakum
    const I = parseFloat(document.getElementById("arus").value);
    const dl = parseFloat(document.getElementById("dl").value);
    const r = parseFloat(document.getElementById("r").value);
    const thetaDeg = parseFloat(document.getElementById("theta").value);
    const thetaRad = thetaDeg * (Math.PI / 180);

    const B = (mu0 / (4 * Math.PI)) * (I * dl * Math.sin(thetaRad)) / (r * r);

    document.getElementById("hasil").innerHTML =
      `<p>Medan magnetik (B): <strong>${B.toExponential(3)} T</strong></p>`;
  });
});
