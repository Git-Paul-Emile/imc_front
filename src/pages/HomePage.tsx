import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, Target, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { evaluationThemes } from "@/data/evaluationThemes";
import heroImage from "@/assets/hero-illustration.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HomePage = () => {
  const features = [
    {
      icon: Users,
      title: "Approche humaine",
      description: "Une évaluation centrée sur le capital humain de votre organisation"
    },
    {
      icon: Target,
      title: "Diagnostic précis",
      description: "5 thèmes clés pour une analyse complète de votre structure"
    },
    {
      icon: Shield,
      title: "Confidentialité",
      description: "Vos données sont protégées et traitées de façon confidentielle"
    },
    {
      icon: Sparkles,
      title: "Recommandations",
      description: "Des conseils personnalisés par les experts IMC"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Évaluation gratuite disponible
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Évaluez la santé de{" "}
                <span className="text-gradient-primary">votre entreprise</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                IMC - Impact Management Company vous accompagne dans l'analyse globale 
                de votre structure à travers une démarche structurée et confidentielle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/evaluation">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Commencer l'évaluation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    En savoir plus
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">+500</span> entreprises accompagnées
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Équipe collaborative"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Évaluation rapide</p>
                    <p className="text-sm text-muted-foreground">15 questions • 5 min</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Pourquoi choisir IMC ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Une approche unique centrée sur l'humain pour accompagner la transformation 
              de votre organisation.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              5 thèmes d'évaluation
            </h2>
            <p className="text-lg text-muted-foreground">
              Choisissez le domaine que vous souhaitez évaluer pour obtenir un diagnostic 
              personnalisé et des recommandations adaptées.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {evaluationThemes.map((theme, index) => (
              <motion.div
                key={theme.id}
                variants={fadeInUp}
                className={`group relative p-6 bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  index === 4 ? "lg:col-start-2" : ""
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <theme.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {theme.shortTitle}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {theme.description}
                </p>
                
                <Link to={`/evaluation?theme=${theme.id}`}>
                  <Button variant="ghost" className="gap-2 p-0 h-auto text-primary hover:text-primary/80">
                    Évaluer ce thème
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Prêt à évaluer votre structure ?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8">
                Bénéficiez d'une première évaluation gratuite et découvrez les axes 
                d'amélioration de votre organisation.
              </p>
              <Link to="/evaluation">
                <Button variant="glass" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
