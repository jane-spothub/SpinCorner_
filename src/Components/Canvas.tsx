import {useRef, useEffect, type FC, useCallback} from "react";
// import type {ColorBlock} from "../Utils/types.ts";
import {usePrevious, wheelData} from "../Hooks/useColors.ts";
import PointerImg from "../assets/img/scene/pointer-spin2.png";
import LogoImg from "../assets/img/scene/Spin-Corner-center piece logo.png";
import wheel from "../assets/img/SPINCORNERwheel.webp";
import type {WheelSegment} from "../Utils/types.ts";

interface CanvasProps {
    spinState: boolean;
    OnSetWinner: (w: WheelSegment) => void;
    // winner: ColorBlock | null;
    // level: number;
    freeSpinCount: number;
}

export const Canvas: FC<CanvasProps> = ({spinState, OnSetWinner, freeSpinCount}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offsetRef = useRef(0); // rotation offset
    const logo = useRef<HTMLImageElement | null>(null);
    // const colorsRef = useRef<ColorBlock[]>(constantColorBlocks); // use constant instead of level-based
    const pointer = useRef<HTMLImageElement | null>(null);
    // const anchorRef = useRef<HTMLImageElement | null>(null);
    const wheelImg = useRef<HTMLImageElement | null>(null);
    const colorsRef = useRef<WheelSegment[]>(wheelData);

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


/// 🎨 Gradient border for the wheel
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        colorsRef.current = wheelData;
        // const colors = colorsRef.current;
        // const sliceAngle = (2 * Math.PI) / colors.length;
        // const sliceColors = ["#f44336", "#2196f3", "#4caf50", "#ffeb3b", "#9c27b0"];
        //
        // const innerRadius = 100; // 👈 adjust until it matches the black circle in the real wheel
        //
        // colors.forEach((block, i) => {
        //     const startAngle = i * sliceAngle + offsetRef.current;
        //     const endAngle = startAngle + sliceAngle;
        //
        //     ctx.beginPath();
        //
        //     // start at inner arc
        //     ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        //     // outer arc
        //     ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        //     ctx.closePath();
        //
        //     // fill background
        //     ctx.fillStyle = sliceColors[i % sliceColors.length];
        //     ctx.fill();
        //
        //     ctx.strokeStyle = "#000";
        //     ctx.lineWidth = 2;
        //     ctx.stroke();
        //
        //     // 📝 draw text
        //     ctx.save();
        //     ctx.translate(centerX, centerY);
        //     ctx.rotate((startAngle + endAngle) / 2);
        //
        //     ctx.textAlign = "center";
        //     ctx.fillStyle = "#000";
        //     ctx.font = "bold 22px Arial";
        //     ctx.fillText(
        //         block.value.toString(),
        //         (innerRadius + radius) / 2, // 👈 place text halfway between inner & outer radius
        //         0
        //     );
        //     ctx.restore();
        // });


        // Create radial gradient for shadow just outside the border


        if (wheelImg.current) {
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(offsetRef.current);   // rotation
            ctx.drawImage(
                wheelImg.current,
                -radius, -radius,
                radius * 2, radius * 2
            );
            ctx.restore();
        }
        const mainShadowGradient = ctx.createRadialGradient(
            centerX, centerY, radius,         // start exactly at the wheel edge
            centerX, centerY, radius + 27     // extend shadow outward
        );
        mainShadowGradient.addColorStop(0, "rgba(0,0,0,0.47)"); // dark at edge
        mainShadowGradient.addColorStop(1, "rgba(0,0,0,0)");   // fade outward

        ctx.save();
        ctx.beginPath();

// Draw the outer shadow ring filled with gradient on top behind the border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 70, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true); // cut out center
        ctx.fillStyle = mainShadowGradient;
        ctx.fill("nonzero");  // fills only the ring area as shadow

        ctx.restore();
// Draw shadow circle behind wheel
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2); // slightly larger radius for shadow spread
        ctx.restore();


        ctx.globalCompositeOperation = "source-atop";
        ctx.restore();
