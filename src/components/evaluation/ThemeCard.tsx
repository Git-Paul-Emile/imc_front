import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EvaluationTheme } from "@/data/evaluationThemes";

interface ThemeCardProps {
  theme: EvaluationTheme;
  onSelect: (themeId: string) => void;
  index: number;
}

const ThemeCard = ({ theme, onSelect, index }: ThemeCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={() => onSelect(theme.id)}
      className={`group relative p-6 bg-card rounded-2xl border border-border text-left overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        index === 4 ? "lg:col-start-2" : ""
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
      
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <theme.icon className="w-7 h-7 text-primary-foreground" />
      </div>
      
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {theme.shortTitle}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {theme.description}
      </p>
      
      <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
        Commencer l'évaluation
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.button>
  );
};

export default ThemeCard;
