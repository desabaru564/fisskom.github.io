const μ0 = 4 * Math.PI * 1e-7;

function biotSavart(x, xp, yp, I) {
  const r = Math.sqrt((xp - x) ** 2 + yp ** 2);
  return (μ0 * I * yp) / (4 * Math.PI * r ** 3);
}

function metodeTrapesium(a, b, n, xp, yp, I) {
  const h = (b - a) / n;
  let total = biotSavart(a, xp, yp, I) + biotSavart(b, xp, yp, I);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    total += 2 * biotSavart(x, xp, yp, I);
  }
  return (h / 2) * total;
}

function metodeSimpson13(a, b, n, xp, yp, I) {
  if (n % 2 === 1) n += 1;
  const h = (b - a) / n;
  let total = biotSavart(a, xp, yp, I) + biotSavart(b, xp, yp, I);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    const coef = (i % 2 === 0) ? 2 : 4;
    total += coef * biotSavart(x, xp, yp, I);
  }
  return (h / 3) * total;
}

function metodeSimpson38(a, b, n, xp, yp, I) {
  if (n % 3 !== 0) n += 3 - (n % 3);
  const h = (b - a) / n;
  let total = biotSavart(a, xp, yp, I) + biotSavart(b, xp, yp, I);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    const coef = (i % 3 === 0) ? 2 : 3;
    total += coef * biotSavart(x, xp, yp, I);
  }
  return (3 * h / 8) * total;
}

function hitungMedanMagnet(event) {
  event.preventDefault(); // ← Ini penting agar halaman tidak refresh

  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const n = parseInt(document.getElementById("n").value);
  const xp = parseFloat(document.getElementById("xp").value);
  const yp = parseFloat(document.getElementById("yp").value);
  const I = parseFloat(document.getElementById("I").value);

  if (isNaN(a) || isNaN(b) || isNaN(n) || isNaN(xp) || isNaN(yp) || isNaN(I)) {
    alert("Harap isi semua nilai input dengan benar.");
    return;
  }

  const bt = metodeTrapesium(a, b, n, xp, yp, I);
  const bs13 = metodeSimpson13(a, b, n, xp, yp, I);
  const bs38 = metodeSimpson38(a, b, n, xp, yp, I);

  document.getElementById("hasilTrapesium").textContent = bt.toExponential(6);
  document.getElementById("hasilSimpson13").textContent = bs13.toExponential(6);
  document.getElementById("hasilSimpson38").textContent = bs38.toExponential(6);

  document.getElementById("selisih1").textContent = Math.abs(bt - bs13).toExponential(6);
  document.getElementById("selisih2").textContent = Math.abs(bt - bs38).toExponential(6);
  document.getElementById("selisih3").textContent = Math.abs(bs13 - bs38).toExponential(6);
}
