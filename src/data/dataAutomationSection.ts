// src/data/dataAutomationSection.ts
// Adicionar ao arquivo existente

import { 
  Server, 
  Cpu, 
  Layers, 
  Database, 
  Workflow, 
  Wifi, 
  BarChart3, 
  BrainCircuit,
  Cloud,
  Eye,
  Code,
  Gauge,
  ShieldCheck,
  Zap,
  Factory,
  Bot,
  Cog,
  BarChart2,
  Radar,
  Smartphone,
  Share2,
  PieChart,
  TrendingUp,
  Users,
  Award,
  Globe,
  Star,
  ThumbsUp
} from 'lucide-react';

// Interfaces existentes - manter
export interface TechFeature {
  id: string;
  title: string;
  description: string;
  icon: typeof Server;
  tags: string[];
  benefits?: string[];
}

export interface TechStack {
  category: string;
  description: string;
  items: {
    name: string;
    description: string;
    level?: number; // 1-5 para indicar expertise
    icon?: typeof Server;
  }[];
}

// Novas interfaces para os dados adicionais
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  tags: string[];
  results: {
    value: string;
    label: string;
  }[];
}

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export interface Partner {
  name: string;
  logo: string;
}

// Casos de estudo
export const caseStudies: CaseStudy[] = [
  {
    id: 'factory-digitalization',
    title: 'Digitalização Completa de Fábrica Têxtil',
    category: 'Indústria 4.0',
    image: '/images/case-studies/textile-factory.jpg',
    summary: 'Implementação de um sistema completo de monitoramento e controle para uma indústria têxtil, integrando todo o chão de fábrica com sistemas de gestão.',
    challenge: 'A empresa operava com sistemas legados isolados, sem visibilidade em tempo real da produção e com muitas decisões baseadas em estimativas, resultando em atrasos de entrega e desperdício de materiais.',
    solution: 'Desenvolvemos uma solução end-to-end com sensores IoT em todos os equipamentos críticos, sistema SCADA centralizado e integração com ERP via middleware personalizado, permitindo rastreabilidade completa.',
    tags: ['IoT Industrial', 'SCADA', 'Integração ERP', 'Big Data', 'Monitoramento OEE'],
    results: [
      { value: '+37%', label: 'Produtividade' },
      { value: '-28%', label: 'Desperdício' },
      { value: '98%', label: 'Precisão de Prazo' }
    ]
  },
  {
    id: 'predictive-maintenance',
    title: 'Manutenção Preditiva em Indústria Alimentícia',
    category: 'Análise Preditiva',
    image: '/images/case-studies/food-industry.jpg',
    summary: 'Sistema de manutenção preditiva baseado em IA para antecipar falhas em equipamentos críticos de uma grande indústria de alimentos.',
    challenge: 'A empresa enfrentava paradas não programadas frequentes em linhas de produção de alto volume, gerando perdas significativas e comprometendo prazos de entrega.',
    solution: 'Implementamos sensores de vibração, temperatura e acústicos conectados a um sistema de análise preditiva com machine learning, que identifica padrões de falha semanas antes de ocorrerem.',
    tags: ['Manutenção Preditiva', 'Machine Learning', 'Análise de Vibração', 'Dashboards', 'Alertas Automáticos'],
    results: [
      { value: '-65%', label: 'Downtime' },
      { value: '+22%', label: 'Vida útil dos equipamentos' },
      { value: 'R$3.2M', label: 'Economia anual' }
    ]
  },
  {
    id: 'energy-optimization',
    title: 'Otimização Energética em Indústria Química',
    category: 'Eficiência Energética',
    image: '/images/case-studies/chemical-industry.jpg',
    summary: 'Sistema de gestão energética inteligente para redução de consumo e custos em processos de alta demanda energética.',
    challenge: 'A indústria química tinha custos operacionais elevados devido ao alto consumo energético, além de dificuldades para cumprir metas de sustentabilidade.',
    solution: 'Desenvolvemos um sistema de monitoramento e controle inteligente que otimiza o consumo energético em tempo real, com algoritmos de otimização que balanceiam demanda e eficiência.',
    tags: ['Gestão Energética', 'Otimização em Tempo Real', 'Algoritmos Avançados', 'Dashboards', 'Relatórios ESG'],
    results: [
      { value: '-31%', label: 'Consumo energético' },
      { value: '42%', label: 'Redução de emissões' },
      { value: '14 meses', label: 'Payback do projeto' }
    ]
  }
];

