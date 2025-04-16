// src/data/solutionsDetailsData.ts
import { 
  CircuitBoard, 
  Settings, 
  BarChart2, 
  Wrench, 
  Shield, 
  BookOpen, 
  Headset 
} from 'lucide-react';

export interface SolutionDetail {
  id: string;
  title: string;
  icon: React.ElementType;
  shortDescription: string;
  description: string;
  image: string;
  color: string;
  services: string[];
  caseStudy?: {
    title: string;
    description: string;
  };
}

const solutionsDetailsData: SolutionDetail[] = [
  {
    id: 'consultoria-projetos',
    title: 'Consultoria e Projetos',
    icon: CircuitBoard,
    color: 'bg-indigo-500',
    shortDescription: 'Desenvolvimento de soluções personalizadas para sua indústria',
    description: 'Desenvolvemos uma estrutura na qual os nossos consultores compreendem o estado atual do seu negócio, identificam as lacunas associadas aos seus objetivos e projetam não apenas soluções tecnológicas, mas todas as soluções possíveis que podem ajudar a fechar essas lacunas.',
    image: `${import.meta.env.BASE_URL}images/solutions/Consultoria_Projetos.jpg`,
    services: [
      'Consultoria para automação de processos',
      'Plano diretor de automação',
      'Digitalização',
      'Modelamento da planta conforme ISA-88',
      'Racionalização de Alarmes'
    ],
    caseStudy: {
      title: 'Automação em indústria de papel e celulose',
      description: 'Desenvolvimento de plano diretor de automação que resultou em 35% de economia operacional em 2 anos.'
    }
  },
  {
    id: 'automacao-industrial',
    title: 'Automação Industrial',
    icon: Settings,
    color: 'bg-blue-500',
    shortDescription: 'Sistemas de controle avançados para otimização de processos',
    description: 'A nossa experiência comprovada em soluções de automação industrial baseia-se nas normas e melhores práticas da indústria, incluindo cibersegurança.',
    image: `${import.meta.env.BASE_URL}images/solutions/AutomacaoIndustrial.jpg`,
    services: [
      'Implantação de sistemas de controle (PLC)',
      'Configuração de sistemas de operação e gerenciamento (SCADA - IHM)',
      'Customização e integração com sistemas pré-existentes',
      'Implantação de sistemas de controle de processos (DCS)',
      'Painel de controle e acionamento, instrumentos, equipamentos e materiais',
      'Redes industriais',
      'Comissionamento e start-up'
    ],
    caseStudy: {
      title: 'Modernização de linha produtiva',
      description: 'Implementação de sistema SCADA integrado que aumentou a visibilidade do processo e reduziu paradas em 42%.'
    }
  },
  {
    id: 'gestao-industrial',
    title: 'Gestão Industrial',
    icon: BarChart2,
    color: 'bg-green-500',
    shortDescription: 'Soluções para melhorar a eficiência da sua operação industrial',
    description: 'Nossa abordagem de gestão industrial combina tecnologia com métodos comprovados para otimizar suas operações, reduzir custos e aumentar a produtividade.',
    image: `${import.meta.env.BASE_URL}images/solutions/Gestao_Industrial.jpg`,
    services: [
      'Implantação de sistemas MES (Manufacturing Execution System)',
      'Gestão de performance industrial (KPIs)',
      'Rastreabilidade de produção',
      'Sistemas de gestão de qualidade',
      'Integração com sistemas ERP'
    ],
    caseStudy: {
      title: 'Implementação de sistema MES',
      description: 'Sistema de execução da manufatura aumentou a eficiência operacional em 28% e reduziu custos de inventário em 15%.'
    }
  },
  {
    id: 'gestao-manutencao',
    title: 'Gestão de Manutenção',
    icon: Wrench,
    color: 'bg-orange-500',
    shortDescription: 'Maximize a disponibilidade dos equipamentos e reduza custos',
    description: 'Nossas soluções de gestão de manutenção ajudam a prever falhas antes que ocorram, estendendo a vida útil dos equipamentos e reduzindo paradas não programadas.',
    image: `${import.meta.env.BASE_URL}images/solutions/GestaoIndustrial.jpg`,
    services: [
      'Manutenção preditiva baseada em dados',
      'Implantação de sistemas CMMS',
      'Análise de confiabilidade de equipamentos',
      'Gestão de ativos industriais',
      'Monitoramento de condições em tempo real'
    ],
    caseStudy: {
      title: 'Manutenção preditiva em planta siderúrgica',
      description: 'Implementação de monitoramento contínuo que permitiu prever falhas com 97% de precisão e reduziu custo de manutenção em 32%.'
    }
  },
  {
    id: 'cyber-security-ot',
    title: 'Cyber Security OT',
    icon: Shield,
    color: 'bg-red-500',
    shortDescription: 'Proteja seus sistemas de automação contra ameaças cibernéticas',
    description: 'A segurança cibernética para tecnologia operacional (OT) é essencial para proteger sistemas críticos da indústria. Oferecemos soluções que garantem a integridade das suas operações.',
    image: `${import.meta.env.BASE_URL}images/solutions/cyber-security.jpg`,
    services: [
      'Avaliação de vulnerabilidades em sistemas OT',
      'Implementação de soluções de segurança para redes industriais',
      'Segmentação de redes IT/OT',
      'Monitoramento de segurança para sistemas de controle',
      'Conformidade com normas de segurança industrial'
    ],
    caseStudy: {
      title: 'Segmentação de redes industriais',
      description: 'Implementação de zonas de segurança para indústria química que eliminou vulnerabilidades críticas e adequou a planta às normas IEC 62443.'
    }
  },
  {
    id: 'treinamentos',
    title: 'Treinamentos',
    icon: BookOpen,
    color: 'bg-amber-500',
    shortDescription: 'Capacitação técnica para sua equipe em tecnologias industriais',
    description: 'Acreditamos que o conhecimento é a base para a transformação digital. Nossos treinamentos são desenvolvidos para capacitar sua equipe com as habilidades necessárias para operar e manter sistemas de automação modernos.',
    image: `${import.meta.env.BASE_URL}images/solutions/Treinamentos.jpg`,
    services: [
      'Treinamentos em sistemas SCADA e DCS',
      'Programação de PLCs e IHMs',
      'Redes industriais e protocolos de comunicação',
      'Segurança em sistemas de automação',
      'Customização de treinamentos conforme necessidades específicas'
    ],
    caseStudy: {
      title: 'Capacitação de equipe operacional',
      description: 'Treinamento personalizado de 120 horas para equipe de grande indústria alimentícia, resultando em redução de 65% em intervenções de suporte externo.'
    }
  },
  {
    id: 'assistencia-tecnica',
    title: 'Assistência Técnica',
    icon: Headset,
    color: 'bg-purple-500',
    shortDescription: 'Suporte especializado para manter seus sistemas funcionando',
    description: 'Nossa equipe de especialistas oferece suporte técnico contínuo para garantir que seus sistemas de automação funcionem sem interrupções, mantendo a produtividade da sua operação.',
    image: `${import.meta.env.BASE_URL}images/solutions/AssistenciaTecnica.jpg`,
    services: [
      'Suporte técnico remoto e presencial',
      'Manutenção preventiva e corretiva',
      'Diagnóstico e solução de problemas',
      'Atualizações de sistemas',
      'Contratos de manutenção personalizados'
    ],
    caseStudy: {
      title: 'Suporte contínuo para planta farmacêutica',
      description: 'Contrato de suporte 24/7 que assegura disponibilidade de 99,8% dos sistemas críticos e resposta em até 15 minutos para ocorrências urgentes.'
    }
  }
];

export default solutionsDetailsData;