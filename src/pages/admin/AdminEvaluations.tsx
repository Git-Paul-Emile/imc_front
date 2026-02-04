import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { evaluationThemes } from "@/data/evaluationThemes";

interface Evaluation {
  id: string;
  company: string;
  theme: string;
  themeId: string;
  score: number;
  date: string;
  email: string;
  phone: string;
  location: string;
}

const AdminEvaluations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [themeFilter, setThemeFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data
  const evaluations: Evaluation[] = [
    { id: "1", company: "Entreprise ABC", theme: "Climat Social", themeId: "climat-social", score: 45, date: "2024-01-15", email: "contact@abc.com", phone: "+225 07 00 00 00", location: "Abidjan" },
    { id: "2", company: "Société XYZ", theme: "Leadership", themeId: "leadership", score: 38, date: "2024-01-14", email: "info@xyz.ci", phone: "+225 05 00 00 00", location: "Bouaké" },
    { id: "3", company: "Groupe Delta", theme: "Performance", themeId: "performance", score: 52, date: "2024-01-14", email: "contact@delta.com", phone: "+225 01 00 00 00", location: "Abidjan" },
    { id: "4", company: "Tech Corp", theme: "Organisation", themeId: "organisation", score: 41, date: "2024-01-13", email: "hello@techcorp.ci", phone: "+225 27 00 00 00", location: "Yamoussoukro" },
    { id: "5", company: "Innovate SA", theme: "Talents", themeId: "talents", score: 55, date: "2024-01-13", email: "contact@innovate.com", phone: "+225 07 11 11 11", location: "Abidjan" },
    { id: "6", company: "Global Services", theme: "Climat Social", themeId: "climat-social", score: 28, date: "2024-01-12", email: "info@global.ci", phone: "+225 05 22 22 22", location: "San Pedro" },
    { id: "7", company: "Future Industries", theme: "Leadership", themeId: "leadership", score: 47, date: "2024-01-12", email: "contact@future.com", phone: "+225 01 33 33 33", location: "Abidjan" },
    { id: "8", company: "Prime Solutions", theme: "Performance", themeId: "performance", score: 33, date: "2024-01-11", email: "hello@prime.ci", phone: "+225 07 44 44 44", location: "Korhogo" },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 50) return "text-success";
    if (score >= 40) return "text-primary";
    if (score >= 30) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 50) return "Performant";
    if (score >= 40) return "Stable";
    if (score >= 30) return "Fragile";
    return "Critique";
  };

  const getScoreBadgeClass = (score: number) => {
    if (score >= 50) return "bg-success/10 text-success";
    if (score >= 40) return "bg-primary/10 text-primary";
    if (score >= 30) return "bg-warning/10 text-warning";
    return "bg-destructive/10 text-destructive";
  };

  // Filter evaluations
  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         evaluation.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = themeFilter === "all" || evaluation.themeId === themeFilter;
    const matchesScore = scoreFilter === "all" ||
      (scoreFilter === "performant" && evaluation.score >= 50) ||
      (scoreFilter === "stable" && evaluation.score >= 40 && evaluation.score < 50) ||
      (scoreFilter === "fragile" && evaluation.score >= 30 && evaluation.score < 40) ||
      (scoreFilter === "critique" && evaluation.score < 30);
    
    return matchesSearch && matchesTheme && matchesScore;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);
  const paginatedEvaluations = filteredEvaluations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const theme = selectedEvaluation 
    ? evaluationThemes.find(t => t.id === selectedEvaluation.themeId) 
    : null;
  
  const scoreRange = theme && selectedEvaluation
    ? theme.scoreRanges.find(r => selectedEvaluation.score >= r.min && selectedEvaluation.score <= r.max)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Évaluations
        </h1>
        <p className="text-muted-foreground">
          Consultez et gérez toutes les évaluations réalisées
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une entreprise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={themeFilter} onValueChange={setThemeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tous les thèmes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les thèmes</SelectItem>
                {evaluationThemes.map(theme => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.shortTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={scoreFilter} onValueChange={setScoreFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tous les niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="performant">Performant (50-60)</SelectItem>
                <SelectItem value="stable">Stable (40-49)</SelectItem>
                <SelectItem value="fragile">Fragile (30-39)</SelectItem>
                <SelectItem value="critique">Critique (15-29)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Entreprise</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Thème</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Score</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Niveau</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEvaluations.map((evaluation, index) => (
                  <motion.tr 
                    key={evaluation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-medium text-foreground">{evaluation.company}</span>
                        <p className="text-sm text-muted-foreground">{evaluation.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{evaluation.theme}</td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${getScoreColor(evaluation.score)}`}>
                        {evaluation.score}/60
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getScoreBadgeClass(evaluation.score)}`}>
                        {getScoreLabel(evaluation.score)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(evaluation.date).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedEvaluation(evaluation)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Voir
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages} ({filteredEvaluations.length} résultats)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Detail Dialog */}
      <Dialog open={!!selectedEvaluation} onOpenChange={() => setSelectedEvaluation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEvaluation && theme && scoreRange && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  {selectedEvaluation.company}
                </DialogTitle>
                <DialogDescription>
                  Détails de l'évaluation {selectedEvaluation.theme}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Score */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground">Score obtenu</p>
                    <p className={`text-3xl font-display font-bold ${getScoreColor(selectedEvaluation.score)}`}>
                      {selectedEvaluation.score}/60
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getScoreBadgeClass(selectedEvaluation.score)}`}>
                    {scoreRange.label}
                  </span>
                </div>

                {/* Company Info */}
                <div>
                  <h4 className="font-display font-semibold mb-3">Informations entreprise</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedEvaluation.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{selectedEvaluation.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Localisation</p>
                      <p className="font-medium">{selectedEvaluation.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date d'évaluation</p>
                      <p className="font-medium">
                        {new Date(selectedEvaluation.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div>
                  <h4 className="font-display font-semibold mb-3">Analyse IMC</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {scoreRange.analysis}
                  </p>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-display font-semibold mb-3">Recommandations</h4>
                  <ul className="space-y-2">
                    {scoreRange.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Exporter PDF
                  </Button>
                  <Button variant="hero">
                    Contacter l'entreprise
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvaluations;
