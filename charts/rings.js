export function createRingChart({ containerId, ringData }) {
  const svg = document.getElementById(containerId);
  const data = ringData.data.map((r) => r.value);

  const numRings = ringData.data.length;
  const svgWidth = svg.viewBox.baseVal.width || svg.clientWidth;
  const svgHeight = svg.viewBox.baseVal.height || svg.clientHeight;
  const radius = Math.min(svgWidth / 12);
  const strokeWidth = radius * 0.35;
  const spacing = svgWidth / (numRings + 0.55);
  const offsetX = spacing - radius;
  const centerY = svgHeight / 2 - radius;

  // Gradiente
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#6aa8c1"/>
        <stop offset="100%" stop-color="#5b8db0"/>
      </linearGradient>
    `;
  svg.appendChild(defs);

  const centers = [];

  // Dibujar círculos
  const testNames = ringData.data.map((r) => r.mode);
  const winnerNames = ringData.data.map((r) => r.name);
  data.forEach((value, index) => {
    const centerX = offsetX + spacing * index;
    centers.push(centerX);

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${centerX}, ${centerY})`);

    // Circle
    const fg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fg.setAttribute("r", radius);
    fg.setAttribute("stroke", "url(#grad)");
    fg.setAttribute("stroke-width", strokeWidth);
    fg.setAttribute("fill", "none");
    group.appendChild(fg);

    // Texto arriba
    const testName = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    testName.setAttribute("class", "label");
    testName.setAttribute("x", "0");
    testName.setAttribute("text-anchor", "middle");
    testName.setAttribute("y", radius * -1.4);
    testName.setAttribute("font-size", radius * 0.3);
    testName.setAttribute("font-weight", "bold");
    testName.textContent = testNames[index];
    group.appendChild(testName);

    // Texto centro
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("class", "label");
    text.setAttribute("x", "0");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("y", "5");
    text.setAttribute("font-size", radius * 0.32);
    text.setAttribute("font-weight", "bold");
    text.textContent = `${value} ms`;
    group.appendChild(text);

    // Texto abajo
    const winnerName = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    winnerName.setAttribute("class", "label");
    winnerName.setAttribute("x", "0");
    winnerName.setAttribute("text-anchor", "middle");
    winnerName.setAttribute("y", radius * 1.6);
    winnerName.setAttribute("font-size", radius * 0.3);
    winnerName.setAttribute("font-weight", "bold");
    winnerName.textContent = "🏆 " + winnerNames[index];
    group.appendChild(winnerName);

    svg.appendChild(group);
  });

  // Conexiones simétricas con arco interno (mitad inferior, dentro del círculo azul)
  for (let i = 0; i < centers.length; i++) {
    const cx = centers[i];
    const cy = centerY;
    const r = radius;
    const sw = strokeWidth * 0.2;
    const color = "#d9d7d6";
    // Coordenadas de inicio y fin del arco
    const xStart = cx - r;
    const xEnd = cx + r;
    const yArc = cy;
    // Arco inferior (mitad inferior, dentro del círculo)
    const d = `M ${xStart} ${yArc} A ${r} ${r} 0 0 0 ${xEnd} ${yArc}`;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", sw);
    path.setAttribute("fill", "none");
    svg.appendChild(path);

    // Líneas horizontales a los lados
    const lineLength = spacing / 4;
    // Línea izquierda
    const lineLeft = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    lineLeft.setAttribute("x1", xStart - lineLength);
    lineLeft.setAttribute("y1", yArc);
    lineLeft.setAttribute("x2", xStart + 2);
    lineLeft.setAttribute("y2", yArc);
    lineLeft.setAttribute("stroke", color);
    lineLeft.setAttribute("stroke-width", sw);
    svg.appendChild(lineLeft);
    // Línea derecha
    const lineRight = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    lineRight.setAttribute("x1", xEnd - 2);
    lineRight.setAttribute("y1", yArc);
    lineRight.setAttribute("x2", xEnd + lineLength);
    lineRight.setAttribute("y2", yArc);
    lineRight.setAttribute("stroke", color);
    lineRight.setAttribute("stroke-width", sw);
    svg.appendChild(lineRight);
  }
}
