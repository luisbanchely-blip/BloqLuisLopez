import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

type Experience = {
  company: string;
  position: string;
  period: string;
  functions: string;
  developments: string[];
  technologies: string[];
  awards: string[];
};

type About = {
  title: string;
  intro: string;
  paragraphs: string[];
  technologies: string[];
  closing: string;
};

const EXPERIENCES: Experience[] = [
  {
    company: 'BAS / Fujitsu / Accenture',
    position: 'Analista programador',
    period: '7 anos',
    functions:
      'Trabajo en equipo de desarrollo para Fundae, realizando mantenimiento y evolutivos de la aplicacion.',
    developments: [],
    technologies: [
      '.NET',
      'Web Forms',
      'C#',
      'LINQ',
      'SQL',
      'JavaScript',
      'CSS2',
      'Entity Framework',
      'HTML5',
    ],
    awards: [],
  },
  {
    company: 'ITERIAM',
    position: 'Analista/programador Full Stack',
    period: '12 meses',
    functions:
      'Desarrollo .NET dentro del equipo de la Mutualidad de la Abogacia para construir su nueva web privada con arquitectura moderna.',
    developments: [
      'Nueva web privada de cliente.',
      'Calculo de cuotas y simulacion de polizas/coberturas.',
      'Actualizacion de datos personales y contratacion online.',
    ],
    technologies: [
      '.NET',
      'MVC5',
      'C#',
      'LINQ',
      'SQL',
      'React',
      'JavaScript',
      'Web API 2',
      'CSS3',
      'AJAX',
      'Entity Framework',
      'HTML5',
    ],
    awards: [],
  },
  {
    company: 'Dinamica',
    position: 'Analista/programador .NET y PL/SQL',
    period: '3 anos',
    functions:
      'Desarrollo para IECISA en DOC-e (catastro), centrado en gestion de documentos electronicos y productividad del sistema.',
    developments: [
      'Envio y recepcion de expedientes electronicos.',
      'Carga masiva de documentos y migracion del modulo de digitaliza.',
    ],
    technologies: [
      '.NET',
      'MVC5',
      'C#',
      'LINQ',
      'PL/SQL 11g/12g',
      'Arquitectura UDTs',
      'Arquitectura n capas',
      'jQuery',
      'JavaScript',
      'XML',
      'AJAX',
      'Dynamic Web Twain',
      'HTML5',
      'JqGrid',
      'Toad',
    ],
    awards: ['Premio CNI 2016 a mejor aplicacion de interoperabilidad publica.'],
  },
  {
    company: 'Rawson',
    position: 'Programador .NET',
    period: '8 meses',
    functions:
      'Trabajo para Avanade/Accenture con cliente Adeslas SegurCaixa en evolutivos y analisis de impacto sobre proyectos .NET.',
    developments: [
      'Evolutivos del Taller de Productos de Adeslas.',
      'Analisis de convivencia y unificacion de BBDD VB5/.NET.',
      'Servicios WCF, ventanas funcionales y soporte tecnico al equipo de Malaga.',
    ],
    technologies: [
      '.NET',
      'C#',
      'Aplicaciones de escritorio',
      'PL/SQL',
      'WCF',
      'TFS',
      'Visual SourceSafe',
    ],
    awards: [],
  },
  {
    company: 'Tictum',
    position: 'Programador .NET y Android',
    period: '4 meses',
    functions:
      'Formacion inicial en .NET para perfiles Java y desarrollo/mejora de proyectos internos, incluyendo app Android para Ubisoft (Devshaker).',
    developments: [
      'Tutoriales de formacion tecnica en .NET.',
      'Desarrollo y mejora de proyectos corporativos.',
      'Aplicacion Android para Ubisoft.',
    ],
    technologies: [
      '.NET',
      'SQL',
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'HTML',
      'CSS',
      'Android',
      'Joomla',
    ],
    awards: [],
  },
  {
    company: 'Insa',
    position: 'Programador BBT',
    period: '3 meses',
    functions:
      'Migracion de operativas TPNet 16/32 a Bank Transformation Toolkit para Banco Popular.',
    developments: [
      'Analisis y diseno de reglas y flujos.',
      'Migracion integral de la aplicacion.',
    ],
    technologies: ['J2EE', 'C#', 'Bank Transformation Toolkit', 'XML'],
    awards: [],
  },
  {
    company: 'Next Computer',
    position: 'Programador .NET (practicas + contratacion)',
    period: '3 meses',
    functions:
      'Migracion de proyectos de catering/comedores de .NET Framework 3.5 a 4.0 y mejora de experiencia de usuario.',
    developments: [
      'Actualizacion visual de maestra con jQuery, Bootstrap y accesibilidad.',
      'Resolucion de incidencias .NET y SQL.',
      'Ensamblado con graficas/calendarios y optimizacion de codigo.',
    ],
    technologies: ['.NET Framework', 'SQL', 'jQuery', 'Bootstrap'],
    awards: [],
  },
];

const ABOUT_ME: About = {
  title: 'Luis Lopez.',
  intro:
    'Soy desarrollador .NET con mas de 12 anos de experiencia en aplicaciones empresariales, soluciones web y sistemas escalables orientados a negocio.',
  paragraphs: [
    'A lo largo de mi carrera he trabajado en proyectos de diferentes sectores, participando tanto en backend como frontend, siempre enfocado en crear software robusto, mantenible y eficiente.',
    'Durante estos años he participado en el diseno de arquitecturas, optimizacion de bases de datos, integracion de servicios y modernizacion de aplicaciones legacy hacia tecnologias mas actuales como .NET Core y frameworks frontend modernos.',
    'Me apasiona el desarrollo de software, las buenas practicas, el codigo limpio y el aprendizaje continuo. Disfruto trabajando en equipos colaborativos, aportando soluciones tecnicas y ayudando a transformar ideas en productos funcionales y escalables.',
  ],
  technologies: [
    '.NET / .NET Core',
    'C#',
    'ASP.NET Web Forms',
    'ASP.NET MVC',
    'Entity Framework',
    'LINQ',
    'SQL y PL/SQL',
    'JavaScript',
    'HTML5 y CSS2',
    'Angular',
    'Blazor',
    'React',
  ],
  closing:
    'En este blog compartire experiencias, conocimientos, buenas practicas y contenido relacionado con desarrollo .NET, arquitectura de software, frontend moderno y tecnologias que utilizo en mi dia a dia como desarrollador.',
};

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly about = ABOUT_ME;
  protected readonly experiences = EXPERIENCES;
  protected readonly activeIndex = signal(0);
  protected readonly topSection = signal<'about' | 'experience' | 'contact'>('about');
  protected readonly isAboutSection = computed(
    () => this.topSection() === 'about'
  );
  protected readonly isWorkExperienceSection = computed(
    () => this.topSection() === 'experience'
  );
  protected readonly isContactSection = computed(
    () => this.topSection() === 'contact'
  );
  protected readonly activeExperience = computed(
    () => this.experiences[this.activeIndex()]
  );

  protected selectAbout(): void {
    this.topSection.set('about');
  }

  protected selectWorkExperience(): void {
    this.topSection.set('experience');
    this.activeIndex.set(0);
  }

  protected selectContact(): void {
    this.topSection.set('contact');
  }

  protected selectExperience(index: number): void {
    this.activeIndex.set(index);
  }
}
