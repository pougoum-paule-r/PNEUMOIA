// src/components/sections/AboutSection.jsx
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Qui sommes nous ?
            </h2>
            <h3 className="text-2xl font-semibold text-blue-600 mb-6">
              Nous sommes là pour vous guider vers la solution
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous sommes une équipe passionnée par l'innovation médicale, spécialisée dans la création 
              de solutions intelligentes pour faciliter le diagnostic en pneumologie. Notre mission est 
              simple : vous aider à trouver la solution adaptée à vos besoins de santé grâce à la technologie.
            </p>
            {!isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Lire plus <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <p className="text-gray-600 leading-relaxed mb-4">
                  Notre approche combine l'expertise médicale avec les dernières avancées en intelligence 
                  artificielle pour offrir des diagnostics précis et rapides. Nous croyons en une médecine 
                  plus accessible, plus efficace et plus humaine.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Rejoignez-nous dans cette aventure qui transforme la façon dont les professionnels de 
                  santé diagnostiquent et traitent les pathologies respiratoires.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8"
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-4">À la recherche de soulagement ?</h4>
            <p className="text-gray-600 leading-relaxed">
              Nous mettons la technologie au service de votre santé pour vous offrir un accompagnement 
              fiable, humain et précis.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}