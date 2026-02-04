import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileText, 
  X, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Target,
  RefreshCw
} from "lucide-react";
import { EvaluationTheme } from "@/data/evaluationThemes";
import { Link } from "react-router-dom";

interface ResultsViewProps {
  theme: EvaluationTheme;
  score: number;
  companyName: string;
  onRestart: () => void;
}

const ResultsView = ({ theme, score, companyName, onRestart }: ResultsViewProps) => {
  // Find the appropriate score range
  const scoreRange = theme.scoreRanges.find(
    range => score >= range.min && score <= range.max
  ) || theme.scoreRanges[0];

  // Calculate percentage for visualization
  const maxScore = 60;
  const minScore = 15;
  const percentage = ((score - minScore) / (maxScore - minScore)) * 100;

  // Determine score icon and color
  const getScoreIcon = () => {
    if (score >= 50) return <CheckCircle2 className="w-8 h-8" />;
    if (score >= 40) return <TrendingUp className="w-8 h-8" />;
    if (score >= 30) return <Target className="w-8 h-8" />;
    return <AlertTriangle className="w-8 h-8" />;
  };

  const getScoreColor = () => {
    if (score >= 50) return "from-success to-emerald-400";
    if (score >= 40) return "from-primary to-blue-400";
    if (score >= 30) return "from-warning to-amber-400";
    return "from-destructive to-red-400";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-xl mb-6"
      >
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${scoreRange.labelClass}`}>
            {getScoreIcon()}
            {scoreRange.label}
          </div>
          
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Résultats pour {companyName}
          </h1>
          <p className="text-muted-foreground">
            {theme.title}
          </p>
        </div>

        {/* Score Visualization */}
        <div className="relative mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>15 pts</span>
            <span className="font-display font-bold text-2xl text-foreground">{score} / 60</span>
            <span>60 pts</span>
          </div>
          
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className={`h-full rounded-full bg-gradient-to-r ${getScoreColor()}`}
            />
          </div>

          {/* Score Markers */}
          <div className="flex justify-between mt-2">
            {[15, 30, 40, 50, 60].map((mark) => (
              <div 
                key={mark}
                className={`text-xs ${score >= mark ? "text-foreground font-medium" : "text-muted-foreground"}`}
                style={{ marginLeft: mark === 15 ? 0 : 'auto', marginRight: mark === 60 ? 0 : 'auto' }}
              >
                {mark === 15 && "Critique"}
                {mark === 30 && "Fragile"}
                {mark === 40 && "Stable"}
                {mark === 50 && "Performant"}
              </div>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-muted/50 rounded-xl p-6 mb-6">
          <h3 className="font-display font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Analyse IMC
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {scoreRange.analysis}
          </p>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recommandations IMC
          </h3>
          <ul className="space-y-3">
            {scoreRange.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-sm text-warning-foreground">
          <p>
            <strong>Note :</strong> Les résultats fournis par cet outil constituent une première 
            analyse indicative et ne remplacent pas un audit ou un diagnostic approfondi 
            réalisé par un professionnel d'IMC.
          </p>
        </div>
      </motion.div>

      {/* Action Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <Link to="/contact" className="group">
          <div className="h-full bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-display font-semibold text-foreground mb-2">
              Contacter un conseiller
            </h4>
            <p className="text-muted-foreground text-sm">
              Échangez avec un expert IMC sur vos résultats
            </p>
          </div>
        </Link>

        <Link to="/contact?type=devis" className="group">
          <div className="h-full bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/20 transition-all">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-display font-semibold text-foreground mb-2">
              Demander un devis
            </h4>
            <p className="text-muted-foreground text-sm">
              Obtenez un accompagnement personnalisé
            </p>
          </div>
        </Link>

        <button onClick={onRestart} className="group text-left">
          <div className="h-full bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-muted-foreground/20 transition-all">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6 text-muted-foreground" />
            </div>
            <h4 className="font-display font-semibold text-foreground mb-2">
              Nouvelle évaluation
            </h4>
            <p className="text-muted-foreground text-sm">
              Évaluer un autre thème
            </p>
          </div>
        </button>
      </motion.div>

      {/* Premium Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <p className="text-muted-foreground text-sm mb-4">
          Vous avez utilisé votre évaluation gratuite. Pour accéder à d'autres thèmes :
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="hero">
            Acheter une évaluation
          </Button>
          <Link to="/contact">
            <Button variant="outline">
              Contacter IMC
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsView;
