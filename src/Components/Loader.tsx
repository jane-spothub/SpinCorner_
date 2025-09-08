// Components/Loader.tsx
import { useEffect, useState } from "react";
import logo from "../assets/img/scene/Spin-Corner-center piece logo.png"
type LoaderProps = {
    assets: string[];
    onComplete: () => void;
};

export const Loader = ({ assets, onComplete }: LoaderProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loaded = 0;

        const handleAssetLoad = () => {
            loaded += 1;
            setProgress(Math.round((loaded / assets.length) * 100));
            if (loaded === assets.length) {
                setTimeout(onComplete, 500); // short delay for smooth transition
            }
        };

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        assets.forEach((src) => {
            if (!isIOS && src.match(/\.(mp3|wav|ogg)$/)) {
                const audio = new Audio();
                audio.src = src;
                audio.oncanplaythrough = handleAssetLoad;
                audio.onerror = handleAssetLoad;
            } else if (!src.match(/\.(mp3|wav|ogg)$/)) {
                const img = new Image();
                img.src = src;
                img.onload = handleAssetLoad;
                img.onerror = handleAssetLoad;
            } else {
                // skip iOS audio preload, count it as loaded
                handleAssetLoad();
            }
        });

    }, [assets, onComplete]);

    return (
        <div className="game-loader">
            <div className="loader-content">
                <img src={logo} alt="Game Provider" className="loader-logo" />
                <h2 className="loader-title">Loading Game...</h2>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <p className="loader-text">{progress}%</p>
            </div>
        </div>
    );
};
