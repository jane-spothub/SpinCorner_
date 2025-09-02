import {useRef, useEffect, type FC, useCallback} from "react";
import type {ColorBlock} from "../Utils/types.ts";
import {colorLevels, usePrevious} from "../Hooks/useColors.ts";
import PointerImg from "../assets/img/scene/pointer-spin2.png";
import LogoImg from "../assets/img/scene/spin-corner-logo.png";

// import AnchorImg from "../assets/img/controls/spin-popup.png";

interface CanvasProps {
    spinState: boolean;
    OnSetWinner: (w: ColorBlock) => void;
    // winner: ColorBlock | null;
    level: number;
    freeSpinCount: number;
}

export const Canvas: FC<CanvasProps> = ({spinState, OnSetWinner, level, freeSpinCount}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offsetRef = useRef(0); // rotation offset
    const logo = useRef<HTMLImageElement | null>(null);
    const colorsRef = useRef<ColorBlock[]>(colorLevels[level]); // default
    const pointer = useRef<HTMLImageElement | null>(null);
    // const anchorRef = useRef<HTMLImageElement | null>(null);




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
        const centerY = 380;
        const radius = 350;

        ctx.clearRect(0, 0, width, height);
        ctx.save();

        colorsRef.current = colorLevels[level];
        const colors = colorsRef.current;
        const sliceAngle = (2 * Math.PI) / colors.length;

        // // === Draw anchor at the bottom ===
        // if (anchorRef.current) {
        //     const anchorWidth = 300;   // tweak size
        //     const anchorHeight = 100;
        //
        //     // place so bottom touches canvas edge
        //     const anchorX = centerX - anchorWidth / 2;
        //     const anchorY = height - anchorHeight;
        //
        //     ctx.drawImage(anchorRef.current, anchorX, anchorY, anchorWidth, anchorHeight);
        // }
        colors.forEach((block, i) => {
            const startAngle = i * sliceAngle + offsetRef.current;
            const endAngle = startAngle + sliceAngle;

            // slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            // 🎨 check if this slice is orange → use gradient
            if (block.hex === "red-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#FF0000"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#FF0000"); // outer (lighter golden)

                ctx.fillStyle = grad;

            } else if (block.hex === "gradient-orange") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#fd0000"); // inner (darker orange)
                grad.addColorStop(0, "#CD5C5C"); // inner (darker orange)
                grad.addColorStop(1, "#fd0000"); // outer (lighter golden)

                ctx.fillStyle = grad;

            } else if (block.hex === "yellow-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#FFBF00"); // inner (darker orange)
                grad.addColorStop(0.25, "#f5bf0e");   // bright highlight (almost white gold)
                grad.addColorStop(1, "#FFBF00"); // outer

                ctx.fillStyle = grad;
            } else if (block.hex === "purple-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "rgb(69,2,91)"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "rgb(69,2,91)"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "green-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#77a361"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#77a361"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "royal-blue-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#305CDE"); // inner (darker orange)
                // grad.addColorStop(0, "#191970"); // inner (darker orange)
                grad.addColorStop(1, "#305CDE"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "faded-yellow") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#FFFDD0"); // inner (darker orange)
                // grad.addColorStop(0, "#084b62"); // inner (darker orange)
                grad.addColorStop(1, "#FFFDD0"); // outer (lighter golden)

                ctx.fillStyle = grad;
            }

            ctx.fill();
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            ctx.shadowColor = "rgb(10,10,10)"; // soft black shadow
            ctx.shadowBlur = 5;                  // how soft the shadow is
            ctx.shadowOffsetX = 0;                // horizontal shift
            ctx.shadowOffsetY = 0;                // vertical shift

            ctx.strokeStyle = "rgba(59,13,13,0.6)"; // light border line
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.restore();

            // label
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);


            ctx.font = "bold 26px Arial"; // change size/family to what you use
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

// 🖤 Black outline stroke first
            ctx.lineWidth = 6;            // thickness of the outline
            ctx.strokeStyle = "black";
            ctx.strokeText(block.amount, radius * 0.7, 0);

// 🤍 Fill text (white or whatever you want)
            ctx.fillStyle = "#fff";       // keep white for dark slices
            ctx.fillText(block.amount, radius * 0.7, 0);

// 🔄 Reset shadow so it doesn’t affect other drawings
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.restore();
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
        gradient.addColorStop(0, "#000000");   // light gold
        gradient.addColorStop(0.25, "#000000");
        gradient.addColorStop(0.5, "#021a36");
        gradient.addColorStop(0.75, "#000000");
        gradient.addColorStop(1, "#000000");

        ctx.lineWidth = 15;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();

        // === Border ticks instead of full lines ===
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fff";

        // === Border ticks along the wheel rim ===
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fff";

        const borderWidth = 25;  // must match ctx.lineWidth above
        const tickLength = -3.5;   // length of the divider tick

        for (let i = 0; i < colors.length; i++) {
            const angle = i * sliceAngle + offsetRef.current;

            // inner edge of the border
            const xInner = centerX + Math.cos(angle) * (radius - borderWidth / 2);
            const yInner = centerY + Math.sin(angle) * (radius - borderWidth / 2);

            // extend outward beyond border
            const xOuter = centerX + Math.cos(angle) * (radius + borderWidth / 2 + tickLength);
            const yOuter = centerY + Math.sin(angle) * (radius + borderWidth / 2 + tickLength);

            ctx.beginPath();
            ctx.moveTo(xInner, yInner);
            ctx.lineTo(xOuter, yOuter);
            ctx.stroke();
        }
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


        // // === 🎨 Center Circle with Gradient + Outer + Inner Shadow ===
        // ctx.save();
        // ctx.beginPath();
        // ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
        //
        // // linear gradient for the circle fill
        // const centerGradient = ctx.createRadialGradient(
        //     centerX, centerY, 0,        // inner circle (at center, radius 0)
        //     centerX, centerY, 120        // outer circle (at center, radius 60)
        // );
        // === 🎨 Center Circle Gradient (stops at inner border) ===
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);

