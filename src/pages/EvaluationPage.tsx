import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2 } from "lucide-react";
import { evaluationThemes } from "@/data/evaluationThemes";
import ThemeCard from "@/components/evaluation/ThemeCard";
import QuestionnaireForm from "@/components/evaluation/QuestionnaireForm";
import ResultsView from "@/components/evaluation/ResultsView";

type EvaluationStep = "theme-selection" | "company-info" | "questionnaire" | "results";

interface CompanyInfo {
  name: string;
  domain: string;
  phone: string;
  email: string;
  location: string;
  objective: string;
}

const EvaluationPage = () => {
  const [searchParams] = useSearchParams();
  const initialTheme = searchParams.get("theme");
  
  const [step, setStep] = useState<EvaluationStep>(initialTheme ? "company-info" : "theme-selection");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(initialTheme);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "",
    domain: "",
    phone: "",
    email: "",
    location: "",
    objective: ""
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);

  const theme = evaluationThemes.find(t => t.id === selectedTheme);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setStep("company-info");
  };

  const handleCompanyInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("questionnaire");
  };

  const handleQuestionnaireComplete = (score: number, questionAnswers: Record<string, number>) => {
    setTotalScore(score);
    setAnswers(questionAnswers);
    setStep("results");
  };

  const handleRestart = () => {
    setStep("theme-selection");
    setSelectedTheme(null);
    setAnswers({});
    setTotalScore(0);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto max-w-5xl">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {["theme-selection", "company-info", "questionnaire", "results"].map((s, index) => {
              const stepLabels = ["Thème", "Entreprise", "Questions", "Résultats"];
              const currentIndex = ["theme-selection", "company-info", "questionnaire", "results"].indexOf(step);
              const isActive = index === currentIndex;
              const isCompleted = index < currentIndex;
              
              return (
                <div key={s} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                        isCompleted 
                          ? "bg-success text-success-foreground" 
                          : isActive 
                            ? "gradient-primary text-primary-foreground shadow-glow" 
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className={`text-xs mt-1 hidden sm:block ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {stepLabels[index]}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`w-8 sm:w-16 h-1 rounded-full ${index < currentIndex ? "bg-success" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Theme Selection */}
          {step === "theme-selection" && (
            <motion.div
              key="theme-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Choisissez votre thème d'évaluation
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Sélectionnez le domaine que vous souhaitez analyser. Chaque évaluation 
                  comprend 15 questions et dure environ 5 minutes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {evaluationThemes.map((t, index) => (
                  <ThemeCard 
                    key={t.id} 
                    theme={t} 
                    onSelect={handleThemeSelect}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Company Info */}
          {step === "company-info" && theme && (
            <motion.div
              key="company-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={() => setStep("theme-selection")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Changer de thème
                </button>

                <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center shadow-lg`}>
                      <theme.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">
                        {theme.shortTitle}
                      </h2>
                      <p className="text-muted-foreground text-sm">15 questions • ~5 minutes</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      <h3 className="font-display font-semibold text-foreground">
                        Informations sur votre structure
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Ces informations sont strictement confidentielles.
                    </p>
                  </div>

                  <form onSubmit={handleCompanyInfoSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom de la structure *</Label>
                        <Input
                          id="name"
                          value={companyInfo.name}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                          placeholder="Ex: Entreprise ABC"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="domain">Domaine d'activité *</Label>
                        <Input
                          id="domain"
                          value={companyInfo.domain}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, domain: e.target.value })}
                          placeholder="Ex: Services, Industrie..."
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={companyInfo.phone}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                          placeholder="+225 07 XX XX XX XX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Adresse e-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={companyInfo.email}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                          placeholder="contact@entreprise.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation *</Label>
                      <Input
                        id="location"
                        value={companyInfo.location}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })}
                        placeholder="Ex: Abidjan, Cocody"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="objective">Objectif de l'évaluation *</Label>
                      <Textarea
                        id="objective"
                        value={companyInfo.objective}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, objective: e.target.value })}
                        placeholder="Décrivez brièvement pourquoi vous souhaitez réaliser cette évaluation..."
                        rows={3}
                        required
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Continuer vers les questions
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Questionnaire */}
          {step === "questionnaire" && theme && (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionnaireForm 
                theme={theme} 
                onComplete={handleQuestionnaireComplete}
                onBack={() => setStep("company-info")}
              />
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === "results" && theme && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsView 
                theme={theme} 
                score={totalScore} 
                companyName={companyInfo.name}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EvaluationPage;
