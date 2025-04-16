// src/data/industriesDetailsData.ts
import { 
  Factory, 
  Droplets, 
  Wheat, 
  PillBottle, 
  Truck, 
  Cog, 
  Pipette
} from 'lucide-react';

export interface IndustryDetail {
  id: string;
  title: string;
  icon: React.ElementType;
  shortDescription: string;
  description: string;
  image: string;
  color: string;
  features: string[];
  caseStudy?: {
    title: string;
    description: string;
  };
}

const industriesDetailsData: IndustryDetail[] = [
  {
    id: 'manufatura',
    title: 'Manufatura',
    icon: Factory,
    color: 'bg-blue-500',
    shortDescription: 'Sistemas de controle avançados para linhas de produção com monitoramento em tempo real.',
    description: 'Soluções de automação e controle para otimizar processos de fabricação, aumentar a eficiência e reduzir custos de produção, com foco em digitalização e Indústria 4.0.',
    image: `${import.meta.env.BASE_URL}images/industries/Manufatura.jpg`,
    features: [
      'Controle e monitoramento remoto',
      'Integração com sistemas MES/ERP',
      'Digitalização de processos',
      'Coleta automatizada de dados',
      'Manutenção preditiva com IA'
    ],
    caseStudy: {
      title: 'Projeto de automação completa para cliente do setor',
      description: 'Implementação de sistema de supervisão e controle para indústria de componentes automotivos, resultando em aumento de 32% na produtividade.'
    }
  },
  {
    id: 'petroquimica',
    title: 'Petroquímica',
    icon: Droplets,
    color: 'bg-purple-500',
    shortDescription: 'Soluções robustas de automação para ambientes críticos com foco em segurança.',
    description: 'Sistemas de controle e automação para processos petroquímicos complexos, garantindo operação segura, eficiente e dentro das normas regulatórias.',
    image: `${import.meta.env.BASE_URL}images/industries/Petroquimica.jpg`,
    features: [
      'Sistemas de segurança e redundância',
      'Monitoramento de ativos críticos',
      'Controle avançado de processos',
      'Sistemas SCADA especializados',
      'Integração com sensores HART/Foundation Fieldbus'
    ],
    caseStudy: {
      title: 'Projeto de automação completa para cliente do setor',
      description: 'Modernização de sistema de controle de refinaria, implementando tecnologias de ponta que resultaram em redução de 40% em paradas não planejadas.'
    }
  },
  {
    id: 'alimentos',
    title: 'Alimentos e Bebidas',
    icon: Wheat,
    color: 'bg-green-500',
    shortDescription: 'Integração de sistemas para garantir rastreabilidade, qualidade e eficiência.',
    description: 'Soluções de automação para indústria alimentícia, com foco em rastreabilidade, segurança alimentar e otimização de processos de produção e embalagem.',
    image: `${import.meta.env.BASE_URL}images/industries/Alimentos.jpg`,
    features: [
      'Controle de qualidade automatizado',
      'Rastreabilidade completa do produto',
      'Conformidade com normas sanitárias',
      'Sistemas de lavagem CIP/SIP',
      'Controle de receitas e bateladas'
    ],
    caseStudy: {
      title: 'Projeto de automação completa para cliente do setor',
      description: 'Implementação de sistema MES para indústria de laticínios, permitindo rastreabilidade total e reduzindo perdas de produto em 25%.'
    }
  },
  {
    id: 'farmaceutica',
    title: 'Farmacêutica',
    icon: PillBottle,
    color: 'bg-red-500',
    shortDescription: 'Automação de precisão para processos críticos com validação e conformidade.',
    description: 'Sistemas de automação para indústria farmacêutica, garantindo conformidade com normas regulatórias, validação de processos e documentação completa.',
    image: `${import.meta.env.BASE_URL}images/industries/Farmaceutica.jpg`,
    features: [
      'Sistemas validados (GAMP)',
      'Conformidade com GMP, FDA, ANVISA',
      'Rastreabilidade de lotes',
      'Documentação eletrônica de processos',
      'Controle de ambientes assépticos'
    ],
    caseStudy: {
      title: 'Projeto de automação completa para cliente do setor',
      description: 'Implementação de sistema de gestão de bateladas para fabricante de medicamentos, garantindo conformidade com normas FDA e reduzindo tempo de validação em 30%.'
    }
  },
  {
    id: 'logistica',
    title: 'Logística',
    icon: Truck,
    color: 'bg-amber-500',
    shortDescription: 'Sistemas automatizados para gestão de armazéns e rastreamento de produtos.',
    description: 'Soluções de automação para operações logísticas, incluindo sistemas de gerenciamento de armazém, automação de transportadores e rastreamento em tempo real.',
    image: `${import.meta.env.BASE_URL}images/industries/Logistica.png`,
    features: [
      'Controle de transportadores',
      'Sistemas de picking automatizado',
      'Integração com WMS/ERP',
      'Rastreamento RFID/código de barras',
      'Otimização de rotas e armazenamento'
    ],
    caseStudy: {
      title: 'Projeto de automação completa para cliente do setor',
      description: 'Implementação de sistema automatizado de sorting para centro de distribuição, aumentando capacidade de processamento em 60% e reduzindo erros de separação.'
    }
  },
  {
    id: 'metalurgica',
    title: 'Metalúrgica',
    icon: Cog,
    color: 'bg-gray-600',
    shortDescription: 'Automação robusta para processos de fundição, laminação e tratamento de metais.',
    description: 'Sistemas de automação para indústria metalúrgica, controlando processos de fundição, laminação, tratamentos térmicos e acabamento com alta precisão.',
    image: `${import.meta.env.BASE_URL}images/industries/Metalurgica.jpg`,
    features: [
      'Controle de fornos e tratamentos térmicos',
      'Monitoramento de temperatura e pressão',
      'Controle de qualidade automatizado',
      'Rastreabilidade de materiais',
      'Integração com robôs e CNCs'
    ],
    caseStudy: {
      title: 'Projeto de automação completa para cliente do setor',
      description: 'Modernização de sistema de controle para laminação de aço, resultando em melhoria de qualidade e redução de 22% no consumo energético.'
    }
  },
  {
    id: 'quimica',
    title: 'Química',
    icon: Pipette,
    color: 'bg-teal-500',
    shortDescription: 'Soluções para controle preciso de reações, misturas e processos contínuos.',
    description: 'Soluções para controle preciso de reações, misturas e processos contínuos com foco em segurança e qualidade.',
    image: `${import.meta.env.BASE_URL}images/industries/Quimica.jpg`,
    features: [
      'Controle avançado de processos',
      'Sistemas de segurança SIL',
      'Gestão de receitas e bateladas',
      'Controle de variáveis críticas',
      'Gestão de energia e utilidades'
    ],
    caseStudy: {
      title: 'Projeto de automação completa para cliente do setor',
      description: 'Implementação de sistema de controle avançado para planta química, otimizando consumo de matérias-primas e aumentando rendimento de produção em 18%.'
    }
  }
];

export default industriesDetailsData;