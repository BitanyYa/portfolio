import { useState } from 'react'
import IsometricScene from './IsometricScene'
import DeskItemModal, { DESK_ITEMS } from './DeskItemModal'

/*
  Scene — Interactive Isometric Engineering Workspace
*/
export default function Scene() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const selectedItem = selectedItemId ? DESK_ITEMS[selectedItemId] || null : null

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: [
            '0 0 0 1px rgba(139,92,246,0.18)',
            '0 40px 100px rgba(0,0,0,0.70)',
            '0 0 0 6px rgba(139,92,246,0.04)',
          ].join(', '),
        }}
      >
        <IsometricScene onSelectItem={id => setSelectedItemId(id)} />
      </div>

      <DeskItemModal
        item={selectedItem}
        onClose={() => setSelectedItemId(null)}
      />
    </>
  )
}