// Depoimentos de clientes
export const testimonials: Testimonial[] = [
  {
    name: 'Carlos Mendes',
    position: 'Diretor Industrial',
    company: 'TechFibras S.A.',
    image: '/images/testimonials/carlos-mendes.jpg',
    quote: 'A implementação do sistema de automação transformou completamente nossa operação. Conseguimos visibilidade em tempo real e aumento significativo de produtividade em menos de 3 meses.',
    rating: 5
  },
  {
    name: 'Ana Rodrigues',
    position: 'Gerente de Operações',
    company: 'AlimentosBR',
    image: '/images/testimonials/ana-rodrigues.jpg',
    quote: 'O sistema de manutenção preditiva revolucionou nossa forma de trabalhar. Reduzimos drasticamente as paradas não programadas e melhoramos a confiabilidade dos equipamentos.',
    rating: 5
  },
  {
    name: 'Roberto Almeida',
    position: 'Diretor de Tecnologia',
    company: 'QuimicaPlus',
    image: '/images/testimonials/roberto-almeida.jpg',
    quote: 'A qualidade técnica da equipe foi impressionante. Conseguiram entender perfeitamente nossa operação e implementar uma solução que realmente atendeu às nossas necessidades específicas.',
    rating: 4
  }
];

// Parceiros tecnológicos
export const partners: Partner[] = [
  { name: 'Siemens', logo: '/images/partners/siemens.svg' },
  { name: 'Rockwell Automation', logo: '/images/partners/rockwell.svg' },
  { name: 'Microsoft', logo: '/images/partners/microsoft.svg' },
  { name: 'AWS', logo: '/images/partners/aws.svg' },
  { name: 'Schneider Electric', logo: '/images/partners/schneider.svg' },
  { name: 'ABB', logo: '/images/partners/abb.svg' }
];

// Dados principais das tecnologias de automação
export const automationFeatures: TechFeature[] = [
  {
    id: 'system-integration',
    title: 'Integração de Sistemas',
    description: 'Conectamos dispositivos, equipamentos e software em uma infraestrutura unificada, garantindo fluxo de dados contínuo entre todos os níveis da pirâmide de automação, desde sensores até ERPs.',
    icon: Server,
    tags: ['MQTT', 'OPC-UA', 'REST API', 'EtherNet/IP', 'Modbus TCP'],
    benefits: [
      'Visibilidade total da operação',
      'Redução de silos de informação',
      'Tempo de resposta otimizado',
      'Integração IT/OT'
    ]
  },
  {
    id: 'plc-programming',
    title: 'Programação de CLPs',
    description: 'Desenvolvemos lógicas de controle robustas, padronizadas e eficientes para CLPs de diversas marcas, com arquiteturas modulares que facilitam manutenção e expansão futura.',
    icon: Cpu,
    tags: ['Siemens', 'Allen-Bradley', 'Schneider', 'Mitsubishi', 'ABB'],
    benefits: [
      'Código bem documentado',
      'Algoritmos otimizados',
      'Redução de falhas',
      'Facilidade de manutenção'
    ]
  },
  {
    id: 'scada-hmi',
    title: 'Sistemas SCADA e IHM',
    description: 'Criamos interfaces intuitivas com design UX/UI avançado para supervisão, comando e aquisição de dados, transformando dados complexos em painéis de controle simples e acionáveis.',
    icon: Layers,
    tags: ['Ignition', 'WinCC', 'FactoryTalk', 'Elipse', 'Wonderware'],
    benefits: [
      'Interfaces amigáveis e responsivas',
      'Visualização em tempo real',
      'Alarmes e alertas inteligentes',
      'Dashboards customizados'
    ]
  }
];

