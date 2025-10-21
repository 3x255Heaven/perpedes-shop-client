import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { User, ShoppingBag } from "lucide-react";
import { PersonalInformation } from "./PersonalInformation";
import { OrderHistory } from "./OrderHistory";
import { OrderDetail } from "./OrderDetail";

const tabs = [
  { id: "personal", label: "Personal Information", icon: <User size={16} /> },
  { id: "orders", label: "Order History", icon: <ShoppingBag size={16} /> },
] as const;

export const Profile = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("personal");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center px-4 py-8 sm:px-6 md:px-8">
      <div className="w-full max-w-4xl bg-muted/50 p-6 sm:p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center md:text-left">
          My Profile
        </h2>

        {!selectedOrder && (
          <div className="flex justify-center md:justify-start mb-8 gap-4">
            {tabs.map(({ id, label, icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm sm:text-base transition-all",
                  activeTab === id
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-600 hover:text-black"
                )}
                onClick={() => setActiveTab(id)}
              >
                {icon}
                {label}
              </Button>
            ))}
          </div>
        )}

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!selectedOrder && activeTab === "personal" && (
              <motion.div
                key="personal-info"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <PersonalInformation />
              </motion.div>
            )}

            {!selectedOrder && activeTab === "orders" && (
              <motion.div
                key="order-history"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <OrderHistory onSelectOrder={setSelectedOrder} />
              </motion.div>
            )}

            {selectedOrder && (
              <motion.div
                key="order-detail"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <OrderDetail
                  orderNumber={selectedOrder}
                  onBack={() => setSelectedOrder(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
