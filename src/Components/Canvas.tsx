import {useRef, useEffect, type FC, useCallback} from "react";
import type {ColorBlock} from "../Utils/types.ts";
import {colorLevels, usePrevious} from "../Hooks/useColors.ts";
import PointerImg from "../assets/img/scene/pointer-spin2.png"

interface CanvasProps {
    spinState: boolean;
    OnSetWinner: (w: ColorBlock) => void;
    winner: ColorBlock | null;
    level: number
}

export const Canvas: FC<CanvasProps> = ({spinState, OnSetWinner, winner, level}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offsetRef = useRef(0); // rotation offset

    const colorsRef = useRef<ColorBlock[]>(colorLevels[level]); // default
    const pointer = useRef<HTMLImageElement | null>(null);


    const drawWheel = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = "rgba(107,149,231,0.4)"; // pick your color
        ctx.fillRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 380; // 600px diameter

        ctx.clearRect(0, 0, width, height);
        ctx.save();

// // // define clipping path → top half of the circle
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius + 5, Math.PI, 0); // semi-circle (180° to 0°)
//         ctx.lineTo(centerX, centerY+30);
//         ctx.closePath();
//         ctx.clip();
        colorsRef.current = colorLevels[level];
        const colors = colorsRef.current;
        const sliceAngle = (2 * Math.PI) / colors.length;

        colors.forEach((block, i) => {
            const startAngle = i * sliceAngle + offsetRef.current;
            const endAngle = startAngle + sliceAngle;

            // slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            // 🎨 check if this slice is orange → use gradient
            if (block.hex === "gradient-orange") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#CC5500"); // inner (darker orange)
                grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#CC5500"); // outer (lighter golden)

                ctx.fillStyle = grad;

            } else if (block.hex === "gradient-yellow") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#FFBF00"); // inner (darker orange)
                grad.addColorStop(0.25, "#f5bf0e");   // bright highlight (almost white gold)
                // grad.addColorStop(0, "#790446"); // inner
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#FFBF00"); // outer

                ctx.fillStyle = grad;
            } else if (block.hex === "gradient-dark-green") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#228B22"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#228B22"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "rgb(90,32,67)") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#720e9e"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#720e9e"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "gradient-dark-purple-blue") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#00BFFF"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#00BFFF"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "gradient-pink-black") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#191970"); // inner (darker orange)
                // grad.addColorStop(0, "#084b62"); // inner (darker orange)
                grad.addColorStop(1, "#191970"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "gradient-dark-red") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#fd0000"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#fd0000"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "gradient-blue") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#0000CD"); // inner (darker orange)
                // grad.addColorStop(0.25, "#340744"); // inner (darker orange)
                grad.addColorStop(1, "#0000CD"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else {

                // ctx.fillStyle = block.hex; // solid purple
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,           // inner circle (center, radius 0)
                    centerX, centerY, radius       // outer circle (center, radius = wheel radius)
                );

                grad.addColorStop(0, "#44112e"); // inner
                grad.addColorStop(0.25, "rgb(59,7,37)"); // inner (darker orange)
                grad.addColorStop(1, "#44112e"); // outer

                ctx.fillStyle = grad;


            }

            ctx.fill();

            // label
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);

            if (
                block.hex === "gradient-blue" ||
                block.hex === "rgb(90,32,67)" ||
                block.hex === "gradient-dark-red" ||
                block.hex === "gradient-dark-red-light" ||
                block.hex === "gradient-pink-black" ||
                block.hex === "gradient-dark-green" ||
                // block.hex === "gradient-dark-purple-blue" ||
                // block.hex === "gradient-yellow" ||
                block.hex === ""
            ) {
                ctx.fillStyle = "#fff"; // text color for dark backgrounds
            } else {
                ctx.fillStyle = "#000"; // text color for light backgrounds
            }

            ctx.font = "bold 30px Arial"; // change size/family to what you use
            ctx.shadowColor = "rgba(0,0,0,0.6)"; // shadow color
            ctx.shadowBlur = 4;                  // softness
            ctx.shadowOffsetX = 2;               // horizontal offset
            ctx.shadowOffsetY = 2;               // vertical offset

            ctx.textAlign = "center";


            ctx.fillText(block.amount, radius * 0.7, 0);
            // 🔄 Reset shadow so it doesn’t affect other drawings
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.restore();

        });

/// 🎨 Gradient border for the wheel
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

// create linear gradient for stroke
        const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
        gradient.addColorStop(0, "#021a36");   // light gold
        gradient.addColorStop(0.25, "#002fa7");
        gradient.addColorStop(0.5, "#021a36");
        gradient.addColorStop(0.75, "#002fa7");
        gradient.addColorStop(1, "#021a36");

        ctx.lineWidth = 20;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();

/// ✨ Inner shadow effect
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 10, 0, Math.PI * 2); // clip slightly inside
        ctx.clip();

        ctx.globalCompositeOperation = "source-atop";

