// Builds the public URL for a file inside /public/files/<folder>/<filename>.
// import.meta.env.BASE_URL respects the Vite "base" config (see vite.config.js)
// so links work whether the site is hosted at the domain root or a subpath.
export function getFileUrl(folder, filename) {
  return `${import.meta.env.BASE_URL}files/${folder}/${encodeURIComponent(filename)}`
}
