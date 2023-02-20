import React, { FC, useCallback, useEffect, useState, Suspense } from "react";

// Tabs Components
import TabOne from "~/components/TabOne";
import TabTwo from "~/components/TabTwo";
import TabThree from "~/components/TabThree";
import TabItem from "~/components/TabItem";

type TabsProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  numberOfDisplay: number
};

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{products: []}>;
  sortKey: string;
  isOnsale: boolean
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Best seller",
    index: 1,
    Component: TabItem,
    sortKey: 'BEST_SELLING',
    isOnsale: false
  },
  {
    label: "New Arrivals",
    index: 2,
    Component: TabItem,
    sortKey: 'CREATED_AT',
    isOnsale: false
  },
  {
    label: "On Sale",
    index: 3,
    Component: TabItem,
    sortKey: 'on-sale',
    isOnsale: true
  }
];

/**
 * Avalible Props
 * @param className string
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 * @param orientation Tab orientation Vertical | Horizontal
 */
const Tabs: FC<TabsProps> = ({
  className = "tabs-component",
  orientation = "horizontal",
  numberOfDisplay = 1
}) => {
  let [products, setProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  const Panel = tabs && tabs.find((tab) => tab.index === selectedTab);

  useEffect(() => {
    const getBestSellers = async () => {
        const result = await getBestSellersAsync(
          tabs[selectedTab - 1].sortKey,
          numberOfDisplay,
          tabs[selectedTab - 1].isOnsale
          );
        setProducts(result)
    }
    getBestSellers();
  }, [selectedTab]);

  return (
    <div
      className={
        orientation === "vertical" ? className + " vertical" : className
      }
    >
      <div role="tablist" aria-orientation={orientation}>
        {tabs.map((tab) => (
          <button
            className={`mr-1.5 ${selectedTab === tab.index ? "active" : ""}`}
            onClick={() => setSelectedTab(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            <span className={`inline-block rounded font-medium text-center py-3 px-6 text-contrast w-full ${selectedTab === tab.index ? "bg-primary" : "bg-primary/10 text-primary/50"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
      >
        <Suspense fallback="Loading...">
          {Panel && <Panel.Component products={products}/>}
        </Suspense>
      </div>
    </div>
  );
};

async function getBestSellersAsync(sortKey: string, numberOfDisplay: number, isOnsale: boolean) {
  try {
      const res = await fetch(`/api/bestSellersNew?sortKey=${encodeURIComponent(sortKey)}&numberOfDisplay=${numberOfDisplay}&isOnsale=${isOnsale}`,{
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },   
      });
      if (res.ok) {
          const data = await res.json();
          return data;
      } else {
          return [];
      }
  } catch(error: any) {
      return [];
  }
}

export default Tabs;
