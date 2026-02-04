import { Heart, Users, Target, Settings, GraduationCap } from "lucide-react";

export interface Question {
  id: string;
  text: string;
  category: string;
}

export interface ScoreRange {
  min: number;
  max: number;
  label: string;
  labelClass: string;
  analysis: string;
  recommendations: string[];
}

export interface EvaluationTheme {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof Heart;
  color: string;
  categories: { name: string; questions: string[] }[];
  scoreRanges: ScoreRange[];
}

export const evaluationThemes: EvaluationTheme[] = [
  {
    id: "climat-social",
    title: "Climat social et bien-être organisationnel",
    shortTitle: "Climat Social",
    description: "Évaluez les relations interpersonnelles, le bien-être et la culture d'engagement au sein de votre organisation.",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    categories: [
      {
        name: "Relations interprofessionnelles et confiance",
        questions: [
          "Les relations entre collaborateurs sont globalement saines et respectueuses.",
          "Les collaborateurs se sentent écoutés par leur hiérarchie.",
          "La confiance est présente entre les équipes et le management.",
          "Les conflits sont gérés de manière constructive.",
          "Le climat social favorise la collaboration plutôt que la compétition négative."
        ]
      },
      {
        name: "Bien-être et motivation",
        questions: [
          "Les collaborateurs se sentent motivés dans leur travail au quotidien.",
          "Les conditions de travail permettent un bon équilibre entre vie professionnelle et personnelle.",
          "Les efforts et les résultats sont reconnus à leur juste valeur.",
          "Le stress professionnel est maîtrisé dans l'organisation.",
          "Les collaborateurs se sentent respectés et considérés."
        ]
      },
      {
        name: "Culture et engagement",
        questions: [
          "Les valeurs de l'entreprise sont claires et partagées.",
          "Les collaborateurs se sentent fiers d'appartenir à l'organisation.",
          "La communication interne est fluide et transparente.",
          "Les différences culturelles, générationnelles ou sociales sont respectées.",
          "L'entreprise favorise un climat inclusif et équitable."
        ]
      }
    ],
    scoreRanges: [
      {
        min: 15,
        max: 29,
        label: "Critique",
        labelClass: "bg-destructive/10 text-destructive",
        analysis: "Les résultats indiquent un climat social fortement dégradé. Les relations internes semblent marquées par un manque de confiance, une communication insuffisante et des tensions non résolues.",
        recommendations: [
          "Un diagnostic social approfondi",
          "Un accompagnement managérial ciblé",
          "La mise en place d'un plan d'amélioration du climat social"
        ]
      },
      {
        min: 30,
        max: 39,
        label: "Fragile",
        labelClass: "bg-warning/10 text-warning",
        analysis: "Votre entreprise dispose de certaines bases positives, mais le climat social reste instable et vulnérable. Des difficultés peuvent être observées notamment dans la communication interne et la reconnaissance des efforts.",
        recommendations: [
          "Des actions ciblées d'amélioration du climat social",
          "Un accompagnement des managers",
          "La mise en place d'indicateurs de suivi du bien-être"
        ]
      },
      {
        min: 40,
        max: 49,
        label: "Stable",
        labelClass: "bg-primary/10 text-primary",
        analysis: "Le climat social de votre organisation est globalement sain et fonctionnel. Les relations de travail sont positives, le niveau de confiance est satisfaisant et les collaborateurs se sentent majoritairement impliqués.",
        recommendations: [
          "Consolider les pratiques actuelles",
          "Investir dans la prévention des risques psychosociaux",
          "Renforcer la culture managériale et la communication interne"
        ]
      },
      {
        min: 50,
        max: 60,
        label: "Performant",
        labelClass: "bg-success/10 text-success",
        analysis: "Votre entreprise bénéficie d'un climat social très favorable, caractérisé par un haut niveau de confiance, de motivation et d'engagement. Ce climat constitue un avantage compétitif majeur.",
        recommendations: [
          "Mise en place de dispositifs d'innovation sociale",
          "Développement de pratiques managériales avancées",
          "Positionnement comme référence en matière de climat social"
        ]
      }
    ]
  },
  {
    id: "leadership",
    title: "Leadership et gouvernance managériale",
    shortTitle: "Leadership",
    description: "Analysez la vision, la posture managériale et l'efficacité de la communication au sein de votre direction.",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
    categories: [
      {
        name: "Vision, posture et exemplarité",
        questions: [
          "La vision stratégique de l'entreprise est claire et partagée par les équipes.",
          "Les dirigeants et managers incarnent les valeurs de l'entreprise.",
          "Les managers font preuve d'exemplarité dans leurs comportements.",
          "Les décisions managériales sont cohérentes et assumées.",
          "Le leadership favorise la confiance et l'engagement."
        ]
      },
      {
        name: "Management des équipes",
        questions: [
          "Les objectifs sont clairement définis et compris par les équipes.",
          "Les managers savent motiver et mobiliser leurs collaborateurs.",
          "Le feedback est régulier, constructif et orienté amélioration.",
          "Les managers accompagnent efficacement le développement des compétences.",
          "Les situations difficiles sont gérées avec professionnalisme."
        ]
      },
      {
        name: "Communication & prise de décision",
        questions: [
          "La communication managériale est claire, ouverte et transparente.",
          "Les collaborateurs peuvent s'exprimer librement et être entendus.",
          "Les décisions sont prises dans des délais raisonnables.",
          "Les managers savent arbitrer et prioriser efficacement.",
          "Le management favorise l'intelligence collective."
        ]
      }
    ],
    scoreRanges: [
      {
        min: 15,
        max: 29,
        label: "Critique",
        labelClass: "bg-destructive/10 text-destructive",
        analysis: "Les résultats révèlent un leadership fragilisé et des pratiques managériales peu structurées. Le manque de vision partagée et l'insuffisance de communication génèrent désengagement et tensions.",
        recommendations: [
          "Un diagnostic managérial approfondi",
          "Un coaching des dirigeants et managers",
          "La mise en place de bases managériales solides"
        ]
      },
      {
        min: 30,
        max: 39,
        label: "Fragile",
        labelClass: "bg-warning/10 text-warning",
        analysis: "Le leadership existe mais reste inégal et peu homogène. Certaines pratiques managériales sont efficaces, mais d'autres manquent de cohérence ou de constance.",
        recommendations: [
          "Un renforcement des compétences managériales",
          "Des actions de coaching ciblées",
          "L'harmonisation des pratiques de leadership"
        ]
      },
      {
        min: 40,
        max: 49,
        label: "Stable",
        labelClass: "bg-primary/10 text-primary",
        analysis: "Le leadership est globalement fonctionnel et structuré. Les managers remplissent leur rôle, les équipes sont encadrées et les décisions sont majoritairement efficaces.",
        recommendations: [
          "Le développement du leadership transformationnel",
          "Le renforcement du feedback et de l'intelligence collective",
          "Des formations avancées en management"
        ]
      },
      {
        min: 50,
        max: 60,
        label: "Performant",
        labelClass: "bg-success/10 text-success",
        analysis: "Votre organisation bénéficie d'un leadership fort, structurant et inspirant. Les managers incarnent la vision, mobilisent les équipes et favorisent l'engagement durable.",
        recommendations: [
          "Maintien et valorisation des bonnes pratiques",
          "Dispositifs de leadership avancé",
          "Positionnement des managers comme leaders d'influence"
        ]
      }
    ]
  },
  {
    id: "performance",
    title: "Performance et engagement des équipes",
    shortTitle: "Performance",
    description: "Mesurez le pilotage des objectifs, l'engagement des collaborateurs et la culture de reconnaissance.",
    icon: Target,
    color: "from-emerald-500 to-teal-500",
    categories: [
      {
        name: "Objectifs & pilotage de la performance",
        questions: [
          "Les objectifs individuels et collectifs sont clairement définis.",
          "Les objectifs sont alignés avec la stratégie globale de l'entreprise.",
          "Les indicateurs de performance sont pertinents et suivis régulièrement.",
          "Les collaborateurs comprennent comment leur travail contribue aux résultats.",
          "Les résultats sont analysés et partagés de manière constructive."
        ]
      },
      {
        name: "Engagement & responsabilisation",
        questions: [
          "Les collaborateurs sont impliqués dans l'atteinte des résultats.",
          "Chacun se sent responsable de la performance collective.",
          "Les initiatives et les prises de responsabilité sont encouragées.",
          "Les collaborateurs font preuve de proactivité dans leur travail.",
          "L'engagement des équipes est stable et durable."
        ]
      },
      {
        name: "Reconnaissance & amélioration continue",
        questions: [
          "Les efforts et les résultats sont reconnus à leur juste valeur.",
          "Les performances individuelles et collectives sont valorisées.",
          "Les erreurs sont utilisées comme leviers d'apprentissage.",
          "L'entreprise encourage l'amélioration continue.",
          "La culture du résultat est positive et motivante."
        ]
      }
    ],
    scoreRanges: [
      {
        min: 15,
        max: 29,
        label: "Critique",
        labelClass: "bg-destructive/10 text-destructive",
        analysis: "Les résultats traduisent un faible niveau de performance et d'engagement. Les objectifs peuvent être flous, peu partagés ou mal suivis, limitant l'implication des équipes.",
        recommendations: [
          "Un diagnostic approfondi de la performance humaine",
          "La clarification des objectifs et des rôles",
          "La mise en place d'un système de pilotage de la performance"
        ]
      },
      {
        min: 30,
        max: 39,
        label: "Fragile",
        labelClass: "bg-warning/10 text-warning",
        analysis: "La performance existe, mais elle reste irrégulière et dépendante des individus. L'engagement peut varier selon les équipes, les managers ou les périodes.",
        recommendations: [
          "Le renforcement des mécanismes d'engagement",
          "L'harmonisation des pratiques de reconnaissance",
          "L'instauration d'une culture claire de la performance"
        ]
      },
      {
        min: 40,
        max: 49,
        label: "Stable",
        labelClass: "bg-primary/10 text-primary",
        analysis: "Votre organisation affiche un niveau de performance globalement satisfaisant. Les objectifs sont connus, les équipes engagées et les résultats atteints de manière régulière.",
        recommendations: [
          "L'optimisation des outils de pilotage",
          "Le développement de la reconnaissance et de la motivation",
          "Le renforcement de la culture de l'amélioration continue"
        ]
      },
      {
        min: 50,
        max: 60,
        label: "Performant",
        labelClass: "bg-success/10 text-success",
        analysis: "Votre entreprise bénéficie d'un haut niveau de performance et d'engagement. Les équipes sont responsabilisées, motivées et orientées résultats.",
        recommendations: [
          "La pérennisation des bonnes pratiques",
          "L'innovation dans le management de la performance",
          "Le positionnement comme organisation apprenante"
        ]
      }
    ]
  },
  {
    id: "organisation",
    title: "Organisation et efficacité opérationnelle",
    shortTitle: "Organisation",
    description: "Évaluez la clarté des rôles, l'efficacité des processus et la capacité d'adaptation de votre structure.",
    icon: Settings,
    color: "from-violet-500 to-purple-500",
    categories: [
      {
        name: "Structure et rôles",
        questions: [
          "Les rôles et responsabilités sont clairement définis dans l'organisation.",
          "Chaque collaborateur connaît précisément son périmètre d'action.",
          "Les fiches de poste sont claires et à jour.",
          "Les chevauchements de responsabilités sont limités.",
          "La structure organisationnelle est adaptée aux activités de l'entreprise."
        ]
      },
      {
        name: "Processus et coordination",
        questions: [
          "Les processus de travail sont clairement formalisés.",
          "Les circuits de décision sont simples et efficaces.",
          "La coordination entre les services est fluide.",
          "Les délais de traitement des tâches sont maîtrisés.",
          "Les dysfonctionnements organisationnels sont rapidement corrigés."
        ]
      },
      {
        name: "Agilité et amélioration continue",
        questions: [
          "L'organisation s'adapte facilement aux changements.",
          "Les collaborateurs comprennent les évolutions organisationnelles.",
          "Les outils de travail sont adaptés aux besoins opérationnels.",
          "L'entreprise encourage la remise en question des pratiques existantes.",
          "L'amélioration continue fait partie de la culture interne."
        ]
      }
    ],
    scoreRanges: [
      {
        min: 15,
        max: 29,
        label: "Inefficace",
        labelClass: "bg-destructive/10 text-destructive",
        analysis: "Les résultats mettent en évidence une organisation peu structurée, avec des rôles flous, des processus inefficaces et une coordination insuffisante entre les équipes.",
        recommendations: [
          "Un diagnostic organisationnel approfondi",
          "La clarification des rôles et responsabilités",
          "La refonte des processus clés"
        ]
      },
      {
        min: 30,
        max: 39,
        label: "Fragile",
        labelClass: "bg-warning/10 text-warning",
        analysis: "L'organisation fonctionne, mais de manière perfectible et inégale. Certains processus sont efficaces, tandis que d'autres freinent la performance et la réactivité.",
        recommendations: [
          "L'optimisation des processus existants",
          "L'amélioration de la coordination interservices",
          "L'accompagnement dans la conduite du changement"
        ]
      },
      {
        min: 40,
        max: 49,
        label: "Fonctionnelle",
        labelClass: "bg-primary/10 text-primary",
        analysis: "Votre organisation est globalement structurée et opérationnelle. Les processus sont identifiés, les rôles clairs et la coordination globalement efficace.",
        recommendations: [
          "L'amélioration continue des processus",
          "Le renforcement des outils de pilotage opérationnel",
          "L'anticipation des évolutions organisationnelles"
        ]
      },
      {
        min: 50,
        max: 60,
        label: "Agile & Performante",
        labelClass: "bg-success/10 text-success",
        analysis: "Votre entreprise bénéficie d'une organisation fluide, structurée et adaptable. Les processus soutiennent la performance et facilitent l'atteinte des objectifs.",
        recommendations: [
          "La pérennisation des bonnes pratiques",
          "L'innovation organisationnelle",
          "Le partage des standards d'excellence en interne"
        ]
      }
    ]
  },
  {
    id: "talents",
    title: "Développement des talents et compétences",
    shortTitle: "Talents",
    description: "Analysez votre capacité à identifier, développer et fidéliser les talents au sein de votre organisation.",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-500",
    categories: [
      {
        name: "Identification & gestion des talents",
        questions: [
          "Les compétences clés nécessaires à la performance sont clairement identifiées.",
          "L'entreprise sait repérer les talents à fort potentiel.",
          "Les postes sont occupés par des profils adaptés aux exigences du rôle.",
          "Les talents sont valorisés et reconnus au sein de l'organisation.",
          "La gestion des talents est alignée avec la stratégie de l'entreprise."
        ]
      },
      {
        name: "Formation & développement des compétences",
        questions: [
          "L'entreprise dispose d'un plan de formation structuré.",
          "Les formations proposées répondent aux besoins réels des équipes.",
          "Les collaborateurs ont des opportunités de développement professionnel.",
          "Le coaching et l'accompagnement individuel sont encouragés.",
          "Les compétences acquises sont mises en pratique dans le travail quotidien."
        ]
      },
      {
        name: "Évolution professionnelle & fidélisation",
        questions: [
          "Les perspectives d'évolution professionnelle sont claires.",
          "Les mobilités internes sont encouragées et accompagnées.",
          "Les collaborateurs se projettent durablement dans l'entreprise.",
          "L'entreprise agit pour limiter le turnover des talents clés.",
          "La culture de l'apprentissage continu est bien ancrée."
        ]
      }
    ],
    scoreRanges: [
      {
        min: 15,
        max: 29,
        label: "Critique",
        labelClass: "bg-destructive/10 text-destructive",
        analysis: "Les résultats révèlent une faible structuration des pratiques de gestion des talents. Les compétences ne sont pas suffisamment identifiées et les parcours de développement sont limités.",
        recommendations: [
          "Un diagnostic RH approfondi",
          "La structuration de la gestion des compétences",
          "La mise en place de parcours de développement adaptés"
        ]
      },
      {
        min: 30,
        max: 39,
        label: "Fragile",
        labelClass: "bg-warning/10 text-warning",
        analysis: "Certaines pratiques existent, mais elles restent peu formalisées et inégales. Le développement des talents dépend souvent d'initiatives ponctuelles plutôt que d'une stratégie claire.",
        recommendations: [
          "La formalisation des pratiques RH",
          "Le déploiement de plans de formation ciblés",
          "Le renforcement du coaching et de l'accompagnement"
        ]
      },
      {
        min: 40,
        max: 49,
        label: "Structurée",
        labelClass: "bg-primary/10 text-primary",
        analysis: "Votre entreprise dispose de pratiques globalement structurées et efficaces. Les talents sont identifiés, les compétences développées et les collaborateurs engagés.",
        recommendations: [
          "L'optimisation des parcours professionnels",
          "Le renforcement de la mobilité interne",
          "L'ancrage d'une culture forte de développement continu"
        ]
      },
      {
        min: 50,
        max: 60,
        label: "Performante",
        labelClass: "bg-success/10 text-success",
        analysis: "Votre organisation bénéficie d'une gestion des talents mature et performante. Les compétences sont alignées avec la stratégie, les collaborateurs sont engagés et fidélisés.",
        recommendations: [
          "L'innovation dans les pratiques RH",
          "Le développement des leaders de demain",
          "Le positionnement comme employeur de référence"
        ]
      }
    ]
  }
];

export const answerOptions = [
  { value: 1, label: "Pas du tout d'accord" },
  { value: 2, label: "Peu d'accord" },
  { value: 3, label: "Plutôt d'accord" },
  { value: 4, label: "Tout à fait d'accord" }
];
