import {
  Network, Cpu, Code2, Sigma, BookOpen, FlaskConical,
  Database, Globe, Shapes, Calculator, Binary, Layers,
} from 'lucide-react'

// Maps the "icon" string in resources.json to a lucide-react component.
// Add new entries here as you introduce new categories/icons in the JSON.
const ICONS = {
  network: Network,
  cpu: Cpu,
  code: Code2,
  sigma: Sigma,
  book: BookOpen,
  flask: FlaskConical,
  database: Database,
  globe: Globe,
  shapes: Shapes,
  calculator: Calculator,
  binary: Binary,
  layers: Layers,
}

export function getCategoryIcon(name) {
  return ICONS[name] || BookOpen
}
