/**
 * Full-viewport animated grid background.
 * Position: absolute, pointer-events-none.
 * Wrap the parent section in position:relative.
 */
export default function LabGrid() {
  return (
    <div
      className="lab-grid-bg absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  )
}
