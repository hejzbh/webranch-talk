export type NavigationSearchData = {
  label: string;
  type: "users" | "servers";
  items: {
    icon: React.ReactNode;
    imageURL?: string;
    name: string;
    id: string;
  }[];
}[];
