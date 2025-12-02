const loaderStyle = {
  width: "240px",
  height: "240px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  border: "none",
};

const loaderHtml = `<!DOCTYPE html>
<html>
<body>

<!-- Inline styles removed, class "loader-container" added -->
<div class="loader-container">
    <div class="loader">
        <!-- Inline variables removed, handled via CSS nth-child -->
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>

        <svg class="arc-container" viewBox="0 0 100 100">
            <circle class="arc" cx="50" cy="50" r="44"></circle>
        </svg>
    </div>
</div>

<style>
    :root {
        --loader-size: 100px;
        --loader-background-size: 200px;
        --dot-size: 12px;
        --dot-color: #AEB9BE;
        --arc-color: #FFEA00;
        --loader-width: 14px;
        --duration: 1.8s;
        --continuous-gravity: cubic-bezier(0.68, 0.2, 0.32, 0.8);
        --dots-duration: 7s;
    }

    /* New class replacing the inline styles on the outer div */
    .loader-container {
        display: flex;
        border-radius: 50%;
        background-color: #FEFEFE;
        height: var(--loader-background-size);
        width: var(--loader-background-size);
        align-items: center;
        justify-content: center;
        border: none;
    }

    .loader {
        position: relative;
        width: var(--loader-size);
        height: var(--loader-size);
    }

    .dot {
        position: absolute;
        width: var(--dot-size);
        height: var(--dot-size);
        background-color: var(--dot-color);
        border-radius: 50%;
        top: 50%;
        left: 50%;
        margin-top: calc(var(--dot-size) / -2);
        margin-left: calc(var(--dot-size) / -2);
        --radius: calc((var(--loader-size) - var(--dot-size)) / 2);
        /* Default i variable */
        --i: 0;
        transform: rotate(calc(var(--i) * 45deg)) translate(var(--radius));
        animation: spin-dots var(--dots-duration) linear infinite;
    }

    /* Assigning the index variable using nth-child to avoid inline styles */
    .dot:nth-child(1) { --i: 0; }
    .dot:nth-child(2) { --i: 1; }
    .dot:nth-child(3) { --i: 2; }
    .dot:nth-child(4) { --i: 3; }
    .dot:nth-child(5) { --i: 4; }
    .dot:nth-child(6) { --i: 5; }
    .dot:nth-child(7) { --i: 6; }
    .dot:nth-child(8) { --i: 7; }

    .arc-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: spin-continuous var(--duration) var(--continuous-gravity) infinite;
    }

    .arc {
        fill: none;
        stroke: var(--arc-color);
        stroke-width: var(--loader-width);
        stroke-linecap: round;
        stroke-dasharray: 35 1000;
        animation: stretch-arc var(--duration) var(--continuous-gravity) infinite;
    }

    @keyframes spin-dots {
        0% {
            transform: rotate(calc(var(--i) * 45deg)) translate(var(--radius));
        }
        100% {
            transform: rotate(calc(var(--i) * 45deg + 360deg)) translate(var(--radius));
        }
    }

    @keyframes spin-continuous {
        0% {
            transform: rotate(-90deg); /* Start at Top */
        }
        100% {
            transform: rotate(630deg);
        }
    }

    @keyframes stretch-arc {
        0% {
            stroke-dasharray: 35 1000;
        }
        50% {
            stroke-dasharray: 95 1000;
        }
        100% {
            stroke-dasharray: 35 1000;
        }
    }
</style>
</body>
</html>`;

function Loader() {
  return (
    <div style={loaderStyle}>
      <iframe
        srcDoc={loaderHtml}
        title="Loading..."
        style={imageStyle}
        frameBorder="0"
      />
    </div>
  );
}

export default Loader;
