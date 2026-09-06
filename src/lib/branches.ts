export type Branch = {
  city: string;
  label?: string;
  state: "Kerala" | "Tamil Nadu";
  addr: string;
  hours: string;
};

const KERALA_HOURS = "9:00 AM – 5:30 PM";
const TN_HOURS = "9:30 AM – 6:00 PM";

export const BRANCHES: Branch[] = [
  { city: "Ernakulam", label: "Corporate Office", state: "Kerala", addr: "First Floor, Veluthamana Arcade, Civil Line Road, Chembumukku, Kochi, Kerala – 682030", hours: KERALA_HOURS },
  { city: "Thrissur", state: "Kerala", addr: "Second Floor, Prasad Arcade, Patturaikkal, Thrissur, Kerala – 680022", hours: KERALA_HOURS },
  { city: "Pattambi", state: "Kerala", addr: "First Floor, Vee Yes En Arcade, Perinthalmanna Road, Melepattambi, Palakkad, Kerala – 679306", hours: KERALA_HOURS },
  { city: "Palakkad", state: "Kerala", addr: "First Floor, Ghanis, Fort Maidan, Palakkad, Kerala – 678013", hours: KERALA_HOURS },
  { city: "Chalakudy", state: "Kerala", addr: "First Floor, V & V Arcade, National Highway, Chalakudy, Kerala – 680307", hours: KERALA_HOURS },
  { city: "Perinthalmanna", state: "Kerala", addr: "First Floor, Vattupara Building, Calicut Road, Perinthalmanna – 679322", hours: KERALA_HOURS },
  { city: "Thodupuzha", state: "Kerala", addr: "First Floor, George Town, Vengalloor PO, Thodupuzha, Kerala – 685608", hours: KERALA_HOURS },
  { city: "Kozhikode", state: "Kerala", addr: "Usha Kishan Arcade, West Hill, Kannur Road, Kozhikode, Kerala – 676005", hours: KERALA_HOURS },
  { city: "Thiruvananthapuram", state: "Kerala", addr: "Devi Tower, M.G. Road, Pulimood, Thiruvananthapuram, Kerala – 695001", hours: KERALA_HOURS },
  { city: "Coimbatore", label: "Registered Office", state: "Tamil Nadu", addr: "F-1, First Floor, Balaji Castle, No. 11, Father Randy Street, RS Puram, Coimbatore, Tamil Nadu – 641002", hours: TN_HOURS },
  { city: "Madurai", state: "Tamil Nadu", addr: "Second Floor, Rakesh Tower, Subramanya Pillai Street, SS Colony, Bypass Road, Madurai – 625016", hours: TN_HOURS },
];

export const CONTACT = {
  corporatePhone: "+91 484 2630090",
  registeredPhone: "0487 7110000",
  tollFree: "1800 1202 0200",
  email: "info@tattvafincorp.com",
};