// Pilares tecnológicos completos - EXPANDIDO
export const techPillars = [
  {
    id: 'industrial-iot',
    title: 'IoT Industrial',
    description: 'Redes de sensores e dispositivos conectados que capturam dados em tempo real, habilitando monitoramento remoto e análise preditiva.',
    icon: Wifi,
    technologies: ['Gateways IoT', 'Edge Computing', 'Sensores Inteligentes', 'LPWAN', 'Redes Mesh'],
    color: '#3498db'
  },
  {
    id: 'data-analytics',
    title: 'Análise de Dados',
    description: 'Transformação de dados operacionais em insights acionáveis através de algoritmos avançados e visualizações intuitivas.',
    icon: BarChart3,
    technologies: ['Análise Preditiva', 'Big Data', 'Machine Learning', 'Dashboards', 'ETL Industrial'],
    color: '#2ecc71'
  },
  {
    id: 'ai-solutions',
    title: 'Inteligência Artificial',
    description: 'Algoritmos de aprendizado para otimização automática de processos, manutenção preditiva e controle adaptativo.',
    icon: BrainCircuit,
    technologies: ['Manutenção Preditiva', 'Visão Computacional', 'Otimização', 'Deep Learning', 'Sistemas Especialistas'],
    color: '#9b59b6'
  },
  {
    id: 'cloud-solutions',
    title: 'Soluções em Nuvem',
    description: 'Plataformas escaláveis para armazenamento, processamento e acesso remoto a dados e aplicações industriais.',
    icon: Cloud, 
    technologies: ['AWS Industrial', 'Azure IoT', 'MindSphere', 'Google Cloud IoT', 'IBM Watson IoT'],
    color: '#1abc9c'
  },
  {
    id: 'industrial-security',
    title: 'Cibersegurança Industrial',
    description: 'Proteção de ativos críticos contra ameaças digitais com soluções específicas para ambientes OT/IT convergentes.',
    icon: ShieldCheck,
    technologies: ['Firewalls Industriais', 'Segmentação de Rede', 'Detecção de Intrusão', 'Gestão de Vulnerabilidades', 'IEC 62443'],
    color: '#e74c3c'
  },
  {
    id: 'digital-twin',
    title: 'Gêmeos Digitais',
    description: 'Representações virtuais de equipamentos e processos para simulação, otimização e treinamento avançado.',
    icon: Gauge,
    technologies: ['Simulação 3D', 'Modelagem Física', 'Realidade Aumentada', 'Calibração Automática', 'Predição de Performance'],
    color: '#f39c12'
  },
  {
    id: 'smart-factory',
    title: 'Fábrica Inteligente',
    description: 'Sistemas integrados que habilitam a manufatura flexível, customização em massa e logística autônoma.',
    icon: Factory,
    technologies: ['MES Avançado', 'Veículos Autônomos', 'Produção Flexível', 'Manufatura Aditiva', 'Logística 4.0'],
    color: '#34495e'
  },
  {
    id: 'collaborative-robotics',
    title: 'Robótica Colaborativa',
    description: 'Robôs que trabalham de forma segura ao lado de humanos, aumentando produtividade com flexibilidade operacional.',
    icon: Bot,
    technologies: ['Cobots', 'Braços Robóticos', 'Visão Robótica', 'Manipulação Adaptativa', 'Programação Intuitiva'],
    color: '#d35400'
  },
  {
    id: 'advanced-control',
    title: 'Controle Avançado',
    description: 'Técnicas sofisticadas de controle de processo que otimizam desempenho, qualidade e eficiência energética.',
    icon: Cog,
    technologies: ['Controle MPC', 'Controle Preditivo', 'Controle Adaptativo', 'Controle Fuzzy', 'Otimização em Tempo Real'],
    color: '#16a085'
  },
  {
    id: 'industrial-analytics',
    title: 'Analytics Industrial',
    description: 'Ferramentas especializadas para análise profunda de processos produtivos e identificação de gargalos e otimizações.',
    icon: BarChart2,
    technologies: ['OEE Avançado', 'Detecção de Anomalias', 'Análise de Causa Raiz', 'Modelagem Estatística', 'Dashboards Operacionais'],
    color: '#8e44ad'
  },
  {
    id: 'industrial-5g',
    title: 'Conectividade 5G',
    description: 'Redes de alta velocidade e baixa latência para ambientes industriais que possibilitam comunicação crítica em tempo real.',
    icon: Radar,
    technologies: ['5G Industrial', 'Ultra-Baixa Latência', 'Massive IoT', 'Network Slicing', 'Edge Computing 5G'],
    color: '#2980b9'
  },
  {
    id: 'industrial-mobility',
    title: 'Mobilidade Industrial',
    description: 'Acesso seguro e remoto a sistemas críticos via dispositivos móveis para maior agilidade e flexibilidade operacional.',
    icon: Smartphone,
    technologies: ['Apps Industriais', 'Manutenção Móvel', 'RA para Instruções', 'Gestão de Ativos Móvel', 'Checklist Digitais'],
    color: '#27ae60'
  }
];

