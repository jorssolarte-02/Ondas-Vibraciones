# ONDA LAB

Laboratorio interactivo de vibraciones y ondas mecánicas en una cuerda, construido con Angular standalone, TypeScript, Canvas API y Chart.js.

## Requisitos

- Node.js 20.19+, 22.12+ o 24+
- npm

## Instalar y ejecutar

```bash
npm install
npx ng serve -o
```

También están disponibles `npm start`, `npm run build` y `npm test`.

## Módulos

- Laboratorio principal con onda progresiva animada, partículas transversales y valores calculados.
- Onda progresiva y onda estacionaria con selección de armónicos de 1 a 10 y superposición para comparar dos armónicos.
- Controles sincronizados de tensión, densidad lineal, frecuencia, amplitud, longitud y velocidad de reproducción.
- Calculadora de velocidad, longitud de onda, frecuencia angular, número de onda y período.
- Cinco gráficas interactivas administradas por `ChartService` y fundamentos teóricos.

## Modelo

`v = √(T/μ)`, `λ = v/f`, `ω = 2πf`, `k = 2π/λ`, `P = 1/f`. Para una cuerda fija: `λₙ = 2L/n`, `fₙ = nv/(2L)` y `y = 2A sin(kx) cos(ωt)`. En la ecuación estacionaria A es la amplitud de cada onda viajera; los antinodos alcanzan 2A.