// gradient fill that ends at radius 90 instead of 120
        const gradientRadius = 92; // 👈 same as your inner border radius
        const centerGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, gradientRadius
        );

        centerGradient.addColorStop(0, "#FFBF00");
        centerGradient.addColorStop(0.25, "#d9a303");
        centerGradient.addColorStop(0.5, "#FFBF00");
        centerGradient.addColorStop(0.75, "rgb(255,191,0)");
        centerGradient.addColorStop(1, "rgba(255,191,0,0)");

        ctx.fillStyle = centerGradient;
        ctx.fill();

// outer border (radius 120)
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();

// inner border (radius 80)
        // 🖤 Inner border (radius 80) with shadow
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);

// shadow settings
        ctx.shadowColor = "rgba(0,0,0,0.8)"; // black shadow
        ctx.shadowBlur = 15;                 // softness of shadow
        ctx.shadowOffsetX = 0;               // no horizontal shift
        ctx.shadowOffsetY = 5;               // small vertical drop

        ctx.lineWidth = 8;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();



        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 335, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 349, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();

        // === 🎯 Center Logo ===
        if (logo.current) {
            const logoWidth = 280;   // custom width
            const logoHeight = 120;  // custom height (different from width)

            const logoX = centerX - logoWidth / 2;
            const logoY = centerY - logoHeight / 2;

            ctx.drawImage(logo.current, logoX, logoY, logoWidth, logoHeight);
        }




        ctx.globalCompositeOperation = "source-atop";

        // // Example: scale inner shadow to ~30% of the wheel radius
        // const innerRadius = radius * 0.25;   // where shadow starts fading in
        // const outerRadius = radius * 0.35;   // where shadow reaches max
        // const boxSize = outerRadius * 2;     // bounding square for fillRect
        //
        // const innerShadow = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
        // innerShadow.addColorStop(0, "rgba(0,0,0,0)");
        // innerShadow.addColorStop(1, "rgba(13,5,14,0.35)");
        //
        // ctx.fillStyle = innerShadow;
        // ctx.fillRect(centerX - outerRadius, centerY - outerRadius, boxSize, boxSize);

        ctx.restore();

        if (freeSpinCount > 0) {
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.beginPath();
            ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = "bold 40px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

// stroke first (black border)
            ctx.lineWidth = 6;           // thickness of outline
            ctx.strokeStyle = "black";
            ctx.strokeText(`${freeSpinCount}`, centerX, centerY);

// then fill (white text)
            ctx.fillStyle = "white";
            ctx.fillText(`${freeSpinCount}`, centerX, centerY);

        }

        if (pointer.current) {
            const pointerWidth = 80;
            const pointerHeight = 60;

            const pointerX = centerX - pointerWidth / 2;
            const pointerY = centerY - radius - pointerHeight + 28;

            ctx.drawImage(pointer.current, pointerX, pointerY, pointerWidth, pointerHeight);
        }

    }, [freeSpinCount, level]);

    // preload images ONCE at mount
    useEffect(() => {
        if (!pointer.current) {
            const img = new Image();
            img.src = PointerImg;
            img.onload = () => {
                pointer.current = img;
                drawWheel();
            };
        }
        if (!logo.current) {
            const img = new Image();
            img.src = LogoImg;
            img.onload = () => {
                logo.current = img;
                drawWheel();
            };
        }

    }, []);

    // initial draw
    useEffect(() => {
        drawWheel();
    }, [drawWheel]);
    const prevSpin = usePrevious(spinState); // track previous value

    // spin effect
    useEffect(() => {
        if (!pointer.current) {
            const img = new Image();
            img.src = PointerImg;
            img.onload = () => {
                pointer.current = img;
                drawWheel();
            };
        } else {
            drawWheel();
        }
        if (!spinState || prevSpin === spinState) return;

        const spinDuration = 2500;
        const start = performance.now();

        const colors = colorsRef.current;
        const sliceAngle = (2 * Math.PI) / colors.length;

        // === Step 1: pick random winner at start ===
        const winnerIndex = Math.floor(Math.random() * colors.length);
        const sliceMiddle = winnerIndex * sliceAngle + sliceAngle / 2;

        // === Step 2: compute final target offset ===
        const targetOffset = -(sliceMiddle + Math.PI / 2);

        // === Step 3: also add extra spins for realism ===
        const extraSpins = 4 * 2 * Math.PI; // 4 full spins
        const startOffset = offsetRef.current;

        function animate(now: number) {
            const elapsed = now - start;
            const t = Math.min(elapsed / spinDuration, 1);

            // ease-out
            const easeOut = 1 - Math.pow(1 - t, 3);

            // === Step 4: interpolate between start and target with extra spins ===
            offsetRef.current =
                startOffset + extraSpins * (1 - easeOut) + (targetOffset - startOffset) * easeOut;

            drawWheel();

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                offsetRef.current = targetOffset; // lock in
                drawWheel();
                OnSetWinner(colors[winnerIndex]); // ✅ stop clean in middle
            }
        }

        requestAnimationFrame(animate);
    }, [spinState, drawWheel, prevSpin, OnSetWinner, level]);

    return <canvas ref={canvasRef} width={800} height={800}/>;
};
