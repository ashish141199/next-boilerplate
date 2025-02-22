import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { z } from 'zod'

// Define your store schema
const storeSchema = z.object({
  // Add your state properties and their types here
})

// Infer the type from the schema
type StoreState = z.infer<typeof storeSchema>

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Add your state and actions here
    }),
    {
      name: 'app-storage',
    }
  )
) 