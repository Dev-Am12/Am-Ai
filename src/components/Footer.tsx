import Icon from "./Icon";

export default function Footer() {
    const productLinks = ["Features", "Pricing", "Changelog", "Roadmap"];
    const companyLinks = ["About", "Blog", "Careers", "Contact"];

    return (
        <footer className="bg-oceanic border-t border-nocturnal pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <p className="font-mono font-bold text-xl text-forsythia mb-3">NeuralFlow</p>
                        <p className="font-sans text-arctic/60 text-sm leading-relaxed mb-6">
                            Automating the future of data, one pipeline at a time.
                        </p>
                        <div className="flex gap-4">
                            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
                                <a key={s} href="#" className="flex items-center gap-1 font-sans text-arctic/50 hover:text-forsythia text-xs transition-colors duration-150">
                                    <Icon name="chevron-right" size={12} strokeColor="currentColor" />
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <p className="font-sans font-semibold text-arctic text-xs uppercase tracking-widest mb-4">Product</p>
                        <ul className="flex flex-col gap-2.5">
                            {productLinks.map((l) => (
                                <li key={l} className="flex items-center gap-1.5">
                                    <Icon name="chevron-right" size={12} strokeColor="#FFC801" />
                                    <a href="#" className="font-sans text-arctic/60 hover:text-forsythia text-sm transition-colors duration-150">{l}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="font-sans font-semibold text-arctic text-xs uppercase tracking-widest mb-4">Company</p>
                        <ul className="flex flex-col gap-2.5">
                            {companyLinks.map((l) => (
                                <li key={l} className="flex items-center gap-1.5">
                                    <Icon name="chevron-right" size={12} strokeColor="#FFC801" />
                                    <a href="#" className="font-sans text-arctic/60 hover:text-forsythia text-sm transition-colors duration-150">{l}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-nocturnal mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-2">
                    <p className="font-sans text-arctic/40 text-sm">© 2026 NeuralFlow. All rights reserved.</p>
                    <p className="font-sans text-arctic/40 text-sm">Built for the Next-Gen AI Hackathon</p>
                </div>
            </div>
        </footer>
    );
}