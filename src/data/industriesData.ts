import { 
  Factory, 
  Pipette, 
  Wheat, 
  PillBottle, 
  Truck, 
  Cog, 
  Droplets 
} from 'lucide-react';

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  hoverColor: string;
  features: string[];
  image: string;
  bgColor: string;
}

const industriesData: Industry[] = [
  {
    id: 'manufatura',
    title: 'Manufatura',
    description: 'Sistemas de controle avançados para linhas de produção com monitoramento em tempo real e otimização de processos contínuos.',
    icon: Factory,
    color: 'from-blue-500 to-blue-700',
    hoverColor: 'group-hover:from-blue-600 group-hover:to-blue-800',
    features: [
      'Controle e monitoramento remoto',
      'Integração com sistemas MES/ERP',
      'Digitalização de processos',
      'Coleta automatizada de dados',
      'Manutenção preditiva com IA'
    ],
    image: '/images/industries/manufacturing.jpg',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'petroquimica',
    title: 'Petroquímica',
    description: 'Soluções robustas de automação para ambientes críticos, com foco em segurança, controle preciso e redundância.',
    icon: Droplets,
    color: 'from-purple-500 to-purple-700',
    hoverColor: 'group-hover:from-purple-600 group-hover:to-purple-800',
    features: [
      'Sistemas de segurança e redundância',
      'Monitoramento de ativos críticos',
      'Controle avançado de processos',
      'Sistemas SCADA especializados',
      'Integração com sensores HART/Foundation Fieldbus'
    ],
    image: '/images/industries/petrochemical.jpg',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'alimentos',
    title: 'Alimentos e Bebidas',
    description: 'Integração de sistemas para garantir rastreabilidade, qualidade e eficiência em linhas de processamento e embalagem.',
    icon: Wheat,
    color: 'from-green-500 to-green-700',
    hoverColor: 'group-hover:from-green-600 group-hover:to-green-800',
    features: [
      'Controle de qualidade automatizado',
      'Rastreabilidade completa do produto',
      'Conformidade com normas sanitárias',
      'Sistemas de lavagem CIP/SIP',
      'Controle de receitas e bateladas'
    ],
    image: '/images/industries/food.jpg',
    bgColor: 'bg-green-100'
  },
  {
    id: 'farmaceutica',
    title: 'Farmacêutica',
    description: 'Automação de precisão para processos críticos que exigem validação, conformidade regulatória e documentação completa.',
    icon: PillBottle,
    color: 'from-red-500 to-red-700',
    hoverColor: 'group-hover:from-red-600 group-hover:to-red-800',
    features: [
      'Sistemas validados (GAMP)',
      'Conformidade com GMP, FDA, ANVISA',
      'Rastreabilidade de lotes',
      'Documentação eletrônica de processos',
      'Controle de ambientes assépticos'
    ],
    image: '/images/industries/pharmaceutical.jpg',
    bgColor: 'bg-red-100'
  },
  {
    id: 'logistica',
    title: 'Logística',
    description: 'Sistemas automatizados para gestão de armazéns, transportadores e rastreamento de produtos com integração IoT.',
    icon: Truck,
    color: 'from-amber-500 to-amber-700',
    hoverColor: 'group-hover:from-amber-600 group-hover:to-amber-800',
    features: [
      'Controle de transportadores',
      'Sistemas de picking automatizado',
      'Integração com WMS/ERP',
      'Rastreamento RFID/código de barras',
      'Otimização de rotas e armazenamento'
    ],
    image: '/images/industries/logistics.jpg',
    bgColor: 'bg-amber-100'
  },
  {
    id: 'metalurgica',
    title: 'Metalúrgica',
    description: 'Automação robusta para processos de fundição, laminação, corte e tratamento de metais com controle preciso.',
    icon: Cog,
    color: 'from-gray-600 to-gray-800',
    hoverColor: 'group-hover:from-gray-700 group-hover:to-gray-900',
    features: [
      'Controle de fornos e tratamentos térmicos',
      'Monitoramento de temperatura e pressão',
      'Controle de qualidade automatizado',
      'Rastreabilidade de materiais',
      'Integração com robôs e CNCs'
    ],
    image: '/images/industries/metallurgy.jpg',
    bgColor: 'bg-gray-100'
  },
  {
    id: 'quimica',
    title: 'Química',
    description: 'Soluções para controle preciso de reações, misturas e processos contínuos com foco em segurança e qualidade.',
    icon: Pipette,
    color: 'from-teal-500 to-teal-700',
    hoverColor: 'group-hover:from-teal-600 group-hover:to-teal-800',
    features: [
      'Controle avançado de processos',
      'Sistemas de segurança SIL',
      'Gestão de receitas e bateladas',
      'Controle de variáveis críticas',
      'Gestão de energia e utilidades'
    ],
    image: '/images/industries/chemical.jpg',
    bgColor: 'bg-teal-100'
  }
];

export default industriesData;