import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  MoreVertical,
  Eye,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Company {
  id: string;
  name: string;
  domain: string;
  email: string;
  phone: string;
  location: string;
  evaluations: number;
  lastEvaluation: string;
}

const AdminEntreprises = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const companies: Company[] = [
    { id: "1", name: "Entreprise ABC", domain: "Services", email: "contact@abc.com", phone: "+225 07 00 00 00", location: "Abidjan", evaluations: 3, lastEvaluation: "2024-01-15" },
    { id: "2", name: "Société XYZ", domain: "Industrie", email: "info@xyz.ci", phone: "+225 05 00 00 00", location: "Bouaké", evaluations: 1, lastEvaluation: "2024-01-14" },
    { id: "3", name: "Groupe Delta", domain: "Commerce", email: "contact@delta.com", phone: "+225 01 00 00 00", location: "Abidjan", evaluations: 2, lastEvaluation: "2024-01-14" },
    { id: "4", name: "Tech Corp", domain: "Technologie", email: "hello@techcorp.ci", phone: "+225 27 00 00 00", location: "Yamoussoukro", evaluations: 1, lastEvaluation: "2024-01-13" },
    { id: "5", name: "Innovate SA", domain: "Innovation", email: "contact@innovate.com", phone: "+225 07 11 11 11", location: "Abidjan", evaluations: 4, lastEvaluation: "2024-01-13" },
    { id: "6", name: "Global Services", domain: "Services", email: "info@global.ci", phone: "+225 05 22 22 22", location: "San Pedro", evaluations: 1, lastEvaluation: "2024-01-12" },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Entreprises
        </h1>
        <p className="text-muted-foreground">
          Gérez les entreprises inscrites sur la plateforme
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une entreprise, domaine ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {company.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{company.domain}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="w-4 h-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {company.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {company.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Évaluations</p>
                    <p className="font-semibold text-foreground">{company.evaluations}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Dernière</p>
                    <p className="font-medium text-foreground">
                      {new Date(company.lastEvaluation).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucune entreprise trouvée</p>
        </div>
      )}
    </div>
  );
};

export default AdminEntreprises;
