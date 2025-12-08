"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface DraggableItem {
  id: string
  content: string
}

interface DraggableListProps {
  items: DraggableItem[]
  onChange: (items: DraggableItem[]) => void
  placeholder?: string
}

function SortableItem({ id, content, onRemove }: { id: string; content: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 bg-card border border-border rounded-lg p-3 transition-shadow",
        isDragging && "shadow-lg z-10",
      )}
    >
      <button
        className="touch-none cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <span className="flex-1 text-sm">{content}</span>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function DraggableList({ items, onChange, placeholder = "Add new item" }: DraggableListProps) {
  const [newItemContent, setNewItemContent] = useState("")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      onChange(arrayMove(items, oldIndex, newIndex))
    }
  }

  const handleAdd = () => {
    if (newItemContent.trim()) {
      const newItem: DraggableItem = {
        id: `item-${Date.now()}`,
        content: newItemContent.trim(),
      }
      onChange([...items, newItem])
      setNewItemContent("")
    }
  }

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content} onRemove={() => handleRemove(item.id)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd()
            }
          }}
        />
        <Button onClick={handleAdd} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
