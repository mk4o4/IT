import { Download } from 'lucide-react'
import './DownloadButton.css'

// A plain <a download> works perfectly for a static site — no backend,
// no download-count service. The `download` attribute forces the browser
// to save the file rather than navigate to it.
export default function DownloadButton({ href, filename, onClick, compact = false }) {
  return (
    <a
      href={href}
      download={filename}
      className={`download-btn ${compact ? 'download-btn--compact' : ''}`}
      onClick={onClick}
    >
      <Download size={15} />
      {!compact && <span>Download</span>}
    </a>
  )
}
