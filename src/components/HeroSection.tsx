import Icon from "./Icon";

const headline1 = "Automate Everything.".split(" ");
const headline2 = "Scale Infinitely.".split(" ");
const allWords = [...headline1, ...headline2];

export default function HeroSection() {
    return (
        <section id="hero" aria-labelledby="hero-heading" className="min-h-screen relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <div
                    style={{
                        position: "absolute",
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,200,1,0.12) 0%, transparent 70%)",
                        top: -100,
                        left: -100,
                        filter: "blur(80px)",
                        animation: "meshShift 8s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(17,76,90,0.8) 0%, transparent 70%)",
                        bottom: 0,
                        right: -50,
                        filter: "blur(60px)",
                        animation: "meshShift 10s ease-in-out infinite reverse",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,153,50,0.06) 0%, transparent 70%)",
                        top: "40%",
                        left: "50%",
                        filter: "blur(60px)",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center">
                {/* Eyebrow */}
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-forsythia/30 bg-forsythia/10 text-forsythia text-sm font-mono mb-6"
                    style={{ animation: "fadeSlideUp 0.4s ease-out 0ms both" }}
                >
                    <Icon name="arrow-trending-up" size={14} strokeColor="#FFC801" />
                    <span>v2.0 Now Live — Real-Time AI Pipelines</span>
                </div>

                {/* H1 */}
                <h1 id="hero-heading" className="font-mono font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight">
                    {headline1.map((word, i) => (
                        <span
                            key={`l1-${i}`}
                            className="inline-block text-arctic mr-[0.25em]"
                            style={{ animation: `fadeSlideUp 0.5s ease-out ${100 + i * 60}ms both` }}
                        >
                            {word}
                        </span>
                    ))}
                    <br />
                    {headline2.map((word, i) => (
                        <span
                            key={`l2-${i}`}
                            className="inline-block text-forsythia mr-[0.25em]"
                            style={{ animation: `fadeSlideUp 0.5s ease-out ${100 + (headline1.length + i) * 60}ms both` }}
                        >
                            {word}
                        </span>
                    ))}
                </h1>

                {/* Subheadline */}
                <p
                    className="font-sans text-arctic/70 text-lg md:text-xl max-w-2xl mx-auto mt-6"
                    style={{ animation: "fadeSlideUp 0.5s ease-out 500ms both" }}
                >
                    NeuralFlow ingests, transforms, and delivers your data at the speed of thought. Built for engineers who refuse to compromise.
                </p>

                {/* CTAs */}
                <div
                    className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                    style={{ animation: "fadeSlideUp 0.5s ease-out 600ms both" }}
                >
                    <a
                        href="#pricing"
                        className="group relative overflow-hidden bg-forsythia text-oceanic font-semibold font-sans px-6 py-3 rounded-lg hover:bg-deep-saffron transition-colors duration-150 ease-out flex items-center justify-center gap-2"
                    >
                        Start Building Free
                        <Icon name="arrow-trending-up" size={16} strokeColor="#172B36" />
                    </a>
                    <a
                        href="#features"
                        className="border border-arctic/30 text-arctic font-semibold font-sans px-6 py-3 rounded-lg hover:border-forsythia hover:text-forsythia transition-colors duration-150 ease-out flex items-center justify-center gap-2"
                    >
                        Explore Features
                        <Icon name="link" size={16} strokeColor="currentColor" />
                    </a>
                </div>

                {/* Scroll indicator */}
                <div
                    className="mt-20 flex flex-col items-center gap-2 opacity-40"
                    style={{ animation: "fadeSlideUp 0.5s ease-out 800ms both" }}
                >
                    <span className="font-mono text-xs text-arctic/50 uppercase tracking-widest">Scroll to explore</span>
                    <Icon name="chevron-down" size={16} strokeColor="#F1F6F4" />
                </div>
            </div>
        </section>
    );
}