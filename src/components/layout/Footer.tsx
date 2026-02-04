import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">
                  IMC
                </span>
              </div>
              <span className="font-display font-semibold text-lg">
                Impact Management
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Accompagnement stratégique pour transformer vos organisations et développer le potentiel humain de vos équipes.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-background text-sm transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/evaluation"
                  className="text-muted-foreground hover:text-background text-sm transition-colors"
                >
                  Évaluer ma structure
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-background text-sm transition-colors"
                >
                  À propos d'IMC
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-background text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Nos services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground text-sm">
                  Diagnostic organisationnel
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Coaching managérial
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Accompagnement RH
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Formation & développement
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-primary" />
                <span className="text-muted-foreground text-sm">
                  contact@imc-company.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-primary" />
                <span className="text-muted-foreground text-sm">
                  +225 27 22 00 00 00
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <span className="text-muted-foreground text-sm">
                  Abidjan, Côte d'Ivoire
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-muted/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} IMC - Impact Management Company. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-background text-sm transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-background text-sm transition-colors"
            >
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
