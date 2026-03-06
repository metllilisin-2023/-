
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { InventoryItem, InboundLog, OutboundLog, Category, AuditLog, Supplier } from '../types';
import { INITIAL_INVENTORY, INITIAL_INBOUND, INITIAL_OUTBOUND, INITIAL_CATEGORIES, INITIAL_SUPPLIERS } from '../lib/initialData';

interface InventoryState {
  inventory: InventoryItem[];
  inboundLogs: InboundLog[];
  outboundLogs: OutboundLog[];
  categories: Category[];
  suppliers: Supplier[];
  auditLogs: AuditLog[];
  
  setInventory: (inventory: InventoryItem[]) => void;
  setInboundLogs: (logs: InboundLog[]) => void;
  setOutboundLogs: (logs: OutboundLog[]) => void;
  setCategories: (categories: Category[]) => void;
  setSuppliers: (suppliers: Supplier[]) => void;
  setAuditLogs: (logs: AuditLog[]) => void;
  
  addItem: (item: InventoryItem) => void;
  updateItem: (item: InventoryItem) => void;
  deleteItem: (id: string) => void;
  
  addInboundLog: (log: InboundLog) => void;
  addOutboundLog: (log: OutboundLog) => void;
  addAuditLog: (log: AuditLog) => void;
  
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;

  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      inventory: INITIAL_INVENTORY,
      inboundLogs: INITIAL_INBOUND,
      outboundLogs: INITIAL_OUTBOUND,
      categories: INITIAL_CATEGORIES,
      suppliers: INITIAL_SUPPLIERS,
      auditLogs: [],
      
      setInventory: (inventory) => set({ inventory }),
      setInboundLogs: (inboundLogs) => set({ inboundLogs }),
      setOutboundLogs: (outboundLogs) => set({ outboundLogs }),
      setCategories: (categories) => set({ categories }),
      setSuppliers: (suppliers) => set({ suppliers }),
      setAuditLogs: (auditLogs) => set({ auditLogs }),
      
      addItem: (item) => set((state) => ({ inventory: [...state.inventory, item] })),
      updateItem: (updatedItem) => set((state) => ({
        inventory: state.inventory.map(item => item.id === updatedItem.id ? updatedItem : item)
      })),
      deleteItem: (id) => set((state) => ({
        inventory: state.inventory.filter(item => item.id !== id)
      })),
      
      addInboundLog: (log) => set((state) => ({ inboundLogs: [...state.inboundLogs, log] })),
      addOutboundLog: (log) => set((state) => ({ outboundLogs: [...state.outboundLogs, log] })),
      addAuditLog: (log) => set((state) => ({ auditLogs: [...state.auditLogs, log] })),
      
      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (category) => set((state) => ({
        categories: state.categories.map(c => c.id === category.id ? category : c)
      })),
      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter(c => c.id !== id)
      })),

      addSupplier: (supplier) => set((state) => ({ suppliers: [...state.suppliers, supplier] })),
      updateSupplier: (supplier) => set((state) => ({
        suppliers: state.suppliers.map(s => s.id === supplier.id ? supplier : s)
      })),
      deleteSupplier: (id) => set((state) => ({
        suppliers: state.suppliers.filter(s => s.id !== id)
      })),
    }),
    {
      name: 'law_stock_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
