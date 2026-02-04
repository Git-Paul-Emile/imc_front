import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { EvaluationTheme, answerOptions } from "@/data/evaluationThemes";
import { Progress } from "@/components/ui/progress";

interface QuestionnaireFormProps {
  theme: EvaluationTheme;
  onComplete: (score: number, answers: Record<string, number>) => void;
  onBack: () => void;
}

const QuestionnaireForm = ({ theme, onComplete, onBack }: QuestionnaireFormProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Flatten all questions with category info
  const allQuestions = theme.categories.flatMap((category, catIndex) =>
    category.questions.map((question, qIndex) => ({
      id: `${catIndex}-${qIndex}`,
      text: question,
      category: category.name,
      categoryIndex: catIndex
    }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const currentAnswer = answers[currentQuestion.id];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate total score
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      onComplete(totalScore, answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux informations
      </button>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
        {/* Theme Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center shadow-lg`}>
            <theme.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-bold text-foreground">
              {theme.shortTitle}
            </h2>
            <p className="text-muted-foreground text-sm">
              Question {currentQuestionIndex + 1} sur {totalQuestions}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Début</span>
            <span>{Math.round(progress)}%</span>
            <span>Fin</span>
          </div>
        </div>

        {/* Category Label */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${theme.color} text-primary-foreground`}>
            {currentQuestion.category}
          </span>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-8 leading-relaxed">
              {currentQuestion.text}
            </h3>

            {/* Answer Options */}
            <div className="grid gap-3">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`group relative w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                    currentAnswer === option.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        currentAnswer === option.value 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground/30 group-hover:border-primary/50"
                      }`}
                    >
                      {currentAnswer === option.value && (
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm md:text-base font-medium ${
                        currentAnswer === option.value ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        {option.label}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      currentAnswer === option.value 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {option.value} pt{option.value > 1 ? "s" : ""}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>

          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-2"
          >
            {isLastQuestion ? "Voir les résultats" : "Suivant"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {allQuestions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
              index === currentQuestionIndex
                ? "gradient-primary text-primary-foreground shadow-md"
                : answers[`${allQuestions[index].id}`] !== undefined
                  ? "bg-success/20 text-success"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionnaireForm;
