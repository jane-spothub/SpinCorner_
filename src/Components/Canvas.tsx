import {useRef, useEffect, type FC, useCallback} from "react";
import type {ColorBlock} from "../Utils/types.ts";
import { constantColorBlocks, usePrevious} from "../Hooks/useColors.ts";
import PointerImg from "../assets/img/scene/pointer-spin2.png";
import LogoImg from "../assets/img/scene/Spin-Corner-center piece logo.png";

interface CanvasProps {
    spinState: boolean;
    OnSetWinner: (w: ColorBlock) => void;
    // winner: ColorBlock | null;
    // level: number;
    freeSpinCount: number;
}

export const Canvas: FC<CanvasProps> = ({spinState, OnSetWinner, freeSpinCount}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offsetRef = useRef(0); // rotation offset
    const logo = useRef<HTMLImageElement | null>(null);
    const colorsRef = useRef<ColorBlock[]>(constantColorBlocks); // use constant instead of level-based
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
        const centerY = 410;
        const radius = 380;

        ctx.clearRect(0, 0, width, height);
        ctx.save();

        // colorsRef.current = colorLevels[level];
        colorsRef.current = constantColorBlocks;

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

            if (block.hex === "red-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#fd0708"); // inner (darker orange)
                grad.addColorStop(1, "#fd0708"); // outer (lighter golden)

                ctx.fillStyle = grad;

            } else if (block.hex === "yellow-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#facc00"); // inner (darker orange)
                grad.addColorStop(0.25, "#f5bf0e");   // bright highlight (almost white gold)
                grad.addColorStop(1, "#facc00"); // outer

                ctx.fillStyle = grad;
            } else if (block.hex === "purple-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#001f8b"); // inner (darker orange)
                grad.addColorStop(1, "#001f8b"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "green-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#00a285"); // inner (darker orange)
                grad.addColorStop(1, "#00a285"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "royal-blue-c") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#0170e3"); // inner (darker orange)
                grad.addColorStop(1, "#0170e3"); // outer (lighter golden)

                ctx.fillStyle = grad;
            } else if (block.hex === "faded-yellow") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "#e9d889"); // inner (darker orange)
                grad.addColorStop(1, "#e9d889"); // outer (lighter golden)

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

            ctx.strokeStyle = "rgba(0,0,0,0.6)";
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.restore();

            // label
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);


            // calculate a text radius
            const textRadius = radius * 0.55;

