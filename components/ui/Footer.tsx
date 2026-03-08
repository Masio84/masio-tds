export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-neutral-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="text-2xl font-bold text-white mb-2">
                            @MASIO.TDS
                        </span>
                        <span className="text-neutral-500 max-w-sm text-sm">
                            Creative Developer Studio. masio.tds@gmail.com. Transformando ideas complejas en experiencias digitales elegantes, rápidas y escalables.
                        </span>
                    </div>

                    <div className="flex space-x-6 text-sm font-medium text-neutral-400">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                            Twitter
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                            LinkedIn
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
                    <p>© {new Date().getFullYear()} Masio Technologies & Digital Solutions. Todos los derechos reservados.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-blue-500 transition-colors">Política de Privacidad</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Términos de Servicio</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