// // 🔴 Debug pointer alignment
//         ctx.strokeStyle = "red";
//         ctx.beginPath();
//         ctx.moveTo(centerX, centerY);
//         ctx.lineTo(centerX, centerY - radius);
//         ctx.stroke();

        if (logo.current) {
            const logoWidth = 235;   // custom width
            const logoHeight = 170;  // custom height (different from width)

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
        if (!wheelImg.current) {
            const img = new Image();
            img.src = wheel;
            img.onload = () => {
                wheelImg.current = img;
                drawWheel();
            };
        }

    }, []);

    // initial draw
    useEffect(() => {
        drawWheel();
    }, [drawWheel]);
    const prevSpin = usePrevious(spinState); // track previous value

//     useEffect(() => {
//         if (!spinState || prevSpin === spinState) return;
//         colorsRef.current = wheelData;
//         const colors = colorsRef.current;
//         const spinDuration = 3000;
//         const start = performance.now();
//
//         // === Step 1: pick random winner at start ===
//         const winnerIndex = Math.floor(Math.random() * colors.length);
//         const sliceAngle = (2 * Math.PI) / colors.length;
//         const sliceMiddle = winnerIndex * sliceAngle + sliceAngle / 2;
// // pointer is at 12 o’clock => -90deg => -Math.PI/2
//         const targetOffset = -sliceMiddle + Math.PI / 2;
//
// // === Step 3: add extra spins ===
//         const extraSpins = 4 * 2 * Math.PI;
//         const startOffset = offsetRef.current % (2 * Math.PI);
//
//         function animate(now: number) {
//             const elapsed = now - start;
//             const t = Math.min(elapsed / spinDuration, 1);
//
//             // ease-out
//             const easeOut = 1 - Math.pow(1 - t, 3);
//             // === Step 4: interpolate between start and target with extra spins ===
//             offsetRef.current =
//                 startOffset + extraSpins * (1 - easeOut) + (targetOffset - startOffset) * easeOut;
//
//             drawWheel();
//
//             if (t < 1) {
//                 requestAnimationFrame(animate);
//             } else {
//                 offsetRef.current = targetOffset; // lock in
//                 drawWheel();
//                 OnSetWinner(colors[winnerIndex]);
//             }
//         }
//
//         requestAnimationFrame(animate);
//     }, [spinState, drawWheel, prevSpin, OnSetWinner]);

    useEffect(() => {
        if (!spinState || prevSpin === spinState) return;
        colorsRef.current = wheelData;
        const colors = colorsRef.current;
        const spinDuration = 3000;
        const start = performance.now();

        // === Step 1: pick random winner ===
        const winnerIndex = Math.floor(Math.random() * colors.length);
        const sliceAngle = (2 * Math.PI) / colors.length;

        // === Step 2: pick random stop position inside the winner slice ===
        const startAngle = winnerIndex * sliceAngle;
        const randomAngleInSlice = startAngle + Math.random() * sliceAngle;

        // pointer is at 12 o’clock => -90deg => -Math.PI/2
        const targetOffset = -randomAngleInSlice - Math.PI / 2;

        // === Step 3: add extra spins ===
        const extraSpins = 4 * 2 * Math.PI;
        const startOffset = offsetRef.current % (2 * Math.PI);

        function animate(now: number) {
            const elapsed = now - start;
            const t = Math.min(elapsed / spinDuration, 1);

            // ease-out cubic
            const easeOut = 1 - Math.pow(1 - t, 3);

            // Interpolate offset
            // offsetRef.current =
            //     startOffset + extraSpins * (1 - easeOut) + (targetOffset - startOffset) * easeOut;
            offsetRef.current =
                startOffset - extraSpins * (1 - easeOut) + (targetOffset - startOffset) * easeOut;
            drawWheel();

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                offsetRef.current = targetOffset; // lock in
                drawWheel();
                OnSetWinner(colors[winnerIndex]);
            }
        }

        requestAnimationFrame(animate);
    }, [spinState, drawWheel, prevSpin, OnSetWinner]);

    return <canvas ref={canvasRef} width={820} height={820}/>;
};
