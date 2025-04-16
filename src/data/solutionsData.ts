import { 
  Cpu, 
  Server, 
  BarChart3, 
  Eye, 
  Clock, 
  Database, 
  Bot, 
  Network,
  Settings,
  Cable
} from 'lucide-react';

export interface Solution {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: React.ElementType;
  features: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  image: string;
  caseStudy?: {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

const solutionsData: Solution[] = [
  {
    id: 'scada',
    title: 'Sistemas SCADA',
    shortDescription: 'Supervisão, controle e aquisição de dados em tempo real.',
    description: 'Interfaces avançadas para supervisão, controle e aquisição de dados em tempo real, com dashboards personalizáveis e alertas inteligentes. Desenvolvemos soluções SCADA completas e personalizadas para sua indústria.',
    icon: Cpu,
    features: [
      'Visualização em tempo real de processos',
      'Históricos e relatórios customizados',
      'Alarmes e notificações configuráveis',
      'Interfaces intuitivas e responsivas',
      'Acesso remoto seguro via web/mobile'
    ],
    benefits: [
      {
        title: 'Visibilidade Completa',
        description: 'Monitore todos os aspectos de sua operação em uma única interface integrada.'
      },
      {
        title: 'Tomada de Decisão Rápida',
        description: 'Acesso instantâneo a dados críticos permite resposta imediata a problemas.'
      },
      {
        title: 'Eficiência Operacional',
        description: 'Otimize processos com base em dados precisos e análises detalhadas.'
      }
    ],
    image: '/images/solutions/scada.jpg',
    caseStudy: {
      client: 'Indústria Metalúrgica ABC',
      industry: 'Metalurgia',
      challenge: 'Monitoramento ineficiente de múltiplas linhas de produção e falta de integração entre sistemas legados.',
      solution: 'Implementação de sistema SCADA personalizado integrado aos equipamentos existentes, com painéis de controle específicos para cada departamento.',
      results: [
        'Aumento de 23% na eficiência operacional',
        'Redução de 15% no tempo de paradas não programadas',
        'Integração completa com sistema ERP existente'
      ]
    }
  },
  {
    id: 'iot-industrial',
    title: 'IoT Industrial',
    shortDescription: 'Conectividade entre dispositivos e sistemas industriais.',
    description: 'Redes de sensores inteligentes conectados à nuvem para monitoramento remoto, análise preditiva e tomada de decisão automatizada. Transforme sua fábrica em uma operação inteligente e conectada.',
    icon: Server,
    features: [
      'Sensores inteligentes wireless/cabeados',
      'Gateway de comunicação seguro',
      'Plataforma em nuvem escalável',
      'Análise avançada de dados',
      'Integração com sistemas existentes'
    ],
    benefits: [
      {
        title: 'Manutenção Preditiva',
        description: 'Preveja falhas antes que ocorram, reduzindo tempo de inatividade.'
      },
      {
        title: 'Economia de Energia',
        description: 'Otimize o consumo de recursos baseado em dados de uso real.'
      },
      {
        title: 'Escalabilidade',
        description: 'Expanda facilmente sua infraestrutura à medida que sua operação cresce.'
      }
    ],
    image: '/images/solutions/iot.jpg'
  },
  {
    id: 'integracao-mes-erp',
    title: 'Integração MES/ERP',
    shortDescription: 'Conectividade entre sistemas de fábrica e gestão empresarial.',
    description: 'Conectividade perfeita entre sistemas de chão de fábrica e gestão empresarial para fluxo de informações em tempo real. Elimine ilhas de informação e unifique seus dados.',
    icon: BarChart3,
    features: [
      'Fluxo bidirecional de dados',
      'Rastreabilidade completa de produto',
      'Gestão de recursos e materiais',
      'KPIs operacionais em tempo real',
      'Planejamento e programação integrados'
    ],
    benefits: [
      {
        title: 'Dados Consistentes',
        description: 'Elimine discrepâncias entre sistemas de produção e gestão.'
      },
      {
        title: 'Planejamento Otimizado',
        description: 'Tome decisões com base em dados reais de produção e vendas.'
      },
      {
        title: 'Visibilidade Completa',
        description: 'Acompanhe todo o ciclo de produção do pedido ao produto acabado.'
      }
    ],
    image: '/images/solutions/mes-erp.jpg'
  },
  {
    id: 'visao-computacional',
    title: 'Visão Computacional',
    shortDescription: 'Inspeção visual automatizada com IA.',
    description: 'Sistemas de inspeção visual automatizados com IA para controle de qualidade, detecção de defeitos e classificação. Garanta a qualidade do seu produto com precisão superior à inspeção humana.',
    icon: Eye,
    features: [
      'Câmeras de alta resolução',
      'Algoritmos de processamento de imagem',
      'IA para detecção de anomalias',
      'Classificação automática de produtos',
      'Integração com sistemas de controle'
    ],
    benefits: [
      {
        title: 'Qualidade Consistente',
        description: 'Inspeção 100% automatizada elimina variabilidade humana.'
      },
      {
        title: 'Economia de Recursos',
        description: 'Reduza desperdício identificando problemas precocemente.'
      },
      {
        title: 'Velocidade de Produção',
        description: 'Inspecione produtos em alta velocidade sem comprometer qualidade.'
      }
    ],
    image: '/images/solutions/vision.jpg'
  },
  {
    id: 'manutencao-preditiva',
    title: 'Manutenção Preditiva',
    shortDescription: 'Previsão de falhas com base em análise de dados.',
    description: 'Monitoramento contínuo de equipamentos com análise avançada para prever falhas antes que ocorram, reduzindo tempo de inatividade e custos de manutenção.',
    icon: Clock,
    features: [
      'Sensores de vibração, temperatura e corrente',
      'Análise de tendências e padrões',
      'Alertas preventivos configuráveis',
      'Integração com sistema de manutenção',
      'Dashboards de saúde de equipamentos'
    ],
    benefits: [
      {
        title: 'Redução de Paradas',
        description: 'Minimize tempo de inatividade não programado de equipamentos críticos.'
      },
      {
        title: 'Aumento de Vida Útil',
        description: 'Estenda a vida útil de seus ativos com intervenções no momento certo.'
      },
      {
        title: 'Otimização de Recursos',
        description: 'Direcione equipes de manutenção apenas onde realmente necessário.'
      }
    ],
    image: '/images/solutions/predictive.jpg'
  },
  {
    id: 'automacao-plcs',
    title: 'Automação com PLCs',
    shortDescription: 'Controle lógico programável para processos industriais.',
    description: 'Sistemas de controle baseados em PLCs de diversas marcas, programados para automatizar processos específicos da sua indústria, com interfaces HMI intuitivas para operação.',
    icon: Settings,
    features: [
      'Programação em linguagens IEC 61131-3',
      'Integração com sensores e atuadores',
      'Painéis de controle customizados',
      'Interfaces homem-máquina intuitivas',
      'Redundância para processos críticos'
    ],
    benefits: [
      {
        title: 'Confiabilidade',
        description: 'Sistemas robustos projetados para operação contínua em ambientes industriais.'
      },
      {
        title: 'Flexibilidade',
        description: 'Adaptação rápida a mudanças nos requisitos de produção.'
      },
      {
        title: 'Padronização',
        description: 'Aplicação de padrões industriais reconhecidos para facilitar manutenção.'
      }
    ],
    image: '/images/solutions/plc.jpg'
  },
  {
    id: 'big-data-analytics',
    title: 'Big Data & Analytics',
    shortDescription: 'Análise avançada de grandes volumes de dados.',
    description: 'Coleta, armazenamento e análise de grandes volumes de dados industriais para extrair insights valiosos e otimizar processos de produção através de dashboards e relatórios personalizados.',
    icon: Database,
    features: [
      'Data lakes industriais',
      'Processamento em tempo real/batch',
      'Visualização avançada de dados',
      'Algoritmos de machine learning',
      'Modelagem preditiva de processos'
    ],
    benefits: [
      {
        title: 'Insights Acionáveis',
        description: 'Transforme dados brutos em informações que orientam decisões estratégicas.'
      },
      {
        title: 'Detecção de Padrões',
        description: 'Identifique tendências e correlações invisíveis em análises tradicionais.'
      },
      {
        title: 'Melhoria Contínua',
        description: 'Otimize constantemente processos com base em feedback de dados.'
      }
    ],
    image: '/images/solutions/analytics.jpg'
  },
  {
    id: 'automacao-robotica',
    title: 'Automação Robótica',
    shortDescription: 'Implementação e programação de robôs industriais.',
    description: 'Implementação e integração de robôs industriais para tarefas repetitivas, perigosas ou que exigem alta precisão, aumentando produtividade e qualidade.',
    icon: Bot,
    features: [
      'Programação de robôs industriais',
      'Células robotizadas completas',
      'Integração com sistemas de visão',
      'Simulação de processos robóticos',
      'Safety compliant com normas vigentes'
    ],
    benefits: [
      {
        title: 'Precisão e Repetibilidade',
        description: 'Garanta operações consistentes com precisão micrométrica.'
      },
      {
        title: 'Segurança do Trabalhador',
        description: 'Reduza exposição humana a ambientes perigosos ou tarefas arriscadas.'
      },
      {
        title: 'Produtividade 24/7',
        description: 'Mantenha operações contínuas com mínimas interrupções.'
      }
    ],
    image: '/images/solutions/robotics.jpg'
  },
  {
    id: 'redes-industriais',
    title: 'Redes Industriais',
    shortDescription: 'Infraestrutura de comunicação para ambiente industrial.',
    description: 'Projeto e implementação de redes industriais robustas e seguras, utilizando protocolos específicos para ambiente industrial como Profinet, Ethernet/IP, Modbus TCP e outros.',
    icon: Network,
    features: [
      'Redes Ethernet industrial segmentadas',
      'Protocolos industriais padronizados',
      'Redundância e alta disponibilidade',
      'Cyber segurança industrial',
      'Diagnóstico e monitoramento de rede'
    ],
    benefits: [
      {
        title: 'Comunicação Confiável',
        description: 'Garanta troca de dados consistente mesmo em ambientes hostis.'
      },
      {
        title: 'Segurança de Dados',
        description: 'Proteja informações críticas contra ameaças internas e externas.'
      },
      {
        title: 'Escalabilidade',
        description: 'Expanda sua rede conforme necessidade sem comprometer desempenho.'
      }
    ],
    image: '/images/solutions/networks.jpg'
  },
  {
    id: 'sistemas-controle-dcs',
    title: 'Sistemas de Controle DCS',
    shortDescription: 'Controle distribuído para processos complexos.',
    description: 'Sistemas de Controle Distribuído (DCS) para indústrias de processo contínuo, oferecendo controle avançado, redundância e alta disponibilidade para processos críticos.',
    icon: Cable,
    features: [
      'Arquitetura distribuída redundante',
      'Controle avançado de processos',
      'Integração com sistemas de segurança',
      'Gestão centralizada de alarmes',
      'Engenharia baseada em padrões IEC'
    ],
    benefits: [
      {
        title: 'Alta Disponibilidade',
        description: 'Mantenha operações críticas com redundância de múltiplos níveis.'
      },
      {
        title: 'Controle Centralizado',
        description: 'Gerencie operações complexas a partir de uma interface unificada.'
      },
      {
        title: 'Expansibilidade',
        description: 'Adicione novas áreas de controle sem interromper operações existentes.'
      }
    ],
    image: '/images/solutions/dcs.jpg'
  }
];

export default solutionsData;