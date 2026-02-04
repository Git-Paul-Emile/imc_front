import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  ClipboardCheck, 
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AdminDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Évaluations totales",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: ClipboardCheck,
      color: "from-primary to-blue-400"
    },
    {
      title: "Entreprises inscrites",
      value: "328",
      change: "+8.2%",
      trend: "up",
      icon: Building2,
      color: "from-accent to-orange-400"
    },
    {
      title: "Évaluations ce mois",
      value: "156",
      change: "+23.1%",
      trend: "up",
      icon: TrendingUp,
      color: "from-success to-emerald-400"
    },
    {
      title: "Taux de conversion",
      value: "34.2%",
      change: "-2.4%",
      trend: "down",
      icon: Users,
      color: "from-violet-500 to-purple-400"
    }
  ];

  const chartData = [
    { month: "Jan", evaluations: 65 },
    { month: "Fév", evaluations: 89 },
    { month: "Mar", evaluations: 102 },
    { month: "Avr", evaluations: 78 },
    { month: "Mai", evaluations: 123 },
    { month: "Juin", evaluations: 156 }
  ];

  const themeDistribution = [
    { name: "Climat Social", value: 35, color: "#ec4899" },
    { name: "Leadership", value: 25, color: "#3b82f6" },
    { name: "Performance", value: 18, color: "#10b981" },
    { name: "Organisation", value: 12, color: "#8b5cf6" },
    { name: "Talents", value: 10, color: "#f59e0b" }
  ];

  const recentEvaluations = [
    { company: "Entreprise ABC", theme: "Climat Social", score: 45, date: "Il y a 2h" },
    { company: "Société XYZ", theme: "Leadership", score: 38, date: "Il y a 5h" },
    { company: "Groupe Delta", theme: "Performance", score: 52, date: "Il y a 8h" },
    { company: "Tech Corp", theme: "Organisation", score: 41, date: "Hier" },
    { company: "Innovate SA", theme: "Talents", score: 55, date: "Hier" }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des évaluations et statistiques
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          Dernière mise à jour : Aujourd'hui
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Évolution des évaluations</CardTitle>
            <CardDescription>Nombre d'évaluations par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    className="text-muted-foreground"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="evaluations" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Répartition par thème</CardTitle>
            <CardDescription>Distribution des évaluations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={themeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {themeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {themeDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Evaluations */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Évaluations récentes</CardTitle>
          <CardDescription>Les dernières évaluations complétées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Entreprise</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Thème</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Niveau</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEvaluations.map((evaluation, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-foreground">{evaluation.company}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{evaluation.theme}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${getScoreColor(evaluation.score)}`}>
                        {evaluation.score}/60
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        evaluation.score >= 50 ? "bg-success/10 text-success" :
                        evaluation.score >= 40 ? "bg-primary/10 text-primary" :
                        evaluation.score >= 30 ? "bg-warning/10 text-warning" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        {getScoreLabel(evaluation.score)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-sm">{evaluation.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
