// File: /presentasi-biot-savart/script.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("biotForm");
  const hasilEl = document.getElementById("hasil");

  if (!form || !hasilEl) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil nilai dari input
    const I = parseFloat(document.getElementById("arus").value);
    const dl = parseFloat(document.getElementById("dl").value);
    const r = parseFloat(document.getElementById("r").value);
    const thetaDeg = parseFloat(document.getElementById("theta").value);
    const thetaRad = thetaDeg * (Math.PI / 180);

    // Validasi input
    if (isNaN(I) || isNaN(dl) || isNaN(r) || isNaN(thetaDeg)) {
      tampilkanHasil("⚠️ Harap isi semua kolom dengan angka yang valid.", true);
      return;
    }

    if (r === 0) {
      tampilkanHasil("❗ Jarak (r) tidak boleh nol karena akan menyebabkan pembagian dengan nol.", true);
      return;
    }

    // Hitung B menggunakan hukum Biot-Savart
    const mu0 = 4 * Math.PI * 1e-7;
    const B = (mu0 / (4 * Math.PI)) * (I * dl * Math.sin(thetaRad)) / (r * r);

    // Tampilkan hasil dengan animasi
    tampilkanHasil(`🧲 Medan magnetik (B): <strong>${B.toExponential(3)} T</strong>`);
  });

  function tampilkanHasil(pesan, isError = false) {
    hasilEl.innerHTML = `<div class="loading">Menghitung...</div>`;
    hasilEl.style.color = isError ? "#b00020" : "#003366";
    hasilEl.style.fontWeight = isError ? "normal" : "bold";

    setTimeout(() => {
      hasilEl.innerHTML = `<div class="fade-in">${pesan}</div>`;
    }, 400);
  }
});