// Tecnologias específicas dominadas - EXPANDIDO E MELHORADO
export const techStacks: TechStack[] = [
  {
    category: 'Controladores e PLCs',
    description: 'Programação e integração de diversas plataformas de automação para controle preciso de processos industriais.',
    items: [
      { name: 'Siemens S7', description: 'S7-1200/1500, S7-300/400, TIA Portal, STEP 7, SCL, Blocos FB/FC avançados, Failsafe', level: 5, icon: Cpu },
      { name: 'Allen-Bradley', description: 'ControlLogix, CompactLogix, Studio 5000, Add-On Instructions, AOI, Estruturas de Dados UDT, GuardLogix', level: 5, icon: Cpu },
      { name: 'Schneider', description: 'Modicon, Unity Pro, SoMachine, EcoStruxure, Programação IEC-61131', level: 4, icon: Cpu },
      { name: 'ABB', description: 'AC500, Control Builder, Automation Builder, PLC Aberto, FBP e Programação IEC', level: 4, icon: Cpu },
      { name: 'Mitsubishi', description: 'MELSEC, GX Works, iQ-R/F/L Series, CC-Link, Sequence Controls', level: 3, icon: Cpu }
    ]
  },
  {
    category: 'Sistemas de Supervisão',
    description: 'Plataformas completas para visualização, controle e análise de dados operacionais em tempo real.',
    items: [
      { name: 'Ignition', description: 'SCADA, MES, IIoT com tecnologia baseada em Java/web, OPC-UA, Perspective, Vision, Módulos personalizados, Gateway redundante', level: 5, icon: Eye },
      { name: 'Siemens WinCC', description: 'WinCC Unified, WinCC Professional, WinCC RT, Visual Basic Scripts, C-Scripts, XAML, Adaptações Mobile', level: 5, icon: Eye },
      { name: 'FactoryTalk', description: 'View SE/ME, Historian, VantagePoint, Transaction Manager, Alarm & Events, Batch', level: 4, icon: Eye },
      { name: 'Wonderware', description: 'InTouch, System Platform, Historian, Situational Awareness, ArchestrA Graphics, InBatch', level: 4, icon: Eye },
      { name: 'Elipse', description: 'E3, Power, Scada, HDA, Acesso Móvel, Banco de dados Active x', level: 3, icon: Eye }
    ]
  },
  {
    category: 'Redes Industriais',
    description: 'Infraestrutura e protocolos de comunicação robustos para ambientes industriais críticos.',
    items: [
      { name: 'Ethernet/IP', description: 'Configuração, diagnóstico e integração com TCP/IP, CIP, Implicit/Explicit Messaging, DLR', level: 5, icon: Share2 },
      { name: 'PROFINET', description: 'Protocolos RT/IRT, diagnóstico e topologias, MRP, GSDML, Multiple Controller Systems, Shared Devices', level: 5, icon: Share2 },
      { name: 'PROFIBUS', description: 'DP/PA, diagnósticos, configuração de GSD, Master/Slave, FDL, redundância', level: 4, icon: Share2 },
      { name: 'Modbus', description: 'TCP/RTU/ASCII, mapeamento de dados, Gateways, conversores, roteadores, diagnóstico', level: 5, icon: Share2 },
      { name: 'OPC UA', description: 'Servidor/cliente, modelos de informação, segurança, discovery, pub/sub, certificados', level: 4, icon: Share2 }
    ]
  },
  {
    category: 'Desenvolvimento Avançado',
    description: 'Soluções de software customizadas para integração e visualização de dados industriais.',
    items: [
      { name: 'Frontend', description: 'React, TypeScript, Next.js, Tailwind CSS, Material UI, WebSockets, React Query, Styled Components', level: 4, icon: Code },
      { name: 'Backend', description: 'Node.js, Python, Go, .NET Core, Express, Django, FastAPI, gRPC Services', level: 4, icon: Code },
      { name: 'Bancos de Dados', description: 'PostgreSQL, MongoDB, InfluxDB, TimescaleDB, SQL Server, Redis, Time-Series', level: 4, icon: Database },
      { name: 'DevOps', description: 'Docker, Kubernetes, CI/CD, Monitoramento, Grafana, Prometheus, Ansible, Terraform', level: 3, icon: Workflow },
      { name: 'APIs', description: 'REST, GraphQL, MQTT, WebSockets, gRPC, OPC UA, OpenAPI, Swagger', level: 4, icon: Code }
    ]
  },
  {
    category: 'IA e Analytics',
    description: 'Algoritmos avançados para extrair valor estratégico dos dados operacionais.',
    items: [
      { name: 'Frameworks IA', description: 'TensorFlow, PyTorch, scikit-learn, Keras, ONNX, Auto ML, Transfer Learning', level: 3, icon: BrainCircuit },
      { name: 'Visualização', description: 'Power BI, Grafana, Tableau, D3.js, Plotly, Kibana, ThingsBoard, Dash', level: 4, icon: BarChart3 },
      { name: 'Processamento', description: 'Spark, Kafka, Stream Analytics, Flink, Storm, NiFi, Azure Stream Analytics', level: 3, icon: Workflow },
      { name: 'MLOps', description: 'ML Pipeline, Monitoramento de Modelos, MLflow, Kubeflow, TFX, Feature Stores', level: 3, icon: Gauge },
      { name: 'Edge AI', description: 'TensorFlow Lite, NVIDIA Jetson, Edge Impulse, OpenVINO, MicroAI, TinyML', level: 3, icon: Cpu }
    ]
  },
  {
    category: 'Eletrônica e Instrumentação',
    description: 'Componentes e sistemas para medição e controle preciso de variáveis industriais.',
    items: [
      { name: 'Inversores de Frequência', description: 'Siemens SINAMICS, ABB ACS, Allen-Bradley PowerFlex, Parametrização, PID', level: 4, icon: Zap },
      { name: 'Instrumentação', description: 'Sensores, transmissores, calibração, HART, Posicionadores, Válvulas', level: 5, icon: Gauge },
      { name: 'Sistemas Embarcados', description: 'Arduino, Raspberry Pi, ESP32, STM32, PIC, FPGA, Ladder Custom', level: 4, icon: Cpu },
      { name: 'IIoT Hardware', description: 'Gateways industriais, conversores de protocolo, edge devices, módulos wireless', level: 4, icon: Wifi },
      { name: 'Sistemas de Visão', description: 'Câmeras industriais, processamento de imagem, inspeção automatizada, OCR', level: 3, icon: Eye }
    ]
  }
];