// measure width of text

            let label = block.amount;

            if (!isNaN(Number(block.amount))) {
                const num = Number(block.amount);
                if (num >= 1000) {
                    label = num.toLocaleString(); // e.g. 1000 → "1,000"
                }
            }
            const metrics = ctx.measureText(label);

            const textWidth = metrics.width + 55;
            // const textWidthZ = metrics.width + 5;

            if (
                block.amount.includes("Nunge Tosha")
                || block.amount.includes("Gonga")
            ) {
                const fontSize = radius * 0.085; // ~9% of wheel radius

                // ctx.font = "bold 25px Roboto, sans-serif"; // change size/family to what you use
                // ctx.font = "bold 28px Impact"; // change size/family to what you use
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                // Split into words
                // const words = block.amount.split(" ");
                const words = block.amount.split(" ");

                // First line
                ctx.lineWidth = 6;
                ctx.strokeStyle = "black";
                ctx.font = `bold ${fontSize}px Roboto, sans-serif`;
                ctx.strokeText(words[0], radius * 0.7, -18);
                ctx.fillStyle = "#ffffff";
                ctx.fillText(words[0], radius * 0.7, -18);

                // Second line
                ctx.lineWidth = 6;
                ctx.strokeStyle = "black";
                ctx.font = `bold 25px Roboto, sans-serif`;
                ctx.strokeText(words.slice(1).join(" "), radius * 0.7, +18);
                ctx.fillStyle = "#ffffff";
                ctx.fillText(words.slice(1).join(" "), radius * 0.7, +18);

                // if (block.amount.includes("Gonga")||
                //     block.amount.includes("7500")||
                //     block.amount.includes("3000")||
                //     block.amount.includes("2500")
                // ) {
                //     // First line
                //     ctx.lineWidth = 8;
                //     ctx.strokeStyle = "black";
                //     ctx.strokeText(words[0], radius * 0.7, -18);
                //     ctx.fillStyle = "#ffffff";
                //     ctx.fillText(words[0], radius * 0.7, -18);
                //
                //     // Second line
                //     ctx.lineWidth = 8;
                //     ctx.strokeStyle = "black";
                //     ctx.strokeText(words.slice(1).join(" "), radius * 0.7, +18);
                //     ctx.fillStyle = "#ffffff";
                //     ctx.fillText(words.slice(1).join(" "), radius * 0.7, +18);
                // }
            }else if (
                block.amount.includes("Zako 2") ||
                block.amount.includes("Zako 3") ||
                block.amount.includes("SPIN TENA")
            ) {
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.lineWidth = 6;
                ctx.strokeStyle = "black";

                const textPosition = radius * 0.7;
                const parts = label.split(" ");

                if (block.amount.includes("SPIN TENA")) {
                    // Both words small
                    const smallFontSize = radius * 0.08;
                    ctx.font = `bold ${smallFontSize}px Roboto, sans-serif`;

                    const combinedText = parts.join(" ");
                    ctx.strokeText(combinedText, textPosition, 0);
                    ctx.fillStyle = "#ffffff";
                    ctx.fillText(combinedText, textPosition, 0);
                }

                else {
                    // Zako case
                    const textPart = parts[0]; // "Zako"
                    const numberPart = parts[1]; // "2" or "3"

                    const zakoFontSize = radius * 0.08;
                    ctx.font = `bold ${zakoFontSize}px Roboto, sans-serif`;

                    const zakoWidth = ctx.measureText(textPart).width;
                    const spacing = radius * 0.01;

                    ctx.strokeText(textPart, textPosition - (zakoWidth / 2), 0);
                    ctx.fillStyle = "#ffffff";
                    ctx.fillText(textPart, textPosition - (zakoWidth / 2), 0);

                    const numberFontSize = radius * 0.13;
                    ctx.font = `bold ${numberFontSize}px Roboto, sans-serif`;

                    ctx.strokeText(numberPart, textPosition + (zakoWidth / 2 - 15) + spacing, 0);
                    ctx.fillText(numberPart, textPosition + (zakoWidth / 2 - 15) + spacing, 0);
                }

                ctx.shadowColor = "transparent";
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.restore();
                ctx.textAlign = "center";
            }

            else {
            let fontSize = radius * 0.075; // Default font size

            // Custom font sizes for different amounts
            if (block.amount.includes("3000") || block.amount.includes("7500") || block.amount.includes("2500")) {
                fontSize = radius * 0.078; // Slightly smaller for large numbers
            } else if (block.amount.includes("1000") || block.amount.includes("2000")) {
                fontSize = radius * 0.078; // Medium size
            } else if (block.amount.includes("500") || block.amount.includes("250")) {
                fontSize = radius * 0.078; // Larger for medium numbers
            } else if (block.amount.includes("100") || block.amount.includes("150")) {
                fontSize = radius * 0.08; // Even larger for smaller numbers
            } else if (block.amount.includes("50")) {
                fontSize = radius * 0.085; // Largest for the smallest numbers
            }

            ctx.font = `bold ${fontSize}px Roboto, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineWidth = 6;
            ctx.strokeStyle = "black";
            ctx.strokeText(label, textRadius + textWidth / 2, 0);

            ctx.fillStyle = "#ffffff";
            ctx.fillText(label, textRadius + textWidth / 2, 0);

            // Reset shadow
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.restore();
            ctx.textAlign = "center";
        }

// 🖤 Black outline stroke first

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

        // Create radial gradient for shadow just outside the border
        const mainShadowGradient = ctx.createRadialGradient(
            centerX, centerY, radius,         // start exactly at the wheel edge
            centerX, centerY, radius + 37     // extend shadow outward
        );
        mainShadowGradient.addColorStop(0, "rgba(0,0,0,0.6)"); // dark at edge
        mainShadowGradient.addColorStop(1, "rgba(0,0,0,0)");   // fade outward

        ctx.save();
        ctx.beginPath();

// Draw the outer shadow ring filled with gradient on top behind the border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 30, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true); // cut out center
        ctx.fillStyle = mainShadowGradient;
        ctx.fill("nonzero");  // fills only the ring area as shadow

        ctx.restore();
// Draw shadow circle behind wheel
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2); // slightly larger radius for shadow spread
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 20;
        ctx.shadowOffsetY = 20; // vertical offset for depth effect
        ctx.fillStyle = "rgba(0, 0, 0, 0)"; // transparent fill, shadow will still appear
        ctx.fill();
        ctx.restore();





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
        ctx.strokeStyle = "#c6c3d6";

        // === Border ticks along the wheel rim ===
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#c6c3d6";

        const borderWidth = 25;  // must match ctx.lineWidth above
        const tickLength = -3.5;   // length of the divider tick
        const tickWidth = 6;      // thickness of the tick line


        // for (let i = 0; i < colors.length; i++) {
        //     const angle = i * sliceAngle + offsetRef.current;
        //
        //     // inner edge
        //     const xInner = centerX + Math.cos(angle) * (radius - borderWidth / 2);
        //     const yInner = centerY + Math.sin(angle) * (radius - borderWidth / 2);
        //
        //     // outer edge
        //     const xOuter = centerX + Math.cos(angle) * (radius + borderWidth / 2 + tickLength);
        //     const yOuter = centerY + Math.sin(angle) * (radius + borderWidth / 2 + tickLength);
        //
        //     // draw tick with custom width
        //     ctx.beginPath();
        //     ctx.lineWidth = tickWidth;
        //     ctx.strokeStyle = "#a19176";
        //     ctx.moveTo(xInner, yInner);
        //     ctx.lineTo(xOuter, yOuter);
        //     ctx.stroke();
        //
        //     // dot at midpoint
        //     const dotX = (xInner + xOuter) / 2;
        //     const dotY = (yInner + yOuter) / 2;
        //     ctx.beginPath();
        //     ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        //     ctx.fillStyle = "black";
        //     ctx.fill();
        // }
        for (let i = 0; i < colors.length; i++) {
            const angle = i * sliceAngle + offsetRef.current;

            // === Outer rim tick (already there) ===
            const xInner = centerX + Math.cos(angle) * (radius - borderWidth / 2);
            const yInner = centerY + Math.sin(angle) * (radius - borderWidth / 2);

            const xOuter = centerX + Math.cos(angle) * (radius + borderWidth / 2 + tickLength);
            const yOuter = centerY + Math.sin(angle) * (radius + borderWidth / 2 + tickLength);

            ctx.beginPath();
            ctx.lineWidth = tickWidth;
            ctx.strokeStyle = "#a19176";
            ctx.moveTo(xInner, yInner);
            ctx.lineTo(xOuter, yOuter);
            ctx.stroke();

            // Rim midpoint dot
            const dotX = (xInner + xOuter) / 2;
            const dotY = (yInner + yOuter) / 2;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();

            // === Inner ticks closer to the center ===
            const innerTickRadius = radius * 0.55;   // 55% of wheel radius
            const innerX = centerX + Math.cos(angle) * innerTickRadius;
            const innerY = centerY + Math.sin(angle) * innerTickRadius;

            const innerTickLength = 8; // small inner tick line
            const innerX2 = centerX + Math.cos(angle) * (innerTickRadius + innerTickLength);
            const innerY2 = centerY + Math.sin(angle) * (innerTickRadius + innerTickLength);

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#a19176";
            ctx.moveTo(innerX, innerY);
            ctx.lineTo(innerX2, innerY2);
            ctx.stroke();

            // Circle in the middle of segment
            // const circleRadius = radius * 0.4; // 40% of wheel radius
            // const circleX = centerX + Math.cos(angle + sliceAngle / 2) * circleRadius;
            // const circleY = centerY + Math.sin(angle + sliceAngle / 2) * circleRadius;
            //
            // ctx.beginPath();
            // ctx.arc(circleX, circleY, 5, 0, Math.PI * 2);
            // ctx.fillStyle = "#000"; // black dot
            // ctx.fill();
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

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);

        ctx.shadowColor = "rgba(0,0,0,0.92)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

// outer border (radius 120)
        ctx.lineWidth = 8;
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

        ctx.lineWidth = 10;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 362, 0, Math.PI * 2);

// === Outer Shadow ===
        ctx.shadowColor = "rgba(0,0,0,0.6)"; // dark shadow
        ctx.shadowBlur = 15;                 // softness
        ctx.shadowOffsetX = 0;               // no sideways offset
        ctx.shadowOffsetY = 0;               // no vertical offset

        ctx.lineWidth = 6;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();


        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 390, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#e1d090";
        ctx.stroke();
        ctx.restore();

        // === 🎯 Center Logo ===
        // if (logo.current) {
        //     const logoWidth = 300;   // custom width
        //     const logoHeight = 200;  // custom height (different from width)
        //
        //     const logoX = centerX - logoWidth / 2;
        //     const logoY = centerY - logoHeight / 2;
        //
        //     ctx.drawImage(logo.current, logoX, logoY, logoWidth, logoHeight);
        // }
        // === 🎯 Center Logo with Shadow ===
        if (logo.current) {
            const logoWidth = 300;   // custom width
            const logoHeight = 200;  // custom height (different from width)

            const logoX = centerX - logoWidth / 2;
            const logoY = centerY - logoHeight / 2;

            ctx.save();

            // Shadow settings
            ctx.shadowColor = "rgba(0,0,0,0.85)"; // dark shadow
            ctx.shadowBlur = 25;                  // softness
            ctx.shadowOffsetX = 5;                // slight right shift
            ctx.shadowOffsetY = 5;                // slight down shift

            // Draw the logo with shadow
            ctx.drawImage(logo.current, logoX, logoY, logoWidth, logoHeight);

            ctx.restore(); // reset shadow so it doesn’t affect other drawings
        }



        ctx.globalCompositeOperation = "source-atop";
        ctx.restore();

        if (freeSpinCount > 0) {
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.beginPath();
            ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = "bold 60px Arial";
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
            const pointerWidth = 90;
            const pointerHeight = 60;

            const pointerX = centerX - pointerWidth / 2;
            const pointerY = centerY - radius - pointerHeight + 30;

            ctx.drawImage(pointer.current, pointerX, pointerY, pointerWidth, pointerHeight);
        }

    }, [freeSpinCount]);

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

        const spinDuration = 3000;
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
    }, [spinState, drawWheel, prevSpin, OnSetWinner]);
    return <canvas ref={canvasRef} width={820} height={820}/>;
};
