/**
 * Vertical line connector drawn between sections to imply a continuous flow.
 */
export default function SectionConnector() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <div className="section-connector" />
    </div>
  )
}