// radial gradient fading inward
        const shadowGradient = ctx.createRadialGradient(centerX, centerY, radius - 30, centerX, centerY, radius);
        shadowGradient.addColorStop(0, "rgba(0,0,0,0)");
        shadowGradient.addColorStop(1, "rgba(0,0,0,0.5)");

        ctx.fillStyle = shadowGradient;
        ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

        ctx.restore();


        // pointer at the TOP

        if (pointer.current) {
            const pointerWidth = 80;
            const pointerHeight = 60;

            const pointerX = centerX - pointerWidth / 2;
            const pointerY = centerY - radius - pointerHeight + 48;

            ctx.drawImage(pointer.current, pointerX, pointerY, pointerWidth, pointerHeight);
        }


        // === 🎨 Center Circle with Gradient + Outer + Inner Shadow ===
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);

// linear gradient for the circle fill
        const centerGradient = ctx.createRadialGradient(
            centerX, centerY, 0,        // inner circle (at center, radius 0)
            centerX, centerY, 120        // outer circle (at center, radius 60)
        );

// add color stops
        centerGradient.addColorStop(0, "#002fa7");   // light gold
        centerGradient.addColorStop(0.25, "#05053f");
        centerGradient.addColorStop(0.5, "#002fa7");
        centerGradient.addColorStop(0.75, "#051b50");
        centerGradient.addColorStop(1, "#002fa7");

// fill with gradient
        ctx.fillStyle = centerGradient;

// ✅ Outer shadow
        ctx.shadowColor = "rgb(0,0,0)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;

        ctx.fill();
        ctx.restore();

// === ✨ Inner shadow trick ===
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.clip();

        ctx.globalCompositeOperation = "source-atop";

// radial gradient for inner shadow (dark edge, transparent inside)
        // Example: scale inner shadow to ~30% of the wheel radius
        const innerRadius = radius * 0.25;   // where shadow starts fading in
        const outerRadius = radius * 0.35;   // where shadow reaches max
        const boxSize = outerRadius * 2;     // bounding square for fillRect

        const innerShadow = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
        innerShadow.addColorStop(0, "rgba(0,0,0,0)");
        innerShadow.addColorStop(1, "rgba(13,5,14,0.35)");

        ctx.fillStyle = innerShadow;
        ctx.fillRect(centerX - outerRadius, centerY - outerRadius, boxSize, boxSize);

        ctx.restore();

        //
        // ctx.stroke();
        // ctx.restore();
        if (spinState) {
            ctx.fillStyle = "rgba(255,254,255,0)";
            ctx.font = "bold 40px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("", centerX, centerY);
        } else {
            if (winner) {
                if (winner.amount === "SPIN TENA") {
                    ctx.fillStyle = "rgb(255,254,255)";
                    ctx.font = "bold 40px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(winner.amount, centerX, centerY);
                } else if (winner.amount === "Nunge Tosha") {
                    ctx.fillStyle = "rgb(255,254,255)";
                    ctx.font = "bold 36px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(winner.amount, centerX, centerY);

                } else if (winner.amount === "Gonga 25K" || winner.amount === "Gonga 10K" || winner.amount === "Gonga 3K") {
                    ctx.fillStyle = "rgb(255,254,255)";
                    ctx.font = "bold 36px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(winner.amount, centerX, centerY);
                } else {
                    ctx.fillStyle = "rgb(255,254,255)";
                    ctx.font = "bold 62px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(winner.amount, centerX, centerY);
                }

            } else {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "bold 62px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("..", centerX, centerY);
            }

        }
        // After drawing the wheel
        // ctx.fillStyle = "#222"; // same as background
        // ctx.fillRect(0, centerY+40, width, height / 2);

    }, [level, spinState, winner]);

    // initial draw
    useEffect(() => {
        drawWheel();
    }, [drawWheel]);
    const prevSpin = usePrevious(spinState); // track previous value

    // spin effect
    useEffect(() => {
        // if (!spinState) return;
        if (!pointer.current) {
            const img = new Image();
            img.src = PointerImg;
            img.onload = () => {
                pointer.current = img;
                drawWheel(); // 👈 draw immediately once pointer is ready
            };
        } else {
            drawWheel(); // if pointer already cached
        }
        if (!spinState || prevSpin === spinState) return;

        let rotation = 0;
        const spinSpeed = Math.random() * 0.2 + 0.3; // random speed
        const spinDuration = 3000 + Math.random() * 2000; // 3–5s
        const start = performance.now();

        function animate(now: number) {
            const elapsed = now - start;
            // ease-out deceleration
            const t = Math.min(elapsed / spinDuration, 1);
            const easeOut = 1 - Math.pow(1 - t, 3);
            rotation = spinSpeed * (1 - easeOut) * 50;

            offsetRef.current += rotation * 0.02;
            drawWheel();

            if (elapsed < spinDuration) {
                requestAnimationFrame(animate);
            } else {
                // stop spin → find winner
                // Normalize so 0 rad = top (pointer direction)
                const finalAngle =
                    ((-offsetRef.current - Math.PI / 2) % (2 * Math.PI) + 2 * Math.PI) %
                    (2 * Math.PI);

                const colors = colorsRef.current;
                const sliceAngle = (2 * Math.PI) / colors.length;

                const winnerIndex = Math.floor(finalAngle / sliceAngle) % colors.length;

                OnSetWinner(colors[winnerIndex]);


            }
        }


        requestAnimationFrame(animate);
    }, [spinState, drawWheel, prevSpin, OnSetWinner, level]);

    return <canvas ref={canvasRef} width={800} height={800}/>;
};
