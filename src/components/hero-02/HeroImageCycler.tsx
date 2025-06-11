import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PinkDog from "@/assets/hero/pink-dog.png";
import PinkCat from "@/assets/hero/pink-cat.png";
import PinkRabbit from "@/assets/hero/pink-rabbit.png";
import PinkBird from "@/assets/hero/pink-bird.png";

const images = [
    PinkDog,
    PinkCat,
    PinkRabbit,
    PinkBird
];

function HeroImageCycler() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <AnimatePresence mode="wait"> {/* 'wait' mode ensures one animation finishes before the next starts */}
                <motion.img
                    key={currentIndex} // Key is crucial for AnimatePresence to detect changes
                    src={images[currentIndex]}
                    initial={{ opacity: 0 }} // Start invisible
                    animate={{ opacity: 1 }}  // Fade in
                    exit={{ opacity: 0 }}     // Fade out
                    transition={{ duration: .5 }} // Animation duration (1.5 seconds for a smooth fade)
                    style={{
                        position: 'absolute', // Position absolute to stack images
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Ensures image covers the area nicely
                    }}
                    alt="PawConnect Hero"
                />
            </AnimatePresence>
        </div>
    );
}

export default HeroImageCycler;